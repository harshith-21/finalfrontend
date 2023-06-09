import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const minPasswordLength = 4;

/**
 * A registration form for new users.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      emailID: "",
      mobileNumber: "",
      password: "",
      cpassword: "",
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.Errors = this.Errors.bind(this);
  }

  /**
   * Update state when values are changed.
   * @param {*} event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /**
   * When user submits the form.
   *
   * @TODO sanitize the data, notify user of errors, and make a post request here to create a new user.
   */
  handleSubmit(event) {
    event.preventDefault();
    const letters = /^[A-Za-z]+$/;

    if (
      !this.state.firstname ||
      !this.state.lastname ||
      !this.state.firstname.match(letters) ||
      !this.state.lastname.match(letters)
    ) {
      alert("Must enter in a valid first and last name.");
    } else if (
      !this.state.password ||
      this.state.password.length <= minPasswordLength
    ) {
      alert(
        "Enter in a password! Anything you like, it just has to be longer than 4 characters."
      );
    } else if (this.state.cpassword != this.state.password) {
      alert("Please re-enter the same password");
    } else {
      console.log("post request for new user");
      // Make the post request
      const uri = `https://poolbackend-rotaa.onrender.com/user/signup`;

      const formdata = JSON.stringify(this.state);

      self = this;

      fetch(uri, {
        method: "POST",
        body: formdata,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.status === 200) {
            self.setState({
              loggedIn: true,
            });
            window.location.reload();
          }
        })
        .catch(function (err) {
          console.log("Request failed", err);
        });
    }
  }

  /**
   * Display errors if there are any.
   */
  // Errors() {
  //     return (
  //         <div className="Form-Errors">{this.state.errorMessage}</div>
  //     )
  // }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="UserAccountContainer">
        <h1 className="formInput">Signup</h1>
        {/* <this.Errors /> */}
        <form className="UserAccountForm" onSubmit={this.handleSubmit}>
          <label className="UserAccountFormInput">First name</label>
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">Last name</label>
          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">User name</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">Email Address</label>
          <input
            type="text"
            name="emailID"
            value={this.state.emailID}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={this.state.mobileNumber}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label className="UserAccountFormInput">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={this.state.cpassword}
            onChange={this.handleChange}
          />

          <input
            className="UserAccountFormInput"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}
