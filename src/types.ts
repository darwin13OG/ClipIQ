export interface ClipIQAppMeta {
  app_name: string;
  domain: string;
  version: string;
}

export interface DiagnosticoInicial {
  fuente_detectada: 'URL_SOCIAL' | 'GALERIA_LOCAL';
  estado_video: 'EDITADO' | 'CRUDO';
  contiene_marca_de_agua: boolean;
  tiene_audio_voz: boolean;
  nicho_detectado: string;
  formato_video?: '9:16' | '16:9';
  duracion_segundos?: number;
}

export interface MetricScores {
  score_global: number;
  potencial_viral: 'Bajo' | 'Medio' | 'Alto' | 'Viral Garantizado';
  hook_score: number;
  retencion_score: number;
}

export interface FugaAudiencia {
  segundo: string;
  motivo: string;
}

export interface AuditoriaTecnica {
  ritmo_cortes: 'Lento' | 'Óptimo' | 'Frenético';
  balance_audio: 'Excelente' | 'Música muy alta' | 'Voz poco clara';
  legibilidad_texto: 'Buena' | 'Mala zona segura' | 'Sin texto';
  fuga_audiencia_estimada: FugaAudiencia;
}

export interface ModuloGuiaCrudo {
  aplicable: boolean;
  corta_en_segundos: string[];
  hook_sugerido_texto: string;
  hook_sugerido_voz: string;
  estilo_subtitulos: string;
  musica_recomendada: string;
}

export interface Gancho03s {
  accion_camara: string;
  texto_pantalla: string;
  audio_voz: string;
}

export interface EsqueletoViral {
  gancho_0_3s: Gancho03s;
  cuerpo_3_15s: string[];
  cta_final: {
    texto_o_voz: string;
  };
}

export interface RecomendacionPublicacion {
  titulo_viral: string;
  descripcion_seo: string;
  hashtags: string[];
  es_horizontal_o_youtube?: boolean;
  prompt_miniatura_ia?: string;
}

export interface ModuloReplicarVideo {
  aplicable: boolean;
  esqueleto_viral: EsqueletoViral;
  publicacion_recomendada?: RecomendacionPublicacion;
}

export interface ConfiguracionOutro {
  agregar_outro: boolean;
  duracion_segundos: number;
  texto_branding: string;
}

export interface OpcionesExportacionV2 {
  recomienda_limpiar_marca_agua: boolean;
  configuracion_outro_clipiq: ConfiguracionOutro;
}

export interface MetricasCreador {
  retencion_30s_estimada: {
    porcentaje: number;
    benchmark_nicho: number;
    veredicto: string;
  };
  swipe_ratio_estimado: {
    porcentaje_visto: number;
    porcentaje_deslizado: number;
    diagnostico: string;
  };
  ctr_estimado: {
    porcentaje: number;
    titulos_ab_testing: {
      enfoque: string;
      titulo: string;
    }[];
  };
  dinamismo_visual: {
    segundos_por_cambio_visual: number;
    cadencia_habla_wpm: number;
    calificacion_ritmo: 'Óptimo' | 'Poco Dinámico' | 'Saturado';
    pausas_muertas_detectadas_segundos: number;
  };
  indice_guardados_compartidos: {
    potencial_guardado: 'Alto' | 'Medio' | 'Bajo';
    potencial_compartido: 'Alto' | 'Medio' | 'Bajo';
    motivo_algoritmico: string;
    segundo_micro_compromiso: string;
  };
  audio_y_musica: {
    tipo_voz: string;
    db_fondo_recomendado: string;
    requiere_trending_audio: boolean;
    sugerencia_musical: string;
  };
  estrategia_loop_viral?: {
    es_loop_infinito: boolean;
    frase_conexion_loop: string;
  };
  brand_safety_monetizacion: {
    apto_monetizacion: boolean;
    clasificacion: 'Apto Todo Público' | 'Revisar Lenguaje' | 'Riesgo Música/Copyright';
    detalles: string;
  };
  palabras_clave_seo: string[];
}

export interface ClipIQAnalysisResult {
  meta_app: ClipIQAppMeta;
  diagnostico_inicial: DiagnosticoInicial;
  scores: MetricScores;
  auditoria_tecnica: AuditoriaTecnica;
  puntos_clave_mejora: string[];
  modulo_guia_crudo: ModuloGuiaCrudo;
  modulo_replicar_video: ModuloReplicarVideo;
  opciones_exportacion_v2: OpcionesExportacionV2;
  sugerencias_chat_interactivo: string[];
  metricas_creador?: MetricasCreador;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SampleVideoItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  type: 'CRUDO' | 'EDITADO';
  aspectRatio?: '9:16' | '16:9';
  source: 'URL_SOCIAL' | 'GALERIA_LOCAL';
  platform?: 'tiktok' | 'instagram' | 'youtube' | 'facebook';
  url?: string;
  videoSrc?: string;
  thumbnailUrl: string;
  durationText: string;
  nicho: string;
  hasWatermark?: boolean;
}
