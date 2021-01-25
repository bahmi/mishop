import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validateRequest as schemaValidator } from "../middleware/validateMiddleware.js";
import {
  registerUserSchema,
  authUserSchema,
  updateUserProfileSchema,
  updateUserSchema,
} from "../schemas/userSchemas.js";

const router = express.Router();

router
  .route("/")
  .post(schemaValidator(registerUserSchema), registerUser)
  .get(protect, admin, getUsers);

router.post("/login", schemaValidator(authUserSchema), authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, schemaValidator(updateUserProfileSchema), updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, schemaValidator(updateUserSchema), updateUser);

export default router;
