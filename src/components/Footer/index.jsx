import React, { Component } from "react";
import "./Footer.less";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer__text">
          &copy;&nbsp;{new Date().getFullYear()} Ярмухаметов Ринат
        </p>
      </footer>
    );
  }
}

export default Footer;
