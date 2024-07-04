import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="."
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>Cloud storage</i>
        </h5>
        <h1>Мои файлы</h1>
      </div>
    );
  }
}

export default Header;
