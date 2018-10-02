// define our own class that we want to have preserved

function AutoLink(){
	var self = this;
	self.foo = 'bar';
	return self;
}


// helper functions

function autolink_harness(autolink, input, expected){
	expect(autolink.link(input)).toBe(expected);
}

function autolink_email_harness(autolink, input, expected){
	expect(autolink.linkEmail(input)).toBe(expected);
}
