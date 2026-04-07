// Template: Feature page component
// Location: src/features/<feature>/pages/FeatureNamePage.tsx
// Usage: Replace FeatureName with your feature name

import { useQuery } from '@tanstack/react-query'
import { FEATURE_NAME_QUERY_KEY } from '../constants/feature-name.constants'
import { fetchFeatureItems } from '../services/feature-name.service'

export function FeatureNamePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: [FEATURE_NAME_QUERY_KEY],
    queryFn: fetchFeatureItems,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <div>
      {/* TODO: implement page layout */}
    </div>
  )
}
