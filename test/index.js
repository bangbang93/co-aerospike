/**
 * Created by bangbang93 on 2017/1/9.
 */
'use strict';
const Aerospike = require('aerospike');
const coAerospike = require('../');
require('should');
const Promise = require('bluebird');

const client = Aerospike.connect({
  hosts: 'aerospike-dev.s.qima-inc.com'
});

describe('co-aerospike', function () {
  it('init', function () {
    coAerospike.client(client);
  });
  it('throw error with wrong client', function () {
    try{
      coAerospike.client({});
    } catch(e){
      e.message.should.eql('argument must be an aerospike client');
    }
  });
  let date = new Date().valueOf();
  let key = new Aerospike.Key('test', 'co-aerospike', '1');
  it('put', function () {
    let res = client.put(key, {
      date
    });
    res.should.instanceOf(global.Promise);
    return res;
  });
  it('set promise', function () {
    coAerospike.Promise = Promise;
    coAerospike.Promise.should.eql(Promise);
  });
  it('get', function () {
    let res = client.get(key);
    res.should.instanceOf(Promise);
    return res.then((res)=>{
      return res.date.should.eql(date);
    });
  });
  it('get some not exists', function () {
    return client.get(new Aerospike.Key('test', 'co-aerospike', '2'))
      .catch((err)=>{
        err.message.should.eql('AEROSPIKE_ERR_RECORD_NOT_FOUND');
      });
  });
  it('compatible with callback', function (done) {
    client.get(key, function (err, res) {
      if (err) return done(err);
      res.date.should.eql(date);
      done();
    })
  });
});