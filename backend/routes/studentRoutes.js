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
} = require("../controllers/studentController");
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("teacher", "admin"),
  getStudents
);
router
  .route("/:adm_no")
  .get(isAuthenticatedUser, authorizeRoles("teacher", "admin"), getStudent)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStudent)
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateStudent);
// router.post("/create", isAuthenticatedUser,  authorizeRoles("admin"),createStudent);

module.exports = router;
