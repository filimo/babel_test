import $ from 'jquery'
import ConsoleWrapper from "./ConsoleWrapper.js";

var x = new ConsoleWrapper();
x.speak();


$(function($) {
    console.log('1')
    console.log($)

    $('div').text('test3')

    console.log(2)
})