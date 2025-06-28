const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGO_URI = 'mongodb+srv://mur4tpol4t:1Nt7RCKk9amd5cNC@cluster0.hdofkw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const run = async () => {
    try {
        await client.connect();
        await client.db('mebre').command({ ping: 1 });
        return client;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = run;