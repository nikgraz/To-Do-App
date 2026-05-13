import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../utils/theme';

/**
 * TaskItem — singola riga della lista.
 * Props:
 *   task       — { id, text, completed, createdAt }
 *   onToggle   — (id) => void
 *   onDelete   — (id) => void
 */
export function TaskItem({ task, onToggle, onDelete }) {
  const [pressed, setPressed] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Elimina attività',
      `Vuoi eliminare "${task.text}"?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ]
    );
  };

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.container,
        task.completed && styles.containerCompleted,
        pressed && styles.containerPressed,
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
        activeOpacity={0.7}
        accessibilityLabel={task.completed ? 'Segna come da fare' : 'Segna come completata'}
        accessibilityRole="checkbox"
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Testo attività */}
      <View style={styles.textContainer}>
        <Text
          style={[styles.taskText, task.completed && styles.taskTextCompleted]}
          numberOfLines={3}
        >
          {task.text}
        </Text>
      </View>

      {/* Pulsante elimina */}
      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteButton}
        activeOpacity={0.7}
        accessibilityLabel="Elimina attività"
        accessibilityRole="button"
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  containerCompleted: {
    backgroundColor: COLORS.accentMuted,
    borderColor: COLORS.accent + '40',
  },
  containerPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  // Checkbox
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    backgroundColor: 'transparent',
  },
  checkboxCompleted: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    ...FONTS.bold,
    lineHeight: 16,
  },

  // Testo
  textContainer: {
    flex: 1,
  },
  taskText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    ...FONTS.medium,
    lineHeight: 22,
  },
  taskTextCompleted: {
    color: COLORS.accentSoft,
    textDecorationLine: 'line-through',
    opacity: 0.75,
  },

  // Delete
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.dangerMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  deleteIcon: {
    color: COLORS.dangerSoft,
    fontSize: 12,
    ...FONTS.bold,
  },
});
