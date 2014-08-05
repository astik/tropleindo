'use strict';

describe('Service: measureService', function () {

  // load the service's module
  beforeEach(module('tropleindoApp'));

  // instantiate service
  var measureService;
  beforeEach(inject(function (_measureService_) {
    measureService = _measureService_;
  }));

  it('should do something', function () {
    expect(!!measureService).toBe(true);
  });

});
