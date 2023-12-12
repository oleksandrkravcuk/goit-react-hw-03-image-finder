import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { searchImages } from './Api';
import styles from './styles.css';

export const App = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(() => {
    if (!name) return;

    setLoading(true);

    searchImages(name, page)
      .then(({ images: newImages, totalImages: newTotalImages }) => {
        if (newTotalImages) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        } else {
          alert('Нічого не знайдено');
        }
      })
      .catch((error) => error)
      .finally(() => setLoading(false));
  }, [name, page]);

  useEffect(() => {
    fetchData();
  }, [name, page, fetchData]);

  const handleSearchSubmit = (newName) => {
    if (newName !== name) {
      setName(newName);
      setPage(1);
      setImages([]);
      fetchData();
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal isOpen={showModal} image={modalImage} onClose={handleCloseModal} />}
    </div>
  );
};