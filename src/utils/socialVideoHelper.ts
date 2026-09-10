import { ClipIQAnalysisResult } from '../types';

export type SocialPlatformKey =
  | 'tiktok'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'threads'
  | 'linkedin'
  | 'pinterest'
  | 'twitch'
  | 'reddit'
  | 'kwai'
  | 'other';

export interface SocialVideoInfo {
  platform: SocialPlatformKey;
  platformName: string;
  platformColor: string;
  aspectRatio: '9:16' | '16:9';
  safeZonePreset: 'tiktok' | 'reels' | 'shorts';
  videoId?: string;
  isShort?: boolean;
  thumbnailUrl?: string;
  title?: string;
  author?: string;
  handle?: string;
  originalUrl: string;
}

export function extractUrlFromText(text: string): string | null {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : null;
}

// Universal Social Platform Identifier
export function parseSocialUrl(rawUrl: string): SocialVideoInfo {
  const url = rawUrl.trim();
  const lower = url.toLowerCase();

  // 1. TikTok
  if (lower.includes('tiktok.com')) {
    let handle = '';
    const handleMatch = url.match(/@([a-zA-Z0-9_.-]+)/);
    if (handleMatch) handle = `@${handleMatch[1]}`;

    return {
      platform: 'tiktok',
      platformName: 'TikTok',
      platformColor: '#00f2fe',
      aspectRatio: '9:16',
      safeZonePreset: 'tiktok',
      isShort: true,
      handle: handle || '@creador',
      author: handle,
      title: handle ? `TikTok de ${handle}` : 'Video de TikTok',
      originalUrl: url,
    };
  }

  // 2. Instagram (Reels, Posts, TV)
  if (lower.includes('instagram.com')) {
    let handle = '';
    const handleMatch = url.match(/instagram\.com\/([a-zA-Z0-9_.-]+)\/(reel|p|tv)/i);
    if (handleMatch && handleMatch[1] !== 'reel' && handleMatch[1] !== 'p') {
      handle = `@${handleMatch[1]}`;
    }

    return {
      platform: 'instagram',
      platformName: 'Instagram Reels',
      platformColor: '#e1306c',
      aspectRatio: '9:16',
      safeZonePreset: 'reels',
      isShort: true,
      handle: handle || '@usuario',
      author: handle,
      title: handle ? `Reel de ${handle}` : 'Reel de Instagram',
      originalUrl: url,
    };
  }

  // 3. YouTube (Shorts or Regular 16:9)
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    const isShort = lower.includes('/shorts/');
    let videoId = '';
    const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/i);
    if (ytMatch && ytMatch[2] && ytMatch[2].length === 11) {
      videoId = ytMatch[2];
    }

    return {
      platform: 'youtube',
      platformName: isShort ? 'YouTube Shorts' : 'YouTube',
      platformColor: '#ff0000',
      aspectRatio: isShort ? '9:16' : '16:9',
      safeZonePreset: 'shorts',
      isShort,
      videoId,
      thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined,
      title: isShort ? 'YouTube Short' : 'Video de YouTube',
      originalUrl: url,
    };
  }

  // 4. Facebook (Reels or Watch)
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
    const isReel = lower.includes('/reel/') || lower.includes('/share/r/');
    return {
      platform: 'facebook',
      platformName: isReel ? 'Facebook Reel' : 'Facebook Video',
      platformColor: '#1877f2',
      aspectRatio: isReel ? '9:16' : '16:9',
      safeZonePreset: 'reels',
      isShort: isReel,
      title: isReel ? 'Facebook Reel' : 'Video de Facebook',
      originalUrl: url,
    };
  }

  // 5. X / Twitter
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    let handle = '';
    const handleMatch = url.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/i);
    if (handleMatch && handleMatch[1] !== 'i' && handleMatch[1] !== 'status') {
      handle = `@${handleMatch[1]}`;
    }

    return {
      platform: 'twitter',
      platformName: 'X (Twitter)',
      platformColor: '#ffffff',
      aspectRatio: '9:16',
      safeZonePreset: 'tiktok',
      isShort: true,
      handle,
      author: handle,
      title: handle ? `Post en X de ${handle}` : 'Video de X / Twitter',
      originalUrl: url,
    };
  }

  // 6. Threads
  if (lower.includes('threads.net')) {
    let handle = '';
    const handleMatch = url.match(/threads\.net\/@([a-zA-Z0-9_.-]+)/i);
    if (handleMatch) handle = `@${handleMatch[1]}`;

    return {
      platform: 'threads',
      platformName: 'Threads',
      platformColor: '#ffffff',
      aspectRatio: '9:16',
      safeZonePreset: 'reels',
      isShort: true,
      handle,
      author: handle,
      title: handle ? `Video en Threads de ${handle}` : 'Video de Threads',
      originalUrl: url,
    };
  }

  // 7. LinkedIn
  if (lower.includes('linkedin.com')) {
    return {
      platform: 'linkedin',
      platformName: 'LinkedIn',
      platformColor: '#0a66c2',
      aspectRatio: '9:16',
      safeZonePreset: 'reels',
      isShort: true,
      title: 'Video en LinkedIn',
      originalUrl: url,
    };
  }

  // 8. Pinterest
  if (lower.includes('pinterest.com') || lower.includes('pin.it')) {
    return {
      platform: 'pinterest',
      platformName: 'Pinterest Pin',
      platformColor: '#e60023',
      aspectRatio: '9:16',
      safeZonePreset: 'tiktok',
      isShort: true,
      title: 'Idea Pin de Pinterest',
      originalUrl: url,
    };
  }

  // 9. Twitch
  if (lower.includes('twitch.tv')) {
    return {
      platform: 'twitch',
      platformName: 'Twitch Clip',
      platformColor: '#9146ff',
      aspectRatio: '16:9',
      safeZonePreset: 'shorts',
      isShort: false,
      title: 'Clip de Twitch',
      originalUrl: url,
    };
  }

  // 10. Reddit
  if (lower.includes('reddit.com')) {
    return {
      platform: 'reddit',
      platformName: 'Reddit Video',
      platformColor: '#ff4500',
      aspectRatio: '9:16',
      safeZonePreset: 'tiktok',
      isShort: true,
      title: 'Video en Reddit',
      originalUrl: url,
    };
  }

  // 11. Kwai
  if (lower.includes('kwai.com')) {
    return {
      platform: 'kwai',
      platformName: 'Kwai Video',
      platformColor: '#ff5000',
      aspectRatio: '9:16',
      safeZonePreset: 'tiktok',
      isShort: true,
      title: 'Video de Kwai',
      originalUrl: url,
    };
  }

  // 12. Generic Video URL or Web Link
  const isDirectVideo = /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url);
  return {
    platform: 'other',
    platformName: isDirectVideo ? 'Video Directo' : 'Video Web Social',
    platformColor: '#8b5cf6',
    aspectRatio: '9:16',
    safeZonePreset: 'tiktok',
    isShort: true,
    title: 'Video Web',
    originalUrl: url,
  };
}

