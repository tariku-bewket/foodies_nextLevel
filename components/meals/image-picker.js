'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();

  const handlePickImage = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt='Your picked image' fill />
          )}
        </div>
        <input
          className={classes.input}
          type='file'
          accept='image/png image/jpeg'
          id={name}
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
      </div>
      <button
        className={classes.button}
        type='button'
        onClick={handlePickImage}
      >
        Pick an Image
      </button>
    </div>
  );
}
