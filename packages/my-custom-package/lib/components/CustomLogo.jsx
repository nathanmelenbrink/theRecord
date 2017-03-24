/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way.
*/

import React from 'react';
import { IndexLink } from 'react-router';

const CustomLogo = ({logoUrl, siteTitle}) => {
  return (
    <div>
    <h1 className="logo-text"><IndexLink to="/"><img src='/logo.png' width = '400px'/></IndexLink>
    <span className="beta-tag"> beta</span></h1> 
    <p>A community dedicated to promoting neutral and verifiable news on the web. 
    <a href="/about"> About the Record.</a></p>
    </div>
  )
}

export default CustomLogo;