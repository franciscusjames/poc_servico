import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import sinonChai = require('sinon-chai');

chai.use(chaiHttp);

export const assert = chai.assert;
export const expect = chai.expect;
export const request = chai.request(process.env.TEST_URL_INTEGRATION);
export const should = chai.should;
export const sandbox = sinon.createSandbox();
