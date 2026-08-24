import { ClipIQAnalysisResult, SampleVideoItem } from '../types';

export const SAMPLE_VIDEOS: SampleVideoItem[] = [
  {
    id: 'viral-ecommerce',
    title: 'Hook Viral de E-commerce & Gadgets',
    subtitle: 'TikTok Reel vertical (9:16) con subtítulos dinámicos y corte rápido',
    tag: 'TikTok (9:16)',
    type: 'EDITADO',
    aspectRatio: '9:16',
    source: 'URL_SOCIAL',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@clipiq_creator/video/7391823901238912',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41532-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80',
    durationText: '00:28',
    nicho: 'E-commerce & Tech',
    hasWatermark: true,
  },
  {
    id: 'youtube-horizontal',
    title: 'Review Tecnológico & Setup (Formato Largo 16:9)',
    subtitle: 'Video horizontal para YouTube con tomas cinemáticas y narrativa',
    tag: 'YouTube (16:9 Largo)',
    type: 'EDITADO',
    aspectRatio: '16:9',
    source: 'URL_SOCIAL',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=sample169clipiq',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-41551-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    durationText: '01:15',
    nicho: 'Tecnología & Programación',
    hasWatermark: false,
  },
  {
    id: 'raw-vlog',
    title: 'Toma Única Cruda (Vlog Fitness 9:16)',
    subtitle: 'Grabación vertical directa de cámara con silencios al inicio',
    tag: 'Crudo / 9:16',
    type: 'CRUDO',
    aspectRatio: '9:16',
    source: 'GALERIA_LOCAL',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-training-at-the-gym-42407-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    durationText: '00:45',
    nicho: 'Fitness & Salud',
    hasWatermark: false,
  },
  {
    id: 'finance-reels',
    title: 'Consejo Financiero con Gancho Visual',
    subtitle: 'Instagram Reel (9:16) de finanzas personales y ahorro',
    tag: 'IG Reels (9:16)',
    type: 'EDITADO',
    aspectRatio: '9:16',
    source: 'URL_SOCIAL',
    platform: 'instagram',
    url: 'https://www.instagram.com/reels/C8q91_vK7Lp/',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-financial-graphs-and-charts-on-a-tablet-41221-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80',
    durationText: '00:32',
    nicho: 'Finanzas Personales',
    hasWatermark: false,
  }
];

