// import {MongoClient} from 'mongodb';
import { logger } from '../logger';
import * as mongoose from 'mongoose';

const url = process.env.MONGO_URL || `mongodb://localhost:27017`;

// export const connectDatabase =
//     MongoClient.connect(url)
//         .then((client: MongoClient) => client.db(`concordia`))
//         .catch((e) => {
//             logger.error(`Failed to connect to MongoDB`, e);
//             process.exit(1);
//         });

export const connectDatabase =
    mongoose.connect(url)
        .catch((e) => {
          logger.error(`Failed to connect to MongoDB`, e);
          process.exit(1);
        });
