import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { DEFAULT_MODEL, openai } from "@/lib/openai";
import { requireSession } from "@/lib/auth";
import { MarketingOutput } from "@/lib/types";

const schema = z.object({
  projectId: z.string().min(1)
});

const outputSchema = {
  type: "object",
  properties: {
    diagnostico: { type: "string" },
    oportunidade_principal: { type: "string" },
    estrategia_recomendada: { type: "string" },
    conteudo_gerado: { type: "string" },
    objecoes_respondidas: {
      type: "array",
      items: { type: "string" }
    },
    proximo_passo: { type: "string" }
  },
  required: [
    "diagnostico",
    "oportunidade_principal",
    "estrategia_recomendada",
    "conteudo_gerado",
    "objecoes_respondidas",
    "proximo_passo"
  ],
  additionalProperties: false
};

export async function POST(req: Request) {
  try {
    await requireSession();

    const body = schema.parse(await req.json());
    const project = await db.project.findUnique({
      where: { id: body.projectId }
    });

    if (!project) {
      return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada." },
        { status: 500 }
      );
    }

    const systemPrompt = `
Você é um sistema avançado de apoio a decisores, orientado por dados, estrutura, rastreabilidade e conversão.

Siga exatamente esta ordem de raciocínio e saída:
1. Diagnóstico
2. Oportunidade principal
3. Estratégia recomendada
4. Conteúdo gerado
5. Objeções respondidas
6. Próximo passo recomendado

Regras obrigatórias:
- Não invente dados, números, métricas ou depoimentos
- Se faltar prova, explicite a ausência e sugira o que inserir
- Foque em clareza, coerência, prova, conversão e rastreabilidade
- Use português do Brasil
- Seja direto, persuasivo, estratégico e pronto para uso
- No conteúdo, siga a lógica: problema, quebra de crença, solução, prova, oferta
- Se houver contexto de venda, responda às objeções: "é caro", "não sei usar", "vou fazer sozinho"
`;

    const userPrompt = `
Contexto do projeto:
- Nome: ${project.name}
- Produto: ${project.product}
- Público: ${project.audience}
- Objetivo: ${project.objective}
- Oferta: ${project.offer || "não informado"}
- Canal: ${project.channel || "não informado"}
- Objeções: ${project.objections || "não informado"}
- Estágio: ${project.stage || "não informado"}

Gere a saída em formato estruturado para dashboard.
`;

    const response = await openai.responses.create({
      model: DEFAULT_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "marketing_decision_output",
          strict: true,
          schema: outputSchema
        }
      }
    });

    const content = response.output_text;
    const parsed = JSON.parse(content) as MarketingOutput;

    const run = await db.run.create({
      data: {
        projectId: project.id,
        inputJson: JSON.stringify({
          projectId: project.id,
          product: project.product,
          audience: project.audience,
          objective: project.objective,
          offer: project.offer,
          channel: project.channel,
          objections: project.objections,
          stage: project.stage
        }),
        outputJson: JSON.stringify(parsed),
        outputText: content,
        model: DEFAULT_MODEL,
        status: "completed",
        responseId: response.id
      }
    });

    return NextResponse.json({
      success: true,
      runId: run.id,
      responseId: response.id,
      output: parsed
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "UNAUTHORIZED"
            ? "Não autenticado."
            : "Erro ao gerar resultado."
      },
      { status: error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500 }
    );
  }
}
