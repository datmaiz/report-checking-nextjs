import mongoose from 'mongoose'
import { MONGOOSE_URI } from '@/utils'

export class DB {
	static isConnected = false
	static connection: mongoose.Mongoose | null = null

	static async getConnection() {
		if (this.isConnected && this.connection) {
			return this.connection
		}

		try {
			const db = await mongoose.connect(MONGOOSE_URI!)
			this.isConnected = true
			this.connection = db
			console.log('Connected to MongoDB')
			return db
		} catch (error) {
			console.error('Error connecting to MongoDB:', error)
			throw error
		}
	}
}
