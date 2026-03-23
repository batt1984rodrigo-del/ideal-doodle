import Link from "next/link";

export function Header() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="space-between">
        <div>
          <strong>Marketing SaaS MVP</strong>
          <div className="muted" style={{ marginTop: 4 }}>
            Diagnóstico auditável + estratégia + conteúdo pronto
          </div>
        </div>
        <div className="row">
          <Link className="button secondary" href="/dashboard">
            Dashboard
          </Link>
          <form action="/api/logout" method="post">
            <button className="button danger" type="submit">
              Sair
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
