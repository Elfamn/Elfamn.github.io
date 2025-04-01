const express = require('express');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/trips/sorted-by-duration', async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    const tripsRef = db.collection('trips');
    const snapshot = await tripsRef.where('userId', '==', userId).get();

    if (snapshot.empty) {
      return res.json([]);
    }

    const trips = [];
    snapshot.forEach(doc => {
      const tripData = doc.data();
      const id = doc.id;

      let startDate = tripData.startDate;
      let endDate = tripData.endDate;

      if (startDate && typeof startDate !== 'string') {
        startDate = startDate.toDate ? startDate.toDate().toISOString() : new Date(startDate).toISOString();
      }

      if (endDate && typeof endDate !== 'string') {
        endDate = endDate.toDate ? endDate.toDate().toISOString() : new Date(endDate).toISOString();
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const durationInMs = end.getTime() - start.getTime();
        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));

        trips.push({
          id,
          ...tripData,
          startDate,
          endDate,
          durationInDays: durationInDays > 0 ? durationInDays : 0
        });
      } else {
        trips.push({
          id,
          ...tripData,
          durationInDays: 0
        });
      }
    });

    trips.sort((a, b) => b.durationInDays - a.durationInDays);

    res.json(trips);
  } catch (error) {
    console.error('Error fetching sorted trips:', error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});