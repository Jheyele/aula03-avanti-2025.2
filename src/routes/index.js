import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { LoginController } from "../controllers/LoginController.js";
import { TechController } from "../controllers/TechController.js";
import { UserTechController } from "../controllers/UserTechController.js";
import { validateBody } from "../middlewares/validate.js";
import { createUserSchema } from "../validators/userValidator.js";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

const userController = new UserController();
const loginController = new LoginController();
const techController = new TechController();
const userTechController = new UserTechController();

// Login
router.post("/login", loginController.login);

// User routes
router.get("/users", userController.findAllUsers);
router.get("/user/:id", userController.findUser);
router.post("/users", validateBody(createUserSchema), userController.saveUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Tech routes
router.get("/techs", techController.findAllTechs);
router.post("/techs", techController.createTech);
router.delete("/techs/:id", techController.deleteTech);

// UserTech routes
router.post("/user-techs", userTechController.addTechToUser);
router.delete("/user-techs", userTechController.removeTechFromUser);
router.get("/users/:user_id/techs", userTechController.listUserTechs);

export { router };
