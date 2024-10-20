import { createStore } from 'zustand';

import { IBlockerStore } from '../models/blockerStore';

export const createBlockerStore = () =>
  createStore<IBlockerStore>((set) => ({
    isBlocking: false,
    unblock: () => set({ isBlocking: false }),
    block: () => set({ isBlocking: true }),
  }));
