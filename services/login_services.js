const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');




async function isValidCredentials(username, password) {
    const uri = process.env.MONGO_URL;
    const dbName = 'test'; // database where the users data is stored
    const collectionName = 'users'; // collecion name of the users documents
    
    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Look up fro the users in the collection based on username 
        const user = await collection.findOne({ "name": username });

        console.log(`User name:`, user);

        if( user && user.password === password ) { 
            console.log('login success');
            console.log(`userpassword ${user.password} and password is ${password}`)
            return true; // Credentials are valid
        }
        else {
            return false;
        }

        // return false; // Credntials are invalid

    } catch (error) {
        // print out the error to the console
        console.error('Error occurred during database lookup:', error)

        return false; // Credentials are invalid
    } finally {

        await client.close();
    }
    // return true;
}

function generateToken(username) {
    // Get the payload for token generation
    const payload = { username };
    // Genrate a random secret key
    const secret = crypto.randomBytes(32).toString('hex');// Replace with your own secret key
    
    return jwt.sign(payload, secret);
}

module.exports = {
    generateToken,
    isValidCredentials
};