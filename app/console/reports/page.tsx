'use client'

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

import { AnalysisResult } from '@/types'
import { Download, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ReportPage() {
	const [filteredReports, setFilteredReports] = useState(reports)
	const [searchTerm, setSearchTerm] = useState('')
	const [filterStatus, setFilterStatus] = useState('All')
	const [filterDepartment, setFilterDepartment] = useState('All')
	const [selectedReport, setSelectedReport] = useState<AnalysisResult>()
	const [showModal, setShowModal] = useState(false)

	const departments = [...new Set(reports.map(r => r.department))]

	useEffect(() => {
		let filtered = reports
		setSelectedReport(selectedReport)
		setShowModal(showModal)

		if (searchTerm) {
			filtered = filtered.filter(
				report =>
					report.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					report.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
					report.department.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		if (filterStatus !== 'All') {
			filtered = filtered.filter(report => report.status === filterStatus)
		}

		if (filterDepartment !== 'All') {
			filtered = filtered.filter(report => report.department === filterDepartment)
		}

		setFilteredReports(filtered)
	}, [searchTerm, filterStatus, filterDepartment])

	const getStatusColor = (status: 'Completed' | 'In Progress') => {
		switch (status) {
			case 'Completed':
				return 'bg-green-100 text-green-800'
			case 'In Progress':
				return 'bg-yellow-100 text-yellow-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getProgressColor = (progress: number) => {
		if (progress >= 80) return 'bg-green-500'
		if (progress >= 50) return 'bg-yellow-500'
		return 'bg-red-500'
	}

	// const handleViewDetails = (report: AnalysisResult) => {
	// 	setSelectedReport(report)
	// 	setShowModal(true)
	// }

	const handleExportData = () => {
		const csvContent =
			'data:text/csv;charset=utf-8,' +
			'Name,Department,Course,Start Date,End Date,Progress,Status,Score,Certificate\n' +
			filteredReports
				.map(
					r =>
						`${r.memberName},${r.department},${r.course},${r.startDate},${r.endDate},${r.progress}%,${r.status},${
							r.score || 'N/A'
						},${r.certificateIssued ? 'Yes' : 'No'}`
				)
				.join('\n')

		const encodedUri = encodeURI(csvContent)
		const link = document.createElement('a')
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', 'training_reports.csv')
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div>
			<div className='mb-8'>
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>Training Reports</h1>
						<p className='text-gray-600'>Quản lý và theo dõi tiến độ training của nhân viên</p>
					</div>
					<button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'>
						<Plus className='h-4 w-4' />
						Add New Report
					</button>
				</div>
			</div>

			{/* Filters and Search */}
			<div className='bg-bg rounded-lg shadow-sm p-6 mb-8 border border-gray-200'>
				<div className='flex flex-col lg:flex-row gap-4'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							<input
								type='text'
								placeholder='Tìm kiếm theo tên, khóa học, phòng ban...'
								className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<div className='flex gap-4'>
						<select
							className='px-4 py-2 bg-bg border cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							value={filterStatus}
							onChange={e => setFilterStatus(e.target.value)}
						>
							<option value='All'>Tất cả trạng thái</option>
							<option value='Completed'>Completed</option>
							<option value='In Progress'>In Progress</option>
						</select>

						<select
							className='px-4 py-2 border border-gray-300 bg-bg cursor-pointer rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							value={filterDepartment}
							onChange={e => setFilterDepartment(e.target.value)}
						>
							<option value='All'>Tất cả phòng ban</option>
							{departments.map(dept => (
								<option
									key={dept}
									value={dept}
								>
									{dept}
								</option>
							))}
						</select>

						<button
							onClick={handleExportData}
							className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2'
						>
							<Download className='h-4 w-4' />
							Export CSV
						</button>
					</div>
				</div>
			</div>

			{/* Reports Table */}
			<div className='bg-bg rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-bg'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Member
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Department
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Course
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Progress
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Status
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Score
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-bg divide-y divide-gray-200 text-white'>
							{filteredReports.map(report => (
								<tr
									key={report.id}
									className='hover:bg-bg-surface'
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-white'>{report.memberName}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-white'>{report.department}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-white'>{report.course}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='flex items-center'>
											<div className='w-full bg-gray-200 rounded-full h-2 mr-2'>
												<div
													className={`h-2 rounded-full ${getProgressColor(report.progress)}`}
													style={{ width: `${report.progress}%` }}
												></div>
											</div>
											<span className='text-sm text-white'>{report.progress}%</span>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
												'Completed'
											)}`}
										>
											{report.status}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-white'>{report.score ? `${report.score}%` : 'N/A'}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
										<div className='flex space-x-2'>
											<button
												// onClick={() => handleViewDetails(report as AnalysisResult)}
												className='text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-bg/70'
												title='View Details'
											>
												<Eye className='h-4 w-4' />
											</button>
											<button
												className='text-green-600 hover:text-green-900 p-1 rounded hover:bg-bg/70'
												title='Edit'
											>
												<Edit className='h-4 w-4' />
											</button>
											<button
												className='text-red-600 hover:text-red-900 p-1 rounded hover:bg-bg/70'
												title='Delete'
											>
												<Trash2 className='h-4 w-4' />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for Report Details */}
			{/* {showModal && selectedReport && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
						<div className='p-6'>
							<div className='flex justify-between items-center mb-6'>
								<h2 className='text-2xl font-bold text-gray-900'>Training Report Details</h2>
								<button
									onClick={() => setShowModal(false)}
									className='text-gray-400 hover:text-gray-600'
								>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							</div>

							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700'>Member Name</label>
										<p className='mt-1 text-sm text-gray-900'>{selectedReport.memberName}</p>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700'>Department</label>
										<p className='mt-1 text-sm text-gray-900'>{selectedReport.department}</p>
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700'>Course</label>
									<p className='mt-1 text-sm text-gray-900'>{selectedReport.course}</p>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700'>Start Date</label>
										<p className='mt-1 text-sm text-gray-900'>{selectedReport.startDate}</p>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700'>End Date</label>
										<p className='mt-1 text-sm text-gray-900'>{selectedReport.endDate}</p>
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700'>Progress</label>
									<div className='mt-1 flex items-center'>
										<div className='w-full bg-gray-200 rounded-full h-3 mr-3'>
											<div
												className={`h-3 rounded-full ${getProgressColor(selectedReport.progress)}`}
												style={{ width: `${selectedReport.progress}%` }}
											></div>
										</div>
										<span className='text-sm text-gray-600'>{selectedReport.progress}%</span>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700'>Status</label>
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(
												selectedReport.status
											)}`}
										>
											{selectedReport.status}
										</span>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700'>Score</label>
										<p className='mt-1 text-sm text-gray-900'>
											{selectedReport.score ? `${selectedReport.score}%` : 'N/A'}
										</p>
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700'>Certificate Issued</label>
									<p className='mt-1 text-sm text-gray-900'>{selectedReport.certificateIssued ? 'Yes' : 'No'}</p>
								</div>
							</div>

							<div className='flex justify-end space-x-3 mt-6'>
								<button
									onClick={() => setShowModal(false)}
									className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
								>
									Close
								</button>
								<button className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'>
									Edit Report
								</button>
							</div>
						</div>
					</div>
				</div>
			)} */}
		</div>
	)
}
