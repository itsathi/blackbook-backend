import React from 'react'
import Logout from '../components/logout';
function userprofile() {
return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
        <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }}
        />
        <h2>John Doe</h2>
        <p style={{ color: '#666' }}>Software Engineer</p>
        <p>Email: johndoe@example.com</p>
        <p>Location: San Francisco, CA</p>
        <p>
            Passionate about building scalable web applications and learning new technologies. 
            Enjoys hiking and photography in free time.
        </p>
        <Logout/>
    </div>
)
}

export default userprofile;