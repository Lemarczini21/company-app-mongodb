const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no "firstName", "lastName", "department" arg', () => {
    const emp = new Employee({
      firstName: {},
      lastName: {},
      Department: {},
    });

    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const emp = new Employee({
        firstName: name,
        lastName: name,
        department: name,
      });

      emp.validate((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });
  it('should not throw an error if "firstName", "lastName", "department" is ok ', () => {
    const cases = [{ firstName: 'John', lastName: 'Doe', department: 'Ads' }];
    const emp = new Employee({
      firstName: cases[0].firstName,
      lastName: cases[0].lastName,
      department: cases[0].department,
    });

    emp.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
