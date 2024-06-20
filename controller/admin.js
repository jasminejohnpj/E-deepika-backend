const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const Student = require('../model/student');
const Teachers = require('../model/teacher');








router.post('/insert-teachers', async (req, res) => {
  try {
    const data = req.body;
    const existingTeacher = await Teachers.findOne({ phone: data.phone });

    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    } else {
      const newTeacher = new Teachers(data);  
      await newTeacher.save();
      return res.status(200).json({ message: 'Teacher created successfully', teacher: newTeacher });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/list-teachers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    const teachers = await Teachers.find().skip(skip).limit(limit);

    const totalteachers = await Teachers.countDocuments();

    return res.status(200).json({
      teachers,
      page,
      limit,
      totalPages: Math.ceil(totalteachers / limit),
      totalteachers
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/update-teacher/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const existingTeacher = await Teachers.findById(id);
    if (!existingTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await Teachers.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);  // Logging the error for debugging purposes
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/insert-students', async (req, res) => {
  try {
    const data = req.body;
    
    if (!data.admissionNo || !data.studentName) {
      return res.status(400).json({ message: 'Admission number and name are required' });
    }

    const existingStudent = await Student.findOne({ admissionNo: data.admissionNo });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    } else {
      const newStudent = new Student(data);
      await newStudent.save();
      return res.status(200).json({ message: 'Student created successfully', student: newStudent });
    }
  } 
catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/list-students', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const students = await Student.find().skip(skip).limit(limit);

    const totalStudents = await Student.countDocuments();

    return res.status(200).json({
      students,
      page,
      limit,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/update-students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);  // Logging the error for debugging purposes
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/passout/:id', async (req, res) => {  
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.ispassout = true;  // Set the ispassout field to true
    await student.save();  // Save the updated student instance
    return res.status(200).json({ message: 'Successfully added to passout list' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/passoutlist' , async (req,res) =>{
  try{
    const students = await Student.find({ispassout:true});
    return res.status(200).json({message:'passout list', students});
  } catch(error){
    console.log(error);
    return res.status(500).json({message:'internal server error'});
  }
});


router.post('/transfer/:id', async (req, res) => {  
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.istransfer = true;  // Set the ispassout field to true
    await student.save();  // Save the updated student instance
    return res.status(200).json({ message: 'Successfully added to transfer list' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/transferlist' , async (req,res) =>{
  try{
    const students = await Student.find({istransfer:true});
    return res.status(200).json({message:'transfer list', students});
  } catch(error){
    console.log(error);
    return res.status(500).json({message:'internal server error'});
  }
});

module.exports = router





