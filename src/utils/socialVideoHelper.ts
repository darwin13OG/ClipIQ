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
function inferNiche(title: string, defaultNiche?: string): string {
  if (defaultNiche && defaultNiche.trim()) return defaultNiche;
  const t = (title || '').toLowerCase();
  if (t.includes('receta') || t.includes('cocina') || t.includes('chef') || t.includes('comida') || t.includes('food')) {
    return 'Gastronomía & Cocina';
  }
  if (t.includes('gym') || t.includes('fitness') || t.includes('rutina') || t.includes('entrenamiento') || t.includes('dieta')) {
    return 'Fitness & Salud';
  }
  if (t.includes('dinero') || t.includes('finanza') || t.includes('inversion') || t.includes('negocio') || t.includes('crypto')) {
    return 'Finanzas & Negocios';
  }
  if (t.includes('game') || t.includes('gaming') || t.includes('play') || t.includes('gameplay') || t.includes('stream')) {
    return 'Gaming & Entretenimiento';
  }
  if (t.includes('musica') || t.includes('song') || t.includes('cover') || t.includes('beat') || t.includes('guitar')) {
    return 'Música & Audio';
  }
  if (t.includes('curso') || t.includes('aprende') || t.includes('tutorial') || t.includes('como hacer') || t.includes('guia')) {
    return 'Educación & Tutoriales';
  }
  if (t.includes('humor') || t.includes('comedia') || t.includes('broma') || t.includes('meme') || t.includes('chiste')) {
    return 'Humor & Entretenimiento';
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
      score_global: isLandscape ? 82 : 88,
      potencial_viral: 'Alto',
      hook_score: isLandscape ? 81 : 89,
      retencion_score: isLandscape ? 80 : 85,
    },
    auditoria_tecnica: {
      ritmo_cortes: isLandscape ? 'Lento' : 'Óptimo',
      balance_audio: 'Excelente',
      legibilidad_texto: 'Buena',
      fuga_audiencia_estimada: {
        segundo: isLandscape ? '00:15' : '00:04',
        motivo: `Transición tras el gancho inicial de "${cleanTitle.slice(0, 30)}". Requiere cambio de ángulo o elemento de estímulo visual.`,
      },
    },
    puntos_clave_mejora: [
      `Optimizar el gancho visual y verbal de los primeros 3s para el algoritmo de ${platformName}.`,
      isLandscape
        ? 'Añadir dinamismo y B-rolls cada 6 segundos para sostener el tiempo medio de visualización.'
        : `Respetar la zona segura vertical de ${platformName} (evitar texto debajo de iconos laterales y descripción).`,
      'Reforzar el llamado a la acción invitando a interactuar con una palabra clave en comentarios.',
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
          accion_camara: 'Corte frontal rápido con zoom sutil hacia los ojos mirando fijamente al lente.',
          texto_pantalla: `EL SECRETO VIRAL: ${cleanTitle.slice(0, 26).toUpperCase()}`,
          audio_voz: 'Si estás creando contenido en este nicho, mira este truco antes de que sea tarde.',
        },
        cuerpo_3_15s: [
          'Paso 1 (03-06s): El fallo recurrente que comete la mayoría en redes.',
          'Paso 2 (07-10s): La corrección inmediata para aumentar la retención.',
          'Paso 3 (11-14s): El resultado tangible demostrado en pantalla.',
        ],
        cta_final: {
          texto_o_voz: `Comenta "ESTRATEGIA" y te envío el desglose exacto para triunfar en ${platformName}.`,
        },
      },
      publicacion_recomendada: {
        titulo_viral: `${cleanTitle} (Fórmula Viral para ${platformName})`,
        descripcion_seo: `Estrategia y análisis de retención de "${cleanTitle}". Diseñado para potenciar el alcance orgánico en ${platformName}.\n\n⚡ Analizado con ClipIQ (clipiq.pages.dev)\n📌 Guarda este video para tus próximas grabaciones.`,
        hashtags: [`#${nicho.replace(/\s+/g, '')}`, `#${platformName.replace(/\s+/g, '')}`, '#ViralTips', '#ContentCreator', '#ClipIQ'],
        es_horizontal_o_youtube: isLandscape,
        prompt_miniatura_ia: `Hyper-viral thumbnail photography for "${cleanTitle}", cinematic lighting, creator looking surprised, high contrast vivid colors, --ar ${isLandscape ? '16:9' : '9:16'}`,
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
    sugerencias_chat_interactivo: [
      `¿Cómo adapto este video al formato ideal de ${platformName}?`,
      `¿Cuáles son 3 ganchos alternativos de alta conversión para "${cleanTitle.slice(0, 24)}"?`,
      `¿Qué horarios y hashtags funcionan mejor para ${nicho}?`,
    ],
  };
}
