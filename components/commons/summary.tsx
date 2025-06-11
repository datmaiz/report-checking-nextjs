import { AnalysisResult } from '@/types'

export function Summary({ reports }: { reports: AnalysisResult[] }) {
	return (
		<div className='space-y-6'>
			<h2>Summary:</h2>
			{reports.map((report, i) => (
				<div
					key={i}
					className='bg-muted dark:bg-gray-800 p-4 rounded shadow space-y-2'
				>
					<h3 className='text-lg font-semibold'>Thread: {report.thread_name}</h3>

					<div>
						<h4 className='font-medium'>Not Reported Users:</h4>
						<ul className='list-disc list-inside'>
							{report.not_reported_users.length ? (
								report.not_reported_users.map((u, i) => <li key={i}>{u}</li>)
							) : (
								<li>None</li>
							)}
						</ul>
					</div>

					<div>
						<h4 className='font-medium'>Warnings:</h4>
						<ul className='list-disc list-inside'>
							{report.warnings.length ? (
								report.warnings.map((w, i) => (
									<li key={i}>
										{w.member}: {w.warning_message}
									</li>
								))
							) : (
								<li>None</li>
							)}
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}
