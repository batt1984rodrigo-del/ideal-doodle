export function decideFlow(context: any) {
  if (context.caseType === "RH") return "arquivamento";
  if (context.caseType === "fiscal") return "julgamento";
  if (context.caseType === "judicial") return "cumprimento";
  if (context.caseType === "omissao") return "encaminhamento";

  return "analise";
}