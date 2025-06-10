// backend/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Make sure cors is imported
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const authRouter = require('./Routes/Authrouter');
const adminRouter = require('./Routes/Adminrouter');
const productRouter = require('./Routes/productroutes');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const axios = require('axios'); // <--- Ensure axios is imported

dotenv.config();

const app = express();
// *** IMPORTANT: Set port to 4000 explicitly or via environment variable to match frontend ***
const port = process.env.PORT || 4000; // Changed to 4000 to match your frontend request

// --- Essential Middleware (MUST be at the top) ---
app.use(cors()); // This line enables CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Connect to MongoDB and start server ---
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// --- Nodemailer Transporter Setup (keep your existing setup here) ---
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Email transporter configuration error:", error);
    } else {
        console.log("Email transporter is ready to send messages.");
    }
});
// ------------------------------------

// --- Existing Routes (keep these as they are) ---
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);

// --- Home Route (keep as is) ---
app.get('/', (req, res) => {
  res.send('Welcome to the Auth App!');
});

// --- RE-ADDING: Spotify API Route (for Gauri Paighan Releases) ---
app.get('/api/spotify/releases', async (req, res) => {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const artistId = process.env.SPOTIFY_ARTIST_ID; // Gauri Paighan's ID

        if (!clientId || !clientSecret || !artistId) {
            console.error("Missing Spotify environment variables! Check .env file.");
            return res.status(500).json({ success: false, message: 'Spotify API credentials not configured on backend.' });
        }

        // 1. Get Access Token
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', // Correct Spotify token endpoint
            `grant_type=client_credentials`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
                }
            }
        );
        const accessToken = tokenResponse.data.access_token;

        // 2. Fetch Artist's Albums
        const albumsResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=20&market=IN`, // Correct Spotify API endpoint
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        );

        const releases = albumsResponse.data.items.map(album => ({
            id: album.id,
            name: album.name,
            album_type: album.album_type,
            release_date: album.release_date,
            image: album.images.length > 0 ? album.images[0].url : null,
            spotify_url: album.external_urls.spotify,
        }));

        // Sort by release date (most recent first)
        releases.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        res.json({ success: true, releases });

    } catch (error) {
        console.error("Error fetching Spotify releases from backend:", error.message);
        if (error.response) {
            console.error("Spotify API error response data:", error.response.data);
            console.error("Spotify API error status:", error.response.status);
            // Provide more specific error if from Spotify
            return res.status(error.response.status || 500).json({
                success: false,
                message: `Error from Spotify API: ${error.response.data.error_description || error.response.data.error || error.response.statusText || 'Unknown Spotify error.'}`
            });
        }
        res.status(500).json({ success: false, message: 'Failed to fetch Spotify releases due to an unexpected error.' });
    }
});


// --- Email Sending Route (keep your existing setup here) ---
app.post('/api/place-order-and-email', async (req, res) => {
    // ... (Your existing email sending route code) ...
});

// ... (any other existing routes or configurations) ...