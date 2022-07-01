![img](https://github.com/padupe/amateur-tennis-players-rkg-nestjs/blob/main/assets/banner-project.svg)
# Amateur Tennis Players Ranking
> Check the Documentation in pt-BR by clicking 🇧🇷 [here](https://github.com/padupe/amateur-tennis-players-rkg-nestjs/blob/main/docs/README-pt-BR.md 'here').

## Index
<!--ts-->
* [Amateur Tennis Players Ranking](#amateur-tennis-players-ranking)
    * [Index](#index)
    * [Description](#description)
    * [ERM (Entity Relationship Model)](#erm-entity-relationship-model)
    * [Flow](#flow)
    * [Business Context](#business-context)
    * [Business Rules](#business-rules)
        * [Player](#player)
        * [Administrator](#administrator)
    * [Project Dependencies](#project-dependencies)
    * [Tools Used](#tools-used)
<!--te-->

## Description
Application for ranking management of amateur tennis players.

## ERM (Entity Relationship Model)
<div align="center">
    <img align="center" alt="ERM" src="">
</div>

## Flow
TODO

## Business Context
An application that will be used by amateur tennis players.<br>
These players are part of a ranking that is updated as matches are played.<br>
The objective is to present a solution that aims to modernize this management, in order to encourage those who already participate, as well as provide an attraction for new players.<br>

##  Business Rules

### Player
- Request or reject a challenge;
- Record the result of a match;
- Follow the rankings;
- Consult your data and your match history (wins, losses and ranking position);
- Consult information about your opponents (match history and data);
- Get notified by email when challenged.

### Administrator
- Register the categories and set the scores;
- Register players and define their categories;
- Be notified when there is a pending challenge for more than 10 (ten) days.

## Project Dependencies
- [class-transformer](https://www.npmjs.com/package/class-transformer 'class-transformer'): class-transformer allows you to transform plain object to some instance of class and versa;<br>
- [class-validator](https://www.npmjs.com/package/class-validator): allows use of decorator and non-decorator based validation;<br>
- [dotenv](https://www.npmjs.com/package/dotenv 'dotenv'): Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`;<br>
- [NestJs](https://nestjs.com/): a progressive [Node.js](https://nodejs.org/en/) framework for building efficient, reliable and scalable server-side applications;<br>
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata 'reflect-metadata'): A library that serves multiple use cases (dependency composition/injection, runtime type assertions, reflection/mirroring, testing) wants the ability to add additional metadata to a class in a consistent way;<br>

## Tools Used
- **Database:** [MongoDB](https://www.mongodb.com/)

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Tips for using NestJS
Command to create a `Module`
```bash
nest g module {module_name}

# Example
# nest g module players
```

Command to create a `Controller`
```bash
nest g controller {controller_name}

# Example
# nest g controller players
```

Command to create a `Service`
```bash
nest g service {service_name}

# Example
# nest g service players
```

## Course Platform
- [Udemy](https://www.udemy.com/)