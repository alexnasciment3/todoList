<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Accessing Swagger UI

O projeto possui uma documentação interativa através do Swagger UI. Para acessá-la:

1. Inicie o projeto localmente:
   ```bash
   $ npm run start:dev
   ```
2. Acesse o Swagger UI no navegador:
   ```
   http://localhost:3000/api-docs
   ```

## Criando um Usuário e Autenticando no Swagger

1. **Criar um Usuário:**
   - Acesse o endpoint `POST /auth/register` no Swagger.
   - Envie um JSON no corpo da requisição:
     ```json
     {
       "email": "usuario@example.com",
       "password": "senha123"
     }
     ```
   - Clique em "Execute" e aguarde a criação do usuário.

2. **Fazer Login e Obter Token:**
   - Acesse o endpoint `POST /auth/login` no Swagger.
   - Envie o seguinte JSON:
     ```json
     {
       "email": "usuario@example.com",
       "password": "senha123"
     }
     ```
   - O Swagger retornará um **token JWT** no campo `access_token`.

3. **Autenticar no Swagger:**
   - Copie o token JWT retornado.
   - No topo direito do Swagger, clique no botão **Authorize**.
   - Cole o token no campo `Bearer <TOKEN>` (substitua `<TOKEN>` pelo valor copiado).
   - Clique em **Authorize** e feche a janela.

Agora, você pode acessar os demais endpoints protegidos da API.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Resources

Confira alguns recursos úteis para trabalhar com NestJS:

- Visite a [Documentação do NestJS](https://docs.nestjs.com) para aprender mais.
- Para suporte e dúvidas, acesse nosso [Discord](https://discord.gg/G7Qnnhy).
- Explore os cursos oficiais em [NestJS Courses](https://courses.nestjs.com/).
- Visualize sua aplicação com [NestJS Devtools](https://devtools.nestjs.com).

