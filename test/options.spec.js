describe("Handles options", function(){

	var a = new AutoLink();

	it("Supports tagfill", function(){
		a.tagFill = '';
		autolink_harness(a, 'a www.abc.com b', 'a <a href="http://www.abc.com">www.abc.com</a> b');

		a.tagFill = ' class="foo"';
		autolink_harness(a, 'a www.abc.com b', 'a <a href="http://www.abc.com" class="foo">www.abc.com</a> b');
	});


	it("Supports truncatation (with and without auto-titles)", function(){

		a.maxLength = 10;
		a.autoTitle = true;
		autolink_harness(a, 'a www.abcdefghijklmnopqrstuvwxyz.com b',
			'a <a href="http://www.abcdefghijklmnopqrstuvwxyz.com" title="http://www.abcdefghijklmnopqrstuvwxyz.com">www.abc...</a> b');

		a.maxLength = 10;
		a.autoTitle = false;
		autolink_harness(a, 'a www.abcdefghijklmnopqrstuvwxyz.com b', 10, '', false,
			'a <a href="http://www.abcdefghijklmnopqrstuvwxyz.com">www.abc...</a> b');

		a.maxLength = 10;
		a.autoTitle = true;
		autolink_harness(a, 'a www.abc.com b www.def.com c',
			'a <a href="http://www.abc.com" title="http://www.abc.com">www.abc...</a> b <a href="http://www.def.com" title="http://www.def.com">www.def...</a> c');
	});


	it("Supports protocol stripping", function(){

		a.stripProtocols = true;
		autolink_harness(a, 'a http://foo.com b', 'a <a href="http://foo.com">foo.com</a> b');
		autolink_harness(a, 'a https://foo.com b', 'a <a href="https://foo.com">foo.com</a> b');

		a.stripProtocols = false;
		autolink_harness(a, 'a http://foo.com b', 'a <a href="http://foo.com">http://foo.com</a> b');
		autolink_harness(a, 'a https://foo.com b', 'a <a href="https://foo.com">https://foo.com</a> b');
	});

});
