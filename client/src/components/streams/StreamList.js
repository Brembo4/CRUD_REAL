import React from "react";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId)
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
  }
  renderCreate() {
    if (this.props.isSignedIn)
      return (
        <div style={{ textAlign: "right" }}>
          <Link className="ui button primary" to="/streams/new">Create Stream</Link>
        </div>
      );
  }
  renderStreams() {
    if (!this.props.streams) return "loading..";
    return this.props.streams.map(el => {
      return (
        <div className="item" key={el.id}>
          {this.renderAdmin(el)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link className="header" to={`/streams/${el.id}`}>{el.title}</Link>
            <div className="description">{el.description}</div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
