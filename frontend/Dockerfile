# Imagem base
FROM node:16

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando todos os arquivos do projeto Angular para o container
COPY . /app

# Instalando as dependências do Angular
RUN npm install

# Expondo a porta onde o Angular vai rodar
EXPOSE 4200

# Comando para rodar o servidor de desenvolvimento do Angular
CMD ["npm", "start"]
