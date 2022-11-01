import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  card,
  link,
  name,
  likes,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = likes.some((user) => user._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__card">
      <div
        className="gallery__card-image"
        style={{ backgroundImage: `url(${link})` }}
        aria-label={`Picture of ${name}`}
        onClick={handleClick}
      />
      <div className="gallery__card-container">
        <h2 className="gallery__card-title">{name}</h2>
        <div className="gallery__card-likes-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={
              isLiked ? "gallery__card-button_active" : "gallery__card-button"
            }
          />
          <p className="gallery__card-likes-counter">{likes.length}</p>
        </div>
      </div>
      {card.owner._id === currentUser._id && (
        <button
          type="button"
          className="gallery__delete-card"
          onClick={handleCardDelete}
        />
      )}
    </li>
  );
}

export default Card;
