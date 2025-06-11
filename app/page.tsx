'use client'

import { Loader, LoaderPinwheel } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { ReportArea, Summary } from '@/components/commons'
import { Button } from '@/components/ui/button'
import { analyzeReport } from '@/lib/api'
import type { AnalysisResult } from '@/types'
import { callAPI } from '@/utils'
import members from '../members.json'

export default function HomePage() {
	const [areas, setAreas] = useState<string[]>([''])
	const [summaries, setSummaries] = useState<AnalysisResult[]>([])
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)

	const router = useRouter()

	const updateArea = (index: number, text: string) => {
		const updated = [...areas]
		updated[index] = text
		setAreas(updated)
	}

	const removeArea = (index: number) => {
		const updated = areas.filter((_, i) => i !== index)
		setAreas(updated)
	}

	const addArea = () => setAreas([...areas, ''])

	const processAll = async () => {
		setLoading(true)
		try {
			const results = await Promise.all(areas.map(text => analyzeReport(text, JSON.stringify(members, null, 2))))
			setSummaries(results)
		} finally {
			setLoading(false)
		}
	}

	const savingReport = async () => {
		setSaving(true)
		try {
			const response = await callAPI('/api/analized-reports', {
				method: 'POST',
				body: JSON.stringify(summaries),
			})
			if (response.ok) {
				const data = await response.json()
				console.log(data)
				toast.success('Reports saved successfully')
			}
		} catch (error) {
			console.log(error)
			toast.error('Failed to save reports')
		}
		setSaving(false)
	}

	const clearAll = () => {
		setAreas([''])
		setSummaries([])
	}

	return (
		<main className='p-8 max-w-4xl mx-auto space-y-6'>
			{/* Loading Layer */}
			{(loading || saving) && (
				<div className='fixed inset-0 flex justify-center items-center z-[999] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm'>
					<LoaderPinwheel
						size={50}
						className='animate-spin'
					/>
				</div>
			)}

			<h1 className='text-3xl font-bold text-center'>Report Analyzer</h1>

			{areas.map((value, i) => (
				<ReportArea
					key={i}
					value={value}
					onChange={text => updateArea(i, text)}
					onDelete={() => removeArea(i)}
				/>
			))}

			<div className='flex justify-end gap-2'>
				<Button
					className=''
					variant={'secondary'}
					onClick={addArea}
				>
					Add Area
				</Button>
				<Button
					onClick={processAll}
					variant={'secondary'}
					disabled={loading}
				>
					{loading && <Loader className='animate-spin' />}
					Process
				</Button>
				<div className='fixed top-3 right-3 z-[1] flex gap-2'>
					<Button
						className=''
						variant={'secondary'}
						onClick={savingReport}
						disabled={saving}
					>
						{saving && <Loader className='animate-spin' />}
						Save
					</Button>
					<Button
						variant={'secondary'}
						onClick={() => router.push('/console')}
					>
						Manage
					</Button>
				</div>
				<Button
					className='fixed top-3 left-3 z-[1]'
					variant={'secondary'}
					onClick={clearAll}
					disabled={saving}
				>
					{saving && <Loader className='animate-spin' />}
					Clear
				</Button>
			</div>

			<Summary reports={summaries} />
		</main>
	)
}
