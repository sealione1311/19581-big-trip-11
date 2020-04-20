import {DESTINATION_CITIES, eventActionMap} from "../utils/const.js";
import {formatEventEditDate, getRandomBoolean} from "../utils/utils.js";
const createTypeMarkup = (types) => types.map((type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
}).join(`\n`);

const createdDestinationMarkup = (cities) => cities.map((city) => {
  return (
    `<option value="${city}"></option>`
  );
}).join(`\n`);

const createOffersMarkup = (offers) => offers.map((offer) => {

  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${getRandomBoolean() ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offer.id}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
  );
}).join(`\n`);

const createPhotosMarkup = (photos) => photos.map((photo) => {
  return (
    `<img class="event__photo" src="${photo}" alt="Event photo">`
  );
}).join(`\n`);

export const createPointEditForm = ({type, eventPrice, startDate, endDate, destination, destinationInfo, offers, destinationPhoto}) => {
  const transferTypes = (Object.keys(eventActionMap).slice(0, 7));
  const activityTypes = (Object.keys(eventActionMap).slice(7, 10));
  const typeTransferMarkup = createTypeMarkup(transferTypes);
  const typeActivityMarkup = createTypeMarkup(activityTypes);
  const destinationMarkup = createdDestinationMarkup(DESTINATION_CITIES);
  const eventStart = formatEventEditDate(startDate);
  const eventEnd = formatEventEditDate(endDate);
  const offersMarkup = offers !== null ? createOffersMarkup(offers) : ``;
  const action = eventActionMap[type];
  const photosMarkup = createPhotosMarkup(destinationPhoto);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${typeTransferMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${typeActivityMarkup}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type} ${action}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationMarkup}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersMarkup}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationInfo}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${photosMarkup}
          </div>
        </div>
      </section>
    </section>
  </form>`
  );
};