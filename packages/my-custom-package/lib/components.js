/*
This file centralizes all our custom component overrides.
*/

import Telescope from 'meteor/nova:lib';

import CustomLogo from "./components/CustomLogo.jsx";
import CustomNewsletter from "./components/CustomNewsletter.jsx";
import CustomPostsItem from "./components/CustomPostsItem.jsx";
import CustomUsersMenu from "./components/CustomUsersMenu.jsx";
import CustomUsersProfile from "./components/CustomUsersProfile.jsx";
import CustomPostsCommentsThread from "./components/CustomPostsCommentsThread.jsx";
import CustomVote from "./components/CustomVote.jsx";
import Flag from "./components/Flag.jsx";

Telescope.components.Logo = CustomLogo;
Telescope.components.Newsletter = CustomNewsletter;
Telescope.components.PostsItem = CustomPostsItem;
Telescope.components.UsersMenu = CustomUsersMenu;
Telescope.components.UsersProfile = CustomUsersProfile;
Telescope.components.PostsCommentsThread = CustomPostsCommentsThread;
Telescope.components.Flag = Flag;
Telescope.components.Vote = CustomVote;