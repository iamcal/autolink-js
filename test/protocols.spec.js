describe("Detects protocols", function(){

	var a = new AutoLink();

	it("Detects mixed cases", function(){
		autolink_harness(a, 'a HTTP://a.com b', 'a <a href="HTTP://a.com">a.com</a> b');
		autolink_harness(a, 'a HtTp://a.com b', 'a <a href="HtTp://a.com">a.com</a> b');
	});

	it("Detects non-standard :// protocols", function(){
		autolink_harness(a, 'a ssh://a.com b', 'a <a href="ssh://a.com">ssh://a.com</a> b');
		autolink_harness(a, 'a file://a.com b', 'a <a href="file://a.com">file://a.com</a> b');
		autolink_harness(a, 'a itms-services://a.com b', 'a <a href="itms-services://a.com">itms-services://a.com</a> b');
	});

	it("Detects colon-only ptotocols", function(){
		autolink_harness(a, 'a mailto:woo@yay.com b', 'a <a href="mailto:woo@yay.com">mailto:woo@yay.com</a> b');
		autolink_harness(a, 'a skype:iamcal b', 'a <a href="skype:iamcal">skype:iamcal</a> b');
	});

});

