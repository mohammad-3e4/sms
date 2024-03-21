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
  updateClass
} = require("../controllers/classController");
router
  .get("/", isAuthenticatedUser, authorizeRoles("admin"), getClasses)
  .post("/",isAuthenticatedUser, authorizeRoles("admin"), createClass);
router
  .route("/subject")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSubjectsFromClas)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSubjectInClass)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeSubjectFromClass);

  router.route("/update").post(isAuthenticatedUser, authorizeRoles("admin"), updateClass)


module.exports = router;
