import React from "react";
import { RequireNewPassword } from "aws-amplify-react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import KloudiusLogo from '../../KloudiusLogo.PNG';

export class CustomRequireNewPassword extends RequireNewPassword {
  constructor(props) {
    super(props);
    this._validAuthStates = ["requireNewPassword"];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    super.change();
  }

  showComponent() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: 125, display: 'flex', flexDirection: 'column' }} >
          {/* <img src={KloudiusLogo} alt="Logo" height="100%" width="100%" /> */}
          <div align='left' style={{ fontSize: 20, marginTop: 10 }}> New password required</div>
          <form style={{ width: '100%', marginTop: 10, alignItems: 'center' }} onSubmit={this.handleSubmit}>
            <TextField variant="outlined" required fullWidth name="password" onChange={this.handleInputChange} type="password" label="New Password" />
            <Button fullWidth type="submit" style={{ height: 50, marginTop: 20 }} variant="contained" color="primary">
              Change
            </Button>
            <Grid container style={{ width: '100%', marginTop: 10, marginLeft: -13 }}>
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
}