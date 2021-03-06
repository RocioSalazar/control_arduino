"use stric";

//ejecutar el express
var bodyParser = require("body-parser"); //convertir todo a JSON
const express = require("express"); //requerir express
const app = express(); //instanciar express
// const Serialport = require("serialport"); //Importación de la libreria del serialport

//configuración del puerto del arduino y los baudios establecidos en el Arduino IDE
// const port = new Serialport("COM3", {
//   baudRate: 57600,
// });

// cargar el body-parser para utilizar posteriormente
app.use(bodyParser.urlencoded({ extended: false }));

//asegurar que el body-parser ppueda convertir cualquier cosa en JSON
app.use(bodyParser.json());

//requerir MongoDB
// const { MongoClient } = require("mongodb");
// // URL de la BD
// const uri =
//   "mongodb+srv://javier:javier12345@cluster0.w3wdi.mongodb.net/opss?retryWrites=true&w=majority";

//Escuchar por el puerto que nos de el sitio
const puerto = process.env.PORT || 3900;

app.listen(puerto, () => {
  console.log(
    "Servidor corriendo y listo para escuchar peticiones en puerto " + puerto
  );
});

// // Traer el board y el led
var { Board, Led } = require("johnny-five");
// var firmata = require("firmata");

//The "sp" variable here could be any instance of a virtual serial port
// var io = new firmata.Board(port);
// var board = new five.Board({ io: io });
var board = new Board();
board.on("ready", function () {
  // var led = new Led(13);
  // app.get("/", (req, res) => {
  //   let mensaje = "Hola mundo";
  //   res.send({
  //     mensaje,
  //   });
  //   led.on();
  // });
  // // Ruta de encendido
  var led = new Led(13);
  var buzzer = new Led(12);
  app.get("/encendido", (req, res) => {
    status = true;
    console.log(status);

    led.blink(500);
    buzzer.blink(500);

    return res.status(200).send({
      status,
    });
  });

  // Ruta de apagado
  app.get("/apagado", (req, res) => {
    status = false;
    console.log(status);

    led.stop();
    led.off();
    buzzer.off();
    buzzer.stop();

    return res.status(200).send({
      status,
    });
  });
});

// // Iniciar el board
// board.on("ready", async () => {
//   var led = new Led(13);
//   var buzzer = new Led(12);

//   // var params = req.body;
//   // let id = parseInt(params.id_alarma) + 1;

//   proximity = new Proximity({
//     controller: "HCSR04",
//     pin: 3,
//   });

//   await proximity.on("data", async function () {
//     if (this.cm <= 20 && this.cm > 0) {
//       console.log(" cm : ", this.cm);
//       led.on();
//       buzzer.on();

//       // connect();
//       // async function connect() {
//       //   const client = new MongoClient(uri, {
//       //     useNewUrlParser: true,
//       //     useUnifiedTopology: true,
//       //   });
//       //   await client.connect();
//       //   const db = client.db("opss");
//       //   // console.log("conectado a la BD", db.databaseName);
//       //   const clientes = db.collection("clientes");
//       //   await clientes.updateOne(
//       //     { correo: "javier@gmail.com" },
//       //     { $set: { [`alarmas.alarma 1`]: "encendida" } }
//       //     // { correo: params.correo },
//       //     // { $set: { [`alarmas.alarma ${id}`]: "encendida" } }
//       //   );
//       //   // console.log(actualizar.modifiedCount);
//       //   client.close();
//       // }
//     }
//     led.off();
//     buzzer.off();
//   });

// // Ruta de encendido
// app.get("/encendido", (req, res) => {
//   var led = new Led(13);
//   var buzzer = new Led(12);

//   status = true;
//   console.log(status);

//   led.blink(500);
//   buzzer.blink(500);

//   return res.status(200).send({
//     status,
//   });
// });

// // Ruta de apagado
// app.get("/apagado", (req, res) => {
//   var led = new Led(13);
//   var buzzer = new Led(12);
//   status = false;
//   console.log(status);

//   led.stop();
//   led.off();
//   buzzer.off();
//   buzzer.stop();

//   return res.status(200).send({
//     status,
//   });
// });

//   //   // var params = req.body;
//   //   // let id = parseInt(params.id_alarma) + 1;

//   //   // connect();
//   //   // async function connect() {
//   //   //   const client = new MongoClient(uri, {
//   //   //     useNewUrlParser: true,
//   //   //     useUnifiedTopology: true,
//   //   //   });
//   //   //   await client.connect();
//   //   //   const db = client.db("opss");
//   //   //   // console.log("conectado a la BD", db.databaseName);
//   //   //   const clientes = db.collection("clientes");
//   //   //   await clientes.updateOne(
//   //   //     { correo: params.correo },
//   //   //     { $set: { [`alarmas.alarma ${id}`]: "apagada" } }
//   //   //   );
//   //   //   // console.log(actualizar.modifiedCount);
//   //   //   client.close();
//   //   // }
//   // });
// });
