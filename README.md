# xhelpers-todo-sample-api

## Main Dependencies and Requisites

- [x-helpers-api 2.1.6](https://github.com/wmkDev/xhelpers-api).
- [TypeScript 3.8](https://www.typescriptlang.org/).
- [Node.js 12+](https://nodejs.org/).
- [Mongoose 5.7](https://mongoosejs.com/).
  - [Mongodb](https://www.mongodb.com/).

## Option 1 - With Docker

### Set the environment variables

Create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.docker.example` file to `.env`

### Run the project

On the terminal:

```bash
docker-compose up
```

Go to http://localhost:3000/documentation

## Option 2 - Without docker

### Set the environment variables

Set the environment variables on your context or create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.example` file to `.env`

### Start the database
Run:
```bash
docker-compose up -d db
```

### Run the project

Install the dependencies:
```bash
npm install
```

```bash
npm run dev
```


Go to http://localhost:3000/documentation
