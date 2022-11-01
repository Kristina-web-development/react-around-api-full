import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onSubmit }) {
  const avatarLink = useRef("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSubmit({ avatarLink: avatarLink.current.value });
  };

  useEffect(() => {
    if (isOpen) {
      avatarLink.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatarPopup"
      title="Change profile picture"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          ref={avatarLink}
          className="form__input"
          type="url"
          id="avatarLink"
          placeholder="Image link"
          name="avatarLink"
          required
        />
        <span className="avatarLink-error form__input-error">
          Please fill out this field.
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
