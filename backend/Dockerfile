FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Compila a aplicação
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "run", "start:prod"]