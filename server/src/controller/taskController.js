import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, date, time, category, status, progress } = req.body;

    const task = await Task.create({
      title,
      description,
      date,
      time,
      category,
      status,
      progress,
      userId: req.userId,
    });

    const populatedTask = await task.populate(["category", "status"]);

    res.status(201).json(populatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Get Tasks
export const getTasks = async (req, res) => {
  try {
    const query = { userId: req.userId };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.favorite === "true") {
      query.isFavorite = true;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 }).populate(["category", "status"]);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// Favorite Task
export const toggleFavorite = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.userId,
  }).populate(["category", "status"]);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.isFavorite = !task.isFavorite;
  await task.save();

  res.json(task);
};

// Edit Task

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate(["category", "status"]);

  res.json(updated);
};