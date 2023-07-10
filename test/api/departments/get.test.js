const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../../../server.js');

chai.use(chaiHttp);
const request = chai.request;

describe('GET /api/departments', () => {
  it('/ should return all departments', () => {});

  it('/:id should return one department by :id ', () => {});

  it('/random should return one random department', () => {});
});
