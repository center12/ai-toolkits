// Template: Zustand store slice
// Location: src/features/<feature>/stores/feature-name.store.ts
// OR global: src/stores/feature-name.store.ts
// Usage: Replace FeatureNameState and featureName with your names

import { create } from 'zustand'

interface FeatureNameState {
  // TODO: define state fields
  selectedId: string | null

  // Actions
  setSelectedId: (id: string | null) => void
  reset: () => void
}

const initialState = {
  selectedId: null,
}

export const useFeatureNameStore = create<FeatureNameState>((set) => ({
  ...initialState,

  setSelectedId: (id) => set({ selectedId: id }),
  reset: () => set(initialState),
}))
