import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth'



// loding icon from ant desin
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // displayed the values on our console from form
        // console.log('Received values of form: ', values);
        this.props.onAuth(values.userName, values.password);
      }
    });
    // once login it will redirect you to '/' route
    this.props.history.push('/');
  }

  render() {
    let errorMessage = null;
    if(this.props.error){
      errorMessage=(
        <p> {this.props.error.message} </p>
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
          {errorMessage}
          {
            this.props.loading ?

            <Spin indicator={antIcon} />

            :


          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                    Login
                </Button>
                OR
                <NavLink
                style={{marginRight: '10px'}}
                to='/signup/'> signup
                </NavLink>
            </FormItem>
          </Form>
        }
      </div>
    );
  }
}

// this creates a form from top component ^^^ and passes its values

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps= (state) =>{
  return{
    loading: state.loading,
    error: state.error
  }

}


const mapDispatchToProps = dispatch =>{
  return {
    onAuth: (username, password)=>(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(WrappedNormalLoginForm);
