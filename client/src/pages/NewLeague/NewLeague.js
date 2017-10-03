import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import Input from "../../components/Input";
import "./NewLeague.css";

class NewLeague extends Component {
  state = {
    articles: [],
    leagueID: "",
    password: "",
    passwordConfirm: "",
    redirect: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  leagueNew = () => {
    console.log(this.state.leagueID);
    console.log(this.state.password);
    console.log(this.state.passwordConfirm);
    // API.saveLeague(this.state.leagueID)
        //   .then(res => this.setState({ recipes: res.data }))
        //   .catch(err => console.log(err));

    //if valid league login, set redirect to true so the redirect goes to the league page
    this.setState({ redirect: true });
    
  };

  render() {
    const { redirect } = this.state;
    
    if (redirect) {
      return <Redirect to='/league'/>;
    }
    return (
      <div>
          <div className="header-primary">Welcome to StreetBallStats</div>
          <div className="login-container">
            <div className="input-container">
              <Input
                name="leagueID"
                value={this.state.leagueID}
                onChange={this.handleInputChange}
                placeholder="League ID"
              />
            </div>
            <div className="input-container">
              <Input
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="input-container">
              <Input
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange}
                placeholder="Confirm Password"
              />
            </div>
            <button  onClick={this.leagueNew} className="btn-new">Create New</button>
          </div>
      </div>
    );
  }
}

export default NewLeague;
