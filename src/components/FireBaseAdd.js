import React, { Component } from "react";
import firebase from "firebase";
class FireBaseAdd extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      isLoading: false,
      title: "",
      description: "",
      urlImage: "",
      file: ""
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  onFormSubmit(event) {
    event.preventDefault();

    const id = this.generateId();

    let newBlog = {
      id: id,
      title: this.state.title,
      description: this.state.description,
      urlImage: ""
    };

    firebase
      .storage()
      .ref(`images/${id}`)
      .put(this.state.file)
      .on(
        "state_changed",
        progress => {
          console.log("progress");
          this.setState({ isLoading: true });
        },
        error => {
          console.log("erroe", error);
        },
        () => {
          console.log("done");
          firebase
            .storage()
            .ref("images")
            .child(id)
            .getDownloadURL()
            .then(url => {
              newBlog.urlImage = url;
              firebase
                .database()
                .ref("blog/" + id)
                .set(newBlog);
              this.props.history.push("/list");
            });
        }
      );
  }

  onInputChange(e) {
    const name = e.target.name;

    if (name == "file") {
      this.setState({ [name]: e.target.files[0] });
    } else {
      this.setState({ [name]: e.target.value });
    }
  }

  render() {
    return (
      <div>
        <center>
          <h1>ADD FORM</h1>
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
            <label>image</label>
            <input type="file" onChange={this.onInputChange} name="file" />
            <br />
            <input type="submit" value="add" />
          </form>
          {this.state.isLoading && (
            <div>
              <h2>Wait please ...</h2>
              <div class="lds-dual-ring" />
            </div>
          )}
        </center>
      </div>
    );
  }
}

export default FireBaseAdd;
