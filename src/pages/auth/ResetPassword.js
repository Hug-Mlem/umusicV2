import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import JSAlert from 'js-alert';
import makeRequest from "../api/config-request";

import {
  FormControl,
  Button as MuiButton,
  Paper,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import './style.css'
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
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    makeRequest("post", urlList().URL_AUTHEN.FORGOTPASS, {
      email: email,
      timestamp: 1627282250000
  })
      .then(({ data }) => {
        
          this.props.history.push('/umusic/')
      })
      .catch((err) => {
          JSAlert.alert("<code>"+err+"</code>", null, JSAlert.Icons.Failed);
          console.log("++++++++++++++++", err);
      });
  

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <Wrapper>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src={require('../../assets/logo.png')} style={{ width: '200px' }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: '50px', fontWeight: 700, fontFamily: 'Inter, Rubik, sans-serif' }}>
          Quên mật khẩu
          <br />

        </p>
        <p style={{ textAlign: 'center', fontSize: '20px', }}>
          Nhập email để lấy lại mật khẩu
        </p>

        <form onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <CssTextField id="email" label="Email" variant="outlined" placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              autoComplete="email"
              autoFocus />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            mt={2}
          >
            Reset password
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

export default PasswordForgetFormBase;
