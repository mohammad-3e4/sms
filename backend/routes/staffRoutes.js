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
router.get("/", getStaff);
router
  .route("/:id")
  .get(getMember)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMember)
  .post(isAuthenticatedUser, authorizeRoles("admin", "teacher"), updateMember);

module.exports = router;
