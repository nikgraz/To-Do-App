import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../utils/theme';

/**
 * StatsHeader — mostra totale, completate e da fare.
 * Props:
 *   completed  — number
 *   pending    — number
 *   total      — number
 */
export function StatsHeader({ completed, pending, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statLabel}>Totali</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBlock}>
          <Text style={[styles.statValue, styles.pendingValue]}>{pending}</Text>
          <Text style={styles.statLabel}>Da fare</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBlock}>
          <Text style={[styles.statValue, styles.completedValue]}>{completed}</Text>
          <Text style={styles.statLabel}>Completate</Text>
        </View>
      </View>

      {/* Barra progresso */}
      {total > 0 && (
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${percentage}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: SPACING.sm,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 28,
    ...FONTS.heavy,
    lineHeight: 34,
  },
  pendingValue: {
    color: COLORS.accent,
  },
  completedValue: {
    color: COLORS.success,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    ...FONTS.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
  },
  progressOuter: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginTop: SPACING.xs,
  },
  progressInner: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.full,
  },
});
