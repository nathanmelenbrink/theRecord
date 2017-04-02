/*
A new custom route for our custom page. 
Browse to http://localhost:3000/my-custom-route to see it.
*/

import { addRoute, getComponent } from 'meteor/vulcan:core';
import UsersList from './components/UsersList.jsx';

addRoute({name: "about", path: "/about", component: getComponent("MyCustomPage")});
addRoute({name: "blog", path: "/blog", component: getComponent("BlogPage")});
//addRoute({name: "leaderboard", path: "/leaderboard", component: getComponent("UsersList")});
addRoute({name: "leaderboard", path: "/leaderboard", component: UsersList });