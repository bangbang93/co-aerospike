/**
 * Created by bangbang93 on 2017/1/9.
 */
'use strict';
const slice = Array.prototype.slice;

exports.client = function (client) {
  let proto = client.__proto__;
  if (proto.constructor.name != 'Client') {
    throw new TypeError('argument must be aerospike client');
  }
  let fnNames = Object.keys(proto);
  fnNames.forEach((fnName)=>{
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
        // console.log(args);
        proto[fnName].apply(client, args);
      })
    }
  });
  return client;
};