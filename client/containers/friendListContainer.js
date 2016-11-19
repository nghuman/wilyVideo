import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveFriends } from '../actions/friendsAction';
import FriendDetail from './friendDetailContainer';

class FriendList extends React.Component {
    constructor(props){
    super(props);
  }
     componentWillMount(){

      //call friends list and render
      this.props.retrieveFriends();
    }

  render(){
    let friend = this.props.friend[1];
    return (
          <div  style={{"width":"95%","height": "400px"}}>
            <div className="panel-group">
            <div className="panel  text-center">
              <h4>Contacts</h4>
            </div>
              {
                !friend ? "Loading...":
               <FriendDetail friend={friend} />
              }
            </div>
          </div>
      )
  }

}

function mapStateToProps(state){
  // console.log(state, ' state friendListContainer')
  return {friend: state.friend//,
         // authenticated: state.isAuthorized

  };
}

//binds action and container
function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveFriends  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
