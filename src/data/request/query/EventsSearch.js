'use es6';

import {List, Record} from 'immutable';

import Pagination from './Pagination';
import SortFilter from './SortFilter';
import Geolocation from './Geolocation';
import VenueProperties from './VenueProperties';
import Constants from '../../Constants';

let defaults = {
  ids: List(),
  venues: new VenuesFilter(),
  performers: List(),
  taxonomies: List(),
  filters: List(),
  geolocation: new Geolocation(),
  sort: new SortFilter(),
  perPage: Constants.getDefaultPerPage(),
  page: Constants.getDefaultPage(),
};

export default class EventsSearch extends Record(defaults) {
}
