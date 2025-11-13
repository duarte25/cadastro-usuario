import { applyZodInitialConfig } from "@/utils/zod";
import { z } from "zod";

applyZodInitialConfig();

export class UserSchemas {
  static criar = z.object({
    firstName: z.string().min(1, "O nome é obrigatório."),
    lastName: z.string().min(1, "O sobrenome é obrigatório."),
    email: z.string().email("Formato de e-mail inválido."),
    isActive: z.boolean().default(true),
    profileId: z.string().uuid("O ID do perfil deve ser um UUID válido."),
  })

  static alterar = z.object({
    firstName: z.string().min(1, "O nome é obrigatório.").optional(),
    lastName: z.string().min(1, "O sobrenome é obrigatório.").optional(),
    email: z.string().email("Formato de e-mail inválido.").optional(),
    isActive: z.boolean().optional(),
    profileId: z.string().uuid("O ID do perfil deve ser um UUID válido.").optional(),
  });

  static buscarUser = z.object({
    _id: z.string(),
    nome: z.string(),
    email: z.string().email()
  });

  static filtrarUser = z.object({
    _id: z.string(),
    nome: z.string(),
    email: z.string().email(),
    profileId: z.string()
  });

}