import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <center>
          <NavLink to="/" activeClassName="is-active" exact>
            home
          </NavLink>{" "}
          <NavLink to="/add" activeClassName="is-active">
            add
          </NavLink>{" "}
          <NavLink to="/list" activeClassName="is-active">
            list
          </NavLink>
        </center>
      </div>
    );
  }
}

export default Header;
