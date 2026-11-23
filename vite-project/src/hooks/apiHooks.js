import {useCallback, useEffect, useState} from 'react';
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

  const postMedia = async (file, inputs, token) => {
    const uploadedFile = file.data ?? file.file ?? file;
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: uploadedFile.filename,
      filesize: uploadedFile.filesize ?? uploadedFile.size,
      media_type: uploadedFile.media_type ?? uploadedFile.type,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mediaData),
    };
    return fetchData(`${MEDIA_API}/media`, fetchOptions);
 };

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    console.log(loginResult);
    return loginResult;
  };
  return {postLogin};
}

const useUser = () => {
  const postUser = useCallback(async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return fetchData(`${import.meta.env.VITE_AUTH_API}/users`, fetchOptions);
  }, []);

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return fetchData(`${import.meta.env.VITE_AUTH_API}/users/token`, fetchOptions);
  }, []);

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
     const formData = new FormData();
     formData.append('file', file);

     const fetchOptions = {
       method: 'POST',
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: formData,
     };

     return fetchData(
       `${import.meta.env.VITE_UPLOAD_SERVER}/upload`,
       fetchOptions,
     );
 };
  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
