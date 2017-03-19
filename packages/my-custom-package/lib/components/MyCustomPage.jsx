/*
A new custom page just for our app.
Browse to http://localhost:3000/my-custom-route to see it.
*/

import React from 'react';

const MyCustomPage = () => {
  return (

    <div>

      <h1>About The Record</h1>

      <hr className="divider"></hr>

      <h3>How It Works</h3>
      <p>The Record is designed for simplicity and transparency. All users are given equal privileges -- the ability to post, upvote posts, and flag posts that are not credibly sourced. Posts that receive more flags than upvotes will appear at the bottom of the feed. The more you participate, the more you'll rack up Reputation points. As your Reputation increases, so will your privileges, including the number of times you can post or upvote per day. If, however, a user is seen as being excessively biased or antagonizing, that user can be flagged by other users, which will result in a deduction of Reputation points. This creates a "community policing" effect. The users with the highest Reputation are those that are able to propagate the most meaningful information without marginalizing others. </p>
      <p>To further promote transparency to all readers, anything you post, upvote, or flag will be permanently listed on your public profile. In exchange, we promise full disclosure of the source code that makes the site work -- if we ever make any changes to our algorithms, we will thoroughly explain them in a blog post. </p> 
      <p>Email addresses, passwords and all other account information will be kept private and secure, and will never be disclosed to other users. </p>

      <hr className="divider"></hr>

      <div>
        <img src = '+1.svg' width='250px'/>
        <img src = '-10.svg' width='250px'/>
        <img src = '+10.svg' width='250px'/>
        <img src = '-100.svg' width='250px'/>
      </div>


      <hr className="divider"></hr>

      <h3>Motivation</h3>
      <p>The Internet has given us unprecedented access to information, so why do we feel so surrounded by <i>misinformation</i>? Have you ever wished for a way to access informative daily news without worrying about media bias? What if there was a web platform that prioritized enriching the worldviews of its users over simply feeding them "likable" content? </p>

      <p>In an increasingly divided era, one thing that people seem comfortable agreeing on is that our media landscape is increasingly polarized. The reasons why this is the case are quite clear -- more and more people get their news from social media outlets, which run on algorithms that prioritize reinforcement of people's preexisting views. The rise of social media in general has exerted considerable pressure on conventional news media outlets. This is becoming a growing cause of concern -- as familiar news outlets prioritize "clickbait" over informative headlines, readers are understandably harboring increasingly skeptical views toward media that they used to trust. </p>

      <p>The idea for The Record came from watching a popular televised political debate, in which the two candidates spent a non-trivial amount of time arguing over what "the record showed" that they had said in the past. That seemed to be a waste of an opportunity for valuable discourse. In theory, a healthy debate requires at least two different interpretations of a mutually agreed upon canon of information. If the candidates are instead debating their own interpretations of <i>different sets of information,</i> then the possibility of arriving at an agreement, or even understanding each other’s positions, is precluded entirely. </p>

      <p>There is currently no evidence to suggest that this situation will change on its own. However, it might actually be a good thing that people are becoming more skeptical of what they read or see on TV. While we appreciate the value of media interpretation on the information superhighway, we felt it was important to create an alternative that puts you, the reader, in the driver's seat. The Record allows you to seamlessly search and filter through clearly sourced and verifiable information, and contribute what you think is important. We'll spare you our interpretation to leave you room to develop your own. </p>

      <hr className="divider"></hr>

      <h3>What Makes The Record Different</h3>
      <p>Unlike other news outlets, we can guarantee that we have no editorial bias, simply because we have no editors. The posts that get promoted are simply the ones that are most upvoted by the community -- no exceptions. We have no corporate sponsors or shareholders, and are funded solely through small contributions from users like you. </p>
      <p>The Record has no hierarchy -- all users have an equal opportunity to express their opinions and be heard.</p>

      
      <hr className="divider"></hr>
      <h3>Guidelines for Posting</h3>
      <p>There are three basic guidelines that users should follow in order to make sure The Record remains a valuable source for news. </p> 

      <ol>

          <li> <b>Post the information only.</b> The Record is a platform designed for users to share information, not interpretation. Don’t include your own opinion or analysis when you post. </li>
          <br></br> 
          <li> <b> Share the source. </b> When you post, always link to the original source of the information so that other users can verify it. 
            <ul>
                <li> Examples of appropriate sources include direct quotes from audio recordings, video recordings, verified social media accounts, academic articles, transcripts, and data sets. </li>
                <li> Examples of inappropriate sources include cable news, opinion pieces, talk radio, etc. </li>
                <li> Citing a mainstream news outlet is appropriate if you are citing a direct quote or other original, verifiable information uncovered by their reporting. Posting someone’s interpretation of such content is not appropriate. </li>
            </ul> 
          <br></br> 
          <i>Without a clearly linked source, your post will likely be flagged by other users, resulting in a deduction of Reputation points. </i> </li>
          <br></br> 

           <li> <b> Be specific. </b> Post the specific data, not generalizations. E.g., "57% of all Americans ..." is preferable to "Most Americans ..."</li>
          </ol>
      



      <hr className="divider"></hr>

      <p className="text-center"><a href="/">Back to The Record</a></p>

    </div>
  )
}

export default MyCustomPage;