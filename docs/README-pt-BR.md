![img](https://github.com/padupe/amateur-tennis-players-rkg-nestjs/blob/main/assets/banner-project-pt-BR.svg)
# Ranking de Jogadores Amadores de Tênis

## Índice
<!--ts-->
* [Ranking de Jogadores Amadores de Tênis](#ranking-de-jogadores-amadores-de-tênis)
    * [Índice](#índice)
    * [Descrição](#descrição)
    * [MER (Modelo Entidade Relacionamento)](#mer-modelo-entidade-relacionamento)
    * [Fluxo](#fluxo)
    * [Contexto de Negócio](#contexto-de-negócio)
    * [Regras de Negócio](#regras-de-negócio)
        * [Jogador](#jogador)
        * [Administrador](#administrador)
    * [Dependências do Projeto](#dependências-do-projeto)
    * [Ferramentas Utilizadas](#ferramentas-utilizadas)
<!--te-->

## Descrição
Aplicação para gestão de ranking de jogadores amadores de Tênis.

## MER (Modelo Entidade Relacionamento)
<div align="center">
    <img align="center" alt="ERM" src="">
</div>

## Fluxo
TODO

## Contexto de Negócio
Uma aplicação que será utilizada por jogadores amadores de tênis.<br>
Estes jogadores fazem parte de um ranking que é atualizado conforme realização das partidas.<br>
O objetivo é apresentar uma solução que vise modernizar esta gestão, de maneira a incentivar quem já participa, bem como disponibilizar um atrativo para novos jogadores.<br>

## Regras de Negócio

### Jogador
- Solicitar ou rejeitar um desafio;
- Registrar o resultado de uma partida;
- Acompanhar os rankings;
- Consultar seus dados e seu histórico de partidas (vitórias, derrotas e posição no ranking);
- Consultar informações de seus adversários (histórico de partidas e dados);
- Ser notificado por e-mail quando for desafiado.

### Administrador
- Cadastrar as categorias e definir as pontuações;
- Cadastrar jogadores e definir suas categorias;
- Ser notificado quanto existir um desafio pendente a mais de 10 (dez) dias.

## Dependências do Projeto
- [NestJs](https://nestjs.com/): uma estrutura progressiva do [Node.js](https://nodejs.org/pt-br/) para criar aplicativos do lado do servidor eficientes, confiáveis ​​e escaláveis.

## Ferramentas Utilizadas
TODO

## Instalação
```bash
yarn install
```

## Executando a Aplicação
```bash
# ambiente de desenvolvimento
yarn start

# "watch mode"
yarn start:dev

# ambiente de produção
yarn start:prod
```

## Dicas para uso do NestJS
Comando para criar um `Module`
```bash
nest g module {nome_do_module}

# Exemplo
# nest g module jogadores
```
Comando para cirar um `Controller`
```bash
nest g controller {nome_do_controller}

# Examplo
# nest g controller jogadores
```

Comando para cirar um `Service`
```bash
nest g service {nome_do_service}

# Examplo
# nest g service jogadores
```

## Plataforma do Curso
- [Udemy](https://www.udemy.com/)