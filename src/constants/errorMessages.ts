import { ErrorCode } from "./errorCodes";

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.MISSING_FIELDS]: "Campos obrigatórios não foram fornecidos.",
  [ErrorCode.INVALID_FORMAT_CPF]: "CPF inválido. Use o formato 00000000000.",
  [ErrorCode.USER_NOT_FOUND]: "Usuário não encontrado.",
  [ErrorCode.EMAIL_ALREADY_EXISTS]: "E-mail já está em uso.",
  [ErrorCode.CPF_ALREADY_EXISTS]: "CPF já está em uso.",
  [ErrorCode.SERVER_ERROR]: "Erro interno no servidor.",
  [ErrorCode.CATEGORY_ALREADY_EXISTS]: "Já existe uma categoria com esse nome.",
  [ErrorCode.CATEGORY_NOT_FOUND]: "Categoria não encontrada.",
  [ErrorCode.PAYMENT_NOT_FOUND]: "Pagamento não encontrado.",
  [ErrorCode.INVALID_PAYMENT_METHOD]: "Método de pagamento inválido.",
  [ErrorCode.USER_ID_NOT_FOUND]: "Usuário associado ao pagamento não existe."
};
