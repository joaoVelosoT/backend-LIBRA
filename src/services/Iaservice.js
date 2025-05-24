const fetch = require("node-fetch");
require("dotenv").config();

// Cache em memória com tempo de vida
const responseCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

// Tempo máximo de espera para APIs
const API_TIMEOUT = 8000; // 8 segundos

async function perguntarIA(pergunta, livrosDisponiveis = []) {
  // Verificação básica dos dados
  if (!pergunta || typeof pergunta !== "string" || pergunta.trim().length < 2) {
    return "Por favor, faça uma pergunta válida com pelo menos 2 caracteres.";
  }

  // Pré-processamento da pergunta
  const perguntaLower = (typeof pergunta === "string" ? pergunta.toLowerCase().trim() : "");
  
  // Verifica se é um cumprimento ou interação social (tratamento especial)
  if (isInteracaoSocial(perguntaLower)) {
    return gerarRespostaSocial(perguntaLower);
  }

  // Verificação específica para perguntas sobre autores/livros
  if (perguntaLower.includes("de que autor") || 
      perguntaLower.includes("quem escreveu") || 
      perguntaLower.includes("de quem") || 
      perguntaLower.includes("de quem é")) {
    const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
    if (livroEncontrado) {
      return generateBookFoundResponse(livroEncontrado);
    }
    return "📚 Não encontrei esse livro em nosso acervo. Deseja ver outros livros disponíveis?";
  }

  // Verifica cache primeiro
  const cacheKey = generateCacheKey(pergunta, livrosDisponiveis);
  const cachedResponse = getFromCache(cacheKey);
  if (cachedResponse) return cachedResponse;

  // Tenta diferentes estratégias em ordem
  try {
    // 1. Tentativa com Hugging Face
    const resposta = await tryWithTimeout(
      () => callHuggingFaceAPI(pergunta, livrosDisponiveis),
      API_TIMEOUT
    );
    saveToCache(cacheKey, resposta);
    return resposta;
  } catch (error) {
    console.error("Erro na API Hugging Face:", {
      message: error.message,
      status: error.response?.status,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  try {
    // 2. Tentativa com Together.ai
    const resposta = await tryWithTimeout(
      () => callTogetherAPI(pergunta, livrosDisponiveis),
      API_TIMEOUT
    );
    saveToCache(cacheKey, resposta);
    return resposta;
  } catch (error) {
    console.error("Erro na API Together.ai:", {
      message: error.message,
      status: error.response?.status,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  try {
    // 3. Tentativa com modelo local via Ollama (se configurado)
    if (process.env.OLLAMA_ENABLED === "true") {
      const resposta = await tryWithTimeout(
        () => callOllamaAPI(pergunta, livrosDisponiveis),
        API_TIMEOUT
      );
      saveToCache(cacheKey, resposta);
      return resposta;
    }
  } catch (error) {
    console.error("Erro no Ollama:", {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  // 4. Fallback local completo
  return generateLocalResponse(perguntaLower, livrosDisponiveis);
}

// --- Funções auxiliares --- //

function isInteracaoSocial(texto) {
  const padroes = [
    /bom\s(dia|tarde|noite)/i,
    /olá|oi|opa|eae|eaí|saudações|hello|hi/i,
    /tudo\s(bem|contigo|com você)/i,
    /como\s(vai|você está)/i,
    /qual\sé\s(a boa|a novidade)/i
  ];
  return padroes.some(padrao => padrao.test(texto));
}

function gerarRespostaSocial(pergunta) {
  const respostas = {
    "bom dia": [
      "📚 Bom dia! Eu sou o LOOM, assistente da Livraria Libra. Como posso te ajudar hoje? 😊",
      "🌞 Bom dia! Pronto para descobrir novas leituras? Eu sou o LOOM, seu assistente literário!"
    ],
    "bom tarde": [
      "📖 Boa tarde! Aqui é o LOOM da Livraria Libra. Em que posso ajudar?",
      "☕ Boa tarde! Alguma leitura em mente ou quer recomendações?"
    ],
    "bom noite": [
      "🌙 Boa noite! Eu sou o LOOM, assistente noturno da Livraria Libra. Como posso ajudar?",
      "📚 Boa noite! Preparando sua lista de leitura para amanhã?"
    ],
    "olá": [
      "😊 Olá! Eu sou o LOOM, seu assistente de livros. O que vamos explorar hoje?",
      "📚 Oi! Bem-vindo à Livraria Libra. Como posso ajudar?"
    ],
    "oi": [
      "🌟 Oi! Eu sou o LOOM, mascote digital da Livraria Libra. Pronto para novas aventuras literárias?",
      "📖 Oi! Qual será sua próxima leitura? Estou aqui para ajudar!"
    ],
    "opa": [
      "😊 Opa! Tudo bem? Eu sou o LOOM, assistente da Livraria Libra. Bora falar de livros?",
      "📚 Opa! Eu sou o LOOM. Qual livro você está procurando hoje?"
    ],
    "tudo bem": [
      "😊 Tudo ótimo, obrigado por perguntar! E com você? Como posso ajudar hoje?",
      "📚 Estou muito bem, sempre pronto para ajudar com seu próximo livro! E você, tudo bem?"
    ],
    "como vai": [
      "🌟 Estou ótimo, cheio de energia para te ajudar a encontrar os melhores livros! E você?",
      "📖 Vou muito bem, obrigado! Aqui no mundo dos livros sempre tem algo novo. E com você?"
    ]
  };

  for (const [key, options] of Object.entries(respostas)) {
    if (pergunta.includes(key)) {
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  return "😊 Olá! Eu sou o LOOM, assistente da Livraria Libra. Como posso te ajudar hoje?";
}

function generateCacheKey(pergunta, livros) {
  return `${pergunta.toLowerCase().trim()}-${livros.length}`;
}

function getFromCache(key) {
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.response;
  }
  return null;
}

function saveToCache(key, response) {
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
}

function tryWithTimeout(promiseFn, timeout) {
  return Promise.race([
    promiseFn(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout exceeded")), timeout)
    )
  ]);
}

async function callHuggingFaceAPI(pergunta, livros) {
  const prompt = generatePrompt(pergunta, livros);
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.1
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  return processResponse(result[0]?.generated_text || "", livros);
}

async function callTogetherAPI(pergunta, livros) {
  const prompt = generatePrompt(pergunta, livros);
  
  const response = await fetch("https://api.together.xyz/v1/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
      top_p: 0.9
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  return processResponse(result.choices[0]?.text || "", livros);
}

async function callOllamaAPI(pergunta, livros) {
  const prompt = generatePrompt(pergunta, livros);
  
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 200
      }
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  return processResponse(result.response || "", livros);
}

function generateLocalResponse(perguntaLower, livros) {
  // Verifica se é pedido de listar autores
  if (perguntaLower.includes("autores disponiveis") || 
      perguntaLower.includes("autores disponíveis") ||
      perguntaLower.includes("quais autores")) {
    return listarAutoresDisponiveis(livros);
  }

  // Verifica se é pedido de livro de um autor específico
  const matchAutor = perguntaLower.match(/(?:livro|obra|livros) (?:do|de|da) ([^?]+)/);
  if (matchAutor) {
    const autorBuscado = matchAutor[1].trim();
    const livrosDoAutor = findBooksByAuthor(autorBuscado, livros);
    
    if (livrosDoAutor.length > 0) {
      return generateAuthorResponse(livrosDoAutor);
    } 
  }

  // Restante da lógica original
  const livroEncontrado = findBook(perguntaLower, livros);
  if (livroEncontrado) {
    return generateBookFoundResponse(livroEncontrado);
  }
  
  const livrosGenero = findBooksByGenre(perguntaLower, livros);
  if (livrosGenero.length > 0) {
    return generateGenreResponse(livrosGenero);
  }
  
  return generateGenericSuggestion(livros);
}

function listarAutoresDisponiveis(livros) {
  const autores = new Set();
  
  livros.forEach(livro => {
    if (livro.autor) {
      const autorFormatado = formatarNomeAutor(livro.autor);
      autores.add(autorFormatado);
    }
  });

  if (autores.size === 0) {
    return "No momento não temos autores cadastrados em nosso acervo.";
  }

  const listaAutores = Array.from(autores).sort();
  return `Claro! Atualmente, temos os seguintes autores disponíveis em nossa livraria: ${listaAutores.join(', ')}. 😊`;
}

function formatarNomeAutor(nome) {
  if (!nome) return 'Autor desconhecido';
  
  return nome.trim()
    .split(' ')
    .map(parte => {
      // Mantém abreviações como "J.K." intactas
      if (/^[A-Z]\.([A-Z]\.)?$/.test(parte)) {
        return parte;
      }
      return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
    })
    .join(' ');
}

function findBooksByAuthor(pergunta, livros) {
  // Extrai o nome do autor da pergunta
  let autorBuscado = pergunta.toLowerCase();
  
  // Remove termos comuns
  const termosRemover = ["livro", "livros", "obra", "obras", "do", "da", "de"];
  termosRemover.forEach(termo => {
    autorBuscado = autorBuscado.replace(termo, '').trim();
  });

  return livros.filter(livro => {
    if (!livro.autor) return false;
    
    const autorLower = livro.autor.toLowerCase();
    return autorLower.includes(autorBuscado) || autorBuscado.includes(autorLower);
  });
}

function generateAuthorResponse(livros) {
  if (livros.length === 0) {
    return "📚 Não encontrei livros deste autor em nosso acervo.";
  }

  const autor = formatarNomeAutor(livros[0].autor);
  const livrosList = livros.slice(0, 5)  // Mostra até 5 livros
    .map(l => `• "${formatarTitulo(l.titulo)}"` + (l.notaMedia ? ` ${formatarNota(l.notaMedia)}` : ''))
    .join('\n');
  
  return `✍️ Obras de ${autor} disponíveis:\n${livrosList}\n\nDeseja informações sobre algum específico? 😊`;
}

function formatarTitulo(titulo) {
  if (!titulo) return 'Título desconhecido';
  
  // Lista de palavras para manter em minúsculo (artigos, preposições)
  const palavrasMinusculas = ['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'na', 'no', 'para'];
  
  return titulo.toLowerCase()
    .split(' ')
    .map((palavra, index) => {
      if (index > 0 && palavrasMinusculas.includes(palavra)) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
}

function findBook(pergunta, livros) {
  // Extrai o título do livro da pergunta
  const match = pergunta.match(/"([^"]+)"/) || pergunta.match(/(?:livro|obra)\s+([^?]+)/) || [null, pergunta];
  const termoBusca = match[1] ? match[1].trim().toLowerCase() : pergunta.toLowerCase();
  
  return livros.find(livro => {
    if (!livro.titulo) return false;
    
    const tituloLower = livro.titulo.toLowerCase();
    return tituloLower.includes(termoBusca) || termoBusca.includes(tituloLower);
  });
}

function generateBookFoundResponse(livro) {
  if (!livro) {
    return "📚 Não encontrei esse livro em nosso acervo no momento.";
  }

  let resposta = `📖 "${formatarTitulo(livro.titulo)}"`;
  
  if (livro.autor) {
    resposta += ` é de autoria de ${formatarNomeAutor(livro.autor)}`;
  } else {
    resposta += ` (autor não especificado)`;
  }
  
  if (livro.descricao && !livro.descricao.includes("Harry Potter e a Pedra Filosofal")) {
    resposta += `\n\n📝 ${livro.descricao.substring(0, 150)}...`;
  }
  
  if (livro.notaMedia && livro.notaMedia > 0) {
    resposta += `\n⭐ Avaliação: ${formatarNota(livro.notaMedia)}`;
  }
  
  return resposta + "\n\nPosso te ajudar com algo mais? 😊";
}

function findBooksByGenre(pergunta, livros) {
  const genero = livros.flatMap(l => l.generos || [])
    .find(g => g && pergunta.includes(g.toLowerCase()));
  
  return genero ? livros.filter(l => 
    (l.generos || []).some(g => g && g.toLowerCase() === genero.toLowerCase())
  ) : [];
}

function generateGenreResponse(livros) {
  const genero = livros[0].generos.find(Boolean);
  const livrosList = livros
    .map(l => `• "${formatarTitulo(l.titulo)}" - ${formatarNomeAutor(l.autor)}`)
    .join('\n');
  
  return `📚 Livros de ${genero}:\n${livrosList}`;
}

function generateGenericSuggestion(livros) {
  const livrosValidos = livros.filter(l => l.titulo && l.autor && l.generos);
  
  if (livrosValidos.length === 0) {
    return "🔍 Não encontrei livros no momento. Por favor, tente novamente mais tarde.";
  }

  const livrosPorGenero = {};
  livrosValidos.forEach(livro => {
    (livro.generos || []).forEach(genero => {
      if (!livrosPorGenero[genero]) {
        livrosPorGenero[genero] = [];
      }
      livrosPorGenero[genero].push(livro);
    });
  });

  const generosPopulares = Object.keys(livrosPorGenero)
    .sort((a, b) => livrosPorGenero[b].length - livrosPorGenero[a].length)

  let resposta = "📚 Aqui estão algumas recomendações baseadas em nossos destaques:\n\n";
  
  generosPopulares.forEach(genero => {
    const livrosDoGenero = livrosPorGenero[genero];
    const livrosDestaque = getRandomBooks(livrosDoGenero, 2);
    
    resposta += `🔹 ${genero}:\n`;
    resposta += livrosDestaque.map(l => 
      `• "${formatarTitulo(l.titulo)}" - ${formatarNomeAutor(l.autor)}${l.notaMedia ? ` ${formatarNota(l.notaMedia)}` : ''}`
    ).join('\n');
    resposta += '\n\n';
  });

  resposta += "Se quiser recomendações mais específicas, me diga seu gênero favorito ou autor preferido! 😊";
  
  return resposta;
}

function getRandomBooks(livros, count) {
  if (!livros || livros.length === 0) return [];
  const countSafe = Math.min(count, livros.length);
  return [...livros]
    .sort(() => 0.5 - Math.random())
    .slice(0, countSafe);
}

function formatarNota(nota) {
  if (!nota || nota === 0) return 'Sem avaliações';
  const estrelas = '⭐'.repeat(Math.round(nota));
  return `${estrelas} (${nota.toFixed(1)})`;
}

function generatePrompt(pergunta, livros = []) {
  const livrosValidos = livros.filter(l => l.titulo && l.autor);
  const sampleBooks = livrosValidos
    .map(l => `- "${l.titulo}" (${l.autor})`)
    .join('\n');

  return `[INST] Você é o LOOM, assistente virtual da Livraria Libra, uma plataforma digital focada em acessibilidade. 

CONTEXTO IMPORTANTE:
- Você é um assistente amigável e prestativo
- Seu objetivo é ajudar os usuários a encontrar livros
- Mantenha sempre um tom educado e profissional

REGRAS ABSOLUTAS:
1. SEMPRE responda em PORTUGUÊS BRASILEIRO
2. Para cumprimentos e interações sociais: responda de forma natural sem recomendar livros
3. Para perguntas sobre livros: confira se estão na lista abaixo antes de responder
4. NUNCA invente livros ou informações
5. Use 1-2 emojis por resposta
6. Seja conciso (1-2 frases)
7. Se não souber responder, peça para reformular ou diga que vai verificar
8. Sempre use palavras completas e corretas no português

LIVROS DISPONÍVEIS (${livrosValidos.length}):
${sampleBooks || 'Nenhum livro disponível no momento'}

PERGUNTA DO USUÁRIO: "${pergunta}"

SUA RESPOSTA EM PORTUGUÊS BRASILEIRO: [/INST]`;
}

function processResponse(rawResponse, livros) {
  let resposta = rawResponse.split("[/INST]")[1]?.trim() || rawResponse.trim();
  
  resposta = resposta.replace(/[a-zA-Z]+:/g, '').trim();
  
  if (!isRespostaValida(resposta)) {
    return "😊 Desculpe, não entendi completamente. Poderia reformular?";
  }
  
  const livrosMencionados = resposta.match(/"([^"]+)"/g) || [];
  const livrosInvalidos = livrosMencionados.filter(tituloMencionado => 
    !livros.some(l => l.titulo && tituloMencionado.includes(l.titulo))
  );
  

  
  if (!resposta.match(/[\u{1F600}-\u{1F6FF}]/u)) {
    resposta = "📚 " + resposta;
  }
  
  return resposta;
}

function isRespostaValida(resposta) {
  if (!resposta || resposta.length < 3) return false;
  
  const respostasInvalidas = [
    "não entendi",
    "não encontrei",
    "não sei",
    "não consegui"
  ];
  
  return !respostasInvalidas.some(invalida => 
    resposta.toLowerCase().includes(invalida)
  );
}

module.exports = perguntarIA;