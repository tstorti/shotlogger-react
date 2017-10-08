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
    passwordConfirm: "",
    redirect: false,
    showNewForm: false,
    showLoginForm: true,
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
    this.setState({ redirect: true });
  };
  leagueNew = () => {
    //set redirect to true so the redirect goes to the new league page
    this.setState({ 
      showNewForm: true,
      showLoginForm: false,
    });
  };

  leagueNewSubmit = () => {
    console.log(this.state.leagueID);
    console.log(this.state.password);
    console.log(this.state.passwordConfirm);
    
    API.saveLeague(
      {
        login:this.state.leagueID,
        password:this.state.password,
      })
        .then(res => {
          this.setState({ redirect: true })
          //redirect to league page for specific id?
          console.log(res);
        })
        .catch(err => console.log(err));
  };

  render() {
    const { redirect } = this.state;
    
    if (redirect) {
      return <Redirect to={"/league/" + this.state.leagueID}/>;
    }
 
    return (
      <div>
          <div className="header-primary">Welcome to StreetBallStats</div>
            {/* Conditionally render different form if creating new League */}
            {this.state.showLoginForm &&
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
            }
            {/* Conditionally render different form if creating new League */}
            {this.state.showNewForm &&
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
                <button  onClick={this.leagueNewSubmit} className="btn-new">Create New</button>
              </div>
            }
            
          
      </div>
    );
  }
}

export default Home;
