import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
   state = {
      text: ''
   } 
   static propTypes = {
      searchUsers: PropTypes.func.isRequired,
      clearUsers: PropTypes.func.isRequired,
      setAlert: PropTypes.func.isRequired,
   }
   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }
   onSubmit = (e) => {
      e.preventDefault()
      if (this.state.text === '') {
         this.props.setAlert('Please enter a User', 'light')
      } else {
         this.props.searchUsers(this.state.text)
         this.setState({ text: ''})
      }
   }
  
   render() {
      return (
         <div>
            <form className="form" style={{marginBottom: '1.5rem'}} onSubmit={this.onSubmit}> 
               <input type="text" name="text" placeholder="Search Users..." style={{margin: '1.5rem 0',padding: '.5rem 1.5rem',  display: 'block', width: '100%', fontSize: '16px', border: '.1px #c0c0c0 solid'}} value={this.state.text} onChange={this.onChange}/>
               <input type="submit" value="Search" className="btn btn-dark btn-block" style={{fontSize: '16px'}}/>
            </form>
            <button className="btn btn-light btn-block Clearbtn" onClick={this.props.clearUsers} style={{fontSize: '16px', marginBottom: '1.5rem', backgroundColor: '#0275d8'}}>Clear</button>
         </div>
      )
   }
}

export default Search
