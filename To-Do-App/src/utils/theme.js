export const COLORS = {
  // Palette principale — dark slate con accenti arancio bruciato
  bg: '#0f172a',
  surface: '#1e293b',
  surfaceAlt: '#263348',
  border: '#334155',
  borderLight: '#475569',

  accent: '#f97316',       // arancio primario
  accentSoft: '#fed7aa',   // arancio tenue (testo sui completati)
  accentMuted: '#431407',  // arancio scurissimo (sfondo completati)

  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textStrike: '#475569',   // testo barrato per completati

  danger: '#ef4444',
  dangerSoft: '#fca5a5',
  dangerMuted: '#450a0a',

  success: '#22c55e',
  successMuted: '#052e16',

  white: '#ffffff',
};

export const FONTS = {
  // Usa le font di sistema ma con pesi specifici per identità forte
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  heavy: { fontWeight: '800' },
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FILTER_OPTIONS = [
  { key: 'all', label: 'Tutte' },
  { key: 'pending', label: 'Da fare' },
  { key: 'completed', label: 'Completate' },
];
