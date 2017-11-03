# co-aerospike

[![Greenkeeper badge](https://badges.greenkeeper.io/bangbang93/co-aerospike.svg)](https://greenkeeper.io/)

## Usage
```javascript
const Aerospike = require('aerospike');
const coAerospike = require('co-aerospike');

const client = Aerospike.connect({
  hosts: 'localhost'
});

coAerospike.client(client);

let key = new Key('test', 'co-aerospike', '1');

client.put(key, {a: 1})
  .then(()=>{
    return client.get(key)
  })
  .then((res)=>{
    console.log(res.a);
  })
  .then(()=>{
    client.put(key, {b: 1}, function(err) {
      if (err) throw err;
    });   //compatible with callback,but will not return promise
  })
```

## Set promise
```javascript
const coAerospike = require('co-aerospike');
const Promise = require('bluebird');

coAerospike.Promise = Promise;

// client.get(key) instanceof Promise;
```

## Sync function
Some method of client is sync, doesn't need callback
['LargeList', 'close', 'info', 'isConnected', 'query', 'scan', 'sendError', 'updateLogging']
Those method will not be promisify