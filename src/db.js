import mongoose from 'mongoose'

mongoose.Promise = global.Promise
const db = mongoose.connection

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(process.env.MONGO_URL)
	callback(db);
}
