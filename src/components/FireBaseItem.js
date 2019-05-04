import React, { Component } from "react";
import { Link } from "react-router-dom";

class FireBaseItem extends Component {
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          margin: "15px",
          width: "250px",
          border: "2px solid black"
        }}
      >
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={this.props.urlImage}
          />
        </div>
        <div style={{ padding: "10px", wordBreak: "break-word" }}>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <p>
            <a href={this.props.urlImage} download target="_blank">
              download image
            </a>
          </p>
          <Link to={"/update/" + this.props.id}>
            <button>update</button>
          </Link>
          <button onClick={this.props.onClickDelete}>delete</button>
          {/* <button onClick={this.props.onClickDelete}>delete</button>
        <button onClick={this.props.onClickShowUpdateForm}>update</button> */}
        </div>
      </div>
    );
  }
}

export default FireBaseItem;
