require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity\/test\/helpers)/
});
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: "8500",
      network_id: "*",
      gas: 7984452,
      gasPrice: 2000000000
    }
  }
};
