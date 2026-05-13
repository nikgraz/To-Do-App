# 📋 To-Do App

App mobile sviluppata in **React Native con Expo** per gestire una lista di attività quotidiane. Supporta aggiunta, completamento, eliminazione e filtraggio delle attività, con persistenza locale tramite AsyncStorage.

---

## 🚀 Istruzioni di avvio

### Prerequisiti
- Node.js >= 18
- npm >= 9
- Expo Go installato sul dispositivo (iOS/Android) **oppure** un emulatore Android/iOS

### Installazione e avvio

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server Expo
npx expo start

# 3. Scansiona il QR code con Expo Go oppure premi:
#    A  → avvia su emulatore Android
#    I  → avvia su simulatore iOS
#    W  → apri nel browser (funzionalità limitate)
```

---

## 🏗️ Struttura dei componenti

```
To-Do-App/
├── App.js                      # Componente radice, orchestrazione generale
└── src/
    ├── components/
    │   ├── TaskItem.js          # Singola riga attività (checkbox, testo, elimina)
    │   ├── AddTaskInput.js      # Campo testo + pulsante aggiunta
    │   ├── FilterBar.js         # Filtri: Tutte / Da fare / Completate
    │   ├── StatsHeader.js       # Contatori e barra di progresso
    │   └── EmptyState.js        # Feedback visivo lista vuota
    ├── hooks/
    │   └── useTasks.js          # Custom hook: logica + persistenza
    └── utils/
        └── theme.js             # Design tokens (colori, spaziature, radii)
```

L'architettura separa nettamente la **logica** (hook) dalla **presentazione** (componenti), seguendo il pattern custom-hook + dumb components.

---

## ⚙️ Gestione dello stato

Lo stato è centralizzato nel custom hook `useTasks` (`src/hooks/useTasks.js`) e gestito con `useState`. Il rispetto dell'**immutabilità** è garantito da:

- **`addTask`** → crea un nuovo oggetto task con spread e lo antepone all'array (`[newTask, ...prev]`)
- **`toggleTask`** → usa `Array.map` per restituire un nuovo array con il task modificato (`{ ...task, completed: !task.completed }`)
- **`deleteTask`** → usa `Array.filter` per restituire un nuovo array senza il task eliminato

In `App.js`, le attività filtrate e ordinate sono calcolate con `useMemo` per evitare ricalcoli inutili a ogni render.

---

## 💾 Persistenza dei dati

La persistenza è implementata tramite **`@react-native-async-storage/async-storage`**, una storage asincrona chiave-valore disponibile offline sul dispositivo.

- **Caricamento** → `useEffect` con array vuoto `[]` eseguito al mount: legge la chiave `@todo_app_tasks` e ripristina lo stato.
- **Salvataggio** → secondo `useEffect` con `[tasks]` come dipendenza: ogni modifica allo stato serializza l'array in JSON e lo salva su disco.
- I dati sopravvivono alla chiusura dell'app e al riavvio del dispositivo.

---

## ✨ Funzionalità extra implementate

| Funzionalità | Dettagli |
|---|---|
| **Filtro attività** | Tre tab: Tutte / Da fare / Completate |
| **Conferma prima dell'eliminazione** | `Alert.alert` con opzioni Annulla / Elimina |
| **Contatore attività completate** | Pannello statistiche con totale, da fare, completate |
| **Ordinamento automatico** | Le attività non completate vengono visualizzate prima |
| **Barra di progresso** | Mostra percentuale di completamento |

---

## 📦 Dipendenze principali

| Pacchetto | Versione | Scopo |
|---|---|---|
| `expo` | ~50.0.0 | Framework di sviluppo |
| `react-native` | 0.73.6 | UI nativa |
| `@react-native-async-storage/async-storage` | 1.21.0 | Persistenza locale |

---

## 📱 Screenshot dell'app

L'interfaccia utilizza un tema scuro (dark slate) con accenti arancio, ottimizzato per la leggibilità e l'uso quotidiano.
