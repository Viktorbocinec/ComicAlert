import { useEffect, useState } from 'react';
import '../../General.css'
import CollectibleChangePopUp from './CollectibleChangePopUp';
import formatDate from './FormDate';

export default function CollectibleDisplay() {
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/collectibles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        }

    })
      .then(response => response.json())
      .then(data => setCollectibles(data))
      .catch(error => console.log(error));
  }, []);



  const delteCollectible = (id) => {
    fetch(`http://localhost:8080/collectibles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
    })
    .then(() => {
        setCollectibles(collectibles.filter(collectible => collectible.id !== id)); // Update state
    })
    .catch(error => console.error(error));
}


const FetchImage = ({imageName, alt })  => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/images/${imageName}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.blob())
        .then(images => {
            // Then create a local URL for that image and print it 
            let imageSrc = URL.createObjectURL(images);
            setImageUrl(imageSrc);
        })
    }, [imageName]);

    return (
        <img src={imageUrl} alt={alt} style={{ width: '150px' }} />
    );
}

const isRecentRelease = (releaseDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const currentDate = new Date();
  const collectibleDate = new Date(releaseDate);

  // Calculate the difference in days
  const diffDays = (collectibleDate - currentDate) / oneDay;

  // Check if the release date is in the future, and if the current date is within 5 days of the release date
  return diffDays >= 0 && diffDays <= 5;
};

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Order Source</th>
          <th>Release Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {collectibles.map(collectible => (
          <tr key={collectible.id} className={isRecentRelease(collectible.releaseDate) ? 'collectible-recent': ''}>
            <td>
              <FetchImage imageName={collectible.imagePath} alt={collectible.id}/>
            </td>
            <td>{collectible.name}</td>
            <td>{collectible.orderSource}</td>
            <td>{formatDate(new Date(collectible.releaseDate))}</td>
            <td><button onClick={() => delteCollectible(collectible.id)}>Delete</button>
            <CollectibleChangePopUp collectibleName={collectible.name} collectibleReleaseDate={collectible.releaseDate} collectibleId={collectible.id} collectibleOrderSource={collectible.orderSource}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};