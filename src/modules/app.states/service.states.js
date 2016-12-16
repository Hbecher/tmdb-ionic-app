/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q, httpService, i18nService) {
    var service = this;

    service.search = function (query) {
      return httpService.get('/3/search/movie', {
        language: i18nService.getLocale(),
        api_key: API_KEY,
        query: query
      }).then(function (data) {
        return data.results;
      });
    };

    service.getMovie = function(id) {
      return httpService.get('/3/movie' + id, {
        language: i18nService.getLocale(),
        api_key: API_KEY
      });
    }

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$q',
    'httpService',
    'i18nService',
    StatesService
  ]);

}(angular.module('app.states')));
