import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow.jsx';
import TempCounter from '../components/TempCounter.jsx';
import {fetchData} from '../utils/fetchData.js';



const Home = () => {
  const MEDIA_API = import.meta.env.VITE_MEDIA_API;
  const AUTH_API = import.meta.env.VITE_AUTH_API;
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      const data = await fetchData(MEDIA_API + '/media');
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

  console.log(mediaArray);

  return (
    <>
    <TempCounter />

      <h2>My Media</h2>
       <table>
         <thead>
           <tr>
             <th>Thumbnail</th>
             <th>Title</th>
             <th>Description</th>
             <th>Owner</th>
             <th>Created</th>
             <th>Size</th>
             <th>Type</th>
           </tr>
         </thead>
         <tbody>
           {mediaArray.map((item) => (
             <MediaRow key={item.media_id} item={item} />
           ))}
         </tbody>
       </table>
    </>
  );
};

export default Home;
