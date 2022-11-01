import React from "react";
import successAuth from "../images/SuccessAuth.svg";
import authError from "../images/AuthErr.svg";

function InfoTooltip(props) {
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
        />
        <div className="popup__form-container-auth">
          <img
            className="popup__image"
            alt="Status"
            src={props.isSuccess ? successAuth : authError}
          />
          <p className="popup__message">{props.message}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
