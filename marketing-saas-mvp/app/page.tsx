import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container hero">
        <div className="card">
          <span className="badge">MVP pronto para validar venda</span>
          <h1>Transforme briefing solto em diagnóstico, estratégia e conteúdo.</h1>
          <p>
            Este projeto já vem com dashboard simples, autenticação básica de admin,
            endpoint com OpenAI, histórico das execuções e banco local com Prisma.
          </p>
          <div className="row" style={{ marginTop: 20 }}>
            <Link href="/login" className="button">Entrar</Link>
            <Link href="/dashboard" className="button secondary">Ver dashboard</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
