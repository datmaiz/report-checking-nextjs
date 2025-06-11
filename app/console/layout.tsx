import { ReactNode } from 'react'

import { Sidebar } from '@/components/commons'

export default function ConsoleLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-dvh'>
			<div className='border-r border-gray-400'>
				<Sidebar />
			</div>
			<div className='p-6 flex-1'>{children}</div>
		</div>
	)
}
