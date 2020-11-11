# Backend APP Renner

## Requisitos da Aplicação

- Node
- PostgreSQL
- Redis

## Configuração inicial

Antes de rodar a aplicação, é necessário renomear o ormconfig.json-example para ormconfig.json.
Abaixo, o conteúdo do arquivo, que deverá ser ajustado de acordo com as configurações do postgres em sua máquina.

```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "192.168.99.100",
    "port": 5433,
    "username": "postgres",
    "password": "yourpassword",
    "database": "linker",
    "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  }
]
```

Após esse procedimento, renomear o .env-example para .env, ajustando as variáveis da
API e do APP com as suas configurações.

Note, que a configuração do Redis, para cache, está no final deste arquivo. A
juste o IP e a porta de acordo com a a sua configuração.

```js
# Application
APP_SECRET=(use um md5 hash)
APP_WEB_URL=http://procyon.simet:3000
APP_API_URL=http://procyon.simet:3333

# MAIL CONFIG
#MAIL_DRIVER=ses
MAIL_DRIVER=ethereal

# AWS Config
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_S3_BUCKET=

# Storage
STORAGE_DRIVER=disk

# Cache Driver
CACHE_DRIVER=redis

# Redis
REDIS_HOST=192.168.99.100
REDIS_PORT=6379
REDIS_PASSWORD=
```

## Criando um docker container para o PostgreSQL

Abaixo o comando para criar o docker container. Preste atenção no parâmetro -p **port1**:port2.

A port1 indica a porta que será aberta no seu host, que é por onde você vai
conectar no container.
Se você já tiver um postgres instalado na sua máquina, indique outra porta para
evitar conflito.
A port2 é a porta local do postgres dentro do container.

```bash
docker run --name nomeDoContainer -e POSTGRES_PASSWORD=umasenha -d postgres -p 5432:5432
```

Após configurado o container, inicie-o com o seguinte comando:

```bash
docker start nomeDoContainer
```

Para criação da database, configure a ferramenta de banco de dados preferida com
os dados de conexão e crie o banco de dados com o nome de sua preferência (não esqueça
de indicá-lo no ormconfig.json)

Uma ótima ferramenta, e gratuita, é [Azure Data Studio](https://docs.microsoft.com/pt-br/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15).
Na guia de plugins, instale o plugin do Postgres e use a vontade.

## Criando um docker container para o Redis

O Redis está sendo utilizado para armazenamento do cache.

Execute o comando abaixo para criar o container:

```bash
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Para iniciar o container:

```bash
docker start redis
```

## Iniciando a APP

```bash
yarn install

yarn typeorm migration:run

yarn dev:server
```
