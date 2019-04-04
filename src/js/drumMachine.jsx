import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../scss/FCCDrummer.scss';
import { hot } from 'react-hot-loader/root';


import ClosedHat from '../media/sounds/CYCdh_K1close_ClHat-08.mp3';
import OpenHat from '../media/sounds/CYCdh_K1close_OpHat-01.mp3';
import Flam from '../media/sounds/CYCdh_K1close_Flam-05.mp3';
import SideStick from '../media/sounds/CYCdh_K1close_SdSt-06.mp3';
import Kick from '../media/sounds/CYCdh_K1close_Kick-08.mp3';
import Snare from '../media/sounds/CYCdh_K1close_Snr-05.mp3';
import Kick2 from '../media/sounds/CYCdh_K1close_Kick-07.mp3';
import PHat from '../media/sounds/CYCdh_K1close_PdHat-01.mp3';
import Rim from '../media/sounds/CYCdh_K1close_Rim-04.mp3';

const PADCOLOR = "#801a1b";
const LITPADCOLOR = "#a5ffac";

const Key = (props) => {

    return (
          <button id={props.id}
                  className="drum-pad"
                  type="button"
                  onClick={() => props.play(props.id, props.audio)}
                  style={props.color}>
            {props.label}
            <audio id={props.label} className="clip" src={props.audio}></audio>
          </button>
    )
}

class Keypad extends Component {
  constructor(props){
    super(props);

    this.state = {
      displayText: 'Welcome',
      audioArray: [
        {
          name: "ClosedHat",
          soundFile: ClosedHat,
          key: "Q",
          keyCode: 81,
          color: PADCOLOR
        },
        {
          name: "OpenHat",
          soundFile: OpenHat,
          key: "W",
          keyCode: 87,
          color: PADCOLOR
        },
        {
          name: "Flam",
          soundFile: Flam,
          key: "E",
          keyCode: 69,
          color: PADCOLOR
        },
        {
          name: "SideStick",
          soundFile: SideStick,
          key: "A",
          keyCode: 65,
          color: PADCOLOR
        },
        {
          name: "Kick",
          soundFile: Kick,
          key: "S",
          keyCode: 83,
          color: PADCOLOR
        },
        {
          name: "Snare",
          soundFile: Snare,
          key: "D",
          keyCode: 68,
          color: PADCOLOR
        },
        {
          name: "Kick2",
          soundFile: Kick2,
          key: "Z",
          keyCode: 90,
          color: PADCOLOR
        },
        {
          name: "PHat",
          soundFile: PHat,
          key: "X",
          keyCode: 88,
          color: PADCOLOR
        },
        {
          name: "Rim",
          soundFile: Rim,
          key: "C",
          keyCode: 67,
          color: PADCOLOR
        }
      ]
    }

    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.displaySetter = this.displaySetter.bind(this);
  }

  displaySetter(newDisplayText) {
    this.setState(
        { displayText: newDisplayText },
        () => {
          if(this.state.displayText == newDisplayText)
            console.log("State has been updated!")
          else
            console.log("State has not been updated!")
        }
    );
  }

  handleKeyPress(e) {
    console.log(e.keyCode);
    let soundObject = this.state.audioArray.filter(x => (x.keyCode === e.keyCode));
    console.log("soundObject: ", soundObject);
    if (soundObject) {
      this.playAudio( soundObject[0].name, soundObject[0].soundFile);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  playAudio(id, audio) {
    let sound = new Audio(audio);
    sound.play();
    this.displaySetter(id);
    let tempArray = [...this.state.audioArray];
    const index = tempArray.map(x => x.name).indexOf(id);
    tempArray[index].color = LITPADCOLOR;
    this.setState(
      { audioArray: tempArray },
      () => {
          setTimeout(() => {
            tempArray[index].color = PADCOLOR,
            this.setState( { audioArray: tempArray} )
          }, 200);
      }
    );
  }

  render() {
    let keyLabelsArray = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
    let soundArray = ["ClosedHat", "OpenHat", "Flam", "SideStick", "Kick", "Snare", "Kick2", "PHat", "Rim"];
    let keys = this.state.audioArray.map((item, index) => {
      let backgroundColor = {'backgroundColor': item.color};
      return (
        <Key  key={item.key + '-pad'}
              keyCode={item.keyCode}
              audio={item.soundFile}
              play={this.playAudio}
              id={item.name}
              label={item.key}
              color={backgroundColor}
        >
        </Key>
      )
    });

    let firstRow = [keys.slice(0, 3)];
    let secondRow = [keys.slice(3, 6)];
    let thirdRow = [keys.slice(6, 9)];

    return (
        <div id="keypad">
          <div id="title">
            BeatMaster3000
          </div>
          <div id="display">
            <h1 id="displayText">{this.state.displayText}</h1>
          </div>
          <div id="keyrows">
            <div className="keyrow">{firstRow}</div>
            <div className="keyrow">{secondRow}</div>
            <div className="keyrow">{thirdRow}</div>
          </div>
          <div id="footer">
            credits
          </div>
        </div>
    )
  }
}

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div>
          <Keypad />
        </div>
    )
  }
}

export default hot(DrumMachine);


