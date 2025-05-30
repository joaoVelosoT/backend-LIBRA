const fetch = require("node-fetch");
require("dotenv").config();

// Cache em memória com tempo de vida
const responseCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

// Tempo máximo de espera para APIs
const API_TIMEOUT = 8000; // 8 segundos

// Variável para manter o contexto da conversa
let contextoConversa = {
  ultimoLivroMencionado: null,
  ultimaPergunta: null
};

let piadasAnteriores = [];

async function perguntarIA(pergunta, livrosDisponiveis = []) {
  // Verificação básica dos dados
  if (!pergunta || typeof pergunta !== "string" || pergunta.trim().length < 2) {
    return "Por favor, faça uma pergunta válida com pelo menos 2 caracteres.";
  }

  // Pré-processamento da pergunta
  const perguntaLower = pergunta.toLowerCase().trim();
  
  // Atualiza o contexto da conversa
  contextoConversa.ultimaPergunta = perguntaLower;

  // Verifica se é um cumprimento ou interação social (tratamento especial)
  if (isInteracaoSocial(perguntaLower)) {
    return gerarRespostaSocial(perguntaLower);
  }

  if (perguntaLower.includes("piada") || perguntaLower.includes("conte uma piada")) {
    return contarPiadaLiteraria();
  }

  // Verifica se é pedido de outra piada
  if (perguntaLower.includes("outra piada") || perguntaLower.includes("mais uma piada")) {
    return responderOutraPiada();
  }

  // Verifica se é um pedido de curiosidade
  if (perguntaLower.includes("curiosidade") || perguntaLower.includes("fato interessante")) {
    return contarCuriosidadeLiteraria();
  }

  // Verifica se é um pedido de formatos disponíveis
  if (perguntaLower.includes("formatos") || perguntaLower.includes("disponível") || perguntaLower.includes("versão")) {
    const livroEncontrado = contextoConversa.ultimoLivroMencionado || findBook(perguntaLower, livrosDisponiveis);
    if (livroEncontrado) {
      return generateFormatsResponse(livroEncontrado);
    }
  }

  // Verifica se é pedido de livros disponíveis
  if (perguntaLower.includes("livros disponíveis") || perguntaLower.includes("livros disponiveis")) {
    return listarLivrosDisponiveis(livrosDisponiveis);
  }

  // Verificação específica para perguntas sobre autores/livros
  if (perguntaLower.includes("de que autor") || 
      perguntaLower.includes("quem escreveu") || 
      perguntaLower.includes("de quem") || 
      perguntaLower.includes("de quem é")) {
    const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
    if (livroEncontrado) {
      contextoConversa.ultimoLivroMencionado = livroEncontrado;
      return generateBookFoundResponse(livroEncontrado);
    }
    return "📚 Não encontrei esse livro em nosso acervo. Deseja ver outros livros disponíveis?";
  }

  // Verifica se é pedido de recomendações
  if (perguntaLower.includes("recomendações") || perguntaLower.includes("recomendar") || perguntaLower.includes("sugestões")) {
    return generateBookRecommendation(livrosDisponiveis);
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
    
    // Atualiza contexto se encontrar um livro na resposta
    const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
    if (livroEncontrado) {
      contextoConversa.ultimoLivroMencionado = livroEncontrado;
    }
    
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
    
    // Atualiza contexto se encontrar um livro na resposta
    const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
    if (livroEncontrado) {
      contextoConversa.ultimoLivroMencionado = livroEncontrado;
    }
    
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
      
      // Atualiza contexto se encontrar um livro na resposta
      const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
      if (livroEncontrado) {
        contextoConversa.ultimoLivroMencionado = livroEncontrado;
      }
      
      return resposta;
    }
  } catch (error) {
    console.error("Erro no Ollama:", {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  // 4. Fallback local completo
  const respostaLocal = generateLocalResponse(perguntaLower, livrosDisponiveis);
  
  // Atualiza contexto se encontrar um livro na resposta
  const livroEncontrado = findBook(perguntaLower, livrosDisponiveis);
  if (livroEncontrado) {
    contextoConversa.ultimoLivroMencionado = livroEncontrado;
  }
  
  return respostaLocal;
}

// --- Funções para interações comuns --- //

function contarPiadaLiteraria() {
  const piadasDisponiveis = [
"📖 Por que o livro de matemática ficou deprimido? Porque tinha muitos problemas!",
"😂 O que o lápis disse para o papel? 'Você está me desapontando!'",
"📚 Por que o livro foi preso? Porque tinha muitas páginas em branco - era um caso de folhas em branco!",
"🤓 Sabia que os livros de suspense são ótimos para emagrecer? Dão um susto que até o apetite some!",
"😄 Qual é o animal mais antigo do mundo? O vaga-lume, porque está no livro das recordações!",
"📖 Um jovem autor queria escrever para o mundo todo. Provocar reações de emoção, lágrimas e fazer seus leitores perderem o sono. Ele virou redator das mensagens de erro do Windows.",
"😂 O que o livro de gramática disse para o livro de história? 'Você vive no passado!'",
"📚 Qual é o livro mais doce que existe? O Romeu e Julieta!",
"📖 John Green teve um pesadelo em que ele era perseguido por um pedaço de madeira falante. Qual é o nome do livro? “Quem é você? A Lasca”",
"😂 O que o livro de ciências disse para o livro de geografia? 'Você está sempre viajando!'",
"📚 O que o marcador de página disse para o livro? 'Eu te sigo até o fim!'",
"🤓 Como o livro de física se exercita? Com muitas páginas de força!",
"😄 Paulo Coelho come feijão com curry; a Paula Pimenta.",
"📖 Casamento é tipo Machado de Assis: começa no romantismo, mas logo acaba no realismo.  ",
"😂 Você tem algum órgão transplantado? O Frankenstein."
  ];

  // Filtra piadas que ainda não foram usadas
  let piadasNaoUsadas = piadasDisponiveis.filter(piada => 
    !piadasAnteriores.includes(piada)
  );

  // Se todas já foram usadas, reinicia o ciclo
  if (piadasNaoUsadas.length === 0) {
    piadasAnteriores = [];
    piadasNaoUsadas = [...piadasDisponiveis];
  }

  // Seleciona uma piada aleatória
  const piadaAleatoria = piadasNaoUsadas[
    Math.floor(Math.random() * piadasNaoUsadas.length)
  ];

  // Adiciona a piada usada ao histórico
  piadasAnteriores.push(piadaAleatoria);

  return piadaAleatoria;
}

function responderOutraPiada() {
  return contarPiadaLiteraria();
}

function contarCuriosidadeLiteraria() {
  const curiosidades = [
    "📚 Sabia que o livro mais roubado de bibliotecas públicas é o Guinness World Records?",
    "🖋️ A palavra 'livro' vem do latim 'liber', que originalmente significava a camada interna da casca das árvores!",
    "📖 O maior livro do mundo é 'O Pequeno Príncipe', que foi traduzido para mais de 300 línguas e dialetos!",
    "✍️ Machado de Assis, nosso grande escritor brasileiro, era canhoto e sofria de epilepsia!",
    "📕 O livro mais vendido da história (depois da Bíblia) é 'Dom Quixote', de Miguel de Cervantes!",
    "🔍 A Biblioteca do Congresso dos EUA é a maior do mundo, com mais de 170 milhões de itens!",
    "📖 O termo 'bookworm' (traça de livros) vem dos insetos que comem papel, mas também se refere a pessoas que leem muito!",
    "✉️ J.R.R. Tolkien recebeu tantas cartas de fãs endereçadas a 'Frodo, O Condado' que teve que deixar de responder!"
  ];
  return curiosidades[Math.floor(Math.random() * curiosidades.length)];
}

function generateFormatsResponse(livro) {
  let resposta = `📚 Formatos disponíveis para "${formatarTitulo(livro.titulo)}":\n\n`;
  
  resposta += `📱 E-book: ${livro.id_ebook ? "Sim" : "Não"}\n\n`;
  resposta += `🎧 Audiobook: ${livro.id_Audiobook ? "Sim" : "Não"}\n\n`;
  resposta += `👆 Braille: ${livro.id_braille ? "Sim" : "Não"}\n\n`;
  resposta += `📖 EPUB: ${livro.id_epub ? "Sim" : "Não"}\n`;
  
  return resposta;
}

function listarLivrosDisponiveis(livros) {
  if (livros.length === 0) {
    return "📚 No momento não temos livros disponíveis em nosso acervo.";
  }

  // Seleciona 3 livros aleatórios para exemplificar
  const livrosExemplo = getRandomBooks(livros, 3);
  const exemplos = livrosExemplo.map(l => formatarTitulo(l.titulo)).join(", ");
  
  return `📚 Temos ${livros.length} livros disponíveis em nosso acervo. Alguns exemplos: ${exemplos}.`;
}

function generateBookRecommendation(livros) {
  if (livros.length === 0) {
    return "📚 No momento não temos livros disponíveis para recomendar.";
  }

  const livroRecomendado = getRandomBooks(livros, 1)[0];
  return generateBookFullInfoResponse(livroRecomendado);
}

function generateBookFullInfoResponse(livro) {
  if (!livro) {
    return "📚 Não encontrei informações sobre este livro.";
  }

  let resposta = `📖 **${formatarTitulo(livro.titulo)}**`;
  
  if (livro.subtitulo) {
    resposta += `\n🔹 Subtítulo: ${livro.subtitulo}`;
  }
  
  if (livro.autor) {
    resposta += `\n✍️ Autor: ${formatarNomeAutor(livro.autor)}`;
  }
  
  if (livro.notaMedia && livro.notaMedia > 0) {
    resposta += `\n⭐ Avaliação: ${formatarNota(livro.notaMedia)}`;
  }
  
  if (livro.descricao) {
    resposta += `\n\n📝 Descrição: ${livro.descricao.substring(0, 200)}...`;
  }
  
  // Informações sobre formatos
  resposta += `\n\n📚 Formatos disponíveis:`;
  resposta += `\n📱 E-book: ${livro.id_ebook ? "Sim" : "Não"}\n\n`;
  resposta += `\n🎧 Audiobook: ${livro.id_Audiobook ? "Sim" : "Não"}\n\n`;
  resposta += `\n👆 Braille: ${livro.id_braille ? "Sim" : "Não"}\n\n`;
   resposta += `📖 EPUB: ${livro.id_epub ? "Sim" : "Não"}\n\n`;

  return resposta;
}

// --- Funções auxiliares --- //

function isInteracaoSocial(texto) {
  const padroes = [
    /bom\s(dia|tarde|noite)/i,
    /olá|oi|opa|eae|eaí|saudações|hello|hi/i,
    /tudo\s(bem|contigo|com você)/i,
    /como\s(vai|você está)/i,
    /qual\sé\s(a boa|a novidade)/i,
    /(conte|diga)\s(uma|alguma)\s(coisa|informação)/i,
    /(qual|como)\s(é|são)\s(seu|seus)/i,
    /(quem|o que)\s(você)\s(é|faz)/i,
    /(fale|conte)\s(mais|sobre)/i,
    /(obrigado|valeu|agradeço)/i
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
    ],
    "obrigado": [
      "😊 De nada! Estou aqui para ajudar sempre que precisar!",
      "📚 Fico feliz em ajudar! Mais alguma coisa sobre livros?"
    ],
    "valeu": [
      "👍 Valeu você por usar nosso serviço! Precisa de mais alguma coisa?",
      "😊 Que isso, estamos aqui para isso mesmo! Mais alguma dúvida literária?"
    ],
    "quem é você": [
      "📚 Eu sou o LOOM, o assistente virtual da Livraria Libra! Estou aqui para te ajudar a encontrar os melhores livros e informações literárias!",
      "😊 Eu sou o LOOM, seu assistente de livros digital! Posso te ajudar a encontrar obras, autores e curiosidades do mundo literário!"
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
      contextoConversa.ultimoLivroMencionado = livrosDoAutor[0];
      return generateAuthorResponse(livrosDoAutor);
    }
  }

  // Restante da lógica original
  const livroEncontrado = findBook(perguntaLower, livros);
  if (livroEncontrado) {
    contextoConversa.ultimoLivroMencionado = livroEncontrado;
    return generateBookFoundResponse(livroEncontrado);
  }
  
  const livrosGenero = findBooksByGenre(perguntaLower, livros);
  if (livrosGenero.length > 0) {
    return generateGenreResponse(livrosGenero);
  }
  
  return "📚 Não entendi sua pergunta. Poderia reformular?";
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
      if (/^[A-Z]\.([A-Z]\.)?$/.test(parte)) {
        return parte;
      }
      return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
    })
    .join(' ');
}

