import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const App = () => {
  /**
   * user
   */
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  /**
   * profile editing
   */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [editSubmitButtonState, seteditSubmitButtonState] = useState('Сохранить');

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleUpdateUser = (data) => {
    seteditSubmitButtonState('Сохранение...');
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        seteditSubmitButtonState('Сохранить');
      });
  };
  /**
   * cards
   */
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  /**
   * new card adding
   */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [addCardSubmitButtonState, setAddCardSubmitButtonState] = useState('Сохранить');

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleAddPlace = (data) => {
    setAddCardSubmitButtonState('Сохранение...');
    api
      .addCard({
        name: data.name,
        link: data.link,
      })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setAddCardSubmitButtonState('Сохранить');
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };
  /**
   * avatar updating
   */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [avatarUpdateSubmitButtonState, setAvatarUpdateSubmitButtonState] = useState('Сохранить');

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleUpdateAvatar = (url) => {
    setAvatarUpdateSubmitButtonState('Сохранение...');
    api
      .updateAvatar(url)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setAvatarUpdateSubmitButtonState('Сохранить');
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then((res) => {
        const [userInfo, initialCards] = res;
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        submitButtonState={editSubmitButtonState}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        submitButtonState={addCardSubmitButtonState}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonState={avatarUpdateSubmitButtonState}
      />
      <ImagePopup
        name='pic-modal'
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
