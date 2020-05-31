import {getPointsByFilter} from "../utils/filters.js";
import {FilterType} from "../utils/const.js";

export default class PointsModel {
  constructor() {
    this._points = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._destinations = [];
    this._offers = [];
  }

  getFiltredPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPoints() {
    return this._points;
  }

  getOffers() {
    return this._offers;
  }

  getOffersbyType(type) {
    return ((this._offers.filter((offer) => offer.type === type)).map((it) => it.offers))[0];
  }

  getDestinations() {
    return this._destinations;
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDestinations(destinations) {
    this._destinations = destinations ? Array.from(destinations) : [];
  }

  addPoint(point) {

    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((point) => point.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((pointItem) => pointItem.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);

  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
