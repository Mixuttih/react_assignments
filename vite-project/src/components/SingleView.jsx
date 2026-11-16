const SingleView = ({item, setSelectedItem}) => {
  if (!item) {
    return null;
  }

  const isImage = item.media_type.startsWith('image/');
  const isVideo = item.media_type.startsWith('video/');

  return (
    <dialog open aria-labelledby="media-title" onCancel={() => setSelectedItem(null)}>
      <button type="button" onClick={() => setSelectedItem(null)} aria-label="Close">
        Close
      </button>
      <h2 id="media-title">{item.title}</h2>
      {isImage && <img src={item.filename} alt={item.title} />}
      {isVideo && <video src={item.filename} controls />}
      <p>{item.description}</p>
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Type: {item.media_type}</p>
    </dialog>
  );
};

export default SingleView;
