import React from "react";
import { SignIn } from "aws-amplify-react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';




export class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleSubmit(e) {
    e.preventDefault();
    super.signIn();
  }

  showComponent() {
    console.log(this.props);

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: 125, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <form style={{ width: '100%', marginTop: 10 }} onSubmit={this.handleSubmit}>
            <TextField variant="outlined" style={{fontSize: 15 }}  required fullWidth name="username" onChange={this.handleInputChange} type="text" label="Username or Email"/>
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" onChange={this.handleInputChange} type="password" />
            <Button fullWidth type="submit" style={{ height: 50, marginTop: 20, fontSize: 15 }} variant="contained" color="primary">
              Log In
            </Button>
            <Grid container style={{ width: '100%', marginTop: 10 }}>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs>
                <button type="button" style={{marginTop: 3, paddingLeft: 30 }} className="btn btn-link" onClick={() => super.changeState("forgotPassword")}>
                  Forgot password?
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}