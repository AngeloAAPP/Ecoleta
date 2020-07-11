# Ecoleta
Projeto desenvolvido durante o evento Next level Week primeira edição, ministrado pela Rocketseat.

O projeto contém algumas diferenças nas tecnologias utilizadas em relação ao original, conforme veremos em um tópico a seguir.

<p>
  <a href="#Descrição-do-projeto">Descrição do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Tecnologias-utilizadas">Tecnologias utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Diferenças-para-o-projeto-original">Diferenças para o projeto original</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Como-utilizar">Como utilizar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

### Descrição do projeto
O ecoleta é um sistema que visa facilitar o descarte de resíduos, como pilhas e baterias, lâmpadas, entre outros, como uma forma de preservar o meio ambiente.

Na versão web, as empresas podem se cadastrar como um ponto de coleta, fornecendo endereço, nome, contato e os itens de coleta aceitos.

No aplicativo móvel, as pessoas conseguem visualizar em um mapa os pontos de coleta próximos com base na sua localização, podendo filtrar os pontos por itens de coleta.

![](https://blog.rocketseat.com.br/content/images/2020/06/ecoleta.png)

### Tecnologias utilizadas

- **Node.js** + Express (Servidor)
- **React JS** (Web)
- **React Native** + Expo (Mobile)
- **Microsoft SQL Server** (Bando de Dados)


### Diferenças para o projeto original

No projeto resolvi utilizar **javascript** em vez de **typescript**,e também optei por não utilizar o <a href = "http://knexjs.org/">KNEX JS</a>(um builder sql). Decidi
por escrever os comandos para o banco de dados na própria linguagem SQL, em vez de utilizar um builder sql para escrever os comandos em javascript.

Outra diferença foi no banco de dados. No projeto original foi utilizado o SQLITE, enquanto eu resolvi utilizar o sql server.

Para fixar alguns conceitos como Migrations, Seeders, Models, Transactions, desenvolvi a mesma versão do back-end contida neste projeto utilizando Sequelize. 
O back-end desenvolvido com sequelize esta disponível <a href = "https://github.com/AngeloAAPP/Ecoleta-Sequelize">aqui</a>

### Como utilizar

Certifique-se que você tenha o Node JS e o Microsoft Sql Server instalados no computador.

**Primeiramente, temos que configurar a base de dados.**

Considerando que você ja tenha o microsoft sql server instalado, crie uma base de dados e dê o nome que quiser. Depois, copie todo o conteúdo do arquivo script bd, localizado
na pasta raiz do projeto, faça uma nova consulta sql na base de dados que você criou, e cole todo o conteúdo do script, executando em seguida.

Pronto, agora você ja tem a base de dados configurada para iniciar o projeto.

**Agora, vamos instalar as dependencias de cada parte do projeto (Server, web, mobile)**

Primeiramente, abra o seu terminal e digite o seguinte comando: 

```sh
npm install -g expo-cli
```

Agora, entre na pasta raiz do projeto através do terminal, e cole os seguintes comandos, linha por linha, e apertando enter após cada linha:


```sh
cd server
npm install

cd ../web
npm install

cd ../mobile
npm install
```
Estes comandos instalaram todas as dependências do projeto

**Agora, vamos executar o servidor**

Primeiramente, abra a pasta server dentro do seu editor de código. Renomeie o arquivo .env.example para .env, e modifique todos os dados do arquivo de acordo com o seu
banco de dados.
Na porta, sugiro manter a porta 3001. Em base_url, mantenha o http:// , mas substitua o endereço ip pelo seu endereço ipv4, podendo ser obtido com o comando ipconfig no terminal
(Windows) ou ifconfig(Linux Ubuntu)

Agora, basta acessar a pasta server pelo nosso terminal, e digitar o seguinte comando: 

```sh
npm start
```
Você devera ver a mensagem "servidor iniciado" e depois "conectado com sucesso", indicando que foi feita a conexão com o banco de dados.
Pronto, temos nosso servidor rodando!

**Agora, vamos executar a aplicação web**

Abra a pasta web dentro do seu editor de código. Entre na pasta src, depois na pasta api, e abra o arquivo config.

substitua "3001" pela porta que você configurou anteriormente, no arquivo .env do servidor. Se você manteve a porta 3001, pode pular este passo.

Agora, abra um novo terminal, deixando o que está rodando o servidor minimizado, acesse a pasta web do nosso projeto, e digite o seguinte comando: 

```sh
npm start
```
A aplicação iniciará e abrirá automaticamente no seu navegador. Se quiser, ja pode cadastrar alguns pontos de coleta, para ver depois no aplicativo móvel.

**Agora, vamos executar o aplicativo móvel**

Primeiramente, baixe o aplicativo Expo na loja de aplicativos do seu celular

Agora, abra um novo terminal, acesse a pasta mobile do nosso projeto, e digite o seguinte comando: 

```sh
npm start
```

Abrirá uma janela no seu navegador, contendo um qr code.

Agora, abra o aplicativo Expo que foi baixado no celular, Selecione a opção "Scan QR Code", e aponte a câmera que abrirá para o qr code do navegador.

Pronto! aguarde carregar e ja estará rodando o aplicativo no celular. Selecione a sua UF / Cidade, selecione os itens de coleta desejados, e verá os pontos de coleta
que cadastrou anteriormente na versão web!
