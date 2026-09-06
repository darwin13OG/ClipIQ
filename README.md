# ClipIQ — Video Audit & Viral Replicator 🎬⚡

> **Suite de auditoría técnica, optimización de retención y clonación de estructuras virales para videos cortos (TikTok, Reels, Shorts y YouTube 16:9).**

---

## 🌟 Características Principales

### 1. Auditoría Técnica de Video con IA (Gemini 2.5)
- **Detección Automática de Tipo de Video:** Diferencia de inmediato entre **Video Editado** (optimización, retención y fallas) y **Video Crudo / Sin Editar** (guía de edición, plan de cortes, hook visual y estilo de subtítulos).
- **Diagnóstico en Tiempo Real:** 
  - Alerta visual en los primeros **0-3 segundos** (Zona Crítica del Gancho).
  - Identificación del **Segundo Exacto de Fuga** con el motivo detallado de pérdida de retención.
  - Botón interactivo de salto directo: **"Ver Falla (0:XX)"**.
- **Calibración de Audio & Ritmo:**
  - Distingue pausas dramáticas y de suspenso esenciales (<0.8s) vs. aire muerto y vacilaciones (>0.8s).
  - Solo sugiere cortes cuando existe pérdida real de dinamismo.

### 2. Visor de Zona Segura 100% Despejado (Safe Zone Grid)
- **Vistas Específicas por Plataforma:**
  - 📱 **TikTok (9:16):** Muestra el margen seguro libre de botones de interacción (Like, Comentarios, Compartir) y descripción inferior.
  - 📸 **Instagram Reels (9:16):** Ajusta las áreas críticas para visualización óptima.
  - 🔴 **YouTube Shorts (9:16):** Simula el feed vertical.
  - 📺 **YouTube Horizontal (16:9):** Zona segura para títulos y subtítulos con respecto a la barra de reproducción.
- **Visualización Limpia:** Controles externos situados debajo del reproductor para no tapar ni obstruir ninguna parte del video o sus textos.

### 3. Sistema de Exportación Unificada & Cierre de Marca (Outro 60 FPS)
- **Descarga en 1 Solo Archivo:** Concatena automáticamente el video del usuario con la animación oficial de marca en un único archivo de video `.mp4` o `.webm`.
- **Formatos Disponibles:**
  - 📱 **Vertical 9:16 (1080×1920 MP4)** para TikTok, Reels y Shorts.
  - 📺 **Horizontal 16:9 (1920×1080 MP4)** para YouTube y escritorio.
  - ⚡ **Calidad Original** para resolución nativa.
  - 🎵 **Pista de Audio MP3** para extraer la voz o música.
- **Diseño Sonoro Cinemático Sintetizado (3.5s):**
  - Barrido de entrada (*riser whoosh* de 0 a 0.8s).
  - Impacto de sub-graves (*deep sub-bass boom* a 35Hz).
  - Acorde armónico ambiental (*C Major 9 pad*).
  - Campanas de brillo cristalino (*sparkle shimmer*).
- **Marca Oficial:** Animación dinámica y tipografía con el dominio `clipiq.pages.dev`.

### 4. Asistente IA Estratégico con Soporte Markdown
- **Chat Interactivo:** Responde dudas sobre ganchos, cadencia de voz, B-roll, música recomendada (BPM) y trucos para retener audiencia.
- **Formato Enriquecido:** Renderizado completo de negritas, listas ordenadas, viñetas y bloques de código con `react-markdown`.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React.
- **Audio & Render:** Web Audio API (Síntesis de sonido en tiempo real), HTML5 Canvas 2D (60 FPS), MediaRecorder API.
- **Backend:** Express.js, `@google/genai` (Gemini 2.5 Flash / Flash Lite).
- **Empaquetador & Servidor:** Vite, `tsx`, `esbuild`.

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ instalado.
- Llave de API de Gemini (`GEMINI_API_KEY`) configurada en las variables de entorno.

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
GEMINI_API_KEY=tu_api_key_de_gemini
```

### 3. Modo de Desarrollo
```bash
npm run dev
```
La aplicación iniciará en `http://localhost:3000`.

### 4. Compilación para Producción
```bash
npm run build
npm start
```

---

## ☁️ Despliegue en Cloudflare Pages

Esta aplicación está 100% optimizada para desplegarse en **Cloudflare Pages** sin errores de pantalla en blanco:

### Parámetros de Configuración en Cloudflare Dashboard:
- **Framework preset:** `Vite` (o `None`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js Version:** `18` o superior (en variables de entorno: `NODE_VERSION=18`)

### Protecciones Implementadas contra Pantalla en Blanco:
1. **Regla SPA `_redirects`:** Incluida en `/public/_redirects` (`/* /index.html 200`) para que cualquier recarga o ruta interna no cause un error 404.
2. **Defensa contra `process is not defined`:** Reemplazado por `import.meta.env.PROD` y shim seguro en `vite.config.ts`.
3. **Modo Híbrido con Fallback Automático:** Si el backend Express no está activo en Cloudflare Pages, la interfaz entra instantáneamente en modo cliente con análisis contextual sin romperse ni colgarse.

---

## 📂 Estructura del Proyecto

```
├── server.ts                     # Servidor Express y endpoints de auditoría con Gemini
├── src/
│   ├── App.tsx                   # Componente principal y gestor de estado
│   ├── components/
│   │   ├── VideoPlayerWithSafeZone.tsx # Reproductor con zonas seguras sin obstáculos
│   │   ├── MetricCards.tsx       # Métricas de retención, gancho y fallas
│   │   ├── OutroPlayer.tsx       # Reproductor interactivo del cierre de marca
│   │   ├── DownloadModal.tsx     # Modal de exportación unificada multiformato
│   │   └── AIAssistantChat.tsx   # Asistente con renderizado Markdown
│   ├── utils/
│   │   └── outroGenerator.ts     # Generador Canvas 60 FPS, Web Audio y MediaRecorder
│   └── types.ts                  # Tipos TypeScript del análisis y modelos
├── metadata.json                 # Metadatos del applet
└── README.md                     # Documentación del proyecto
```

---

## 📄 Licencia

Desarrollado para la Creator Economy con **ClipIQ Intelligence**. Todos los derechos reservados.
