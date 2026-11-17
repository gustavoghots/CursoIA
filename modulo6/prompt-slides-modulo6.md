# Prompt para o Claude Code: slides do Módulo 6 ("Introdução a Prompts")

> Cole tudo abaixo da linha no Claude Code, na pasta onde estão (ou ficarão) os módulos do curso.

---

Você é um desenvolvedor front-end e designer de apresentações. Crie os slides em HTML/CSS/JS puro (sem frameworks, sem build, sem dependências de npm) para o **Módulo 6 ("Introdução a Prompts")** de um mini curso de IA para professores e alunos do ensino fundamental e médio de uma escola estadual. As falas serão gravadas em vídeo por mim (Gustavo), então os slides precisam ser visuais, limpos e com pouco texto.

## 0. Contexto do projeto (leia antes de começar)

**O curso.** "Mini Curso de Introdução à Inteligência Artificial", feito por um grupo de 7 integrantes (um módulo cada) para uma escola estadual parceira. Os vídeos são assíncronos, gravados, e o público é misto: alunos do fundamental, alunos do médio e professores. O conteúdo precisa funcionar para quem nunca usou IA e, ao mesmo tempo, não ser infantil para os professores.

**Os módulos e como o Módulo 6 se conecta com eles:**

| Módulo | Tema | Relação com o Módulo 6 |
| --- | --- | --- |
| 1 (Jhonne) | O que é IA | Base geral |
| 2 (Murilo) | Como a IA funciona: tokens, janela de contexto, limites do gratuito, alucinação | Já explicou *por que* prompts enxutos economizam. No Módulo 6 só retomamos isso em **uma frase**. |
| 3 (Christian) | Uso consciente na aprendizagem; método "Certeza do Uso"; "copiloto, não piloto automático" | Retomado ao conferir a resposta. A frase de assinatura do curso é **"IA APOIA. VOCÊ DECIDE."** |
| 4 (Tauane) | Ferramentas: ChatGPT, NotebookLM, Perplexity; já apresentou uma fórmula de prompt de 5 partes em um slide e o cuidado com dados pessoais | O Módulo 6 aprofunda. **Use os mesmos termos:** Tarefa, Contexto, Formato, Limites. |
| 5 (Gustavo, **este**) | Introdução a prompts | ~30 min em 3 vídeos de ~10 min |
| 6 | Limitações, alucinações, ética e legislação | O Módulo 6 NÃO aprofunda erros da IA nem ética, só aponta para lá. |
| 7 | Atividade prática e geração de recursos pedagógicos (planos de aula, exercícios, imagens) | O Módulo 6 NÃO faz aplicação prática. Só prepara o aluno para pedir bem e aponta para lá. |

**Decisões de conteúdo já tomadas (não reverta):**
- Os 3 vídeos são: (1) O que é um prompt e a estrutura Tarefa + Contexto + Formato; (2) Como melhorar um prompt; (3) Por que seu prompt falha e como consertar.
- O modelo completo ensinado é: **Papel (opcional) + Tarefa + Contexto + Limites + Formato + Exemplo (opcional)**. É ponto de partida, não receita fixa.
- Trechos "para ir além" (ordem das partes não importa muito, cada ferramenta responde de um jeito) são **só falados**, não vão para os slides.
- Haverá demonstrações ao vivo em gravação de tela (comparar resposta vaga vs. detalhada). Os slides só **preparam** e **retomam** essas demonstrações.
- Nos exemplos nunca aparecem dados pessoais reais.

## 1. Estrutura de arquivos

Crie esta pasta:

```
modulo6/
├── README.md          (contexto e decisões deste módulo, veja seção 6)
├── assets/
│   ├── style.css      (estilos compartilhados e template)
│   └── slides.js      (navegação compartilhada)
├── video1-o-que-e-um-prompt.html
├── video2-melhorando-seus-prompts.html
└── video3-por-que-o-prompt-falha.html
```

