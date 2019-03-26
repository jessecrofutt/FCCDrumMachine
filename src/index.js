// import _ from 'lodash';
// import './scss/FCCDrummer.scss';
// import swirl from './media/spiral-starburst4.png';

import React from 'react';
import ReactDOM from 'react-dom';
// import { hot } from 'react-hot-loader/root'
import DrumMachine from './js/drumMachine.jsx';




ReactDOM.render(
    <DrumMachine/>,
    document.getElementById('drum-machine')
);

// ReactDOM.render(
//     <div>{title}</div>,
//     document.getElementById('drum-machine')
// );

// module.hot.accept();

// function component() {
//   let element = document.createElement('div');
//
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('drum-machine');
//   let myIcon = new Image();
//   myIcon.src= swirl;
//   element.appendChild(myIcon);
//   return element;
// }
//
// document.body.appendChild(component());
