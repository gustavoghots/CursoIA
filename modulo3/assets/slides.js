/* =========================================================
   Navegação compartilhada dos slides
   ← / PageUp / Backspace ........ volta (esconde o último item revelado)
   → / Espaço / PageDown / Enter .. avança (revela o próximo item ou vai ao próximo slide)
   F .............................. tela cheia
   Home / End ..................... primeiro / último slide
   Clique na borda esquerda/direita da tela também volta/avança.
   O número do slide fica na URL (#5), útil para retomar a gravação.
   ========================================================= */
(function () {
  const deck = document.querySelector('.deck');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const total = slides.length;
  const textoRodape = deck.dataset.rodape || '';
  let atual = 0;

  // Barra de progresso
  const barra = document.createElement('div');
  barra.className = 'progresso';
  document.body.appendChild(barra);

  // Marca do grupo (gradiente no canto) e rodapé em cada slide
  slides.forEach((slide, i) => {
    const marca = document.createElement('div');
    marca.className = slide.classList.contains('capa') ? 'marca grande' : 'marca';
    slide.prepend(marca);

    if (!slide.classList.contains('capa')) {
      const rodape = document.createElement('div');
      rodape.className = 'rodape';
      rodape.innerHTML = textoRodape + '<span class="num">' + (i + 1) + '/' + total + '</span>';
      slide.appendChild(rodape);
    }
  });

  // Itens revelados em sequência: ordem do HTML, ou data-ordem quando existir
  function fragmentos(slide) {
    return Array.from(slide.querySelectorAll('.fragment'))
      .map((el, idx) => ({ el, ordem: el.dataset.ordem !== undefined ? Number(el.dataset.ordem) : idx }))
      .sort((a, b) => a.ordem - b.ordem)
      .map(item => item.el);
  }

  function irPara(indice, revelarTudo) {
    indice = Math.max(0, Math.min(total - 1, indice));
    slides.forEach((slide, i) => {
      slide.classList.toggle('ativo', i === indice);
      slide.classList.toggle('passado', i < indice);
    });
    // Ao voltar, o slide anterior aparece completo; ao avançar, começa "zerado"
    fragmentos(slides[indice]).forEach(f => f.classList.toggle('visivel', !!revelarTudo));
    atual = indice;
    barra.style.width = ((atual + 1) / total * 100) + '%';
    history.replaceState(null, '', '#' + (atual + 1));
  }

  function avancar() {
    const proximo = fragmentos(slides[atual]).find(f => !f.classList.contains('visivel'));
    if (proximo) { proximo.classList.add('visivel'); return; }
    if (atual < total - 1) irPara(atual + 1, false);
  }

  function voltar() {
    const visiveis = fragmentos(slides[atual]).filter(f => f.classList.contains('visivel'));
    if (visiveis.length) { visiveis[visiveis.length - 1].classList.remove('visivel'); return; }
    if (atual > 0) irPara(atual - 1, true);
  }

  function telaCheia() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  }

  // Escala o palco 1920x1080 para caber na janela, centralizado
  function ajustarEscala() {
    const escala = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    deck.style.transform = 'translate(-50%, -50%) scale(' + escala + ')';
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'PageDown': case 'Enter':
        e.preventDefault(); avancar(); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace':
        e.preventDefault(); voltar(); break;
      case 'Home': irPara(0, false); break;
      case 'End': irPara(total - 1, true); break;
      case 'f': case 'F': telaCheia(); break;
    }
  });

  // Clique nas bordas: 25% esquerdo volta, 25% direito avança
  document.addEventListener('click', (e) => {
    const x = e.clientX / window.innerWidth;
    if (x < 0.25) voltar();
    else if (x > 0.75) avancar();
  });

  window.addEventListener('resize', ajustarEscala);
  ajustarEscala();

  // Começa no slide indicado na URL (#n), se houver.
  // Com "?revelar" na URL, o slide já abre com todos os itens visíveis (para revisão).
  const inicial = parseInt(location.hash.replace('#', ''), 10);
  const revelar = new URLSearchParams(location.search).has('revelar');
  irPara(isNaN(inicial) ? 0 : inicial - 1, revelar);
})();
