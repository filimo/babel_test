import $ from 'jquery'
import {ClassA, ClassB} from './ClassA'
import {Render} from './Render'

var a = new ClassA()
var b = new ClassB()

console.log(a.speak())
console.log(b.speak())


$(function() {
    new Render().render()
})