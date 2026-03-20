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
