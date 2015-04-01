import $ from 'jquery'
import html from './html/tmpl.html'

export class Render{
    render() {
        $('div').html(html)
    }
}