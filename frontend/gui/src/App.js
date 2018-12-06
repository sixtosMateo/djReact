import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

// to access out action method
import * as actions from './store/actions/auth';

// grab store and allow to have access to some state from store
import { connect } from 'react-redux';

import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';


class App extends Component {
  componentDidMount(){
    //this is a dispatch method
    this.props.onTryAutoSignup();
  }

  // {...this.props} passes the isAuthenticated argument into CustomLayout
  render() {
    return (
      <div>
        <Router>
        <CustomLayout {...this.props}>
          <BaseRouter/>
        </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return{
    isAuthenticated: state.token !== null
  }
}

//on object we specify the property that we want to reference
// onTryAutoSignUp is a dispatch
const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}



//connect method can pass two functions
  // first method - map state two props
      // - converts state from store react-redux into properties that can pass
      // into our app
      // - dont need to define state in our class App but define mapState method
  // second method - second one is map dispatch two props
      // - setting up an automatic authentication check on app
          // when app is rendered it will automatically check for authentication
      // mapping a method


//pass the mapStateToProps into connect allowing us to access to a property
export default connect(mapStateToProps, mapDispatchToProps) (App);
