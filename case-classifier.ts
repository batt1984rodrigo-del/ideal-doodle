export function classifyCase(project: any) {
  if (project.caseType) return project.caseType;

  if (project.legalContext?.includes("ICMS")) return "fiscal";
  if (project.summary?.toLowerCase().includes("licença")) return "RH";
  if (project.summary?.toLowerCase().includes("mandado")) return "judicial";

  return "outro";
}