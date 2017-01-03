#!/usr/bin/env node
// 06.3724836

require('colors');

const http = require('http');
// const os = require('os');
const clear = require('clear');

// Local Modules
const dayName = require('./libs/dayname');
const monthName = require('./libs/month');
const username = require('./libs/username');

var address,
    ifaces = require('os').networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}
// QUESTION: why not os.networkInterfaces().en0[1].address instead of this one?


var d = new Date;
var h = d.getHours();

var data = monthName(d.getMonth()) + ' ' + d.getDate() + ' ' + d.getFullYear();
// var username = os.userInfo().username.toUpperCase().magenta.bold;

if ( ret(h > 3) && ret(h < 12) ) {
  clear();
  console.log(`Good morning, ${username().toUpperCase().magenta}! It's ${dayName(d.getDay()).green}, ${data}`);
} else if ( ret(h > 11) && ret(h < 16) ) {
  clear();
  console.log(`Good afternoon, ${username().toUpperCase().magenta}! It's ${dayName(d.getDay()).green}, ${data}`);
} else {
  clear();
  console.log(`Good evening, ${username().toUpperCase().magenta}! It's ${dayName(d.getDay()).green}, ${data}`);
}

var req = http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    console.log('');
    console.log('LOCAL: '.magenta + `[ ${address.toString().yellow} ]`);
    console.log('PUBLIC: '.magenta + `[ ${ip.toString().yellow} ]`);
    console.log('');
  });
});

req.on('error', (err) => {
  if (err) {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
  }
})

// Function to return boolean
function ret(x) {
  if (x) {
    return true
  } else {
    return false
  }
}
