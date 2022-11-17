import React, { useState, useEffect } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import { checkToken } from "../utils/auth";

function App() {
  const [pendingAuth, setPendingAuth] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddNewPlacePopupOpen, setIsAddNewPlacePopupOpen] = useState(false);
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] =
    useState(false);
  const [cardForRemoval, setCardForRemoval] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const history = useHistory();

  

  function handleLoggedUser() {
    const token = localStorage.getItem('jwt');
    
    if(token){
      checkToken( {token} )
      .then((userData) => {
    
        setLoggedIn(true);
        setToken(token)
        setCurrentUser({ ...userData['data'] });
        history.push('/profile');
      })
      .catch(() => {
        setLoggedIn(false);
        history.push('/signin')
      })
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.find((user) => user === currentUser._id);
  
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards([
          ...cards.map((item) => {
            if (item._id === card._id) {
              return res['card'];
            } else {
              return item;
            }
          }),
        ]);
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddNewPlaceClick() {
    setIsAddNewPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddNewPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsPopupWithImageOpen(false);
    setIsPopupWithConfirmationOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setIsPopupWithImageOpen(true);
    setSelectedCard(card);
  }

  function handleAddNewPlaceSubmit({ urlInput, cardTitle }) {
    const cardData = {
      title: cardTitle,
      image: urlInput,
    };
    api
      .addCard(cardData)
      .then((res) => {
        setCards([res['data'], ...cards]);
        setIsAddNewPlacePopupOpen(false);
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
  }

  function onCardRemove(card) {
    setIsPopupWithConfirmationOpen(true);
    setCardForRemoval(card);
  }

  function handleConfirmSubmit(e) {
    e.preventDefault();
    api
      .deleteCard(cardForRemoval._id, token)
      .then(() => {
        setIsPopupWithConfirmationOpen(false);
        setCards([...cards.filter((card) => card._id !== cardForRemoval._id)]);
        setCardForRemoval({});
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
  }

  function handleEditAvatarSubmit({ avatarLink }) {
    const data = {
      avatarLink: avatarLink,
    };

    api
      .addUserAvatar(data, token)
      .then((res) => {
        console.log(res)
        setCurrentUser({ ...currentUser, avatar: res['user'].avatar });

        setIsEditAvatarPopupOpen(false);
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
  }

  function handleEditProfileSubmit({ name, job }) {
    const data = {
      name: name,
      about: job,
    };

    api
      .addUserInfo(data, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res['user'].name, about: res['user'].about });

        setIsEditProfilePopupOpen(false);
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
  }

  useEffect(() => {
    if(loggedIn && cards.length < 1){
      api
        .getCards()
        .then((response) => {
          setCards(response['data']);
        })
        .catch((res) => {
          console.log(`Error! + ${res.statusText}`);
        });
    }
  },[cards,loggedIn])

  useEffect(() => {
    if(loggedIn && token){

      api._refreshToken()

      api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
      })
      .catch((res) => {
        console.log(`Error! + ${res.statusText}`);
      });
      
      
        api
        .getCards()
        .then((response) => {
          setCards(response['data']);
        })
        .catch((res) => {
          console.log(`Error! + ${res.statusText}`);
        });
      

    }
  }, [token]);

  useEffect(() => {
    if (pendingAuth) {
      setPendingAuth(false);
      handleLoggedUser();
    }
  }, [pendingAuth]);

  const UserProfile = () => {
    return (
      <>
        <Main
          onAddNewPlaceClick={handleAddNewPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={onCardRemove}
          onCardLike={handleCardLike}
          cards={cards}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditAvatarSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
        />

        <AddPlacePopup
          isOpen={isAddNewPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddNewPlaceSubmit}
        />

        <ImagePopup
          isOpen={isPopupWithImageOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <PopupWithConfirmation
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmSubmit}
        />
      </>
    );
  };

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header isAuthorized={loggedIn} onLogOut={handleLoggedUser} />
          <Switch>
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to="/profile" />
              ) : (
                <Redirect to="/signup" />
              )}
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLoggedUser} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleLoggedUser} />
            </Route>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <UserProfile />
            </ProtectedRoute>
            <Route path="*">
              <p>Not Found</p>
            </Route>
            <Footer />
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
