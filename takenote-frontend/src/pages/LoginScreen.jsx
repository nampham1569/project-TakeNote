import React, { Component } from "react";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    loading: false
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleMoveToRegisterPage = event => {
    window.location.href = "/register";
  };

  handleSubmit = event => {
    event.preventDefault();

    // validate
    if (!this.state.email) {
      this.setState({
        errorMessage: "Please input email"
      });
    } else if (!this.state.password) {
      this.setState({
        errorMessage: "Please input password"
      });
    } else {
      this.setState({
        errorMessage: "",
        loading: true
      });

      // fetch
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        credentials: "include"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (!data.success) {
            this.setState({
              errorMessage: data.message,
              loading: false
            });
          } else {
            window.location.href = "/";
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            errorMessage: error.message,
            loading: false
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <form className="register-form" onSubmit={this.handleSubmit}>
            <p className="text-danger">{this.state.errorMessage}</p>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Log In
              </button>
            )}
            <div
              style={{
                color: "#007bff",
                display: "inline-block",
                float: "right"
              }}
              onClick={this.handleMoveToRegisterPage}
            >
              Don't have account? Sign in!
            </div>
          </form>
        </div>
      </div>
    );
  }
}
