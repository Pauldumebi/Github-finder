import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Alert from './Components/layout/Alert'
import axios from 'axios'
import Users from './Components/users/Users';
import User from './Components/users/User';
import Search from './Components/users/Search';
import About from './Components/Pages/About'
import './App.css';

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState(false)
  const [loading, setLoading] = useState(null)
  const [alert, setAlert] = useState([])
 
  // async componentDidMount () {
  //   setLoading(true);
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   console.log(res.data)
  //   this.setState({loading: false, users: res.data})
  // }
  //Search github Users
  const searchUsers = async (text) => {
   setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(res.data.items);
    setLoading(false);
  }
  //Get user 
  const getUser = async (username) => {
   setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data.items);
    setLoading(false);
  }
  //Get user repos 
  const getUserRepos = async (username) => {
     setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

   setRepos(res.data);
   setLoading(false);
  }
  //Clear Users 
  const clearUsers = async () => {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

   setUsers(res.data);
   setLoading(false);
  }
  // Alert 
  const showAlert = (msg, type) => {
    setAlert({ msg, type})
    setTimeout(() => setAlert(null), 3000);
  }
  
    return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} setAlert={showAlert}/>
                <Users loading={loading} users={users} />
              </Fragment>
            )}
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
            <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading}/>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
    );
}

export default App;
