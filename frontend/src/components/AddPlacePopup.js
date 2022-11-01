import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [urlInput, setUrlInput] = useState('');
  const [cardTitle, setCardTitle] = useState('');

  const handleChangeUrl = (event) => {
    const newUrl = event.target.value;
    setUrlInput(newUrl);
  };

  const handleChangeTitle = (event) => {
    event.preventDefault();
    const newTitle = event.target.value;
    setCardTitle(newTitle);
  };

  useEffect(() => {
    if (isOpen) {
      setUrlInput('');
      setCardTitle('');
    }
  }, [isOpen]);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ cardTitle, urlInput });
  }

  return (
    <PopupWithForm
      name='newPlacePopup'
      title={`New place`}
      buttonText={`Create`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          value={cardTitle}
          onChange={handleChangeTitle}
          className="form__input"
          type="text"
          id="cardTitle"
          placeholder="Title"
          name="cardTitle"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="cardTitle-error form__input-error">
          Please fill out this field.
        </span>
        <input
          value={urlInput}
          onChange={handleChangeUrl}
          className="form__input"
          type="url"
          id="cardLink"
          placeholder="Image link"
          name="cardLink"
          required
        />
        <span className="cardLink-error form__input-error">
          Please enter a web address.
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
