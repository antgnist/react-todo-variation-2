import { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './TimerTask.css';

export default class TimerTask extends Component {
  render() {
    const { id, completed, ms, startTimer, stopTimer } = this.props;
    const content =
      ms !== 0 && ms !== undefined ? (
        <span className="description">
          <button
            type="button"
            aria-label="play timer"
            className="icon icon-play"
            disabled={completed}
            onClick={() => {
              startTimer(id);
            }}
          />
          <button
            type="button"
            aria-label="pause timer"
            className="icon icon-pause"
            onClick={() => {
              stopTimer(id);
            }}
          />
          <span className="timer_indicate">{format(new Date(ms), 'mm:ss')}</span>
        </span>
      ) : null;

    return content;
  }
}

TimerTask.defaultProps = {
  id: '',
  completed: false,
  ms: 0,
  startTimer: () => {},
  stopTimer: () => {},
};

TimerTask.propTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  ms: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};
