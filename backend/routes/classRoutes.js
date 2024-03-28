const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getClasses,
  assignSubject,
  removeAssignSubject,
  addSubjectInClass,
  createClass,
  getSubjectsFromClas,
  removeSubjectFromClass,
  updateClass,
} = require("../controllers/classController");
router
  .get("/", isAuthenticatedUser, authorizeRoles("admin", 'teacher'), getClasses)
  .post("/", isAuthenticatedUser, authorizeRoles("admin"), createClass);
router
  .route("/subject")
  .get(isAuthenticatedUser, authorizeRoles("admin", 'teacher'), getSubjectsFromClas)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSubjectInClass)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeSubjectFromClass);

router
  .route("/update")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateClass);
router
  .route("/assign/teacher")
  .post(isAuthenticatedUser, authorizeRoles("admin"), assignSubject);
router
  .route("/remove/teacher")
  .post(isAuthenticatedUser, authorizeRoles("admin"), removeAssignSubject);

module.exports = router;
