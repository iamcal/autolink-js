#!/usr/bin/node

var AL = require('./lib/autolink.js');

var a = new AL.AutoLink();
var inp = 'a b@c.com d';
var exp = 'a <a href="mailto:b@c.com">b@c.com</a> d';
var got = a.linkEmail(inp);

console.log("Input    : "+inp);
console.log("Expected : "+exp);
console.log("Got      : "+got);
