'use es6';

import Unit from '../../Unit';
import Genre from '../../Genre';
import Taxonomy from '../../Taxonomy';
import SortQuery from './SortQuery';
import FilterQuery from './FilterQuery';
import EventVenueQuery from './EventVenueQuery';

export default class QueryParameterBuilder{

  static buildVenueQueryParameters(cityName, stateCode, countryCode, postalCode,
                                   queryString, geoIp, latitude, longitude, range,
                                   unit, perPage, page) {
    let queryParameters = QueryParameterBuilder.buildGeolocationParameters(geoIp, latitude, longitude, range, unit);
    Object.assign(queryParameters,
                   QueryParameterBuilder.buildPlaceParameters(cityName, stateCode, countryCode, postalCode, queryString),
                   QueryParameterBuilder.buildPageParameters(perPage, page));

    return queryParameters;
  }

  static buildPerformerQueryParameters(ids, slug, primaryGenres, otherGenres, taxonomies, perPage, page) {
    let queryParameters = QueryParameterBuilder.buildPerformerAttributeParameters(ids, slug, primaryGenres, otherGenres, taxonomies);
    Object.assign(queryParameters, QueryParameterBuilder.buildPageParameters(perPage, page));

    return queryParameters;
  }

  static buildPerformerAttributeParameters(ids, slug, primaryGenres, otherGenres, taxonomies) {
    if (!(ids instanceof Array)) {
      throw new Error('ids must be an Array');
    }

    if ((typeof slug !== 'undefined') && (typeof slug !== 'string')) {
      throw new Error('defined slug must be String');
    }

    if (!(primaryGenres instanceof Array)) {
      throw new Error('primaryGenres must be an Array');
    }

    if (!(otherGenres instanceof Array)) {
      throw new Error('otherGenres must be an Array');
    }

    if (!(taxonomies instanceof Array)) {
      throw new Error('taxonomies must be an Array');
    }

    return {
      'id': ids,
      'taxonomies.id': QueryParameterBuilder.buildTaxonomyIds(taxonomies),
      'genres[primary].slug': QueryParameterBuilder.buildGenreSlugs(primaryGenres),
      'genres.slug': QueryParameterBuilder.buildGenreSlugs(otherGenres),
    }
  }

  static buildGenreSlugs(genres) {
    if (!(genres instanceof Array)) {
      throw new Error('genres must be an Array');
    }

    let genreSlugs = [];
    for (i = 0; i < genres.length; i++) {
      let genre = genres[i];
      if (!(genre instanceof Genre)) {
        throw new Error('all elements must be a Genre');
      }
      genreSlugs.push(genre.value);
    }
    return genreSlugs;
  }

  static buildTaxonomyIds(taxonomies) {
    if (!(taxonomies instanceof Array)) {
      throw new Error('taxnomies must be an Array');
    }

    let taxonomyIds = [];
    for (i = 0; i < taxonomies.length; i++) {
      let taxonomy = taxonomies[i];
      if (!(taxonomy instanceof Taxonomy)) {
        throw new Error('all elements must be a Taxonomy');
      }
      taxonomyIds.push(taxonomy.id);
    }
    return taxonomyIds;
  }

  static buildPageParameters(perPage, page) {
    if (typeof perPage !== 'number') {
      throw new Error('perPage must be a number');
    }

    if (typeof page !== 'number') {
      throw new Error('page must be a number');
    }

    return {
      per_page: perPage,
      page: page,
    };
  }

  static buildGeolocationParameters(geoIp, latitude, longitude, range, unit) {
    if (typeof geoIp !== 'boolean') {
      throw new Error('geoIp must be a boolean');
    }

    if (((typeof latitude !== 'undefined') && (typeof longitude === 'undefined'))
        || ((typeof latitude === 'undefined') && (typeof longitude !== 'undefined'))) {
      throw new Error('both latitude and longitude need to be defined or undefined');
    }

    if ((typeof latitude !== 'undefined') && (typeof latitude !== 'number')) {
      throw new Error('defined latitude must have a numeric value');
    }

    if ((typeof latitude !== 'undefined') && (typeof longitude !== 'number')) {
      throw new Error('defined longitude must have a numeric value');
    }

    if (typeof range !== 'number') {
      throw new Error('range must have a numeric value');
    }

    if (!(unit instanceof Unit)) {
      throw new Error('unit must be a Unit value');
    }

    return {
      geoIp: geoIp,
      lat: latitude,
      lon: longitude,
      range: String(range) + unit.value,
    };
  }

  static buildPlaceParameters(cityName, stateCode, countryCode, postalCode, queryString) {
    if ((typeof cityName !== 'undefined') && (typeof cityName !== 'string')) {
      throw new Error('cityName must be a string value');
    }

    if ((typeof stateCode !== 'undefined') && (typeof stateCode !== 'string')) {
      throw new Error('stateCode must be a string of length 2');
    }

    if ((typeof stateCode === 'string') && (stateCode.length != 2)) {
      throw new Error('stateCode must be a string of length 2');
    }

    if ((typeof countryCode !== 'undefined') && (typeof countryCode !== 'string')) {
      throw new Error('countryCode must be a string of length 2');
    }

    if ((typeof countryCode === 'string') && (countryCode.length != 2)) {
      throw new Error('countryCode must be a string of length 2');
    }

    if ((typeof postalCode !== 'undefined') && (typeof postalCode !== 'string')) {
      throw new Error('postalCode must be a string value');
    }

    if ((typeof queryString !== 'undefined') && (typeof queryString !== 'string')) {
      throw new Error('queryString must be a string value');
    }

    return {
      city: cityName,
      state: stateCode,
      country: countryCode,
      postal_code: postalCode,
      q: queryString
    };
  }

  static buildEventsQueryParameters(taxonomies, performerSlugs, venueIds, cityName, stateCode, countryCode, postalCode, geoIp, latitude, longitude, range, unit, sortOption, sortDirection, filterOption, operator, filterValue, perPage, page) {
    let eventVenueQuery = new EventVenueQuery(venueIds, cityName, stateCode, countryCode, postalCode);
    let sortQuery = new SortQuery(sortOption, sortDirection);
    let filterQuery = new FilterQuery(filterOption, operator, filterValue);

    if (!(performerSlugs instanceof Array)) {
      throw new Error('performerSlugs must be an Array');
    }

    if (!(taxonomies instanceof Array)) {
      throw new Error('taxonomies must be an Array');
    }

    let taxonomyIds = [];
    for (var i = 0; i < taxonomies.length; i++) {
      let taxonomy = taxonomies[i];

      if (!(taxonomy instanceof Taxonomy)) {
        throw new Error('taxonomies must consist of Taxonomy objects');
      }

      taxonomyIds.push(taxonomy.id);
    }

    let queryParameters = {
      'performers.slug': performerSlugs,
      'taxonomies.id': taxonomyIds,
    };

    Object.assign(queryParameters,
                  sortQuery.buildQueryParameters(),
                  filterQuery.buildQueryParameters(),
                  eventVenueQuery.buildQueryParameters(),
                  QueryParameterBuilder.buildGeolocationParameters(geoIp, latitude, longitude, range, unit),
                  QueryParameterBuilder.buildPageParameters(perPage, page));

    return queryParameters;
  }
};
