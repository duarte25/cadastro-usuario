import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório."),
  lastName: z.string().min(1, "O sobrenome é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  isActive: z.boolean().default(true),
  profileId: z.string().uuid("O ID do perfil deve ser um UUID válido."),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório.").optional(),
  lastName: z.string().min(1, "O sobrenome é obrigatório.").optional(),
  email: z.string().email("Formato de e-mail inválido.").optional(),
  isActive: z.boolean().optional(),
  profileId: z.string().uuid("O ID do perfil deve ser um UUID válido.").optional(),
});
