FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start:dev"]