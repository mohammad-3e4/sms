const experss = require("express");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const db = require("./config/database");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "backend/config/config.env" });

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors("origin", "*"));

// Routes
app.post("/api/v1/student/create", async (req, res) => {
  try {
    const studentBioData = req.body;

    const tableName = "students";

    const columns = Object.keys(studentBioData).join(", ");
    const valuesPlaceholders = Object.keys(studentBioData)
      .map(() => "?")
      .join(", ");

    const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;

    const values = Object.values(studentBioData);

    console.log(values);

    await db.promise().query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: `Student bio-data created successfully`,
    });
  } catch (error) {
    console.error("Error creating student bio-data:", error);
    res.status(500).json({ success: false, error: error });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../../frontend/public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
// login user
app.post(
  "/api/v1/staff",
  upload.single("file"),
  async (req, res, next) => {
    try {
      let imagename = null;
      if (req.file) {
        avatar = req.file.originalname;
      }
      // Extract other form data
      const {
        name,
        email,
        password,
        phone,
        avatar,
        role,
        address,
        designation,
        about,
   
      } = req.body;

      // Insert data into the database
      const query =
        "INSERT INTO staff ( name, email, password, phone, avatar, role, address, designation, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        name,
        email,
        password,
        phone,
        avatar,
        role,
        address,
        designation,
        about,
      ];

      await db.promise().query(query, values);

      res
        .status(201)
        .json({ success: true, message: "Staff created successfully" });
    } catch (error) {
      console.error("Error creating teacher:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/staff", staffRoutes);

// Middle wares
app.use(errorMiddleware);

module.exports = app;
