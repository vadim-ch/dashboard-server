import {MongoClient} from 'mongodb';
import {logger} from '../logger';

const url = process.env.MONGO_URL || `mongodb://localhost:27017`;

export const connectDB =
    MongoClient.connect(url)
        .then((client: MongoClient) => client.db(`concordia`))
        .catch((e) => {
            logger.error(`Failed to connect to MongoDB`, e);
            process.exit(1);
        });
