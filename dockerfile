# Imagem base com Node e Linux
FROM node:18-bullseye

# Diretório da aplicação
WORKDIR /usr/src/app

# Copiar arquivos
COPY package*.json ./
COPY . .

# Instalar dependências do sistema + liblouis
RUN apt-get update && \
    apt-get install -y liblouis-bin && \
    npm install

# Expor porta
EXPOSE 3000

# Rodar a API
CMD [ "node", "src/server.js" ]
