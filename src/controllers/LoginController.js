import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginController {
  async login(request, response) {
    const { email, password } = request.body;

    try {
      const user = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        return response.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).json({ error: "Invalid credentials" });
      }

      const payload = {
        userId: user.id,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: "4h",
      });

      return response.status(200).json({...payload, token});

    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}