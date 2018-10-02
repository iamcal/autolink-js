
describe("Detects URLs", function(){

	var a = new AutoLink();

	it("Returns strings", function(){
		autolink_harness(a, "","");
		autolink_harness(a, "hello","hello");
	});

	it("detects www. URLs", function(){
		autolink_harness(a, 'www.x.com', '<a href="http://www.x.com">www.x.com</a>');
		autolink_harness(a, ' www.x.com', ' <a href="http://www.x.com">www.x.com</a>');
		autolink_harness(a, 'www.x.com ', '<a href="http://www.x.com">www.x.com</a> ');
	});

	it("detects scheme URLs", function(){
		autolink_harness(a, 'http://x.com', '<a href="http://x.com">x.com</a>');
		autolink_harness(a, 'https://x.com', '<a href="https://x.com">x.com</a>');
		autolink_harness(a, 'ftp://x.com', '<a href="ftp://x.com">ftp://x.com</a>');
	});

	it("does not detects URLs inside anchors", function(){
		autolink_harness(a, '<a href="x">www.x.com</a>', '<a href="x">www.x.com</a>');
		autolink_harness(a, '<a href="x">http://x.com</a>', '<a href="x">http://x.com</a>');
		autolink_harness(a, '<a href="x"> www.x.com </a>', '<a href="x"> www.x.com </a>');
		autolink_harness(a, '<a href="x"> http://x.com </a>', '<a href="x"> http://x.com </a>');
		autolink_harness(a, '<a href="x">foo www.x.com bar</a>', '<a href="x">foo www.x.com bar</a>');
		autolink_harness(a, '<a href="x">foo <b>www.x.com</b> bar</a>', '<a href="x">foo <b>www.x.com</b> bar</a>');
	});

	it("correctly ignores trailing punctuation", function(){
		autolink_harness(a, 'www.x.com.', '<a href="http://www.x.com">www.x.com</a>.');
		autolink_harness(a, 'www.x.com,', '<a href="http://www.x.com">www.x.com</a>,');
		autolink_harness(a, 'www.x.com!', '<a href="http://www.x.com">www.x.com</a>!');
		autolink_harness(a, 'www.x.com?', '<a href="http://www.x.com">www.x.com</a>?');
		autolink_harness(a, 'www.x.com)', '<a href="http://www.x.com">www.x.com</a>)');
		autolink_harness(a, 'www.x.com...', '<a href="http://www.x.com">www.x.com</a>...');
		autolink_harness(a, 'www.x.com!!!', '<a href="http://www.x.com">www.x.com</a>!!!');
	});

	it("correctly balances matching punctuation", function(){
		autolink_harness(a, 'www.x.com/woo(yay)', '<a href="http://www.x.com/woo(yay)">www.x.com/woo(yay)</a>');
		autolink_harness(a, 'www.x.com/woo{yay}', '<a href="http://www.x.com/woo">www.x.com/woo</a>{yay}');
		autolink_harness(a, 'www.x.com/woo[yay]', '<a href="http://www.x.com/woo">www.x.com/woo</a>[yay]');
		autolink_harness(a, '(www.x.com)', '(<a href="http://www.x.com">www.x.com</a>)');
		autolink_harness(a, '[www.x.com]', '[<a href="http://www.x.com">www.x.com</a>]');
		autolink_harness(a, '{www.x.com}', '{<a href="http://www.x.com">www.x.com</a>}');
	});

	it("detects URLs touching other markup", function(){
		autolink_harness(a, '<br>http://www.x.com', '<br><a href="http://www.x.com">www.x.com</a>');
		autolink_harness(a, '<br>www.x.com', '<br><a href="http://www.x.com">www.x.com</a>');
		autolink_harness(a, 'http://www.x.com<br>', '<a href="http://www.x.com">www.x.com</a><br>');
		autolink_harness(a, 'www.x.com<br>', '<a href="http://www.x.com">www.x.com</a><br>');
		autolink_harness(a, '<br>http://www.x.com<br>', '<br><a href="http://www.x.com">www.x.com</a><br>');
		autolink_harness(a, '<br>www.x.com<br>', '<br><a href="http://www.x.com">www.x.com</a><br>');
	});

	it("works for weird edge cases", function(){
		autolink_harness(a, 'http://foo.com/Test_(test)', '<a href="http://foo.com/Test_(test)">foo.com/Test_(test)</a>');

		autolink_harness(a, 'a http://foo.com/bar<baz> b', 'a <a href="http://foo.com/bar">foo.com/bar</a><baz> b');
		autolink_harness(a, 'a http://foo.com/bar&lt;baz&gt; b', 'a <a href="http://foo.com/bar&lt;baz&gt;">foo.com/bar&lt;baz&gt;</a> b');
		autolink_harness(a, 'a http://foo.com/bar&#123; b', 'a <a href="http://foo.com/bar{">foo.com/bar{</a> b');

		// an old version failed this test, since it treated the UTF-8 em-dash bytes
		// as allowed Latin-1 characters. We explicitly list allowed URL characters now,
		// so this should not happen.
		autolink_harness(a, "foo http://iamcal.com\xE2\x80\x94 bar", "foo <a href=\"http://iamcal.com\">iamcal.com</a>\xE2\x80\x94 bar");
	});

});
