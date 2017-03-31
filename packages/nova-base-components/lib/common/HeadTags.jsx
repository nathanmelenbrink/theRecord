import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

class HeadTags extends Component {
	render() {

		//console.log(this.props);
		const url = !!this.props.url ? this.props.url : Telescope.utils.getSiteUrl();
		const title = !!this.props.title ? this.props.title : Telescope.settings.get("title", "Nova");
		const description = !!this.props.description ? this.props.description : 'A community dedicated to promoting neutral and verifiable news on the web';

		// default image meta: logo url, else site image defined in settings
		let image = !!Telescope.settings.get("siteImage") ? Telescope.settings.get("siteImage"): Telescope.settings.get("logoUrl");
		
		// overwrite default image if one is passed as props 
		if (!!this.props.image) {
			image = this.props.image; 
		}

		// add site url base if the image is stored locally
		if (!!image && image.indexOf('//') === -1) {
			image = Telescope.utils.getSiteUrl() + image;
		}

		image = `http://howtodesign.mit.edu/02_seeing/contrast.jpg`;
		//console.log(image);

		const meta = Telescope.headtags.meta.concat([
			{ charset: "utf-8" },
			{ name: "description", content: description },
			// responsive
			{ name: "viewport", content:"width=device-width, initial-scale=1" },
			// facebook
			{ property: "og:type", content: "article" },
			{ property: "og:url", content: url },
			//{ property: "og:url", content: metaUrl },
			{ property: "og:image", content: image },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			//twitter
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:image:src", content: image },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description }
		]);

		const link = Telescope.headtags.link.concat([
			{ rel: "canonical", href: "http://therecord.org" },
			//{ rel: "canonical", href: Meteor.absoluteUrl(this.props.url.replace('/', '')) },
			{ rel: "shortcut icon", href: Telescope.settings.get("faviconUrl", "/img/favicon.ico") }
		]);

		//console.log(meta);

		return (
			<div>
				<Helmet title={title} meta={meta} link={link} />
			</div>
		);
	}
}

HeadTags.propTypes = {
	url: React.PropTypes.string,
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	image: React.PropTypes.string,
};

module.exports = HeadTags;
export default HeadTags;