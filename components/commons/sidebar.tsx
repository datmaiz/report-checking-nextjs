'use client'

import { BarChart3, BookOpen, Menu, Users } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		icon: BarChart3,
		page: '/console',
	},
	{
		id: 'reports',
		label: 'Training Reports',
		icon: BookOpen,
		page: '/console/reports',
	},
	{
		id: 'members',
		label: 'Member Management',
		icon: Users,
		page: '/console/members',
	},
]

export function Sidebar() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const pathname = usePathname()
	const router = useRouter()

	return (
		<div
			className={`bg-gray-900 text-white transition-all duration-300 ${
				sidebarCollapsed ? 'w-16' : 'w-64'
			} flex flex-col`}
		>
			<div className='p-4 border-b border-gray-700'>
				<div className='flex items-center justify-between'>
					{!sidebarCollapsed && <h2 className='text-xl font-bold'>Training Console</h2>}
					<button
						onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
						className='p-2 rounded-lg hover:bg-gray-700 transition-colors'
					>
						<Menu />
					</button>
				</div>
			</div>

			<nav className='flex-1 p-4 space-y-2'>
				{menuItems.map(item => (
					<button
						key={item.id}
						onClick={() => router.push(item.page)}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
							pathname === item.page ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
						}`}
					>
						<item.icon className='h-5 w-5' />
						{!sidebarCollapsed && <span>{item.label}</span>}
					</button>
				))}
			</nav>
		</div>
	)
}
