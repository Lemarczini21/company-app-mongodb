const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });
  describe('Reading data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Employee #1',
        lastName: 'LastName #1',
        department: 'Dep #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Employee #2',
        lastName: 'LastName #2',
        department: 'Dep #2',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method.', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      const expectedFirstName = 'Employee #1';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });
  });

  describe('Creating data', () => {
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({
        firstName: 'Employee #3',
        lastName: 'LastName #3',
        department: 'Dep #3',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Employee #1',
        lastName: 'LastName #1',
        department: 'Dep #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Employee #2',
        lastName: 'LastName #2',
        department: 'Dep #2',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne(
        {
          firstName: 'Employee #1',
        },
        { $set: { firstName: '=Employee #1=' } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: '=Employee #1=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with save method,', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      employee.firstName = '=Employee #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=Employee #1=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employee = await Employee.find({ firstName: 'Updated!' });
      expect(employee.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Employee #1',
        lastName: 'LastName #1',
        department: 'Dep #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Employee #2',
        lastName: 'LastName #2',
        department: 'Dep #2',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: 'Employee #1',
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const employee = Employee.findOne({ firstName: 'Employee #1' });
      await employee.remove();
      const removeEmployee = await Employee.findOne({
        firstName: 'Employee #1',
      });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });
  });
});
