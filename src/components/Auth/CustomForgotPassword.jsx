import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import KloudiusLogo from '../../KloudiusLogo.PNG';

export class CustomForgotPassword extends ForgotPassword {
  constructor(props) {
    super(props);
    this._validAuthStates = ["forgotPassword"];
    this.handleSend = this.handleSend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { delivery: null };
  }

  handleSend(e) {
    e.preventDefault();
    super.send();
  }

  handleSubmit(e) {
    e.preventDefault();
    super.submit();
  }

  sendView() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: 125, display: 'flex', flexDirection: 'column' }} >
          {/* <img src={KloudiusLogo} alt="Logo" height="100%" width="100%" /> */}
          <div align='left' style={{ fontSize: 20, marginTop: 10 }}> Reset your password</div>
          <form style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onSubmit={this.handleSend}>
            <TextField variant="outlined" required fullWidth name="username" onChange={this.handleInputChange} type="text" label="Email Address" />
            <Button fullWidth type="submit" style={{ height: 50, marginTop: 20 }} variant="contained" color="primary">
              Send code
            </Button>
            <Grid container style={{ width: '100%', marginTop: 10}}>
              <Grid item xs>
                <button type="button" className="btn btn-link" onClick={() => super.changeState("signIn")}>
                  Back to sign in
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  submitView() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: 180, display: 'flex', flexDirection: 'column' }} >
          <h5 align='left'> Reset your password</h5>
          <form style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onSubmit={this.handleSubmit}>
            <TextField variant="outlined" required fullWidth name="code" onChange={this.handleInputChange} type="text" label="Code" />
            <TextField variant="outlined" required margin="normal" fullWidth name="password" onChange={this.handleInputChange} type="password" label="New Password" />
            <Button fullWidth type="submit" style={{ height: 50, marginTop: 20 }} variant="contained" color="primary">
              Submit
            </Button>
            <Grid container style={{ width: '100%', marginTop: 10, marginLeft: -13 }}>
              <Grid item xs>
                <button type="button" className="btn btn-link" onClick={() => super.send()}>
                  Resend Code
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  showComponent() {
    const { authData = {} } = this.props;
    return (
      <div>
        {this.state.delivery || authData.username ? this.submitView() : this.sendView()}
      </div>
    );
  }
}