const express = require('express');
const router = express.Router()
// const {isLoggedIn} = require('../middlewares/verifyToken')
const {createStudent, getStudent, getStudents, deleteStudent, updateStudent} = require('../controllers/studentController')
router.get('/',getStudents )
router.route('/:adm_no').get(getStudent).delete(deleteStudent).post(updateStudent)
router.post('/create', createStudent )

module.exports = router