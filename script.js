// Controles de áudio
const playBtn = document.getElementById('play-audio');
const pauseBtn = document.getElementById('pause-audio');
const themeAudio = document.getElementById('theme-audio');

playBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Funcionalidade principal
const calcularBtn = document.getElementById('calcular-btn');
const limparBtn = document.getElementById('limpar-btn');
const coordenadasInput = document.getElementById('coordenadas-input');
const resultadoContainer = document.getElementById('resultado-container');

// Função para calcular distância euclidiana entre dois pontos
function calcularDistancia(ponto1, ponto2) {
  const dx = ponto2[0] - ponto1[0];
  const dy = ponto2[1] - ponto1[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// Função para gerar todas as permutações possíveis
function gerarPermutacoes(arr) {
  if (arr.length <= 1) return [arr];

  const permutacoes = [];
  for (let i = 0; i < arr.length; i++) {
    const resto = arr.slice(0, i).concat(arr.slice(i + 1));
    const permutacoesResto = gerarPermutacoes(resto);

    for (let permutacao of permutacoesResto) {
      permutacoes.push([arr[i]].concat(permutacao));
    }
  }
  return permutacoes;
}

// Função para calcular distância total de uma rota
function calcularDistanciaRota(rota) {
  let distanciaTotal = 0;
  let calculos = [];

  for (let i = 0; i < rota.length - 1; i++) {
    const dist = calcularDistancia(rota[i], rota[i + 1]);
    distanciaTotal += dist;
    calculos.push({
      de: rota[i],
      para: rota[i + 1],
      distancia: dist
    });
  }

  return { distancia: distanciaTotal, calculos: calculos };
}

// Função principal para resolver o TSP - VERSÃO CORRIGIDA
function calcularMenorRota(coordenadas) {
  if (coordenadas.length < 2) {
    return { distancia: 0, rota: coordenadas, calculos: [] };
  }

  if (coordenadas.length === 2) {
    const rota = [coordenadas[0], coordenadas[1], coordenadas[0]];
    const resultado = calcularDistanciaRota(rota);
    return {
      distancia: resultado.distancia,
      rota: rota,
      calculos: resultado.calculos
    };
  }

  // IMPORTANTE: Para TSP, a origem pode ser qualquer ponto
  // Mas para otimização, fixamos o primeiro como origem
  const origem = coordenadas[0];
  const outrosPontos = coordenadas.slice(1);

  console.log('TSP - Origem fixada:', origem);
  console.log('TSP - Outros pontos para permutar:', outrosPontos);

  // Gerar todas as permutações dos outros pontos
  const permutacoes = gerarPermutacoes(outrosPontos);
  console.log('TSP - Total de permutações a testar:', permutacoes.length);

  let menorDistancia = Infinity;
  let melhorRota = [];
  let melhorCalculos = [];

  // Testar cada permutação
  for (let i = 0; i < permutacoes.length; i++) {
    const permutacao = permutacoes[i];

    // Construir rota: origem → permutação → origem
    const rota = [origem, ...permutacao, origem];

    // Calcular distância total
    let distanciaTotal = 0;
    const calculosRota = [];

    for (let j = 0; j < rota.length - 1; j++) {
      const pontoA = rota[j];
      const pontoB = rota[j + 1];
      const distancia = calcularDistancia(pontoA, pontoB);

      distanciaTotal += distancia;
      calculosRota.push({
        de: pontoA,
        para: pontoB,
        distancia: distancia
      });
    }

    console.log(`Permutação ${i + 1}/${permutacoes.length}:`, permutacao);
    console.log('Rota completa:', rota.map(p => `[${p[0]},${p[1]}]`).join(' → '));
    console.log('Distância total:', distanciaTotal.toFixed(6));

    // Verificar se é a melhor rota
    if (distanciaTotal < menorDistancia) {
      menorDistancia = distanciaTotal;
      melhorRota = rota;
      melhorCalculos = calculosRota;
      console.log('*** NOVA MELHOR ROTA! ***');
    }
    console.log('---');
  }

  console.log('RESULTADO FINAL TSP:');
  console.log('Menor distância:', menorDistancia.toFixed(6));
  console.log('Melhor rota:', melhorRota.map(p => `[${p[0]},${p[1]}]`).join(' → '));

  return {
    distancia: menorDistancia,
    rota: melhorRota,
    calculos: melhorCalculos
  };
}

// Função para exibir o resultado
function exibirResultado(resultado, coordenadasOriginais) {
  let html = `
    <div class="result-output">
      <span class="result-title">🌍 Coordenadas dos Planetas:</span>
      <div class="coordinates-display">${JSON.stringify(coordenadasOriginais)}</div>
    </div>
    
    <div class="result-output">
      <span class="result-title">🔍 Análise Detalhada:</span>
      <div class="step">Total de planetas: ${coordenadasOriginais.length}</div>
      <div class="step">Permutações testadas: ${factorial(coordenadasOriginais.length - 1)}</div>
      <div class="step">Ponto inicial fixo: ${JSON.stringify(resultado.rota[0])}</div>
    </div>
    
    <div class="result-output">
      <span class="result-title">📊 Melhor Rota Encontrada:</span>
      <div class="step">Sequência: ${resultado.rota.map(p => JSON.stringify(p)).join(' → ')}</div>
    </div>
    
    <div class="result-output">
      <span class="result-title">📏 Cálculos Detalhados:</span>
  `;

  resultado.calculos.forEach((calc, index) => {
    html += `
      <div class="step">
        Segmento ${index + 1}: ${JSON.stringify(calc.de)} → ${JSON.stringify(calc.para)}
        <span class="distance-calc"> = ${calc.distancia.toFixed(4)} unidades</span>
      </div>
    `;
  });

  html += `</div>`;

  html += `
    <div class="final-result">
      <span class="result-title">🎯 Resultado Final:</span>
      <span class="distance-value">${resultado.distancia.toFixed(2)} unidades</span>
      <div>Menor distância para visitar todos os planetas e retornar ao ponto de partida!</div>
    </div>
  `;

  resultadoContainer.innerHTML = html;
}

// Função auxiliar para calcular fatorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Event listeners
calcularBtn.addEventListener('click', () => {
  const input = coordenadasInput.value.trim();

  if (!input) {
    resultadoContainer.innerHTML = `
      <div class="result-output">
        <span class="result-title">⚠️ Erro:</span>
        <div>Por favor, insira as coordenadas dos planetas!</div>
      </div>
    `;
    return;
  }

  try {
    // Parse do input
    const coordenadas = JSON.parse(input);

    // Validações
    if (!Array.isArray(coordenadas)) {
      throw new Error('As coordenadas devem ser uma matriz');
    }

    if (coordenadas.length < 1) {
      throw new Error('É necessário pelo menos um planeta');
    }

    for (let coord of coordenadas) {
      if (!Array.isArray(coord) || coord.length !== 2 || typeof coord[0] !== 'number' || typeof coord[1] !== 'number') {
        throw new Error('Cada coordenada deve ser um array com 2 números [x, y]');
      }
    }

    // Debug detalhado para o exemplo específico
    if (
      JSON.stringify(coordenadas) ===
      JSON.stringify([
        [0, 0],
        [2, 2],
        [3, 10],
        [5, 2],
        [7, 0]
      ])
    ) {
      console.log('=== TESTE MANUAL PARA VERIFICAR ROTA 20.41 ===');

      // Calcular manualmente algumas rotas candidatas
      const rotasCandidatas = [
        [
          [0, 0],
          [7, 0],
          [5, 2],
          [2, 2],
          [3, 10],
          [0, 0]
        ], // Rota mais lógica
        [
          [0, 0],
          [2, 2],
          [5, 2],
          [7, 0],
          [3, 10],
          [0, 0]
        ], // Alternativa 1
        [
          [0, 0],
          [7, 0],
          [5, 2],
          [3, 10],
          [2, 2],
          [0, 0]
        ], // Alternativa 2
        [
          [0, 0],
          [2, 2],
          [3, 10],
          [5, 2],
          [7, 0],
          [0, 0]
        ] // Ordem original
      ];

      rotasCandidatas.forEach((rota, index) => {
        console.log(`\nTeste Rota ${index + 1}:`, rota.map(p => `[${p[0]},${p[1]}]`).join(' → '));

        let distTotal = 0;
        for (let i = 0; i < rota.length - 1; i++) {
          const dist = calcularDistancia(rota[i], rota[i + 1]);
          console.log(`  [${rota[i][0]},${rota[i][1]}] → [${rota[i + 1][0]},${rota[i + 1][1]}] = ${dist.toFixed(6)}`);
          distTotal += dist;
        }
        console.log(`  TOTAL: ${distTotal.toFixed(6)}`);

        if (Math.abs(distTotal - 20.41) < 0.01) {
          console.log('  *** ESTA É A ROTA QUE DÁ 20.41! ***');
        }
      });

      console.log('=== FIM TESTE MANUAL ===\n');
    }

    // Calcular resultado normal
    const resultado = calcularMenorRota(coordenadas);
    console.log('Resultado final do algoritmo:', resultado.distancia.toFixed(4));
    exibirResultado(resultado, coordenadas);
  } catch (error) {
    resultadoContainer.innerHTML = `
      <div class="result-output">
        <span class="result-title">⚠️ Erro:</span>
        <div>Formato inválido! Use o formato: [[0,0],[2,2],[3,10]]</div>
        <div style="margin-top: 10px; color: #ff6666;">${error.message}</div>
      </div>
    `;
  }
});

limparBtn.addEventListener('click', () => {
  coordenadasInput.value = '';
  resultadoContainer.innerHTML = `
    <p class="instruction">Insira as coordenadas dos planetas e clique em CALCULAR ROTA para descobrir a menor distância interdimensional!</p>
  `;
});

// Exemplo automático ao carregar
window.addEventListener('load', () => {
  setTimeout(() => {
    coordenadasInput.value = '[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]';
  }, 1000);
});
