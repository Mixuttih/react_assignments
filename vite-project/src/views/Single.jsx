import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {item} = state || {};

  if (!item) {
    return (
      <div>
        <p>Media item not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h2>{item.title}</h2>
      {isImage && <img src={item.filename} alt={item.title} />}
      {isVideo && <video src={item.filename} controls />}
      <p>{item.description}</p>
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Type: {item.media_type}</p>
    </div>
  )
}

export default Single
