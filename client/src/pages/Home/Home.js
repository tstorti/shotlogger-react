import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import Input from "../../components/Input";
import "./Home.css";

class Home extends Component {
  state = {
    articles: [],
    leagueID: "asdf",
    redirect: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.leagueID);
  };
  leagueLogin = () => {
    console.log(this.state.leagueID);
    //if valid league login, set redirect to true so the redirect goes to the league page
    this.setState({ redirect: true });
  };
  leagueNew = () => {
    console.log(this.state.leagueID);
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
                placeholder="Login with your league ID"
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