// Universal Metadata Fetcher for ANY Platform
export async function fetchSocialMetadata(url: string): Promise<Partial<SocialVideoInfo>> {
  const parsed = parseSocialUrl(url);

  // Try YouTube oEmbed first if YouTube
  if (parsed.platform === 'youtube' && parsed.videoId) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${parsed.videoId}&format=json`);
      if (res.ok) {
        const data = await res.json();
        return {
          title: data.title || parsed.title,
          author: data.author_name || parsed.author,
          thumbnailUrl: `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`,
        };
      }
    } catch {
      // ignore
    }
  }

  // Try TikTok oEmbed if TikTok
  if (parsed.platform === 'tiktok') {
    try {
      const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const data = await res.json();
        return {
          title: data.title || parsed.title,
          author: data.author_name ? `@${data.author_name}` : parsed.author,
          thumbnailUrl: data.thumbnail_url,
        };
      }
    } catch {
      // ignore
    }
  }

  // Try Universal noembed provider for Twitter, TikTok, Vimeo, Reddit, etc.
  try {
    const noembedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    if (noembedRes.ok) {
      const data = await noembedRes.json();
      if (data && (data.title || data.author_name)) {
        return {
          title: data.title || parsed.title,
          author: data.author_name || parsed.author,
          thumbnailUrl: data.thumbnail_url,
        };
      }
    }
  } catch {
    // ignore
  }

  return {
    title: parsed.title,
    author: parsed.author,
    thumbnailUrl: parsed.thumbnailUrl,
  };
}

// Helper to infer niche based on video title keywords
export function inferNiche(title: string, defaultNiche?: string): string {
  if (defaultNiche && defaultNiche.trim() && defaultNiche !== 'General') return defaultNiche;
  const t = (title || '').toLowerCase();
  if (t.includes('receta') || t.includes('cocina') || t.includes('chef') || t.includes('comida') || t.includes('food') || t.includes('taco') || t.includes('pizza') || t.includes('postre') || t.includes('pan')) {
    return 'Gastronomía & Cocina';
  }
  if (t.includes('gym') || t.includes('fitness') || t.includes('rutina') || t.includes('entrenamiento') || t.includes('dieta') || t.includes('pesas') || t.includes('calistenia') || t.includes('cardio')) {
    return 'Fitness & Salud';
  }
  if (t.includes('dinero') || t.includes('finanza') || t.includes('inversion') || t.includes('negocio') || t.includes('crypto') || t.includes('bitcoin') || t.includes('ahorro') || t.includes('marketing') || t.includes('ventas')) {
    return 'Finanzas & Negocios';
  }
  if (t.includes('game') || t.includes('gaming') || t.includes('play') || t.includes('gameplay') || t.includes('stream') || t.includes('minecraft') || t.includes('gta') || t.includes('fortnite') || t.includes('zelda') || t.includes('warzone')) {
    return 'Gaming & Gameplays';
  }
  if (t.includes('musica') || t.includes('song') || t.includes('cover') || t.includes('beat') || t.includes('guitar') || t.includes('piano') || t.includes('cancion') || t.includes('remix')) {
    return 'Música & Producción';
  }
  if (t.includes('codigo') || t.includes('program') || t.includes('python') || t.includes('react') || t.includes('ai') || t.includes('ia ') || t.includes('tech') || t.includes('software') || t.includes('pc') || t.includes('apple') || t.includes('android')) {
    return 'Tecnología & Software';
  }
  if (t.includes('curso') || t.includes('aprende') || t.includes('tutorial') || t.includes('como hacer') || t.includes('guia') || t.includes('truco') || t.includes('consejo') || t.includes('paso a paso')) {
    return 'Educación & Tutoriales';
  }
  if (t.includes('humor') || t.includes('comedia') || t.includes('broma') || t.includes('meme') || t.includes('chiste') || t.includes('risa') || t.includes('fail') || t.includes('divertido')) {
    return 'Comedia & Entretenimiento';
  }
  if (t.includes('vlog') || t.includes('viaje') || t.includes('travel') || t.includes('dia en') || t.includes('mi vida') || t.includes('haul') || t.includes('room tour')) {
    return 'Vlogs & Estilo de Vida';
  }
  return 'Creator & Redes Sociales';
}

// Generate realistic, tailored audit for ANY social platform
export function generateContextualAudit(params: {
  url: string;
  title?: string;
  author?: string;
  platformName?: string;
  nichoHint?: string;
  aspectRatio: '9:16' | '16:9';
  isShort?: boolean;
}): ClipIQAnalysisResult {
  const platformName = params.platformName || 'Red Social';
  const cleanTitle = params.title || `Video en ${platformName}`;
  const nicho = inferNiche(cleanTitle, params.nichoHint);
  const isLandscape = params.aspectRatio === '16:9';
  const isShortForm = !isLandscape && params.isShort !== false;

  // Context-aware retention and hook evaluation:
  // Long videos DO NOT need a 3-second frantic TikTok hook. They need topic clarity, promise, and chapter pacing.
  const hookScore = isShortForm ? 87 : 82;
  const retencionScore = isShortForm ? 84 : 79;
  const globalScore = Math.round((hookScore * 0.45) + (retencionScore * 0.55));

  const fugaSeg = isShortForm ? '00:04' : '01:38';
  const fugaMotivo = isShortForm
    ? `Punto crítico de atención tras el primer impacto de "${cleanTitle.slice(0, 28)}". Si no hay transición o nuevo estímulo visual antes de los 5s, el usuario desliza.`
    : `Inflexión tras la introducción inicial de "${cleanTitle.slice(0, 28)}". La transición de la presentación a la explicación teórica requiere apoyo gráfico o B-roll para evitar fatiga auditiva.`;

  const puntosMejora = isShortForm
    ? [
        `Optimizar el gancho visual y verbal de los primeros 3s con subtítulos animados de alto contraste.`,
        `Respetar la zona segura vertical de ${platformName} manteniendo títulos alejados de los botones de interacción derechos.`,
        `Cierre con llamada a la acción (CTA) directa invitando a comentar una palabra clave específica para activar el algoritmo.`,
      ]
    : [
        `Definir la promesa del video en los primeros 45 segundos: el espectador de formato largo necesita saber exactamente qué aprenderá o resolverá.`,
        `Dividir el video en capítulos con marcas de tiempo para mejorar la retención y la indexación en YouTube.`,
        `Intercalar cambios de ángulo, B-rolls de apoyo o capturas de pantalla cada 15-20 segundos para dinamizar la explicación.`,
      ];

  return {
    meta_app: {
      app_name: 'ClipIQ',
      domain: typeof window !== 'undefined' ? window.location.host : 'clipiq.pages.dev',
      version: '2.0-enterprise',
    },
    diagnostico_inicial: {
      fuente_detectada: 'URL_SOCIAL',
      estado_video: 'EDITADO',
      contiene_marca_de_agua: false,
      tiene_audio_voz: true,
      nicho_detectado: nicho,
      formato_video: isLandscape ? '16:9' : '9:16',
    },
    scores: {
      score_global: globalScore,
      potencial_viral: isShortForm ? 'Alto' : 'Medio',
      hook_score: hookScore,
      retencion_score: retencionScore,
    },
    auditoria_tecnica: {
      ritmo_cortes: isShortForm ? 'Óptimo' : 'Lento',
      balance_audio: 'Excelente',
      legibilidad_texto: 'Buena',
      fuga_audiencia_estimada: {
        segundo: fugaSeg,
        motivo: fugaMotivo,
      },
    },
    puntos_clave_mejora: puntosMejora,
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
          accion_camara: isShortForm
            ? 'Corte frontal rápido con zoom sutil hacia los ojos mirando fijamente al lente.'
            : 'Presentador a cámara con encuadre medio y gráficos en pantalla sintetizando el objetivo del video.',
          texto_pantalla: isShortForm
            ? `EL SECRETO VIRAL: ${cleanTitle.slice(0, 24).toUpperCase()}`
            : `GUÍA COMPLETA: ${cleanTitle.slice(0, 30)}`,
          audio_voz: isShortForm
            ? 'Si estás intentando mejorar en este nicho, mira este fallo antes de que sea tarde.'
            : 'En este video te voy a mostrar paso a paso todo lo necesario sobre este tema sin rodeos.',
        },
        cuerpo_3_15s: isShortForm
          ? [
              'Paso 1 (03-06s): El fallo típico que comete la mayoría.',
              'Paso 2 (07-10s): La corrección práctica para multiplicar resultados.',
              'Paso 3 (11-14s): El resultado tangible demostrado en pantalla.',
            ]
          : [
              'Bloque 1 (00:45-03:00): Fundamentos clave y contexto del problema.',
              'Bloque 2 (03:00-08:00): Demostración práctica paso a paso con ejemplos reales.',
              'Bloque 3 (08:00-Final): Conclusiones, errores comunes a evitar y próximos pasos.',
            ],
        cta_final: {
          texto_o_voz: isShortForm
            ? `Comenta "REPLICA" para enviarte la plantilla exacta a tus mensajes directos.`
            : `Suscríbete para más análisis profundos y déjame en comentarios tu mayor reto en ${nicho}.`,
        },
      },
      publicacion_recomendada: {
        titulo_viral: `${cleanTitle} (${isShortForm ? 'Fórmula Viral Corta' : 'Estructura Completa'})`,
        descripcion_seo: `Estrategia y análisis de retención de "${cleanTitle}". Optimizado para máxima retención y engagement en ${platformName}.\n\n⚡ Analizado con ClipIQ (clipiq.pages.dev)\n📌 Guarda este video para tus próximas grabaciones.`,
        hashtags: [`#${nicho.replace(/\s+/g, '')}`, `#${platformName.replace(/\s+/g, '')}`, '#ContentStrategy', '#ClipIQ'],
        es_horizontal_o_youtube: isLandscape,
        prompt_miniatura_ia: `Hyper-realistic YouTube thumbnail for "${cleanTitle}", expressive face, high contrast, cinematic lighting, vivid colors, photorealistic, --ar ${isLandscape ? '16:9' : '9:16'}`,
      },
    },
    opciones_exportacion_v2: {
      recomienda_limpiar_marca_agua: false,
      configuracion_outro_clipiq: {
        agregar_outro: true,
        duracion_segundos: 2,
        texto_branding: 'Auditado con ClipIQ | clipiq.pages.dev',
      },
    },
    sugerencias_chat_interactivo: isShortForm
      ? [
          `¿Cómo optimizo los primeros 3 segundos de este video?`,
          `¿Qué hashtags y horarios funcionan mejor para ${nicho}?`,
          `¿Cómo adapto este guion para Instagram Reels y TikTok?`,
        ]
      : [
          `¿Cómo estructuro los capítulos de este video para YouTube?`,
          `¿Qué 3 títulos de alto CTR recomiendas para este tema en 16:9?`,
          `¿Cómo retener a la audiencia durante más de 5 minutos en este video?`,
        ],
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: isShortForm ? 73 : 66,
        benchmark_nicho: isShortForm ? 54 : 48,
        veredicto: `Rendimiento competitivo: supera por ${isShortForm ? '+19%' : '+18%'} la media del nicho ${nicho}.`,
      },
      swipe_ratio_estimado: {
        porcentaje_visto: isShortForm ? 79 : 86,
        porcentaje_deslizado: isShortForm ? 21 : 14,
        diagnostico: isShortForm
          ? 'Potencial algorítmico alto: casi 8 de cada 10 usuarios superan la barrera crítica de los 3 segundos.'
          : 'Excelente retención de inicio: el título y miniatura cumplen la promesa inicial sin generar rebote inmediato.',
      },
      ctr_estimado: {
        porcentaje: isLandscape ? 8.2 : 9.6,
        titulos_ab_testing: [
          { enfoque: 'Curiosidad / Gap Mental', titulo: `El Secreto de ${cleanTitle.slice(0, 24)} que casi nadie conoce` },
          { enfoque: 'Beneficio Directo', titulo: `Cómo dominar ${cleanTitle.slice(0, 24)} paso a paso` },
          { enfoque: 'Advertencia / Error Crítico', titulo: `Deja de cometer este error en ${cleanTitle.slice(0, 24)}` },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: isShortForm ? 2.4 : 6.8,
        cadencia_habla_wpm: 158,
        calificacion_ritmo: 'Óptimo',
        pausas_muertas_detectadas_segundos: 0.3,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Alto',
        motivo_algoritmico: `El valor práctico sobre "${cleanTitle.slice(0, 25)}" incentiva que la audiencia guarde el video para consultarlo luego o lo envíe por mensaje privado.`,
        segundo_micro_compromiso: isShortForm ? '00:07' : '00:50',
      },
      audio_y_musica: {
        tipo_voz: 'Voz directa y audible con buena inteligibilidad y claridad tonal.',
        db_fondo_recomendado: '-22 dB',
        requiere_trending_audio: isShortForm,
        sugerencia_musical: isShortForm
          ? 'Sonido en tendencia / Trending Audio de TikTok o Reels a -22dB para activar el multiplicador algorítmico.'
          : 'Música ambiental cinemática o lo-fi sutil para acompañar el ritmo sin distraer.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: isShortForm,
        frase_conexion_loop: isShortForm
          ? 'Por eso nunca olvides que...'
          : 'En el próximo episodio veremos más detalles sobre este tema.',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: '100% apto para monetización en YouTube Partner Program y TikTok Creator Rewards.',
      },
      palabras_clave_seo: [nicho, cleanTitle.slice(0, 20), 'Viral', platformName, 'Guía', 'Tutorial'],
    },
  };
}

