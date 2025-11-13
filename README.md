# Yellow Flowers - Colaborativo en Tiempo Real 🌻

Una aplicación interactiva donde puedes dibujar flores amarillas y ver en tiempo real lo que otros usuarios están dibujando.

## Características

- 🌸 Dibujo colaborativo en tiempo real
- 🎨 Flores procedurales con pétalos aleatorios
- 🌐 Sincronización automática entre usuarios
- 🧹 Botón de limpiar compartido
- 📱 Responsive design
- ⚡ Optimizado para Vercel

## Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript vanilla, SVG
- **Backend**: Socket.IO + Vercel Serverless Functions
- **Deploy**: Vercel
- **Tiempo Real**: WebSockets con fallback a polling

## Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/CarlosMorales14/yellow_flowers_1.git
cd yellow_flowers_1
```

2. Instala dependencias:
```bash
npm install
```

3. Ejecuta en desarrollo:
```bash
npm run dev
```

4. Abre http://localhost:3000

## Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Deploy automático en cada push

### Deploy manual con Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

## Uso

1. **Dibujar**: Mantén presionado el mouse y mueve para dibujar flores
2. **Ver otros usuarios**: Las flores de otros aparecen automáticamente
3. **Limpiar**: Click en "🌸 Limpiar" para borrar todo (afecta a todos)
4. **Estado**: Indicador visual del estado de conexión

## Estructura del Proyecto

```
yellow_flowers_1/
├── api/
│   └── socketio.js          # Servidor Socket.IO
├── index.html               # Frontend principal
├── package.json            # Dependencias
├── vercel.json             # Configuración Vercel
└── README.md               # Este archivo
```

## Características Técnicas

- **WebSockets**: Comunicación bidireccional en tiempo real
- **Serverless**: API functions de Vercel para escalabilidad
- **Fallback**: Polling automático si WebSockets fallan
- **Optimización**: Límite de flores en memoria para rendimiento
- **Cross-browser**: Compatible con navegadores modernos

## Contribuir

1. Fork del repositorio
2. Crea una rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -am 'Agrega nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Pull Request

## Licencia

MIT License - Carlos Morales 2025