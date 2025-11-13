// Removida a importação do Prisma, pois não é mais necessária.
import { sendError } from "./message";

export class APIError extends Error {
  code: number;
  errors?: any[];

  constructor(message: string | any[], code: number = 400, errors?: any[]) {
    // Se 'message' for um array, mantém como array no campo 'errors'
    if (Array.isArray(message)) {
      super("Erro de validação"); // Define uma mensagem genérica para o campo 'message'
      this.errors = message; // Armazena o array de erros no campo 'errors'
    } else {
      super(message); // Caso contrário, usa a mensagem diretamente
      this.errors = errors; // Armazena os erros adicionais, se fornecidos
    }

    // Configura o protótipo para que o stack trace funcione corretamente
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
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

      // Todos os blocos 'else if' e 'if' específicos do Prisma foram removidos.

      // Erro desconhecido (catch-all)
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