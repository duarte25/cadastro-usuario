export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  password?: string; // Incluído para uso interno do serviço, mas não deve ser retornado na API
  // Adicione quaisquer outros campos que seu modelo de usuário possa ter
}

export interface CreateUserData {
  nome: string;
  email: string;
  telefone?: string;
  password?: string;
}

export interface ListUserParams {
  pagina: number;
  limite: number;
  nome?: string;
  telefone?: string;
  email?: string;
}
export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  password?: string; // Incluído para uso interno do serviço, mas não deve ser retornado na API
  // Adicione quaisquer outros campos que seu modelo de usuário possa ter
}

export interface CreateUserData {
  nome: string;
  email: string;
  telefone?: string;
  password?: string;
}

export interface ListUserParams {
  pagina: number;
  limite: number;
  nome?: string;
  telefone?: string;
  email?: string;
}