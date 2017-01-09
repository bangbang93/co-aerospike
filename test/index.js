/**
 * Created by bangbang93 on 2017/1/9.
 */
'use strict';
const Aerospike = require('aerospike');
const coAerospike = require('../');

const client = Aerospike.connect({
  hosts: 'aerospike-dev.s.qima-inc.com'
});

coAerospike.client(client);

// console.log(client);

client.get(new Aerospike.Key('1', '1', '1'))
  // .then(console.log)
  .catch(console.error);