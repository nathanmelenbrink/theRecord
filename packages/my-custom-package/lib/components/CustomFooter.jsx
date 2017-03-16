import React from 'react';
import { FormattedMessage } from 'react-intl';

const Footer = props => {
  return (
    <div className="footer">
    	<p className="text-center">
            <a href="/leaderboard">Leaderboard</a>  &nbsp;
    		<a href="/about">About</a>  &nbsp;
            <a href="/blog">Blog</a>  &nbsp;
    		<a href="/account">Subscribe to the Newsletter</a>  &nbsp;
    		<a href="https://goo.gl/forms/TznI1C6qUeXwtklm1">Contact Us</a> &nbsp;
    		<a href="https://goo.gl/forms/RnSDFy8wQ0gaNLLR2">Beta User Survey</a>
    	</p>

    	<p className="text-center-small">
    		<a href="http://telescopeapp.org" target="_blank"><FormattedMessage id="app.powered_by"/></a>
    	</p>    
    </div>
  )
}

Footer.displayName = "Footer";

module.exports = Footer;