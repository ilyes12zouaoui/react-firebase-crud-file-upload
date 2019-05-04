import React, { Component } from "react";
import firebase from "firebase";
import "./Loading.css";
class FireBaseUpdate extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      isLoading: true,
      blogId: this.props.match.params["id"],
      title: "",
      description: "",
      urlImage: ""
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/blog/" + this.state.blogId)
      .once("value")
      .then(blogs => {
        const bolgObject = blogs.val();

        this.setState({ ...bolgObject, isLoading: false });
      });
  }

  onFormSubmit(event) {
    event.preventDefault();

    let newBlog = {
      id: this.state.blogId,
      title: this.state.title,
      description: this.state.description,
      urlImage: this.state.urlImage
    };

    firebase
      .database()
      .ref("blog/" + this.state.blogId)
      .set(newBlog);

    this.setState({ title: "", description: "", urlImage: "" });
    this.props.history.push("/list");
  }

  onInputChange(event) {
    let newState = {};

    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <center>
          <h1>UPDATE FORM</h1>
          {this.state.isLoading && <div class="lds-dual-ring" />}
          {!this.state.isLoading && (
            <form onSubmit={this.onFormSubmit}>
              <label>title</label>
              <input
                type="text"
                value={this.state.title}
                onChange={this.onInputChange}
                name="title"
              />
              <br />
              <label>description</label>
              <input
                type="text"
                value={this.state.description}
                name="description"
                onChange={this.onInputChange}
              />
              <br />

              <input type="submit" value="update" />
            </form>
          )}
        </center>
      </div>
    );
  }
}

export default FireBaseUpdate;
