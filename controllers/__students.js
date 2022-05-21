const Student = require("../models/test");
const getStudents = async (req, res) => {
  try {
    const student = await Student.find();

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getspecStudent = async (req, res) => {
  const roll = req.params.roll;
  try {
    const stud = await Student.findOne({ roll: roll });
    res.status(200).json(stud);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createstudent = async (req, res) => {
  console.log(req.body);
  const newstudent = new Student({
    name: req.body.name,
    roll: req.body.roll,
    registration: req.body.registration,
    subjects: req.body.subjects,
    created_on: req.body.created_on,
  });
  try {
    await newstudent.save();
    res.status(201).json(newstudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatestudent = async (req, res) => {
  const roll = req.params.roll;
  try {
    await Student.findOneAndUpdate(
      {
        roll: roll,
      },
      {
        name: req.body.name,
        registration: req.body.registration,
        subjects: req.body.subjects,
        created_on: req.body.created_on,
      }
    );
    res.status(202).json({ roll: roll });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deletestudent = async (req, res) => {
  const roll = req.params.roll;

  try {
    let a = await Student.findOneAndRemove({ roll: roll });
    console.log("adity", a);
    res.status(203).json({ roll: roll });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

const studentControler = {
  getStudents,
  getspecStudent,
  createstudent,
  updatestudent,
  deletestudent,
};
module.exports = studentControler;
