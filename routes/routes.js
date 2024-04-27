const express = require("express");
const router = express.Router();
const Employee=require("../models");
const Review = require('../models/review');
const Work=require('../models/assignwork');
const transporter=require('../controller/userauth');
const hashPassword=require('../utils/hashpassword');
const comparePassword = require("../utils/comparepassword");
<<<<<<< HEAD
const { SubmittedWork, deleteEntryAfterTimeout } = require("../models/submit");
=======
>>>>>>> 5a1e47e401c84a480805ce79b77542a38f5a3594

router.get("/", async (req, res) => 
{
  try {
    res.render("main");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enquiry",(req,res)=>
{
  try
  {
    res.render("enquiryform")
  }
  catch(error)
  {
    res.status(500).json({ message: error.message });
  }
});

router.get('/adminform', async (req, res) => {
  try {
      const emps = await Employee.find({}).select('Employeestatus').sort({ createdAt: -1 });
      let flag = false; 
      for (let i = 0; i < emps.length; i++) {
          if (emps[i].Employeestatus === "Admin") 
          {
              flag = true; 
              break; 
          }
      }
      if (!flag) 
      {
          res.render("adminform");
      }
       else 
       {
          res.redirect("/signup");
      }
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});

router.post('/createEmployee', async (req, res) => 
{
  try 
  {
      const { code, mail, empname, password, age, Employeestatus, role, rating, projectspending, admincode } = req.body;
      const hashedPassword = await hashPassword(password);
      const newEmployee = new Employee({
          code,
          mail,
          empname,
          password: hashedPassword, 
          age,
          Employeestatus,
          role,
          rating,
          projectspending,
          admincode
      });
      await newEmployee.save();
      res.redirect(`/signup`);
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});

router.get("/signup", (req, res) => 
{
  try {

    res.render("signup");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await Employee.findById(userId); 
    const tasks = await Work.find({ assignedTo: userId });
    const assignedBy = [];
    for (let i = 0; i < tasks.length; i++) 
    {
      const assignedByEmployee = await Employee.findById(tasks[i].assignedBy);
      assignedBy.push(assignedByEmployee);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // res.render("user", { user: user, tasks: tasks,assignedBy:assignedBy });
    res.render("user2", { user: user, tasks: tasks,assignedBy:assignedBy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post('/login', async (req, res) => {
<<<<<<< HEAD
  const { code, password: plainPassword } = req.body; 
=======
  const { code, password: plainPassword } = req.body; // Destructure password from req.body
>>>>>>> 5a1e47e401c84a480805ce79b77542a38f5a3594
  if (code) {
    try {
      const existingEmployee = await Employee.findOne({ code });
      if (!existingEmployee) {
        return res.status(404).json({ message: "Signup code not found" });
      }

      if (existingEmployee.password) {
        return res.status(400).json({ message: "Password already set for this employee" });
      }
<<<<<<< HEAD
      const hashedPassword = await hashPassword(plainPassword); 
=======
      const hashedPassword = await hashPassword(plainPassword); // Use plainPassword here
>>>>>>> 5a1e47e401c84a480805ce79b77542a38f5a3594
      existingEmployee.password = hashedPassword;
      await existingEmployee.save();
      return res.redirect("/signup");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    const { empname, password } = req.body;

    try {
      const employee = await Employee.findOne({ empname });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      const match=await comparePassword(password,employee.password);
      if(!match)
      {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
      return res.redirect(`/user/${employee._id}`);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
});


router.get("/Newpassword",async(req,res,next)=>
{
  try
  {
    res.render("Newpassword");
  }
  catch(error)
  {
    return res.status(500).json({message:error.message});
  }
});


router.post("/newpass", async (req, res, next) => 
{
  try 
  {
    const { code, newpassword, confirmpassword } = req.body;
    const Empl = await Employee.findOne({ code: code });

    if (Empl) 
    {
      if (newpassword === confirmpassword) 
      {
        const hashedPassword = await hashPassword(newpassword);
        Empl.password = hashedPassword;
        await Empl.save();
        console.log("Password updated successfully");
        res.redirect("/signup");
      } 
      else 
      {
        res.status(400).json({ message: "Passwords do not match" });
      }
    } 
    else 
    {
      res.status(404).json({ message: "Employee not found" });
    }
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login-as-admin/:id", async (req, res) => {
  const userId = req.params.id;
  const { code } = req.body;

  try {
      const user = await Employee.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.Employeestatus === "Employee") 
      {
          return res.status(401).json({ message: "User is not an admin or a manager" });
      }

      const adminCodeFromDB = parseInt(user.admincode); // Convert admincode from string to number
      const adminCodeFromRequest = parseInt(code); // Convert code from string to number

      console.log("Type of code:", typeof adminCodeFromRequest);
      console.log("Type of adminCodeFromDB:", typeof adminCodeFromDB);
      console.log("Admin code from request:", adminCodeFromRequest);
      console.log("Admin code from database:", adminCodeFromDB);

      if (adminCodeFromDB !== adminCodeFromRequest) {
          console.log("Admin code mismatch!");
          return res.status(401).json({ message: "Incorrect admin code" });
      }

      res.redirect(`/admin/${userId}`);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/reviews', async (req, res, next) => 
{
  try 
  {
      const userId = req.query.userId;
      const user = await Employee.findById(userId);
      if (!user) 
      {
          return res.status(404).json({ message: "User not found" });
      }
      const reviews = await Review.find({ reviewed: userId });
      const employees = await Employee.find(); 
      res.render('reviews', { user, reviews, employees });
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});

router.get("/employee-review", async (req, res, next) => 
{
  try 
  {
    const { userId, employeeId } = req.query;
    if (!userId || !employeeId) {
      return res.status(400).json({ message: "Missing user ID or employee ID" });
    }
    const emps = await Employee.findById(employeeId);
    const user=await Employee.findById(userId);
    if (!emps) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.render("empreview", { user, employeeId, emps });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/submit-review", async (req, res, next) => {
  try 
  {
      let { userId, empId } = req.query;
      userId = userId.trim();
      const content = req.body.content;
      const review = new Review({
          content: content,
          reviewer: userId,
          reviewed: empId
      });
      await review.save();
      res.redirect(`/reviews?userId=${userId}`);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

/* Admin page */
router.get("/assignwork",async(req,res,next)=>
{
  try
  {
    const {userId,employeeId}=req.query;
    const user=await Employee.findById(userId);
    res.render("assignwork",{userId,employeeId,user});
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
});


router.post("/assignwork", async (req, res) => {
  try {
    const { worktitle, desc, date } = req.body; 
    const { userId, employeeId } = req.query;
    const work = new Work({
      title: worktitle,
      description: desc,
      assignedBy: userId,
      assignedTo: employeeId,
      dueDate: date 
    });
    await work.save();
    
    const employee = await Employee.findById(employeeId);
    employee.projectspending++; 
    await employee.save(); 
    
    res.redirect(`/Dashboard/${userId}`); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/admin/:id", async (req, res) => 
{
  try {
      const userId = req.params.id;
      const user = await Employee.findById(userId);
      const emps = await Employee.find({}).sort({ createdAt: -1 });
      res.render("admin", { user: user, emps: emps });
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});


router.get("/Dashboard/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Employee.findById(userId);
    const emps = await Employee.find({}).sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("Dashboard", { user: user, emps: emps });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/newempl/:id",async (req,res)=>
{
  const userId = req.params.id;
  try 
  {
    const user = await Employee.findById(userId);
    if (!user) 
    {
        return res.status(404).json({ message: "User not found" });
    }

    res.render("newemp",{user});
  }
  catch(error)
  {
    res.status(500).json({ message: error.message });
  }
});

router.get("/deleteemp", async (req, res, next) => 
{
  try 
  {
      const { userId, employeeId } = req.query;
      if (!userId || !employeeId) {
          return res.status(400).json({ message: "Missing user ID or employee ID" });
      }
      const user=await Employee.findById(userId);
      res.render("deleteemp", { userId, employeeId,user });
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});

router.get("/rateemp", async (req, res, next) => {
  try {
    const { userId, employeeId } = req.query;
    const user=await Employee.findById(userId);
    if (!userId || !employeeId) 
    {
      return res.status(400).json({ message: "Missing user ID or employee ID" });
    }
    const emps = await Employee.findById(employeeId);
    if (!emps) 
    {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.render("emprating", { userId, employeeId, emps,user });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

router.get("/confirm-delete", async (req, res, next) => {
  try {
    const { userid, id, confirm } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Missing employee ID" });
    }
    if (confirm === "yes") {
      // Delete associated reviews and tasks before deleting the employee
      await Review.deleteMany({ $or: [{ reviewer: id }, { reviewed: id }] });
      await Work.deleteMany({ assignedTo: id });
      await Employee.findByIdAndDelete(id);
    }
    res.redirect(`/admin/${userid}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add-employee/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const Admin = await Employee.findById(userId);
    const { empname, age, mail, role, rating, code, Employeestatus } = req.body;
    const newEmployee = new Employee
    ({
      empname: empname,
      age: age,
      role: role,
      rating: rating || 2,
      code: code,
      mail: mail,
      Employeestatus: Employeestatus
    });
    await transporter.sendMail({
      from: 'krishnavk2305@gmail.com', 
      to: mail, 
      subject: 'Welcome to ALPHA SOLUTIONS!', 
      text: `Hello ${empname},\n\nWelcome to our company!\n\nYour signup code is: ${code}\n\n Your Username:${empname}\n\n
          Best regards,\n${Admin.empname}`, 
    });
    await newEmployee.save();
    res.redirect(`/admin/${userId}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/promoteemp', async (req, res) => 
{
  const { userId, employeeId, adminCode } = req.body;
  try 
  {
      const adminUser = await Employee.findById(userId);
      if (!adminUser || adminUser.Employeestatus !== 'Admin') 
      {
          return res.status(404).json({ message: 'Admin user not found or invalid' });
      }
      const manager = await Employee.findById(employeeId);
      if (!manager) 
      {
          return res.status(404).json({ message: 'Employee not found' });
      }
      const employee=await Employee.findById(employeeId);
      manager.Employeestatus = 'Manager';
      manager.admincode=adminCode;
      const mail=manager.mail;
      await manager.save();
      await transporter.sendMail({
        from: 'krishnavk2305@gmail.com', 
        to: mail, 
        subject: 'Congratulations You Are Promoted', 
        text: `Your Work Ethics Paved way for your promotion..You are Now a MANAGER ${employee.empname}
              \n\n
              Your signup code is: ${adminCode} for accessing dashboard\n\n
            Best regards,\n${adminUser.empname}`, 
      });
      res.redirect(`/dashboard/${userId}`);
  } 
  catch (error) 
  {
      res.status(500).json({ message: error.message });
  }
});
router.post('/update-rating', async (req, res, next) => {
  try {
    const { userid, empid } = req.query;
    const { rating } = req.body;
    const employee = await Employee.findById(empid);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    employee.rating = rating;
    await employee.save();

    res.redirect(`/admin/${userid}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/empreviews', async (req, res) => {
  const { userId, employeeId } = req.query;

  try {
    if (!employeeId) 
    {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const employee = await Employee.findById(employeeId);
    const reviews = await Review.find({ reviewed: employeeId });
    res.render('adminemprev', { userId: userId, employee: employee, reviews: reviews });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/empworks/:id", async (req, res, next) => {
  const userId = req.params.id;
  try 
  {
    const user = await Employee.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const emps = await Employee.find({}).sort({ createdAt: -1 });
    const works = await Work.find({});
    res.render("empworks", { user: user, emps: emps, works: works });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

router.get("/submitwork/:userId/:taskId", async (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const user = await Employee.findById(userId);
    const task = await Work.findById(taskId); 
    res.render("submitwork", { userId: userId, user: user, taskId: taskId, task: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for submitting work
router.post('/submitwork/:userId/:taskId', async (req, res) => {
  try {
    const { userId, taskId } = req.params; 
    const { githubLink } = req.body;
    
    if (!githubLink) {
      return res.status(400).json({ message: 'GitHub link is required' });
    }
    
    // Create a new submitted work instance
    const submittedWork = new SubmittedWork({
      userId: userId,
      githubLink: githubLink
    });
  
    // Save the submitted work to the database
    await submittedWork.save();
    await Work.findByIdAndDelete(taskId);
    console.log("Work submitted successfully");
    const employee = await Employee.findById(userId);
    if (employee) {
      employee.projectspending--;
      await employee.save(); 
    }
    return res.redirect(`/user/${userId}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/otherworks",async (req,res)=>
{
    try
    {
      const userId = req.query.userId;
      const user = await Employee.findById(userId);
      const employee=user.empname;
      if (!user) 
      {
          return res.status(404).json({ message: 'User not found' });
      }
      const works = await SubmittedWork.find({}).sort({ createdAt: -1 });
      res.render("otherworks", { user: user, works: works,employee });
    }
    catch(error)
    {
      res.status(500).json({message:error.message});
    }
});

module.exports = router;
