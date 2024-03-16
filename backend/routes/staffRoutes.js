const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getMember,
  getStaff,
  deleteMember,
  updateMember,
} = require("../controllers/staffController");
router.get("/", isAuthenticatedUser,authorizeRoles('admin'), getStaff);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"),getMember)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMember)
  .post(isAuthenticatedUser, authorizeRoles("admin", "teacher"), updateMember);

module.exports = router;
