import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import styled from 'styled-components';

import clap from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/clap.wav';
import hihat from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/hihat.wav';
import kick from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/kick.wav';

const LetterStyle = styled.div`
  text-align: center;
  color: rgb(12, 159, 185);
  display: 'inline-block';
`;

const ButtonStyle = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const AppStyle = styled.div`
  text-align: center;
`;

class Letter extends Component {
  render() {
    return (
      <LetterStyle>
        <p>A</p>
        <p>S</p>
        <p>D</p>
        <p>F</p>
        <p>G</p>
        <p>H</p>
        <p>J</p>
        <p>K</p>
        <p>L</p>
      </LetterStyle>
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
      <ButtonStyle>

        <kbd>{smallText}</kbd>
        <br />
        <span>{bigText}</span>
      </ButtonStyle>
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
        <div className="drums">
          <DrumKit
            className="drumKit clap"
            smallText="A"
            bigText="clap"
            code={65}
            source={clap}
          />
          <DrumKit
            className="drumKit hihat"
            smallText="S"
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
      <AppStyle>
        <h1>React Drumkit</h1>
        <Letter />
        <Home />
      </AppStyle>
    );
  }
}

export default App;
