import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks.js';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No login token found.');
        return;
      }

      try {
        const userData = await getUserByToken(token);
        setUser(userData.user ?? userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to load user data.');
      }
    };

    getUser();
  }, [getUserByToken]);

  return (
    <div>
      <h2>Profile</h2>
      {error && <p role="alert">{error}</p>}
      {user && Object.entries(user).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {String(value)}
        </p>
      ))}
    </div>
  )
}

export default Profile
