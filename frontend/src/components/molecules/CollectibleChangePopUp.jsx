import { useState } from "react";
import Modal from 'react-modal';
import '../../General.css';


export default function CollectibleChangePopUp({collectibleName, collectibleReleaseDate, collectibleId, collectibleOrderSource}){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(collectibleName);
    const [releaseDate, setReleaseDate] = useState(collectibleReleaseDate);
    const [orderSource, setOrderSource] = useState(collectibleOrderSource)


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleReleaseDateChange = (event) => {
        setReleaseDate(event.target.value);
    };

    const handleOrderSourceChange = (event) => {
        setOrderSource(event.target.value);
    };


    const handleEdit = () => {
        fetch(`http://localhost:8080/collectibles/${collectibleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
              },
            body: JSON.stringify({ name: name, releaseDate: releaseDate, orderSource: orderSource })
        }).then(response => {
            if (response.ok) {
                window.location.reload();
                alert('Collectible updated successfully!');
            } else {
                alert('Failed to update comic.');
            }
            closeModal();
        });
    };

    return(
        <div>
            <button onClick={openModal}>Edit</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-content'> 
                <h2>Edit Comic</h2>
                <form>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Order Source
                        <input type="text" value={orderSource} onChange={handleOrderSourceChange} />
                    </label>
                    <label>
                        Release Date:
                        <input type="date" value={releaseDate} onChange={handleReleaseDateChange} />
                    </label>
                </form>
                <button onClick={closeModal} className="modal-button">Cancel</button>
                <button onClick={handleEdit} className="modal-button">Edit</button>
            </Modal>
        </div>
    );
};