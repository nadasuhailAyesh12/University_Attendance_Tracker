const http = require("http");

const { QueryFile } = require('pg-promise');
const path = require('path');
const { port } = require("./config/enviroment");
const app = require("./app")
const server = http.createServer(app);
const fs = require('fs');




process.on('uncaughtException', err => {
    console.log(`Error:${err}`);
    console.log('shutting down the server due to uncaught exception')
    process.exit(1);
})


// dbConnection().then(() => {
server.listen(port, () => {
    console.log(`server is listening on ${port}`)
})


