import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getCards()
      .then((res) => { setCards(res) })
      .catch((error) => console.log(error))
  }, []
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.like(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((i) => i !== card));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => { setCurrentUser(res) })
      .catch((error) => console.log(error))
  }, []
  );

  function handleUpdateUser(data) {

    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(data) {

    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsAddPlacePopupOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body-background">
        <div className="page-container">
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm name="delete" title="Вы уверены?" placeholder="Да" />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
