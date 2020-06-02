import React from "react";
import { TaskRender, TimerRender } from "./timerDisplay";
import Buttons from "./buttons";
import { renderStarted, renderElapsedString } from "./formatTime";

const Timer = props => {
  const { started, elapsed, isRunning, paused } = props.timer;
  const {
    task,
    onEditClick,
    onTrashClick,
    onStartClick,
    onPauseClick,
    onContinueClick,
    onStopClick
  } = props;
  const whenStarted = renderStarted(started);
  const running = renderElapsedString(elapsed);

  return (
    <div className="col-sm-10 col-md-5 mx-auto my-2">
      <div className="card timer">
        <div className="class-body">
          <TaskRender
            task={task}
            onEditClick={onEditClick}
            onTrashClick={onTrashClick}
          />
          <TimerRender key="clock" started={whenStarted} elapsed={running} />
        </div>
<div className="card-footer"><Buttons
          isRunning={isRunning}
          paused={paused}
          onStartClick={onStartClick}
          onPauseClick={onPauseClick}
          onContinueClick={onContinueClick}
          onStopClick={onStopClick}
        /></div>
        
      </div>
    </div>
  );
};

export default Timer;
