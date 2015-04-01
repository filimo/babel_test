var _private = 'private var'

var _privateMethod = function(val) { return _private + ' ' + val }

export class ClassA{
	speak() {
		return _privateMethod.call(this, 'A')
	}
}

export class ClassB{
    speak() {
        return _privateMethod.call(this, 'B')
    }
}