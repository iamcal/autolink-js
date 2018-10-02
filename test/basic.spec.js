
describe("Barely functions", function(){

	var autolink = new AutoLink();

	it("Returns strings", function(){

		expect(autolink.link("Hello")).toBe("Hello");
	});

});
