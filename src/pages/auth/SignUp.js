import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import makeRequest from "../api/config-request";
import JSAlert from 'js-alert';
import { compose } from "recompose";

import {
  FormControl,
  Button as MuiButton,
  Paper,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import './style.css';
import { urlList } from "../api/config";
const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;



const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F3903F',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F3903F',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F3903F',
    },
    '&:hover fieldset': {
      borderColor: '#F3903F',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F3903F',
    },
  },
});

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const API = 'https://ipapi.co/json/';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }


  onSubmit = event => {
    const { username, email, password, phone } = this.state;

    if (email === '' || password === '' || username ==='' || phone === '') {
      JSAlert.alert("<code>Vui lòng nhập email và password</code>", null, JSAlert.Icons.Failed);
      return false;
    }

  
    makeRequest("post", urlList().URL_AUTHEN.REGISTER, {
      email : email, 
      userName : username,
      phoneNumber: phone,
      password : password,
      timestamp: 1627282250000
    })
      .then(({ data }) => {
        if(data.data){
          JSAlert.alert("<code>Đăng kí thành công</code>", null, JSAlert.Icons.Success);
          this.props.history.push('/umusic/sign-in')
        }
        else{
          JSAlert.alert("<code>"+ data.desc +"</code>", null, JSAlert.Icons.Failed);
        }
      })
      .catch((err) => {
        console.log("++++++++++++++++", err);
      });



    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, password,  error ,phone} = this.state;

   

    return (
      <Wrapper>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src={require('../../assets/logo.png')} style={{ width: '200px' }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: '50px', fontWeight: 700, fontFamily: 'Inter, Rubik, sans-serif' }}>
          Đăng ký
        </p>

        <form onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <CssTextField id="username"
              name="username"
              label="Họ và tên"
              variant="outlined"
              placeholder="Họ và tên"
              value={username}
              onChange={this.onChange}
              autoComplete="username"
              autoFocus />


          </FormControl>
          
          <FormControl margin="normal" required fullWidth>
            <CssTextField id="email"
              name="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={this.onChange}
              autoComplete="email"
              autoFocus />

          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <CssTextField id="phone"
              name="phone"
              label="Phone"
              variant="outlined"
              placeholder="phone"
              value={phone}
              onChange={this.onChange}
              autoComplete="phone"
              autoFocus />

          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <CssTextField name="password"
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              value={password}
              onChange={this.onChange}
              autoComplete="password"
              autoFocus />
          </FormControl>
         
          <Button
           
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            mt={2}
          >
            Đồng ý
          </Button>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>

            <Button
              component={Link}
              to="/umusic/sign-in"
              color="primary"
            >
              &lt;
            </Button>
          </div>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </form>
      </Wrapper>
    );
  }
}

// export default SignUp;
const SignUp = compose(
  withRouter,
  // withFirebase
)(SignUpForm);

export default SignUp;
