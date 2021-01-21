import mongoose from 'mongoose';
import { config } from 'dotenv';
import app from './app';
import logger from './config/logger';

config();

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', error => logger.info(error));
db.once('open', () => logger.info('Database connected'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	logger.info(`App listening to port ${PORT}`);
});
