USE lab43316;
DROP TABLE IF EXISTS Disputes;
DROP TABLE IF EXISTS Policys;


CREATE TABLE Disputes (
	reviewId int NOT NULL PRIMARY KEY,
	dateRequest varchar(5000) NOT NULL,
	dateNotice datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateDispute varchar (5000) NOT NULL,
    FOREIGN KEY (reviewId) REFERENCES Reviews(reviewId) ON DELETE CASCADE
);

CREATE TABLE Policys (
	policysId int NOT NULL auto_increment PRIMARY KEY,
	policyDoc mediumtext NOT NULL

);

INSERT INTO Policys (policyDoc) VALUES ('<h1>Privacy policy</h1>
<p>We respect your privacy and are committed to protecting it through our compliance with this privacy policy (&#8220;Policy&#8221;). This Policy describes the types of information we may collect from you or that you may provide (&#8220;Personal Information&#8221;) on the <a href="/">MusicDatabase</a> website (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related products and services (collectively, &#8220;Services&#8221;), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update it.</p>
<p>This Policy is a legally binding agreement between you (&#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;) and this Website operator (&#8220;Operator&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221; shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>
<div class="wpembed-index"><h3>Table of contents</h3><ol class="wpembed-index"><li><a href="#collection-of-personal-information">Collection of personal information</a></li><li><a href="#privacy-of-children">Privacy of children</a></li><li><a href="#use-and-processing-of-collected-information">Use and processing of collected information</a></li><li><a href="#disclosure-of-information">Disclosure of information</a></li><li><a href="#retention-of-information">Retention of information</a></li><li><a href="#do-not-track-signals">Do Not Track signals</a></li><li><a href="#links-to-other-resources">Links to other resources</a></li><li><a href="#information-security">Information security</a></li><li><a href="#data-breach">Data breach</a></li><li><a href="#changes-and-amendments">Changes and amendments</a></li><li><a href="#acceptance-of-this-policy">Acceptance of this policy</a></li><li><a href="#contacting-us">Contacting us</a></li></ol></div><h2 id="collection-of-personal-information">Collection of personal information</h2>
<p>You can access and use the Website and Services without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the features offered on the Website, you may be asked to provide certain Personal Information (for example, your name and e-mail address).</p>
<p>We receive and store any information you knowingly provide to us when you create an account, publish content,  or fill any forms on the Website. When required, this information may include the following:</p>
<ul>
<li>Account details (such as user name, unique user ID, password, etc)</li>
<li>Contact information (such as email address, phone number, etc)</li>
<li>Basic personal information (such as name, country of residence, etc)</li>
</ul>
<p>You can choose not to provide us with your Personal Information, but then you may not be able to take advantage of some of the features on the Website. Users who are uncertain about what information is mandatory are welcome to contact us.</p>
<h2 id="privacy-of-children">Privacy of children</h2>
<p>We do not knowingly collect any Personal Information from children under the age of 13. If you are under the age of 13, please do not submit any Personal Information through the Website and Services. If you have reason to believe that a child under the age of 13 has provided Personal Information to us through the Website and Services, please contact us to request that we delete that child&#8217;s Personal Information from our Services.</p>
<p>We encourage parents and legal guardians to monitor their children&#8217;s Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through the Website and Services without their permission. We also ask that all parents and legal guardians overseeing the care of children take the necessary precautions to ensure that their children are instructed to never give out Personal Information when online without their permission.</p>
<h2 id="use-and-processing-of-collected-information">Use and processing of collected information</h2>
<p>We act as a data controller and a data processor when handling Personal Information, unless we have entered into a data processing agreement with you in which case you would be the data controller and we would be the data processor.</p>
<p> Our role may also differ depending on the specific situation involving Personal Information. We act in the capacity of a data controller when we ask you to submit your Personal Information that is necessary to ensure your access and use of the Website and Services. In such instances, we are a data controller because we determine the purposes and means of the processing of Personal Information.</p>
<p>We act in the capacity of a data processor in situations when you submit Personal Information through the Website and Services. We do not own, control, or make decisions about the submitted Personal Information, and such Personal Information is processed only in accordance with your instructions. In such instances, the User providing Personal Information acts as a data controller.</p>
<p>In order to make the Website and Services available to you, or to meet a legal obligation, we may need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you with the requested products or services. Any of the information we collect from you may be used for the following purposes:</p>
<ul>
<li>Create and manage user accounts</li>
<li>Run and operate the Website and Services</li>
</ul>
<p>Processing your Personal Information depends on how you interact with the Website and Services, where you are located in the world and if one of the following applies: (i) you have given your consent for one or more specific purposes; (ii) provision of information is necessary for the performance of an agreement with you and/or for any pre-contractual obligations thereof; (iii) processing is necessary for compliance with a legal obligation to which you are subject; (iv) processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us; (v) processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.</p>
<p> Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
<h2 id="disclosure-of-information">Disclosure of information</h2>
<p> To maintain the highest level of privacy and to protect your Personal Information to the full extent, we do not share your Personal Information with anyone and for any reason.</p>
<h2 id="retention-of-information">Retention of information</h2>
<p>We will retain and use your Personal Information for the period necessary as long as your user account remains active, to enforce our agreements, resolve disputes, and unless a longer retention period is required or permitted by law.</p>
<p>We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification, and the right to data portability cannot be enforced after the expiration of the retention period.</p>
<h2 id="do-not-track-signals">Do Not Track signals</h2>
<p>Some browsers incorporate a Do Not Track feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these purposes, tracking refers to collecting personally identifiable information from consumers who use or visit a website or online service as they move across different websites over time. How browsers communicate the Do Not Track signal is not yet uniform. As a result, the Website and Services are not yet set up to interpret or respond to Do Not Track signals communicated by your browser. Even so, as described in more detail throughout this Policy, we limit our use and collection of your Personal Information. For a description of Do Not Track protocols for browsers and mobile devices or to learn more about the choices available to you, visit <a href="https://www.internetcookies.com" target="_blank" ref="nofollow noreferrer noopener external">internetcookies.com</a></p>
<h2 id="links-to-other-resources">Links to other resources</h2>
<p>The Website and Services contain links to other resources that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other resources or third parties. We encourage you to be aware when you leave the Website and Services and to read the privacy statements of each and every resource that may collect Personal Information.</p>
<h2 id="information-security">Information security</h2>
<p>No data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and the Website and Services cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third party, despite best efforts.</p>
<p>As the security of Personal Information depends in part on the security of the device you use to communicate with us and the security you use to protect your credentials, please take appropriate measures to protect this information.</p>
<h2 id="data-breach">Data breach</h2>
<p>In the event we become aware that the security of the Website and Services has been compromised or Users&#8217; Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the User as a result of the breach or if notice is otherwise required by law. When we do, we will post a notice on the Website.</p>
<h2 id="changes-and-amendments">Changes and amendments</h2>
<p>We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
<p>An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes. However, we will not, without your consent, use your Personal Information in a manner materially different than what was stated at the time your Personal Information was collected.</p>
<h2 id="acceptance-of-this-policy">Acceptance of this policy</h2>
<p>You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services and submitting your information you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services. This privacy policy was created with the help of <a href="https://www.websitepolicies.com" target="_blank" rel="nofollow">WebsitePolicies</a>.</p>
<h2 id="contacting-us">Contacting us</h2>
<p>If you have any questions, concerns, or complaints regarding this Policy, the information we hold about you, or if you wish to exercise your rights, we encourage you to contact us using the details below:</p>
<p>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;rwil&#108;&#51;3&#64;u&#119;&#111;&#46;c&#97;">&#114;&#119;&#105;&#108;&#108;33&#64;&#117;w&#111;.&#99;a</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#103;&#105;&#108;&#108;i&#51;&#51;&#64;&#117;w&#111;&#46;ca">&#106;g&#105;&#108;&#108;&#105;&#51;&#51;&#64;&#117;wo.ca</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#100;&#97;&#105;&#108;l&#121;&#50;&#64;&#117;&#119;o&#46;&#99;a">&#106;d&#97;i&#108;&#108;&#121;&#50;&#64;uwo&#46;&#99;&#97;</a>
</p>
<p>We will attempt to resolve complaints and disputes and make every reasonable effort to honor your wish to exercise your rights as quickly as possible and in any event, within the timescales provided by applicable data protection laws.</p>
<p>This document was last updated on November 30, 2022</p>
<p class="madewith"><a href="https://www.websitepolicies.com/?via=madewithbadge" target="_blank" rel="nofollow"><img width="200" height="25" alt="Made with WebsitePolicies" src="https://cdn.websitepolicies.io/img/badge.png" srcset="https://cdn.websitepolicies.io/img/badge_2x.png 2x"></a></p>');

INSERT INTO Policys (policyDoc) VALUES ('<h1>Acceptable use policy</h1>
<p>This acceptable use policy (&#8220;Policy&#8221;) sets forth the general guidelines and acceptable and prohibited uses of the <a href="/">MusicDatabase</a> website (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related products and services (collectively, &#8220;Services&#8221;). This Policy is a legally binding agreement between you (&#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;) and this Website operator (&#8220;Operator&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221; shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.</p>
<div class="wpembed-index"><h3>Table of contents</h3><ol class="wpembed-index"><li><a href="#prohibited-activities-and-uses">Prohibited activities and uses</a></li><li><a href="#system-abuse">System abuse</a></li><li><a href="#service-resources">Service resources</a></li><li><a href="#no-spam-policy">No spam policy</a></li><li><a href="#defamation-and-objectionable-content">Defamation and objectionable content</a></li><li><a href="#copyrighted-content">Copyrighted content</a></li><li><a href="#security">Security</a></li><li><a href="#enforcement">Enforcement</a></li><li><a href="#reporting-violations">Reporting violations</a></li><li><a href="#changes-and-amendments">Changes and amendments</a></li><li><a href="#acceptance-of-this-policy">Acceptance of this policy</a></li><li><a href="#contacting-us">Contacting us</a></li></ol></div><h2 id="prohibited-activities-and-uses">Prohibited activities and uses</h2>
<p>You may not use the Website and Services to publish content or engage in activity that is illegal under applicable law, that is harmful to others, or that would subject us to liability, including, without limitation, in connection with any of the following, each of which is prohibited under this Policy:</p>
<ul>
<li>Distributing malware or other malicious code.</li>
<li>Disclosing sensitive personal information about others.</li>
<li>Collecting, or attempting to collect, personal information about third parties without their knowledge or consent.</li>
<li>Distributing pornography or adult related content.</li>
<li>Promoting or facilitating prostitution or any escort services.</li>
<li>Hosting, distributing or linking to child pornography or content that is harmful to minors.</li>
<li>Promoting or facilitating gambling, violence, terrorist activities or selling weapons or ammunition.</li>
<li>Engaging in the unlawful distribution of controlled substances, drug contraband or prescription medications.</li>
<li>Managing payment aggregators or facilitators such as processing payments on behalf of other businesses or charities.</li>
<li>Facilitating pyramid schemes or other models intended to seek payments from public actors.</li>
<li>Threatening harm to persons or property or otherwise harassing behavior.</li>
<li>Infringing the intellectual property or other proprietary rights of others.</li>
<li>Facilitating, aiding, or encouraging any of the above activities through the Website and Services.</li>
</ul>
<h2 id="system-abuse">System abuse</h2>
<p>Any User in violation of the Website and Services security is subject to criminal and civil liability, as well as immediate account termination. Examples include, but are not limited to the following:</p>
<ul>
<li>Use or distribution of tools designed for compromising security of the Website and Services.</li>
<li>Intentionally or negligently transmitting files containing a computer virus or corrupted data.</li>
<li>Accessing another network without permission, including to probe or scan for vulnerabilities or breach security or authentication measures.</li>
<li>Unauthorized scanning or monitoring of data on any network or system without proper authorization of the owner of the system or network.</li>
</ul>
<h2 id="service-resources">Service resources</h2>
<p>You may not consume excessive amounts of the resources of the Website and Services or use the Website and Services in any way which results in performance issues or which interrupts the Services for other Users. Prohibited activities that contribute to excessive use, include without limitation:</p>
<ul>
<li>Deliberate attempts to overload the Website and Services and broadcast attacks (i.e. denial of service attacks).</li>
<li>Engaging in any other activities that degrade the usability and performance of the Website and Services.</li>
</ul>
<h2 id="no-spam-policy">No spam policy</h2>
<p>You may not use the Website and Services to send spam or bulk unsolicited messages. We maintain a zero tolerance policy for use of the Website and Services in any manner associated with the transmission, distribution or delivery of any bulk e-mail, including unsolicited bulk or unsolicited commercial e-mail, or the sending, assisting, or commissioning the transmission of commercial e-mail that does not comply with the U.S. CAN-SPAM Act of 2003 (&#8220;SPAM&#8221;).</p>
<p>Your products or services advertised via SPAM (i.e. Spamvertised) may not be used in conjunction with the Website and Services. This provision includes, but is not limited to, SPAM sent via fax, phone, postal mail, email, instant messaging, or newsgroups.</p>
<p>Sending emails through the Website and Services to purchased email lists (&#8220;safe lists&#8221;) will be treated as SPAM.</p>
<h2 id="defamation-and-objectionable-content">Defamation and objectionable content</h2>
<p>We value the freedom of expression and encourage Users to be respectful with the content they post. We are not a publisher of User content and are not in a position to investigate the veracity of individual defamation claims or to determine whether certain material, which we may find objectionable, should be censored. However, we reserve the right to moderate, disable or remove any content to prevent harm to others or to us or the Website and Services, as determined in our sole discretion.</p>
<h2 id="copyrighted-content">Copyrighted content</h2>
<p>Copyrighted material must not be published via the Website and Services without the explicit permission of the copyright owner or a person explicitly authorized to give such permission by the copyright owner. Upon receipt of a claim for copyright infringement, or a notice of such violation, we may, at our discretion, run an investigation and, upon confirmation, may remove the infringing material from the Website and Services. We may terminate the Service of Users with repeated copyright infringements. Further procedures may be carried out if necessary. We will assume no liability to any User of the Website and Services for the removal of any such material. If you believe your copyright is being infringed by a person or persons using the Website and Services, please get in touch with us to report copyright infringement.</p>
<h2 id="security">Security</h2>
<p>You take full responsibility for maintaining reasonable security precautions for your account. You are responsible for protecting and updating any login account provided to you for the Website and Services. You must protect the confidentiality of your login details, and you should change your password periodically.</p>
<h2 id="enforcement">Enforcement</h2>
<p>We reserve our right to be the sole arbiter in determining the seriousness of each infringement and to immediately take corrective actions, including but not limited to:</p>
<ul>
<li>Disabling or removing any content which is prohibited by this Policy, including to prevent harm to others or to us or the Website and Services, as determined by us in our sole discretion.</li>
<li>Reporting violations to law enforcement as determined by us in our sole discretion.</li>
<li>A failure to respond to an email from our abuse team within 2 days, or as otherwise specified in the communication to you, may result in the suspension or termination of your account.</li>
</ul>
<p>Suspended and terminated User accounts due to violations will not be re-activated.</p>
<p>Nothing contained in this Policy shall be construed to limit our actions or remedies in any way with respect to any of the prohibited activities. In addition, we reserve at all times all rights and remedies available to us with respect to such activities at law or in equity.</p>
<h2 id="reporting-violations">Reporting violations</h2>
<p>If you have discovered and would like to report a violation of this Policy, please contact us immediately. We will investigate the situation and provide you with full assistance.</p>
<h2 id="changes-and-amendments">Changes and amendments</h2>
<p>We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
<p>An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.</p>
<h2 id="acceptance-of-this-policy">Acceptance of this policy</h2>
<p>You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services. This acceptable use policy was created with the help of <a href="https://www.websitepolicies.com" target="_blank" rel="nofollow">WebsitePolicies</a>.</p>
<h2 id="contacting-us">Contacting us</h2>
<p>If you have any questions, concerns, or complaints regarding this Policy, we encourage you to contact us using the details below:</p>
<p>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;rwil&#108;&#51;3&#64;u&#119;&#111;&#46;c&#97;">&#114;&#119;&#105;&#108;&#108;33&#64;&#117;w&#111;.&#99;a</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#103;&#105;&#108;&#108;i&#51;&#51;&#64;&#117;w&#111;&#46;ca">&#106;g&#105;&#108;&#108;&#105;&#51;&#51;&#64;&#117;wo.ca</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#100;&#97;&#105;&#108;l&#121;&#50;&#64;&#117;&#119;o&#46;&#99;a">&#106;d&#97;i&#108;&#108;&#121;&#50;&#64;uwo&#46;&#99;&#97;</a>
</p>
<p>This document was last updated on November 30, 2022</p>');

INSERT INTO Policys (policyDoc) VALUES ('<h1>DMCA policy</h1>
<p>This Digital Millennium Copyright Act policy (&#8220;Policy&#8221;) applies to the <a href="/">MusicDatabase</a> website (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related products and services (collectively, &#8220;Services&#8221;) and outlines how this Website operator (&#8220;Operator&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;) addresses copyright infringement notifications and how you (&#8220;you&#8221; or &#8220;your&#8221;) may submit a copyright infringement complaint.</p>
<p>Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act (&#8220;DMCA&#8221;) of 1998, the text of which can be found at the U.S. Copyright Office <a href="https://www.copyright.gov" target="_blank" rel="nofollow noreferrer noopener external">website</a>. This DMCA policy was created with the help of <a href="https://www.websitepolicies.com" target="_blank" rel="nofollow">WebsitePolicies</a>.</p>
<div class="wpembed-index"><h3>Table of contents</h3><ol class="wpembed-index"><li><a href="#what-to-consider-before-submitting-a-copyright-complaint">What to consider before submitting a copyright complaint</a></li><li><a href="#notifications-of-infringement">Notifications of infringement</a></li><li><a href="#changes-and-amendments">Changes and amendments</a></li><li><a href="#reporting-copyright-infringement">Reporting copyright infringement</a></li></ol></div><h2 id="what-to-consider-before-submitting-a-copyright-complaint">What to consider before submitting a copyright complaint</h2>
<p>Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.</p>
<p>Please note that if you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.</p>
<p>We may, at our discretion or as required by law, share a copy of your notification or counter-notification with the account holder engaged in the allegedly infringing activity or for publication. If you are concerned about your information being forwarded, you may wish to <a href="https://www.copyrighted.com/professional-takedowns" target="_blank">hire an agent</a> to report infringing material for you.</p>
<h2 id="notifications-of-infringement">Notifications of infringement</h2>
<p>If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification (&#8220;Notification&#8221;) using the contact details below pursuant to the DMCA. All such Notifications must comply with the DMCA requirements. You may refer to a <a href="https://www.websitepolicies.com/create/dmca-takedown-notice" target="_blank">DMCA takedown notice generator</a> or other similar services to avoid making mistake and ensure compliance of your Notification.</p>
<p>Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. If your complaint has satisfied these requirements, our response may include the removal or restriction of access to allegedly infringing material.</p>
<p>If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access, which may include a full copy of your Notification (including your name, address, phone, and email address).</p>
<p>Notwithstanding anything to the contrary contained in any portion of this Policy, the Operator reserves the right to take no action upon receipt of a DMCA copyright infringement notification if it fails to comply with all the requirements of the DMCA for such notifications.</p>
<h2 id="changes-and-amendments">Changes and amendments</h2>
<p>We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
<p>An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.</p>
<h2 id="reporting-copyright-infringement">Reporting copyright infringement</h2>
<p>If you would like to notify us of the infringing material or activity, we encourage you to contact us using the details below:</p>
<p>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;rwil&#108;&#51;3&#64;u&#119;&#111;&#46;c&#97;">&#114;&#119;&#105;&#108;&#108;33&#64;&#117;w&#111;.&#99;a</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#103;&#105;&#108;&#108;i&#51;&#51;&#64;&#117;w&#111;&#46;ca">&#106;g&#105;&#108;&#108;&#105;&#51;&#51;&#64;&#117;wo.ca</a><br>
    <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#106;&#100;&#97;&#105;&#108;l&#121;&#50;&#64;&#117;&#119;o&#46;&#99;a">&#106;d&#97;i&#108;&#108;&#121;&#50;&#64;uwo&#46;&#99;&#97;</a></p>
<p>This document was last updated on November 30, 2022</p>
<p class="madewith"><a href="https://www.websitepolicies.com/?via=madewithbadge" target="_blank" rel="nofollow"><img width="200" height="25" alt="Made with WebsitePolicies" src="https://cdn.websitepolicies.io/img/badge.png" srcset="https://cdn.websitepolicies.io/img/badge_2x.png 2x"></a></p>');

INSERT INTO Policys (policyDoc) VALUES ('<h1>DMCA Notice Takedown Procedure</h1>
<h2>Logging Disputes</h2>
<p>The first step to take is to ensure that the dispute is legitimate. Verify claims made in the dispute and check copyrighted material as well as the disputed review for infringement.</p>
<p>Once a dispute is verified, find the <a href="/dashboard/disputes">Disputes Page</a>. Here, you may enter the review ID, date the request was received, and the date the dispute was received and save it to the website.</p>
<h2>Removing Material</h2>
<p>The next step is to hide the disputed review pending evaluation. Ensure you are logged in to a valid administrator account, and navigate to the disputed review via the playlist it is writted to. From here, click on view reviews, find the infringing review, and click hide.</p>
<h2>Notifying the user</h2>
<p>Once the review is removed, the poster must be notified. This can be done using the email linked to their account. Forward the user a copy of the dispute, as well as a copy of their removed review. Inform them of the importance of responding to the dispute. Ask them if they agree with the removal of the dispute, or if they plan to counter the claim.</p>
<h2>Further Steps</h2>
<p class="b">With a response from the user who posted the disputed content, do the following:</p>
<p>1. If the user agrees with the reviews removal, the review can be deleted.</p>
<p>2. If the user files a counter-dispute, do not delete the review, but ensure it is still hidden pending the results of the counter claim. If the claim is successful, the content can be restored to the website. Otherwise, it can be removed.</p>
')


