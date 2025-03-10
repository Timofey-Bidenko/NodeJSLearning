import { Router } from "express";
import { taskValidator } from "../validators/taskValidator.js";
import { ensureMainKey, findItem } from "../middleware/dataStore.js";
import { getUser } from "../controllers/userController.js";
import { authenticateTokens } from "../middleware/authentication.js";
import {
    createTask, getTasks, getTask,
    updateTask, deleteTask, renderHome
} from "../controllers/viewController.js";

export const viewRouter = Router();

viewRouter.post("/:mainKey", ensureMainKey, getUser, authenticateTokens, taskValidator, createTask);
viewRouter.get("/:mainKey", ensureMainKey, getUser, authenticateTokens, getTasks);
viewRouter.get("/:mainKey/:itemId", ensureMainKey, getUser, authenticateTokens, findItem, getTask);
viewRouter.put("/:mainKey/:itemId", ensureMainKey, getUser, authenticateTokens, findItem, updateTask);
viewRouter.delete("/:mainKey/:itemId", ensureMainKey, getUser, authenticateTokens, findItem, deleteTask);
viewRouter.all("*", renderHome);

import {getAllUsers, addUser} from "./test.js";
console.log("Trying to get users...")
addUser({
    mainKey: "Admin000",
})
//getAllUsers()