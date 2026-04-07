// Template: Feature-scoped data hook
// Location: src/features/<feature>/hooks/use-feature-name.hook.ts
// Usage: Replace FeatureName, featureName, FeatureItem with your names

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FEATURE_NAME_QUERY_KEY } from '../constants/feature-name.constants'
import { fetchFeatureItems, createFeatureItem } from '../services/feature-name.service'
import { FeatureItem, CreateFeatureItemPayload } from '../types/feature-name.types'

export function useFeatureName() {
  const queryClient = useQueryClient()

  const query = useQuery<FeatureItem[]>({
    queryKey: [FEATURE_NAME_QUERY_KEY],
    queryFn: fetchFeatureItems,
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateFeatureItemPayload) => createFeatureItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEATURE_NAME_QUERY_KEY] })
    },
  })

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
  }
}
