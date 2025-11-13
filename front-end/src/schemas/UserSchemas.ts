import { applyZodInitialConfig } from "@/utils/zod";
import { z } from "zod";

applyZodInitialConfig();

export class UserSchemas {
  static criar = z.object({
    nome: z.string().min(1).max(256),
    email: z.string().min(1).email("Email inválido").max(256),
    senha: z.string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(256, "A senha deve ter no máximo 256 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/\d/, "A senha deve conter ao menos um número")
      .regex(/[@$!%*?&]/, "A senha deve conter ao menos um caractere especial"),
    confirmarSenha: z.string().min(8).max(256),
    telefone: z.string().min(8).max(12),
    grupo_ids: z
      .array(z.string().uuid({ message: "ID do grupo inválido" }), {
        required_error: "Você precisa selecionar pelo menos um grupo",
      })
      .min(1, { message: "Selecione pelo menos um grupo" }),
    empresas: z.array(z.string().uuid("ID de empresa inválido")).optional(),
    endereco: z.object({
      logradouro: z.string().min(1, "Logradouro é obrigatório"),
      numero: z.string().min(1, "Número é obrigatório"),
      bairro: z.string().min(1, "Bairro é obrigatório"),
      cep: z.string().regex(/^\d{8}$/, "CEP inválido"),
      cidade: z.string().min(3, "Cidade é obrigatória").max(256),
      estado: z.string().min(1, "Estado é obrigatório"),
      complemento: z.string().nullable().optional(),
    }),
    trello_usuario_nome: z.string().max(256).nullable().optional(),
    trello_usuario_id: z.string().max(256).nullable().optional(),
    imagem: z
      .instanceof(File) // Verifica se é uma instância de File
      .refine((file) => file.type.startsWith('image/'), {
        message: "O arquivo deve ser uma imagem", // Validação do tipo de arquivo
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "O arquivo deve ter no máximo 5MB", // Validação de tamanho (5MB)
      }).optional(),
  }).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"], // Aponta o erro para o campo correto
  });

  static alterar = z.object({
    nome: z.string().min(1).max(256).optional(),
    email: z.string().min(1).email("Email inválido").max(256).optional(),
    telefone: z.string().min(8).max(12).optional(),
    grupo_ids: z
      .array(z.string().uuid({ message: "ID do grupo inválido" }), {
        required_error: "Você precisa selecionar pelo menos um grupo",
      })
      .min(1, { message: "Selecione pelo menos um grupo" }),
    empresas: z.array(z.string().uuid("ID de empresa inválido")).optional(),
    endereco: z.object({
      logradouro: z.string().min(1, "Logradouro é obrigatório").optional(),
      numero: z.string().min(1, "Número é obrigatório").optional(),
      bairro: z.string().min(1, "Bairro é obrigatório").optional(),
      cep: z.string().regex(/^\d{8}$/, "CEP inválido").optional(),
      cidade: z.string().min(3, "Cidade é obrigatória").max(256).optional(),
      estado: z.string().min(1, "Estado é obrigatório").optional(),
      complemento: z.string().nullable().optional(),
    }),
    trello_usuario_nome: z.string().max(256).optional(),
    trello_usuario_id: z.string().max(256).optional(),
    imagem: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: "O arquivo deve ser uma imagem",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "O arquivo deve ter no máximo 5MB",
      }).optional()
  });

  static alterPerfil = z.object({
    nome: z.string().min(1).max(256).optional(),
    email: z.string().min(1).email("Email inválido").max(256).optional(),
    telefone: z.string().min(8).max(12).optional(),
    endereco: z.object({
      logradouro: z.string().min(1, "Logradouro é obrigatório").optional(),
      numero: z.string().min(1, "Número é obrigatório").optional(),
      bairro: z.string().min(1, "Bairro é obrigatório").optional(),
      cep: z.string().regex(/^\d{8}$/, "CEP inválido").optional(),
      cidade: z.string().min(3, "Cidade é obrigatória").max(256).optional(),
      estado: z.string().min(1, "Estado é obrigatório").optional(),
      complemento: z.string().nullable().optional(),
    }),
    imagem: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: "O arquivo deve ser uma imagem",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "O arquivo deve ter no máximo 5MB",
      }).optional()
  });

  static alterPassword = z.object({
    senha: z.string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(256, "A senha deve ter no máximo 256 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/\d/, "A senha deve conter ao menos um número")
      .regex(/[@$!%*?&]/, "A senha deve conter ao menos um caractere especial"),
    confirmarSenha: z.string().min(8).max(25)
  })
    .refine((data) => data.senha === data.confirmarSenha, {
      message: "As senhas não coincidem",
      path: ["confirmarSenha"],
    });

  static buscarUser = z.object({
    _id: z.string(),
    nome: z.string(),
    email: z.string().email()
  });

  static filtrarUser = z.object({
    _id: z.string(),
    nome: z.string(),
    email: z.string().email()
  });

}