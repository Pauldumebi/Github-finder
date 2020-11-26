import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Search = (searchUsers, showClear, clearUsers, setAlert) => {
   const [text, setText] = useState('')

   const onChange = (e) => setText(e.target.value)
   }
   const onSubmit = (e) => {
      e.preventDefault()
      if (text === '') {
         setAlert('Please enter a User', 'light')
      } else {
         searchUsers(text)
         setText('')
      }
   }
  
   return (
      <div>
         <form className="form" style={{marginBottom: '1.5rem'}} onSubmit={onSubmit}> 
            <input type="text" name="text" placeholder="Search Users..." style={{margin: '1.5rem 0',padding: '.5rem 1.5rem',  display: 'block', width: '100%', fontSize: '16px', border: '.1px #c0c0c0 solid'}} value={text} onChange={onChange}/>
            <input type="submit" value="Search" className="btn btn-dark btn-block" style={{fontSize: '16px'}}/>
         </form>
         <button className= "btn btn-light btn-block Clearbtn" onClick={clearUsers} style={{fontSize: '16px', marginBottom: '1.5rem', backgroundColor: '#0275d8'}}>Clear</button>
      </div>
   )
}
 
static propTypes = {
   searchUsers: PropTypes.func.isRequired,
   clearUsers: PropTypes.func.isRequired,
   setAlert: PropTypes.func.isRequired,
}

export default Search
