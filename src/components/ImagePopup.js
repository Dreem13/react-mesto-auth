function ImagePopup(props) {

  return (
    <div className={`popup ${props.card && 'popup_open'}`}>
      <div className="popup__overlay" onClick={props.onClose} />
      <div className="popup__figure-container">
        <figure className="popup__figure">
          <img className="popup__image" src={props.card?.link} alt={`картинка ${props.card?.name}`} />
          <figcaption className={props.card && props.card.name}></figcaption>
        </figure>
        <button type="button" className="popup__close popup__close_image" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;