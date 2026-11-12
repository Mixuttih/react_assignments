import {useNavigate} from 'react-router';

 const MediaRow = (props) => {
   const {item} = props;
   const navigate = useNavigate();

   return (
      <tr
        key={item.media_id}
        onClick={() => navigate('/single', {state: {item}})}
      >
        <td>
          <img src={item.thumbnail} alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
      </tr>
   );
 };

 export default MediaRow;
