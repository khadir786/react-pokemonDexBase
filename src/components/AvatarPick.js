import React, { useState } from "react";
import TrainerSprites from "./data/TrainerSpriteNames.js";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import '../css/avatar.css';

export default function TrainerImageGallery() {
  const trainers = TrainerSprites.data.trainers;
  const itemsPerPage = 20; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const openModal = (trainerName) => {
    setSelectedImage(trainerName);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderImages = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTrainers = trainers.slice(startIndex, endIndex);

    return currentTrainers.map((trainer) => (
      <li key={trainer.name} onClick={() => openModal(trainer.name)}>
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${trainer.name}.png`}
          alt={trainer.name}
          className="trainer-sprite"
        />
      </li>
    ));
  };

  return (
    <div className="Avatar-container">
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
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="modal"
      >
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${selectedImage}.png`}
          alt={selectedImage}
        />
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
}
