import React, {Component} from 'react';
import Navbar from './Components/layout/Navbar'
import './App.css';
import UserItem from './Components/users/UserItem';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Navbar />
      <UserItem />
    </div>
  );
  }
}

export default App;
