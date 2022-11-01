function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_active"
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className="popup__form-container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="form popup__form"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <fieldset className="form__fieldset-button">
              <button type="submit" className="form__button">
                {props.buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
