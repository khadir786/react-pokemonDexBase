import React, { useState } from "react";
import TrainerSprites from "./data/TrainerSpriteNames.js";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import '../css/avatar.css';

export default function TrainerImageGallery() {
  const trainers = TrainerSprites.data.trainers;
  const itemsPerPage = 20; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(trainers[0].name);
  const [selectedModalImage, setSelectedModalImage] = useState(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const openModal = (trainerName) => {
    setSelectedModalImage(trainerName);
  };

  const closeModal = () => {
    setSelectedModalImage(null);
  };

  const renderImages = () => {
    // create an array with the sprites to be currently shown 
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTrainers = trainers.slice(startIndex, endIndex);

    return currentTrainers.map((trainer) => (
      <li key={trainer.name} onClick={() => {
        setSelectedImage(trainer.name);
      }
      }>
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${trainer.name}.png`}
          alt={trainer.name}
          className={`trainer-sprite ${trainer.name === selectedImage ? 'active' : 'notActive'}`}
        />
      </li>
    ));
  };

  return (
    <div className="Avatar-container">

      <div className="selected-avatar">
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${selectedImage}.png`}
          alt={selectedImage}
          onClick={() => openModal(selectedImage)}
        />
      </div>

      <ul className="trainer-list">{renderImages()}</ul>

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={Math.ceil(trainers.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      <ReactModal
        isOpen={selectedModalImage !== null}
        onRequestClose={closeModal}
        appElement={document.getElementById('root')}
        ariaHideApp={false}
        className="modal"
      >
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${selectedModalImage}.png`}
          alt={selectedModalImage}
        />
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
}
