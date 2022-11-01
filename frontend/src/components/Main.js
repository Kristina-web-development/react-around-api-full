import React, { useContext } from "react";

import Card from "../components/Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__image-container"
            onClick={props.onEditAvatarClick}
          >
            <button className="profile__image-overlay" />
            <img
              src={currentUser.avatar}
              alt="profile"
              className="profile__image"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__open-button"
              onClick={props.onEditProfileClick}
            />
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          id="newPlaceButton"
          onClick={props.onAddNewPlaceClick}
          type="button"
          className="profile__add-button"
        />
      </section>

      <section className="gallery">
        <ul className="gallery__container">
          {props.cards.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              likes={card.likes}
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
