# Módulo 6 · Introdução a Prompts (slides)

Slides em HTML/CSS/JS puro para os 3 vídeos do Módulo 6 (apresentação: Gustavo Fiss). Não há build nem dependências; a única coisa externa é o Google Fonts, e há fontes de reserva caso ele não carregue.

```
modulo6/
├── README.md                          este arquivo
├── assets/
│   ├── style.css                      visual compartilhado (template do curso)
│   └── slides.js                      navegação compartilhada
├── video0-introducao-ao-modulo.html   5 slides (com moldura para a câmera)
├── video1-o-que-e-um-prompt.html      9 slides
├── video2-melhorando-seus-prompts.html 8 slides
└── video3-por-que-o-prompt-falha.html 10 slides
```

## Como usar

- **Abrir:** dois cliques no arquivo `.html` (Chrome ou Edge).
- **Navegar:** → ou espaço avançam e ← volta. Nos slides com revelação, cada avanço mostra um item, e ← desfaz o último item antes de voltar de slide. Clicar no quarto esquerdo ou direito da tela também volta ou avança. Home e End vão ao primeiro e ao último slide.
- **F:** tela cheia. **N:** mostra ou esconde as notas do apresentador (bloco e tempo do roteiro). As notas ficam escondidas por padrão e não aparecem na gravação.
- **URL:** `#5` abre no slide 5; `?revelar=tudo` mostra todos os itens já revelados (útil para revisar).
- **PDF:** Ctrl+P → "Salvar como PDF". Em "Mais definições", use Margens: Nenhuma e marque "Gráficos de plano de fundo". Sai um slide por página, com tudo revelado e sem as notas.

## (a) O projeto

"Mini Curso de Introdução à Inteligência Artificial", feito por um grupo de 7 integrantes (um módulo cada) para uma escola estadual parceira. Os vídeos são gravados e assíncronos. O público é misto: alunos do fundamental, alunos do médio e professores. O conteúdo precisa funcionar para quem nunca usou IA sem ficar infantil para os professores.

| Módulo | Tema | Relação com o Módulo 6 |
| --- | --- | --- |
| 1 (Jhonne) | O que é IA | Base geral |
| 2 (Murilo) | Como a IA funciona: tokens, janela de contexto, limites do gratuito, alucinação | Já explicou *por que* prompts enxutos economizam. No Módulo 6 isso é retomado em **uma frase**. |
| 3 (Christian) | Uso consciente na aprendizagem; método "Certeza do Uso"; "copiloto, não piloto automático" | Retomado na hora de conferir a resposta. Frase de assinatura do curso: **"IA APOIA. VOCÊ DECIDE."** |
| 4 (Tauane) | Ferramentas: ChatGPT, NotebookLM, Perplexity; fórmula de prompt de 5 partes; cuidado com dados pessoais | O Módulo 6 aprofunda e usa os mesmos termos: Tarefa, Contexto, Formato, Limites. |
| 5 (Gustavo, **este**) | Introdução a prompts | ~30 min em 3 vídeos de ~10 min |
| 6 | Limitações, alucinações, ética e legislação | O Módulo 6 NÃO aprofunda erros da IA nem ética, só aponta para lá. |
| 7 | Atividade prática e geração de recursos pedagógicos | O Módulo 6 NÃO faz aplicação prática, só prepara o aluno para pedir bem e aponta para lá. |

## (b) Decisões de conteúdo já tomadas (não reverter)

- Os 3 vídeos: (1) o que é um prompt e a estrutura Tarefa + Contexto + Formato; (2) como melhorar um prompt; (3) por que o prompt falha e como consertar.
- Modelo completo ensinado: **Papel (opcional) + Tarefa + Contexto + Limites + Formato + Exemplo (opcional)**. É ponto de partida, não receita fixa.
- Os trechos "para ir além" (a ordem das partes não importa muito; cada ferramenta responde de um jeito) são **só falados** e não vão para os slides. Estão lembrados nas notas do slide 2.8.
- As demonstrações ao vivo são gravação de tela. Os slides só preparam (1.5) e abrem espaço para elas (1.6, uma moldura de navegador vazia para sobrepor a gravação).
- Nos exemplos nunca aparecem dados pessoais reais.
- Decidido na produção dos slides:
  - O Vídeo 3 segue a ordem da lista de erros (1→5), com um slide por erro e um selo "ERRO N · nome" acima do título. Os Erros 4 (ajuste vago) e 5 (dados pessoais) ganharam "antes e depois" próprios. O aviso "Nos exemplos, nunca use dados pessoais." saiu do gancho e foi para o Erro 5. "Peça ajuda à própria IA" virou uma dica geral, depois dos 5 erros. Por isso o Vídeo 3 tem 12 slides.
  - No Erro 5, os dados aparecem só como marcadores entre colchetes ([nome completo], [número], [turma]), nunca reais.
  - Frases-resumo e faixas de "próximo vídeo" são sempre o último passo de revelação do slide (1.7, 1.9, 2.8).
  - A capa traz o nome completo "Gustavo Fiss".
  - Fontes: Barlow Condensed (títulos) e Inter (corpo).

## (c) Identidade visual e convenção de cores

- 16:9 (1920x1080 de referência), fundo branco, quarto de círculo com gradiente ciano→azul no canto inferior direito, títulos em CAIXA ALTA condensada, corpo com no mínimo 32px.
- Cores: ciano `#01CDFF` (destaque e "certo/bom"), azul `#218BC5`, preto `#1A1A1A`, vermelho-suave `#E4636A` (só "errado/fraco").
- **Partes do prompt (iguais nos 3 vídeos), sempre com legenda quando usadas:**

