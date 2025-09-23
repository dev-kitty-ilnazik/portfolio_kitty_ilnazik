import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			retry: 1,
		},
	},
})

interface ProviderProps {
	children: ReactNode
}

export const QueryProvider = ({ children }: ProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
