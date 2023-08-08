import { useState } from 'react';
import '../../General.css'

export default function CollectibleUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [collectibleName, setCollectibleName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [orderSource, setOrderSource] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setCollectibleName(e.target.value);
  };

  const handleDateChange = (e) => {
    setReleaseDate(e.target.value);
  };

  const handleOrderSourceChange = (e) => {
    setOrderSource(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', collectibleName);
    formData.append('releaseDate', releaseDate);
    formData.append('imagePath', selectedFile);
    formData.append('orderSource', orderSource);


    for (const value of formData.values()) {
        console.log(value)
      }

    fetch('http://localhost:8080/collectibles/upload', {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: formData,
    })
      .then(response => response.json())
      .then(success => {
        // Do something with the successful response
        alert("Picture Upload Succesfully");
        setCollectibleName("");
        setReleaseDate("");
        setSelectedFile(null);
        setOrderSource("");
      
        // Refresh the site
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="uploadbar">
      <div className="uploadbar-container">    <form onSubmit={handleSubmit}>
      <label>
        Collectible Name:
        <input type="text" value={collectibleName} onChange={handleNameChange} />
      </label>
      <label>
        Order Source:
        <input type="text" value={orderSource} onChange={handleOrderSourceChange} />
      </label>
      <label>
        Release Date:
        <input type="date" value={releaseDate} onChange={handleDateChange} />
      </label>
      <label>
        Comic Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
    </div>
    </div>
  );
};