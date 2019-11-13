import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
require('bootstrap');
global.jQuery = require('jquery');

let alarm = undefined;
const play = () => alarm.play()
const pause = () => {
    alarm.pause()
    alarm.currentTime = 0
}

const render = () => {
    return (
        <React.StrictMode>
            <audio
                id="beep"
                preload="auto"
                src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alarm%20Clock.wav-19830-Free-Loops.com.mp3"
                ref={ref => (alarm = ref)}
            />
            <App play={play} pause={pause} />
        </React.StrictMode>
    )
}
ReactDOM.render(render(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
