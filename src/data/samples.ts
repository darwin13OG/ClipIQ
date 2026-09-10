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
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: 78,
        benchmark_nicho: 56,
        veredicto: 'Supera el benchmark por +22%: la promesa rápida y cortes visuales en los primeros 4s blindan la atención.',
      },
      swipe_ratio_estimado: {
        porcentaje_visto: 82,
        porcentaje_deslizado: 18,
        diagnostico: 'Excelente ratio de retención temprana: más del 80% supera los primeros 3 segundos sin deslizar.',
      },
      ctr_estimado: {
        porcentaje: 9.8,
        titulos_ab_testing: [
          { enfoque: 'Curiosidad / Gap Mental', titulo: 'Probé este gadget viral por 7 días y pasó esto...' },
          { enfoque: 'Beneficio Directo', titulo: 'El gadget que me ahorra 2 horas al día en e-commerce' },
          { enfoque: 'Advertencia / Error', titulo: 'No compres este gadget viral sin ver esto antes' },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: 1.9,
        cadencia_habla_wpm: 168,
        calificacion_ritmo: 'Óptimo',
        pausas_muertas_detectadas_segundos: 0.1,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Alto',
        motivo_algoritmico: 'El valor práctico del gadget incita a guardar el video para compras futuras o mandarlo a conocidos.',
        segundo_micro_compromiso: '00:07',
      },
      audio_y_musica: {
        tipo_voz: 'Voz energética y rápida con buena compresión y cero reverberación.',
        db_fondo_recomendado: '-22 dB',
        requiere_trending_audio: true,
        sugerencia_musical: 'Tech House / Phonk Viral a 128 BPM con SFX pop en cada corte.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: true,
        frase_conexion_loop: 'Y por eso el mayor secreto de todos es...',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: '100% apto para TikTok Creator Rewards y Reels monetizados.',
      },
      palabras_clave_seo: ['Gadgets', 'TikTokMadeMeBuyIt', 'E-commerce', 'Tech', 'ReviewViral'],
    },
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
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: 84,
        benchmark_nicho: 62,
        veredicto: 'Excelente retención de inicio: la claridad de propuesta técnica genera alta fidelidad en los primeros 60 segundos.',
      },
      swipe_ratio_estimado: {
        porcentaje_visto: 89,
        porcentaje_deslizado: 11,
        diagnostico: 'CTR y retención inicial sobresalientes para YouTube: el 89% no abandona tras la intro.',
      },
      ctr_estimado: {
        porcentaje: 8.6,
        titulos_ab_testing: [
          { enfoque: 'Curiosidad / Herramienta Secreta', titulo: 'Esta herramienta gratuita debería ser ilegal (Mi Setup)' },
          { enfoque: 'Productividad / Tiempo Ahorrado', titulo: 'Cómo ahorré 10 horas de trabajo a la semana con este flujo' },
          { enfoque: 'Comparativa Técnica', titulo: 'Dejé de usar software caro y me pasé a esto (Resultados reales)' },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: 5.4,
        cadencia_habla_wpm: 142,
        calificacion_ritmo: 'Óptimo',
        pausas_muertas_detectadas_segundos: 0.2,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Alto',
        motivo_algoritmico: 'Video tipo tutorial de referencia que desarrolladores guardan en listas de reproducción para consultar.',
        segundo_micro_compromiso: '01:15',
      },
      audio_y_musica: {
        tipo_voz: 'Voz tipo broadcast con micrófono condensador, ecualización nítida y rango dinámico controlado.',
        db_fondo_recomendado: '-24 dB',
        requiere_trending_audio: false,
        sugerencia_musical: 'Synthwave sutil / Lo-Fi Beats sin distracción vocal.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: false,
        frase_conexion_loop: 'En el próximo video analizaremos la segunda parte de esta arquitectura.',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: '100% apto para Google AdSense y patrocinadores de software.',
      },
      palabras_clave_seo: ['SetupTech', 'Productividad', 'DesarrolloWeb', 'SoftwareTools', 'Programacion'],
    },
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
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: 38,
        benchmark_nicho: 52,
        veredicto: 'Bajo rendimiento por pausas iniciales: el 62% desliza antes de los 5 segundos sin ver la corrección.',
      },
      swipe_ratio_estimado: {
        porcentaje_visto: 45,
        porcentaje_deslizado: 55,
        diagnostico: 'Fuga crítica inmediata: más de la mitad de los usuarios deslizan durante la pausa muda de 00:00 a 00:02.',
      },
      ctr_estimado: {
        porcentaje: 6.4,
        titulos_ab_testing: [
          { enfoque: 'Alerta Lesión / Dolor', titulo: 'Por qué te duelen los hombros al entrenar press' },
          { enfoque: 'Técnica Correcta', titulo: 'La técnica definitiva para hombros 3D sin dolor' },
          { enfoque: 'Error Común', titulo: 'El fallo de novato que todos cometen en el gimnasio' },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: 8.5,
        cadencia_habla_wpm: 110,
        calificacion_ritmo: 'Poco Dinámico',
        pausas_muertas_detectadas_segundos: 2.2,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Medio',
        motivo_algoritmico: 'El contenido educativo de fitness tiene alta tasa de guardado si se editan los silencios.',
        segundo_micro_compromiso: '00:12',
      },
      audio_y_musica: {
        tipo_voz: 'Voz cruda con eco de sala. Requiere reducción de ruido y ecualización vocal básica.',
        db_fondo_recomendado: '-18 dB',
        requiere_trending_audio: true,
        sugerencia_musical: 'Gym Phonk / Dark Electronic para subir la energía percibida.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: true,
        frase_conexion_loop: 'Así que la próxima vez que vayas a entrenar...',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: 'Contenido deportivo familiar apto para todas las plataformas.',
      },
      palabras_clave_seo: ['Fitness', 'GymHacks', 'PressMilitar', 'Hombros', 'TutorialGym'],
    },
  },
  'finance-reels': {
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
      nicho_detectado: 'Finanzas Personales',
      formato_video: '9:16',
    },
    scores: {
      score_global: 89,
      potencial_viral: 'Viral Garantizado',
      hook_score: 95,
      retencion_score: 86,
    },
    auditoria_tecnica: {
      ritmo_cortes: 'Óptimo',
      balance_audio: 'Excelente',
      legibilidad_texto: 'Buena',
      fuga_audiencia_estimada: {
        segundo: '00:09',
        motivo: 'Gráfico con letra pequeña durante 2 segundos; requiere simplificar números en pantalla.',
      },
    },
    puntos_clave_mejora: [
      'Aumenta el tamaño de los números del gráfico financiero un 25% para legibilidad móvil.',
      'Añade un subtítulo dinámico con color verde (#10B981) en la palabra clave de ahorro.',
      'Cierra con llamada a la acción pidiendo comentar "PRESUPUESTO" para automatizar el embudo.',
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
          accion_camara: 'Muestra un billete o tarjeta y señálalo con gesto de alerta.',
          texto_pantalla: 'LA REGLA 50/30/20 QUE TE HARÁ AHORRAR $10,000 💰',
          audio_voz: 'Si tienes menos de 35 años y no conoces esta regla de ahorro, estás perdiendo dinero.',
        },
        cuerpo_3_15s: [
          'Paso 1 (03-07s): Divide la pantalla en 3 bloques visuales de colores.',
          'Paso 2 (08-11s): Da el ejemplo numérico concreto con un sueldo promedio.',
          'Paso 3 (12-15s): Muestra la proyección a 1 año en una gráfica ascendente.',
        ],
        cta_final: {
          texto_o_voz: 'Comenta "PLANTILLA" para recibir la hoja de cálculo automática en tus mensajes.',
        },
      },
      publicacion_recomendada: {
        titulo_viral: 'El Hábito Financiero que Deberías Aprender Antes de los 30 📈',
        descripcion_seo: `Domina tus finanzas personales con la regla 50/30/20 explicada en 30 segundos. Deja de preguntarte a dónde se va tu sueldo cada mes.\n\n💬 Comenta "PLANTILLA" y te envío la calculadora automática.\n⚡ Analizado con ClipIQ (clipiq.pages.dev)\n\n#FinanzasPersonales #AhorroInteligente #Inversiones #EducacionFinanciera #ClipIQ`,
        hashtags: ['#FinanzasPersonales', '#AhorroInteligente', '#Inversiones', '#EducacionFinanciera', '#ClipIQ'],
        es_horizontal_o_youtube: false,
        prompt_miniatura_ia: `Viral finance Reel & Shorts cover photo, professional creator holding tablet with glowing ascending green neon financial charts, modern minimalist studio, ultra high contrast, photorealistic 8k, --ar 9:16 --v 6.0`,
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
      '¿Qué 3 ganchos alternativos puedo usar para finanzas e inversiones?',
      '¿Cómo diseño un embudo de comentarios "PLANTILLA" en Instagram?',
      '¿Qué música en tendencia de Reels encaja con finanzas y negocios?',
    ],
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: 82,
        benchmark_nicho: 58,
        veredicto: 'Retención de élite: +24% sobre la media de finanzas por la promesa de beneficio económico tangible.',
      },
      swipe_ratio_estimado: {
        porcentaje_visto: 86,
        porcentaje_deslizado: 14,
        diagnostico: 'Potencial de viralidad óptimo en Instagram Reels y TikTok: 86% de espectadores permanecen tras el segundo 3.',
      },
      ctr_estimado: {
        porcentaje: 10.4,
        titulos_ab_testing: [
          { enfoque: 'Beneficio Directo / Cifra', titulo: 'Cómo ahorrar $1,000 al mes con la regla 50/30/20' },
          { enfoque: 'Advertencia / Error Crítico', titulo: 'El error de dinero que cometes todos los meses sin saberlo' },
          { enfoque: 'Curiosidad / Fórmula Secreta', titulo: 'Lo que los bancos no quieren que hagas con tus ahorros' },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: 2.1,
        cadencia_habla_wpm: 162,
        calificacion_ritmo: 'Óptimo',
        pausas_muertas_detectadas_segundos: 0.1,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Alto',
        motivo_algoritmico: 'Las plantillas y reglas financieras tienen el ratio más alto de guardados orgánicos en Instagram.',
        segundo_micro_compromiso: '00:08',
      },
      audio_y_musica: {
        tipo_voz: 'Voz clara, pausada y asertiva que transmite confianza y profesionalismo.',
        db_fondo_recomendado: '-22 dB',
        requiere_trending_audio: true,
        sugerencia_musical: 'Ambiental corporativo o Lo-Fi inspiracional a -22dB.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: true,
        frase_conexion_loop: 'Y el primer paso para lograrlo es...',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: 'Nicho con el RPM más alto del mercado ($8-$15 por mil vistas en YouTube/Reels).',
      },
      palabras_clave_seo: ['Finanzas', 'Ahorro', 'Inversion', 'Presupuesto', 'EducacionFinanciera'],
    },
  },
};
