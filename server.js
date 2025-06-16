const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so FCC can test the API
app.use(cors());

// Root route (optional for your own testing)
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is up');
});

// Main Timestamp API
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // Case 1: No date provided — return current time
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Case 2: If date is a UNIX timestamp (milliseconds)
  if (/^\d+$/.test(date)) {
    // Convert string to integer and parse as UNIX timestamp
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Case 3: Invalid date
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Case 4: Valid date
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
