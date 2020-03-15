![BTC](https://img.shields.io/badge/Donate-BTC-red?logo=bitcoin)
**`3B2R9u6dpJyWB4U6iDWC14y9yejnF5hsSN`**
[![Buy me a coffee](https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-orange?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/RwIpTEd) 
[![Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-blue?logo=ko-fi)](https://ko-fi.com/fatihturker)

# `Express Generator CLI for React Native with Typescript and Apollo GraphQL Client`

This CLI helps to create new implemented front-end demo for React Native with Typescript and Apollo GraphQL Client from a boilerplate.
To have a Full Stack project, or to test created demo, you can setup graphql server with using [Express Generator CLI for Graphql Backend]

## `About the NPM Package`
### Package Installation
```sh
npm install -g express-generator-react-native-typescript-apollo-graphql
```

### Package Usage
Go to the directory on terminal where you want to generate the project.
```sh
$ cd PATH
```
and run the generator command with specifying the project name.
```sh
$ express-generator-rntag --name="PROJECT_NAME"
```

## `Documentation for the Boilerplate`
When you generate the project, you will have;

### Tech Stack

* [Node.js]
* [Typescript]
* [GraphQL Apollo Client]
* [React Native Elements]

### Features

* GraphQL Queries with implementations in Typescript for Demo User Entity
* GraphQL Mutations with implementations in Typescript for Demo User Entity
* CRUD operations in Typescript for Demo User Entity
* Full Ready CRUD Demo User Components: User List Component, Single User Component, User Dialog Component

### Architecture
This boilerplate has common graphql client design architecture. 
**Layers:**
* ***Components*** holds component implementations 
* ***Models*** holds document interfaces and schema models
* ***Mutations*** holds basic mutation scripts to send graphql server; create, update, delete
* ***Queries*** holds basic query scripts to send graphql server; retrieve

### Installation
Install the dependencies and devDependencies:

```sh
$ cd <Project Name>
$ npm install
```

Set configuration parameters on **config/index.ts**:
```sh
GRAPHQL_URL: "{{GRAPHQL API URL}}"
```

And that's all, start the client
```sh
$ npm start
```

## `Documentation for the Generator Project`
### Tech Stack
* [Node.js]
* [Typescript]

### Plugins

**express-generator-rtmag** is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | Usage |
| ------ | ------ |
| [ejs] | to render global parameters like Project Name |
| [inquirer] | to ask questions and parse input |
| [shelljs] | to eliminate your shell script's dependency on Unix |
| [yargs] | to build interactive command line tools |
| [shx] | to wrap around ShellJS Unix commands |
| [ts-node] | to execute TypeScript and REPL for node.js, with source map support |


### Installation
**express-generator-ntagm** requires [Node.js] v10+ to run.

Install the dependencies and devDependencies and start the application.

```sh
$ cd express-generator-node-typescript-apollo-graphql-mongo
$ npm install
$ npm start
```

To install the CLI globally:
```sh
$ npm run-script build
$ npm install -g .
```

And global usage:
```sh
$ express-generator-rtmag --name="PROJECT_NAME"
```

# `Authors`
 * **Fatih Türker**
# `Sponsors`
No sponsors yet! **Will you be the first?**

# `Contributors`
No contributers yet! **Will you be the first?**

# License
----

MIT

[Typescript]: <https://www.typescriptlang.org>
[Node.js]: <http://nodejs.org>
[ts-node]: <https://www.npmjs.com/package/ts-node>
[shx]: <https://www.npmjs.com/package/shx>
[yargs]: <https://www.npmjs.com/package/yargs>
[shelljs]: <https://www.npmjs.com/package/shelljs>
[inquirer]: <https://www.npmjs.com/package/inquirer>
[ejs]: <https://www.npmjs.com/package/ejs>
[GraphQL Apollo Client]: <https://www.apollographql.com/docs/react/>
[React Native Elements]: <https://react-native-elements.github.io/react-native-elements/>
[Express Generator CLI for Graphql Backend]: <https://www.npmjs.com/package/express-generator-node-typescript-apollo-graphql-mongo-cli>