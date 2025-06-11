import { Button } from '../ui/button'

type Props = {
	value: string
	onChange: (text: string) => void
	onDelete: () => void
}

export function ReportArea({ value, onChange, onDelete }: Props) {
	return (
		<div className='relative bg-bg dark:bg-gray-800 rounded-lg shadow'>
			<textarea
				className='w-full h-[12lh] p-3 border rounded resize-y text-sm outline-none focus:border-blue-500'
				value={value}
				placeholder='Paste your report here...'
				onChange={e => onChange(e.target.value)}
			/>
			<Button
				className='absolute top-3 right-6'
				onClick={onDelete}
				variant={'destructive'}
			>
				Delete
			</Button>
		</div>
	)
}
