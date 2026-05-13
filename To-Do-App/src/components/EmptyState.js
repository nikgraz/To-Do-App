import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../utils/theme';

/**
 * EmptyState — feedback visivo per lista vuota.
 * Props:
 *   filter — 'all' | 'pending' | 'completed'
 */
export function EmptyState({ filter }) {
  const messages = {
    all: { emoji: '📋', title: 'Nessuna attività', subtitle: 'Aggiungi la tua prima attività qui sopra!' },
    pending: { emoji: '🎉', title: 'Tutto fatto!', subtitle: 'Non hai attività in sospeso.' },
    completed: { emoji: '⏳', title: 'Niente ancora', subtitle: 'Non hai ancora completato nessuna attività.' },
  };

  const msg = messages[filter] || messages.all;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{msg.emoji}</Text>
      <Text style={styles.title}>{msg.title}</Text>
      <Text style={styles.subtitle}>{msg.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emoji: {
    fontSize: 52,
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.textSecondary,
    fontSize: 20,
    ...FONTS.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    ...FONTS.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
});
