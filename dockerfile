# Usa imagem leve baseada em Debian
FROM node:18-slim

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências do projeto
RUN npm install

# Instala o liblouis
RUN apt-get update && apt-get install -y liblouis-bin

# Copia o restante da aplicação
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 8080

# Comando de inicialização
CMD ["node", "src/server.js"]
