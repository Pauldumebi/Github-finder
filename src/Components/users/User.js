import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Repos from '../repos/Repos'

export class User extends Component {
   componentDidMount() {
      this.props.getUser(this.props.match.params.login);  
      this.props.getUserRepos( this.props.match.params.login);  
   }
   static propTypes = {
      user: PropTypes.object.isRequired,
      repos:PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
      getUser: PropTypes.func.isRequired,
      getUserRepos: PropTypes.func.isRequired
   }
   render() {
      const {
         name,
         avatar_url,
         location,
         bio,
         blog,
         login,
         company,
         html_url,
         followers,
         following,
         public_repos,
         public_gists,
         hireable
      } = this.props.user;

      const {loading, repos} = this.props;
      if (loading) return <Spinner />
      return (
         <Fragment>
            <Link to = '/' className = 'btn btn-danger my-2'>
               Back to Search
            </Link>
            Hireable: {''}
            {hireable ? (<i className="fa fa-check text-success"/>) : (
               <i className="fa fa-times-circle text-danger"/>
            )}
            <div className="profile-card grid">
               <div className="text-align">
                  <img src={ avatar_url} className="round-img" alt="" style={{width:'150px'}}/>
                  <h1>{name}</h1>
                  <p>Location: {location}</p>
               </div>
               <div>
                  {bio && (<Fragment>
                     <h3>Bio</h3>
                     <p>{bio}</p>
                  </Fragment>)}
                  <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                  <ul>
                     <li>
                        {login && <Fragment>
                        <strong>Username: </strong> {login}
                        </Fragment>}
                     </li>
                     <li>
                        {company && <Fragment>
                        <strong>Company: </strong> {company}
                        </Fragment>}
                     </li>
                     <li>
                        {blog && <Fragment>
                        <strong>Website: </strong> {blog}
                        </Fragment>}
                     </li>
                  </ul>
               </div>
            </div>
            <div className="card card-badge text-center">
               <div className="badge badge-primary">followers: {followers}</div>
               <div className="badge badge-success">following: {following}</div>
               <div className="badge badge-danger">public Repos: {public_repos}</div>
               <div className="badge badge-dark">public Gists: {public_gists}</div>
            </div>
            <h2>Recent Repos</h2>
            <Repos repos={repos}/>
         </Fragment>
      )
   }
}

export default User
