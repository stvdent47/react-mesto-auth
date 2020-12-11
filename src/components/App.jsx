import React, { useState, useEffect } from 'react';
import Main from './Main.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

const App = () => {
  /**
   * user states
   */
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '' });
  /**
   * profile editing
   */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [editSubmitButtonState, seteditSubmitButtonState] = useState('Сохранить');

  const openEditProfileModal = () => {
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

  const openAddPlaceModal = () => {
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

  const openEditAvatarModal = () => {
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
  /**
   * signup / login functionality
   */
  const history = useHistory();
  const handleLogin = (email, password) => {
    auth
      .signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserData({
            email,
          });
          setLoggedIn(true);
          history.push('/feed');
        }
      })
      .catch((err) => console.error(err));
  };

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupResult, setSignupResult] = useState(false);
  const [resultText, setResultText] = useState('');

  const closeSignupModal = () => {
    if (signupResult) {
      setIsSignupModalOpen(false);
      setResultText('');
      history.push('/signin');
    } else {
      setIsSignupModalOpen(false);
      setResultText('');
    }
  };

  const handleSignup = (email, password) => {
    auth
      .signup(email, password)
      .then(() => {
        setSignupResult(true);
        setResultText('Вы успешно зарегистрировались!');
        setIsSignupModalOpen(true);
      })
      .catch((err) => {
        setResultText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsSignupModalOpen(true);
        console.error(err);
      });
  };
  /**
   * checking jwt token when reloading page
   */
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              email: res.email,
            });
            setLoggedIn(true);
            history.push('/feed');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setUserData({
      email: '',
    });
    setLoggedIn(false);
  };

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then((res) => {
        const [userInfo, initialCards] = res;
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.error(err));
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path='/signin'>
          <Login handleLogin={handleLogin} />
        </Route>

        <Route exact path='/signup'>
          <Register
            handleSignup={handleSignup}
            signupResult={signupResult}
            isSignupModalOpen={isSignupModalOpen}
            onClose={closeSignupModal}
            resultText={resultText}
          />
        </Route>

        <ProtectedRoute
          path='/feed'
          component={Main}
          loggedIn={loggedIn}
          userData={userData}
          onEditProfile={openEditProfileModal}
          onAddPlace={openAddPlaceModal}
          onEditAvatar={openEditAvatarModal}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleSignOut={handleSignOut}
        />

        <Route exact path='/'>
          {loggedIn ? <Redirect to='/feed' /> : <Redirect to='/signin' />}
        </Route>

        <Route path='/*'>{loggedIn ? <Redirect to='/feed' /> : <Redirect to='/signin' />}</Route>
      </Switch>

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