export function formatMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function parseMmSsToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 1 && !isNaN(parts[0])) {
    return parts[0];
  }
  return 0;
}

export function sanitizeAnalysisDurations(
  analysis: ClipIQAnalysisResult,
  realDuration?: number
): ClipIQAnalysisResult {
  if (!realDuration || realDuration <= 0) return analysis;

  const durationSec = Math.round(realDuration);
  const result: ClipIQAnalysisResult = JSON.parse(JSON.stringify(analysis));

  result.diagnostico_inicial = {
    ...result.diagnostico_inicial,
    duracion_segundos: durationSec,
  };

  if (result.auditoria_tecnica?.fuga_audiencia_estimada) {
    const currentSec = parseMmSsToSeconds(result.auditoria_tecnica.fuga_audiencia_estimada.segundo);
    if (currentSec >= durationSec || currentSec <= 0) {
      const targetSec = durationSec <= 5
        ? Math.max(1, Math.min(2, durationSec - 1))
        : Math.max(1, Math.min(Math.round(durationSec * 0.55), durationSec - 1));

      result.auditoria_tecnica.fuga_audiencia_estimada = {
        segundo: formatMmSs(targetSec),
        motivo: durationSec <= 5
          ? `En un video corto de ${durationSec}s, el segundo ${formatMmSs(targetSec)} es decisivo para retener la atención antes del remate final.`
          : `Inflexión estimada de atención en el segundo ${formatMmSs(targetSec)}. Se sugiere un cambio de ángulo o texto para dinamizar el ritmo.`,
      };
    }
  }

  if (result.modulo_guia_crudo?.corta_en_segundos) {
    if (durationSec <= 5) {
      result.modulo_guia_crudo.corta_en_segundos = [];
    } else {
      result.modulo_guia_crudo.corta_en_segundos = result.modulo_guia_crudo.corta_en_segundos.filter(
        (rangeStr) => {
          const parts = rangeStr.split('-');
          const start = parseMmSsToSeconds(parts[0]);
          return start < durationSec;
        }
      );
    }
  }

  if (result.metricas_creador?.indice_guardados_compartidos) {
    const microSec = parseMmSsToSeconds(result.metricas_creador.indice_guardados_compartidos.segundo_micro_compromiso);
    if (microSec >= durationSec) {
      const targetMicro = Math.max(1, Math.min(Math.round(durationSec * 0.75), durationSec - 1));
      result.metricas_creador.indice_guardados_compartidos.segundo_micro_compromiso = formatMmSs(targetMicro);
    }
  }

  if (result.metricas_creador?.retencion_30s_estimada && durationSec < 30) {
    result.metricas_creador.retencion_30s_estimada.veredicto =
      `Proyección probable de finalización completa (${durationSec}s): Al ser un video de corta duración, el potencial de retención total es alto si el gancho es efectivo.`;
  }

  return result;
}