| Parte | Cor |
| --- | --- |
| Tarefa | ciano `#01CDFF` |
| Contexto | azul `#218BC5` (texto branco) |
| Formato | preto sobre cinza claro, com contorno preto |
| Limites | laranja claro `#F5A623` |
| Papel / Exemplo (opcionais) | branco com borda tracejada cinza |

Para criar outro módulo com o mesmo visual, copie `assets/` e troque o texto `RODAPE_PADRAO` no início de `slides.js`.

## (d) Slides e tempos estimados

Os tempos também estão nas notas (tecla N) de cada slide.

**Vídeo 0 · Introdução ao módulo (~3 min, com câmera)**

Este vídeo tem `data-camera` no `<main class="deck">`. Isso troca o quarto de círculo por uma moldura 16:9 de 576x324 px no canto inferior direito (a 56 px das bordas, na referência 1920x1080), para encaixar a câmera na edição. O conteúdo fica numa coluna de até 1100 px à esquerda, e o número do slide vai para o canto superior direito.

| # | Slide | Tempo |
| --- | --- | --- |
| 1 | Capa: Introdução a prompts · Apresentação do módulo | 00:00–00:20 |
| 2 | Onde estamos no curso (Módulos 1–4 → 5 → 6 e 7) | 00:20–01:00 |
| 3 | Por que aprender a pedir? (alunos e professores) | 01:00–01:40 |
| 4 | O que você vai aprender (os 3 vídeos) | 01:40–02:30 |
| 5 | Vamos começar? + próximo: Vídeo 1 | 02:30–03:00 |

**Vídeo 1 · O que é um prompt (~10 min)**

| # | Slide | Tempo |
| --- | --- | --- |
| 1 | Capa: Introdução a prompts | 00:00–00:30 |
| 2 | Gancho: "Por que a mesma IA responde bem para um colega e mal para mim?" | 00:30–01:15 |
| 3 | Prompt é o seu pedido (pergunta, instrução, texto colado) | 01:15–01:50 |
| 4 | É como pedir um lanche (analogia da cantina) | 01:50–02:25 |
| 5 | O mesmo tema, dois pedidos (fotossíntese) | 02:25–03:00 |
| 6 | Vamos comparar ao vivo (moldura para gravação de tela) | 03:00–05:00 |
| 7 | Tarefa + Contexto + Formato | 05:00–06:45 |
| 8 | Na prática (professor e aluno, partes coloridas) | 06:45–08:45 |
| 9 | O que levar + próximo vídeo | 08:45–10:00 |

**Vídeo 2 · Melhorando seus prompts (~10 min)**

| # | Slide | Tempo |
| --- | --- | --- |
| 1 | Abertura | 00:00–00:30 |
| 2 | Já temos o básico (mapa: Papel, Limites, Exemplo, Ajustes) | 00:30–01:15 |
| 3 | Quem responde e para quem (átomo para criança × professor) | 01:15–02:30 |
| 4 | Limites: diga onde parar | 02:30–03:30 |
| 5 | Mostre o resultado que você quer (analogia do corte de cabelo) | 03:30–05:00 |
| 6 | Ajuste, não recomece | 05:00–06:45 |
| 7 | Prompts que economizam (retoma o Módulo 2 em uma frase) | 06:45–08:30 |
| 8 | O modelo completo + próximo vídeo | 08:30–10:00 |

**Vídeo 3 · Por que seu prompt falha (~10 min)**

| # | Slide | Tempo |
| --- | --- | --- |
| 1 | Abertura | 00:00–00:20 |
| 2 | Segui a fórmula e deu ruim? | 00:20–00:50 |
| 3 | Os 5 erros mais comuns | 00:50–01:50 |
| 4 | Erro 1 · Pedido vago (antes e depois) | 01:50–02:40 |
| 5 | Erro 2 · Muitas tarefas num pedido só (divida em etapas) | 02:40–03:30 |
| 6 | Erro 3 · Falta de contexto (antes e depois) | 03:30–04:20 |
| 7 | Erro 4 · Ajuste vago (antes e depois) | 04:20–05:05 |
| 8 | Erro 5 · Dados pessoais no pedido (antes e depois + aviso) | 05:05–05:55 |
| 9 | Dica: peça ajuda à própria IA | 05:55–06:55 |
| 10 | Desafio: conserte este pedido (contagem de 10 s, depois a sugestão aparece sozinha) | 06:55–08:10 |
| 11 | Antes de enviar (checklist + modelo para salvar no celular) | 08:10–09:20 |
| 12 | IA APOIA. VOCÊ DECIDE. + ponte para o Módulo 7 | 09:20–10:00 |

## (e) Pendências abertas

- [ ] Confirmar o rodapé da capa: "IFSul Campus Pelotas · CSTSI · Atividade de Extensão II" (herdado do Módulo 2).
- [ ] O tema "fotossíntese" (1.5) também aparece no Módulo 4. Se o grupo preferir, trocar por "ciclo da água".
- [ ] Os exemplos do Vídeo 3 podem ser simplificados se a maioria do público for do fundamental.
- [ ] Testar os dois pedidos do slide 1.5 na ferramenta escolhida antes de gravar a demonstração do slide 1.6.

## Notas técnicas

- Itens revelados um a um: elementos com a classe `reveal`, na ordem do HTML. `data-junto` revela junto com o item anterior. `data-auto="10"` faz o slide avançar sozinho depois de N segundos (usado no desafio do Vídeo 3).
- `data-colorir` no slide deixa as partes do prompt neutras até aparecer o item com a classe `passo-cores` (usado no slide 1.8).
- Testado no Chrome headless (1920x1080): nenhum texto de corpo abaixo de 32px, nenhum conteúdo fora da área útil, avanço e volta simétricos em todos os slides, contagem de 10 s, modo de impressão e fontes de reserva.
