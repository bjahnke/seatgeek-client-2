'use es6';

import {expect} from 'chai';

import {List} from 'immutable';

import Taxonomy from '../src/data/Taxonomy';
import TaxonomyFilter from '../src/data/request/query/TaxonomyFilter';
import TaxonomyField from '../src/data/TaxonomyField';
import TaxonomyFiltersParametersBuilder from '../src/data/request/query/builders/TaxonomyFiltersParametersBuilder';

describe('Test Taxonomy Filters Parameter Builder', function() {
  it('tests parameter building', function() {
    let filter = new TaxonomyFilter({taxonomy: Taxonomy.SPORTS, field: TaxonomyField.ID});
    let parameters = TaxonomyFiltersParametersBuilder.build([filter]);
    expect(parameters.get('taxonomies.id').toJS()).to.eql([Taxonomy.SPORTS.id]);
  });
});