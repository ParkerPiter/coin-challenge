const express = require('express');
const redis = require('redis');
let coins = require('./db.js');
const port = 3000;

//Cliente de redis
const client = redis.createClient({
  host:'localhost',
  port:6379
});

//Aviso de conexión a redis
client.connect()
  .then(() => {
    console.log('Conectado a Redis');
  })
  .catch((err) => {
    console.error('Error al conectarse a Redis:', err);
  });

const app = express();

//Array de wallet:
let my_wallet =[]; 

//Generador de coins
//const ttl = 5 * 60 * 1000; // 5min en milisegundos
const ttl =  80 * 1000; // 1min 20 seg en milisegundos
function generateCoins() {
  console.log("Recargando coins...");
  coins = [];
  for (let i = 1; i <= 12; i++) {
    const coin = {
      id: i.toString(),
      coin: 'coin ' + i,
      position: {
        x: i,
        y: i,
        z: i
      }
    };
    coins.push(coin);
  }
  
  // Almacena las monedas en Redis
  client.set('coins', JSON.stringify(coins));

  // Programa la eliminación de las monedas después de `ttl` milisegundos
  setTimeout(() => {
    coins = [];
    generateCoins();
  }, ttl);
}
// Genera el primer set de monedas al iniciar el programa
generateCoins();

app.get('/room',(req, res)=>{
  client.get('coins', (err, reply) => {
    if (err) return res.status(500).send(err.message);
    
    const coins = JSON.parse(reply);
    let all_in_room = coins.length;
    res.send("The room has " + all_in_room.toString() + " coins");
  });
});

app.post('/room/:choose_coin', (req, res) => {
  const coinId = req.params.choose_coin;
  client.get('coins', (err, reply) => {
    if (err) return res.status(500).send(err.message);
    
    let coins = JSON.parse(reply);
    const coinIndex = coins.findIndex(c => c.id === coinId);
    if (coinIndex === -1) return res.status(404).send('Coin not found, maybe was take it for other user');
    
    const coin = coins[coinIndex];
    my_wallet.push(coin);
    coins.splice(coinIndex, 1);

    // Actualiza las monedas en Redis
    client.set('coins', JSON.stringify(coins));

    res.send(`You select: ${coin.coin} \n The position is: X=${coin.position.x} Y=${coin.position.y} Z=${coin.position.z}`)
  });
});

app.put('/wallet', (req,res)=>{
  let wallet = my_wallet.length;
  res.send("Your wallet: " + wallet + " coin")
});

client.on('end', () => {
  console.log('Cliente de Redis desconectado');
});

app.listen(port,()=>{
    console.log(`Server ready! is listen in port ${port}` )
});
