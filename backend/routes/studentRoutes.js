const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  createStudent,
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  markAbsentStudent,
  getAbsents,
} = require("../controllers/studentController");

// Route to get all students
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("teacher", "admin"),
  getStudents
);
router.get(
  "/absents",
  getAbsents
);
// Routes for individual student
router
  .route("/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("teacher", "admin"),
    getStudent
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteStudent
  )
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateStudent
  );


router.put(
  "/attendance",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  markAbsentStudent
);


module.exports = router;
