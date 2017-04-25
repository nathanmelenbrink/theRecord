import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { registerComponent, Utils, getSetting, Headtags } from 'meteor/vulcan:core';

//class HeadTags extends Component {
//	render() {

const HeadTags = props => {

		console.log(props);
		//const url = !!this.props.url ? this.props.url : Telescope.utils.getSiteUrl();
		//const title = !!this.props.title ? this.props.title : Telescope.settings.get("title", "Nova");
		
		// i guess since props arent rendered to the server, the second choice is taken
		const description = !!props.title ? props.title : 'A community dedicated to promoting neutral and verifiable news on the web';

		const url = !!props.url ? props.url : Utils.getSiteUrl();
		const title = props.title ;
		//let description = !!this.props.description ? this.props.description : getSetting("tagline");

		//const description = this.props.title;

		console.log(description);
		// default image meta: logo url, else site image defined in settings
		let image = !!getSetting("siteImage") ? getSetting("siteImage"): getSetting("logoUrl");
		
		image = '/favicon.png';

		// overwrite default image if one is passed as props 
		//if (!!this.props.image) {
		//	image = this.props.image; 
		//}

		// add site url base if the image is stored locally
		if (!!image && image.indexOf('//') === -1) {
			image = Utils.getSiteUrl() + image;
		}
		// add <meta /> markup specific to the page rendered
		const meta = Headtags.meta.concat([

			{ charset: "utf-8" },
			{ name: "description", content: description },
			// responsive
			{ name: "viewport", content:"width=device-width, initial-scale=1" },
			// facebook
			{ property: "og:type", content: "article" },
			{ property: "og:url", content: url },
			//{ property: "og:url", content: metaUrl },
			{ property: "og:image", content: image },
			{ property: "og:title", content: 'The Record' },
			{ property: "og:description", content: description },
			//twitter
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:image:src", content: image },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description }
		]);

		// add <link /> markup specific to the page rendered
		const link = Headtags.link.concat([
			{ rel: "canonical", href: Utils.getSiteUrl() },
			{ rel: "shortcut icon", href: getSetting("faviconUrl", "/img/favicon.ico") },
		  { rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css' },
		  { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },

		]);

		console.log(meta);

		//return //(
			//<div>
		return	<Helmet title={title} meta={meta} link={link} script={Headtags.script} />
			//</div>
		//);
	}
//}

HeadTags.propTypes = {
	url: React.PropTypes.string,
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	image: React.PropTypes.string,
	body: React.PropTypes.string,
};


registerComponent('HeadTags', HeadTags);

