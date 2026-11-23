import {useUserContext} from '../hooks/contextHooks.js';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div>
      <h2>Profile</h2>
      {!user && <p role="alert">No login token found.</p>}
      {user && Object.entries(user).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {String(value)}
        </p>
      ))}
    </div>
  )
}

export default Profile
