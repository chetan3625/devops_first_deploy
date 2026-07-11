import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || 'profiledb';
const collectionName = process.env.COLLECTION_NAME || 'profiles';

if (!mongoUri) {
  console.error('MONGO_URI is not set in .env');
  process.exit(1);
}

const client = new MongoClient(mongoUri);

app.use(cors());
app.use(express.json());

app.put('/profile', async (req, res) => {
  const { id, name, email, bio } = req.body;

  if (!id || !name || !email || !bio) {
    return res.status(400).json({
      error: 'Fields id, name, email, and bio are required for update.',
    });
  }

  const filter = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { _id: id };

  const update = {
    $set: {
      name,
      email,
      bio,
      updatedAt: new Date(),
    },
    $setOnInsert: {
      createdAt: new Date(),
    },
  };

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, update, { upsert: true });
    const updatedProfile = await collection.findOne(filter);

    if (result.matchedCount === 0 && result.upsertedCount > 0) {
      return res.json({ message: 'Profile created', profile: updatedProfile });
    }

    return res.json({ message: 'Profile updated', profile: updatedProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update profile.' });
  }
});

app.listen(port, async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    console.log(`Server listening on http://localhost:${port}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
});
