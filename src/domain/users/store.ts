import {connectDB} from '../../db';
import {logger} from '../logger';

const setupCollection = async () => {
    const dBase = await connectDB;

    const collection = dBase.collection(`wizards`);
    collection.createIndex({username: -1}, {unique: true});
    return collection;
};

class UsersStore {
    constructor(collection) {
        this.collection = collection;
    }

    async getUser(username) {
        return (await this.collection).findOne({username});
    }

    async getAllUsers() {
        return (await this.collection).find();
    }

    async save(wizardData) {
        return (await this.collection).insertOne(wizardData);
    }

}

export const usersStore = new UsersStore(setupCollection().catch((e) => logger.error(`Failed to set up 'wizards'-collection`, e)));
