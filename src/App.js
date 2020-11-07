import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Alert from './Components/layout/Alert'
import axios from 'axios'
import Users from './Components/users/Users';
import Search from './Components/users/Search';
import About from './Components/Pages/About'
import './App.css';

class App extends Component {
  state = {
    users: [],
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
          </Switch>
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
