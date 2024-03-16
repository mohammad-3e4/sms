const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

// Register new class
exports.createClass = catchAsyncErrors(async (req, res, next) => {
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
    console.error("Error creating teacher:", error);
    next(new ErrorHandler(500, "Internal server error"));
  }
});

exports.getSubjects = catchAsyncErrors(async (req, res, next) => {
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


exports.getClass = asyncHandler(async (req, res, next) => {
  const { adm_no } = req.params;

  let sql;
  let values;
  if (adm_no) {
    sql = "SELECT * FROM students WHERE adm_no = ?";
    values = [adm_no];
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, student: result[0] });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
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
      res.status(200).json({ success: true, students: result });
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
      res.status(200).json({ success: true, students: result });
    });
  } else {
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, students: result });
    });
  }
});

exports.updateClass = asyncHandler(async (req, res, next) => {
  const updatedFields = req.body;
  const { adm_no } = req.params;

  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE students SET ${updateFieldsString} WHERE adm_no = '${adm_no}';`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      next(new ErrorHandler("Error during update", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Update successful" });
    } else {
      next(new ErrorHandler("User not found or no changes applied", 404));
    }
  });
});

exports.deleteClass = asyncHandler(async (req, res, next) => {
  const { adm_no } = req.params;

  if (!adm_no) {
    return next(new ErrorHandler("Admission number (adm_no) is required", 400));
  }

  const sql = `DELETE FROM students WHERE adm_no = ?`;

  db.query(sql, [adm_no], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("Student not found or no changes applied", 404)
      );
    }
  });
});
