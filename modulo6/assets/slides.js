/* ==========================================================================
   Módulo 6 · INTRODUÇÃO A PROMPTS — navegação compartilhada dos slides
   --------------------------------------------------------------------------
   Teclas:
     → / espaço / PageDown / Enter : revela o próximo item ou avança de slide
     ← / PageUp / Backspace        : desfaz a última revelação ou volta de slide
     Home / End                    : primeiro / último slide
     F                             : tela cheia
     N                             : mostra/esconde as notas do apresentador
   Clique: no quarto esquerdo da tela volta, no quarto direito avança.

   Marcação no HTML:
     <section class="slide">            um slide
     class="reveal"                     item revelado um por vez (ordem do HTML)
     data-junto                         revela junto com o item .reveal anterior
     data-auto="10"                     ao aparecer, conta N segundos e avança
     <aside class="notes">              notas do apresentador (tecla N)
     data-rodape="..." (no slide)       troca o texto do rodapé daquele slide

   Parâmetros de URL (úteis para revisão/capturas):
     #5                 abre no slide 5
     ?revelar=tudo      mostra todos os itens já revelados
     ?notas=1           abre com o painel de notas visível
   ========================================================================== */
(function () {
  'use strict';

  var LARGURA = 1920;
  var ALTURA = 1080;
  var RODAPE_PADRAO = 'Módulo 6 · INTRODUÇÃO A PROMPTS';

  var deck = document.querySelector('.deck');
  if (!deck) { return; }

  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var total = slides.length;
  var parametros = new URLSearchParams(window.location.search);
  var revelarTudo = parametros.get('revelar') === 'tudo';

  /* ------------------------------------------------------------------
     1. Monta os elementos fixos de cada slide (rodapé, número, canto)
     ------------------------------------------------------------------ */
  slides.forEach(function (slide, i) {
    var canto = document.createElement('div');
    canto.className = 'canto';
    canto.setAttribute('aria-hidden', 'true');

    var rodape = document.createElement('div');
    rodape.className = 'rodape';
    rodape.textContent = slide.getAttribute('data-rodape') || RODAPE_PADRAO;

    var num = document.createElement('div');
    num.className = 'num-slide';
    num.textContent = (i + 1) + '/' + total;

    slide.appendChild(canto);
    slide.appendChild(rodape);
    slide.appendChild(num);

    // Deck com data-camera: reserva a moldura da câmera no canto inferior direito
    if (deck.hasAttribute('data-camera')) {
      var camera = document.createElement('div');
      camera.className = 'moldura-camera';
      camera.setAttribute('aria-hidden', 'true');
      camera.innerHTML = '<span>Câmera</span>';
      slide.appendChild(camera);
    }
    slide.setAttribute('aria-label', 'Slide ' + (i + 1) + ' de ' + total);
  });

  // Barra de progresso no topo do deck (aparece na gravação)
  var progresso = document.createElement('div');
  progresso.className = 'progresso';
  deck.appendChild(progresso);

  // Painel de notas: fora do deck, oculto por padrão
  var painel = document.createElement('div');
  painel.className = 'painel-notas';
  painel.setAttribute('aria-live', 'polite');
  document.body.appendChild(painel);
  if (parametros.get('notas') === '1') { painel.classList.add('aberto'); }

  /* ------------------------------------------------------------------
     2. Agrupa os itens [REVELAR] de cada slide em passos
        Cada .reveal é um passo; com data-junto entra no passo anterior.
     ------------------------------------------------------------------ */
  var passos = slides.map(function (slide) {
    var grupos = [];
    var itens = slide.querySelectorAll('.reveal');
    Array.prototype.forEach.call(itens, function (el) {
      if (el.hasAttribute('data-junto') && grupos.length) {
        grupos[grupos.length - 1].push(el);
      } else {
        grupos.push([el]);
      }
    });
    return grupos;
  });

  /* ------------------------------------------------------------------
     3. Estado e renderização
     ------------------------------------------------------------------ */
  var atual = 0;   // índice do slide visível
  var nivel = 0;   // quantos passos do slide atual estão revelados
  var timerAuto = null;
  var timerSegundos = null;

  function limparTimers() {
    if (timerAuto) { clearTimeout(timerAuto); timerAuto = null; }
    if (timerSegundos) { clearInterval(timerSegundos); timerSegundos = null; }
  }

  function render() {
    limparTimers();

    slides.forEach(function (slide, i) {
      var ativo = i === atual;
      slide.classList.toggle('ativo', ativo);
      slide.setAttribute('aria-hidden', ativo ? 'false' : 'true');
    });

    // Revela os passos até "nivel" e esconde os demais
    passos[atual].forEach(function (grupo, g) {
      grupo.forEach(function (el) { el.classList.toggle('visivel', g < nivel); });
    });

    // Progresso: slide atual em relação ao total
    progresso.style.width = (((atual + 1) / total) * 100) + '%';

    atualizarNotas();
    iniciarAuto();

    // Guarda o slide na URL (recarregar volta ao mesmo lugar)
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search + '#' + (atual + 1));
    } catch (e) { /* file:// em alguns navegadores: ignorar */ }
  }

  /* Contagem regressiva: o último passo revelado tem data-auto="N"? */
  function iniciarAuto() {
    if (revelarTudo || nivel === 0) { return; }
    var grupo = passos[atual][nivel - 1];
    var alvo = null;
    grupo.forEach(function (el) { if (el.hasAttribute('data-auto')) { alvo = el; } });
    if (!alvo) { return; }

    var segundos = parseInt(alvo.getAttribute('data-auto'), 10) || 10;
    var restante = segundos;
    var mostrador = alvo.querySelector('.numero-contagem');
    if (mostrador) { mostrador.textContent = restante + ' s'; }

    timerSegundos = setInterval(function () {
      restante -= 1;
      if (mostrador) { mostrador.textContent = Math.max(restante, 0) + ' s'; }
    }, 1000);

    var slideDoTimer = atual;
    var nivelDoTimer = nivel;
    timerAuto = setTimeout(function () {
      limparTimers();
      // Só avança se ninguém mexeu na apresentação durante a contagem
      if (atual === slideDoTimer && nivel === nivelDoTimer) { avancar(); }
    }, segundos * 1000);
  }

  function atualizarNotas() {
    var nota = slides[atual].querySelector('.notes');
    var texto = nota ? nota.textContent.trim() : '(sem notas)';
    var totalPassos = passos[atual].length;
    painel.innerHTML = '';
    var cab = document.createElement('b');
    cab.textContent = 'Slide ' + (atual + 1) + '/' + total +
      (totalPassos ? ' · revelação ' + nivel + '/' + totalPassos : '') + ' — ';
    painel.appendChild(cab);
    painel.appendChild(document.createTextNode(texto));
  }

  /* ------------------------------------------------------------------
     4. Ações de navegação
     ------------------------------------------------------------------ */
  function avancar() {
    if (nivel < passos[atual].length) {
      nivel += 1;
    } else if (atual < total - 1) {
      atual += 1;
      nivel = revelarTudo ? passos[atual].length : 0;
    }
    render();
  }

  function voltar() {
    if (!revelarTudo && nivel > 0) {
      nivel -= 1;                       // desfaz a última revelação
    } else if (atual > 0) {
      atual -= 1;
      nivel = passos[atual].length;     // volta com tudo revelado
    }
    render();
  }

  function irPara(indice, tudoRevelado) {
    atual = Math.max(0, Math.min(total - 1, indice));
    nivel = (tudoRevelado || revelarTudo) ? passos[atual].length : 0;
    render();
  }

  function telaCheia() {
    var el = document.documentElement;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) { el.requestFullscreen().catch(function () {}); }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /* ------------------------------------------------------------------
     5. Eventos
     ------------------------------------------------------------------ */
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case 'Enter':
      case ' ':
      case 'Spacebar':
        e.preventDefault(); avancar(); break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault(); voltar(); break;
      case 'Home':
        e.preventDefault(); irPara(0); break;
      case 'End':
        e.preventDefault(); irPara(total - 1, true); break;
      case 'f':
      case 'F':
        e.preventDefault(); telaCheia(); break;
      case 'n':
      case 'N':
        e.preventDefault(); painel.classList.toggle('aberto'); break;
      default: break;
    }
  });

  // Clique nas bordas: 25% esquerdo volta, 25% direito avança
  document.addEventListener('click', function (e) {
    if (painel.contains(e.target)) { return; }
    var x = e.clientX / window.innerWidth;
    if (x < 0.25) { voltar(); } else if (x > 0.75) { avancar(); }
  });

  // Escala o deck para caber na janela (letterbox)
  function ajustarEscala() {
    var escala = Math.min(window.innerWidth / LARGURA, window.innerHeight / ALTURA);
    deck.style.setProperty('--escala', escala);
  }
  window.addEventListener('resize', ajustarEscala);

  // Trocar o número na URL (ex.: #7) pula direto para aquele slide
  window.addEventListener('hashchange', function () {
    var n = parseInt((window.location.hash || '').replace('#', ''), 10);
    if (!isNaN(n) && n - 1 !== atual) { irPara(n - 1); }
  });

  /* ------------------------------------------------------------------
     6. Início: lê o slide do #hash (ex.: #4)
     ------------------------------------------------------------------ */
  ajustarEscala();
  var inicial = parseInt((window.location.hash || '').replace('#', ''), 10);
  irPara(isNaN(inicial) ? 0 : inicial - 1);
})();