export const MOCK_ANALYSES: Record<string, ClipIQAnalysisResult> = {
  'viral-ecommerce': {
    meta_app: {
      app_name: 'ClipIQ',
      domain: 'clipiq.pages.dev',
      version: '2.0-enterprise',
    },
    diagnostico_inicial: {
      fuente_detectada: 'URL_SOCIAL',
      estado_video: 'EDITADO',
      contiene_marca_de_agua: true,
      tiene_audio_voz: true,
      nicho_detectado: 'E-commerce & Tech',
    },
    scores: {
      score_global: 84,
      potencial_viral: 'Alto',
      hook_score: 91,
      retencion_score: 78,
    },
    auditoria_tecnica: {
      ritmo_cortes: 'Óptimo',
      balance_audio: 'Excelente',
      legibilidad_texto: 'Mala zona segura',
      fuga_audiencia_estimada: {
        segundo: '00:07',
        motivo: 'El texto inferior queda tapado por la descripción y botones de TikTok en dispositivos móviles estándar.',
      },
    },
    puntos_clave_mejora: [
      'Sube los subtítulos 120px para no colisionar con la interfaz nativa de TikTok e Instagram.',
      'Elimina la marca de agua antes de republicar en YouTube Shorts o Instagram Reels para no ser penalizado por el algoritmo.',
      'Añade un Sound Effect (SFX "Whoosh" o "Pop") en el segundo 00:03 para reforzar el corte al primer beneficio.',
    ],
    modulo_guia_crudo: {
      aplicable: false,
      corta_en_segundos: [],
      hook_sugerido_texto: '',
      hook_sugerido_voz: '',
      estilo_subtitulos: '',
      musica_recomendada: '',
    },
    modulo_replicar_video: {
      aplicable: true,
      esqueleto_viral: {
        gancho_0_3s: {
          accion_camara: 'Sostén el producto frente al lente y retíralo bruscamente revelando tu expresión de sorpresa.',
          texto_pantalla: '3 Razones por las que este gadget destruyó a mi competencia',
          audio_voz: 'Si vendes en internet y no estás usando esto, estás perdiendo el 40% de tus ventas.',
        },
        cuerpo_3_15s: [
          'Paso 1 (03-07s): Muestra la característica más visual y sorprendente en primer plano.',
          'Paso 2 (08-11s): Demuestra el dolor común que elimina en sólo 3 segundos de uso real.',
          'Paso 3 (12-15s): Enseña la comparativa rápida "Antes vs. Después" con pantalla dividida.',
        ],
        cta_final: {
          texto_o_voz: 'Escribe "GADGET" en los comentarios y te envío el enlace directo con 20% de descuento.',
        },
      },
      publicacion_recomendada: {
        titulo_viral: 'Probé el Gadget Más Viral de TikTok por 7 Días (¿Real o Estafa?) 🤯',
        descripcion_seo: `Puse a prueba este gadget que está en todas partes. En este video te muestro los resultados reales sin filtros y si realmente vale la pena tu dinero.\n\n⚡ Analizado con ClipIQ (clipiq.pages.dev)\n👇 Comenta GADGET para mandarte el link oficial con descuento.\n\n#TechGadgets #ViralTikTok #UnboxingReview #TechHacks #ClipIQ`,
        hashtags: ['#TechGadgets', '#ViralTikTok', '#UnboxingReview', '#TechHacks', '#ClipIQ', '#ComprasOnline'],
        es_horizontal_o_youtube: false,
        prompt_miniatura_ia: `Hyper-viral YouTube Shorts & Reel cover photo, shocking face expression holding a glowing neon futuristic tech gadget in hands, dramatic purple and cyan studio lighting, clean background with high contrast, 8k resolution, photorealistic, sharp focus, --ar 9:16 --v 6.0`,
      },
    },
    opciones_exportacion_v2: {
      recomienda_limpiar_marca_agua: true,
      configuracion_outro_clipiq: {
        agregar_outro: true,
        duracion_segundos: 2,
        texto_branding: 'Analizado con ClipIQ | clipiq.pages.dev',
      },
    },
    sugerencias_chat_interactivo: [
      '¿Qué 3 ganchos alternativos puedo usar para vender en nicho femenino?',
      '¿Cómo adapto este guion para un video de 15 segundos exactos?',
      '¿Qué canciones en tendencia de TikTok combinan con este ritmo rápido?',
    ],
  },
  'youtube-horizontal': {
    meta_app: {
      app_name: 'ClipIQ',
      domain: 'clipiq.pages.dev',
      version: '2.0-enterprise',
    },
    diagnostico_inicial: {
      fuente_detectada: 'URL_SOCIAL',
      estado_video: 'EDITADO',
      contiene_marca_de_agua: false,
      tiene_audio_voz: true,
      nicho_detectado: 'Tecnología & Desarrollo',
      formato_video: '16:9',
    },
    scores: {
      score_global: 88,
      potencial_viral: 'Alto',
      hook_score: 94,
      retencion_score: 85,
    },
    auditoria_tecnica: {
      ritmo_cortes: 'Óptimo',
      balance_audio: 'Excelente',
      legibilidad_texto: 'Buena',
      fuga_audiencia_estimada: {
        segundo: '00:18',
        motivo: 'Transición estática a pantalla de código sin b-roll ni movimiento durante más de 6 segundos.',
      },
    },
    puntos_clave_mejora: [
      'Inserta planos secundarios (B-roll dinámico) cada 4-5 segundos en formato largo para evitar monotonía visual.',
      'Añade marcadores de capítulos en la descripción de YouTube para mejorar el CTR de búsqueda.',
      'Mantén los tercios superiores para gráficos clave y evita la barra inferior de reproducción de YouTube.',
    ],
    modulo_guia_crudo: {
      aplicable: false,
      corta_en_segundos: [],
      hook_sugerido_texto: '',
      hook_sugerido_voz: '',
      estilo_subtitulos: '',
      musica_recomendada: '',
    },
    modulo_replicar_video: {
      aplicable: true,
      esqueleto_viral: {
        gancho_0_3s: {
          accion_camara: 'Plano abierto cinemático con acercamiento rápido a la pantalla del setup.',
          texto_pantalla: 'LA HERRAMIENTA QUE CAMBIÓ MI FLUJO DE TRABAJO (100% GRATIS)',
          audio_voz: 'Si eres creador o desarrollador, esta herramienta te ahorrará 10 horas cada semana.',
        },
        cuerpo_3_15s: [
          'Paso 1 (03-08s): Demostración en vivo del problema vs. la solución en pantalla completa.',
          'Paso 2 (08-14s): Explicación técnica de la configuración en 3 pasos lógicos.',
          'Paso 3 (14-20s): Prueba de rendimiento con métricas de tiempo ahorrado.',
        ],
        cta_final: {
          texto_o_voz: 'Suscríbete para más análisis profundos de herramientas y deja tu opinión en los comentarios.',
        },
      },
      publicacion_recomendada: {
        titulo_viral: 'Esta Herramienta GRATUITA Debería Ser Ilegal (Mi Setup 2026 Revelado) ⚡',
        descripcion_seo: `Analizamos a fondo la herramienta que está acelerando el flujo de trabajo de miles de desarrolladores y creadores. Todo lo que necesitas saber antes de instalarla.\n\n⏱️ TIMESTAMPS:\n00:00 - El Gran Problema\n01:15 - Demostración en Vivo\n04:30 - Configuración Recomendada\n08:10 - Veredicto Final\n\n📌 Suscríbete y activa la campanita para más análisis de tecnología.\n🌐 Analizado con ClipIQ (clipiq.pages.dev)\n\n#SetupTech #Productividad #DesarrolloWeb #SoftwareTools #ClipIQ`,
        hashtags: ['#SetupTech', '#Productividad', '#DesarrolloWeb', '#SoftwareTools', '#Programacion', '#ClipIQ'],
        es_horizontal_o_youtube: true,
        prompt_miniatura_ia: `Viral high-CTR YouTube video thumbnail, cinematic portrait photography of a tech creator looking shocked and amazed at a glowing neon holographic coding monitor, dramatic volumetric purple and teal rim lighting, shallow depth of field, high contrast, clean negative space on the right for bold text overlay, 8k resolution, Unreal Engine 5 aesthetic, photorealistic, --ar 16:9 --v 6.0`,
      },
    },
    opciones_exportacion_v2: {
      recomienda_limpiar_marca_agua: false,
      configuracion_outro_clipiq: {
        agregar_outro: true,
        duracion_segundos: 3,
        texto_branding: 'Analizado con ClipIQ Widescreen | clipiq.pages.dev',
      },
    },
    sugerencias_chat_interactivo: [
      '¿Qué estructura de capítulos recomiendas para este video de 10 minutos?',
      '¿Cómo diseño una miniatura con alto CTR para este tema?',
      '¿Qué ganchos narrativos funcionan mejor para retener en los primeros 30 segundos en YouTube?',
    ],
  },
  'raw-vlog': {
    meta_app: {
      app_name: 'ClipIQ',
      domain: 'clipiq.pages.dev',
      version: '2.0-enterprise',
    },
    diagnostico_inicial: {
      fuente_detectada: 'GALERIA_LOCAL',
      estado_video: 'CRUDO',
      contiene_marca_de_agua: false,
      tiene_audio_voz: true,
      nicho_detectado: 'Fitness & Salud',
    },
    scores: {
      score_global: 48,
      potencial_viral: 'Bajo',
      hook_score: 35,
      retencion_score: 42,
    },
    auditoria_tecnica: {
      ritmo_cortes: 'Lento',
      balance_audio: 'Voz poco clara',
      legibilidad_texto: 'Sin texto',
      fuga_audiencia_estimada: {
        segundo: '00:03',
        motivo: 'Pausa prolongada de 2.2 segundos sin hablar ni movimiento al acomodar la cámara.',
      },
    },
    puntos_clave_mejora: [
      'Corta inmediatamente el inicio: arranca hablando en el segundo 00:00 sin segundos muertos.',
      'Aplica zoom digital 1.15x en momentos clave para simular multicámara y mantener dinamismo.',
      'Inserta subtítulos automáticos resaltados en amarillo (#FFE600) para captar usuarios en silencio.',
    ],
    modulo_guia_crudo: {
      aplicable: true,
      corta_en_segundos: ['00:00-00:02', '00:09-00:11', '00:24-00:27'],
      hook_sugerido_texto: 'NO HAGAS ESTE EJERCICIO ASÍ ❌ (Destruye tus hombros)',
      hook_sugerido_voz: 'Si haces press de hombros de esta manera, te vas a lesionar esta misma semana.',
      estilo_subtitulos: 'Fuente Impact / Bold Sans, color Blanco con stroke negro, resaltado Amarillo en palabras de poder, animación palabra por palabra (Karaoke pop).',
      musica_recomendada: 'Phonk Energético o Trap Instrumental moderno (128-135 BPM) a -18dB de volumen.',
    },
    modulo_replicar_video: {
      aplicable: true,
      esqueleto_viral: {
        gancho_0_3s: {
          accion_camara: 'Apunta a la articulación con gesto de stop y cara seria.',
          texto_pantalla: 'EL ERROR N°1 EN EL GIMNASIO ⚠️',
          audio_voz: 'Deja de hacer esto si quieres que tus músculos crezcan de verdad.',
        },
        cuerpo_3_15s: [
          'Paso 1 (03-06s): Muestra la técnica errónea con icono de cruz roja grande.',
          'Paso 2 (07-11s): Corrige la postura en cámara lenta con flechas verdes animadas.',
          'Paso 3 (12-15s): Explica el beneficio biomecánico en 1 frase ultra directa.',
        ],
        cta_final: {
          texto_o_voz: 'Guarda este video para tu próximo entrenamiento de empuje.',
        },
      },
      publicacion_recomendada: {
        titulo_viral: 'DEJA de Hacer Press Militar Así ❌ (El Error que Destruye tus Hombros)',
        descripcion_seo: `¿Sientes molestias en el hombro al entrenar? Es probable que estés cometiendo este fallo biomecánico. Mira la corrección de postura en 3 pasos rápidos.\n\n💪 Guarda este video y pruébalo en tu próxima rutina.\n🌐 Estructura optimizada con ClipIQ (clipiq.pages.dev)\n\n#FitnessTips #GymHacks #EntrenamientoInteligente #SaludArticular #ClipIQ`,
        hashtags: ['#FitnessTips', '#GymHacks', '#EntrenamientoInteligente', '#SaludArticular', '#Bodybuilding', '#ClipIQ'],
        es_horizontal_o_youtube: false,
        prompt_miniatura_ia: `Viral fitness Reel & Shorts thumbnail, dynamic athletic fitness trainer with an intense instructional expression pointing to shoulder joint with glowing neon red 'X' warning icon, dark moody gym atmosphere with violet backlighting, cinematic high contrast, ultra sharp 8k photography, --ar 9:16 --v 6.0`,
      },
    },
    opciones_exportacion_v2: {
      recomienda_limpiar_marca_agua: false,
      configuracion_outro_clipiq: {
        agregar_outro: true,
        duracion_segundos: 2,
        texto_branding: 'Analizado con ClipIQ | clipiq.pages.dev',
      },
    },
    sugerencias_chat_interactivo: [
      '¿Qué título viral me recomiendas para este video en YouTube Shorts?',
      '¿Puedes escribir la voz en off exacta para los primeros 10 segundos?',
      '¿Cómo recorto los silencios usando CapCut o Premiere en 1 click?',
    ],
  },
};
