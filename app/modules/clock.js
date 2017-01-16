import {h, render} from 'preact';

// Tell Babel to transform JSX into preact.h() calls:
/** @jsx h */

export default function clock() {

    // console = console || {};
    // console.log = console.log || ();

    // return render(<div class="test">One</div>)
    // console.log("running clock");

    render((
        <div id="foo">
            <span>Hello, world!</span>
            <button onClick={ e => alert("hi!") }>Click Me</button>
        </div>
    ), document.getElementById('clock'));
}