import {IError, errorHandler} from '../error.handler';
//import {Request, Response, NextFunction} from 'express';
import {request, response} from 'express';
import express from 'express';
//import {request} from 'supertest';
//console.log(express);
//import { Request } from 'jest-express/lib/request';

/*
let request;

describe('Endpoint', () => {
  beforeEach(() => {
    request = new Request('/users?sort=desc', {
      headers: {
        Accept: 'text/html'
      }
    });
  });

  afterEach(() => {
    request.resetMocked();
  });

  test('should setup endpoint', () => {
    endpoint(request);

    expect(request).toBeCalled();
  });
});
*/
describe.skip('Error handler middleware:', () => {
    test('426 status retured - success', () => {
        const err: IError = {
            status: 426,
            message: 'error 426',
        };
        //const req = new Request('/somestupidpath');
        /*
        const out = {
          message: 'error 426';
        };
        request(...).get();
        */
        expect(errorHandler(err, request, response, () => {})).toBe(false);
    });
});
