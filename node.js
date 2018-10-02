#!/usr/bin/node

var AL = require('./lib/autolink.js');

var a = new AL.AutoLink();
console.log(a.link("Hello http://iamcal.com world"));
