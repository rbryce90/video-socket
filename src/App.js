import React, { Component } from "react";

import socketIO from "socket.io-client";
import "./App.css";
const io = socketIO();

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: 1,
      pause: "autoplay=1&"
    };
  }

  changeTime = data => {
    io.emit("news", { time: data, room: "1", pause: this.state.pause });
    io.on("news from server", data => {
      console.log(data);
      this.setState({
        time: data.time,
        pause: data.pause
      });
    });
  };

  render() {
    let { time, pause } = this.state;
    console.log(time, pause);
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <iframe
          width="100%"
          height="800px"
          src={`https://www.youtube.com/embed/3fs9hRUTOnU?${pause}start=${time}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />

        <input type="text" ref="userMessage" />
        <button
          onClick={() => {
            this.changeTime(this.refs.userMessage.value);
          }}
        >
          time
        </button>
        <button
          onClick={() => {
            pause == ""
              ? this.setState({
                  pause: "autoplay=1&"
                })
              : this.setState({
                  pause: ""
                });
          }}
        >
          {pause == "autoplay=1&" ? "play when sent" : "pause when sent"}
        </button>
      </div>
    );
  }
}

export default App;
