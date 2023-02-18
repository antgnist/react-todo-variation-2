import PropTypes from 'prop-types';
import './TimerTask.css';

const msToTime = (duration) => {
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

export default function TimerTask({ id, completed, ms, startTimer, stopTimer }) {
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
        <span className="timer_indicate">{msToTime(ms)}</span>
      </span>
    ) : null;

  return content;
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
