// ============================================================
//  SCENARIO DATA
// ============================================================

const CATEGORIES = [
  { id: 'phishing',   name: 'Phishing Detection',   icon: '&#128231;', color: '#f85149', difficulty: 'beginner',     desc: 'Identify malicious emails, spoofed senders, and deceptive links before clicking.' },
  { id: 'incident',   name: 'Incident Response',    icon: '&#128680;', color: '#d29922', difficulty: 'advanced',     desc: 'Walk through a live security incident and make triage decisions under pressure.' },
  { id: 'passwords',  name: 'Password Security',    icon: '&#128273;', color: '#58a6ff', difficulty: 'beginner',     desc: 'Evaluate password strength, configure MFA, and protect credential stores.' },
  { id: 'social',     name: 'Social Engineering',   icon: '&#128483;', color: '#bc8cff', difficulty: 'intermediate', desc: 'Recognize manipulation tactics in phone calls, chat, and physical access attempts.' },
  { id: 'network',    name: 'Network Analysis',     icon: '&#127760;', color: '#3fb950', difficulty: 'intermediate', desc: 'Inspect traffic logs, spot anomalies, and identify intrusion indicators.' },
  { id: 'dataclass',  name: 'Data Classification',  icon: '&#128196;', color: '#ffa657', difficulty: 'beginner',     desc: 'Classify sensitive data, apply correct handling procedures, and prevent leakage.' },
];

