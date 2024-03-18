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
} = require("../controllers/classController");
router
  .get("/", isAuthenticatedUser, authorizeRoles("admin"), getClasses)
  .post("/", isAuthenticatedUser, authorizeRoles("admin"), createClass);
router.get(
  "/subject",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSubjectsFromClas
).post(isAuthenticatedUser, authorizeRoles("admin"), addSubjectInClass );

router
  .route("/subject/delete")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
    deleteSubjectFromClass
  );

module.exports = router;
