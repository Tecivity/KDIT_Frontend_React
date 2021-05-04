//React
import React, { useEffect } from 'react';
//Components
import { HelpBox, Navbar } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './HelpPage.css';

const HelpPage = () => {
	//States

	//Contexts
	const { authListener } = React.useContext(SessionApi);

	//Effects
	useEffect(() => {
		authListener();
	}, []);

	//Data
	const questions = [
		{
			id: 1,
			question: 'My account was suspended',
			answer:
				"<p>&#8226 Your Nisit account can be suspended for violating Nisit's Content Policy and for suspicious account activity.</p><p>&#8226 My account was suspended for violating Nisit’s Content Policy.</p><p>Your Nisit account may be suspended if you violated Nisit’s Content Policy. If you think you violated the Content Policy and your account was suspended, the answer in detail section will explain how you are notified, what you can expect from the suspension, and additional steps you may take.</p><p>&#8226 My account was suspended or locked due to suspicious activity.</p><p>If your account was locked or disabled for security purposes, the answer in detail section will give you more information and include steps you can take to reset your account.</p>",
			fullAnswer:
				"<p>&#8226 This section covers information for users who have violated Nisit’s Content Policy. If you think your account was suspended for suspicious activity or security issues, please contact us via your @kmitl.ac.th email domain to our official email at the about us section.</p><p>&#8226 Nisit has a set of rules outlined through the Content Policy, which govern the behavior we expect users to uphold. If you break these rules, your account may be suspended.</p><p>&#8226 Site-wide suspensions can only be applied to accounts by employees of Nisit's Moderator (Admin) are done so after review of the actions and the context in which it took place.</p><p>&#8226 Suspensions can be permanent or temporary, depending on the nature of the violation and the history of the account in question.</p><p>&#8226 Temporary suspensions have a set duration. Once the duration has expired, the suspension will be lifted and you can continue using Nisit. Further violations of the Content Policy will take previous suspensions into account.</p>",
		},
		{
			id: 2,
			question: 'Nisit 101 : What is Nisit?',
			answer:
				"<p>&#8226 Nisit is a source for what's new and popular on the Internet for the KMITL student community.Nisit is home to many communities in KMITL, aims to provide endless conversation and authentic human connection.</p>",
			fullAnswer:
				"<p>&#8226 Nisit is a source for what's new and popular on the Internet for the KMITL student community.</p><p>&#8226 Users like you provide all of the content and decide, through voting, what's good and what's junk.</p><p>&#8226 Nisit is made up of many individual communities, also known as subcommunity. Each community has its own page, subject matter, users and moderators.</p><p>&#8226 Users post stories, links, and media to these communities, and other users vote and comment on the posts.</p><p>&#8226 Through voting, users determine what posts rise to the top of community pages and, by extension, the public home page of the site.</p><p>&#8226 Links that receive community approval bubble up towards #1, so the front page is constantly in motion and (hopefully) filled with fresh, interesting links.",
		},
		{
			id: 3,
			question: 'How do I submit a picture/link/video to Nisit?',
			answer:
				"<p>&#8226 For Link : Click the 'Link' button or Ctrl+K shortcut located in the top toolbar of the editor</p><p>&#8226 For Picture : Drag an image from your desktop to the editor field or click 'Insert image'</p><p>&#8226 For Media : Click the 'Insert media' button located in the top toolbar of the editor</p><p>&#8226 Refer for the answer in detail to find the constrain of these options</p>",
			fullAnswer:
				'<p>&#8226 The MediaEmbed feature brings support for inserting embeddable media such as YouTube or Vimeo videos and tweets into your rich text content.</p><p>&#8226 You can use the “Insert media” button in the toolbar to embed media like in the following examples. You can also paste the media URL directly into the editor content and it will be automatically embedded.</p><p>&#8226 CKEditor 5 which is currently in use with our site comes with several supported media providers that can be extended or altered.</p><p>&#8226 The default media provider configuration does not support all possible media URLs — only the most common are included.</p><p>&#8226 Names of providers with previews : dailymotion, spotify, youtube, vimeo.</p>',
		},
	];

	const FAQ = [
		{
			id: 4,
			question: 'Can anyone post on Nisit?',
			answer:
				"<p>&#8226 Yes — you'll just need to create an account!</p>",
			fullAnswer:
				"<p>&#8226 Due to quality control of the content and prevention of cyberattack, we require the participant that wants to share or be part of this community conversation to make an account so we can better identify the owner and prevent the intervention of non-human activity (i.e bot).</p><p>&#8226 In order to create the account to access the ability to post and vote on this site, the participant requires to be part of King Mongkut's Institute of Technology Ladkrabang personal or student. With the electronic email with @kmitl.ac.th domain, you can do the manual sign-up with your email or sign up with the google authentication. The account will have no difference between sign up with or without google authentication.</p><p>&#8226 In case you don't have an account or possess no ability to make one, you can still browse the entire Nisit content but you can't participate in them.</p>",
		},
		{
			id: 5,
			question: 'How do I format my comment or post?',
			answer:
				'<p>&#8226 You can format the post but not the comment. By using the provided editor you can customize your post with a wide range of options and look. Our editor which we provide is quite straight forward so you should figure it out in no time! Visit answer in the detail section to learn more information.',
			fullAnswer:
				'<p>&#8226 Classic editor is what we use to provide rich text editor for our site — a toolbar with an editing area placed in a specific position on the page, usually as a part of a form that you use to submit some content to the server.</p><p>&#8226 The toolbar is now always visible when the user scrolls the page down.</p><p>&#8226 By default the editor now grows automatically with the content.</p><p>&#8226 Inserting images into the content is now very intuitive, with all technical aspects (uploading, resizing) hidden from the user experience. No more complex dialogs!.</p>',
		},
		{
			id: 6,
			question:
				'I made a mistake in my post or comment, how can I edit it?',
			answer:
				'<p>&#8226 You can edit your post at any time by clicking the edit button on the top right of your post or comment, after that the editor will pop-up just like when you want to submit your post or comment in the first place. You can change your content and make a change to your post then submit or click cancel to abort this operation.</p>',
			fullAnswer:
				'<p>&#8226 The submission post can be edited. However, you can simply delete it and resubmit it. The sooner you do this, the less likely you will lose any votes or comments.</p><p>&#8226 We are not encouraged to make changes to your post very often because it can mislead the viewer who visits your content.</p><p>&#8226 The submission timestamp of the post or comment which will initiate the first time when the post or comment is submitted will not and cannot be changed under any circumstances, this is the prevention measure to the user who aim to exploit the filter and sorting of this site by trying to push the older or outdated content to the public eye.</p><p>&#8226 You can edit your post at any time by clicking the edit button on the top right of your post or comment, after that the editor will pop-up just like when you want to submit your post or comment in the first place. You can change your content and make a change to your post then submit or click cancel to abort this operation.</p>',
		},
	];

	return (
		<>
			<Navbar />

			<div className="helpPane">
				<div className="topHelpBox">
					<h1 className="helpHead">
						<br></br>Need Help?
					</h1>
					<div className="helpBoxPane">
						{questions.map((question) => {
							return (
								<HelpBox
									key={question.id}
									id={question.id}
									question={question.question}
									answer={question.answer}
									fullAnswer={question.fullAnswer}
								/>
							);
						})}
						{FAQ.map((question) => {
							return (
								<HelpBox
									key={question.id}
									id={question.id}
									question={question.question}
									answer={question.answer}
									fullAnswer={question.fullAnswer}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpPage;
