const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeData = require("./employeeData");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/company", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String
});

const Employee = mongoose.model("employees", employeeSchema);

// Insert Initial Employees (Run Once)
app.get("/insert", async (req, res) => {
  await Employee.insertMany(employeeData);
  res.send("Inserted employee records");
});

// View All
app.get("/", async (req, res) => {
  const employees = await Employee.find({});
  const count = await Employee.countDocuments();
  res.render("index", { employees, count });
});

// Add New
app.post("/add", async (req, res) => {
  await Employee.create(req.body);
  res.redirect("/");
});

// Update Existing Employee
app.get("/update/:name/:newdept/:newdesignation/:newsalary/:newjoiningdate", async (req, res) => {
    await Employee.updateOne(
        { name: req.params.name},
        {
            $set: {
                department: req.params.newdept,
                designation: req.params.newdesignation,
                salary: req.params.newsalary,
                joiningDate: req.params.newjoiningdate,
            },
        }
    );
    res.redirect("/");
  });
  

// Delete Employee
app.get("/delete/:name", async (req, res) => {
    await Employee.deleteOne({ name: req.params.name });
    res.redirect("/");
  });
 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
