# autolink-js - JS link formatting library

[![Build Status](https://travis-ci.org/iamcal/autolink-js.svg)](https://travis-ci.org/iamcal/autolink-js)
[![Coverage Status](https://coveralls.io/repos/iamcal/autolink-js/badge.svg)](https://coveralls.io/r/iamcal/autolink-js)

This library helps to detect URLs (and email addresses) in text, and turn them into links.
It is based on the original PHP version here: https://github.com/iamcal/lib_autolink


## Installation

Either clone the git repo, or `npm install autolink-js`


## Usage


```html
<script src="autolink.min.js" type="text/javascript"></script>
<script type="text/javascript">

var a = new AutoLink();

// turn some text into linkified HTML
var html = a.link(text);

// also link up email addresses
html = a.linkEmail(text);


// TODO: document options

</script>
```


## Version History

See [CHANGES.md](CHANGES.md)
