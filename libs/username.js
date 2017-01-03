module.exports = () => {
  'use strict';

  // Modules
  const os = require('os');

  // variables
  var username = os.userInfo().username;

  // Return
  return username
}
