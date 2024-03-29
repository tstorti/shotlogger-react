import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import {Input, InputPass} from "../../components/Input";

import "./reset.css";
import "./main.css";


class Home extends Component {
  state = {
    articles: [],
    errorMessage:"",
    leagueLogin: "",
    password: "",
    leagueID:"",
    passwordConfirm: "",
    players:[],
    redirect: false,
    showNewForm: false,
    showLoginForm: true,
    warningLeagueNew:"",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  leagueLogin = () => {
    API.getLeague({
      login:this.state.leagueLogin,
      password:this.state.password,
    })
      .then(res => {
        //if valid league login, set redirect to true so the redirect goes to the league page
        this.setState({ 
          redirect: true,
          errorMessage: "",
          players:res.data.players,
          leagueID:res.data._id,
        });
      })
      .catch(err =>  {
        this.setState({ errorMessage: "Invalid credentials, please try again" });
        console.log(err)
      });
  };
  leagueNew = () => {
    //set redirect to true so the redirect goes to the new league page
    this.setState({ 
      showNewForm: true,
      showLoginForm: false,
    });
  };

  leagueNewSubmit = () => {

    if(this.state.password === this.state.passwordConfirm){
      API.saveLeague(
        {
          login:this.state.leagueLogin,
          password:this.state.password,
        })
        .then(res => {
          //console.log(res);
          this.setState({ 
            redirect: true,
            leagueID:res.data._id,
            players:[],
          })
        })
        .catch(err => console.log(err));
    }
    else{
      this.setState({
        errorMessage:"Passwords don't match",
      });
    }  
  };
  
  leagueNewCancel = () => {
    this.setState({
      showLoginForm:true,
      showNewForm:false,
    });
  }
  render() {
    const { redirect } = this.state;
    
    if (redirect) {
      return <Redirect to={{pathname:"/league/" + this.state.leagueLogin, state:{ allPlayers:this.state.players, leagueID:this.state.leagueID }}}/>;
    }
 
    return (
      <div>
          <div className="logo-container"><img className="logo" src="./logo.png" alt="logo"></img></div>
          <div className="header-login">Welcome to Streetball Scout</div>
            {/* Conditionally render different form if creating new League */}
            {this.state.showLoginForm &&
              <div className="login-container">
                <div className="mb-25">
                  <Input
                    name="leagueLogin"
                    value={this.state.leagueLogin}
                    onChange={this.handleInputChange}
                    placeholder="League ID"
                  />
                </div>
                <div className="mb-25">
                  <InputPass
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </div>
                <div className="mt-77">
                  <button  onClick={this.leagueLogin} className="btn-login">Login</button>
                  <button  onClick={this.leagueNew} className="btn-login">Create New</button>  
                </div>
                <div className="warningMsg">{this.state.errorMessage}</div> 
              </div> 
            }
            {/* Conditionally render different form if creating new League */}
            {this.state.showNewForm &&
              <div className="login-container">
                <div className="mb-25">
                  <Input
                    name="leagueLogin"
                    value={this.state.leagueLogin}
                    onChange={this.handleInputChange}
                    placeholder="League ID"
                  />
                </div>
                <div className="mb-25">
                  <InputPass
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </div>
                <div className="mb-25">
                  <InputPass
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    onChange={this.handleInputChange}
                    placeholder="Confirm Password"
                  />
                </div>
                <button  onClick={this.leagueNewCancel} className="btn-login">Cancel</button>
                <button  onClick={this.leagueNewSubmit} className="btn-login">Create New</button>
                <div className="mt-10 warningMsg">{this.state.errorMessage}</div> 
              </div>
            }
            
          
      </div>
    );
  }
}

export default Home;
