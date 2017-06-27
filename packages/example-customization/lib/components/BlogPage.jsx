/*
A new custom page just for our app.
Browse to http://localhost:3000/my-custom-route to see it.
*/

import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';

const BlogPage = () => {
  return (

    <div>

      <h1>The Record Blog</h1>


      <hr className="divider"></hr>

      <h3>First Round of Beta Testing! </h3>
      <p>Today we started sending out a few invitations to potential beta users. We're not looking for huge numbers of users yet, but here's what we've asked our beta testers to do for us at this point. We're super grateful for their support! </p>

      <p><b>What does it mean to be a beta user?</b></p>

      <p>It's easy to be a beta user. All we ask is that you head over to <a href="/">http://www.thercrd.org/</a>, make an account, and start to engage with the community. Read through posts, upvote the ones you think are important and flag any that have dubious sources. Then try writing a post of your own (check out the guidelines on the  <a href="/about">about page</a> for tips) and try to gain Reputation points. We hope you'll get hooked! There are just a few things we'd ask you to keep in mind: </p>

        <ol> 
          <li> You're the first ones here. That means that there won't be enough traffic at first to make this a really interesting news source. So we'd humbly ask that you make an effort to contribute as much as possible. Try to visit the site once a day and use up your daily allotment of posts and upvotes. You can even make multiple accounts if you'd like to try different strategies. </li>

          <li> More people will join, and we hope that this will quickly become a sustainable source of useful information. But we want to make sure we iron out all the kinks with a smaller user group at first before we make efforts to expand. After a couple weeks, we'll ask for your help in trying to promote The Record to a wider and more diverse audience, but for now please limit this to just a few close friends you think might be interested.  </li>

          <li> This is a work in progress -- expect it to get better over time. You'll notice that we'll be incrementally changing the look and feel of the site, fixing any bugs that you might report, and maybe adding new features. But we won't mess with your posts, privileges, passwords, or anything like that. For the sake of transparency, we'll describe any changes we make on our  <a href="/blog">blog.</a> </li>

          <li> We need your feedback. After you've had some time to get familiar with the platform, we'd like to ask you to fill out a  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeVtA2q1C-xSipcxxqChcGD0G-f8X5xzFCUpTzyBvcc6N7Hbw/viewform?c=0&w=1">beta user survey</a>.  We'll send out reminders in a couple weeks. This is really important for us to know how to improve the site. In the meantime, please submit any other feedback (bug reports, general comments) through this <a href="https://docs.google.com/forms/d/e/1FAIpQLScqw0V8mypSdpKjkh1jVFTuSC1bHNLXJ8S9JFSwpWu3B3_9aQ/viewform">form.</a></li>

          <li> Please subscribe to the newsletter. We won't start sending out regular newsletters for another week or so, but that will be a big part of the user experience as well. We'll send out another email regarding newsletter subscription options. </li>
        </ol>
        
        <p>
        <b>Interested in contributing in other ways?</b> </p>

        <p> We're super grateful for your participation as a beta user, but please let us know if you'd like to help out in other ways as well. We're always looking for skilled developers to help us add new features to the site. Checkout our  <a href="https://github.com/nathanmelenbrink/theRecord">repo on github</a> and please get in touch if you'd like to add something. </p>

        <p> Thank you so much for your time and interest in this project. We really believe that we can build a better way to share quality information with the world, and we're super happy to have you be a part of it. </p>

        <p>Sincerely,<br></br>
        The Record team

       </p>
     
      <p> <i> Posted February 4th, 2017 by Nathan </i> </p> 

      <hr className="divider"></hr>



      <p className="text-center"><a href="/">Back to The Record</a></p>

    </div>
  )
}

registerComponent('BlogPage', BlogPage);
