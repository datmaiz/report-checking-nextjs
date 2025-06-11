'use client'

import { Award, BookOpen, TrendingUp, Users } from 'lucide-react'

const reports = [
	{
		id: 1,
		memberId: 1,
		memberName: 'Nguyễn Văn An',
		department: 'IT',
		course: 'React Advanced',
		startDate: '2024-01-15',
		endDate: '2024-02-15',
		progress: 85,
		status: 'Completed',
		score: 88,
		certificateIssued: true,
	},
	{
		id: 2,
		memberId: 2,
		memberName: 'Trần Thị Bình',
		department: 'Marketing',
		course: 'Digital Marketing',
		startDate: '2024-01-20',
		endDate: '2024-02-20',
		progress: 60,
		status: 'In Progress',
		score: null,
		certificateIssued: false,
	},
	{
		id: 3,
		memberId: 3,
		memberName: 'Lê Văn Cường',
		department: 'HR',
		course: 'Leadership Skills',
		startDate: '2024-01-10',
		endDate: '2024-02-10',
		progress: 100,
		status: 'Completed',
		score: 92,
		certificateIssued: true,
	},
	{
		id: 4,
		memberId: 4,
		memberName: 'Phạm Thị Dung',
		department: 'Finance',
		course: 'Financial Analysis',
		startDate: '2024-02-01',
		endDate: '2024-03-01',
		progress: 25,
		status: 'In Progress',
		score: null,
		certificateIssued: false,
	},
]

const members = [
	{
		id: 1,
		name: 'Nguyễn Văn An',
		email: 'an.nguyen@company.com',
		phone: '0901234567',
		department: 'IT',
		position: 'Senior Developer',
		joinDate: '2022-01-15',
		status: 'Active',
		totalCourses: 5,
		completedCourses: 4,
	},
	{
		id: 2,
		name: 'Trần Thị Bình',
		email: 'binh.tran@company.com',
		phone: '0912345678',
		department: 'Marketing',
		position: 'Marketing Manager',
		joinDate: '2021-06-20',
		status: 'Active',
		totalCourses: 3,
		completedCourses: 2,
	},
	{
		id: 3,
		name: 'Lê Văn Cường',
		email: 'cuong.le@company.com',
		phone: '0923456789',
		department: 'HR',
		position: 'HR Specialist',
		joinDate: '2023-03-10',
		status: 'Active',
		totalCourses: 4,
		completedCourses: 3,
	},
	{
		id: 4,
		name: 'Phạm Thị Dung',
		email: 'dung.pham@company.com',
		phone: '0934567890',
		department: 'Finance',
		position: 'Financial Analyst',
		joinDate: '2022-11-01',
		status: 'Active',
		totalCourses: 2,
		completedCourses: 1,
	},
]

export default function DashboardPage() {
	const stats = {
		totalMembers: members.length,
		totalReports: reports.length,
		completedTrainings: reports.filter(r => r.status === 'Completed').length,
		inProgressTrainings: reports.filter(r => r.status === 'In Progress').length,
		averageScore: Math.round(
			reports.filter(r => r.score).reduce((acc, r) => acc + (r.score || 0), 0) / reports.filter(r => r.score).length
		),
	}

	return (
		<div>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-white mb-2'>Dashboard</h1>
				<p className='text-gray-600'>Tổng quan về hệ thống quản lý training</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='p-2 bg-blue-100 rounded-lg'>
							<Users className='h-6 w-6 text-blue-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>Total Members</p>
							<p className='text-2xl font-bold text-gray-300'>{stats.totalMembers}</p>
						</div>
					</div>
				</div>

				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='p-2 bg-green-100 rounded-lg'>
							<Award className='h-6 w-6 text-green-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>Completed</p>
							<p className='text-2xl font-bold text-white'>{stats.completedTrainings}</p>
						</div>
					</div>
				</div>

				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='p-2 bg-yellow-100 rounded-lg'>
							<BookOpen className='h-6 w-6 text-yellow-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>In Progress</p>
							<p className='text-2xl font-bold text-white'>{stats.inProgressTrainings}</p>
						</div>
					</div>
				</div>

				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='p-2 bg-purple-100 rounded-lg'>
							<TrendingUp className='h-6 w-6 text-purple-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>Average Score</p>
							<p className='text-2xl font-bold text-white'>{stats.averageScore}%</p>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<h3 className='text-lg font-semibold text-white mb-4'>Recent Training Activities</h3>
					<div className='space-y-3'>
						{reports.slice(0, 5).map(report => (
							<div
								key={report.id}
								className='flex items-center justify-between p-3 bg-bg-surface text-white rounded-lg'
							>
								<div>
									<p className='font-medium text-white'>{report.memberName}</p>
									<p className='text-sm text-gray-500'>{report.course}</p>
								</div>
								<span
									className={`px-2 py-1 text-xs rounded-full ${
										report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
									}`}
								>
									{report.status}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className='bg-bg rounded-lg shadow-sm p-6 border border-gray-200'>
					<h3 className='text-lg font-semibold text-white mb-4'>Department Overview</h3>
					<div className='space-y-3'>
						{[...new Set(members.map(m => m.department))].map(dept => {
							const deptMembers = members.filter(m => m.department === dept)
							const deptReports = reports.filter(r => r.department === dept)
							const completedCount = deptReports.filter(r => r.status === 'Completed').length

							return (
								<div
									key={dept}
									className='flex items-center justify-between p-3 bg-bg-surface rounded-lg'
								>
									<div>
										<p className='font-medium text-white'>{dept}</p>
										<p className='text-sm text-gray-500'>{deptMembers.length} members</p>
									</div>
									<div className='text-right'>
										<p className='text-sm font-medium text-white'>
											{completedCount}/{deptReports.length}
										</p>
										<p className='text-xs text-gray-500'>completed</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
