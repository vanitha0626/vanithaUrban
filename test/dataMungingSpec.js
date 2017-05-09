const should = require("chai").should(),
expect = require("chai").expect,
sinon = require('sinon'),
readline = require("readline"),
fs=require("fs"),

convert = require("../js/sample");
//convert = require("../js/");

describe("A series of test for Converting  CSV to JSON",
	function(err){

  it("should return sucess message", function(done){
  	var result = convert(2001);
  	result.should.be.equal('JSON written successfully');
    done();
    });

   it('should fail if year is notprovided', function(done){
        expect(convert).to.throw(Error, "Not a number");
        done();
    });

  it('should fail if year is not a number', function(done){
        expect(convert.bind(undefined, {})).to.throw(Error, "Not a number");
        done();
    });

   it('should fail if year is NaN', function(done){
        expect(convert.bind(undefined, NaN)).to.throw(Error, "Not a number");
        done();
    });

   it('should not fail if the year is a literal number', function(done){
        expect(convert.bind(undefined, '1960')).to.not.throw(Error, "Not a number");
        done();
    });

   it('should not fail if the year is a Number object', function(done){
        expect(convert.bind(undefined, Number(1960))).to.not.throw(Error, "Not a number");
        done();
    });
});
