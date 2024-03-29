const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const multer = require("multer");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });

exports.signin = catchAsyncErrors(async (request, response, next) => {
  const { email, password, tableName } = request.body;

  const table = tableName || "staff";

  const sql = `SELECT * FROM ${table} WHERE email=? AND password=?;`;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login !", 500));
    }

    if (result.length > 0) {
      const user = result[0];
      sendToken(user, 201, response);
    } else {
      return response
        .status(404)
        .json({ message: "User not found with provided credentials" });
    }
  });
});

//  Log Out User
exports.signout = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const updatedData = req.body;

  const { updatedFields } = updatedData;
  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE staff SET ${updateFieldsString} WHERE ID = ${req.user.teacher_id};`;

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

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    db.query(
      "SELECT * FROM staff WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }

        const staff = results[0];
        const resetToken = uuidv4();

        const jwtToken = jwt.sign(
          { ID: staff.ID, resetToken },
          "your-secret-key",
          {
            expiresIn: "1h",
          }
        );

        // Update reset token and expiry in MySQL database
        db.query(
          `UPDATE staff SET resetPasswordToken = ?, resetPasswordExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE ID = ?`,
          [jwtToken, staff.ID],
          async (error, results, fields) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            }
            try {
              await transporter.sendMail({
                from: "school-managemen@gmail.com",
                to: email,
                subject: "Password Reset",
                html: `<p>Click <a href="http://localhost:3000/reset-password/${jwtToken}">here</a> to reset your password.</p>`,
              });

              res.status(200).json({
                message: "Reset token generated and sent to " + email,
              });
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and newPassword are required" });
    }

    // Query the database to find a teacher with the provided reset token and expiry
    db.query(
      "SELECT * FROM staff WHERE resetPasswordToken = ? AND resetPasswordExpiry > NOW()",
      [token],
      (error, results) => {
        if (error) {
          next(new ErrorHandler(error.message, 500));
        }

        if (results.length === 0) {
          next(new ErrorHandler("Invalid or expired token", 400));
        }

        const teacher = results[0];
        db.query(
          "UPDATE staff SET password = ?, resetPasswordToken = NULL, resetPasswordExpiry = NULL WHERE teacher_id = ?",
          [newPassword, teacher.teacher_id],
          (updateError) => {
            if (updateError) {
              next(new ErrorHandler(updateError.message, 500));
            }

            res.status(200).json({ message: "Password reset successful" });
          }
        );
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
