import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING, FILTER_OPTIONS } from '../utils/theme';

/**
 * FilterBar — barra filtri Tutte / Da fare / Completate.
 * Props:
 *   activeFilter  — 'all' | 'pending' | 'completed'
 *   onFilterChange — (key: string) => void
 *   counts        — { all, pending, completed }
 */
export function FilterBar({ activeFilter, onFilterChange, counts }) {
  return (
    <View style={styles.container}>
      {FILTER_OPTIONS.map((opt) => {
        const isActive = activeFilter === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onFilterChange(opt.key)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {opt.label}
            </Text>
            <View style={[styles.badge, isActive && styles.badgeActive]}>
              <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                {counts[opt.key]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  pillText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    ...FONTS.medium,
  },
  pillTextActive: {
    color: COLORS.white,
    ...FONTS.semibold,
  },
  badge: {
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  badgeText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    ...FONTS.bold,
    lineHeight: 14,
  },
  badgeTextActive: {
    color: COLORS.white,
  },
});
