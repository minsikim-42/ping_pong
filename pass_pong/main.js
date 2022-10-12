const Socket = require("socket.io");
const express = require("express");
const http = require("http");
const Pong = require("./Pong");
const optimizer = require("./optimizer");

// import { Socket } from "socket.io";
// import express from "express";
// import http from "http";
// import Pong from "./Pong.js";
// import optimizer from "./optimizer.js";

const app = express();

const port = 3000;
const clients = new Map();


// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/alive", (req, res) => {
  let rtn = [];
  clients.forEach((value, key) => {
    rtn.push(value);
  });
  res.send(rtn);
});

const h = http.Server(app);
const io = Socket(h);

let pong = null;

let players = 0;

let loop = null;

function onConnection(Socket) {
  console.log(Socket.id);
  console.log(io.of('/').adaptor);
  /*
  Socket.on('alive', (data) => {
    clients.set(Socket.id, {
      id: Socket.id,
      nick: Socket.id
    });
    console.log(`${Socket.id} is alive`);
    Socket.broadcast.emit("alive", {
      add: clients.get(Socket.id)
    });
  });
  */
  Socket.on('disconnecting', (data) => {
    console.log(`player ${players} disconnected`);
    players--;
    if (players === 0) {
      console.log(`game stopped`);
      clearInterval(loop);
      pong = null;
    }
  });
  Socket.on('p1', (data) => {
    pong.setPlayer1Pos = data.p;
  });
  Socket.on('p2', (data) => {
    pong.setPlayer2Pos = data.p;
  });
  Socket.on('gameStart', (data) => {
    if (players === 0) {
      console.log("player 1");
      Socket.emit('p1');
    } else if (players === 1) {
      console.log("player 2");
      Socket.emit('p2');
    }
    if (players === 0) {
      let closure = optimizer();
      pong = new Pong(data.width, data.height);
      loop = setInterval(() => {
        let pos_ai = pong.AI;
        //pong.setPlayer1Pos = pos_ai[0];
        //pong.setPlayer2Pos = pos_ai[1];
        pong.update();
        let obj = {
          s: pong.getScore,
          u: pong.getPaddlesPos,
          b: pong.getBallPos
        };
        // 최적화 : 30초에 71kb
        // 최적화 x : 30초에 100kb
        obj = closure(obj);
        if (obj) {
          io.emit('gameData', obj);
        }
      }, 1000/30);
    }
    players++;
  });
}


io.on('connection', onConnection);

h.listen(port, () => console.log('listening on port ' + port));