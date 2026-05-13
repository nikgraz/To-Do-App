import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_app_tasks';

/**
 * useTasks — gestisce la lista attività con persistenza AsyncStorage.
 * Lo stato è immutabile: ogni operazione restituisce un nuovo array.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carica le attività al mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setTasks(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Errore nel caricamento attività:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Salva su AsyncStorage ogni volta che tasks cambia
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) =>
        console.error('Errore nel salvataggio attività:', error)
      );
    }
  }, [tasks, isLoading]);

  // Genera un ID univoco basato su timestamp + random
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  // Aggiunge una nuova attività (immutabile: spread + nuovo oggetto)
  const addTask = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;

    const newTask = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]); // nuova attività in cima
    return true;
  }, []);

  // Toggle completamento (immutabile: map restituisce nuovo array)
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Elimina un'attività (immutabile: filter restituisce nuovo array)
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Statistiche derivate
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - completedCount;

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    completedCount,
    pendingCount,
    totalCount,
  };
}
