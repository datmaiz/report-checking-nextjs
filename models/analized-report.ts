import mongoose from 'mongoose'

import { AnalysisResult } from '@/types'

const AnalizedReportModel = new mongoose.Schema<AnalysisResult>(
	{
		not_reported_count: {
			type: Number,
		},
		not_reported_users: {
			type: [String],
			required: true,
		},
		reported_count: {
			type: Number,
		},
		reported_users: {
			type: [String],
			required: true,
		},
		thread_name: {
			type: String,
			required: true,
		},
		total_members: {
			type: Number,
		},
		warnings: {
			type: [
				{
					member: { type: String, required: true },
					warning_message: { type: String, required: true },
					reason: { type: String },
				},
			],
		},
	},
	{ timestamps: true }
)

export const AnalizedReport =
	mongoose.models['analized_report'] || mongoose.model('analized_report', AnalizedReportModel)
