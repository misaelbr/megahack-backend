# Criação de Usuário

** Requisitos Funcionais **

- O usuário deve cadastrar sua conta informando um e-mail;
- O usuário deve receber um e-mail para validar o e-mail;
- O usuário deve cadastrar uma senha;

** Requisitos Não Funcionais **

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amason Simples Email Services para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

** Regras de Negócio **

- O e-mail não pode ser duplicado;
- O usuário deve confirmar a senha cadastrada;

# Recuperação de Senha

** Requisitos Funcionais **

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário pode resetar sua senha;

** Requisitos não funcionais **

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amason Simples Email Services para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

** Regras de Negócio **

- O link enviado por e-mail para resetar a senha deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar sua senha;
