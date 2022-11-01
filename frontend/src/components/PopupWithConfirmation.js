import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({ isOpen, onClose, onSubmit }) {
  return (
    <PopupWithForm
      name="deletePicture"
      title="Are you sure?"
      buttonText="Yes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
   />
  );
}

export default PopupWithConfirmation;
