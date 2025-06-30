import { prismaClient } from "../database/PrismaClient.js";

export class TechController {
  async findAllTechs(request, response) {
    try {
      const techs = await prismaClient.tech.findMany();
      return response.status(200).json(techs);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async createTech(request, response) {
    const { name } = request.body;

    try {
      const techExists = await prismaClient.tech.findFirst({ where: { name } });

      if (techExists) {
        return response.status(409).json({ error: "Tech already exists" });
      }

      const tech = await prismaClient.tech.create({
        data: { name }
      });

      return response.status(201).json(tech);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteTech(request, response) {
    const { id } = request.params;

    try {
      const tech = await prismaClient.tech.findUnique({ where: { id } });

      if (!tech) {
        return response.status(404).json({ error: "Tech not found" });
      }

      await prismaClient.tech.delete({ where: { id } });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