**Se já existir uma pasta `modulo2/` (ou outra de módulo) no repositório,** abra o `assets/style.css` e o `assets/slides.js` dela e **reutilize o mesmo visual e a mesma navegação** (copie para `modulo6/assets/` e só adapte o rodapé e o necessário). Os módulos precisam parecer parte do mesmo curso. Se não existir, crie do zero conforme as regras abaixo.

Cada HTML contém os slides de um vídeo e importa o mesmo CSS e JS.

## 2. Identidade visual (obrigatória)

- Formato 16:9 (1920x1080 de referência), escalando para qualquer tela com a apresentação centralizada (use `transform: scale` calculado por JS no resize, com letterbox).
- Fundo branco `#FFFFFF`.
- Cores como variáveis CSS: ciano `#01CDFF` (destaque principal), azul `#218BC5` (secundário), preto `#1A1A1A` (texto) e um vermelho-suave `#E4636A` (`--erro`) usado só para "errado/fraco". O "certo/bom" usa ciano.
- Títulos em CAIXA ALTA, fonte condensada em negrito (Barlow Condensed ou Oswald, com fallback `"Arial Narrow", sans-serif`).
- Corpo em sans-serif limpa (Inter ou Barlow), **mínimo de 32px** na referência 1920x1080. Rodapé e número do slide ficam isentos desse mínimo.
- Bloco com gradiente (`#01CDFF → #218BC5`) em um canto inferior direito de cada slide (retângulo ou quarto de círculo), sem atrapalhar o conteúdo.
- Rodapé discreto: "Módulo 6 · INTRODUÇÃO A PROMPTS" e o número do slide (ex.: 3/9).
- Muito espaço em branco, **no máximo 2 linhas de texto por bloco**, uma ideia por slide.
- Tom lúdico na medida certa, sem infantilizar: ilustrações simples e geométricas, sem clipart infantil.
- Para exemplos de prompt, use um estilo de "balão de conversa" ou "campo de texto" (borda ciano, fundo branco, fonte do corpo) e destaque as partes do prompt com cores consistentes em todos os vídeos: **Tarefa = ciano**, **Contexto = azul**, **Formato = preto com fundo cinza claro**, **Limites = laranja claro `#F5A623`**. Mostre uma legenda com essa convenção sempre que as cores forem usadas.

## 3. Navegação e comportamento

- Setas ← → e barra de espaço para navegar; tecla **F** para tela cheia; clique nas bordas também avança/volta.
- Transição suave entre slides (fade ou slide curto de 300 ms). Respeite `prefers-reduced-motion`.
- Barra de progresso fina em ciano no topo.
- Slides marcados com **[REVELAR]**: cada avanço (→ ou espaço) revela **um item por vez**, e só passa para o próximo slide depois do último item. ← desfaz a última revelação antes de voltar de slide.
- **Notas do apresentador:** em cada slide, inclua um `<aside class="notes">` oculto com o bloco e o tempo do roteiro (ex.: "Bloco 3 · 03:00–05:00"). A tecla **N** mostra/esconde as notas. Não podem aparecer na gravação por padrão.
- Modo de impressão (`@media print`): um slide por página, **com todos os itens [REVELAR] já visíveis**, sem as notas.
- Sem nenhuma imagem externa: todas as ilustrações em SVG inline, CSS ou emojis simples. Nada de links quebrados.
- **Única dependência externa permitida:** Google Fonts via `<link>`. O layout não pode quebrar se a fonte não carregar (teste com os fallbacks).
- `<html lang="pt-BR">`, contraste alto, código limpo, comentado e responsivo.

## 4. Conteúdo slide a slide

### VÍDEO 1: O que é um prompt (~10 min, 9 slides)

*Slide 1: Capa.* Título: "INTRODUÇÃO A PROMPTS". Subtítulo: "Módulo 6 · Vídeo 1: Como pedir à IA". Rodapé da capa: "IFSul Campus Pelotas · CSTSI · Atividade de Extensão II". Apresentador: Gustavo. *(Notas: Bloco 1, 00:00)*

