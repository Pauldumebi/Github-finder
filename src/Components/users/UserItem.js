import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const UserItem = ({user:{login, avatar_url, html_url}}) => {
      return (
         <div className="card">
            <img src={avatar_url} alt='' className="round-img" style={{borderRadius: '50%'}}/>
            <h2 style={{padding: '.5rem'}}>{login}</h2>
            <div  style={{paddingBottom: '1.5rem'}}>
               <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
         </div>
      )
}
UserItem.propTypes = {
   user: PropTypes.object.isRequired,
}

export default UserItem
