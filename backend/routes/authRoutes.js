const experss = require("express");
const router = experss.Router();

const {  isAuthenticatedUser } = require("../middlewares/authMiddleware");
const { signin,signout, updateProfile, forgotPassword, resetPassword } = require("../controllers/authController");
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/update",isAuthenticatedUser, updateProfile);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
module.exports = router;
