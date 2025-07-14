import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";

export class UserController {

  async findAllUsers(request, response) {
    try {
      const users = await prismaClient.user.findMany({
        select: { id: true, name: true, email: true, phone: true, isAdmin: true },
      });
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async findUser(request, response) {
    const { id } = request.params;

    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, phone: true, isAdmin: true },
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async saveUser(request, response) {
    const { name, email, password, isAdmin = false, phone } = request.body;

    try {
      const emailExists = await prismaClient.user.findUnique({ where: { email } });
      
      if (emailExists) {
        return response.status(409).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prismaClient.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          isAdmin,
        },
        select: { id: true, name: true, email: true, phone: true, isAdmin: true },
      });

      return response.status(201).json(newUser);

    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(request, response) {
    const { id } = request.params;
    const { name, email, phone, isAdmin, password } = request.body;

    try {
      const user = await prismaClient.user.findUnique({ where: { id } });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: { name, email, phone, isAdmin, password },
        select: { id: true, name: true, email: true, phone: true, isAdmin: true },
      });

      return response.status(200).json(updatedUser);

    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(request, response) {
    const { id } = request.params;

    try {
      const user = await prismaClient.user.findUnique({ where: { id } });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      await prismaClient.user.delete({ where: { id } });

      return response.status(204).send();

    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
