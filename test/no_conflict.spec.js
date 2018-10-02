describe("noConflict mode", function(){

	it("overwrites the previous class", function(){

		var autolink = new AutoLink();
		expect(autolink.strip_protocols).toBe(true);
	});

	it("replaces the previous class", function(){

		var autolink = new AutoLink();
		var lib_class = autolink.noConflict();

		var autolink2 = new AutoLink();
		expect(autolink2.foo).toBe('bar');

		var autolink3 = new lib_class();
		expect(autolink3.strip_protocols).toBe(true);
	});
});

