'use es6';

import {List, Map} from 'immutable';

import PerformerFilter from '../PerformerFilter';
import PerformersFilters from '../PerformersFilters';

export default class PerformersFiltersParametersBuilder {
  static build(filters) {
    if (!(filters instanceof PerformersFilters)) {
      throw new TypeError('must be a PerformersFilter instance');
    }

    let parameters = Map();
    if (typeof filters.ids !== 'undefined') {
      parameters = parameters.set(PerformersFiltersParametersBuilder.getIdsParameterName(),
                                  filters.ids);
    }

    filters.filters.forEach(function(filter) {
      if (!(filter instanceof PerformerFilter)) {
        throw new TypeError('must be a PerformerFilter instance');
      }

      if (typeof filter.value !== 'undefined') {
        let parameterName =PerformersFiltersParametersBuilder.buildParameterName(filter);
        let parameterValues = parameters.has(parameterName) ? parameters.get(parameterName) : new List();
        parameterValues = parameterValues.push(filter.value);
        parameters = parameters.set(parameterName, parameterValues);
      }
    });

    return parameters;
  }

  static buildParameterName(filter) {
    if (!(filter instanceof PerformerFilter)) {
      throw new TypeError('must be a PerformerFilter instance');
    }

    return `performers[${filter.specificity.value}].${filter.field.value}`;
  }

  static getIdsParameterName() {
    return 'id';
  }
}