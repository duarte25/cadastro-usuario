import { z } from 'zod';

// Schema para criação de usuário. Todos os campos são obrigatórios.
export const createUserSchema = z.object({
  nome: z.string({ required_error: "O campo nome é obrigatório." }).min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string({ required_error: "O campo email é obrigatório." }).email("Formato de e-mail inválido."),
  telefone: z.string().optional(),
  password: z.string({ required_error: "O campo password é obrigatório." }).min(6, "A senha deve ter no mínimo 6 caracteres."),
});

// Schema para atualização de usuário. Todos os campos são opcionais.
export const updateUserSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres.").optional(),
  email: z.string().email("Formato de e-mail inválido.").optional(),
  telefone: z.string().optional(),
});

// Schema para atualização de senha.
export const updateUserPasswordSchema = z.object({
    password: z.string({ required_error: "O campo password é obrigatório." }).min(6, "A senha deve ter no mínimo 6 caracteres."),
});