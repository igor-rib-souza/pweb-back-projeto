import { ErrorCode } from "./errorCodes";

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.MISSING_FIELDS]: "Campos obrigatórios não foram fornecidos.",
  [ErrorCode.INVALID_FORMAT_CPF]: "CPF inválido. Use o formato 000.000.000-00.",
  [ErrorCode.USER_NOT_FOUND]: "Usuário não encontrado.",
  [ErrorCode.EMAIL_ALREADY_EXISTS]: "E-mail já está em uso.",
  [ErrorCode.CPF_ALREADY_EXISTS]: "CPF já está em uso.",
  [ErrorCode.SERVER_ERROR]: "Erro interno no servidor.",
};
