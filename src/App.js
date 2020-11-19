import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Alert from './Components/layout/Alert'
import axios from 'axios'
import Users from './Components/users/Users';
import User from './Components/users/User';
import Search from './Components/users/Search';
import About from './Components/Pages/About'
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }
  async componentDidMount () {
    this.setState({loading: true}); 
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    console.log(res.data)
    this.setState({loading: false, users: res.data})
  }
  //Search github Users
  searchUsers = async (text) => {
    this.setState ({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({loading: false, users: res.data.items})
  }
  //Get user 
  getUser = async (username) => {
    this.setState ({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({loading: false, user: res.data})
  }
  //Get user repos 
    getUserRepos = async (username) => {
    this.setState ({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({loading: false, repos: res.data})
  }
  //Clear Users 
  clearUsers = async () => {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({loading: false, users: res.data})
  }
  // Alert 
  setAlert = (msg, type) => {
    this.setState({alert:{ msg, type}});

    setTimeout(() => this.setState({alert: null}), 3000);
  }
  
  render() {
    return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users} />
              </Fragment>
            )}
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
            <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading}/>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
