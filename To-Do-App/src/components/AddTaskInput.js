import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../utils/theme';

/**
 * AddTaskInput — campo testo + pulsante per aggiungere attività.
 * Props:
 *   onAdd — (text: string) => boolean
 */
export function AddTaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (!text.trim()) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }
    const success = onAdd(text);
    if (success) {
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Nuova attività..."
          placeholderTextColor={COLORS.textMuted}
          value={text}
          onChangeText={(t) => {
            setText(t);
            if (error) setError(false);
          }}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          maxLength={200}
          multiline={false}
          accessibilityLabel="Campo testo nuova attività"
        />
        <TouchableOpacity
          style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          accessibilityLabel="Aggiungi attività"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={styles.errorText}>Inserisci il testo dell'attività</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  inputRowError: {
    borderColor: COLORS.danger,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    ...FONTS.regular,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    minHeight: 52,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 22,
    ...FONTS.bold,
    lineHeight: 26,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    ...FONTS.medium,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
});
