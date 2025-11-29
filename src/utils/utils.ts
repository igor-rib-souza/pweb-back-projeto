export const isValidCPF = (cpf: string): boolean => {
  return /^\d{11}$/.test(cpf);
};
