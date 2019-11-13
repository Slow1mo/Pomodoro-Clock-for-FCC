import React from "react";
import "./App.css";
import Timer from "./components/Timer";
import Controllers from "./components/Controllers";

const initialState = {
  isRunning: false,
  workClock: 1500,
  breakClock: 300,
  timeLeft: 1500,
  sessionCycle: true
};

class App extends React.Component {
  state = initialState;

  incrementWork = () => {
    // increment work by 1 and update this.state.work based on work
    if (!this.state.isRunning && this.state.workClock < 3600) {
      this.setState({
        workClock: this.state.workClock + 60,
        timeLeft: this.state.sessionCycle
          ? this.state.workClock + 60
          : this.state.timeLeft
      });
    }
  };

  decrementWork = () => {
    // decrease work by 1 and update this.state.work based on work
    if (this.state.workClock > 60 && !this.state.isRunning) {
      this.setState({
        workClock: this.state.workClock - 60,
        timeLeft: this.state.sessionCycle
          ? this.state.workClock - 60
          : this.state.timeLeft
      });
    }
  };

  incrementBreak = () => {
    // increment breakClock by 1 and update this.state.breakClock based on work
    if (!this.state.isRunning && this.state.breakClock < 3600) {
      this.setState({
        breakClock: this.state.breakClock + 60
      });
    }
  };

  decrementBreak = () => {
    // decrease breakClock by 1 and update this.state.breakClock based on work
    if (this.state.breakClock > 60 && !this.state.isRunning) {
      this.setState({
        breakClock: this.state.breakClock - 60
      });
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  };

  toggleTimer = () => {
    if (this.state.isRunning) {
      this.stopTimer();
      this.setState({ isRunning: false });
      return;
    }
    this.timer = setInterval(this.runner, 1000)
  };

  runner = () => {
    if (this.state.timeLeft === 0) {
      const { workClock, breakClock, sessionCycle, isRunning } = this.state;
      this.setState({
        sessionCycle: isRunning ? !sessionCycle : sessionCycle,
        timeLeft: !sessionCycle ? workClock : breakClock
      });
      return;
    }
    this.setState(prevState => ({
      isRunning: true,
      timeLeft: prevState.timeLeft - 1
    }));
    if (this.state.timeLeft === 1) {
      this.props.play();
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.props.pause();

    this.setState({ ...initialState });
  };

  render() {
    return (
      <div className="App">
        <h1> Pomodoro Clock </h1>
        <p> by Slow1mo </p>

        <Timer
          clock={this.state.timeLeft}
          cycle={this.state.sessionCycle ? "Session" : "Break"}
        />

        <Controllers
          workClock={this.state.workClock}
          sessionLength={this.state.workClock}
          breakLength={this.state.breakClock}
          isRunning={this.state.isRunning}
          resetTimer={this.resetTimer}
          handleTimer={this.toggleTimer}
          incrementWork={this.incrementWork}
          decrementWork={this.decrementWork}
          incrementBreak={this.incrementBreak}
          decrementBreak={this.decrementBreak}
        />
      </div>
    );
  }
}
export default App;
