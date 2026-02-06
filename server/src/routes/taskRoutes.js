import express from "express";
import { createTask, deleteTask, getTasks, toggleFavorite, updateTask } from "../controller/taskController.js";


const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.patch("/:id", toggleFavorite);
router.put("/:id", updateTask);

export default router;