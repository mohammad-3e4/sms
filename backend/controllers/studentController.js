const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });
//  Register new us

// exports.createStudent = async (req, res, next) => {
//   res.send("ok")
//   try {
//     const studentBioData = req.body;

//     const tableName = "students";

//     const columns = Object.keys(studentBioData).join(", ");
//     const valuesPlaceholders = Object.keys(studentBioData)
//       .map(() => "?")
//       .join(", ");

//     const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;

//     const values = Object.values(studentBioData);

//     console.log(values);

//     await db.promise().query(insertQuery, values);

//     res.status(201).json({
//       success: true,
//       message: `Student bio-data created successfully`,
//     });
//   } catch (error) {
//     console.error("Error creating student bio-data:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.getStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let sql;
  let values;
  if (id) {
    sql = "SELECT * FROM students WHERE student_id = ?";
    values = [id];
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

exports.getStudents = asyncHandler(async (req, res, next) => {
  let sql = "SELECT * FROM students";

  const { class: studentClass } = req.query;
  const clas = studentClass.split("-")[0];
  const section = studentClass.split("-")[1];

  if (studentClass) {
    sql += ` WHERE class_name = ? AND section =  ?;`;
    db.query(sql, [clas, section], (err, result) => {
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

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const updatedFields = req.body;
  const { id } = req.params;

  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE students SET ${updateFieldsString} WHERE student_id = '${id}';`;

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

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Admission number (id) is required", 400));
  }

  const sql = `DELETE FROM students WHERE student_id = ?`;

  db.query(sql, [id], (err, result) => {
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

exports.markAbsentStudent = asyncHandler(async (req, res, next) => {
  const { student_id, attendance } = req.body;
  if (!student_id) {
    return next(
      new ErrorHandler(`Student Id (${student_id}) is required`, 400)
    );
  }

  const sql = `INSERT INTO attendance (student_id, abesent_date) VALUES (?, ?)`;
  const values = [student_id, attendance];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during insert:", err);
      return next(new ErrorHandler("Error during insert", 500));
    }

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Absent record inserted successfully" });
    } else {
      return next(
        new ErrorHandler("Failed to insert absent record", 500)
      );
    }
  });
});

exports.getAbsents = asyncHandler(async (req, res, next) => {

  const sql = "SELECT * FROM attendance;";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, absents: result });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});
