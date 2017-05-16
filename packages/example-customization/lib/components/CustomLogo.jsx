/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way. 
*/

import React from 'react';
import { IndexLink } from 'react-router';
import Users from 'meteor/vulcan:users';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomLogo = ({logoUrl, siteTitle, currentUser}) => {
  return (
    <div>
    	<h1 className="logo-text"><IndexLink to="/"><img src='/logo.png' width = '400px'/></IndexLink>
    	<span className="beta-tag"> beta</span></h1> 
    	<p>Uninterpreted News.  
    	<a href="/about"> About the Record.</a></p>
    </div>
  )
}

replaceComponent('Logo', CustomLogo);