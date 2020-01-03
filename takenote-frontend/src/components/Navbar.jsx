import React, { Component } from "react";

class Navbar extends Component {
  handleLogout = () => {
    // fetch to /auth/logout
    fetch("http://localhost:3001/api/auth/logout", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success) {
          window.location.href = "/register";
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCreatePostClick = () => {
    window.location.href = "/create";
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          TakeNote
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                My Notes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reminder">
                Reminder
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shared">
                Shared
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/trash">
                Trash
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                Welcome, {this.props.currentUser.firstName}{" "}
                {this.props.currentUser.lastName}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