*Slide 2: Gancho.* Título: "COMO PEDIR À IA". Pergunta grande, em ciano: "POR QUE A MESMA IA RESPONDE BEM PARA UM COLEGA E MAL PARA MIM?" Abaixo, em menor: "Quase sempre, a diferença está no pedido."

*Slide 3: O que é um prompt.* Título: "PROMPT É O SEU PEDIDO". Três ícones simples em linha: pergunta (?), instrução (lista com check) e texto colado (folha). Legenda: "A IA não adivinha. Ela responde ao que você escreve." [REVELAR] cada ícone.

*Slide 4: Analogia da cantina.* Título: "É COMO PEDIR UM LANCHE". Dois balões de pedido lado a lado, cada um ligado ao resultado em SVG: "Um lanche." → prato com um ponto de interrogação; "Pão com queijo, sem tomate, para levar." → sanduíche pronto numa embalagem. [REVELAR] cada lado. Legenda: "Pedido vago: o atendente chuta. Pedido claro: acerta de primeira."

*Slide 5: O mesmo tema, dois pedidos.* Título: "O MESMO TEMA, DOIS PEDIDOS". Esquerda (ícone ✗ vermelho-suave): campo de texto "Explique fotossíntese." Direita (✓ ciano): campo de texto "Explique a fotossíntese para o 1º ano do médio, em até 150 palavras, com um exemplo do dia a dia." [REVELAR] cada lado.

*Slide 6: Demonstração ao vivo.* Slide-divisor limpo: título "VAMOS COMPARAR AO VIVO". Moldura de janela de navegador estilizada (SVG, vazia, com o texto "Gravação de tela") para eu sobrepor a gravação depois. Sem texto extra. *(Notas: Bloco 3, 03:00–05:00; testar os dois pedidos antes de gravar)*

*Slide 7: As três partes.* Título: "TAREFA + CONTEXTO + FORMATO". Três cartões grandes, cada um com uma pergunta: **Tarefa**: "O que eu quero que a IA faça?" · **Contexto**: "Para quem e em que situação?" · **Formato**: "Como quero receber a resposta?" Frase-chave abaixo: "Tarefa diz o que fazer, contexto diz para quem, formato diz como entregar." [REVELAR] um cartão por vez.

*Slide 8: Na prática.* Título: "NA PRÁTICA". Dois campos de texto, com as partes destacadas nas cores da convenção:
- **Professor:** "Crie 5 questões de múltipla escolha sobre a Revolução Francesa *(tarefa)* para o 9º ano *(contexto)*, com gabarito no final *(formato)*."
- **Aluno:** "Me ajude a estudar Geografia *(tarefa)*. Sou do 8º ano e o assunto é clima *(contexto)*. Faça um resumo em tópicos curtos *(formato)*."
[REVELAR] um por vez, e depois colora as partes. Inclua a legenda de cores.

*Slide 9: Fechamento.* Título: "O QUE LEVAR". Três itens com ícone: "Prompt é o seu pedido" · "A IA não adivinha" · "Tarefa + Contexto + Formato". Faixa em ciano embaixo: "PRÓXIMO VÍDEO: E SE A RESPOSTA VIER QUASE BOA?" [REVELAR] os três itens.

### VÍDEO 2: Melhorando seus prompts (~10 min, 8 slides)

*Slide 1: Abertura.* Título: "MELHORANDO SEUS PROMPTS". Subtítulo: "Papel, limites, exemplo e ajustes".

*Slide 2: Mapa do vídeo.* Título: "JÁ TEMOS O BÁSICO". Três cartões pequenos (Tarefa, Contexto, Formato) já abertos e, ao lado, quatro cartões fechados com "?" (Papel, Limites, Exemplo, Ajustes). [REVELAR] abrindo os quatro, um por vez.

*Slide 3: Papel, público e tom.* Título: "QUEM RESPONDE E PARA QUEM". Uma mesma pergunta ("Explique o que é um átomo") com duas respostas possíveis: "Para uma criança de 10 anos" (balão simples e curto) e "Para um professor" (balão mais técnico). Legenda: "O papel é opcional. Use quando o nível da linguagem importa." [REVELAR] cada lado.

