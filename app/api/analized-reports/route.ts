import { DB } from '@/lib/db'
import { AnalizedReport } from '@/models/analized-report'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	DB.getConnection()

	try {
		const reports = await AnalizedReport.find()
		return NextResponse.json(reports)
	} catch (error) {
		return NextResponse.json({ message: String(error) })
	}
}

export async function POST(req: NextRequest) {
	DB.getConnection()
	const body = await req.json()
	console.log('POST /api')
	console.log(body)
	const newReport = await AnalizedReport.create(body)
	return NextResponse.json(newReport)
}
