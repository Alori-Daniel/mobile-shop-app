import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

const memoryStorage = new Map<string, string>();
let hasLoggedStorageWarning = false;

const logStorageWarning = (error: unknown) => {
  if (hasLoggedStorageWarning) {
    return;
  }

  hasLoggedStorageWarning = true;
  console.warn("AsyncStorage unavailable, using in-memory storage fallback.", error);
};

const fallbackStorage: StateStorage = {
  getItem: (name) => memoryStorage.get(name) ?? null,
  setItem: (name, value) => {
    memoryStorage.set(name, value);
  },
  removeItem: (name) => {
    memoryStorage.delete(name);
  },
};

export const persistStorage: StateStorage = {
  getItem: async (name) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      logStorageWarning(error);
      return fallbackStorage.getItem(name);
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      logStorageWarning(error);
      fallbackStorage.setItem(name, value);
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      logStorageWarning(error);
      fallbackStorage.removeItem(name);
    }
  },
};
