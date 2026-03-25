export function getLegalBasis(caseType: string) {
  if (caseType === "fiscal") {
    return ["Lei 2.657/96", "LC 87/96"];
  }
  if (caseType === "RH") {
    return ["Lei 5.427/2009"];
  }
  return [];
}