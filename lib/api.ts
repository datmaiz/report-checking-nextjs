import axios from 'axios'

import { GEMINI_API_KEY } from '@/utils'
import { AnalysisResult } from '../types'
import { prompt } from './prompts'

export async function analyzeReport(content: string, members: string) {
	const res = await axios.post(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${GEMINI_API_KEY}`,
		{
			contents: [{ parts: [{ text: prompt(content, members) }] }],
		}
	)

	let text = res.data.candidates[0].content.parts[0].text.trim()
	if (text.startsWith('```json')) text = text.slice(7)
	if (text.endsWith('```')) text = text.slice(0, -3)
	console.log(text)
	return JSON.parse(text) as AnalysisResult
}
