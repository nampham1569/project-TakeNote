import React, { Component } from "react";

export default class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmedPassword: "",
    errorMessage: "",
    loading: false
  };

  handleFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
    console.log(this.state.firstName);
  };

  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
    console.log(this.state.lastName);
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
    console.log(this.state.email);
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
    console.log(this.state.password);
  };

  handleConfirmedPasswordChange = event => {
    this.setState({
      confirmedPassword: event.target.value
    });
    console.log(this.state.confirmedPassword);
  };

  handleMoveToLoginPage = event => {
    window.location.href = "/login"
  }

  handleSubmit = event => {
    event.preventDefault();

    // validate
    if (!this.state.firstName) {
      this.setState({
        errorMessage: "Please input First Name"
      });
    } else if (!this.state.lastName) {
      this.setState({
        errorMessage: "Please input Last Name"
      });
    } else if (!this.state.email) {
      this.setState({
        errorMessage: "Please input email"
      });
    } else if (!this.state.password) {
      this.setState({
        errorMessage: "Please input password"
      });
    } else if (this.state.confirmedPassword !== this.state.password) {
      this.setState({
        errorMessage: "Confirmed password not correct"
      });
    } else {
      this.setState({
        errorMessage: "",
        loading: true
      });

      // fetch
      // fetch("http://localhost:3001/api/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     email: this.state.email,
      //     fullName: this.state.fullName,
      //     password: this.state.password
      //   }),
      //   credentials: "include"
      // })
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(data => {
      //     if (!data.success) {
      //       this.setState({
      //         errorMessage: data.message,
      //         loading: false
      //       });
      //     } else {
      //       window.location.href = "/login";
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.setState({
      //       errorMessage: error.message,
      //       loading: false
      //     });
      //   });
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <form className="register-form" onSubmit={this.handleSubmit}>
            {this.state.errorMessage ? (
              <div class="alert alert-danger" role="alert">
                <p className="text-danger">{this.state.errorMessage}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
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
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={this.state.confirmedPassword}
                onChange={this.handleConfirmedPasswordChange}
              />
            </div>
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            )}
            <div
              style={{
                color: "#007bff",
                display: "inline-block",
                float: "right",
              }}
              onClick={this.handleMoveToLoginPage}
            >
              Already have an account? Sign in
            </div>
          </form>
        </div>
      </div>
    );
  }
}
