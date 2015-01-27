/* global describe, beforeEach, it, inject, expect */
describe('hrAngularExtend:', function() {
	beforeEach(module('hrAngularExtend'));



	describe('factory:', function() {
		it('should inject factory and and extend to a Class', inject(function(hrAngularExtend){
			function MyNewClass() {}
			// It shouldn't be defined before
			expect(MyNewClass.factory).not.toBeDefined();
			expect(MyNewClass.extend).not.toBeDefined();

			// Create a new factory out of MyNewClass
			hrAngularExtend.factory(MyNewClass);

			// Now MyNewClass allows for extending
			expect(MyNewClass.factory).toBeDefined();
			expect(MyNewClass.extend).toBeDefined();

		}));
	});

	describe('extend:', function(){
		beforeEach(function() {
			module(function($provide) {
				$provide.factory('BaseClass', function(hrAngularExtend) {
					function BaseClass () {}
					BaseClass.prototype.baseProperty = 'baseProperty';

					return hrAngularExtend.factory(BaseClass);
				});
			});
		});
		it('should extend a base class properties', inject(function(BaseClass){
			function ChildClass () {}
			BaseClass.extend(ChildClass);
			var instance = new ChildClass();

			expect(instance.baseProperty).toBeDefined();

		}));
	});

});