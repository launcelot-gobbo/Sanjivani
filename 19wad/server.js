const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentData = require("./studentData");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/student", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

const Student = mongoose.model("studentmarks", studentSchema);

// Insert 5 students (run once)
app.get("/insert", async (req, res) => {
  await Student.insertMany(studentData);
  res.send("Inserted 5 students");
});

// Show all students and count
app.get("/", async (req, res) => {
  const students = await Student.find({});
  const count = await Student.countDocuments();
  res.render("index", { students, count });
});

// Students with DSBDA > 20
app.get("/dsbda20", async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.render("index", { students, count: students.length });
});

// Update marks of specified student (by name) by +10
app.get("/update/:name", async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10
      }
    }
  );
  res.redirect("/");
});

// Students with >25 in all subjects
app.get("/allabove25", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });
  res.render("index", { students, count: students.length });
});

// Students with <40 in both CNS and WAD
app.get("/lowcnswad", async (req, res) => {
  const students = await Student.find({
    CNS_Marks: { $lt: 40 },
    WAD_Marks: { $lt: 40 }
  });
  res.render("index", { students, count: students.length });
});

// Delete student by name
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
