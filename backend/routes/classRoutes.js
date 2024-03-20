const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getClasses,
  deleteSubjectFromClass,
  addSubjectInClass,
  createClass,
  getSubjectsFromClas,
  removeSubjectFromClass,
} = require("../controllers/classController");
router
  .get("/", isAuthenticatedUser, authorizeRoles("admin"), getClasses)
  .post("/", createClass);
router
  .route("/subject")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSubjectsFromClas)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSubjectInClass)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeSubjectFromClass);

router
  .route("/subject/delete")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
    deleteSubjectFromClass
  );

module.exports = router;
