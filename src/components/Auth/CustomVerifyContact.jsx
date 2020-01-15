import React from "react";
import { VerifyContact } from "aws-amplify-react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Auth from '@aws-amplify/auth';
// import KloudiusLogo from '../../KloudiusLogo.PNG';

export class CustomVerifyContact extends VerifyContact {
  constructor(props) {
    super(props);
    this._validAuthStates = ["verifyContact"];
    this.handleVerify = this.handleVerify.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { verifyAttr: null };
  }

  handleVerify(e) {
    e.preventDefault();
    const checkedValue = 'email';
    Auth.verifyCurrentUserAttribute(checkedValue)
      .then(() => {
        this.setState({ verifyAttr: checkedValue });
      })
      .catch(err => this.error(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    super.submit();
  }

  verifyView() {
    return (
      <form style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onSubmit={this.handleVerify}>
        <Button fullWidth type="submit" style={{ height: 50, marginTop: 20 }} variant="contained" color="primary">
          Send code
        </Button>
      </form>
    );
  }

  submitView() {
    return (
      <form style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onSubmit={this.handleSubmit}>
        <TextField variant="outlined" required fullWidth name="code" onChange={this.handleInputChange} type="text" label="Code" />
        <Button fullWidth type="submit" style={{ height: 50, marginTop: 20 }} variant="contained" color="primary">
          Submit
        </Button>
      </form>
    );
  }

  showComponent() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: 125, display: 'flex', flexDirection: 'column' }} >
          {/* <img src={KloudiusLogo} alt="Logo" height="100%" width="100%" /> */}
          <div align='left' style={{ fontSize: 20, marginTop: 10 }}> Verify your email</div>
          <div>
            {this.state.verifyAttr ? this.submitView() : this.verifyView()}
          </div>
        </div>
      </Container>
    );
  }
}