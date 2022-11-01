import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext, useEffect,  useState } from "react";

function EditProfilePopup({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleChangeName = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleChangeJob = (event) => {
    const newJob = event.target.value;
    setJob(newJob);
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ name, job });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || '');
      setJob(currentUser.about || '');
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profilePopup"
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          value={name}
          onChange={handleChangeName}
          className="form__input"
          type="text"
          id="name"
          placeholder="name"
          name="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-error form__input-error">
          Please fill out this field.
        </span>
        <input
          value={job}
          onChange={handleChangeJob}
          className="form__input"
          type="text"
          id="job"
          placeholder="job"
          name="job"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="job-error form__input-error">
          Please fill out this field.
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
