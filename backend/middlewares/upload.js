const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const studentId = req.params.student_id;
    console.log(req.body);
    // const documentName = req.body.document_name; 
    const newfile = req.file; 
    
    // Handle file and form data as needed

    let folder_name=req.params.student_id+req.body.document_name;
    const uploadPath = path.join('uploads',folder_name);
    fs.mkdirSync(uploadPath, { recursive: true }); 
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;
