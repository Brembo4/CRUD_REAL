import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1091168644405-lq6qri9h4ve46udkk3he8sc052m7ch48.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn === true) this.props.signIn(this.auth.currentUser.get().getId());
    else this.props.signOut();
  };
  trySignOut() {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  trySignIn() {
    window.gapi.auth2.getAuthInstance().signIn();
  }
  renderAuthButton() {
    if (this.props.isSignedIn === null) return <div>idk</div>;
    else if (this.props.isSignedIn)
      return (
        <div>
          <div>Signed in with Google!</div>
          <button
            style={{ width: "204px" }}
            className="ui red google button"
            onClick={this.trySignOut}
          >
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    else
      return (
        <div>
          <div>Not currently signed in</div>
          <button
            style={{ width: "204px" }}
            className="ui red google button"
            onClick={this.trySignIn}
          >
            <i className="google icon" />
            Sign In through Google
          </button>
        </div>
      );
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
