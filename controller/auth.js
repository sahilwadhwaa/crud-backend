import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Table from "../model/tableSchema.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
        name, rollno, classname,email, password
    } = req.body;

    //hashing and salting passwords
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newStudent = new Table({
        name, 
        rollno, 
        classname,
        email,
        password: passwordHash,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Table.findOne({ email: email });
    if (!student) return res.status(400).json({ msg: "Student does not exist. " });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    delete student.password;
    res.status(200).json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
