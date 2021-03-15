import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useAsyncStorage = (key, initialState = null) => {
  const [state, setState] = useState(async () => {
    const storageValue = await AsyncStorage.getItem(key);

    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(() => {
    (async () => {
      if (state) {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } else {
        await AsyncStorage.removeItem(key);
      }
    })();
  }, [key, state]);

  return [state, setState];
};
