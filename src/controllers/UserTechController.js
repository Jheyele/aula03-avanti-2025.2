import { prismaClient } from "../database/PrismaClient.js";

export class UserTechController {
  async addTechToUser(request, response) {
    const { user_id, tech_id } = request.body;

    try {
      const user = await prismaClient.user.findUnique({ where: { id: user_id } });
      const tech = await prismaClient.tech.findUnique({ where: { id: tech_id } });

      if (!user || !tech) {
        return response.status(404).json({ error: "User or Tech not found" });
      }

      const userTechExists = await prismaClient.userTech.findUnique({
        where: {
          user_id_tech_id: {
            user_id,
            tech_id
          }
        }
      });

      if (userTechExists) {
        return response.status(409).json({ error: "User already has this tech" });
      }

      const userTech = await prismaClient.userTech.create({
        data: {
          user_id,
          tech_id
        },
        select: {
          id: true,
          user: { select: { id: true, name: true } },
          tech: { select: { id: true, name: true } }
        }
      });

      return response.status(201).json(userTech);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async removeTechFromUser(request, response) {
    const { user_id, tech_id } = request.body;

    try {
      const userTech = await prismaClient.userTech.findUnique({
        where: {
          user_id_tech_id: {
            user_id,
            tech_id
          }
        }
      });

      if (!userTech) {
        return response.status(404).json({ error: "Relation not found" });
      }

      await prismaClient.userTech.delete({
        where: {
          user_id_tech_id: {
            user_id,
            tech_id
          }
        }
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async listUserTechs(request, response) {
    const { user_id } = request.params;

    try {
      const user = await prismaClient.user.findUnique({
        where: { id: user_id },
        include: {
          user_tech: {
            include: {
              tech: true
            }
          }
        }
      });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const techs = user.user_tech.map((relation) => relation.tech);

      return response.status(200).json(techs);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
