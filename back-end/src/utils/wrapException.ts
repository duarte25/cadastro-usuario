import { sendError } from "./message";
import { ZodError } from "zod";

export class APIError extends Error {
  code: number;
  errors?: any[];

  constructor(message: string | ZodError | any[], code: number = 400, errors?: any[]) {
    if (message instanceof ZodError) {
      // Tratamento específico para ZodError
      const formatted = message.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      super("Erro de validação");
      errors = formatted;
    } else if (Array.isArray(message)) {
      // Caso já venha como lista de erros
      super("Erro de validação");
      errors = message;
    } else {
      // Erros comuns
      super(message);
    }

    this.code = code;
    this.errors = errors;

    // Corrige o protótipo
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Função para envolver a execução de funções assíncronas com tratamento de exceções
export const wrapException = (fn: Function) => {
  return async (req: any, res: any, next: Function): Promise<any> => {
    let tempoInicio: number | undefined;
    if (process.env.DEBUGLOG === "true") {
      tempoInicio = performance.now();
    }

    try {
      return await fn(req, res, next);
    } catch (err: any) {
      if (err instanceof APIError) {
        // Erro retornado da API personalizada
        return sendError(res, err.code, err.errors || err.message);
      }

      console.error("Erro não tratado:", err);
      return sendError(res, 500, [err.message || "Erro interno do servidor."]);
    } finally {
      if (process.env.DEBUGLOG === "true" && tempoInicio) {
        const millis = parseInt((performance.now() - tempoInicio).toString());
        console.log(`${millis} ms`);
      }
    }
  };
};