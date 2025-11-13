import { z } from 'zod';

// Schema para criação de usuário. Todos os campos são obrigatórios.
export const createUserSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  telefone: z.string().optional(),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

// Schema para atualização de usuário. Todos os campos são opcionais.
export const updateUserSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres.").optional(),
  email: z.string().email("Formato de e-mail inválido.").optional(),
  telefone: z.string().optional(),
});