import React from "react";
import './Footer.css';

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return <div className="footer">&copy; {year} All Rights Reserved - ESPS </div>;
};

export default Footer;