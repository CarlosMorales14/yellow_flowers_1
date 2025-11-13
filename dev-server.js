const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static('.'));

// Almacenamiento temporal de flores
const flowers = new Map();

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);
  
  // Enviar flores existentes al nuevo usuario
  const existingFlowers = Array.from(flowers.values());
  if (existingFlowers.length > 0) {
    socket.emit('initialFlowers', existingFlowers);
  }

  // Manejar nueva flor dibujada
  socket.on('drawFlower', (flowerData) => {
    const flower = {
      ...flowerData,
      id: `flower_${Date.now()}_${socket.id}`,
      timestamp: Date.now(),
      userId: socket.id
    };
    
    // Almacenar flor (limitar a últimas 100)
    flowers.set(flower.id, flower);
    if (flowers.size > 100) {
      const oldestKey = flowers.keys().next().value;
      flowers.delete(oldestKey);
    }
    
    // Enviar a todos los demás usuarios
    socket.broadcast.emit('newFlower', flower);
  });

  // Manejar limpiar canvas
  socket.on('clearCanvas', () => {
    flowers.clear();
    socket.broadcast.emit('canvasCleared');
  });

  // Heartbeat
  socket.on('ping', () => {
    socket.emit('pong');
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🌻 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`🎨 Abre el navegador y comienza a dibujar flores!`);
});