import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import styled from 'styled-components';
import clapIcon from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/images/clap.png';
import hihatIcon from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/images/hihat.png';
import kickIcon from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/images/kick.png';

import clap from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/clap.wav';
import hihat from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/hihat.wav';
import kick from '/Users/louismoselhi/Projects/react-drumkit/react-drumkit/src/sounds/kick.wav';

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin: 2em;
`;

const ButtonStyle = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 2em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const AppStyle = styled.div`
  text-align: center;
`;

class Icon extends Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      isShaking: false
    };

    this._shake = this._shake.bind(this);
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
  }

  _shake(event) {
    if (event.keyCode === this.props.code || event.type === 'click') {
      this.setState({ isShaking: true });

    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this._shake);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._shake);
  }

  _onTransitionEnd(event) {
    this.setState({ isPlaying: false });
    this.setState({ isShaking: false });
  }

  render() {
    const { style, className } = this.props;
    const isShaking = this.state.isPlaying ? `${className} isShaking` : `${className}`;
    return (
      <div>
        <Image 
          code={65}
          src={clapIcon}
          className="shaking"
          source={clap}
        />
        <Image 
          code={83}
          src={hihatIcon}
          className="shaking"
          source={hihat}
        />
        <Image 
          code={68}
          src={kickIcon}
          className="shaking"
          source={kick}
        />
      </div>
    );
  }
}

class DrumKit extends Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
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
    const { bigText, smallText, className } = this.props;
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

Icon.propTypes = {
  className: PropTypes.string,
  code: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};

DrumKit.propTypes = {
  className: PropTypes.string,
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired
};

class Drums extends Component {
  
  render() {
    return (
      <div>
        <div className="drums">
          <DrumKit
            className="drumKit clap"
            smallText="A"
            bigText="Clap"
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
          <DrumKit
            className="drumKit kick"
            smallText="D"
            bigText="Kick"
            code={68}
            source={kick}
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
        <Icon />
        <Drums />
      </AppStyle>
    );
  }
}

export default App;
