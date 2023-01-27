import { Component } from 'react';
import { format } from 'date-fns';
import './TimerTask.css';

export default class TimerTask extends Component {
  componentDidMount() {
    const { id, updateTimer, timerFlag, timerId, updateTimerId } = this.props;
    console.log('смонтировался таймер');

    if (timerFlag && !timerId) {
      console.log('текущий timerID: ', timerId);
      const tmp = setInterval(() => {
        console.log('Я таймер и я продолжаю хуячить (из componentDidMount)');
        updateTimer(id);
      }, 1000);
      updateTimerId(id, tmp);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('апдейтнулся таймер');
    const { id, updateTimer, timerFlag, timerId, updateTimerId } = this.props;

    if (prevProps.timerFlag !== timerFlag) {
      if (timerFlag) {
        const tmp = setInterval(() => {
          console.log('Я таймер и я продолжаю хуячить (из апдейта)');
          updateTimer(id);
        }, 1000);
        updateTimerId(id, tmp);
      } else {
        clearInterval(timerId);
        updateTimerId(id, null);
      }
    }
  }

  componentWillUnmount() {
    const { timerFlag, timerId, updateTimerId, id } = this.props;
    console.log('Я componentWillUnmount -- Исчез с ЭКРАНА таймер?))');
    if (!timerFlag) {
      clearInterval(timerId);
      updateTimerId(id, null);
      console.log('Щто-то тут делаю');
    }
  }

  render() {
    const { id, ms, controllerTimer } = this.props;
    const content =
      ms !== 0 && ms !== undefined ? (
        <span className="description">
          <button
            type="button"
            aria-label="play timer"
            className="icon icon-play"
            onClick={() => {
              controllerTimer(id, true);
            }}
          />
          <button
            type="button"
            aria-label="pause timer"
            className="icon icon-pause"
            onClick={() => {
              controllerTimer(id, false);
            }}
          />
          <span className="timer_indicate">{format(new Date(ms), 'mm:ss')}</span>
        </span>
      ) : null;

    return content;
  }
}
