<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** - Ambiente de execução JavaScript no servidor
- **NestJS** - Framework progressivo para construção de aplicações eficientes e escaláveis
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática
- **TypeORM** - ORM para manipulação de banco de dados de forma estruturada e orientada a objetos
- **SQLite** - Banco de dados leve e fácil de configurar

## Descrição

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Configuração do Projeto

```bash
$ npm install
```

## Compilar e executar o projeto

```bash
# desenvolvimento
$ npm run start

# modo watch
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## Executar Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Como utilizar a autenticação no Swagger

Para acessar endpoints protegidos por autenticação, siga os passos abaixo:

1. Acesse a interface do Swagger através do navegador: `http://localhost:3000/api`
2. No Swagger, vá até o endpoint de **criação de usuário** (`/auth/signup`) e crie uma conta.
3. Depois, vá até o endpoint de **login** (`/auth/login`), informe as credenciais e obtenha o token JWT.
4. Copie o token retornado na resposta.
5. No Swagger, clique no botão **Authorize** (ícone de cadeado no topo direito da página).
6. Cole o token no campo `Bearer Token` e confirme.
7. Agora, todos os endpoints protegidos poderão ser acessados com autenticação.

## Implantação

Quando estiver pronto para implantar sua aplicação NestJS em produção, consulte a [documentação de implantação](https://docs.nestjs.com/deployment) para melhores práticas.

Se estiver buscando uma solução baseada em nuvem para hospedar seu projeto, experimente o [Mau](https://mau.nestjs.com), nossa plataforma oficial de implantação no AWS:

```bash
$ npm install -g mau
$ mau deploy
```

## Recursos

Confira alguns recursos úteis para trabalhar com NestJS:

- [Documentação do NestJS](https://docs.nestjs.com)
- [Canal do Discord](https://discord.gg/G7Qnnhy) para dúvidas e suporte
- [Cursos oficiais do NestJS](https://courses.nestjs.com/)
- [Implantação no AWS com Mau](https://mau.nestjs.com)
- [Ferramentas Dev do NestJS](https://devtools.nestjs.com)
- [Suporte empresarial](https://enterprise.nestjs.com)
- [Twitter](https://x.com/nestframework) e [LinkedIn](https://linkedin.com/company/nestjs) oficiais

## Licença

Nest está sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).

