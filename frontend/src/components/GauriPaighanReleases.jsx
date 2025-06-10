// GauriPaighanReleases.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GauriPaighanReleases = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        // *** IMPORTANT: Ensure this URL matches your backend's port and route ***
        const response = await axios.get('http://localhost:4000/api/spotify/releases');
        setReleases(response.data.releases);
      } catch (err) {
        console.error("Error fetching Gauri Paighan's Spotify releases:", err);
        setError("Failed to fetch releases. Please try again later.");
        if (err.response) {
            console.error("Backend error response:", err.response.data);
            setError(`Error: ${err.response.data.message || err.message}`);
        } else if (err.request) {
            console.error("No response received:", err.request);
            setError("Network Error: Could not connect to the server.");
        } else {
            console.error("Error setting up request:", err.message);
            setError(`An unexpected error occurred: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div className="text-center p-4">Loading Spotify releases...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (releases.length === 0) {
    return <div className="text-center p-4">No Spotify releases found for Gauri Paighan.</div>;
  }

  return (
    <section className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Gauri Paighan - Latest Spotify Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {releases.map((release) => (
          <div key={release.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            {release.image && (
              <img
                src={release.image}
                alt={release.name}
                className="w-full h-48 object-cover object-center"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{release.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Type: {release.album_type.charAt(0).toUpperCase() + release.album_type.slice(1)}</p>
              <p className="text-sm text-gray-600 mb-3">Released: {new Date(release.release_date).toLocaleDateString()}</p>
              <a
                href={release.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GauriPaighanReleases;