import React, { Component } from "react";
import FireBaseItem from "./FireBaseItem";
import firebase from "./FireBaseConfig";
import "./Loading.css";
class FireBaseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blogList: []
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.getBlogsFromFireBaseAndPutThemInState = this.getBlogsFromFireBaseAndPutThemInState.bind(
      this
    );
  }

  componentDidMount() {
    this.getBlogsFromFireBaseAndPutThemInState();
  }

  getBlogsFromFireBaseAndPutThemInState() {
    firebase
      .database()
      .ref("/blog")
      .once("value")
      .then(blogs => {
        let newBlogList = [];

        const bolgsObject = blogs.val();

        for (const blog in bolgsObject) {
          newBlogList = [...newBlogList, bolgsObject[blog]];
        }

        this.setState({ blogList: newBlogList, isLoading: false });
      });
  }

  onClickDelete(id) {
    firebase
      .storage()
      .ref("images/")
      .child(id)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("blog/" + id)
          .remove();
        this.getBlogsFromFireBaseAndPutThemInState();
      })
      .catch(err => {
        console.log("error", err);
      });
  }
  render() {
    return (
      <div>
        <center>
          <h1 style={{ textAlign: "center" }}>List</h1>
          {this.state.isLoading && <div class="lds-dual-ring" />}
          {!this.state.isLoading &&
            this.state.blogList.map(blog => {
              return (
                <FireBaseItem
                  {...blog}
                  onClickDelete={() => {
                    this.onClickDelete(blog.id);
                  }}
                />
              );
            })}
        </center>
      </div>
    );
  }
}

export default FireBaseList;
