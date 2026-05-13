import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { useTasks } from './src/hooks/useTasks';
import { TaskItem } from './src/components/TaskItem';
import { AddTaskInput } from './src/components/AddTaskInput';
import { FilterBar } from './src/components/FilterBar';
import { StatsHeader } from './src/components/StatsHeader';
import { EmptyState } from './src/components/EmptyState';
import { COLORS, FONTS, SPACING, RADIUS } from './src/utils/theme';

export default function App() {
  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    completedCount,
    pendingCount,
    totalCount,
  } = useTasks();

  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Filtra e ordina: le attività non completate vengono prima
  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (filter === 'pending') result = tasks.filter((t) => !t.completed);
    if (filter === 'completed') result = tasks.filter((t) => t.completed);
    // Ordinamento: non completate in cima, completate in fondo
    return [...result].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [tasks, filter]);

  const counts = {
    all: totalCount,
    pending: pendingCount,
    completed: completedCount,
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Caricamento attività...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flex}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>To-Do App</Text>
              <Text style={styles.headerSubtitle}>Le tue attività quotidiane</Text>
            </View>

            <View style={styles.content}>
              {/* Input aggiunta */}
              <AddTaskInput onAdd={addTask} />

              {/* Statistiche */}
              <StatsHeader
                completed={completedCount}
                pending={pendingCount}
                total={totalCount}
              />

              {/* Filtri */}
              <FilterBar
                activeFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />

              {/* Lista attività — usa FlatList come richiesto */}
              <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TaskItem
                    task={item}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                )}
                ListEmptyComponent={<EmptyState filter={filter} />}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={
                  filteredTasks.length === 0 ? styles.listEmpty : styles.list
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    ...FONTS.medium,
    marginTop: SPACING.sm,
  },

  // Header
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    color: COLORS.accent,
    fontSize: 28,
    ...FONTS.heavy,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    ...FONTS.regular,
    marginTop: 2,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
  listEmpty: {
    flex: 1,
  },
});