function findBooksByAuthor(pergunta, livros) {
  let autorBuscado = pergunta.toLowerCase();
  
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
  const livrosList = livros.slice(0, 5)
    .map(l => `• "${formatarTitulo(l.titulo)}"` + (l.notaMedia ? ` ${formatarNota(l.notaMedia)}` : ''))
    .join('\n');
  
  return `✍️ Obras de ${autor} disponíveis:\n${livrosList}\n\nDeseja informações sobre algum específico? 😊`;
}

function formatarTitulo(titulo) {
  if (!titulo) return 'Título desconhecido';
  
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

  let resposta = `📖 **${formatarTitulo(livro.titulo)}**`;
  
  if (livro.autor) {
    resposta += `\n✍️ Autor: ${formatarNomeAutor(livro.autor)}`;
  }
  
  if (livro.descricao) {
    resposta += `\n\n📝 ${livro.descricao.substring(0, 150)}...`;
  }
  
  if (livro.notaMedia && livro.notaMedia > 0) {
    resposta += `\n⭐ Avaliação: ${formatarNota(livro.notaMedia)}`;
  }

  return resposta;
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

  return `[INST] Você é o LOOM, assistente virtual da Livraria Libra. 

REGRAS:
1. Responda em PORTUGUÊS BRASILEIRO
2. Seja amigável e prestativo
3. Não inclua links ou referências a páginas
4. Para perguntas sobre livros disponíveis, mostre apenas a quantidade e 3 exemplos
5. Para recomendações, mostre informações completas de um livro aleatório
6. Formato para recomendações:
   📖 Título
   🔹 Subtítulo (se existir)
   ✍️ Autor
   ⭐ Avaliação
   📝 Descrição resumida
   📚 Formatos disponíveis (E-book e Audiobook)

LIVROS DISPONÍVEIS (${livrosValidos.length}):
${sampleBooks || 'Nenhum livro disponível no momento'}

PERGUNTA: "${pergunta}"

RESPONDA APENAS COM INFORMAÇÕES TEXTUAIS SOBRE OS LIVROS: [/INST]`;
}

function processResponse(rawResponse, livros) {
  let resposta = rawResponse.split("[/INST]")[1]?.trim() || rawResponse.trim();
  
  // Remove qualquer tentativa de link que possa ter sido gerada
  resposta = resposta.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  if (!isRespostaValida(resposta)) {
    return "😊 Desculpe, não entendi completamente. Poderia reformular?";
  }
  
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