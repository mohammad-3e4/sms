const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

// Register new class
exports.createClass = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  try {
    const { class_name, class_section, ...subjectsData } = req.body;
    const classParts = class_name.split("_");
    const class_j = classParts[1];
    const class_value = classParts[0];
    const class_full_name = `${class_j}-${class_section}`;

    // Check if the class with the same class_j and class_section already exists
    const checkQuery = `
        SELECT * FROM classes
        WHERE class_name = '${class_full_name}'`;

    const [existingClassResult] = await db.promise().query(checkQuery);

    if (existingClassResult.length > 0) {
      return next(new ErrorHandler(400, "Class already exists"));
    }

    // If the class doesn't exist, proceed with insertion
    const subjectsColumns = Object.keys(subjectsData);
    const subjectsValues = Object.values(subjectsData);

    const subjectsPlaceholders = subjectsColumns.map(() => "?").join(", ");

    const insertQuery = `
        INSERT INTO classes (
          class_name, class_value,  ${subjectsColumns.join(", ")}
        ) VALUES (?, ?,  ${subjectsPlaceholders})`;

    const insertValues = [class_full_name, class_value, ...subjectsValues];

    await db.promise().query(insertQuery, insertValues);

    res
      .status(201)
      .json({ success: true, message: "Class is created successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // Send the specific error received from the database
      return res.status(400).json({ success: false, error: error.message });
    }
    console.error("Error creating teacher:", error);
    next(new ErrorHandler(500, "Internal server error"));
  }
});

exports.getSubjectsFromClas = catchAsyncErrors(async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("DESCRIBE classes", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.length < 4) {
      throw new ErrorHandler(404, "No subjects found");
    }

    const columnNames = result.slice(3).map((column) => column.Field);

    res.json(columnNames);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    next(error);
  }
});

exports.getClasses = asyncHandler(async (req, res, next) => {
  let sql = "SELECT * FROM classes";

  const { class: studentClass, section } = req.query;

  if (studentClass && section) {
    sql += ` WHERE class_name = ? AND section = ?`;
    db.query(sql, [studentClass, section], (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, classes: result });
    });
  } else if (studentClass) {
    sql += ` WHERE class_name = ?`;
    db.query(sql, [studentClass], (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, students: result });
    });
  } else if (section) {
    sql += ` WHERE section = ?`;
    db.query(sql, [section], (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, classes: result });
    });
  } else {
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, classes: result });
    });
  }
});

exports.addSubjectInClass = catchAsyncErrors(async (req, res, next) => {
  let { newSubject, newVocationalSubject, action } = req.body;

  try {
    let addColumnQuery;
    if (!newSubject && !newVocationalSubject) {
      return res.status(400).json({ message: "Subject not provided" });
    } else {
      if (action === "nonvoc") {
        newSubject = newSubject.replace(/ /g, "_");
        addColumnQuery = `
            ALTER TABLE classes
            ADD COLUMN ${newSubject} VARCHAR(255) DEFAULT 'no';
        `;
      } else {
        newVocationalSubject = newVocationalSubject.replace(/ /g, "_");
        addColumnQuery = `
          ALTER TABLE classes
          ADD COLUMN vocational_${newVocationalSubject} VARCHAR(255) DEFAULT 'no';
        `;
      }
    }
    db.query(addColumnQuery, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          console.log("hiii ", err.message);
          res.status(500).json({ error: err.message });
        } else {
          console.error("Error adding column:", err);
          return res.status(500).json({ message: "Error adding column" });
        }
      } else {
        res.json({ message: "Subject added successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

exports.removeSubjectFromClass = catchAsyncErrors(async (req, res, next) => {
  const Subject = req.body;
  try {
    const deletionPromises = Subject.map((subject) => {
      return new Promise((resolve, reject) => {
        const dropColumnQuery = `
                          ALTER TABLE classes
                          DROP COLUMN ${subject};
                      `;
        db.query(dropColumnQuery, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(subject);
          }
        });
      });
    });

    Promise.all(deletionPromises)
      .then((completed) => {
        res.json({ message: "Subjects deleted successfully" });
      })
      .catch((error) => {
        // If any of the promises were rejected, catch the error here
        console.error("Error deleting subjects:", error);
        res.status(500).json({ message: "Error deleting subjects" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.updateClass = catchAsyncErrors(async (req, res, next) => {
  try {
    const { className, subject, action } = req.body;

    let newValue;
    if (action === "add") {
      newValue = "yes";
    } else if (action === "remove") {
      newValue = "no";
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updateQuery = `
      UPDATE classes
      SET ${subject} = ?
      WHERE class_name = ?;
    `;

    db.query(updateQuery, [newValue, className], (err, results) => {
      if (err) {
        console.error("Error updating subject value:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      res.json({ message: `Successfully updated ${subject} for ${className}` });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.assignSubject = catchAsyncErrors(async (req, res, next) => {
  try {
    const {teacher_id, class_name, subject} = req.body;

    const updateQuery = `
      UPDATE classes
      SET ${subject} = ?
      WHERE class_name = ?;
    `;

    db.query(updateQuery, [teacher_id, class_name], (err, results) => {
      if (err) {
        console.error("Error updating subject value:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      res.json({ message: `Successfully updated ${subject} for ${class_name}` });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


exports.removeAssignSubject = catchAsyncErrors(async (req, res, next) => {
  try {
    const { class_name, subject} = req.body;

    const updateQuery = `
      UPDATE classes
      SET ${subject} = ?
      WHERE class_name = ?;
    `;

    db.query(updateQuery, ['yes', class_name], (err, results) => {
      if (err) {
        console.error("Error updating subject value:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      res.json({ message: `Successfully updated ${subject} for ${class_name}` });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


