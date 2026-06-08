import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import '../style/profile.scss';

const Profile = () => {
    const navigate = useNavigate();
    const { user, handleUpdateUser, handleLogout: authHandleLogout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setProfile({ name: userData.name || userData.username || '', email: userData.email || '' });
            setIsLoggedIn(true);
        } else if (user) {
            setProfile({ name: user.username || user.name || '', email: user.email || '' });
            setIsLoggedIn(true);
        }
    }, [user]);

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedUser = {
            username: profile.name.trim(),
            email: profile.email.trim(),
        };

        if (!updatedUser.username || !updatedUser.email) {
            setMessage('Name and email are required.');
            return;
        }

        setLoading(true);
        try {
            await handleUpdateUser({ username: updatedUser.username, email: updatedUser.email });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setProfile(updatedUser);
            setMessage('Profile updated successfully.');
            alert('Profile updated successfully');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error updating profile');
          
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setProfile({ name: '', email: '' });
        setMessage('Logged out successfully.');
        // Call the auth context logout which clears token and blacklists it
        await authHandleLogout();
        navigate('/login');
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">👤</div>
                    <div>
                        <h2 className="profile-title">{isLoggedIn ? 'Update Profile' : 'Login User'}</h2>
                        <p className="profile-subtitle">Manage your account settings</p>
                    </div>

                    
                </div>
                 <div className="profile-close" >
                        <button onClick={() => navigate('/')}>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Remove-Bold--Streamline-Ultimate" height="24" width="24">
                                <desc>
                                    Remove Bold Streamline Icon: https://streamlinehq.com
                                </desc>
                                <path d="M22.66 5.58a1.5 1.5 0 0 0 0 -2.12l-2.12 -2.12a1.49 1.49 0 0 0 -2.12 0l-6.24 6.24a0.27 0.27 0 0 1 -0.36 0L5.58 1.34a1.49 1.49 0 0 0 -2.12 0L1.34 3.46a1.5 1.5 0 0 0 0 2.12l6.24 6.24a0.25 0.25 0 0 1 0 0.36l-6.24 6.24a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.49 1.49 0 0 0 2.12 0l6.24 -6.24a0.27 0.27 0 0 1 0.36 0l6.24 6.24a1.47 1.47 0 0 0 1.06 0.44 1.45 1.45 0 0 0 1.06 -0.44l2.12 -2.12a1.5 1.5 0 0 0 0 -2.12l-6.24 -6.24a0.25 0.25 0 0 1 0 -0.36Z" fill="#201e1e" stroke-width="1"></path>
                            </svg>
                        </button>
                    </div>

                {message && <p className="profile-message">{message}</p>}

                <form onSubmit={handleUpdate} className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="form-input"
                        />
                    </div>

                    <div className="profile-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                        <button type="button" onClick={handleLogout} className="btn btn-secondary" disabled={loading}>
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
