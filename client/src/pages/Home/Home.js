import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import Input from "../../components/Input";
import "./Home.css";

class Home extends Component {
  state = {
    articles: [],
    leagueID: "",
    password: "",
    redirect1: false,
    redirect2: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  leagueLogin = () => {
    console.log(this.state.leagueID);
    console.log(this.state.password);
    //if valid league login, set redirect to true so the redirect goes to the league page
    this.setState({ redirect1: true });
  };
  leagueNew = () => {
    //set redirect to true so the redirect goes to the new league page
    this.setState({ redirect2: true });
  };

  render() {
    const { redirect1 } = this.state;
    const { redirect2 } = this.state;
    
    if (redirect1) {
      return <Redirect to='/league'/>;
    }
    if (redirect2) {
      return <Redirect to='/league/new' />
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
            <button  onClick={this.leagueLogin} className="btn-login">Login</button>
            <button  onClick={this.leagueNew} className="btn-new">Create New</button>
          </div>
      </div>
    );
  }
}

export default Home;
