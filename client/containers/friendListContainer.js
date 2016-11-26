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
        this.props.retrieveFriends()
      // call friends list and render

      //updates friend status every 5 seconds.
      setInterval(  ()=>{
        console.log(' set Interval Called!')
        this.props.retrieveFriends()
      }, 30000 );

    }

  render(){
    let friend = this.props.friend[this.props.friend.length-1];
    // let friend = this.props.friend[1];
    return (
          <div>
              <h4 className='contactTitle'>Contacts</h4>

            <div className="panel-group">
            </div>

              {
                !friend ? "Loading...":
               <FriendDetail friend={friend} />
              }
          </div>
      )
  }
}

function mapStateToProps(state){
  return {friend: state.friend };
}

//binds action and container
function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveFriends  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
