/**
 * Created by bangbang93 on 2017/1/9.
 */
'use strict';
const slice = Array.prototype.slice;
let Promise = global.Promise;

const SYNC_FUNC = ['LargeList', 'close', 'info', 'isConnected', 'query', 'scan', 'sendError', 'updateLogging'];

exports.client = function (client) {
  let proto = client.__proto__;
  if (proto.constructor.name != 'Client') {
    throw new TypeError('argument must be an aerospike client');
  }
  let fnNames = Object.keys(proto);
  fnNames.forEach((fnName)=>{
    if (SYNC_FUNC.indexOf(fnName) !== -1) return;
    client[fnName] = function () {
      let args = slice.call(arguments);
      if (typeof args[args.length - 1] == 'function'){
        return proto[fnName].apply(client, args);
      }
      return new Promise(function (resolve, reject) {
        args.push(function (err, result) {
          if (err) return reject(err);
          return resolve(result);
        });
        proto[fnName].apply(client, args);
      })
    }
  });
  return client;
};

Object.defineProperty(exports, 'Promise', {
  set: function (value) {
    Promise = value;
  },
  get: function () {
    return Promise;
  }
});