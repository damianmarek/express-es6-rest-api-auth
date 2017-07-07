import mongoose from 'mongoose'
import config from './config'

mongoose.Promise = global.Promise
const db = mongoose.connection

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(config.db, {
	// http://mongoosejs.com/docs/connections.html#use-mongo-client
		useMongoClient: true,
	});
	callback(db);
}
