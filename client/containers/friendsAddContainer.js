import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addFriend } from '../actions/friendsAction';
import { retrieveFriends, getNonFriends } from '../actions/friendsAction';
import FriendDetail from './friendDetailContainer';

class FriendAdd extends React.Component {
  constructor(props){
    super(props);
    console.log(props, ' friendsAddContainer Props LINE 11');
    this.state = {nonFriends:[], selectedVal:''};
    this.state.selectedUserName = '';
    this.state.defaultValue = 'Available Users';
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

//Triggered before render().
  componentWillMount() {
     this.props.getNonFriends();
  }

  //Sets friend as state after component when props has been changed
  //Called before render when props change. Access to old props. It is not triggered after the component is mounted.
  componentWillReceiveProps(nextProps) {
   this.setState({nonFriends: nextProps.nonFriends});
    // console.log(this.state, 'componentWillReceiveProps, friendsAddContainer');
  }

  //Add friend to database
  onFormSubmit(e){
    e.preventDefault();
    // need to Add Friends to current user
    this.props.addFriend(this.state.selectedVal)
    .then(()=>{
      console.log('THIS IS .THEN!!!');
      this.props.retrieveFriends();
      this.props.getNonFriends();
    })
  }

  handleChange(e){
    let id = e.target.value;
    this.setState( {selectedVal:id} );
  }

  render(){
    return (
      <div>

      <form onSubmit={this.onFormSubmit} className="input-group">
          <select onChange={this.handleChange} className="form-control">
            <option selected="selected" disabled> Available Users </option>
            {
            !this.state.nonFriends ? 'Loading Users...' :
             this.state.nonFriends.map( (user, i) => {
              return(
            <option  value={user.id} key={user.id}> Email: {user.email}</option> )
            })
          }
          </select>
        <span className="input-group-btn">
          <button className="btn btn-primary"> Add </button>
        </span>
      </form>
      </div>
      )
  }
}

function mapStateToProps(state){
  // console.log(state, 'AllUser except friend and curr, friendsAddContainer')

  return {nonFriends: state.friend[0]}
}

//binds action and container
function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveFriends, addFriend, getNonFriends}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendAdd)
