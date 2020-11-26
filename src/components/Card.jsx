import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Card = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `photo-elements__delete-button ${!isOwn && 'photo-elements__delete-button_hidden'}`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-elements__like-button ${isLiked && 'photo-elements__like-button_active'}`;

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <li className='photo-elements__item'>
      <img
        className='photo-elements__image'
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />

      <div className='photo-elements__caption'>
        <h2 className='photo-elements__text'>{props.card.name}</h2>
        <div className='photo-elements__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Нравится'
            onClick={()=> {
              props.onCardLike(props.card)
            }}
          ></button>
          <p className='photo-elements__like-counter'>
            {props.card.likes.length}
          </p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          aria-label='Удалить'
          onClick={() => {
            props.onCardDelete(props.card)
          }}
        ></button>
      </div>
    </li>
  );
});

export default Card;
