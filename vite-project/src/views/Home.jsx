import MediaRow from '../components/MediaRow.jsx';
import TempCounter from '../components/TempCounter.jsx';
import {useMedia} from '../hooks/apiHooks.js';

const Home = () => {
  const {mediaArray} = useMedia();

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
