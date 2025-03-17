import { Router } from "express";
import Teacher from "../../models/teacher.js";

const teacherRouter = Router();

// Create Teacher
teacherRouter.post("/post", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send("Teacher created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Teachers
teacherRouter.get("/get", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Teacher
teacherRouter.put("/put/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) return res.status(404).send("Teacher not found");
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Teacher
teacherRouter.delete("/delete/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).send("Teacher not found");
    res.status(200).send("Teacher deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default teacherRouter;
