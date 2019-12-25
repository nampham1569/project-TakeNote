import React, { Component } from "react";

export default class HomeScreen extends Component {
  fetchData = event => {
    fetch(`http://localhost:3001/api/notes/`, {
      method: "POST",
      credentials: "include",
      body: "abcxyz"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (!data.success) {
          window.location.href = "/register";
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.fetchData}></button>
      </div>
    );
  }
}