*Slide 4: Limites.* Título: "LIMITES: DIGA ONDE PARAR". Quatro "etiquetas" em laranja claro: "máximo de 5 itens" · "sem termos técnicos" · "em até 100 palavras" · "se não tiver certeza, avise". [REVELAR] uma por vez.

*Slide 5: Exemplo.* Título: "MOSTRE O RESULTADO QUE VOCÊ QUER". À esquerda, ilustração geométrica de uma pessoa dizendo "Corte normal" (com "?" sobre a cabeça). À direita, a mesma pessoa mostrando uma foto de referência (retângulo com um corte desenhado). Abaixo, um campo de texto: "Crie 3 perguntas neste modelo: 'Qual é a função da clorofila? (resposta: absorver a luz do sol)'." Legenda: "O exemplo no prompt faz o papel da foto." [REVELAR] cada lado, depois o campo de texto.

*Slide 6: Ajustar, não recomeçar.* Título: "AJUSTE, NÃO RECOMECE". Três "degraus" em sequência, cada um com um pedido de ajuste e uma resposta que vai mudando de formato (SVG de blocos de texto): "deixe mais curto" → "inclua uma analogia" → "use linguagem mais simples". Faixa abaixo: "Assunto novo? Conversa nova." e, em menor, "Evite 'melhore isso': a IA não sabe o que melhorar." [REVELAR] um degrau por vez.

*Slide 7: Prompts que economizam.* Título: "PROMPTS QUE ECONOMIZAM". Dois medidores de uso lado a lado: "Pedido vago + várias tentativas" (medidor cheio, `--erro`) e "Pedido claro de primeira" (medidor com folga, ciano). Abaixo, quatro ícones com legenda curta: "peça o tamanho" · "um assunto por conversa" · "cole só o trecho necessário" · "seja específico logo de início". Uma linha: "Prompt bom economiza e melhora a resposta." [REVELAR] medidores e depois os quatro ícones.

*Slide 8: O modelo completo.* Título: "O MODELO COMPLETO". Uma linha de blocos encaixados: **Papel** (opcional, mais claro) + **Tarefa** + **Contexto** + **Limites** + **Formato** + **Exemplo** (opcional, mais claro), nas cores da convenção. Legenda: "Ponto de partida, não receita. Teste, observe e ajuste." Faixa em ciano: "PRÓXIMO VÍDEO: POR QUE O PROMPT FALHA". [REVELAR] bloco a bloco.

### VÍDEO 3: Por que seu prompt falha (~10 min, 9 slides)

*Slide 1: Abertura.* Título: "POR QUE MEU PROMPT FALHA?". Subtítulo: "E como consertar".

*Slide 2: Gancho.* Título: "SEGUI A FÓRMULA E DEU RUIM?" Imagem simples: um balão de resposta com carinha neutra. Etiqueta de segurança no canto, com ícone de cadeado: "Nos exemplos, nunca use dados pessoais."

*Slide 3: Os 5 erros.* Título: "OS 5 ERROS MAIS COMUNS". Lista numerada com ícone: 1. Pedido vago · 2. Muitas tarefas num pedido só · 3. Falta de contexto · 4. Ajuste vago ("melhore isso") · 5. Dados pessoais no pedido (com cadeado). [REVELAR] um por vez.

*Slide 4: Antes e depois.* Título: "ANTES E DEPOIS". Dois pares de campos de texto (fraco em `--erro`, melhor em ciano):
- Pedido vago: "Faz perguntas sobre História." → "Crie 5 questões de múltipla escolha sobre a Revolução Francesa para o 9º ano, com gabarito só no final."
- Falta de contexto: "Não entendi frações, explica." → "Explique frações para o 6º ano, que confunde numerador e denominador, com uma analogia de pizza."
[REVELAR] cada par (primeiro o fraco, depois o melhor). Se ficar apertado, divida em dois slides.

