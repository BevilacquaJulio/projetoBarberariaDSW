import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapeamento das imagens para os serviços (baseado no ddl_imagens.sql)
const IMAGENS_SERVICOS = [
  {
    filename: '5.png',
    servico_id: 1, // Corte Feminino
    titulo: 'Corte Feminino',
    descricao: 'Corte Feminino - R$ 114.99',
    preco: 114.99
  },
  {
    filename: '10.png',
    servico_id: 2, // Coloração
    titulo: 'Coloração e Tonalização',
    descricao: 'Coloração e tonalização profissional',
    preco: 279.99
  },
  {
    filename: '3.png',
    servico_id: 3, // Luzes
    titulo: 'Luzes e Mechas',
    descricao: 'Luzes e mechas - resultado profissional',
    preco: 449.99
  },
  {
    filename: '8.png',
    servico_id: 4, // Hidratação
    titulo: 'Tratamento e Hidratação',
    descricao: 'Tratamento intensivo e hidratação profissional',
    preco: 169.99
  },
  {
    filename: '9.png',
    servico_id: 5, // Escova
    titulo: 'Penteados para eventos',
    descricao: 'Penteados e escovas para ocasiões especiais',
    preco: 269.99
  },
  {
    filename: '7.png',
    servico_id: 6, // Maquiagem
    titulo: 'Maquiagem',
    descricao: 'Maquiagem profissional para eventos',
    preco: 299.99
  }
];

// Função auxiliar para fazer requisições HTTP
function fazerRequisicao(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const data = options.body ? JSON.stringify(options.body) : null;

    // Garante que a porta seja 3000 se não especificada
    const port = urlObj.port || (urlObj.protocol === 'https:' ? 443 : 3000);

    const reqOptions = {
      hostname: urlObj.hostname || 'localhost',
      port: port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (data) {
      reqOptions.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          if (body.trim() === '') {
            return reject(new Error('Resposta vazia do servidor'));
          }
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(parsed.error || parsed.erro || `HTTP ${res.statusCode}: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Erro ao parsear resposta: ${e.message}. Resposta: ${body.substring(0, 200)}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Erro de conexão: ${err.message}. Verifique se o backend está rodando em ${urlObj.protocol}//${reqOptions.hostname}:${reqOptions.port}`));
    });
    if (data) req.write(data);
    req.end();
  });
}

// Função para fazer requisição HTTP
async function registrarImagens(token) {
  const apiUrl = process.env.API_URL || 'http://localhost:3000';
  const url = `${apiUrl}/api/imagens/registrar-existentes`;
  
  return await fazerRequisicao(url, {
    method: 'POST',
    headers: {
      'x-access-token': token
    },
    body: { imagens: IMAGENS_SERVICOS }
  });
}

// Função para fazer login e obter token
async function fazerLogin() {
  const apiUrl = process.env.API_URL || 'http://localhost:3000';
  const url = `${apiUrl}/usuario/login`;
  
  const email = process.env.ADMIN_EMAIL || 'admin@gv.com';
  const senha = process.env.ADMIN_SENHA || 'admin123';

  const response = await fazerRequisicao(url, {
    method: 'POST',
    body: { email, senha }
  });

  return response.token;
}

// Função para verificar se os arquivos existem
function verificarArquivos() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const arquivosFaltando = [];

  for (const img of IMAGENS_SERVICOS) {
    const filePath = path.join(uploadsDir, img.filename);
    if (!fs.existsSync(filePath)) {
      arquivosFaltando.push(img.filename);
    }
  }

  return arquivosFaltando;
}

// Script principal
async function main() {
  console.log('🚀 Iniciando script de popular imagens...\n');

  // Verifica se os arquivos existem
  console.log('📁 Verificando arquivos na pasta uploads/...');
  const arquivosFaltando = verificarArquivos();
  
  if (arquivosFaltando.length > 0) {
    console.error('❌ Erro: Os seguintes arquivos não foram encontrados:');
    arquivosFaltando.forEach(file => console.error(`   - ${file}`));
    process.exit(1);
  }

  console.log(`✅ Todos os ${IMAGENS_SERVICOS.length} arquivos encontrados!\n`);

  try {
    // Verifica se o backend está rodando
    console.log('🔍 Verificando se o backend está rodando...');
    try {
      await fazerRequisicao(`${process.env.API_URL || 'http://localhost:3000'}/servicos`, { method: 'GET' });
      console.log('✅ Backend está respondendo!\n');
    } catch (err) {
      console.error('❌ Erro: Backend não está respondendo ou não está rodando!');
      console.error(`   Verifique se o backend está rodando em: ${process.env.API_URL || 'http://localhost:3000'}`);
      console.error(`   Erro: ${err.message}\n`);
      process.exit(1);
    }

    // Faz login
    console.log('🔐 Fazendo login...');
    const token = await fazerLogin();
    console.log('✅ Login realizado com sucesso!\n');

    // Registra as imagens
    console.log('📤 Registrando imagens no banco de dados...');
    const resultado = await registrarImagens(token);
    
    console.log('\n✅ Processamento concluído!');
    console.log(`📊 Total: ${resultado.total}`);
    console.log(`✅ Sucessos: ${resultado.sucessos}`);
    console.log(`❌ Falhas: ${resultado.falhas}\n`);

    if (resultado.falhas > 0) {
      console.log('⚠️  Detalhes das falhas:');
      resultado.resultados
        .filter(r => !r.success)
        .forEach(r => console.log(`   - ${r.filename}: ${r.error}`));
    }

    console.log('\n✨ Imagens registradas com sucesso no banco de dados!');
    
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executa o script
main();

