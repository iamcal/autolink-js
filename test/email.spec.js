describe("Detects email addresses", function(){

	var a = new AutoLink();

	it("Supports basics", function(){
		autolink_email_harness(a, "","");
		autolink_email_harness(a, "hello","hello");
		autolink_email_harness(a, 'foo@bar', '<a href="mailto:foo@bar">foo@bar</a>');
	});

	it("Supports included characters", function(){
		autolink_email_harness(a, 'a.b.c.d.e@f.g.h.i', '<a href="mailto:a.b.c.d.e@f.g.h.i">a.b.c.d.e@f.g.h.i</a>');
		autolink_email_harness(a, '.foo@bar.', '.<a href="mailto:foo@bar">foo@bar</a>.');
		autolink_email_harness(a, '(foo@bar)', '(<a href="mailto:foo@bar">foo@bar</a>)');
	});

	it("Supports  multiple address", function(){
		autolink_email_harness(a, 'foo@bar baz@quux', '<a href="mailto:foo@bar">foo@bar</a> <a href="mailto:baz@quux">baz@quux</a>');
	});

	it("Supports  other data", function(){
		autolink_email_harness(a, 'hello foo@bar world', 'hello <a href="mailto:foo@bar">foo@bar</a> world');
		autolink_email_harness(a, '<b>hello foo@bar world</b>', '<b>hello <a href="mailto:foo@bar">foo@bar</a> world</b>');
	});

	it("Supports containers", function(){
		autolink_email_harness(a, '<a href="#">foo@bar</a>', '<a href="#">foo@bar</a>');
		autolink_email_harness(a, '<a href="#">hello foo@bar world</a>', '<a href="#">hello foo@bar world</a>');
	});

	it("Supports  partial address", function(){
		autolink_email_harness(a, 'foo@', 'foo@');
		autolink_email_harness(a, 'foo@ bar', 'foo@ bar');
		autolink_email_harness(a, '@bar', '@bar');
		autolink_email_harness(a, 'foo @bar', 'foo @bar');
		autolink_email_harness(a, '@', '@');
		autolink_email_harness(a, 'foo @ bar', 'foo @ bar');
	});

	it("Supports  special characters", function(){
		autolink_email_harness(a, '\\@\\', '\\@\\');
		autolink_email_harness(a, ':@:', ':@:');
		autolink_email_harness(a, ';@;', ';@;');
		autolink_email_harness(a, ',@,', ',@,');
		autolink_email_harness(a, '(@)', '(@)');
		autolink_email_harness(a, '<@>', '<@>');
		autolink_email_harness(a, '[@]', '[@]');
	});

});
