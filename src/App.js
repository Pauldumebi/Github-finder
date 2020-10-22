import React, {Component} from 'react';
import Navbar from './Components/layout/Navbar'
import axios from 'axios'
import Users from './Components/users/Users';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  }
  async componentDidMount () {
    this.setState({loading: true}); 
    const res = await axios.get('https://api.github.com/users')

    console.log(res.data)
    this.setState({loading: false, users: res.data})
  }
  render() {
    return (
    <div className="App">
      <Navbar />
      <Users loading={this.state.loading} users={this.state.users} />
    </div>
  );
  }
}

export default App;