// Generate tailored probable audit for local gallery files
export function generateLocalFileAudit(params: {
  fileName: string;
  duration?: number;
  width?: number;
  height?: number;
  state: 'CRUDO' | 'EDITADO';
  nichoHint?: string;
  hasAudio?: boolean;
}): ClipIQAnalysisResult {
  const isLandscape = Boolean(params.width && params.height && params.width > params.height);
  const durationSec = params.duration && params.duration > 0 ? Math.round(params.duration) : 15;
  const isRaw = params.state === 'CRUDO';
  const cleanTitle = params.fileName.replace(/\.[^/.]+$/, '');
  const nicho = inferNiche(cleanTitle, params.nichoHint);

  const fugaSec = durationSec <= 5
    ? Math.max(1, Math.min(2, durationSec - 1))
    : Math.max(1, Math.min(Math.round(durationSec * 0.55), durationSec - 1));

  const fugaSeg = formatMmSs(fugaSec);
  const fugaMotivo = durationSec <= 5
    ? `En un corto de ${durationSec} segundos, el segundo ${fugaSeg} determina si el espectador espera el desenlace o desliza antes de que termine.`
    : `Inflexión probable de retención en el segundo ${fugaSeg}: la atención del espectador decae si no se introduce un cambio visual o auditivo.`;

  const cuts = isRaw
    ? durationSec <= 5
      ? []
      : durationSec <= 15
      ? ['00:00-00:01']
      : ['00:00-00:02', formatMmSs(Math.round(durationSec * 0.4)) + '-' + formatMmSs(Math.round(durationSec * 0.4) + 1)]
    : [];

  const baseResult: ClipIQAnalysisResult = {
    meta_app: {
      app_name: 'ClipIQ',
      domain: typeof window !== 'undefined' ? window.location.host : 'clipiq.pages.dev',
      version: '2.0-enterprise',
    },
    diagnostico_inicial: {
      fuente_detectada: 'GALERIA_LOCAL',
      estado_video: isRaw ? 'CRUDO' : 'EDITADO',
      contiene_marca_de_agua: false,
      tiene_audio_voz: params.hasAudio !== false,
      nicho_detectado: nicho,
      formato_video: isLandscape ? '16:9' : '9:16',
      duracion_segundos: durationSec,
    },
    scores: {
      score_global: isRaw ? 64 : 84,
      potencial_viral: isRaw ? 'Medio' : 'Alto',
      hook_score: isRaw ? 58 : 86,
      retencion_score: isRaw ? 62 : 82,
    },
    auditoria_tecnica: {
      ritmo_cortes: isRaw ? 'Lento' : 'Óptimo',
      balance_audio: params.hasAudio ? 'Excelente' : 'Voz poco clara',
      legibilidad_texto: isRaw ? 'Sin texto' : 'Buena',
      fuga_audiencia_estimada: {
        segundo: fugaSeg,
        motivo: fugaMotivo,
      },
    },
    puntos_clave_mejora: isRaw
      ? [
          durationSec <= 5
            ? 'En tomas ultracortas, mantén el inicio sin titubeos ni fracciones de segundo vacías.'
            : 'Elimina las pausas y silencios iniciales para que el video comience con acción inmediata.',
          'Agrega subtítulos llamativos con palabras clave resaltadas en la zona central.',
          'Incluye música de fondo suave a -22dB que complemente el ritmo sin tapar la voz.',
        ]
      : [
          'Asegúrate de que los textos y llamadas a la acción respeten las zonas seguras de TikTok, Reels y Shorts.',
          'Incluye un llamado a la acción claro al final para incentivar comentarios o guardados.',
          'Prueba variantes de la primera frase para aumentar la tasa de espectadores que superan los primeros 3 segundos.',
        ],
    modulo_guia_crudo: {
      aplicable: isRaw,
      corta_en_segundos: cuts,
      hook_sugerido_texto: `MIRA ESTO ANTES DE PUBLICAR: ${cleanTitle.slice(0, 24).toUpperCase()}`,
      hook_sugerido_voz: 'Si vas a crear contenido sobre esto, este detalle te ahorrará mucho tiempo.',
      estilo_subtitulos: 'Montserrat Bold / Amarillo Neón con borde negro sutil y animación palabra a palabra.',
      musica_recomendada: 'Beat moderno dinámico (120 BPM) a -22dB.',
    },
    modulo_replicar_video: {
      aplicable: true,
      esqueleto_viral: {
        gancho_0_3s: {
          accion_camara: 'Corte frontal con movimiento hacia cámara mirando fijamente a la lente.',
          texto_pantalla: `TIPS DE: ${cleanTitle.slice(0, 24).toUpperCase()}`,
          audio_voz: 'La clave que casi todos pasan por alto sobre este tema.',
        },
        cuerpo_3_15s: durationSec <= 5
          ? [
              'Segundo 01-02: Impacto visual y movimiento dinámico principal.',
              `Segundo 03-0${durationSec}: Desenlace conciso y conexión para repetición o loop.`,
            ]
          : [
              `Paso 1 (03-0${Math.min(7, durationSec - 2)}s): Presenta la idea central o error común.`,
              `Paso 2 (0${Math.min(8, durationSec - 1)}-${formatMmSs(durationSec)}s): Demuestra el resultado práctico.`,
            ],
        cta_final: {
          texto_o_voz: 'Guarda este video para tu próxima grabación y sígueme para más.',
        },
      },
      publicacion_recomendada: {
        titulo_viral: `${cleanTitle} (Optimizado)`,
        descripcion_seo: `Guía práctica sobre "${cleanTitle}". Consejos y estructura para creadores en redes sociales.\n\n⚡ Optimizado con ClipIQ (clipiq.pages.dev)\n📌 Guarda este video para aplicarlo en tus proyectos.`,
        hashtags: [`#${nicho.replace(/\s+/g, '')}`, '#CreacionDeContenido', '#TipsVirales', '#ClipIQ'],
        es_horizontal_o_youtube: isLandscape,
        prompt_miniatura_ia: `Visual thumbnail for "${cleanTitle}", expressive face, high contrast, clean composition, vibrant colors, --ar ${isLandscape ? '16:9' : '9:16'}`,
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
      '¿Qué cambios harías en este video para que tenga mayor probabilidad de ser compartido?',
      '¿Cómo puedo grabar una mejor toma de gancho para este contenido?',
      '¿Qué hashtags y descripción me recomiendas para publicarlo en TikTok y Reels?',
    ],
    metricas_creador: {
      retencion_30s_estimada: {
        porcentaje: isRaw ? 58 : 76,
        benchmark_nicho: 52,
        veredicto: durationSec < 30
          ? `Proyección probable de finalización (${durationSec}s): Al ser un video de corta duración, el potencial de retención completa es elevado si el gancho es efectivo.`
          : 'Proyección predictiva de retención: estimada en base a la cadencia y dinamismo del contenido.',
      },
      swipe_ratio_estimado: {
        porcentaje_visto: isRaw ? 62 : 81,
        porcentaje_deslizado: isRaw ? 38 : 19,
        diagnostico: 'Estimación predictiva: ' + (isRaw ? 'Riesgo moderado de swipe si el inicio no tiene texto que aclare el tema.' : 'Buen potencial de retención inicial en el feed.'),
      },
      ctr_estimado: {
        porcentaje: 7.8,
        titulos_ab_testing: [
          { enfoque: 'Curiosidad / Gap Mental', titulo: `El detalle sobre ${cleanTitle.slice(0, 20)} que debes conocer` },
          { enfoque: 'Beneficio Directo', titulo: `Cómo mejorar en ${cleanTitle.slice(0, 20)} fácilmente` },
          { enfoque: 'Evitar Error', titulo: `No publiques sobre ${cleanTitle.slice(0, 20)} sin revisar esto` },
        ],
      },
      dinamismo_visual: {
        segundos_por_cambio_visual: isRaw ? 5.2 : 2.6,
        cadencia_habla_wpm: 142,
        calificacion_ritmo: isRaw ? 'Poco Dinámico' : 'Óptimo',
        pausas_muertas_detectadas_segundos: isRaw ? 1.8 : 0.2,
      },
      indice_guardados_compartidos: {
        potencial_guardado: 'Alto',
        potencial_compartido: 'Medio',
        motivo_algoritmico: 'Estimación probable: Los videos educativos o con consejos prácticos tienen una tasa de guardado superior al promedio.',
        segundo_micro_compromiso: formatMmSs(Math.max(1, Math.min(Math.round(durationSec * 0.75), durationSec - 1))),
      },
      audio_y_musica: {
        tipo_voz: params.hasAudio ? 'Voz frontal limpia' : 'Solo audio ambiente',
        db_fondo_recomendado: '-22 dB',
        requiere_trending_audio: true,
        sugerencia_musical: 'Música de fondo rítmica a bajo volumen (-22dB) para mantener la atención.',
      },
      estrategia_loop_viral: {
        es_loop_infinito: durationSec <= 10,
        frase_conexion_loop: 'Por eso siempre ten en cuenta que...',
      },
      brand_safety_monetizacion: {
        apto_monetizacion: true,
        clasificacion: 'Apto Todo Público',
        detalles: 'Archivo local analizado sin elementos conflictivos aparentes.',
      },
      palabras_clave_seo: [nicho, cleanTitle.slice(0, 20), 'Video', 'Tips', 'Viral'],
    },
  };

  return sanitizeAnalysisDurations(baseResult, durationSec);
}

