const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const upload = require('../middlewares/upload')
const {
  createStudent,
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  markAbsentStudent,
  getAbsents,
  markPresent,
  uploadDocuments
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

router.delete(
  "/present",
  markPresent
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

router
  .route("/upload/:id")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", 'teacher'),
    upload.single('file'),
    uploadDocuments
  );


module.exports = router;
