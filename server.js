const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for FCC
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running!');
});

// Timestamp API route
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // If no date is provided, return current timestamp
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // If it's a numeric string (Unix timestamp)
  const isUnixTimestamp = /^\d+$/.test(date);
  const parsedDate = isUnixTimestamp ? new Date(Number(date)) : new Date(date);

  // Check for invalid date
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return valid timestamp
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
