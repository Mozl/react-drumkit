import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import clap from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/clap.wav';
import hihat from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/hihat.wav';

class Letter extends Component {
  render() {
    return (
      <div className="Letter" style={{color: '#FF2121', display: 'inline-block'}}>
        <p>A</p>
        <p>S</p>
        <p>D</p>
        <p>F</p>
        <p>G</p>
        <p>H</p>
        <p>J</p>
        <p>K</p>
        <p>L</p>
      </div>
    );
  }
}

class DrumKit extends Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false
    };

    this._playSound = this._playSound.bind(this);
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this._playSound);
    this.audio = new Audio(this.props.source);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._playSound);
  }

  _playSound(event) {
    if (event.keyCode === this.props.code || event.type === 'click') {
      this.setState({ isPlaying: true });
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }

  _onTransitionEnd(event) {
    this.setState({ isPlaying: false });
  }

  render() {
    const { style, bigText, smallText, className } = this.props;
    const isPlaying = this.state.isPlaying ? `${className} isPlaying` : `${className}`;
    return (
      <button
        onClick={this._playSound}
        onTransitionEnd={this._onTransitionEnd}
        className={isPlaying}
        style={style}>
        <kbd>{smallText}</kbd>
        <span>{bigText}</span>
      </button>
    );
  }
}


DrumKit.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired
};

class Home extends Component {
  render() {
    return (
      <div>
        <div className="one">
          <DrumKit
            className="drumKit clap"
            smallText="a"
            bigText="clap"
            code={65}
            source={clap}
          />
          <DrumKit
            className="drumKit hihat"
            smallText="s"
            bigText="HiHat"
            code={83}
            source={hihat}
          />
        </div>
      </div>
    );
  }
}    

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>React Drumkit</h1>
      <Letter />
      <Home />
      </div>
    );
  }
}

export default App;
