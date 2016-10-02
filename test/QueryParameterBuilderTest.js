'use es6';

import {expect} from 'chai';

import QueryParameterBuilder from '../src/data/request/query/QueryParameterBuilder';
import Taxonomy from '../src/data/Taxonomy';
import Genre from '../src/data/Genre';
import Unit from '../src/data/Unit';

describe('Test QueryParameterBuilder', function() {
  let cityName = 'Boston';
  let stateCode = 'MA';
  let countryCode = 'US';
  let postalCode = '02143';
  let queryString = 'jae';
  let latitude = 1;
  let longitude = 2;
  let range = 3;
  let unit = Unit.MILE;
  let perPage = 4;
  let page = 5;

  it('tests venue query parameters', function() {
    let expectedDefaultParameters = {
      city: undefined,
      state: undefined,
      country: undefined,
      postal_code: undefined,
      q: undefined,
      geoIp: true,
      lat: undefined,
      lon: undefined,
      range: '1mi',
      per_page: perPage,
      page: page,
    };
    expect(QueryParameterBuilder.buildVenueQueryParameters(undefined, undefined, undefined, undefined,
                                                           undefined, true, undefined, undefined,
                                                           1, Unit.MILE, perPage, page)).to.eql(expectedDefaultParameters);

   let expectedCustomParameters = {
     city: cityName,
     state: stateCode,
     country: countryCode,
     postal_code: postalCode,
     q: queryString,
     geoIp: undefined,
     lat: latitude,
     lon: longitude,
     range: '3mi',
     per_page: perPage,
     page: page,
   };

   expect(QueryParameterBuilder.buildVenueQueryParameters(cityName, stateCode, countryCode, postalCode,
                                                          queryString, false, latitude, longitude,
                                                          range, unit, perPage, page)).to.eql(expectedCustomParameters);
  });

  it('tests performer query parameters', function() {
    let expectedDefaultParameters = {
      id: [],
      slug: undefined,
      'genres[primary].slug': [],
      'genres.slug': [],
      'taxonomies.id': [],
      'taxonomies.parent_id': [],
      q: undefined,
      per_page: perPage,
      page: page,
    };
    expect(QueryParameterBuilder.buildPerformerQueryParameters([], undefined, [], [], [],
                                                               [], undefined, perPage, page)).to.eql(expectedDefaultParameters);

    let ids = [1, 2, 3, 4];
    let slug = 'jae';
    let genre1 = Genre.COUNTRY;
    let genre2 = Genre.ROCK;
    let genre3 = Genre.POP;
    let taxonomy1 = Taxonomy.NFL_FOOTBALL;
    let taxonomy2 = Taxonomy.NBA_BASKETBALL;
    let taxonomy3 = Taxonomy.SPORTS;
    let primaryGenres = [Genre.COUNTRY, Genre.ROCK];
    let primaryGenreSlugs = [Genre.]
    let otherGenres = [Genre.POP];
    let taxonomies = [Taxonomy.NFL_FOOTBALL, Taxonomy.NBA_BASKETBALL];
    let parentTaxonomies = [Taxonomy.SPORTS];
    let expectedCustomParameters = {
      id:
    };
  });

  it('tests build taxonomy ids', function() {
    let taxonomy1 = Taxonomy.SPORTS;
    let taxonomy2 = Taxonomy.LITERARY;
    let defaultTaxonomies = [taxonomy1, taxonomy2];
    let expectedTaxonomyIds = [taxonomy1.id, taxonomy2.id];
    expect(QueryParameterBuilder.buildTaxonomyIds(defaultTaxonomies)).to.eql(expectedTaxonomyIds);
    expect(QueryParameterBuilder.buildTaxonomyIds([])).to.eql([]);
  });

  it('tests exceptional cases when building taxonomy ids', function() {
    expect(() => QueryParameterBuilder.buildTaxonomyIds([1, 2, 3])).to.throw(Error);
  });

  it('tests building genre slugs', function() {
    let genre1 = Genre.ROCK;
    let genre2 = Genre.POP;
    let defaultGenres = [genre1, genre2];
    let expectedGenreSlugs = [genre1.slug, genre2.slug];
    expect(QueryParameterBuilder.buildGenreSlugs(defaultGenres)).to.eql(expectedGenreSlugs);
    expect(QueryParameterBuilder.buildGenreSlugs([])).to.eql([]);
  });

  it('tests exceptional cases when building genre slug', function() {
    expect(() => QueryParameterBuilder.buildGenreSlugs([1, 2, 3])).to.throw(Error);
  });
});
