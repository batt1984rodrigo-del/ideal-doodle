import { MarketingOutput } from "@/lib/types";

export function ResultCard({ output }: { output: MarketingOutput }) {
  return (
    <div className="grid">
      <div className="card">
        <h3>Diagnóstico</h3>
        <pre className="output">{output.diagnostico}</pre>
      </div>
      <div className="card">
        <h3>Oportunidade principal</h3>
        <pre className="output">{output.oportunidade_principal}</pre>
      </div>
      <div className="card">
        <h3>Estratégia recomendada</h3>
        <pre className="output">{output.estrategia_recomendada}</pre>
      </div>
      <div className="card">
        <h3>Conteúdo gerado</h3>
        <pre className="output">{output.conteudo_gerado}</pre>
      </div>
      <div className="card">
        <h3>Objeções respondidas</h3>
        <pre className="output">{output.objecoes_respondidas.join("\n\n")}</pre>
      </div>
      <div className="card">
        <h3>Próximo passo recomendado</h3>
        <pre className="output">{output.proximo_passo}</pre>
      </div>
    </div>
  );
}