*Slide 5: Deixe a IA ajudar.* Título: "PEÇA AJUDA À PRÓPRIA IA". Duas frases em campos de texto: "Antes de responder, me faça 3 perguntas para entender melhor o que preciso." e "Melhore este prompt para eu receber uma resposta mais precisa." Ilustração: balão da IA com "1? 2? 3?" saindo e virando um prompt completo. [REVELAR] cada frase e depois a ilustração.

*Slide 6: Dividir em etapas.* Título: "TAREFA GRANDE? DIVIDA EM ETAPAS". Três degraus numerados: "1. Peça ideias de tema" → "2. Peça um roteiro em tópicos" → "3. Trabalhe um tópico de cada vez". Analogia curta embaixo: "Ninguém faz o jantar inteiro de uma vez só." [REVELAR] um degrau por vez.

*Slide 7: Desafio rápido.* Título: "DESAFIO: CONSERTE ESTE PEDIDO". Campo de texto grande em `--erro`: "Faz um trabalho sobre meio ambiente e melhora depois." Selo grande: "PAUSE O VÍDEO". Dica: "Qual erro da lista aparece aqui?" Ao avançar [REVELAR], mostrar uma barra de contagem regressiva de 10 s, e depois a sugestão em ciano: "Sou aluno do 7º ano e vou apresentar um trabalho de 5 minutos sobre lixo e reciclagem na escola. Sugira um roteiro com introdução, 3 ideias e conclusão, em linguagem simples." Legenda: "Há várias respostas boas. O importante: tarefa, contexto e formato."

*Slide 8: Checklist e modelo reutilizável.* Título: "ANTES DE ENVIAR". Lista de 5 perguntas com caixinha ✓: "Disse o que quero?" · "Disse para quem e para quê?" · "Disse como quero receber?" · "Coloquei limites úteis?" · "Tirei dados pessoais?" Ao lado, um cartão "MODELO PARA SALVAR NO CELULAR": "Preciso de [tarefa] para [público ou situação]. Entregue em [formato], com [limites]." Rodapé do cartão: "Depois da resposta: confira (Certeza do Uso)." [REVELAR] checklist e depois o cartão.

*Slide 9: Encerramento e ponte.* Frase gigante, centralizada: "IA APOIA. VOCÊ DECIDE." Subtítulo: "Próximo: o Módulo 7 aplica tudo na prática, com atividades e materiais para a sala de aula."

## 5. Entregáveis e qualidade

- Escreva todo o código completo, sem trechos "..." ou placeholders.
- Todas as ilustrações em SVG/CSS inline, bem alinhadas e com as cores do template.
- Confira a navegação por teclado, a revelação em sequência (inclusive ← desfazendo) e o modo de impressão. Se houver Chrome, Playwright ou Puppeteer disponível, gere capturas 1920x1080 de todos os slides e verifique estouro de texto, contraste e tamanho mínimo de fonte. Se não houver, faça uma revisão estática cuidadosa do CSS.
- Verifique que não há URLs externas além do Google Fonts.
- Se algum slide ficar com texto demais, reduza o texto e mantenha a ilustração. Exemplos de prompt são a exceção: mantenha o texto, mas divida o slide em dois se for preciso respeitar os 32px.
- Ao final, me diga como abrir (dois cliques no HTML) e como exportar para PDF (Ctrl+P → "Salvar como PDF").

## 6. README.md (para passar o contexto adiante)

Crie `modulo6/README.md` com: (a) o resumo do projeto e a tabela de módulos da seção 0; (b) as decisões de conteúdo já tomadas; (c) a convenção de cores das partes do prompt; (d) a lista de slides de cada vídeo com o tempo estimado; (e) pendências abertas: o rodapé da capa ("IFSul Campus Pelotas · CSTSI · Atividade de Extensão II") foi herdado do Módulo 2 e deve ser confirmado; o tema "fotossíntese" também aparece no Módulo 4 e pode ser trocado por "ciclo da água" se o grupo preferir; os exemplos do Vídeo 3 podem ser simplificados se a maioria do público for do fundamental. Assim, qualquer sessão futura consegue continuar o trabalho sem precisar deste prompt.
