export function validateOutput(output: any) {
  if (!output.analise?.fatos_comprovados?.length) {
    throw new Error("Saída inválida: sem fatos comprovados");
  }
  return true;
}