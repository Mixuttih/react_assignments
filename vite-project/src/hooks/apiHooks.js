import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData.js';

const useMedia = () => {
  const MEDIA_API = import.meta.env.VITE_MEDIA_API;
  const AUTH_API = import.meta.env.VITE_AUTH_API;
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      const data = await fetchData(`${MEDIA_API}/media`);
      const users = await Promise.all(
        data.map((item) => fetchData(`${AUTH_API}/users/${item.user_id}`)),
      );
      const mediaWithUsers = data.map((item, index) => ({
        ...item,
        ...users[index],
      }));
      setMediaArray(mediaWithUsers);
    };
    getMedia();
  }, [AUTH_API, MEDIA_API]);

  return mediaArray;
};

export {useMedia};