// ---- PHISHING SCENARIOS -------------------------------------------------------
const PHISHING_SCENARIOS = [
  {
    id: 'ph-01',
    category: 'phishing',
    title: 'The IT Department Email',
    desc: 'Identify whether this email from IT support is legitimate.',
    tags: ['email', 'spoofing', 'urgency'],
    steps: [
      {
        type: 'email',
        label: 'Examine this email received at 2:47 AM',
        email: {
          from: 'it-support@c0mpany.com',
          to: 'you@company.com',
          subject: 'URGENT: Your account will be suspended in 24 hours',
          date: 'Mon, 18 Mar 2026 02:47:13 -0500',
          body: `Dear Employee,

Our security system has detected unusual activity on your account. Your access will be SUSPENDED within 24 hours unless you verify your credentials immediately.

Please click the link below to verify your identity:

  http://company-secure-login.ru/verify?token=xK9mR2

After verification, no further action is required.

Regards,
IT Support Team
Company IT Department
`,
        },
        question: 'What is your first action upon receiving this email?',
        choices: [
          { text: 'Click the verification link to secure your account before the deadline.', correct: false },
          { text: 'Reply to the email asking IT to confirm it is legitimate.', correct: false },
          { text: 'Do NOT click anything. Report to the real IT department using a known contact method.', correct: true },
          { text: 'Forward the email to colleagues to warn them.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This email has multiple red flags: sender domain "c0mpany.com" (zero instead of O), a .ru domain link, 3 AM timestamp, extreme urgency, and a generic greeting. Always verify through an independent channel — never via the contact info in the suspicious email itself.',
          incorrect: 'This is a phishing email. Red flags include: (1) sender domain "c0mpany.com" uses a zero instead of the letter O, (2) the link goes to a .ru domain unrelated to the company, (3) 3 AM send time, (4) manufactured urgency, (5) generic "Dear Employee" greeting. Never click links or reply — contact IT through a known good number or internal portal.',
        },
        points: 20,
        objectives: ['Identify sender domain spoofing', 'Recognize urgency tactics', 'Know correct reporting procedure'],
        hint: 'Look very carefully at the sender domain. Also hover over (or read closely) the link URL.',
      },
      {
        type: 'analysis',
        label: 'Identify the specific red flags',
        question: 'Which of these is NOT a phishing indicator in the email above?',
        choices: [
          { text: 'The sender uses "c0mpany.com" (zero, not letter O).', correct: false },
          { text: 'The verification link points to a .ru domain.', correct: false },
          { text: 'The email was sent at 2:47 AM.', correct: false },
          { text: 'The email is addressed to "you@company.com".', correct: true },
        ],
        feedback: {
          correct: 'Correct. The recipient email address itself is not an indicator — phishing emails can be correctly addressed to real recipients (often scraped from directories). The real red flags are the spoofed sender domain, the foreign link, and the time/urgency combination.',
          incorrect: 'The recipient address being correct is NOT a phishing indicator — attackers often obtain real email addresses. The actual red flags are: the spoofed sender domain (c0mpany vs company), the .ru link, the unusual send time, and the urgency language.',
        },
        points: 15,
        hint: 'Consider what information an attacker could easily discover or fabricate vs. what is genuinely suspicious.',
      },
    ],
  },
  {
    id: 'ph-02',
    category: 'phishing',
    title: 'CEO Fraud / Business Email Compromise',
    desc: 'An urgent wire transfer request appears to come from the CEO.',
    tags: ['BEC', 'wire-transfer', 'impersonation'],
    steps: [
      {
        type: 'email',
        label: 'You are in Accounts Payable. Review this email.',
        email: {
          from: 'j.morrison@company-corp.com',
          to: 'accounts@company.com',
          subject: 'Confidential – Urgent Wire Required Today',
          date: 'Fri, 20 Mar 2026 08:03:44 -0400',
          body: `Hi,

I need you to process an urgent wire transfer of $78,400 to a new vendor today. This is time-sensitive — deal closes at noon.

Wire details:
  Bank: First National Bank
  Account: 4821-XXXX-XXXX
  Routing: 021000021
  Reference: Project Falcon

Please keep this confidential — the acquisition isn't public yet. Do not discuss with anyone else in the office. I'm in back-to-back meetings and can only be reached via email today.

Thanks,
James Morrison
CEO, Company Corp
`,
        },
        question: 'What should you do?',
        choices: [
          { text: 'Process the wire immediately so the deal does not fall through.', correct: false },
          { text: 'Email back to confirm the request before transferring.', correct: false },
          { text: 'Call the CEO on his known office/mobile number to verbally verify the request.', correct: true },
          { text: 'Process it but CC the CFO for transparency.', correct: false },
        ],
        feedback: {
          correct: 'Correct! This is a classic Business Email Compromise (BEC) attack. The attacker registers a look-alike domain (company-corp.com vs company.com), impersonates the CEO, creates urgency, requests secrecy, and makes themselves unreachable except by email. Always verify large financial requests via a separate, known communication channel — never by replying to the same email.',
          incorrect: 'This is a Business Email Compromise (BEC) scam. Key indicators: (1) the domain is "company-corp.com" not "company.com", (2) extreme urgency + time pressure, (3) request for secrecy, (4) CEO conveniently unavailable except by email. The only safe response is a verbal confirmation via a known phone number — NOT by replying to this email.',
        },
        points: 25,
        objectives: ['Identify BEC attack patterns', 'Recognize isolation + urgency tactics', 'Apply proper financial verification procedure'],
        hint: 'Compare the sender\'s domain carefully to your company\'s real domain. Also note the "do not discuss" instruction.',
      },
    ],
  },
  {
    id: 'ph-03',
    category: 'phishing',
    title: 'Spear Phishing with LinkedIn Recon',
    desc: 'A targeted attack using publicly available information to appear credible.',
    tags: ['spear-phishing', 'OSINT', 'targeted'],
    steps: [
      {
        type: 'email',
        label: 'Review this email in your corporate inbox',
        email: {
          from: 'david.chen@acme-partners.net',
          to: 'sarah.kim@company.com',
          subject: 'Follow-up from the Q1 Cloud Migration project',
          date: 'Tue, 19 Mar 2026 10:22:07 -0400',
          body: `Hi Sarah,

Great connecting with you and the Project Phoenix team last week. As we discussed with your manager Rachel Torres, I've prepared the updated vendor assessment you requested.

I've shared it via our secure document portal — please use your work credentials to access it:

  https://onedrive-company-docs.net/shared/Q1-assessment-skm.docx

The document covers the Azure cost breakdown and integration timeline you mentioned. Let me know if you have questions before Thursday's review.

Best,
David Chen
Senior Solutions Architect
ACME Partners
`,
        },
        question: 'This email mentions your manager\'s name, your project, and your initials in the link. What is the most concerning indicator?',
        choices: [
          { text: 'The email uses your first name — a real business partner would use "Dear Ms. Kim".', correct: false },
          { text: 'The document link goes to "onedrive-company-docs.net" — not Microsoft\'s actual OneDrive domain.', correct: true },
          { text: 'The sender works at ACME Partners, which is a known vendor.', correct: false },
          { text: 'The email mentions a real project name, which proves the sender is legitimate.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The link domain "onedrive-company-docs.net" is not Microsoft OneDrive — the real domain is onedrive.live.com or sharepoint.com. Everything else (your name, manager\'s name, project name, initials) could be harvested from LinkedIn, company website, or previous email leaks. This is spear phishing: highly targeted using OSINT to seem credible. The personalization is a lure, not proof of legitimacy.',
          incorrect: 'The critical red flag is the link domain: "onedrive-company-docs.net" is a typosquat impersonating Microsoft OneDrive. Attackers use OSINT (LinkedIn, company directories, GitHub) to harvest names, project names, and org structure — so personalized details prove nothing. Always verify the actual URL domain before entering credentials.',
        },
        points: 20,
        objectives: ['Understand OSINT-based targeting', 'Verify link domains regardless of email content', 'Identify spear phishing vs generic phishing'],
        hint: 'The real Microsoft OneDrive uses microsoft.com or live.com domains. What is the actual domain in this link?',
      },
      {
        type: 'analysis',
        label: 'Understanding OSINT exposure',
        stageContent: 'The attacker built this email using publicly available information. Which of the following sources most likely provided the project name "Project Phoenix" and manager\'s name "Rachel Torres"?',
        question: 'Which combination of OSINT sources would most likely yield this level of targeting detail?',
        choices: [
          { text: 'Dark web credential databases only.', correct: false },
          { text: 'LinkedIn profiles, company website team pages, and conference speaker bios.', correct: true },
          { text: 'The company\'s source code on GitHub.', correct: false },
          { text: 'Shodan scans of the company\'s IP range.', correct: false },
        ],
        feedback: {
          correct: 'Correct. LinkedIn is the primary attack surface for spear phishing reconnaissance. Employees routinely list: current projects, team members, job titles, technologies used, and org hierarchy — all the ingredients for a convincing targeted email. Company websites and press releases add more detail. Defenders can counter this by training employees on LinkedIn oversharing and setting profile visibility appropriately.',
          incorrect: 'LinkedIn and company web presence are the primary OSINT sources for spear phishing. Employees publicly list projects, managers, technologies, and team structures. GitHub might reveal technical details. Credential databases and Shodan serve different attack purposes. The lesson: treat professional social media as partially public, and don\'t post sensitive project details.',
        },
        points: 15,
        hint: 'Think about where professionals publicly post details about their current work, teammates, and projects.',
      },
    ],
  },
  {
    id: 'ph-04',
    category: 'phishing',
    title: 'QR Code Phishing (Quishing)',
    desc: 'A QR code in an email bypasses traditional link scanners.',
    tags: ['quishing', 'QR-code', 'credential-harvest'],
    steps: [
      {
        type: 'email',
        label: 'This email arrived in your inbox — notice it contains no text links',
        email: {
          from: 'noreply@microsoft-mfa-verify.com',
          to: 'you@company.com',
          subject: 'Action Required: Verify your Microsoft 365 MFA device',
          date: 'Wed, 20 Mar 2026 09:05:31 -0500',
          body: `Microsoft 365 Security Notice

Your multi-factor authentication device registration has expired and must be re-verified within 48 hours to maintain access.

To re-verify, open your phone camera and scan the QR code below:

  [QR CODE IMAGE]

Scanning will take you to the Microsoft secure verification portal.
If you do not verify within 48 hours, your account access will be suspended.

Microsoft Security Team
`,
        },
        question: 'Why is a QR code particularly dangerous in a phishing email?',
        choices: [
          { text: 'QR codes are only used by attackers — any QR code in email is malicious.', correct: false },
          { text: 'QR codes redirect to URLs that most email security gateways cannot inspect or block.', correct: true },
          { text: 'QR codes are too complex for non-technical users to understand.', correct: false },
          { text: 'QR codes can only be scanned on Android devices, making them less dangerous on iPhones.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Quishing (QR phishing) is effective precisely because email security tools scan text URLs but typically cannot decode and inspect QR code images. The malicious URL is embedded in the image, bypassing link filters. The QR also moves the attack to the victim\'s personal phone, which may have weaker security controls than the corporate laptop. Always treat unexpected QR codes with the same suspicion as text links.',
          incorrect: 'The danger of QR codes in phishing is that they encode URLs inside images that most email gateways cannot inspect. Link-scanning security tools see an image, not a link. Additionally, the QR is scanned on a personal mobile device which may lack corporate security controls. This is why "quishing" has grown rapidly — it sidesteps a major email security layer.',
        },
        points: 20,
        objectives: ['Understand quishing attack mechanics', 'Recognize email security bypass techniques', 'Apply skepticism to QR codes in unexpected emails'],
        hint: 'Think about what email security tools do with images versus text links. Where does the URL actually live in a QR code?',
      },
      {
        type: 'analysis',
        label: 'Sender domain analysis',
        stageContent: 'The email came from <strong>noreply@microsoft-mfa-verify.com</strong>.<br><br>Legitimate Microsoft security emails come from domains like:<br>• microsoft.com<br>• account.microsoft.com<br>• microsoftonline.com',
        question: 'What type of domain deception is "microsoft-mfa-verify.com" using?',
        choices: [
          { text: 'Subdomain abuse — microsoft is the subdomain, mfa-verify.com is the real domain.', correct: false },
          { text: 'A legitimate Microsoft partner domain used for MFA notifications.', correct: false },
          { text: 'A lookalike domain — it contains "microsoft" as a keyword but is a completely separate registration.', correct: true },
          { text: 'A punycode homograph attack using look-alike Unicode characters.', correct: false },
        ],
        feedback: {
          correct: 'Correct. "microsoft-mfa-verify.com" is a lookalike domain — the registrant chose a name containing "microsoft" to appear official, but the actual registered domain is "microsoft-mfa-verify.com", which has no affiliation with Microsoft. This is distinct from subdomain abuse (legitimate.com/evil) or homograph attacks (mіcrosoft with Cyrillic і). Lookalike domains are cheap to register and highly effective at deceiving users who don\'t check the full domain.',
          incorrect: '"microsoft-mfa-verify.com" is a lookalike domain. The word "microsoft" appears in the name but the actual domain is entirely separate. Microsoft does not own or control it. This is a registration trick — not subdomain abuse or Unicode spoofing. The full domain after the last dot before the TLD (.com) is what matters: here it\'s "microsoft-mfa-verify", not "microsoft".',
        },
        points: 15,
        hint: 'In a domain like "sub.domain.tld", what is the actual registered domain? Which part do you need to scrutinize?',
      },
    ],
  },
  {
    id: 'ph-05',
    category: 'phishing',
    title: 'Credential Harvesting Login Page',
    desc: 'Spot the signs of a fake login portal designed to steal passwords.',
    tags: ['credential-harvest', 'URL-analysis', 'AiTM'],
    steps: [
      {
        type: 'analysis',
        label: 'You clicked a link and see this login page. Analyze the URL bar.',
        stageContent: 'The page looks exactly like the Microsoft 365 login. The URL in the browser bar reads:<br><br>' +
          '<code>https://login.microsoftonline.com.auth-portal-secure.xyz/oauth2/v2.0/authorize?client_id=...</code><br><br>' +
          'The page has a padlock icon (HTTPS). Everything else looks identical to the real Microsoft login.',
        question: 'Should you enter your credentials?',
        choices: [
          { text: 'Yes — the padlock icon confirms it is a secure and legitimate site.', correct: false },
          { text: 'Yes — the URL starts with "login.microsoftonline.com" which is Microsoft\'s real domain.', correct: false },
          { text: 'No — the actual domain is "auth-portal-secure.xyz", not microsoftonline.com.', correct: true },
          { text: 'It depends — check if the page\'s visual design matches Microsoft\'s current branding.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The actual registered domain here is "auth-portal-secure.xyz" — "login.microsoftonline.com" is a subdomain of it. The full URL structure is: [subdomain].[registered-domain].[TLD]. Always read the domain from right to left: .xyz is the TLD, auth-portal-secure is the registered domain, and login.microsoftonline.com is just a subdomain chosen to deceive. The HTTPS padlock only means the connection is encrypted — it says nothing about whether the site is legitimate.',
          incorrect: 'The URL is deceptive. The real registered domain is "auth-portal-secure.xyz" — "login.microsoftonline.com" is just a subdomain of it. Attackers can create any subdomain they want. The HTTPS padlock proves encryption, not legitimacy — attackers get free TLS certificates routinely. Read URLs right-to-left from the TLD to identify the true registered domain.',
        },
        points: 25,
        objectives: ['Parse URLs to identify true registered domains', 'Understand that HTTPS does not mean legitimate', 'Recognize adversary-in-the-middle phishing setups'],
        hint: 'Read the URL from right to left, starting at the TLD (.xyz). What is the registered domain — the part immediately before the TLD?',
      },
    ],
  },
  {
    id: 'ph-06',
    category: 'phishing',
    title: 'OAuth Consent Phishing',
    desc: 'A malicious app requests broad OAuth permissions to your Microsoft account.',
    tags: ['OAuth', 'consent-phishing', 'cloud'],
    steps: [
      {
        type: 'email',
        label: 'You receive this email with an "Authorize App" button',
        email: {
          from: 'noreply@docusign-integrations.net',
          to: 'you@company.com',
          subject: 'Action Required: Authorize DocuSign Calendar Sync',
          date: 'Thu, 19 Mar 2026 11:14:22 -0400',
          body: `Hi,

To complete your DocuSign integration, please authorize the calendar sync application using your Microsoft 365 account.

Click below to grant access:

  https://login.microsoftonline.com/oauth2/authorize?client_id=a7f3...

This app requires the following permissions:
  - Mail.Read
  - Mail.Send
  - Files.ReadWrite.All
  - Contacts.ReadWrite

This is a one-time authorization.

DocuSign Integration Team
`,
        },
        question: 'What is the most critical red flag in this OAuth consent request?',
        choices: [
          { text: 'The email came from a third-party domain, not docusign.com.', correct: false },
          { text: 'The app requests Mail.Read, Mail.Send, and Files.ReadWrite.All — far beyond what a calendar sync needs.', correct: true },
          { text: 'OAuth authorization emails are always phishing.', correct: false },
          { text: 'The link goes to microsoftonline.com, which is suspicious.', correct: false },
        ],
        feedback: {
          correct: 'Correct. OAuth consent phishing exploits the fact that once you click "Accept", the attacker\'s app gets persistent access to your account — no password needed. The permission scope is the biggest red flag: a calendar sync has no legitimate need for Mail.Send or Files.ReadWrite.All. Attackers request broad scopes to read email, send on your behalf, and access all your files. Always scrutinize every permission before approving, and reject any app requesting more than needed.',
          incorrect: 'The critical red flag is the excessive permission scope. Mail.Send + Files.ReadWrite.All grants the attacker full access to your inbox and files indefinitely, without needing your password again. The domain is also suspicious, but even if it were a real domain, the permissions alone should block approval. OAuth consent phishing is particularly dangerous because it bypasses MFA entirely.',
        },
        points: 20,
        objectives: ['Identify OAuth consent phishing', 'Evaluate permission scope appropriateness', 'Understand why OAuth attacks bypass MFA'],
        hint: 'What does a calendar sync app actually need access to? Compare that to what is being requested.',
      },
      {
        type: 'analysis',
        label: 'Post-authorization response',
        stageContent: 'A colleague clicked the button and authorized the app 20 minutes ago. IT has been notified. The app has had access to their Microsoft 365 account since then.',
        question: 'What is the correct immediate remediation?',
        choices: [
          { text: 'Ask the colleague to change their password.', correct: false },
          { text: 'Revoke the malicious app\'s OAuth tokens in Azure AD, audit mail/files accessed, and check for forwarding rules or sent items.', correct: true },
          { text: 'Have the colleague log out of all sessions and log back in.', correct: false },
          { text: 'Run antivirus on the colleague\'s machine.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Password change does not revoke OAuth tokens — the app\'s access persists until explicitly revoked in Azure AD (Enterprise Applications → revoke permissions). After revoking: audit mail sent on the user\'s behalf, check for new inbox rules (forwarding rules are commonly set to persist access), review files accessed/shared, and look for further account compromise. This is why OAuth attacks are so dangerous — they survive password resets.',
          incorrect: 'Changing the password does NOT revoke OAuth tokens. The malicious app retains access until its token is explicitly revoked in Azure AD. Go to Azure AD → Enterprise Applications → find the app → revoke permissions. Then audit what was accessed: sent emails, inbox forwarding rules, shared files.',
        },
        points: 20,
        hint: 'OAuth tokens are independent of passwords. Where do you revoke them?',
      },
    ],
  },
  {
    id: 'ph-07',
    category: 'phishing',
    title: 'Supplier Invoice Fraud',
    desc: 'A vendor appears to have changed their banking details via email.',
    tags: ['invoice-fraud', 'BEC', 'payment-diversion'],
    steps: [
      {
        type: 'email',
        label: 'Email from a long-standing supplier',
        email: {
          from: 'billing@acme-supplies.co',
          to: 'ap@company.com',
          subject: 'Important: Updated Banking Details for Future Payments',
          date: 'Mon, 17 Mar 2026 14:30:05 -0500',
          body: `Dear Accounts Payable Team,

Please be advised that ACME Supplies has changed our banking details effective immediately. All future payments must be directed to our new account.

New bank details:
  Bank Name:    Chase Business Banking
  Account Name: ACME Supplies LLC
  Account No:   7823-XXXX-XXXX
  Routing No:   021000021
  Reference:    Supplier #AC-4821

Please update your records and confirm receipt of this email. Our previous account will be closed at the end of this month.

Thank you for your continued business.

ACME Supplies Billing Team
`,
        },
        question: 'What is the single most important process control that prevents payment diversion fraud?',
        choices: [
          { text: 'Verify the email came from the correct domain before updating records.', correct: false },
          { text: 'Call the supplier on a known phone number from your internal records to verbally confirm the change.', correct: true },
          { text: 'Reply to the email asking the supplier to confirm.', correct: false },
          { text: 'Check that the account name matches the supplier name.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Any request to change payment details must be verified by calling the supplier on a phone number from YOUR records — not from the email, not from a number they provide in the email. Attackers set up call forwarding on spoofed numbers. Domain checks and reply confirmation are both bypassable by the attacker who controls the email thread. A direct verbal confirmation to a known contact is the only reliable control against payment diversion fraud.',
          incorrect: 'Domain verification and reply confirmation are both insufficient — attackers can spoof domains and intercept email replies. Account name matching is trivially faked. The only reliable control: call the supplier\'s known phone number from your internal vendor records and speak to a known contact. This attack has cost organizations billions globally. Most major banks now recommend this as mandatory procedure for any payment detail change.',
        },
        points: 20,
        objectives: ['Recognize payment diversion / mandate fraud', 'Apply out-of-band verification for financial changes', 'Understand why email confirmation is insufficient'],
        hint: 'The attacker controls the email thread. What communication channel can they NOT control?',
      },
    ],
  },
  {
    id: 'ph-08',
    category: 'phishing',
    title: 'Smishing — SMS Phishing',
    desc: 'A text message claims your delivery requires immediate action.',
    tags: ['smishing', 'SMS', 'mobile'],
    steps: [
      {
        type: 'analysis',
        label: 'You receive this text message on your personal phone',
        stageContent: '<div style="background:#1a2332;border:1px solid #30363d;border-radius:12px;padding:20px;font-family:monospace;font-size:14px;max-width:360px;margin:0 auto">' +
          '<div style="color:#8b949e;font-size:11px;margin-bottom:8px">FedEx Delivery — Today 09:41 AM</div>' +
          '<div style="color:#e6edf3;line-height:1.7">Your package #FX-29483 is held at customs. A $3.49 clearance fee is required within 24hrs to avoid return.<br><br>' +
          '<span style="color:#4db8ff">http://fedex-customs-pay.com/FX29483</span></div></div>',
        question: 'Which of these is the strongest indicator that this is a smishing attack?',
        choices: [
          { text: 'FedEx never sends text messages about deliveries.', correct: false },
          { text: 'The link domain is "fedex-customs-pay.com" — not fedex.com — and real carriers do not collect fees via SMS links.', correct: true },
          { text: 'The fee amount of $3.49 is too small to be a real customs charge.', correct: false },
          { text: 'SMS messages cannot contain real tracking numbers.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Two clear indicators: (1) the domain "fedex-customs-pay.com" is not fedex.com — it\'s a lookalike domain designed to deceive, and (2) legitimate carriers do not collect customs fees via SMS payment links. FedEx, UPS, and USPS direct customers to their official apps or websites, never to external payment URLs. The $3.49 amount is deliberately small to reduce friction and make clicking feel low-risk — this is intentional attacker psychology.',
          incorrect: 'FedEx does send legitimate delivery SMS notifications. The red flags here are: (1) the link goes to "fedex-customs-pay.com", not fedex.com, (2) real carriers never collect fees via SMS payment links — customs fees go through official channels. If you have a real package, go directly to fedex.com and use your tracking number there.',
        },
        points: 15,
        objectives: ['Identify smishing attack patterns', 'Verify URLs in SMS before clicking', 'Understand low-friction payment bait tactics'],
        hint: 'Ignore the branding and urgency. Focus only on the link domain — what company actually owns "fedex-customs-pay.com"?',
      },
      {
        type: 'analysis',
        label: 'Safe response procedure',
        stageContent: 'You receive the smishing message and believe you may actually have a package in transit.',
        question: 'What is the safe way to check if the delivery issue is real?',
        choices: [
          { text: 'Click the link but only enter your email, not your credit card.', correct: false },
          { text: 'Reply STOP to the SMS to opt out.', correct: false },
          { text: 'Go directly to fedex.com by typing it into your browser and track your package there.', correct: true },
          { text: 'Forward the message to IT for analysis before doing anything.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Always navigate to the official site by typing it directly into your browser — never via a link in a suspicious message. If there is a real delivery issue, it will appear on the carrier\'s official tracking page. Replying STOP can confirm your number is active to attackers. Clicking even to "just check" can trigger drive-by downloads or credential harvest pages.',
          incorrect: 'Clicking the link is never safe regardless of what information you plan to enter — the page itself can be malicious (drive-by malware). Replying STOP confirms your number is active. The correct approach: type the carrier\'s real domain directly into your browser and check your tracking number there.',
        },
        points: 15,
        hint: 'How can you verify the delivery status without using anything from the suspicious message?',
      },
    ],
  },
  {
    id: 'ph-09',
    category: 'phishing',
    title: 'Calendar Invite Phishing',
    desc: 'A malicious meeting invite lands directly in your calendar, bypassing email filters.',
    tags: ['calendar-phishing', 'Google-Calendar', 'bypass'],
    steps: [
      {
        type: 'analysis',
        label: 'A calendar notification appears on your screen',
        stageContent: '<div style="background:#1a2332;border:1px solid #30363d;border-radius:8px;padding:20px;max-width:420px">' +
          '<div style="font-weight:600;margin-bottom:6px">Q2 Budget Review — All Managers</div>' +
          '<div style="color:#8b949e;font-size:13px;margin-bottom:12px">Tomorrow, 10:00 AM – 11:00 AM · Conference Room B</div>' +
          '<div style="font-size:13px;color:#e6edf3;line-height:1.7">Agenda and pre-read materials attached.<br><br>' +
          'Please review before the meeting:<br>' +
          '<span style="color:#4db8ff">https://docs-company-share.xyz/q2-budget-prereads</span><br><br>' +
          'Organizer: CFO Office (cfo-office@company-notifications.net)</div></div>',
        question: 'Why are calendar phishing attacks particularly effective at bypassing defenses?',
        choices: [
          { text: 'Calendars are encrypted end-to-end so security tools cannot scan them.', correct: false },
          { text: 'Calendar invites arrive via the calendar API, not email — bypassing email security gateways and link scanners.', correct: true },
          { text: 'Calendar invites always come from trusted internal sources.', correct: false },
          { text: 'Security teams do not monitor calendar activity.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Calendar invites are delivered through a separate channel (CalDAV/calendar APIs) that most email security gateways do not inspect. Malicious links in calendar event descriptions bypass URL sandboxing tools that would catch the same link in an email. Additionally, many calendar apps auto-accept invites from external parties by default, adding the event silently. The combination of a trusted-looking interface and a security blind spot makes calendar phishing highly effective.',
          incorrect: 'Calendar phishing works because invites travel via the calendar API, not email — so email security gateways and link scanners don\'t see them. The link in the event description is delivered directly to your calendar without any URL analysis. Many organizations have since deployed calendar-specific security controls, but it remains a significant gap.',
        },
        points: 20,
        objectives: ['Understand calendar phishing bypass mechanics', 'Recognize external organizer red flags', 'Apply link verification to calendar events'],
        hint: 'Email security tools scan email. What channel do calendar invites travel through?',
      },
    ],
  },
  {
    id: 'ph-10',
    category: 'phishing',
    title: 'AI Voice Cloning (Vishing 2.0)',
    desc: 'An AI-generated voice impersonates the CEO to authorize a fraudulent transfer.',
    tags: ['AI', 'voice-cloning', 'deepfake', 'vishing'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: CFO receives a voicemail',
        stageContent: '<em>The CFO receives a voicemail from a number showing the CEO\'s mobile. The voice sounds exactly like the CEO: "Hey, it\'s David. I\'m in back-to-back meetings. I need you to wire $240,000 to a new acquisition escrow today — it\'s time-sensitive. I\'ll explain later, just get it done. The wire details are in the email I just sent."</em><br><br>The "email from the CEO" arrives moments later from <strong>david.chen.ceo@company-secure-mail.com</strong>.',
        question: 'What makes AI voice cloning uniquely dangerous compared to traditional impersonation?',
        choices: [
          { text: 'AI voices can only be detected by specialized software, making human verification impossible.', correct: false },
          { text: 'Attackers can clone a convincing voice from as little as 30 seconds of public audio (interviews, conference talks, YouTube), eliminating voice as an authentication factor.', correct: true },
          { text: 'AI voice calls always come from spoofed numbers, which are easy to identify.', correct: false },
          { text: 'Voice cloning requires insider knowledge of the organization.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Modern AI voice cloning tools can produce convincing replicas from publicly available audio — a 30-second conference talk clip or podcast appearance is sufficient. This eliminates voice recognition as a trust signal. Combined with caller ID spoofing (which costs nothing), an attacker can convincingly impersonate any public-facing executive. This is an emerging and rapidly growing attack vector, especially targeting CFOs and finance teams.',
          incorrect: 'AI voice cloning is dangerous because it requires minimal audio to work — 30 seconds of any public recording. The CEO\'s voice may be available from earnings calls, conference talks, or media interviews. Caller ID spoofing makes the number appear legitimate. Voice alone is no longer a reliable authentication factor.',
        },
        points: 25,
        objectives: ['Understand AI voice cloning threat', 'Recognize that voice is no longer a reliable authenticator', 'Apply proper financial verification regardless of apparent caller identity'],
        hint: 'Where might an attacker find 30 seconds of the CEO\'s voice without any insider access?',
      },
      {
        type: 'analysis',
        label: 'Defense strategy',
        stageContent: 'Your organization wants to protect against AI voice impersonation attacks targeting financial transfers.',
        question: 'Which control BEST addresses this threat?',
        choices: [
          { text: 'Train employees to listen carefully and detect AI-generated voices.', correct: false },
          { text: 'Establish a pre-shared code word system for financial requests, combined with mandatory dual-approval for all wire transfers above a threshold.', correct: true },
          { text: 'Block all calls from external mobile numbers.', correct: false },
          { text: 'Use AI detection software to analyze all inbound calls in real time.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Human detection of AI voices is unreliable and getting worse as the technology improves. The effective defense is procedural: (1) Pre-arranged code words that only the real executive and authorized staff know — an AI clone cannot produce the right code word, (2) Dual-approval for financial transactions above a threshold — no single person can authorize a wire alone, regardless of who is asking. These controls make social engineering economically unviable regardless of how convincing the impersonation is.',
          incorrect: 'Human voice detection is increasingly unreliable — studies show people cannot reliably distinguish AI voices. AI detection software is also an arms race. The reliable defenses are procedural: code words that attackers cannot know, and mandatory dual-approval so no individual can be socially engineered into acting alone.',
        },
        points: 20,
        hint: 'If you can\'t reliably detect a fake voice, what process controls make voice impersonation irrelevant to the outcome?',
      },
    ],
  },
];

// ---- INCIDENT RESPONSE SCENARIOS ----------------------------------------------
const INCIDENT_SCENARIOS = [
  {
    id: 'ir-01',
    category: 'incident',
    title: 'Ransomware Detection & Response',
    desc: 'A workstation is displaying encryption warnings. What do you do?',
    tags: ['ransomware', 'containment', 'triage'],
    steps: [
      {
        type: 'terminal',
        label: 'Alert received from endpoint monitoring at 09:14',
        terminal: [
          { type: 'output', text: '[09:14:02] ALERT: Unusual file system activity on WORKSTATION-07' },
          { type: 'output', text: '[09:14:02] 3,847 files renamed with extension .locked in 45 seconds' },
          { type: 'alert',  text: '[09:14:03] CRITICAL: Process "svchost32.exe" consuming 98% CPU' },
          { type: 'output', text: '[09:14:03] Network connections detected to 185.220.101.47:443 (TOR exit node)' },
          { type: 'output', text: '[09:14:04] README_RESTORE.txt dropped in C:\\Users\\jsmith\\Desktop' },
        ],
        question: 'This is an active ransomware infection. What is your FIRST priority action?',
        choices: [
          { text: 'Pay the ransom immediately to recover the files before more damage occurs.', correct: false },
          { text: 'Isolate WORKSTATION-07 from the network immediately to stop lateral spread.', correct: true },
          { text: 'Run antivirus software on WORKSTATION-07 to remove the malware.', correct: false },
          { text: 'Reboot the machine to stop the encryption process.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The first priority is CONTAINMENT — physically or logically isolate the infected machine from the network. This stops the ransomware from spreading to other hosts, stops command-and-control communication, and preserves evidence. Paying the ransom is discouraged by law enforcement, AV scans won\'t stop an active attack, and rebooting may trigger additional payloads.',
          incorrect: 'The first priority must be containment. Isolate the machine from the network (unplug ethernet, disable Wi-Fi) immediately. This stops: (1) lateral movement to other machines, (2) exfiltration of data, (3) ongoing C2 communications. Paying ransom is not recommended, AV won\'t stop an active attack, and rebooting may trigger additional payloads.',
        },
        points: 30,
        objectives: ['Identify ransomware indicators', 'Apply IR containment priority', 'Understand C2 communication signs'],
        hint: 'In incident response, the phases are: Identify → Contain → Eradicate → Recover. What phase comes first after identification?',
      },
      {
        type: 'analysis',
        label: 'Post-containment analysis',
        question: 'After isolating the workstation, which is your next correct step?',
        choices: [
          { text: 'Immediately restore files from backup and return the machine to service.', correct: false },
          { text: 'Document findings, preserve forensic evidence (disk image), then notify the incident response team.', correct: true },
          { text: 'Wipe and reimage the machine as fast as possible.', correct: false },
          { text: 'Allow the user to continue working on the machine while you investigate.', correct: false },
        ],
        feedback: {
          correct: 'Correct. After containment, you must document and preserve evidence before making any changes. Take a disk image, capture memory if possible, record network logs, then escalate to the IR team. Rushing to restore or wipe destroys evidence needed to understand the attack vector, scope, and potentially attribution.',
          incorrect: 'After containment, evidence preservation is critical. Rushing to restore from backup or wiping the machine destroys forensic evidence needed to understand how the attacker got in, what they accessed, and whether other systems are compromised. Document → Preserve → Escalate → then remediate.',
        },
        points: 20,
        hint: 'Think about what information you\'ll need to prevent this from happening again, and whether other machines might be at risk.',
      },
      {
        type: 'analysis',
        label: 'Root cause investigation',
        question: 'Investigation reveals the user received an email with a macro-enabled Word document 20 minutes before the alert. What control failure does this indicate?',
        choices: [
          { text: 'The email gateway failed to block a macro-enabled document from an external sender.', correct: true },
          { text: 'The user\'s password was too weak.', correct: false },
          { text: 'The firewall rules were misconfigured.', correct: false },
          { text: 'The antivirus definitions were out of date.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The email gateway should strip or quarantine macro-enabled Office documents from external senders, or at minimum flag them for review. Additional controls that failed or were absent: macro execution policy in Office (Group Policy to disable macros by default), user awareness training (user opened and enabled the macro), and potentially endpoint detection that should have caught the malicious macro execution.',
          incorrect: 'The attack vector was a macro-enabled document delivered by email. The primary control failure is the email gateway not blocking/quarantining macro-enabled documents from external senders. Secondary failures include: no Group Policy to disable Office macros, user not recognizing the threat, and endpoint detection not catching malicious macro behavior.',
        },
        points: 25,
        hint: 'Trace the attack back to its entry point. What was the first thing that allowed the attacker in?',
      },
    ],
  },
  {
    id: 'ir-02',
    category: 'incident',
    title: 'Insider Threat Detection',
    desc: 'A DLP alert flags unusual data access before an employee\'s departure.',
    tags: ['insider-threat', 'DLP', 'exfiltration'],
    steps: [
      {
        type: 'terminal',
        label: 'DLP system alert — received this morning',
        terminal: [
          { type: 'output', text: '[08:02:14] DLP ALERT: Large file transfer detected — user: m.taylor' },
          { type: 'output', text: '[08:02:14] 847 files (4.3 GB) copied to USB device: SanDisk Ultra (ID: 7F3A)' },
          { type: 'alert',  text: '[08:02:15] POLICY VIOLATION: Bulk export of /shared/clients/ directory' },
          { type: 'output', text: '[08:02:20] Additional: 3 emails sent to personal Gmail in past 72 hours' },
          { type: 'output', text: '[08:02:20] HR system note: m.taylor submitted resignation — last day: 2026-03-27' },
        ],
        question: 'What is the first correct action when handling a potential insider threat incident?',
        choices: [
          { text: 'Immediately confront the employee and demand they return the USB drive.', correct: false },
          { text: 'Delete the employee\'s access silently so they cannot take more data.', correct: false },
          { text: 'Notify HR, Legal, and the security team immediately before taking any technical action.', correct: true },
          { text: 'Wait and monitor — they may have a legitimate reason for the transfer.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Insider threat cases involve legal, HR, and privacy considerations that must be handled carefully. Acting unilaterally — confronting the employee, silently disabling access, or deleting data — can destroy evidence, create wrongful termination liability, or violate employment law. The right first step is to loop in HR, Legal, and Security leadership so the response is coordinated, documented, and legally defensible.',
          incorrect: 'Insider threat cases require immediate escalation to HR, Legal, and Security — not unilateral technical action. Confronting the employee can destroy evidence or create a hostile situation. Silently revoking access without authorization may be a policy violation itself. Monitoring without reporting is also wrong given the severity. Coordinated, documented, legally-guided response is mandatory.',
        },
        points: 25,
        objectives: ['Understand insider threat response requirements', 'Recognize the HR/Legal coordination requirement', 'Avoid actions that compromise evidence or create liability'],
        hint: 'Insider threats are not purely technical incidents. Who else needs to be involved before you act?',
      },
      {
        type: 'analysis',
        label: 'Evidence preservation',
        stageContent: 'HR and Legal have been notified and have authorized a technical investigation. Which of the following correctly preserves the chain of custody for the USB transfer evidence?',
        question: 'Which approach properly preserves forensic evidence for potential legal proceedings?',
        choices: [
          { text: 'Screenshot the DLP alert and save it to your desktop for safekeeping.', correct: false },
          { text: 'Export and cryptographically hash all relevant logs, store them in a tamper-evident system, and document every action taken.', correct: true },
          { text: 'Email the DLP report to the security team for review.', correct: false },
          { text: 'Ask the employee to provide an explanation in writing before reviewing the logs.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Forensic evidence must be collected with integrity: export raw logs, generate cryptographic hashes (SHA-256) to prove they haven\'t been altered, store them in a write-protected or WORM system, and maintain a documented chain of custody log showing who accessed the evidence, when, and why. Screenshots and emailed files are insufficient for legal proceedings as they can be altered without detection.',
          incorrect: 'Proper evidence handling requires: (1) collecting raw, complete log data — not screenshots, (2) cryptographically hashing files to prove integrity, (3) storing in a tamper-evident/write-once system, (4) maintaining a chain of custody document. Screenshots can be edited. Emails can be altered. Evidence that fails chain-of-custody requirements may be inadmissible in disciplinary or legal proceedings.',
        },
        points: 20,
        hint: 'Think about how evidence is handled in a court of law. What guarantees that the data hasn\'t been modified after collection?',
      },
    ],
  },
  {
    id: 'ir-03',
    category: 'incident',
    title: 'Web Application Attack',
    desc: 'WAF logs show a SQL injection attempt leading to unauthorized access.',
    tags: ['SQLi', 'web-app', 'WAF', 'breach'],
    steps: [
      {
        type: 'terminal',
        label: 'Web Application Firewall logs — last 30 minutes',
        terminal: [
          { type: 'output', text: '[11:34:02] WAF: GET /api/users?id=1 — 200 OK — 10.4.2.33' },
          { type: 'warn',   text: '[11:34:11] WAF: GET /api/users?id=1 OR 1=1-- — BLOCKED — 10.4.2.33' },
          { type: 'warn',   text: '[11:34:18] WAF: GET /api/users?id=1\' UNION SELECT null,username,password FROM users-- — BLOCKED' },
          { type: 'output', text: '[11:34:31] WAF: GET /api/users?id=1%27%20OR%20%271%27%3D%271 — 200 OK (encoding bypass)' },
          { type: 'alert',  text: '[11:34:31] DB: Query returned 4,312 rows — ALL user records' },
          { type: 'alert',  text: '[11:34:35] DB: Response size 2.1 MB sent to 10.4.2.33' },
        ],
        question: 'The WAF was bypassed using URL encoding. What does this indicate about the WAF configuration?',
        choices: [
          { text: 'The WAF is working correctly — it blocked the obvious attacks.', correct: false },
          { text: 'The WAF rules do not decode URL-encoded payloads before matching attack signatures.', correct: true },
          { text: 'The database query was legitimate and returned expected results.', correct: false },
          { text: 'This is a false positive — the 200 response does not confirm SQL injection success.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The WAF blocked plain-text SQL injection but was bypassed when the attacker URL-encoded the payload (%27 = \', %20 = space, etc.). A properly configured WAF should normalize/decode input before matching signatures. The 2.1 MB response containing 4,312 rows confirms the injection succeeded and all user records were exfiltrated. This is a data breach.',
          incorrect: 'The WAF has a critical gap: it doesn\'t decode URL-encoded characters before matching signatures. %27 is a URL-encoded single quote — the same character that breaks out of SQL string context. A properly hardened WAF decodes and normalizes all input encodings before signature matching. The 2.1 MB response and 4,312 rows confirm a successful SQL injection data breach.',
        },
        points: 30,
        objectives: ['Identify SQL injection indicators in logs', 'Understand WAF bypass via encoding', 'Assess breach scope from log data'],
        hint: 'URL encoding: %27 = \', %20 = space, %3D = =. How does the final request compare to the blocked ones?',
      },
      {
        type: 'analysis',
        label: 'Breach scope and notification',
        stageContent: 'The SQL injection exfiltrated 4,312 user records containing: names, email addresses, hashed passwords (MD5, unsalted), and home addresses. The breach occurred 35 minutes ago.',
        question: 'Under GDPR, what is the maximum time allowed to notify the supervisory authority of a personal data breach once it is discovered?',
        choices: [
          { text: '24 hours', correct: false },
          { text: '72 hours', correct: true },
          { text: '7 days', correct: false },
          { text: 'Only when you know the full scope of the breach', correct: false },
        ],
        feedback: {
          correct: 'Correct. GDPR Article 33 requires notification to the supervisory authority "without undue delay and, where feasible, not later than 72 hours" after becoming aware of a personal data breach. If you cannot notify within 72 hours, you must provide a reasoned justification for the delay. Additionally, MD5 unsalted password hashes are considered insufficiently protected — the hashes can be rapidly cracked, meaning password exposure must be assumed and affected users notified per Article 34.',
          incorrect: 'GDPR Article 33 mandates supervisory authority notification within 72 hours of discovering a breach. The notification doesn\'t require full scope knowledge — you notify with what\'s known and update later. Also critical here: MD5 unsalted hashes are easily cracked with rainbow tables, making this effectively a plaintext password exposure. Affected users should be notified and required to reset passwords.',
        },
        points: 20,
        hint: 'GDPR has a specific Article number and time window for breach notification. Think about what you\'ve heard about the regulation.',
      },
    ],
  },
  {
    id: 'ir-04',
    category: 'incident',
    title: 'Supply Chain Attack',
    desc: 'A popular npm package is found to contain malicious code after an update.',
    tags: ['supply-chain', 'dependency', 'malware'],
    steps: [
      {
        type: 'terminal',
        label: 'Security scanner alert — 06:45 AM',
        terminal: [
          { type: 'output', text: '[06:45:01] SCAN: Analyzing installed packages...' },
          { type: 'alert',  text: '[06:45:14] MALICIOUS CODE DETECTED: build-utils@2.3.1' },
          { type: 'output', text: '[06:45:14] Installed on: 14 developer workstations, 3 CI/CD servers' },
          { type: 'output', text: '[06:45:14] Obfuscated code in postinstall script makes outbound requests' },
          { type: 'output', text: '[06:45:15] Destination: 185.220.101.9:443 (known malicious infrastructure)' },
          { type: 'output', text: '[06:45:15] Previous version 2.3.0 — clean. This version published 18 hours ago.' },
          { type: 'warn',   text: '[06:45:15] postinstall script ran automatically on all 17 affected systems' },
        ],
        question: 'What type of attack is this, and what makes it particularly difficult to detect?',
        choices: [
          { text: 'A zero-day exploit — because no patch is available.', correct: false },
          { text: 'A supply chain attack — malicious code is injected into a legitimate, trusted dependency used by many downstream projects.', correct: true },
          { text: 'A watering hole attack — because developers visit the npm registry.', correct: false },
          { text: 'An insider threat — because a developer added the malicious package.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Supply chain attacks compromise a trusted upstream component so that downstream consumers unknowingly install malware. This is highly effective because: (1) developers trust their package manager, (2) the package has an established reputation, (3) the postinstall script runs automatically with user-level privileges during npm install, (4) it can affect thousands of projects simultaneously. Notable real examples: SolarWinds (2020), XZ Utils (2024), and dozens of npm package compromises.',
          incorrect: 'This is a supply chain attack. The attacker compromised a legitimate npm package so that all downstream projects that install it receive the malicious version. Supply chain attacks are effective because they exploit trust — developers trust established packages and package managers don\'t default to code review before install.',
        },
        points: 25,
        objectives: ['Identify supply chain attack characteristics', 'Understand postinstall script execution risks', 'Know dependency security controls'],
        hint: 'The package was legitimate until 18 hours ago. The attacker didn\'t attack your organization directly — what did they attack instead?',
      },
      {
        type: 'analysis',
        label: 'Containment and prevention',
        stageContent: 'The malicious package ran on 17 systems. You need to contain the incident and prevent recurrence.',
        question: 'Which preventive control would MOST effectively catch this type of attack before it executes?',
        choices: [
          { text: 'Require developers to read all package source code before installing.', correct: false },
          { text: 'Lock dependency versions with a lockfile and verify package integrity hashes in CI/CD before deployment.', correct: true },
          { text: 'Only use packages with over 1 million weekly downloads.', correct: false },
          { text: 'Disable npm and switch to manually downloaded packages.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Dependency pinning (lockfiles like package-lock.json) combined with integrity hash verification (npm uses SHA-512 hashes stored in the lockfile) ensures the exact same package bytes are installed every time. A malicious new version would have a different hash and fail verification. Additional controls: use a private npm registry that gates new versions, implement Software Composition Analysis (SCA) tools in CI/CD pipelines, and restrict postinstall scripts via npm config.',
          incorrect: 'Lockfiles and hash verification are the technical controls that catch this. A lockfile pins the exact version AND hash — any changed package fails integrity checks. High download counts don\'t prevent compromise. Reading all source code is impractical. The CI/CD pipeline is the right place to enforce these checks automatically.',
        },
        points: 20,
        hint: 'What changes between the clean version 2.3.0 and the malicious 2.3.1 that a cryptographic hash would detect?',
      },
    ],
  },
  {
    id: 'ir-05',
    category: 'incident',
    title: 'Cryptominer on Production Server',
    desc: 'A web server is behaving abnormally — high CPU and unusual outbound connections.',
    tags: ['cryptominer', 'web-exploitation', 'persistence'],
    steps: [
      {
        type: 'terminal',
        label: 'Monitoring alert — production web server WEB-03',
        terminal: [
          { type: 'alert',  text: '[11:02:44] ALERT: CPU sustained at 97% on WEB-03 for 40 minutes' },
          { type: 'output', text: '[11:02:44] Process: /tmp/.x86_64 (hidden binary, not in package manifest)' },
          { type: 'output', text: '[11:02:45] Outbound connection: WEB-03 → pool.minexmr.com:4444' },
          { type: 'output', text: '[11:02:45] Cron job added: */5 * * * * /tmp/.x86_64 &>/dev/null' },
          { type: 'warn',   text: '[11:02:46] Apache error log: PHP deserialization error 3 days ago from 45.55.22.1' },
          { type: 'output', text: '[11:02:46] WEB-03 hosts customer-facing checkout — contains payment processing code' },
        ],
        question: 'Beyond the immediate resource drain, what is the most serious security concern here?',
        choices: [
          { text: 'The server will crash from CPU exhaustion.', correct: false },
          { text: 'The attacker has code execution on a server handling payment data — the miner may be just one of multiple payloads.', correct: true },
          { text: 'The mining activity will appear in the company\'s electricity bill.', correct: false },
          { text: 'Other servers will be slowed by the network traffic to the mining pool.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The cryptominer proves the attacker achieved remote code execution — the miner is just what was deployed visibly. The same access could have installed a backdoor, exfiltrated the payment database, modified checkout code to skim card numbers, or deployed ransomware. The presence of a miner on a payment server is a full incident requiring forensic investigation of everything that server touches, not just miner removal.',
          incorrect: 'The miner proves code execution on a PCI-scope server. The real danger: the attacker may have also installed backdoors, skimmed payment data, or exfiltrated customer records. Removing the miner without full forensic investigation leaves unknown persistent access in place. This is a full security incident affecting potentially PCI DSS scope.',
        },
        points: 25,
        objectives: ['Understand that miners indicate full code execution', 'Identify persistence mechanisms (cron)', 'Recognize PCI scope implications'],
        hint: 'If the attacker can run a mining program, what else could they have run on this server?',
      },
    ],
  },
  {
    id: 'ir-06',
    category: 'incident',
    title: 'Stolen Session Token — MFA Bypass',
    desc: 'An account is accessed from two locations simultaneously despite MFA being enabled.',
    tags: ['session-hijacking', 'AiTM', 'MFA-bypass', 'token-theft'],
    steps: [
      {
        type: 'terminal',
        label: 'Conditional Access alert — Azure AD',
        terminal: [
          { type: 'output', text: '[14:22:01] SUCCESS: login — s.patel@company.com — MFA verified — IP: 10.0.1.45 (NYC office)' },
          { type: 'alert',  text: '[14:22:47] ALERT: Same session active from IP: 91.108.4.212 (Ukraine)' },
          { type: 'alert',  text: '[14:22:48] Impossible travel: NYC → Ukraine in 46 seconds' },
          { type: 'output', text: '[14:22:52] Session: Downloaded 847 files from SharePoint' },
          { type: 'output', text: '[14:22:55] Session: Created new mail forwarding rule → attacker@protonmail.com' },
          { type: 'output', text: '[14:23:01] Note: s.patel reported clicking a "Microsoft login" link in email at 14:21' },
        ],
        question: 'MFA was successfully completed. How did the attacker gain access anyway?',
        choices: [
          { text: 'The attacker guessed the MFA code.', correct: false },
          { text: 'An Adversary-in-the-Middle (AiTM) proxy relayed the real MFA session in real time, stealing the post-authentication session token.', correct: true },
          { text: 'MFA was misconfigured and not actually enforced.', correct: false },
          { text: 'The attacker performed a SIM-swap to receive the MFA code.', correct: false },
        ],
        feedback: {
          correct: 'Correct. AiTM phishing uses a reverse proxy that sits between the victim and the real Microsoft login. The victim authenticates fully (including MFA) through the proxy, which relays everything to Microsoft. The proxy captures the resulting session cookie post-authentication. MFA was completed — the attacker simply stole the authenticated session token. This is why FIDO2 hardware keys are the only truly phishing-resistant MFA: the authentication is cryptographically bound to the origin domain, so a proxy cannot relay it.',
          incorrect: 'This is an AiTM (Adversary-in-the-Middle) attack. The attacker ran a proxy that relayed the victim\'s real Microsoft login — including the MFA step — and captured the session cookie afterward. The attacker never needed the password or MFA code directly. TOTP/SMS MFA does not protect against this. Only FIDO2 hardware keys are resistant to AiTM because they bind authentication to the actual domain.',
        },
        points: 30,
        objectives: ['Understand AiTM session token theft', 'Know why TOTP MFA doesn\'t stop AiTM', 'Identify impossible travel as detection signal'],
        hint: 'The MFA completed successfully against the real Microsoft server. At what point in the authentication flow did the attacker intercept something useful?',
      },
    ],
  },
  {
    id: 'ir-07',
    category: 'incident',
    title: 'DDoS Response',
    desc: 'The company website is unreachable — logs show a massive volumetric attack.',
    tags: ['DDoS', 'availability', 'mitigation'],
    steps: [
      {
        type: 'terminal',
        label: 'Network monitoring — 15:30 PM',
        terminal: [
          { type: 'alert',  text: '[15:30:01] CRITICAL: Inbound traffic spike — 48 Gbps (normal: ~200 Mbps)' },
          { type: 'output', text: '[15:30:02] Source: 92,000+ unique IPs across 40+ countries' },
          { type: 'output', text: '[15:30:02] Protocol: UDP flood targeting port 53 (DNS amplification)' },
          { type: 'output', text: '[15:30:03] Upstream ISP link: 100% saturated' },
          { type: 'alert',  text: '[15:30:04] Website response time: TIMEOUT. Customer services: OFFLINE' },
          { type: 'output', text: '[15:30:05] Attack vector: DNS amplification — small queries returning large responses' },
        ],
        question: 'This is a DNS amplification DDoS. What makes amplification attacks particularly powerful?',
        choices: [
          { text: 'They encrypt the attack traffic so it cannot be filtered.', correct: false },
          { text: 'Attackers send small spoofed requests to open DNS resolvers, which send large responses to the victim — amplifying bandwidth 50-70x.', correct: true },
          { text: 'They use compromised internal hosts so perimeter defenses are bypassed.', correct: false },
          { text: 'They target the application layer, bypassing network-level defenses.', correct: false },
        ],
        feedback: {
          correct: 'Correct. DNS amplification exploits open DNS resolvers: the attacker spoofs the victim\'s IP and sends a small DNS query (~60 bytes) to thousands of resolvers. Each resolver sends the large response (~3,000+ bytes) to the victim. This creates a 50x amplification factor. With 92,000 source IPs, the attacker generates 48 Gbps of traffic with a fraction of that upstream bandwidth. Defense: upstream scrubbing via your ISP or a DDoS mitigation provider (Cloudflare, Akamai Prolexic, AWS Shield).',
          incorrect: 'DNS amplification works by spoofing the victim\'s IP in small requests to open resolvers, which flood the victim with large responses — 50-70x amplification. The attacker needs far less bandwidth than the attack generates. The only viable defenses are upstream scrubbing (DDoS protection services) or null-routing the targeted IP.',
        },
        points: 25,
        objectives: ['Understand DNS amplification mechanics', 'Know volumetric DDoS characteristics', 'Identify appropriate mitigation approaches'],
        hint: 'What is the ratio between the size of a DNS query and its response? How does that help the attacker?',
      },
      {
        type: 'analysis',
        label: 'Mitigation options',
        stageContent: 'The attack is ongoing. Your upstream ISP link is saturated at 100 Gbps capacity. Standard firewall rules cannot help because the bandwidth is exhausted before traffic reaches your network.',
        question: 'What is the most effective immediate mitigation?',
        choices: [
          { text: 'Add more firewall rules to block the source IPs.', correct: false },
          { text: 'Call your ISP to implement upstream null routing of your attacked IP, or activate a cloud-based DDoS scrubbing service.', correct: true },
          { text: 'Reboot the web servers to clear the traffic queues.', correct: false },
          { text: 'Increase server capacity to handle the additional traffic.', correct: false },
        ],
        feedback: {
          correct: 'Correct. When the upstream link is saturated, no on-premises device can help — the attack traffic never even reaches your firewall. The solution must be upstream: (1) ask your ISP to null-route (blackhole) the attacked IP at their edge, stopping traffic before it reaches your link, or (2) activate a cloud DDoS scrubbing service (Cloudflare, Akamai) that absorbs and filters traffic at scale before forwarding clean traffic to you. Rebooting servers or adding firewall rules is irrelevant when the pipe itself is full.',
          incorrect: 'When the upstream pipe is full, on-premises solutions are useless. The fix must happen upstream of your connection — null routing at the ISP level or cloud scrubbing that filters traffic before it reaches your link.',
        },
        points: 20,
        hint: 'Your pipe is 100% full. Can any device on your network even see the traffic to block it?',
      },
    ],
  },
  {
    id: 'ir-08',
    category: 'incident',
    title: 'Zero-Day Exploitation',
    desc: 'A critical vulnerability with no available patch is being actively exploited.',
    tags: ['zero-day', 'virtual-patching', 'WAF'],
    steps: [
      {
        type: 'terminal',
        label: 'Threat intelligence feed — 08:00 AM',
        terminal: [
          { type: 'alert',  text: '[08:00:12] CRITICAL ADVISORY: CVE-2026-XXXX — Apache HTTP Server' },
          { type: 'output', text: '[08:00:12] Type: Remote Code Execution — CVSS Score: 9.8' },
          { type: 'output', text: '[08:00:12] Affected: Apache 2.4.0 – 2.4.58 (your version: 2.4.51)' },
          { type: 'output', text: '[08:00:12] Patch status: NOT YET AVAILABLE — vendor notified 48 hours ago' },
          { type: 'warn',   text: '[08:00:13] Exploit: Proof-of-concept code publicly available on GitHub' },
          { type: 'output', text: '[08:00:13] Attack vector: Malformed HTTP request header — no authentication required' },
          { type: 'alert',  text: '[08:00:15] WAF logs: 3 exploitation attempts detected from 45.33.21.8 in past hour' },
        ],
        question: 'No vendor patch exists. What is the most effective immediate mitigation?',
        choices: [
          { text: 'Wait for the official patch — acting without it may cause instability.', correct: false },
          { text: 'Shut down all Apache servers until a patch is released.', correct: false },
          { text: 'Deploy a WAF virtual patch rule blocking the malformed header pattern, and restrict access to only known-good IPs.', correct: true },
          { text: 'Upgrade to the latest Apache version even though it\'s also affected.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Virtual patching via WAF is the standard response to zero-days with no available patch. The WAF inspects HTTP requests and blocks the malformed header pattern used by the exploit — without modifying the underlying application. This buys time until the vendor patch is released. Additional controls: restrict server access via network ACLs to reduce the attack surface, increase logging/alerting on the specific attack pattern, and monitor for any signs of successful exploitation.',
          incorrect: 'Virtual patching via WAF is the standard zero-day response when no vendor patch exists. The WAF blocks the specific exploit pattern at the network layer without touching the application. Complete shutdown may not be operationally viable. Waiting without controls is irresponsible given active public exploits exist.',
        },
        points: 25,
        objectives: ['Define zero-day vulnerabilities', 'Understand virtual patching as a mitigation', 'Know response priorities for unpatched critical CVEs'],
        hint: 'You cannot fix the vulnerability in the software. But can you stop the specific exploit pattern from reaching the vulnerable code?',
      },
    ],
  },
];

// ---- PASSWORD SCENARIOS -------------------------------------------------------
const PASSWORD_SCENARIOS = [
  {
    id: 'pw-01',
    category: 'passwords',
    title: 'Password Policy Review',
    desc: 'Evaluate password choices and authentication configurations.',
    tags: ['passwords', 'MFA', 'policy'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: A user proposes this password for their corporate account',
        stageContent: 'The user wants to use: <strong>Summer2024!</strong><br><br>They argue it meets complexity requirements: uppercase, lowercase, number, and special character — and it\'s easy for them to remember.',
        question: 'Is this an acceptable corporate password?',
        choices: [
          { text: 'Yes — it meets all four complexity criteria and is easy to remember.', correct: false },
          { text: 'No — despite meeting complexity rules, it is predictable and likely in breach databases.', correct: true },
          { text: 'Yes — adding an exclamation mark always makes passwords secure.', correct: false },
          { text: 'No — it is too short at under 8 characters.', correct: false },
        ],
        feedback: {
          correct: 'Correct. "Summer2024!" is a classic example of a password that meets mechanical complexity rules but is actually weak. Seasonal words + years + trailing symbols are extremely common patterns that appear in credential stuffing dictionaries. NIST SP 800-63B guidance recommends checking passwords against known breach databases and discouraging predictable patterns rather than enforcing arbitrary complexity rules.',
          incorrect: '"Summer2024!" is weak despite meeting complexity rules because it follows a highly predictable pattern (Season + Year + Symbol). This exact style of password is in every credential stuffing list. Modern best practice (NIST 800-63B) favors longer passphrases and breach-database screening over complexity theater.',
        },
        points: 15,
        objectives: ['Understand password entropy vs complexity rules', 'Apply NIST 800-63B guidance', 'Recognize common weak patterns'],
        hint: 'Think about what an attacker\'s dictionary attack would prioritize. What patterns are most common?',
      },
      {
        type: 'analysis',
        label: 'MFA Configuration',
        stageContent: 'Your organization is rolling out MFA. The options are:<br><br>' +
          '(A) SMS one-time codes<br>' +
          '(B) Authenticator app (TOTP)<br>' +
          '(C) Hardware security key (FIDO2/WebAuthn)<br>' +
          '(D) Email-based OTP',
        question: 'Rank these from MOST to LEAST phishing-resistant. Which is most phishing-resistant?',
        choices: [
          { text: 'SMS codes — they\'re widely supported and easy to use.', correct: false },
          { text: 'Email OTP — works everywhere without a separate app.', correct: false },
          { text: 'TOTP authenticator app — generates time-based codes offline.', correct: false },
          { text: 'Hardware security key (FIDO2) — cryptographically bound to origin domain.', correct: true },
        ],
        feedback: {
          correct: 'Correct. FIDO2/WebAuthn hardware keys are the gold standard. They are phishing-resistant because the cryptographic challenge is bound to the actual origin domain — a fake site cannot obtain the response even if the user is tricked into visiting it. Ranking: FIDO2 > TOTP > Email OTP > SMS (vulnerable to SIM-swap attacks). TOTP codes can still be phished in real-time by attacker proxies.',
          incorrect: 'Hardware FIDO2 keys are the most phishing-resistant. The key point: FIDO2 is cryptographically bound to the origin domain, so it physically cannot be used on a fake phishing site. TOTP codes CAN be phished via real-time adversary-in-the-middle proxies. SMS is vulnerable to SIM-swapping. Email OTP depends on email account security. Ranking: FIDO2 > TOTP > Email OTP > SMS.',
        },
        points: 20,
        hint: 'Consider what happens when a user is tricked into entering their MFA code on a fake site. Which methods can still be intercepted?',
      },
    ],
  },
  {
    id: 'pw-02',
    category: 'passwords',
    title: 'Credential Stuffing Attack Response',
    desc: 'Login anomalies suggest stolen credentials from a third-party breach are being used.',
    tags: ['credential-stuffing', 'account-takeover', 'monitoring'],
    steps: [
      {
        type: 'terminal',
        label: 'Authentication logs from the past 2 hours',
        terminal: [
          { type: 'output', text: '[14:01:03] SUCCESS login: user@company.com — IP: 192.168.1.45 (usual office IP)' },
          { type: 'warn',   text: '[14:03:17] FAIL login: admin.jones@company.com — IP: 91.234.55.12 (RU)' },
          { type: 'warn',   text: '[14:03:19] FAIL login: b.smith@company.com — IP: 91.234.55.12 (RU)' },
          { type: 'warn',   text: '[14:03:21] FAIL login: s.patel@company.com — IP: 91.234.55.12 (RU)' },
          { type: 'warn',   text: '[14:03:22] FAIL login: t.nguyen@company.com — IP: 91.234.55.12 (RU)' },
          { type: 'alert',  text: '[14:03:41] SUCCESS login: m.johnson@company.com — IP: 91.234.55.12 (RU)' },
          { type: 'output', text: '[14:03:41] Session: m.johnson accessed HR portal, payroll settings' },
        ],
        question: 'What type of attack does this log pattern represent?',
        choices: [
          { text: 'A brute force attack — trying many passwords against one account.', correct: false },
          { text: 'Credential stuffing — using username/password pairs from a third-party data breach.', correct: true },
          { text: 'A password spray attack — trying one common password against many accounts.', correct: false },
          { text: 'Session hijacking — stealing an existing authenticated session token.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Credential stuffing uses valid username/password pairs leaked from other breached sites (e.g., a gaming or retail site). Users who reuse passwords across services are vulnerable even if your platform was never breached. The pattern here: many different accounts tried in rapid succession from one IP, with occasional successes — exactly the signature of stuffing a leaked credential list. This is distinct from brute force (many passwords, one account) or password spray (one password, many accounts).',
          incorrect: 'This is credential stuffing. The attacker has a list of email/password pairs from a third-party data breach and is testing them against your login page. Brute force = many passwords on one account. Password spray = one password on many accounts. Stuffing = many valid pairs from elsewhere. The rapid succession across different accounts with mostly failures (and some hits) is the telltale pattern.',
        },
        points: 20,
        objectives: ['Distinguish credential stuffing from brute force and spray', 'Identify stuffing log patterns', 'Understand password reuse risk'],
        hint: 'Notice the pattern: many different accounts, same source IP, mostly failures with occasional success. What does that suggest about the attacker\'s approach?',
      },
      {
        type: 'analysis',
        label: 'Immediate response actions',
        stageContent: 'The account m.johnson was successfully accessed from an overseas IP and browsed to payroll settings. The real m.johnson is currently in the office on the corporate network.',
        question: 'What is the correct immediate response for the m.johnson account?',
        choices: [
          { text: 'Email m.johnson asking them to confirm if they are traveling.', correct: false },
          { text: 'Immediately terminate the active session, force a password reset, and require MFA enrollment.', correct: true },
          { text: 'Block the Russian IP address in the firewall and monitor.', correct: false },
          { text: 'Wait 30 minutes to see if the session accesses anything sensitive before acting.', correct: false },
        ],
        feedback: {
          correct: 'Correct. With a confirmed account takeover in progress (real user is on-site, attacker is active from overseas), the response must be immediate: terminate the active attacker session, force a password reset, and require MFA enrollment before the account can be used again. Emailing the user is too slow. Blocking just the IP allows the attacker to reconnect from a different IP. Waiting gives the attacker time to change payroll settings or exfiltrate data.',
          incorrect: 'This is an active account takeover — immediate action is required. The attacker\'s session must be terminated now. IP blocking alone is insufficient (VPN/proxy re-routing). Emailing the user is too slow. Waiting allows the attacker to complete their objective (likely payroll fraud). The correct sequence: kill session → force password reset → enforce MFA → investigate scope of access.',
        },
        points: 20,
        hint: 'The attacker has an active session right now. What must happen in the next few minutes, not hours?',
      },
    ],
  },
  {
    id: 'pw-03',
    category: 'passwords',
    title: 'Secure Password Storage',
    desc: 'A developer asks how to store user passwords in a new application.',
    tags: ['hashing', 'storage', 'development'],
    steps: [
      {
        type: 'analysis',
        label: 'Developer question during code review',
        stageContent: 'A developer shows you this code for storing user passwords:<br><br>' +
          '<code>const hash = crypto.createHash(\'md5\').update(password).digest(\'hex\');<br>db.save({ username, password: hash });</code><br><br>' +
          'They say: "MD5 is a hash function, so passwords are protected."',
        question: 'What is wrong with this approach?',
        choices: [
          { text: 'Nothing — MD5 is a well-known cryptographic algorithm used in security.', correct: false },
          { text: 'MD5 is unsalted and too fast — it can be cracked with rainbow tables or GPU brute-force in seconds.', correct: true },
          { text: 'The code should use SHA-256 instead, which is more modern.', correct: false },
          { text: 'Passwords should be encrypted, not hashed, so they can be recovered.', correct: false },
        ],
        feedback: {
          correct: 'Correct. MD5 has two critical problems for password storage: (1) No salt — identical passwords produce identical hashes, enabling rainbow table attacks across all users at once. (2) Speed — MD5 was designed to be fast for file integrity checks, which is the opposite of what you want for passwords. A modern GPU can compute billions of MD5 hashes per second. Use bcrypt, scrypt, or Argon2id — purpose-built algorithms that are intentionally slow and include salting. SHA-256 has the same speed problem as MD5.',
          incorrect: 'MD5 is inappropriate for passwords because: (1) it\'s unsalted, allowing rainbow table attacks, (2) it\'s extremely fast — billions of hashes/second on modern hardware means brute-force is trivial. SHA-256 shares the speed problem. Passwords should NEVER be reversibly encrypted (that means the server stores the key, which can be stolen). Use purpose-built password hashing: bcrypt, scrypt, or Argon2id.',
        },
        points: 20,
        objectives: ['Understand why password hashing requires slowness', 'Know the role of salts', 'Identify correct algorithms: bcrypt/Argon2id'],
        hint: 'What is the difference between a hash designed for speed (file checksums) vs one designed for passwords? What does a salt prevent?',
      },
      {
        type: 'analysis',
        label: 'Choosing the right algorithm',
        stageContent: 'The developer asks which algorithm to use. The options are:<br><br>' +
          '• MD5<br>• SHA-256<br>• bcrypt (work factor 12)<br>• Argon2id (recommended settings)<br>• AES-256 encryption',
        question: 'Which is the BEST choice for storing user passwords in 2026?',
        choices: [
          { text: 'SHA-256 — it\'s a modern, industry-standard cryptographic hash.', correct: false },
          { text: 'AES-256 encryption — so passwords can be recovered if needed.', correct: false },
          { text: 'bcrypt with work factor 12 — proven, widely supported, intentionally slow.', correct: false },
          { text: 'Argon2id with recommended settings — winner of the Password Hashing Competition, memory-hard.', correct: true },
        ],
        feedback: {
          correct: 'Correct. Argon2id is the current best practice — it won the Password Hashing Competition (2015) and is recommended by OWASP. It is memory-hard (resistant to GPU/ASIC attacks that bcrypt is not), supports configurable time and memory costs, and has a clean design. bcrypt is still acceptable if Argon2id is unavailable. SHA-256 is too fast. AES encryption is wrong in principle — you should never be able to recover a plaintext password; if the key is stolen, all passwords are exposed.',
          incorrect: 'Argon2id is the current best practice for password hashing. SHA-256 is far too fast for passwords. AES encryption is fundamentally wrong — if you can decrypt a password, so can an attacker with the key. bcrypt is still acceptable but Argon2id\'s memory-hardness makes it more resistant to modern GPU-based attacks. OWASP recommends Argon2id as the primary choice.',
        },
        points: 15,
        hint: 'OWASP publishes a Password Storage Cheat Sheet. What algorithm did the Password Hashing Competition select in 2015?',
      },
    ],
  },
  {
    id: 'pw-04',
    category: 'passwords',
    title: 'Password Manager Adoption',
    desc: 'Evaluate the security tradeoffs of using a password manager.',
    tags: ['password-manager', 'zero-knowledge', 'reuse'],
    steps: [
      {
        type: 'analysis',
        label: 'Employee concern during security training',
        stageContent: 'An employee says: <em>"I don\'t trust password managers. If the company gets hacked, the attacker gets ALL my passwords at once. I\'d rather remember my passwords myself."</em><br><br>The employee currently uses a base password + site suffix (e.g., "Base!123amazon", "Base!123google").',
        question: 'Which response best addresses the employee\'s concern?',
        choices: [
          { text: 'Their concern is valid — password managers are single points of failure and should be avoided.', correct: false },
          { text: 'Modern password managers use zero-knowledge architecture: the vendor never holds your master password or decryption key, so even a vendor breach doesn\'t expose passwords.', correct: true },
          { text: 'The risk is acceptable because password managers are convenient.', correct: false },
          { text: 'They should write passwords in a physical notebook instead.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Reputable password managers use zero-knowledge encryption — your vault is encrypted client-side with a key derived from your master password before it ever leaves your device. The vendor stores only encrypted blobs they mathematically cannot decrypt. Meanwhile, the employee\'s current approach (base + suffix) is a well-known pattern that attackers exploit: if one breach reveals "Base!123amazon", they immediately try "Base!123" variations across all other services.',
          incorrect: 'Zero-knowledge architecture means the password manager vendor cannot decrypt your vault even if breached — they never have the key. The employee\'s "base + suffix" pattern is actually far more dangerous: it\'s a recognized pattern that credential stuffing tools are specifically designed to exploit.',
        },
        points: 15,
        objectives: ['Understand zero-knowledge password manager architecture', 'Recognize the danger of password pattern reuse', 'Know the security case for password managers'],
        hint: 'What does "zero-knowledge" mean about what the vendor can see? And what would an attacker do with "Base!123amazon"?',
      },
      {
        type: 'analysis',
        label: 'Master password and MFA',
        stageContent: 'The employee agrees to use a password manager. They ask: "What happens if someone gets my master password?"',
        question: 'What is the most effective combination of controls to protect a password manager account?',
        choices: [
          { text: 'A long master password alone is sufficient protection.', correct: false },
          { text: 'A strong master passphrase (5+ random words) combined with FIDO2 hardware key MFA on the password manager account.', correct: true },
          { text: 'Changing the master password every 30 days.', correct: false },
          { text: 'Using the same master password as your email so you only have one to remember.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The master password should be a long passphrase (5+ random words = high entropy, memorable) that is unique and never used anywhere else. FIDO2 MFA on the password manager itself means an attacker who obtains the master password still cannot decrypt the vault without the physical hardware key. This creates a two-layer defense: something you know (passphrase) + something you have (hardware key).',
          incorrect: 'The master password must be unique, long (5+ random words), and backed by hardware MFA. Never reuse the master password anywhere — it\'s the key to everything. Frequent rotation is counterproductive. A hardware key as MFA means the vault is protected even if the master password is compromised.',
        },
        points: 15,
        hint: 'What two independent factors would stop an attacker who somehow obtained the master password?',
      },
    ],
  },
  {
    id: 'pw-05',
    category: 'passwords',
    title: 'Privileged Account Management',
    desc: 'A sysadmin uses their admin account for all daily activities.',
    tags: ['PAM', 'least-privilege', 'admin'],
    steps: [
      {
        type: 'analysis',
        label: 'IT audit finding',
        stageContent: 'An audit finds that 8 of 10 sysadmins use their domain administrator accounts as their primary daily-use accounts for email, web browsing, Slack, and all other tasks. They argue it\'s more convenient than switching accounts.',
        question: 'What is the primary security risk of using admin accounts for everyday tasks?',
        choices: [
          { text: 'Admin accounts have weaker passwords by default.', correct: false },
          { text: 'Any malware, phishing, or browser exploit during daily use executes with full admin privileges, giving attackers domain-level access instantly.', correct: true },
          { text: 'Admin accounts are visible in Active Directory, making them easier targets.', correct: false },
          { text: 'Using admin accounts for email violates email retention policies.', correct: false },
        ],
        feedback: {
          correct: 'Correct. If a sysadmin clicks a malicious email attachment or visits a compromised website while using their DA account, any code that executes has full domain administrator rights. This immediately allows the attacker to: create new admin accounts, disable security tools, dump all Active Directory credentials, and move laterally across the entire domain. The principle of least privilege requires using the minimum necessary permissions for each task — admin access only when performing admin tasks.',
          incorrect: 'The risk is execution context: any malware running in the admin\'s session inherits admin privileges. A phishing document, malicious browser extension, or drive-by download immediately becomes domain-level compromise. Least privilege requires separation: standard account for daily work, admin account only when explicitly needed for admin tasks.',
        },
        points: 20,
        objectives: ['Apply least privilege to admin account usage', 'Understand privilege escalation via malware execution context', 'Know Privileged Access Workstation (PAW) concept'],
        hint: 'When malware runs on your machine, what user context does it run in? What can it do with domain admin rights?',
      },
    ],
  },
  {
    id: 'pw-06',
    category: 'passwords',
    title: 'Default Credentials Audit',
    desc: 'A network scan reveals multiple devices using factory-default passwords.',
    tags: ['default-credentials', 'IoT', 'hardening'],
    steps: [
      {
        type: 'terminal',
        label: 'Internal vulnerability scan results',
        terminal: [
          { type: 'output', text: '[SCAN] 192.168.10.1   — Cisco Router     — admin/admin     — VERIFIED LOGIN' },
          { type: 'alert',  text: '[SCAN] 192.168.10.50  — Hikvision Camera  — admin/12345     — VERIFIED LOGIN' },
          { type: 'alert',  text: '[SCAN] 192.168.10.51  — Hikvision Camera  — admin/12345     — VERIFIED LOGIN' },
          { type: 'warn',   text: '[SCAN] 192.168.10.100 — Cisco Switch      — cisco/cisco     — VERIFIED LOGIN' },
          { type: 'alert',  text: '[SCAN] 192.168.10.200 — Synology NAS      — admin/(blank)   — VERIFIED LOGIN' },
          { type: 'output', text: '[SCAN] 192.168.10.201 — Synology NAS      — admin/custom    — LOGIN FAILED' },
          { type: 'output', text: '[INFO] Default credential lists are publicly available for all above vendors.' },
        ],
        question: 'Why are default credentials considered a critical vulnerability rather than a medium risk?',
        choices: [
          { text: 'Because default credentials are short and easy to brute-force.', correct: false },
          { text: 'Because they require zero effort to exploit — they are documented publicly and require no skill, making mass exploitation trivial.', correct: true },
          { text: 'Because routers and cameras are not protected by firewalls.', correct: false },
          { text: 'Because default passwords cannot be changed on some devices.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Default credentials are critical because exploitation requires literally zero skill — every attacker knows to try admin/admin, admin/password, admin/12345 first. They appear in every credential stuffing list and automated scanner. A single compromised camera or NAS can provide network persistence, lateral movement, or data exfiltration. The Mirai botnet (which caused massive internet outages in 2016) was built almost entirely from IoT devices with default credentials.',
          incorrect: 'Default credentials are critical because they require no effort — they are publicly documented for every vendor. Automated tools scan the internet for these in minutes. Mirai and similar botnets compromise millions of IoT devices using default credentials automatically. Any device with a default credential is effectively already owned.',
        },
        points: 15,
        objectives: ['Understand why default credentials are critical severity', 'Apply device hardening procedures', 'Recognize IoT security risks'],
        hint: 'What skill level does an attacker need to try "admin/admin"? Where can they find default credentials for every vendor?',
      },
    ],
  },
  {
    id: 'pw-07',
    category: 'passwords',
    title: 'Password Reset Process Security',
    desc: 'The help desk password reset procedure has a social engineering vulnerability.',
    tags: ['help-desk', 'identity-verification', 'reset'],
    steps: [
      {
        type: 'analysis',
        label: 'Current help desk procedure',
        stageContent: 'The IT help desk resets user passwords over the phone by verifying:<br><br>' +
          '1. The caller\'s full name<br>' +
          '2. Their department<br>' +
          '3. Their manager\'s name<br><br>' +
          'Once verified, they reset the password and read the temporary password to the caller.',
        question: 'What is the fundamental weakness in this verification procedure?',
        choices: [
          { text: 'Three verification factors are not enough — five should be required.', correct: false },
          { text: 'All three factors (name, department, manager) are obtainable from LinkedIn or a company directory in under 2 minutes.', correct: true },
          { text: 'Passwords should never be read aloud over the phone.', correct: false },
          { text: 'The procedure is fine — most callers are legitimate employees.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Name, department, and manager name are public information — visible on LinkedIn, company websites, email signatures, and org charts. An attacker who wants to take over a specific account simply researches these details first and calls the help desk. This is exactly how major incidents have occurred (e.g., the 2020 Twitter hack began with social engineering of a help desk agent). Verification must use information that is NOT publicly available.',
          incorrect: 'All three factors are public information available on LinkedIn. The number of factors is irrelevant if all of them can be researched by an attacker. Strong identity verification for password resets requires something that cannot be looked up: a pre-registered secondary phone number, a personal identification number (separate from the account password), or manager approval via a separate verified channel.',
        },
        points: 20,
        objectives: ['Identify weak identity verification factors', 'Apply the principle that verification must use non-public information', 'Know secure password reset practices'],
        hint: 'Could an attacker find all three of these data points for any employee at your company using only public sources in 2 minutes?',
      },
    ],
  },
  {
    id: 'pw-08',
    category: 'passwords',
    title: 'Passkeys — Passwordless Authentication',
    desc: 'Evaluate whether passkeys are a secure replacement for passwords.',
    tags: ['passkeys', 'FIDO2', 'WebAuthn', 'passwordless'],
    steps: [
      {
        type: 'analysis',
        label: 'Technology review: Passkeys',
        stageContent: 'Your organization is evaluating passkeys (FIDO2/WebAuthn) to replace passwords for employee logins. A passkey works as follows:<br><br>' +
          '• A public/private key pair is generated on the user\'s device<br>' +
          '• The <strong>public key</strong> is sent to and stored on the server<br>' +
          '• The <strong>private key</strong> never leaves the device<br>' +
          '• Login: the server sends a challenge; the device signs it with the private key; the server verifies with the public key<br>' +
          '• Device biometric (fingerprint/Face ID) protects the private key locally',
        question: 'Which of these attacks does passkey authentication make impossible?',
        choices: [
          { text: 'Phishing, credential stuffing, and password breach — because no reusable password is ever transmitted or stored on the server.', correct: true },
          { text: 'Device theft — because the attacker cannot access the device.', correct: false },
          { text: 'All authentication attacks, including session hijacking.', correct: false },
          { text: 'Brute force only — because the key is too long to guess.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Passkeys eliminate three major attack classes simultaneously: (1) Phishing — the authentication is cryptographically bound to the origin domain; a fake site cannot obtain a valid signature, (2) Credential stuffing — there is no password to stuff; server databases contain only public keys, which are useless to attackers, (3) Password breaches — nothing on the server can authenticate a user; even a full database dump gives the attacker nothing. Session hijacking remains possible (you can still steal a post-auth token), but the initial authentication attack surface is massively reduced.',
          incorrect: 'Passkeys eliminate phishing (domain-bound), credential stuffing (no password to reuse), and password database breaches (server only stores public keys). Device theft is partially mitigated by biometrics but not eliminated. Session hijacking after authentication is still possible. Passkeys are not a silver bullet but they eliminate the most common authentication attack vectors.',
        },
        points: 20,
        objectives: ['Understand passkey cryptographic architecture', 'Know which attack classes passkeys eliminate', 'Identify remaining attack surfaces'],
        hint: 'What does the server store? What does the attacker get if they breach the server\'s credential database?',
      },
    ],
  },
];

// ---- SOCIAL ENGINEERING SCENARIOS -------------------------------------------
const SOCIAL_SCENARIOS = [
  {
    id: 'se-01',
    category: 'social',
    title: 'The Urgent IT Phone Call',
    desc: 'An unexpected caller claims to be from IT support.',
    tags: ['vishing', 'pretexting', 'phone'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: You receive this phone call',
        stageContent: `<em>"Hi, this is Mike from the IT help desk. We're seeing some unusual activity from your workstation and I need to get remote access to clean it up before it causes damage to the whole network. I'm under a tight deadline here — if we don't fix this in the next 10 minutes it could take down the whole floor. Can you install this remote access tool? I'll send the link to your personal email..."</em>`,
        question: 'How do you respond?',
        choices: [
          { text: 'Install the tool quickly — network outages affect everyone.', correct: false },
          { text: 'Ask for their employee ID, hang up, then call the official IT help desk number to verify.', correct: true },
          { text: 'Ask them to prove they work in IT by describing your computer.', correct: false },
          { text: 'Tell them you\'re too busy and hang up.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This is a vishing (voice phishing) attack using pretexting + urgency + authority. The correct response is to politely terminate the call and independently verify by calling IT\'s official number. Sending a link to "personal email" (bypassing corporate mail filters) is a major red flag. Attackers can easily describe your computer after researching you on LinkedIn.',
          incorrect: 'This is vishing — phone-based social engineering. Red flags: unsolicited call, extreme urgency, sending link to personal email (bypasses mail filters), request for remote access. The attacker can research you beforehand to appear credible. Never install software from an unsolicited caller. Always hang up and call IT on their official number.',
        },
        points: 20,
        objectives: ['Identify vishing tactics', 'Recognize urgency/authority manipulation', 'Know proper verification procedure'],
        hint: 'What can an attacker research about you before making this call? How would you independently verify the caller\'s identity?',
      },
      {
        type: 'analysis',
        label: 'Tailgating scenario',
        stageContent: 'You\'re badging into a secure area. A person in a company polo shirt carrying a large box approaches behind you and says, "Hey, could you hold that? My hands are full and I forgot my badge today. I\'m new in the hardware team."',
        question: 'What is the appropriate response?',
        choices: [
          { text: 'Hold the door — they\'re clearly an employee and it would be rude not to help.', correct: false },
          { text: 'Politely decline and direct them to reception to get a visitor badge or temporary access.', correct: true },
          { text: 'Let them in but escort them yourself to make sure.', correct: false },
          { text: 'Ask them to prove they work there by naming their manager.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This is tailgating (piggybacking) — a physical social engineering attack. The polo shirt, box, and "new employee" story are props to create sympathy and reduce suspicion. The correct response is to politely but firmly direct them to reception. Never feel rude about enforcing physical security — attackers rely on social discomfort.',
          incorrect: 'This is tailgating — physical social engineering. Attackers use props (boxes, uniforms, "forgot my badge") to bypass physical security by exploiting politeness. The safe response is to direct them to reception. Escorting is still unauthorized access. Even if they can name a manager, that information is often public. Always follow the physical access policy.',
        },
        points: 20,
        hint: 'What information could someone research in advance to appear like a legitimate employee?',
      },
    ],
  },
  {
    id: 'se-02',
    category: 'social',
    title: 'The Fake IT Contractor',
    desc: 'A visitor claims to be a vendor technician performing scheduled maintenance.',
    tags: ['impersonation', 'physical-security', 'pretexting'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: Visitor arrives at the front desk',
        stageContent: 'A person arrives wearing a polo shirt with a networking company logo and carrying a tool bag. They say: <em>"Hi, I\'m here from NetSolutions for the quarterly switch maintenance. The work order was submitted last week — I just need access to the server room for about an hour."</em><br><br>No maintenance appointment appears in the visitor management system.',
        question: 'What is the correct response from the front desk?',
        choices: [
          { text: 'Let them in — the polo shirt and tool bag confirm they are a real technician.', correct: false },
          { text: 'Ask them to wait, then call NetSolutions using a number from the company\'s own vendor records to verify the appointment.', correct: true },
          { text: 'Ask them to show their ID, then escort them to the server room.', correct: false },
          { text: 'Check their ID and have them sign the visitor log, then allow access.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Uniforms, logos, and tool bags are easy to fake. The absence of a matching work order is a serious red flag. The correct response is to independently verify by calling the vendor using a phone number from your own records — not a number the visitor provides. A real scheduled maintenance visit will have a work order, a named contact, and the ability to be confirmed by the vendor directly.',
          incorrect: 'Uniforms and tools can be purchased online for $50. An ID can be faked. The critical control is verification: check your vendor management system for the work order, and call the vendor using YOUR contact records. Never use a phone number the visitor gives you — that\'s the attacker\'s accomplice. No work order in the system = do not grant access until verified.',
        },
        points: 20,
        objectives: ['Understand that props/uniforms don\'t verify identity', 'Know independent verification procedures', 'Recognize pretexting in physical scenarios'],
        hint: 'What two things are missing that would make this visit legitimate? And where should you get the vendor\'s contact information?',
      },
      {
        type: 'analysis',
        label: 'Work order verification',
        stageContent: 'You call your internal facilities manager, who says they did schedule maintenance last week but cannot remember the specific day. The visitor is growing impatient and says: <em>"Look, I have three more sites to visit today — can we please just get this done? My manager can call you back to confirm."</em>',
        question: 'The visitor offers to have their manager call back to confirm. Is this sufficient to allow access?',
        choices: [
          { text: 'Yes — if their manager calls and confirms, that\'s adequate verification.', correct: false },
          { text: 'Yes — combined with the facilities manager\'s partial confirmation, this is enough.', correct: false },
          { text: 'No — you cannot verify the callback is actually from the vendor. Continue verifying through your own contact channels.', correct: true },
          { text: 'Yes — impatience suggests they are legitimate, attackers would be calmer.', correct: false },
        ],
        feedback: {
          correct: 'Correct. A callback from "their manager" cannot be verified — the caller could be an accomplice. Social engineers often use impatience and time pressure specifically to make you skip verification steps. You must verify through your own trusted contact list: call NetSolutions on their official number, confirm a named technician with a specific work order. If the facilities manager\'s partial memory is all you have, the appointment needs to be confirmed before access is granted.',
          incorrect: 'A callback from the visitor\'s manager cannot be verified — it\'s likely an accomplice. Social engineers deliberately create time pressure ("I have three more sites") to make you short-circuit verification. Real technicians from legitimate vendors expect verification delays and have proper work orders. Continue verifying through your own vendor contact records.',
        },
        points: 15,
        hint: 'If the visitor\'s "manager" calls back, how do you know it\'s actually the vendor\'s manager and not an accomplice?',
      },
    ],
  },
  {
    id: 'se-03',
    category: 'social',
    title: 'USB Baiting Attack',
    desc: 'An employee finds a branded USB drive in the parking lot.',
    tags: ['baiting', 'USB', 'physical'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: Before the morning meeting',
        stageContent: 'An employee finds a USB drive in the company parking lot. It has a label printed on it: <strong>"Q1 2026 Salary Review — Confidential"</strong>. The employee brings it inside and is about to plug it into their work laptop to find out who it belongs to so they can return it.',
        question: 'What should the employee do?',
        choices: [
          { text: 'Plug it in on a personal laptop instead of the work laptop to be safe.', correct: false },
          { text: 'Hand the USB to the IT/security team without plugging it in anywhere.', correct: true },
          { text: 'Plug it in but only view the files — don\'t run or open any programs.', correct: false },
          { text: 'Format the drive and use it — it was abandoned anyway.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This is a classic USB baiting attack. The enticing label ("Salary Review") is deliberately chosen to override caution with curiosity. Modern USB attacks can execute automatically on plug-in via HID (Human Interface Device) spoofing — the drive emulates a keyboard and types commands before any files are visible. Plugging it into a personal laptop still compromises that device and potentially the corporate network it connects to. The only safe action is to not plug it in and hand it to security.',
          incorrect: 'Plugging in a found USB is always dangerous regardless of device. USB HID attacks execute the moment you plug in — no file opening required. The drive emulates a keyboard and runs commands automatically. Personal laptops often connect to corporate Wi-Fi or VPNs, extending the attack surface. "Just viewing files" is not possible before HID attacks fire. The correct action: do not plug it in, hand it to the security team.',
        },
        points: 20,
        objectives: ['Understand USB HID/BadUSB attack mechanics', 'Know that curiosity-bait labels are intentional', 'Apply correct response to found devices'],
        hint: 'What can a USB drive do the moment it is plugged in, before you even see any files?',
      },
      {
        type: 'analysis',
        label: 'Why baiting works',
        stageContent: 'Studies (including a famous Carnegie Mellon experiment) found that people plug in found USB drives at very high rates. A label like "Salary Review" or "Confidential" significantly increases plug-in rates.',
        question: 'What psychological principle makes USB baiting so effective?',
        choices: [
          { text: 'Authority bias — the label implies it came from management.', correct: false },
          { text: 'Reciprocity — the finder feels obligated to help return the drive.', correct: false },
          { text: 'Curiosity and helpfulness — the label triggers both a desire to know the contents and a desire to return it to its owner.', correct: true },
          { text: 'Social proof — seeing others use USB drives makes it seem safe.', correct: false },
        ],
        feedback: {
          correct: 'Correct. USB baiting exploits two instincts simultaneously: curiosity (what\'s on "Q1 Salary Review"?) and helpfulness (I should return this to its owner). The label is engineered to activate both. Security awareness training must specifically address this scenario because even security-conscious employees have been caught by it. Organizations should have a clear policy: any found media goes to IT security, never gets plugged in.',
          incorrect: 'Baiting works through curiosity (what\'s on this?) and helpfulness (I should return it). The specific label content is chosen to maximize both impulses — "Salary Review" triggers curiosity about compensation while also suggesting a document that should be returned. Awareness training must specifically name this scenario; generic "don\'t click links" training does not address physical media.',
        },
        points: 15,
        hint: 'Think about the two separate motivations the label "Q1 2026 Salary Review — Confidential" creates in the person who finds it.',
      },
    ],
  },
  {
    id: 'se-04',
    category: 'social',
    title: 'LinkedIn Job Offer Targeting',
    desc: 'A recruiter message leads to a fake job portal harvesting credentials.',
    tags: ['LinkedIn', 'spear-phishing', 'credential-harvest'],
    steps: [
      {
        type: 'analysis',
        label: 'LinkedIn message received',
        stageContent: '<em>"Hi [Your Name], I came across your profile and I\'m impressed with your background in cloud infrastructure. We have a Senior DevOps role paying $180K — well above market. It\'s a perfect match for your skills at [Your Company]. Could you take 5 minutes to review the role requirements and apply? Just use your work email to log in so we can verify your profile."</em><br><br>The link goes to: <code>careers-talent-hub.net/apply</code>',
        question: 'What specific detail in this message is the strongest red flag?',
        choices: [
          { text: 'The salary is higher than market rate — legitimate jobs don\'t pay that well.', correct: false },
          { text: 'The request to log in with your work email credentials on an external third-party site.', correct: true },
          { text: 'Legitimate recruiters always use InMail, not messages.', correct: false },
          { text: 'The domain "careers-talent-hub.net" doesn\'t end in .com.', correct: false },
        ],
        feedback: {
          correct: 'Correct. No legitimate job application portal requires your current employer\'s email credentials. This request is designed to harvest your corporate username and password. Attackers use LinkedIn because: (1) your profile reveals your exact employer, role, and tech stack — enabling hyper-personalized messages, (2) the professional context lowers suspicion, (3) career ambition is a reliable emotional trigger. High salary figures are bait to create motivation to proceed despite doubts.',
          incorrect: 'The critical red flag is the login requirement using work credentials on an external site. Legitimate job applications use the applicant\'s personal email or LinkedIn profile — never corporate credentials. The salary and domain are distractors. The goal is credential theft.',
        },
        points: 20,
        objectives: ['Recognize credential harvesting in professional social engineering', 'Understand why LinkedIn is a high-value attack vector', 'Identify emotional triggers used in job offer scams'],
        hint: 'Why would a job application need your current employer\'s login credentials? What could they do with those?',
      },
    ],
  },
  {
    id: 'se-05',
    category: 'social',
    title: 'Shoulder Surfing',
    desc: 'Sensitive information is observed by a nearby stranger in a public space.',
    tags: ['shoulder-surfing', 'physical-security', 'awareness'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: Working at an airport',
        stageContent: 'A developer is working at an airport lounge before a flight. They are:<br><br>' +
          '• Logged into the corporate VPN<br>' +
          '• Reviewing production database credentials in a password manager<br>' +
          '• Writing code containing an API key in plaintext<br>' +
          '• On a video call discussing an unreleased product<br><br>' +
          'The adjacent seats are occupied by strangers. No privacy screen is installed.',
        question: 'Which of these activities carries the HIGHEST risk in this environment?',
        choices: [
          { text: 'Being connected to the VPN on public Wi-Fi.', correct: false },
          { text: 'Discussing the unreleased product on a video call in an audible public space.', correct: true },
          { text: 'Reviewing credentials in a password manager — they\'re encrypted anyway.', correct: false },
          { text: 'Writing code with a plaintext API key visible on screen.', correct: false },
        ],
        feedback: {
          correct: 'Correct. An audible video call in a public space exposes information to everyone within earshot — this is not limited by sight lines or screen orientation. Competitors, journalists, or attackers can overhear unreleased product details, customer names, strategic plans, or internal system architecture. VPN encryption protects the data in transit. The API key is a screen-visible risk but limited to nearby observers. The video call broadcasts to the entire room.',
          incorrect: 'The video call is the highest risk because it exposes information acoustically to everyone within earshot, not just people who can see your screen. Audio exposure in public spaces is harder to control than visual exposure. Use headphones and be aware of what you say aloud. A privacy screen addresses screen-viewing but not audio.',
        },
        points: 15,
        objectives: ['Identify audio as an overlooked information leakage vector', 'Assess public workspace security risks', 'Apply privacy controls appropriate to environment'],
        hint: 'Which of these can be seen only by someone nearby vs. which can be heard by everyone in a large room?',
      },
    ],
  },
  {
    id: 'se-06',
    category: 'social',
    title: 'Dumpster Diving & Information Disclosure',
    desc: 'Discarded documents enable a targeted attack on the organization.',
    tags: ['dumpster-diving', 'physical-security', 'OSINT'],
    steps: [
      {
        type: 'analysis',
        label: 'Security assessment finding',
        stageContent: 'A red team conducting a physical security assessment retrieves the following from unsecured recycling bins outside the office:<br><br>' +
          '• Printed org chart showing names, titles, and reporting lines<br>' +
          '• 3 printed emails discussing a pending merger (marked CONFIDENTIAL)<br>' +
          '• An old employee ID badge (deactivated employee)<br>' +
          '• A printed IT asset list with server names and IP ranges<br>' +
          '• A sticky note with "VPN: CompanyVPN2024" written on it',
        question: 'Which recovered item poses the MOST immediate technical threat?',
        choices: [
          { text: 'The org chart — enables targeted phishing.', correct: false },
          { text: 'The sticky note with the VPN password — may provide direct network access.', correct: true },
          { text: 'The merger documents — sensitive business intelligence.', correct: false },
          { text: 'The IT asset list — reveals network topology.', correct: false },
        ],
        feedback: {
          correct: 'Correct. A VPN password provides potential direct network access — the attacker may be able to connect to the corporate network as a legitimate user. The other items enable social engineering, OSINT, and planning, but none provide immediate technical entry. If the VPN password is current and not user-specific, the attacker has network access requiring no further steps. This finding should trigger immediate VPN credential rotation.',
          incorrect: 'The VPN password on the sticky note is the most immediately actionable — it may provide direct network access right now. All other items require further steps (phishing setup, network reconnaissance). Immediate action: rotate VPN credentials. Long-term: shred all documents, enforce clean desk policy, implement secure disposal for all physical media.',
        },
        points: 20,
        objectives: ['Understand physical information security risks', 'Identify which discarded items carry highest technical risk', 'Know secure disposal requirements'],
        hint: 'Which item requires no additional steps to use — just try it directly against a company system right now?',
      },
    ],
  },
  {
    id: 'se-07',
    category: 'social',
    title: 'Watering Hole Attack',
    desc: 'Multiple workstations connect to a suspicious domain after visiting an industry website.',
    tags: ['watering-hole', 'drive-by', 'browser-exploit'],
    steps: [
      {
        type: 'terminal',
        label: 'SIEM correlation alert — Tuesday 10:15 AM',
        terminal: [
          { type: 'output', text: '[10:15:02] CORRELATION: 7 workstations → same unknown domain in 30 min window' },
          { type: 'output', text: '[10:15:02] Domain: analytics-cdn-update.com (registered 3 days ago)' },
          { type: 'output', text: '[10:15:03] All 7 users browsed: securityweek.com between 09:40–10:10' },
          { type: 'warn',   text: '[10:15:03] Beacon pattern: all 7 hosts called analytics-cdn-update.com within 10 sec of visiting securityweek.com' },
          { type: 'alert',  text: '[10:15:04] Threat intel: analytics-cdn-update.com flagged as malware distribution — 2 hours ago' },
          { type: 'output', text: '[10:15:05] Browser versions on affected hosts: Chrome 119, Firefox 118 (both outdated)' },
        ],
        question: 'What is a watering hole attack and why is it harder to defend against than phishing?',
        choices: [
          { text: 'Attackers compromise a website their targets regularly visit and inject malicious code — victims are infected just by browsing a site they trust.', correct: true },
          { text: 'Attackers flood email inboxes with links to the same malicious site.', correct: false },
          { text: 'Attackers intercept DNS queries and redirect users to a malicious clone.', correct: false },
          { text: 'Attackers compromise the user\'s router to redirect all traffic.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Watering hole attacks compromise a website that the target group regularly visits (in this case, a security news site ironically). When victims visit the legitimate-but-compromised site, malicious scripts execute silently via browser vulnerabilities — no clicking required, no suspicious email. This bypasses phishing training entirely because the user did nothing wrong. Defense relies on browser/OS patching, browser exploit mitigation, and behavioral detection (like this SIEM correlation).',
          incorrect: 'A watering hole attack compromises a site the targets trust and visit regularly. Victims are infected just by browsing — no phishing email, no suspicious link to identify. The user did everything right. Defense: keep browsers updated (the outdated versions here are the exploit vector), use browser exploit mitigations (sandboxing), and monitor for anomalous outbound connections from browsing sessions.',
        },
        points: 25,
        objectives: ['Understand watering hole attack mechanics', 'Know why it bypasses user training', 'Identify browser patching as primary defense'],
        hint: 'The user visited a website they visit every day and did nothing suspicious. How did they still get infected?',
      },
    ],
  },
  {
    id: 'se-08',
    category: 'social',
    title: 'Quid Pro Quo Attack',
    desc: 'A caller offers free "IT services" in exchange for account credentials.',
    tags: ['quid-pro-quo', 'tech-support-scam', 'phone'],
    steps: [
      {
        type: 'analysis',
        label: 'Scenario: An employee receives a call',
        stageContent: '<em>"Hi there, this is Mike from the IT department. We\'re running a free security upgrade today for employees in your building — takes about 10 minutes. I can clean up your machine remotely, improve your startup time, and run a virus scan at no charge. To get started, I just need your Windows username and password so I can log in remotely. Sound good?"</em>',
        question: 'This is a quid pro quo attack. What distinguishes it from other social engineering types?',
        choices: [
          { text: 'It uses phone calls, which are harder to trace than emails.', correct: false },
          { text: 'It offers a benefit or service in exchange for information — exploiting the reciprocity principle.', correct: true },
          { text: 'It impersonates IT, which makes it more convincing than other impersonations.', correct: false },
          { text: 'It requires the victim to take action (installing software) rather than just providing information.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Quid pro quo ("something for something") attacks work by offering a perceived benefit — free upgrade, faster computer, virus removal — in exchange for access or credentials. This exploits the reciprocity principle: people feel obligated to cooperate when offered help. The "free IT service" framing also reduces suspicion because the offer seems to benefit the victim. Key rule: IT will NEVER ask for your password under any circumstances. If they need remote access, they use tools that don\'t require your credentials.',
          incorrect: 'Quid pro quo is defined by the exchange: "I\'ll do something beneficial for you in exchange for your credentials/access." It exploits reciprocity. The distinction from vishing: vishing creates urgency/fear, quid pro quo creates willingness through an offer. The defense is the same: hang up, call IT on the official number.',
        },
        points: 20,
        objectives: ['Define quid pro quo social engineering', 'Understand the reciprocity psychological principle', 'Know that IT never asks for passwords'],
        hint: 'What is the attacker offering, and what do they want in return? Which psychological principle does a free offer activate?',
      },
    ],
  },
];

// ---- NETWORK ANALYSIS SCENARIOS ----------------------------------------------
const NETWORK_SCENARIOS = [
  {
    id: 'net-01',
    category: 'network',
    title: 'Suspicious Traffic Analysis',
    desc: 'Review network logs and identify indicators of compromise.',
    tags: ['network', 'log-analysis', 'IOC'],
    steps: [
      {
        type: 'network',
        label: 'Review these firewall logs from the past hour',
        networkRows: [
          { class: 'row-ok',         src: '10.0.1.45',   dst: '8.8.8.8',           proto: 'DNS',   port: '53',   bytes: '312',    note: 'DNS query' },
          { class: 'row-ok',         src: '10.0.1.45',   dst: '172.16.10.2',       proto: 'HTTP',  port: '80',   bytes: '4,120',  note: 'Internal web' },
          { class: 'row-warn',       src: '10.0.1.88',   dst: '185.220.101.47',    proto: 'HTTPS', port: '443',  bytes: '1.2 MB', note: 'TOR exit node' },
          { class: 'row-ok',         src: '10.0.2.12',   dst: '192.168.1.1',       proto: 'TCP',   port: '22',   bytes: '890',    note: 'SSH internal' },
          { class: 'row-suspicious', src: '10.0.1.88',   dst: '45.33.32.156',      proto: 'TCP',   port: '4444', bytes: '8.7 MB', note: 'Non-std port, high vol' },
          { class: 'row-suspicious', src: '10.0.1.88',   dst: '23.21.47.135',      proto: 'TCP',   port: '4444', bytes: '6.1 MB', note: 'Non-std port, high vol' },
          { class: 'row-ok',         src: '10.0.3.5',    dst: '104.21.234.67',     proto: 'HTTPS', port: '443',  bytes: '22,450', note: 'Normal web traffic' },
          { class: 'row-warn',       src: '10.0.1.88',   dst: '185.220.101.47',    proto: 'HTTPS', port: '443',  bytes: '982 KB', note: 'TOR exit node (repeat)' },
        ],
        question: 'Which internal host shows the strongest indicators of compromise?',
        choices: [
          { text: '10.0.1.45 — making external DNS queries', correct: false },
          { text: '10.0.2.12 — using SSH on the internal network', correct: false },
          { text: '10.0.1.88 — communicating with TOR exit nodes and sending large volumes of data to non-standard ports', correct: true },
          { text: '10.0.3.5 — making HTTPS requests to an external IP', correct: false },
        ],
        feedback: {
          correct: 'Correct. Host 10.0.1.88 has multiple serious IOCs: (1) repeated connections to a known TOR exit node (185.220.101.47), (2) large data transfers (8.7 MB, 6.1 MB) over non-standard port 4444 — a common C2 and Metasploit port, (3) multiple external C2 destinations. This pattern strongly suggests an active command-and-control channel with data exfiltration.',
          incorrect: 'Host 10.0.1.88 is the compromised machine. Indicators: TOR exit node communications (common for C2 to evade detection), large data volumes over port 4444 (classic Metasploit/C2 port), multiple C2 destinations. DNS queries to 8.8.8.8 are normal, internal SSH is normal, and HTTPS to CDN IPs is normal web browsing.',
        },
        points: 25,
        objectives: ['Identify C2 communication patterns', 'Recognize TOR traffic indicators', 'Spot non-standard port usage'],
        hint: 'Look for unusual ports, known malicious IP types, and unexpected data volumes. Focus on what is abnormal for business traffic.',
      },
      {
        type: 'analysis',
        label: 'DNS Exfiltration',
        stageContent: 'You see this pattern in DNS logs from host 10.0.1.88:<br><br>' +
          '<code>a3f2b1c4d5e6.exfil.attacker.com</code><br>' +
          '<code>f7g8h9i0j1k2.exfil.attacker.com</code><br>' +
          '<code>l3m4n5o6p7q8.exfil.attacker.com</code><br><br>' +
          'Each query is made 2 seconds apart. The subdomains change each time.',
        question: 'What technique does this DNS pattern indicate?',
        choices: [
          { text: 'Normal CDN traffic — many services use subdomains for routing.', correct: false },
          { text: 'DNS tunneling — data is being encoded and exfiltrated via DNS queries.', correct: true },
          { text: 'A DDoS attack using DNS amplification.', correct: false },
          { text: 'Fast-flux DNS used by a botnet.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This is DNS tunneling / DNS exfiltration. The encoded subdomains (hex/base64 strings) contain actual data being smuggled out — since DNS is often not inspected by firewalls, it\'s a popular covert channel. The regular 2-second interval suggests automated exfiltration. Defenders can detect this with DNS query length analysis (>50 char subdomains), query frequency analysis, and threat intel feeds for known exfil domains.',
          incorrect: 'This is DNS tunneling — a data exfiltration technique. The long, seemingly random subdomains encode actual data. Because DNS port 53 is usually allowed through firewalls and often not inspected, attackers tunnel data inside DNS queries. The regular timing confirms automation. Detection: monitor for unusually long subdomain labels, high query frequency to a single parent domain, or non-existent domain queries.',
        },
        points: 20,
        hint: 'What is unusual about the subdomain portion of these DNS queries? Why would an attacker use DNS specifically?',
      },
    ],
  },
  {
    id: 'net-02',
    category: 'network',
    title: 'Password Spray & Brute Force',
    desc: 'Authentication logs reveal a systematic account attack in progress.',
    tags: ['brute-force', 'password-spray', 'auth-logs'],
    steps: [
      {
        type: 'terminal',
        label: 'Azure AD authentication logs — 09:00–09:05',
        terminal: [
          { type: 'output', text: '[09:00:01] FAIL: admin@company.com — "Spring2026" — IP: 203.0.113.42' },
          { type: 'output', text: '[09:00:02] FAIL: ceo@company.com — "Spring2026" — IP: 203.0.113.42' },
          { type: 'output', text: '[09:00:03] FAIL: finance@company.com — "Spring2026" — IP: 203.0.113.42' },
          { type: 'output', text: '[09:00:04] FAIL: hr@company.com — "Spring2026" — IP: 203.0.113.42' },
          { type: 'output', text: '[09:00:05] FAIL: it@company.com — "Spring2026" — IP: 203.0.113.42' },
          { type: 'warn',   text: '[09:02:00] FAIL: admin@company.com — "Welcome1!" — IP: 203.0.113.42' },
          { type: 'warn',   text: '[09:02:01] FAIL: ceo@company.com — "Welcome1!" — IP: 203.0.113.42' },
          { type: 'warn',   text: '[09:02:02] FAIL: finance@company.com — "Welcome1!" — IP: 203.0.113.42' },
          { type: 'alert',  text: '[09:04:00] FAIL: admin@company.com — "Company123!" — IP: 203.0.113.42' },
          { type: 'alert',  text: '[09:04:01] SUCCESS: it@company.com — "Company123!" — IP: 203.0.113.42' },
        ],
        question: 'Why does a password spray attack evade account lockout policies?',
        choices: [
          { text: 'Because it uses proxies to change the source IP between attempts.', correct: false },
          { text: 'Because it tries only one or two passwords per account before moving to the next, staying below lockout thresholds.', correct: true },
          { text: 'Because it targets accounts that don\'t have lockout policies enabled.', correct: false },
          { text: 'Because it uses valid session tokens instead of passwords.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Password spray deliberately uses few attempts per account — typically 1–3 passwords across many accounts — to stay below the lockout threshold (commonly 5–10 failed attempts). It\'s the mirror image of brute force: instead of many passwords on one account, it\'s one common password on many accounts. Standard lockout policies are blind to this. Detection requires cross-account analysis — looking for one IP trying many different accounts.',
          incorrect: 'Password spray evades lockout by using only 1–3 password attempts per account, staying under the lockout threshold, then moving to the next account. Lockout policies protect individual accounts, not the pattern across all accounts. Detection requires behavioral analytics that spot one source trying many accounts with the same password — something simple failed-attempt counters don\'t catch.',
        },
        points: 25,
        objectives: ['Distinguish password spray from brute force', 'Understand why lockout policies don\'t stop spray', 'Identify spray patterns in auth logs'],
        hint: 'Account lockout triggers after X failed attempts on ONE account. How many attempts per account does this attack use?',
      },
      {
        type: 'analysis',
        label: 'Defensive controls',
        stageContent: 'The attacker successfully logged into it@company.com using "Company123!". You need to recommend controls to prevent this class of attack.',
        question: 'Which combination of controls BEST prevents password spray success?',
        choices: [
          { text: 'Increasing the account lockout threshold to 20 failed attempts.', correct: false },
          { text: 'MFA on all accounts + blocking authentication from unusual geolocations + phishing-resistant passwords.', correct: true },
          { text: 'Daily password resets required for all users.', correct: false },
          { text: 'Only allow logins during business hours.', correct: false },
        ],
        feedback: {
          correct: 'Correct. MFA is the most effective control — even if the password is guessed, the attacker cannot complete authentication without the second factor. Geo-blocking or impossible travel detection adds another layer. Strong unique passwords (or passphrases screened against breach lists) eliminate guessable passwords that spray relies on. Increasing lockout thresholds makes spray easier. Daily resets cause password fatigue and users choose worse passwords.',
          incorrect: 'MFA is the most impactful control against password spray — a guessed password alone is insufficient to authenticate. Geo/impossible-travel detection flags logins from unusual locations. Breach-database-screened password policies remove common passwords from circulation. Raising lockout thresholds helps attackers by allowing more attempts. Daily resets backfire by causing weaker password choices.',
        },
        points: 20,
        hint: 'Even if the attacker guesses the right password, what would stop them from successfully logging in?',
      },
    ],
  },
  {
    id: 'net-03',
    category: 'network',
    title: 'Lateral Movement Detection',
    desc: 'Internal traffic patterns suggest a compromised host is exploring the network.',
    tags: ['lateral-movement', 'east-west', 'segmentation'],
    steps: [
      {
        type: 'network',
        label: 'Internal network traffic — east-west (host to host) last 20 minutes',
        networkRows: [
          { class: 'row-ok',         src: '10.0.1.22',  dst: '10.0.1.1',   proto: 'TCP', port: '80',   bytes: '1,200',  note: 'Normal gateway traffic' },
          { class: 'row-ok',         src: '10.0.2.5',   dst: '10.0.2.10',  proto: 'SMB', port: '445',  bytes: '8,400',  note: 'File share access' },
          { class: 'row-suspicious', src: '10.0.3.88',  dst: '10.0.1.1',   proto: 'TCP', port: '445',  bytes: '312',    note: 'SMB probe' },
          { class: 'row-suspicious', src: '10.0.3.88',  dst: '10.0.1.2',   proto: 'TCP', port: '445',  bytes: '312',    note: 'SMB probe' },
          { class: 'row-suspicious', src: '10.0.3.88',  dst: '10.0.1.3',   proto: 'TCP', port: '445',  bytes: '312',    note: 'SMB probe' },
          { class: 'row-suspicious', src: '10.0.3.88',  dst: '10.0.1.4',   proto: 'TCP', port: '445',  bytes: '312',    note: 'SMB probe (sequential)' },
          { class: 'row-alert',      src: '10.0.3.88',  dst: '10.0.2.50',  proto: 'SMB', port: '445',  bytes: '42 MB',  note: 'Large SMB transfer' },
          { class: 'row-suspicious', src: '10.0.3.88',  dst: '10.0.4.10',  proto: 'TCP', port: '3389', bytes: '890',    note: 'RDP connection attempt' },
        ],
        question: 'What activity does host 10.0.3.88 appear to be performing?',
        choices: [
          { text: 'Normal file backup — large internal transfers are expected.', correct: false },
          { text: 'Network reconnaissance followed by data collection and attempted RDP lateral movement.', correct: true },
          { text: 'A network administrator running a scheduled vulnerability scan.', correct: false },
          { text: 'A misconfigured application making repeated retry connections.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The pattern shows classic lateral movement: (1) sequential SMB probes across 10.0.1.x range — network reconnaissance scanning for open shares, (2) a large 42 MB SMB transfer from 10.0.2.50 — data collection from a file share, (3) RDP connection attempt to 10.0.4.10 — attempting to move to another host. This is a compromised host (10.0.3.88) performing automated post-exploitation enumeration, consistent with malware like Emotet, Qakbot, or a hands-on-keyboard attacker.',
          incorrect: 'Host 10.0.3.88 is performing lateral movement: sequential SMB probes (port 445) across a subnet = network scanning for accessible file shares. A large transfer from one target = data staging/collection. Then an RDP attempt to a new host = trying to pivot to more systems. This is post-compromise behavior — the host is already under attacker control.',
        },
        points: 25,
        objectives: ['Identify sequential port scanning patterns', 'Recognize SMB-based lateral movement', 'Understand east-west traffic monitoring importance'],
        hint: 'The connections to 10.0.1.1, .1.2, .1.3, .1.4 are all on port 445. What does sequential probing of sequential IPs on one port indicate?',
      },
      {
        type: 'analysis',
        label: 'Network segmentation as a control',
        stageContent: 'The CISO asks why the compromised host in the dev subnet (10.0.3.x) was able to reach file servers in the production subnet (10.0.2.x) and attempt RDP to the finance subnet (10.0.4.x).',
        question: 'Which network design principle would have limited the blast radius of this compromise?',
        choices: [
          { text: 'Network segmentation with strict ACLs — dev, prod, and finance subnets should not have unrestricted access to each other.', correct: true },
          { text: 'Stronger passwords on all file shares.', correct: false },
          { text: 'Deploying an IDS on the internet perimeter.', correct: false },
          { text: 'Requiring VPN for all internal access.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Network segmentation (microsegmentation, VLANs with ACLs, or zero-trust architecture) would have prevented a dev machine from reaching prod file servers or finance systems. The principle of least privilege applied to network traffic: each segment should only communicate with what it explicitly needs. An IDS on the perimeter would not see internal east-west traffic. Stronger passwords don\'t stop a compromised account. Segmentation is the key architectural control for limiting lateral movement.',
          incorrect: 'Network segmentation is the architectural control that limits lateral movement. A dev host should not be able to reach production file servers or finance systems. VLANs with strict ACLs, or zero-trust network access, enforce that communication only happens on explicitly permitted paths. An internet-facing IDS sees north-south traffic but misses internal east-west movement entirely.',
        },
        points: 20,
        hint: 'Why can a host in "dev" talk to "prod" and "finance"? What network design decision allowed those paths to exist?',
      },
    ],
  },
  {
    id: 'net-04',
    category: 'network',
    title: 'Port Scan Detection',
    desc: 'An IDS alerts on systematic port reconnaissance against DMZ hosts.',
    tags: ['reconnaissance', 'port-scanning', 'IDS'],
    steps: [
      {
        type: 'terminal',
        label: 'IDS alerts — 02:17 AM',
        terminal: [
          { type: 'warn',   text: '[02:17:01] IDS: Port scan detected — source: 203.0.113.55' },
          { type: 'output', text: '[02:17:01] Target: 198.51.100.10 (DMZ web server)' },
          { type: 'output', text: '[02:17:01] Ports probed: 1–65535 (full TCP SYN scan)' },
          { type: 'output', text: '[02:17:02] Scan rate: ~1,000 ports/second — completed in ~65 seconds' },
          { type: 'output', text: '[02:17:02] Open ports found by scanner: 22, 80, 443, 3306, 8080, 8443' },
          { type: 'warn',   text: '[02:17:03] Note: Port 3306 (MySQL) and 8080 (dev server) open to internet' },
          { type: 'output', text: '[02:17:03] No exploitation attempts detected yet.' },
        ],
        question: 'The scan found open ports 3306 and 8080 on an internet-facing server. Why is this a critical finding independent of the scan itself?',
        choices: [
          { text: 'Because port scanning is illegal and the attacker can now be prosecuted.', correct: false },
          { text: 'Port 3306 (MySQL) and 8080 (dev) should never be exposed to the internet — they expose database access and a development server to direct attack.', correct: true },
          { text: 'The high scan speed indicates an advanced persistent threat actor.', correct: false },
          { text: 'The scan will have caused performance degradation on the web server.', correct: false },
        ],
        feedback: {
          correct: 'Correct. The scan itself is reconnaissance — a precursor to attack. But the real finding is the exposure: MySQL on port 3306 exposed to the internet means anyone can attempt to authenticate to the database directly (brute force, exploit known vulnerabilities). Port 8080 suggests a development server is internet-accessible, which often lacks production hardening. These should be blocked at the perimeter firewall immediately — databases should only accept connections from application servers on the internal network.',
          incorrect: 'The scan reveals a configuration problem: MySQL and a dev server are directly exposed to the internet. A scan is just reconnaissance — the actual risk is the exposed attack surface. Any attacker can now directly target the MySQL port with brute force or known exploits. Immediate fix: firewall rules to block 3306 and 8080 from all external sources.',
        },
        points: 20,
        objectives: ['Understand port scanning as reconnaissance', 'Identify which ports should never be internet-facing', 'Apply firewall egress/ingress principles'],
        hint: 'What can an attacker do directly with an internet-accessible MySQL port? Should a database ever be reachable from the public internet?',
      },
    ],
  },
  {
    id: 'net-05',
    category: 'network',
    title: 'ARP Poisoning — Man in the Middle',
    desc: 'A host on the network is sending fraudulent ARP replies to intercept traffic.',
    tags: ['ARP-poisoning', 'MitM', 'DAI'],
    steps: [
      {
        type: 'terminal',
        label: 'Network monitoring alert',
        terminal: [
          { type: 'alert',  text: '[09:44:12] ARP ANOMALY: Conflicting MAC for 10.0.1.1 (gateway)' },
          { type: 'output', text: '[09:44:12] Legitimate: 10.0.1.1 → MAC aa:bb:cc:dd:ee:01 (router)' },
          { type: 'alert',  text: '[09:44:13] Spoofed:    10.0.1.1 → MAC 11:22:33:44:55:66 (host 10.0.1.77)' },
          { type: 'output', text: '[09:44:13] Gratuitous ARP replies sent by 10.0.1.77 — rate: 2/second' },
          { type: 'warn',   text: '[09:44:14] Effect: Hosts caching spoofed ARP → traffic now routing through 10.0.1.77' },
          { type: 'output', text: '[09:44:14] 10.0.1.77 has IP forwarding enabled — acting as transparent proxy' },
        ],
        question: 'What is the attacker able to do with this ARP poisoning setup?',
        choices: [
          { text: 'Perform a DoS attack by dropping all forwarded traffic.', correct: false },
          { text: 'Intercept, read, and potentially modify all traffic between victims and the gateway — including HTTP sessions and any unencrypted data.', correct: true },
          { text: 'Gain admin access to the router.', correct: false },
          { text: 'Block specific users from accessing the network.', correct: false },
        ],
        feedback: {
          correct: 'Correct. With IP forwarding enabled, 10.0.1.77 transparently relays traffic while capturing a copy of everything passing through. Unencrypted HTTP sessions, credentials, cookies, and data are fully readable. TLS-encrypted traffic can be attacked via SSL stripping (downgrading HTTPS to HTTP) if HSTS is not enforced. The victim has no indication anything is wrong — their traffic reaches its destination normally. This is a classic man-in-the-middle position.',
          incorrect: 'ARP poisoning with IP forwarding creates a transparent man-in-the-middle position. All traffic flows through the attacker\'s machine, giving them full visibility into unencrypted traffic and opportunities to modify it. TLS provides some protection but can be stripped on improperly configured sites.',
        },
        points: 25,
        objectives: ['Understand ARP poisoning mechanics', 'Know what a MitM position enables', 'Identify Dynamic ARP Inspection as the defense'],
        hint: 'If all traffic routes through 10.0.1.77 and IP forwarding is on, what can the attacker do before passing traffic along?',
      },
      {
        type: 'analysis',
        label: 'Defense: Dynamic ARP Inspection',
        stageContent: 'The security team wants to prevent ARP poisoning at the network layer going forward.',
        question: 'How does Dynamic ARP Inspection (DAI) prevent this attack?',
        choices: [
          { text: 'It encrypts all ARP traffic on the VLAN.', correct: false },
          { text: 'It validates ARP packets against the DHCP snooping binding table — dropping any ARP reply where the MAC/IP pair doesn\'t match a known DHCP lease.', correct: true },
          { text: 'It blocks all ARP traffic except from the router.', correct: false },
          { text: 'It rate-limits ARP traffic to prevent flooding.', correct: false },
        ],
        feedback: {
          correct: 'Correct. DAI works with DHCP snooping: when a host receives an IP via DHCP, the switch records the MAC/IP/port binding. DAI then checks every ARP reply against this table — if a host claims to own an IP it didn\'t get from DHCP, the ARP reply is dropped. Since 10.0.1.77 doesn\'t have a DHCP lease for 10.0.1.1 (the gateway IP), its spoofed ARP replies would be silently dropped. Trusted ports (uplinks) are exempt from DAI inspection.',
          incorrect: 'DAI validates ARP packets against the DHCP snooping binding table. If a host sends a gratuitous ARP claiming to own the gateway\'s IP, but has no DHCP lease for that IP, the switch drops the packet. This makes ARP spoofing impossible on properly configured managed switches.',
        },
        points: 20,
        hint: 'The switch knows which MAC address legitimately has each IP (from DHCP records). How does it use that knowledge to validate ARP replies?',
      },
    ],
  },
  {
    id: 'net-06',
    category: 'network',
    title: 'C2 Beaconing Detection',
    desc: 'A host makes suspiciously regular outbound connections to an external IP.',
    tags: ['beaconing', 'C2', 'malware', 'timing'],
    steps: [
      {
        type: 'terminal',
        label: 'Proxy logs — 24-hour analysis of host 10.0.2.44',
        terminal: [
          { type: 'output', text: '[00:05:00] 10.0.2.44 → 45.155.205.233:443  HTTPS  2.1 KB' },
          { type: 'output', text: '[00:10:00] 10.0.2.44 → 45.155.205.233:443  HTTPS  1.8 KB' },
          { type: 'output', text: '[00:15:00] 10.0.2.44 → 45.155.205.233:443  HTTPS  2.0 KB' },
          { type: 'output', text: '[... 284 additional identical connections at exact 5-minute intervals ...]' },
          { type: 'warn',   text: '[23:55:00] 10.0.2.44 → 45.155.205.233:443  HTTPS  2.2 KB' },
          { type: 'output', text: '[ANALYSIS] Interval: 300 seconds ± 0 seconds. Variance: 0. 288 connections/day.' },
          { type: 'output', text: '[ANALYSIS] Destination: newly registered domain, no business justification' },
        ],
        question: 'What does zero-variance, perfectly timed regular beaconing indicate?',
        choices: [
          { text: 'A scheduled backup task running every 5 minutes.', correct: false },
          { text: 'Automated malware C2 beaconing — human behavior has timing variance; only software produces zero-variance intervals.', correct: true },
          { text: 'A monitoring agent checking server health.', correct: false },
          { text: 'Normal keep-alive connections from a web application.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Zero variance in timing is the key indicator — humans and even most legitimate software introduce some random variation. Only malware with a hard-coded sleep(300000) interval produces perfectly regular connections. The small, consistent payload size (1.8–2.2 KB) is consistent with heartbeat/status check traffic. Legitimate monitoring tools would be identified in your asset inventory. This pattern warrants immediate host isolation and investigation.',
          incorrect: 'Zero timing variance is the hallmark of automated malware beaconing. Human-initiated or even most legitimate automated tasks have some timing jitter. A perfectly regular 300-second interval with consistent small payloads and a newly registered destination is a strong C2 indicator. Isolate the host and investigate.',
        },
        points: 25,
        objectives: ['Identify C2 beaconing via timing analysis', 'Understand why zero variance indicates automation', 'Know jitter as an evasion technique'],
        hint: 'No human generates exactly 300-second intervals with zero variance for 24 hours. What kind of code does?',
      },
    ],
  },
  {
    id: 'net-07',
    category: 'network',
    title: 'Rogue DHCP Server',
    desc: 'Clients on a subnet receive incorrect IP configuration from an unauthorized source.',
    tags: ['rogue-DHCP', 'DHCP-snooping', 'misconfiguration'],
    steps: [
      {
        type: 'terminal',
        label: 'Help desk tickets — Floor 3, last 2 hours',
        terminal: [
          { type: 'output', text: '[08:45] User report: "Can\'t access internet — got IP 172.20.0.45"' },
          { type: 'output', text: '[08:47] User report: "Same issue — IP shows 172.20.0.67, gateway 172.20.0.1"' },
          { type: 'output', text: '[08:52] User report: "172.20.0.88 — DNS not resolving anything"' },
          { type: 'warn',   text: '[09:01] NETWORK: Floor 3 VLAN expected range: 10.0.3.0/24, gateway 10.0.3.1' },
          { type: 'alert',  text: '[09:01] Rogue DHCP server detected: MAC 00:1A:2B:3C:4D:5E on switch port Gi1/0/14' },
          { type: 'output', text: '[09:01] Rogue server handing out: 172.20.0.0/24, gateway 172.20.0.1 (attacker-controlled)' },
        ],
        question: 'Beyond loss of internet connectivity, what is the security risk of a rogue DHCP server?',
        choices: [
          { text: 'Users will receive conflicting IP addresses causing collisions.', correct: false },
          { text: 'The attacker-controlled gateway can intercept all traffic — a network-layer MitM without any ARP manipulation.', correct: true },
          { text: 'The legitimate DHCP server will be overwhelmed by the conflict.', correct: false },
          { text: 'DNS cache will be poisoned for the entire network.', correct: false },
        ],
        feedback: {
          correct: 'Correct. By pointing the default gateway to an attacker-controlled device (172.20.0.1), the rogue DHCP server routes all victim traffic through the attacker without needing ARP spoofing. The attacker\'s box acts as the router — all traffic flows through it. Additionally, the rogue DNS server field can direct DNS queries to an attacker-controlled resolver, enabling DNS spoofing and credential harvesting at scale. This is DHCP starvation + rogue server — a complete network takeover technique.',
          incorrect: 'The rogue DHCP server assigns an attacker-controlled gateway, making every client route all traffic through the attacker\'s machine. It also controls DNS resolution. This is a full network-layer MitM without ARP manipulation — more reliable and harder to detect without DHCP snooping.',
        },
        points: 25,
        objectives: ['Understand rogue DHCP attack impact', 'Know DHCP snooping as the preventive control', 'Recognize MitM via gateway manipulation'],
        hint: 'When your gateway IP points to the attacker\'s machine, where does all your outbound traffic go first?',
      },
    ],
  },
  {
    id: 'net-08',
    category: 'network',
    title: 'Cleartext Protocol Exposure',
    desc: 'Sensitive data is being transmitted over unencrypted protocols.',
    tags: ['FTP', 'Telnet', 'cleartext', 'protocol-security'],
    steps: [
      {
        type: 'network',
        label: 'Weekly protocol audit — internal and perimeter traffic',
        networkRows: [
          { class: 'row-ok',         src: '10.0.1.45',  dst: '10.0.5.20',  proto: 'SFTP',   port: '22',  bytes: '450 MB', note: 'Encrypted file transfer' },
          { class: 'row-suspicious', src: '10.0.2.11',  dst: '203.0.113.5', proto: 'FTP',   port: '21',  bytes: '1.2 GB', note: 'Cleartext — credentials visible' },
          { class: 'row-ok',         src: '10.0.1.88',  dst: '10.0.5.10',  proto: 'SSH',    port: '22',  bytes: '12 KB',  note: 'Encrypted admin access' },
          { class: 'row-suspicious', src: '10.0.3.55',  dst: '192.168.1.1', proto: 'Telnet',port: '23',  bytes: '8 KB',   note: 'Cleartext — router management' },
          { class: 'row-ok',         src: '10.0.1.22',  dst: '104.18.2.1',  proto: 'HTTPS', port: '443', bytes: '22 MB',  note: 'Encrypted web traffic' },
          { class: 'row-suspicious', src: '10.0.4.9',   dst: '10.0.5.30',  proto: 'HTTP',   port: '80',  bytes: '340 KB', note: 'Cleartext internal web app' },
        ],
        question: 'Which cleartext protocol represents the HIGHEST risk in this list?',
        choices: [
          { text: 'FTP to an external server transferring 1.2 GB of data.', correct: false },
          { text: 'Telnet to the router — cleartext administrative access exposes router credentials and configuration.', correct: true },
          { text: 'HTTP on an internal web application.', correct: false },
          { text: 'All three are equally risky.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Telnet to the router is the most critical: anyone on the network path can capture the router\'s admin credentials and full session in plaintext, giving them complete network control. Router compromise means the attacker can: redirect traffic, disable security controls, access all connected network segments, and persist indefinitely. FTP is serious (1.2 GB of potentially sensitive data), but router credential exposure has unlimited blast radius. Replace Telnet with SSH immediately.',
          incorrect: 'Telnet to the router is highest risk because router admin credentials in cleartext mean full network compromise. An attacker who captures those credentials owns the entire network. FTP data exposure is serious but limited in scope. Replace Telnet with SSH (port 22) for all device management.',
        },
        points: 20,
        objectives: ['Identify cleartext protocols in network traffic', 'Prioritize risk by impact of credential exposure', 'Know encrypted replacements for legacy protocols'],
        hint: 'Which credential, if stolen from cleartext, gives the attacker the most power over the entire network?',
      },
    ],
  },
];

// ---- DATA CLASSIFICATION SCENARIOS -------------------------------------------
const DATACLASS_SCENARIOS = [
  {
    id: 'dc-01',
    category: 'dataclass',
    title: 'Data Classification & Handling',
    desc: 'Apply correct classification labels and handling procedures.',
    tags: ['classification', 'DLP', 'compliance'],
    steps: [
      {
        type: 'analysis',
        label: 'Classify each data type',
        stageContent: 'A developer is building a new internal app and asks how to classify the following fields:<br><br>' +
          '• Full name + email address of customers<br>' +
          '• Hashed passwords (bcrypt, salted)<br>' +
          '• Credit card numbers (PAN)<br>' +
          '• Internal project codename<br>' +
          '• Public press release draft',
        question: 'Which data type requires the HIGHEST level of protection and compliance controls?',
        choices: [
          { text: 'Full name and email address', correct: false },
          { text: 'Hashed passwords', correct: false },
          { text: 'Credit card numbers (PAN)', correct: true },
          { text: 'Internal project codename', correct: false },
        ],
        feedback: {
          correct: 'Correct. Credit card numbers (Primary Account Numbers) fall under PCI DSS — one of the strictest compliance regimes. They require encryption at rest and in transit, network segmentation, access logging, and regular audits. The other data: PII (name/email) requires GDPR/CCPA controls; hashed passwords are protected but the hash itself has reduced risk; internal codenames are confidential; press release drafts are pre-public but not regulated.',
          incorrect: 'Credit card PANs require the strictest controls under PCI DSS. They must never be stored unless necessary (tokenization preferred), must be encrypted, and require a full compliance program. PII requires data protection law compliance. Hashed passwords have reduced exposure. The press release draft and codename are confidential but not regulated.',
        },
        points: 15,
        objectives: ['Apply data classification tiers', 'Identify regulated data types', 'Understand PCI DSS scope'],
        hint: 'Consider which data types fall under specific regulatory frameworks with defined technical requirements.',
      },
      {
        type: 'analysis',
        label: 'Handling violation',
        stageContent: 'A sales employee emails a CSV containing 2,400 customer records (names, emails, phone numbers, account numbers) to their personal Gmail address. They explain: "I just need to work on it over the weekend from home."',
        question: 'What policies has this employee violated?',
        choices: [
          { text: 'No violation — employees should be able to work remotely.', correct: false },
          { text: 'Acceptable use policy and data handling policy — PII must not be sent to personal accounts outside company controls.', correct: true },
          { text: 'Only the clean desk policy.', correct: false },
          { text: 'HIPAA regulations.', correct: false },
        ],
        feedback: {
          correct: 'Correct. This violates Acceptable Use Policy and Data Handling / DLP policies. Customer PII sent to a personal Gmail account: (1) exits the company\'s security controls and encryption, (2) may violate GDPR/CCPA data residency/transfer rules, (3) creates unauthorized data access risk if the Gmail account is compromised. Proper alternatives: VPN access to company systems, encrypted cloud storage with SSO, or company-provisioned remote access.',
          incorrect: 'The employee violated data handling and acceptable use policies. Sending customer PII (names, emails, phone numbers, account numbers) to personal Gmail: removes data from company security controls, may violate data protection regulations (GDPR/CCPA), creates breach risk. Remote work is fine — but via secure, company-controlled methods, not personal email.',
        },
        points: 15,
        hint: 'Think about what happens to data when it leaves company-controlled systems. Who controls the security of a personal Gmail account?',
      },
    ],
  },
  {
    id: 'dc-02',
    category: 'dataclass',
    title: 'Cloud Storage Misconfiguration',
    desc: 'A public S3 bucket is discovered containing sensitive company files.',
    tags: ['cloud', 'S3', 'misconfiguration', 'exposure'],
    steps: [
      {
        type: 'analysis',
        label: 'Security researcher notification',
        stageContent: 'A security researcher emails your security team: <em>"I found an S3 bucket at s3://company-prod-backups that is publicly readable. It contains what appear to be database backups and configuration files with credentials."</em><br><br>Your team confirms the bucket exists, is indeed public, and contains 3 years of database backups and a config file with hardcoded AWS API keys.',
        question: 'What is the correct order of immediate remediation steps?',
        choices: [
          { text: 'Publicly acknowledge the breach on social media to get ahead of the story.', correct: false },
          { text: 'Revoke the exposed API keys, make the bucket private, then assess what was accessed and who to notify.', correct: true },
          { text: 'Delete the bucket entirely to remove the exposed data.', correct: false },
          { text: 'Email the researcher back asking them not to share the finding publicly while you investigate.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Immediate priorities: (1) Revoke the hardcoded API keys NOW — if a malicious actor found them, every minute they remain valid is ongoing exposure, (2) Make the bucket private — stop the ongoing data leakage, (3) Enable S3 access logging and check CloudTrail to determine what was accessed, by whom, and from where, (4) Assess notification obligations (GDPR, state laws) based on data classification. Deleting the bucket destroys access logs needed for the investigation. Asking the researcher for silence without action is ineffective and unethical.',
          incorrect: 'The immediate steps in order: (1) Revoke exposed API keys immediately — they\'re the highest-risk item, (2) Make the bucket private — stop ongoing exposure, (3) Check S3 access logs / CloudTrail to understand the breach scope, (4) Assess what data was exposed and what notification obligations apply. Don\'t delete the bucket before preserving evidence. Don\'t ignore the researcher.',
        },
        points: 20,
        objectives: ['Prioritize credential revocation in cloud breaches', 'Know S3 access control remediation steps', 'Understand breach investigation sequence'],
        hint: 'The API keys are currently active credentials that may be in use by an attacker right now. What must happen to them before anything else?',
      },
      {
        type: 'analysis',
        label: 'Prevention: S3 security controls',
        stageContent: 'The CISO asks what controls should have prevented this bucket from being public. The bucket was created by a developer running infrastructure-as-code for a backup pipeline.',
        question: 'Which control would MOST reliably have prevented this misconfiguration from reaching production?',
        choices: [
          { text: 'Developer security awareness training about S3 bucket policies.', correct: false },
          { text: 'An AWS Service Control Policy (SCP) that denies s3:PutBucketAcl with public access, enforced at the organization level.', correct: true },
          { text: 'A monthly manual audit of S3 bucket permissions.', correct: false },
          { text: 'Requiring developers to submit a ticket before creating S3 buckets.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Technical preventive controls beat procedural/awareness controls for misconfigurations. An AWS SCP at the organization or account level can literally prevent the API call that makes a bucket public — it cannot be overridden by individual developers. AWS also provides "S3 Block Public Access" at the account level which should be enabled by default. Monthly audits catch problems after the fact. Training helps but humans make mistakes. Infrastructure guardrails prevent classes of mistakes entirely.',
          incorrect: 'A technical guardrail (SCP or S3 Block Public Access at account level) is the most reliable prevention — it makes the misconfiguration impossible, not just against policy. Training and audits are valuable but insufficient: developers still make mistakes, and monthly audits allow weeks of exposure. AWS best practice: enable S3 Block Public Access at the AWS Organization level as a default that individual accounts cannot override.',
        },
        points: 15,
        hint: 'Which of these options makes the misconfiguration technically impossible vs. just against policy?',
      },
    ],
  },
  {
    id: 'dc-03',
    category: 'dataclass',
    title: 'GDPR Data Subject Request',
    desc: 'A customer exercises their right to erasure — how do you respond correctly?',
    tags: ['GDPR', 'privacy', 'compliance', 'right-to-erasure'],
    steps: [
      {
        type: 'analysis',
        label: 'Customer request received',
        stageContent: 'A customer emails: <em>"Under GDPR Article 17, I am requesting the permanent deletion of all personal data you hold about me. My account email is jane.doe@example.com. Please confirm within 30 days."</em><br><br>The customer has an active order from 2 months ago and a 3-year-old completed order.',
        question: 'Under GDPR, you must comply with this erasure request — but are there any exceptions that may apply here?',
        choices: [
          { text: 'No exceptions — all data must be deleted within 30 days regardless of circumstances.', correct: false },
          { text: 'Yes — you may retain data required by law (e.g., financial records for tax/audit purposes) but must delete all other personal data.', correct: true },
          { text: 'Yes — you can refuse entirely because the customer has an active order.', correct: false },
          { text: 'The request is only valid if submitted through the official portal, not email.', correct: false },
        ],
        feedback: {
          correct: 'Correct. GDPR Article 17 provides a right to erasure but Article 17(3) lists exceptions, including where processing is necessary for: compliance with a legal obligation (e.g., retaining financial records for 7 years under tax law), establishment/exercise of legal claims, and others. You must delete all data not covered by an exception, inform the customer of which data is retained and why, and still respond within 30 days. The active order creates a legitimate interest but not an unlimited right to retain everything.',
          incorrect: 'GDPR Article 17 provides a right to erasure with exceptions in Article 17(3). Legal obligations (tax records, accounting laws) can justify retaining specific data. But you must: delete everything not covered by an exception, document the legal basis for retained data, and inform the customer. A 30-day response deadline applies. The method of request (email) does not invalidate it — GDPR does not require a specific channel.',
        },
        points: 15,
        objectives: ['Understand GDPR Article 17 right to erasure', 'Know Article 17(3) exceptions', 'Apply correct response procedure and timeline'],
        hint: 'GDPR gives rights to individuals but also recognizes that organizations have other legal obligations. Are there laws requiring you to keep financial records for a certain period?',
      },
      {
        type: 'analysis',
        label: 'Data inventory challenge',
        stageContent: 'You need to fulfill the erasure request. The customer\'s data exists in:<br><br>' +
          '• The main CRM database<br>' +
          '• Email marketing platform (Mailchimp)<br>' +
          '• Analytics platform (Google Analytics)<br>' +
          '• Database backups (30-day retention)<br>' +
          '• A third-party fraud detection service',
        question: 'Which of these data locations is typically most difficult to erase and requires a different process?',
        choices: [
          { text: 'The main CRM database — it\'s the largest system.', correct: false },
          { text: 'Database backups — erasure requires either restoring and modifying backups or accelerating backup expiry.', correct: true },
          { text: 'The email marketing platform — third parties are outside your control.', correct: false },
          { text: 'Google Analytics — it uses anonymized tracking IDs.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Database backups are the most complex erasure challenge. Restoring each backup to delete one record is operationally impractical. Acceptable GDPR approaches include: noting the erasure request and ensuring the data is not restored from backup for any purpose, accelerating the backup rotation schedule, or encrypting the specific data so it becomes unreadable even in backup form. Third-party processors (Mailchimp, fraud detection) must also be instructed to delete data — they are data processors acting on your behalf and must honor erasure requests you forward to them.',
          incorrect: 'Database backups are the hardest to practically erase. GDPR accepts pragmatic approaches: document that the data must not be restored and accelerate backup expiry, or use encryption key deletion. Third-party processors (Mailchimp, fraud service) must be instructed to delete — they are processors under your control obligation. Google Analytics typically collects anonymized identifiers which may not constitute personal data, but this requires case-by-case assessment.',
        },
        points: 20,
        hint: 'Modifying a single record in a live database is easy. Modifying the same record across dozens of point-in-time backup files is not. What alternative approaches exist?',
      },
    ],
  },
  {
    id: 'dc-04',
    category: 'dataclass',
    title: 'HIPAA and Protected Health Information',
    desc: 'A healthcare app handles patient data subject to HIPAA requirements.',
    tags: ['HIPAA', 'PHI', 'healthcare', 'compliance'],
    steps: [
      {
        type: 'analysis',
        label: 'Developer question during design review',
        stageContent: 'A developer is building a patient appointment scheduling app that stores:<br><br>' +
          '• Patient full name and date of birth<br>' +
          '• Diagnosis codes (ICD-10)<br>' +
          '• Insurance member ID<br>' +
          '• Appointment date and provider name<br>' +
          '• Email address and phone number<br><br>' +
          'They ask: "Which fields make this a HIPAA-regulated system?"',
        question: 'Which combination makes this data Protected Health Information (PHI) under HIPAA?',
        choices: [
          { text: 'Only the diagnosis codes — health conditions are the only regulated data.', correct: false },
          { text: 'Any individually identifiable health information — name + diagnosis codes + appointment data together constitute PHI.', correct: true },
          { text: 'Only insurance IDs — financial health data triggers HIPAA.', correct: false },
          { text: 'Email and phone alone, since they are contact information.', correct: false },
        ],
        feedback: {
          correct: 'Correct. HIPAA PHI is defined as individually identifiable health information — any data that relates to a person\'s health condition AND can be linked to a specific individual. Name + diagnosis codes = PHI. Name + appointment date + provider = PHI. Even the combination of zip code + date of birth + gender can be PHI if it could identify the individual. Contact information alone is not PHI, but becomes PHI when combined with health data. This entire app is HIPAA-regulated.',
          incorrect: 'PHI is any individually identifiable health information — health data that can be linked to a specific person. The combination of name + diagnosis + appointment data meets this definition. Contact info alone isn\'t PHI, but contact info + health data is. This app handles PHI and requires HIPAA-compliant controls: access controls, audit logging, encryption, Business Associate Agreements with vendors.',
        },
        points: 15,
        objectives: ['Define HIPAA PHI accurately', 'Understand that combination of fields creates PHI', 'Know which systems are HIPAA-regulated'],
        hint: 'HIPAA PHI = health information + ability to identify the individual. Does this data allow you to identify who has which health condition?',
      },
      {
        type: 'analysis',
        label: 'HIPAA technical safeguards',
        stageContent: 'The app stores PHI in a PostgreSQL database. The security team reviews the configuration and finds: no encryption at rest, no audit logging of record access, and the app uses a shared database account with no per-user tracking.',
        question: 'Which of these HIPAA Technical Safeguard requirements is most critically violated?',
        choices: [
          { text: 'Encryption at rest — required for all PHI databases.', correct: false },
          { text: 'Audit controls — HIPAA requires audit logs of all access to PHI so you can detect unauthorized access.', correct: true },
          { text: 'Automatic logoff — sessions must time out after inactivity.', correct: false },
          { text: 'All three are equally required.', correct: false },
        ],
        feedback: {
          correct: 'Correct. HIPAA\'s Audit Controls standard (§164.312(b)) is required (not addressable): covered entities must implement hardware, software, and/or procedural mechanisms to record and examine access to PHI. Without audit logs, you cannot detect a breach, prove compliance, or respond to HHS investigations. Note: encryption at rest is "addressable" (must implement or document why not), while audit controls are "required". The shared database account also violates the Unique User Identification standard.',
          incorrect: 'Audit controls are a REQUIRED HIPAA technical safeguard — you must log all access to PHI. Encryption at rest is "addressable" (strong recommendation, but you can document an alternative). Without audit logs, you cannot detect unauthorized access or prove compliance to HHS. The shared account also violates unique user identification requirements.',
        },
        points: 20,
        hint: 'HIPAA distinguishes between "required" and "addressable" safeguards. Which of these violations is a "required" standard with no flexibility?',
      },
    ],
  },
  {
    id: 'dc-05',
    category: 'dataclass',
    title: 'Intellectual Property Disclosure',
    desc: 'An engineer pushes proprietary source code to a public repository.',
    tags: ['IP', 'source-code', 'GitHub', 'trade-secret'],
    steps: [
      {
        type: 'terminal',
        label: 'DLP alert — GitHub integration monitoring',
        terminal: [
          { type: 'alert',  text: '[16:34:02] DLP ALERT: Source code pushed to public GitHub repository' },
          { type: 'output', text: '[16:34:02] User: j.park@company.com' },
          { type: 'output', text: '[16:34:02] Repository: github.com/jpark-dev/project-apollo-v2 (PUBLIC)' },
          { type: 'output', text: '[16:34:02] Files: 847 files, including /src/core/proprietary-algo.py' },
          { type: 'warn',   text: '[16:34:03] Detected: AWS_SECRET_KEY, DB_PASSWORD in .env file (committed)' },
          { type: 'alert',  text: '[16:34:05] Repository indexed by GitHub search — publicly discoverable' },
          { type: 'output', text: '[16:34:06] Employee note: "just needed to work from home this weekend"' },
        ],
        question: 'What are the two distinct security incidents in this alert?',
        choices: [
          { text: 'Unauthorized repository creation and violation of the remote work policy.', correct: false },
          { text: 'Intellectual property disclosure (proprietary source code) AND credential exposure (AWS key + DB password in a public repo).', correct: true },
          { text: 'Data exfiltration and a GDPR violation.', correct: false },
          { text: 'Policy violation only — no data was exposed because only the employee can see their GitHub.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Two separate incidents: (1) IP/trade secret disclosure — proprietary source code is now publicly available and Google-indexed. Competitors can access it immediately. (2) Credential exposure — the AWS secret key and DB password are in the commit history. Even if the repo is made private, the credentials must be rotated immediately because automated scanners (GitGuardian, TruffleHog bots) harvest credentials from public repos within seconds of push. Both require immediate action in parallel.',
          incorrect: 'Two incidents: source code IP exposure AND credential exposure via committed secrets. Critically: the credentials must be rotated NOW — bot scanners harvest API keys from GitHub within seconds. Making the repo private doesn\'t undo the credential exposure. Treat both the AWS key and database password as fully compromised.',
        },
        points: 20,
        objectives: ['Identify dual-incident nature of code+secret exposure', 'Know that secrets in git history persist after deletion', 'Understand bot scanning speed for credential harvesting'],
        hint: 'Look at both types of data in the push. What are the implications of each type being public for even 30 seconds?',
      },
    ],
  },
  {
    id: 'dc-06',
    category: 'dataclass',
    title: 'Third-Party Data Sharing',
    desc: 'A vendor contract and data processing agreement must be reviewed before sharing customer data.',
    tags: ['DPA', 'GDPR', 'third-party', 'vendor-risk'],
    steps: [
      {
        type: 'analysis',
        label: 'Marketing team request',
        stageContent: 'The marketing team wants to share a file containing 85,000 customer email addresses, names, and purchase history with a new advertising partner for a targeted campaign.<br><br>' +
          'Current status:<br>' +
          '• No Data Processing Agreement (DPA) with the partner<br>' +
          '• Privacy policy says data "may be shared with trusted partners"<br>' +
          '• Customers opted in to marketing emails from your company<br>' +
          '• The partner will use data independently for their own analytics',
        question: 'Under GDPR, can you legally share this data with the advertising partner as described?',
        choices: [
          { text: 'Yes — the privacy policy mentions sharing with partners, which is sufficient consent.', correct: false },
          { text: 'No — "trusted partners" in a privacy policy is not specific enough consent, no DPA exists, and the partner using data for their own analytics makes them a data controller, not a processor.', correct: true },
          { text: 'Yes — customers opted in to marketing, which covers all marketing-related uses.', correct: false },
          { text: 'Yes, as long as a DPA is signed within 30 days of sharing.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Multiple GDPR violations would occur: (1) Consent was given for marketing from YOUR company, not from the partner — purpose limitation violation, (2) "Trusted partners" is not specific enough to constitute valid consent or legitimate interest for sharing with a named third party, (3) If the partner uses the data for their own purposes, they are a data controller, not a processor — requiring a different legal basis (joint controller agreement or the customer\'s specific consent for the partner\'s use). A DPA must be in place BEFORE sharing, not after.',
          incorrect: 'This share would violate GDPR\'s purpose limitation (consent was for your marketing, not the partner\'s), specificity requirements (vague "trusted partners" language is insufficient), and requires a DPA before sharing. The partner using data for their own analytics makes them a data controller — requiring explicit consent for their specific use.',
        },
        points: 20,
        objectives: ['Understand GDPR purpose limitation principle', 'Know DPA requirements before third-party data sharing', 'Distinguish data processor vs data controller'],
        hint: 'Customers opted in to YOUR marketing. Did they opt in to the advertising partner\'s independent use of their data?',
      },
    ],
  },
  {
    id: 'dc-07',
    category: 'dataclass',
    title: 'Data Retention Policy',
    desc: 'An HR department requests deletion of all records for former employees.',
    tags: ['data-retention', 'legal-hold', 'minimization'],
    steps: [
      {
        type: 'analysis',
        label: 'HR ticket to IT',
        stageContent: 'HR submits a request: <em>"Please permanently delete all records for the 47 employees who left the company more than 2 years ago. This includes payroll records, performance reviews, and email archives."</em><br><br>' +
          'The company operates in the United States and the EU.',
        question: 'What should IT do before deleting any of these records?',
        choices: [
          { text: 'Delete immediately — the employees are gone and retention is a privacy risk.', correct: false },
          { text: 'Review applicable legal retention requirements and check for any active litigation holds before deleting anything.', correct: true },
          { text: 'Delete performance reviews only — payroll records are always exempt.', correct: false },
          { text: 'Ask each former employee for permission to delete their records.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Multiple legal retention requirements may apply: US federal law requires payroll/tax records for 3–7 years (IRS, FLSA). ERISA requires pension-related records for 6+ years. EU employment records have national-law retention requirements (often 3–10 years depending on type). Active litigation holds: if any former employee has filed or threatened legal claims, their records must be preserved (destruction could be considered spoliation of evidence). IT must consult Legal/HR/Compliance before deleting any category of records.',
          incorrect: 'Legal retention requirements vary by record type and jurisdiction: payroll records (3-7 years US), benefits records (6+ years), and any records under active litigation hold must be preserved. Deleting records subject to a legal hold is evidence spoliation — a serious legal liability. Always involve Legal before any bulk deletion of employment records.',
        },
        points: 15,
        objectives: ['Know legal retention requirements exist for employment records', 'Understand litigation hold obligations', 'Apply data minimization within legal constraints'],
        hint: 'What legal obligations might require you to keep payroll and HR records for former employees? What happens if someone sues after you delete the records?',
      },
    ],
  },
  {
    id: 'dc-08',
    category: 'dataclass',
    title: 'Encryption at Rest Requirements',
    desc: 'A mobile app stores sensitive health data without encryption on the device.',
    tags: ['encryption', 'mobile', 'at-rest', 'secure-storage'],
    steps: [
      {
        type: 'analysis',
        label: 'Mobile app security review finding',
        stageContent: 'A security review of a mobile health app finds:<br><br>' +
          '• User health data stored in SQLite database: <code>/data/data/com.app/databases/health.db</code> — no encryption<br>' +
          '• Authentication tokens stored in SharedPreferences (Android) — world-readable<br>' +
          '• Encryption flag set to false in the database configuration<br><br>' +
          'The developer argues: "The device has a PIN/biometric lock, so the data is already protected."',
        question: 'Why is the developer\'s argument insufficient?',
        choices: [
          { text: 'It is sufficient — device-level encryption protects all apps on the device.', correct: false },
          { text: 'Device lock screen protects against casual access but not against: ADB data extraction on rooted devices, backup extraction, physical memory attacks, or malicious apps with file read permissions.', correct: true },
          { text: 'The argument is partially correct — only authentication tokens need additional protection.', correct: false },
          { text: 'The developer is right for Android but wrong for iOS.', correct: false },
        ],
        feedback: {
          correct: 'Correct. Device lock screen is not the same as application-level data encryption. Multiple attack vectors bypass it: (1) Android Debug Bridge (ADB) can extract app data from rooted/unlocked bootloader devices, (2) Android backup APIs may expose unencrypted databases to backup tools, (3) Other apps with READ_EXTERNAL_STORAGE or root access can read app files, (4) Physical memory attacks on older devices. The correct approach: use Android Keystore / iOS Keychain to encrypt the SQLite database with a key tied to device authentication, and store tokens in secure storage (Android Keystore-backed, iOS Secure Enclave).',
          incorrect: 'Device lock screen ≠ application data encryption. ADB extraction, backup APIs, root access, and malicious apps can all access unencrypted app databases. Application-level encryption using platform-provided secure storage (Android Keystore, iOS Secure Enclave) is required for sensitive data.',
        },
        points: 20,
        objectives: ['Understand device lock vs application encryption', 'Know mobile data extraction attack vectors', 'Apply platform-provided secure storage APIs'],
        hint: 'Name two ways someone could access the SQLite file on an Android device without ever entering the PIN.',
      },
    ],
  },
];

// ---- MASTER EXPORT -----------------------------------------------------------
const ALL_SCENARIOS = [
  ...PHISHING_SCENARIOS,
  ...INCIDENT_SCENARIOS,
  ...PASSWORD_SCENARIOS,
  ...SOCIAL_SCENARIOS,
  ...NETWORK_SCENARIOS,
  ...DATACLASS_SCENARIOS,
];
