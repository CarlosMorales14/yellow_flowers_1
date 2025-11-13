import { Server } from 'socket.io';

let io;
const flowers = new Map(); // Almacena flores temporalmente
const rooms = new Map(); // Maneja salas de usuarios

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Inicializando Socket.IO...');
    
    io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log(`Usuario conectado: ${socket.id}`);
      
      // Enviar flores existentes al nuevo usuario
      const existingFlowers = Array.from(flowers.values());
      if (existingFlowers.length > 0) {
        socket.emit('initialFlowers', existingFlowers);
      }

      // Manejar nueva flor dibujada
      socket.on('drawFlower', (flowerData) => {
        // Agregar timestamp y ID único
        const flower = {
          ...flowerData,
          id: `flower_${Date.now()}_${socket.id}`,
          timestamp: Date.now(),
          userId: socket.id
        };
        
        // Almacenar flor (limitar a últimas 100 para rendimiento)
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

      // Manejar unirse a sala específica (opcional)
      socket.on('joinRoom', (roomId) => {
        socket.leave([...socket.rooms][1]); // Salir de sala anterior
        socket.join(roomId);
        
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);
        
        console.log(`Usuario ${socket.id} se unió a la sala ${roomId}`);
      });

      // Manejar desconexión
      socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        
        // Limpiar de salas
        for (const [roomId, users] of rooms.entries()) {
          if (users.has(socket.id)) {
            users.delete(socket.id);
            if (users.size === 0) {
              rooms.delete(roomId);
            }
          }
        }
      });

      // Heartbeat para mantener conexión activa
      socket.on('ping', () => {
        socket.emit('pong');
      });
    });

    res.socket.server.io = io;
  }
  
  res.end();
}