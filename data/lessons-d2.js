/* Domain 2 — Security and Compliance (30%) */
window.CLF = window.CLF || {}; CLF.lessons = CLF.lessons || [];
CLF.lessons.push(
{
  id: '2.1', d: 'd2', minutes: 9,
  title: 'The shared responsibility model',
  summary: 'Security OF the cloud versus security IN the cloud, shared controls, and how the line moves for EC2, RDS, and Lambda.',
  html: `
<p>Security on AWS is shared. <strong>AWS is responsible for security <em>of</em> the cloud</strong>: the infrastructure that runs every service. <strong>You are responsible for security <em>in</em> the cloud</strong>: what you put there and how you configure it.</p>

<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 300" role="img" aria-label="Shared responsibility model. Customer: customer data; platform, applications, identity and access management; operating system, network and firewall configuration; encryption and network traffic protection. AWS: compute, storage, database, networking software; hardware and global infrastructure of Regions, Availability Zones, and edge locations.">
  <rect class="bx-d2" x="20" y="20" width="120" height="146" rx="8"/>
  <text x="80" y="80" text-anchor="middle" class="t-h">Customer</text>
  <text x="80" y="102" text-anchor="middle" class="t-s">Security IN</text><text x="80" y="116" text-anchor="middle" class="t-s">the cloud</text>
  <rect class="bx-w" x="150" y="20" width="490" height="32" rx="6"/><text x="395" y="41" text-anchor="middle" class="t-b">Customer data</text>
  <rect class="bx-w" x="150" y="58" width="490" height="32" rx="6"/><text x="395" y="79" text-anchor="middle">Platform, applications, identity and access management (IAM)</text>
  <rect class="bx-w" x="150" y="96" width="490" height="32" rx="6"/><text x="395" y="117" text-anchor="middle">Operating system, network, and firewall configuration</text>
  <rect class="bx-w" x="150" y="134" width="160" height="32" rx="6"/><text x="230" y="149" text-anchor="middle" class="t-s" style="fill:currentColor">Client-side data</text><text x="230" y="161" text-anchor="middle" class="t-s" style="fill:currentColor">encryption</text>
  <rect class="bx-w" x="315" y="134" width="160" height="32" rx="6"/><text x="395" y="149" text-anchor="middle" class="t-s" style="fill:currentColor">Server-side encryption</text><text x="395" y="161" text-anchor="middle" class="t-s" style="fill:currentColor">(file system / data)</text>
  <rect class="bx-w" x="480" y="134" width="160" height="32" rx="6"/><text x="560" y="149" text-anchor="middle" class="t-s" style="fill:currentColor">Network traffic protection</text><text x="560" y="161" text-anchor="middle" class="t-s" style="fill:currentColor">(encryption, integrity)</text>
  <line x1="20" y1="182" x2="640" y2="182" class="dash"/>
  <rect class="bx-a" x="20" y="198" width="120" height="84" rx="8"/>
  <text x="80" y="232" text-anchor="middle" class="t-h">AWS</text>
  <text x="80" y="254" text-anchor="middle" class="t-s">Security OF</text><text x="80" y="268" text-anchor="middle" class="t-s">the cloud</text>
  <rect class="bx" x="150" y="198" width="118" height="36" rx="6"/><text x="209" y="221" text-anchor="middle">Compute</text>
  <rect class="bx" x="274" y="198" width="118" height="36" rx="6"/><text x="333" y="221" text-anchor="middle">Storage</text>
  <rect class="bx" x="398" y="198" width="118" height="36" rx="6"/><text x="457" y="221" text-anchor="middle">Database</text>
  <rect class="bx" x="522" y="198" width="118" height="36" rx="6"/><text x="581" y="221" text-anchor="middle">Networking</text>
  <rect class="bx" x="150" y="240" width="490" height="42" rx="6"/>
  <text x="395" y="258" text-anchor="middle" class="t-b">Hardware / AWS global infrastructure</text>
  <text x="395" y="274" text-anchor="middle" class="t-s">Regions · Availability Zones · Edge locations · physical data centers</text>
</svg>
</div>
<figcaption><b>The dashed line is the boundary.</b> Everything you can configure sits above it and is yours. The facilities, hardware, and the software that runs AWS services sit below it and belong to AWS.</figcaption>
</figure>

<h2>Who does what</h2>
<div class="grid g2">
<div class="callout"><b>AWS responsibilities</b>
<ul>
  <li>Physical security of data centers (guards, badges, cameras)</li>
  <li>Hardware, power, cooling, and the network between facilities</li>
  <li>The virtualization layer (hypervisor) and host operating systems</li>
  <li>Patching the infrastructure and the managed parts of managed services</li>
  <li>Disposing of storage devices securely</li>
</ul></div>
<div class="callout"><b>Customer responsibilities</b>
<ul>
  <li>Your data, and classifying it</li>
  <li>IAM users, roles, policies, and MFA</li>
  <li>Security group and network ACL rules</li>
  <li>Guest OS patching on Amazon EC2 and your application code</li>
  <li>Choosing to encrypt data and managing who can use the keys</li>
</ul></div>
</div>

<h2>The line moves with the service</h2>
<p>The more managed a service is, the more AWS takes on. This is the most-tested part of the model.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 300" role="img" aria-label="Responsibility by service. Amazon EC2: customer handles data, application, runtime, and guest OS; AWS handles virtualization and physical. Amazon RDS: customer handles data and schema; AWS handles database engine patching, OS, virtualization, physical. AWS Lambda: customer handles data and code; AWS handles runtime, OS, virtualization, physical.">
  <text x="330" y="30" text-anchor="middle" class="t-b">Amazon EC2</text>
  <text x="460" y="30" text-anchor="middle" class="t-b">Amazon RDS</text>
  <text x="590" y="30" text-anchor="middle" class="t-b">AWS Lambda</text>
  <text x="20" y="64" class="t-s" style="fill:currentColor">Data, permissions, encryption</text>
  <text x="20" y="102" class="t-s" style="fill:currentColor">Application code / DB schema</text>
  <text x="20" y="140" class="t-s" style="fill:currentColor">Runtime / DB engine patching</text>
  <text x="20" y="178" class="t-s" style="fill:currentColor">Guest OS patching</text>
  <text x="20" y="216" class="t-s" style="fill:currentColor">Virtualization, host servers</text>
  <text x="20" y="254" class="t-s" style="fill:currentColor">Physical facilities, hardware</text>
  <g>
    <rect class="bx-d2" x="270" y="44" width="120" height="32" rx="5"/><text x="330" y="64" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-d2" x="270" y="82" width="120" height="32" rx="5"/><text x="330" y="102" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-d2" x="270" y="120" width="120" height="32" rx="5"/><text x="330" y="140" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-d2" x="270" y="158" width="120" height="32" rx="5"/><text x="330" y="178" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-a" x="270" y="196" width="120" height="32" rx="5"/><text x="330" y="216" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="270" y="234" width="120" height="32" rx="5"/><text x="330" y="254" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
  </g>
  <g>
    <rect class="bx-d2" x="400" y="44" width="120" height="32" rx="5"/><text x="460" y="64" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-d2" x="400" y="82" width="120" height="32" rx="5"/><text x="460" y="102" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-a" x="400" y="120" width="120" height="32" rx="5"/><text x="460" y="140" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="400" y="158" width="120" height="32" rx="5"/><text x="460" y="178" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="400" y="196" width="120" height="32" rx="5"/><text x="460" y="216" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="400" y="234" width="120" height="32" rx="5"/><text x="460" y="254" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
  </g>
  <g>
    <rect class="bx-d2" x="530" y="44" width="120" height="32" rx="5"/><text x="590" y="64" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-d2" x="530" y="82" width="120" height="32" rx="5"/><text x="590" y="102" text-anchor="middle" class="t-s" style="fill:currentColor">Customer</text>
    <rect class="bx-a" x="530" y="120" width="120" height="32" rx="5"/><text x="590" y="140" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="530" y="158" width="120" height="32" rx="5"/><text x="590" y="178" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="530" y="196" width="120" height="32" rx="5"/><text x="590" y="216" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
    <rect class="bx-a" x="530" y="234" width="120" height="32" rx="5"/><text x="590" y="254" text-anchor="middle" class="t-s" style="fill:currentColor">AWS</text>
  </g>
  <text x="330" y="290" text-anchor="middle" class="t-m">Infrastructure (IaaS)</text>
  <text x="460" y="290" text-anchor="middle" class="t-m">Managed service</text>
  <text x="590" y="290" text-anchor="middle" class="t-m">Serverless</text>
</svg>
</div>
<figcaption><b>Moving right, AWS takes more of the stack.</b> On EC2 you patch the guest OS. On RDS, AWS patches the OS and database engine. On Lambda, AWS manages everything below your code. Your data and permissions always stay yours.</figcaption>
</figure>

<h2>Shared and inherited controls</h2>
<ul>
  <li><strong>Inherited controls:</strong> controls you inherit fully from AWS, such as physical and environmental controls.</li>
  <li><strong>Shared controls:</strong> apply to both layers, in different contexts.
    <ul>
      <li><em>Patch management</em>: AWS patches the infrastructure; you patch your guest OS and applications.</li>
      <li><em>Configuration management</em>: AWS configures its devices; you configure your OS, databases, and applications.</li>
      <li><em>Awareness and training</em>: AWS trains its employees; you train yours.</li>
    </ul></li>
  <li><strong>Customer-specific controls:</strong> entirely yours, such as routing data within specific security environments or zones.</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Patching the guest operating system on EC2” → <strong>customer</strong>. “Patching the database engine on RDS” → <strong>AWS</strong>.</li>
  <li>“Physical security”, “decommissioning disks”, “hypervisor” → <strong>AWS</strong>.</li>
  <li>“Configuring security groups”, “IAM”, “encrypting data”, “enabling MFA” → <strong>customer</strong>, regardless of the service.</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>Encryption is <strong>available</strong> from AWS, but turning it on and controlling access to keys is a <strong>customer</strong> decision. Also, AWS never manages your data classification or your IAM users, even for fully managed services.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/compliance/shared-responsibility-model/" target="_blank" rel="noopener">Shared Responsibility Model</a></li>
</ul>`
},
{
  id: '2.2', d: 'd2', minutes: 11,
  title: 'Security, governance, and compliance concepts',
  summary: 'Where to find compliance reports, how encryption works on AWS, where security logs live, and which service answers which governance question.',
  html: `
<h2>Compliance on AWS</h2>
<p>AWS maintains certifications and attestations for its infrastructure, such as SOC 1/2/3, ISO 27001, PCI DSS, and HIPAA eligibility, and supports regional programs such as GDPR. You build on that foundation, but <strong>your workload's compliance is still your responsibility</strong>.</p>
<div class="keyterms">
  <div><b>AWS Artifact</b><span>Self-service portal in the console to download AWS compliance reports (SOC, PCI, ISO) and review and accept agreements such as the Business Associate Addendum (BAA).</span></div>
  <div><b>AWS Compliance Programs</b><span>The public website listing which certifications AWS holds and which services are in scope for each.</span></div>
  <div><b>Compliance varies by service</b><span>Not every service is in scope for every program. For example, check the HIPAA-eligible services list before storing health data.</span></div>
  <div><b>Compliance varies by place</b><span>Laws such as data residency rules differ by country and industry. Choosing the right AWS Region keeps data in a jurisdiction.</span></div>
</div>

<h2>Encryption</h2>
<p>Encryption protects data so that only holders of the right key can read it. AWS makes encryption easy; deciding to use it, and controlling the keys, is yours.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 200" role="img" aria-label="Encryption in transit protects data moving between a user and AWS using TLS; encryption at rest protects data stored in S3, EBS, and RDS using keys from AWS KMS.">
  <rect class="bx-w" x="20" y="60" width="120" height="64" rx="8"/><text x="80" y="88" text-anchor="middle" class="t-b">User or app</text><text x="80" y="106" text-anchor="middle" class="t-s">browser, client</text>
  <line class="ln-a" x1="146" y1="92" x2="300" y2="92" marker-end="url(#arr-acc)"/>
  <rect class="bx-a" x="170" y="62" width="104" height="22" rx="11"/><text x="222" y="78" text-anchor="middle" class="t-m">TLS / HTTPS</text>
  <text x="222" y="118" text-anchor="middle" class="t-s">In transit</text>
  <text x="222" y="132" text-anchor="middle" class="t-s">certificates from ACM</text>
  <rect class="bx" x="306" y="40" width="140" height="104" rx="8"/>
  <text x="376" y="66" text-anchor="middle" class="t-b">AWS service</text>
  <text x="376" y="88" text-anchor="middle" class="t-s">Amazon S3</text>
  <text x="376" y="104" text-anchor="middle" class="t-s">Amazon EBS</text>
  <text x="376" y="120" text-anchor="middle" class="t-s">Amazon RDS</text>
  <line class="ln" x1="452" y1="92" x2="510" y2="92" marker-end="url(#arr)"/>
  <rect class="bx-d2" x="516" y="56" width="124" height="72" rx="8"/><text x="578" y="84" text-anchor="middle" class="t-b">Stored data</text><text x="578" y="102" text-anchor="middle" class="t-s">At rest, encrypted</text><text x="578" y="116" text-anchor="middle" class="t-s">on disk</text>
  <rect class="bx-am" x="306" y="160" width="140" height="32" rx="8"/><text x="376" y="181" text-anchor="middle" class="t-b">AWS KMS key</text>
  <path class="ln-am" d="M446 176 H578 V134" marker-end="url(#arr)"/>
  <text x="514" y="170" text-anchor="middle" class="t-s">encrypts / decrypts</text>
</svg>
</div>
<figcaption><b>Two places to encrypt.</b> In transit, TLS protects data on the wire. At rest, AWS services encrypt stored data with keys managed in AWS KMS (or AWS CloudHSM for dedicated hardware).</figcaption>
</figure>
<div class="table-wrap"><table>
<thead><tr><th>Service</th><th>Use it for</th></tr></thead>
<tbody>
<tr><td><strong>AWS Key Management Service (KMS)</strong></td><td>Create and control encryption keys used by most AWS services. Integrated with CloudTrail so every key use is logged. Multi-tenant, AWS-managed hardware security modules (HSMs).</td></tr>
<tr><td><strong>AWS CloudHSM</strong></td><td>Dedicated, single-tenant hardware security modules in the AWS Cloud that <em>you</em> control, for strict compliance requirements.</td></tr>
<tr><td><strong>AWS Certificate Manager (ACM)</strong></td><td>Provision, manage, and automatically renew SSL/TLS certificates for encryption in transit (CloudFront, Elastic Load Balancing, API Gateway). Public certificates are free.</td></tr>
<tr><td><strong>AWS Secrets Manager</strong></td><td>Store and automatically rotate database passwords, API keys, and other secrets.</td></tr>
</tbody></table></div>

<h2>Governance: who did what, what changed, how is it running</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 190" role="img" aria-label="Three governance services: AWS CloudTrail answers who did what (API calls), AWS Config answers what changed and is it compliant (resource configuration), Amazon CloudWatch answers how is it performing (metrics, logs, alarms).">
  <rect class="bx-d2" x="20" y="20" width="200" height="150" rx="10"/>
  <text x="120" y="50" text-anchor="middle" class="t-h">AWS CloudTrail</text>
  <text x="120" y="76" text-anchor="middle" class="t-b">“Who did what?”</text>
  <text x="120" y="102" text-anchor="middle" class="t-s">Records API calls and</text>
  <text x="120" y="116" text-anchor="middle" class="t-s">console actions: user,</text>
  <text x="120" y="130" text-anchor="middle" class="t-s">time, source IP, request</text>
  <text x="120" y="156" text-anchor="middle" class="t-m">AUDIT</text>
  <rect class="bx-d3" x="230" y="20" width="200" height="150" rx="10"/>
  <text x="330" y="50" text-anchor="middle" class="t-h">AWS Config</text>
  <text x="330" y="76" text-anchor="middle" class="t-b">“What changed?”</text>
  <text x="330" y="102" text-anchor="middle" class="t-s">Tracks resource configuration</text>
  <text x="330" y="116" text-anchor="middle" class="t-s">history and evaluates it</text>
  <text x="330" y="130" text-anchor="middle" class="t-s">against compliance rules</text>
  <text x="330" y="156" text-anchor="middle" class="t-m">COMPLIANCE</text>
  <rect class="bx-d1" x="440" y="20" width="200" height="150" rx="10"/>
  <text x="540" y="50" text-anchor="middle" class="t-h">Amazon CloudWatch</text>
  <text x="540" y="76" text-anchor="middle" class="t-b">“How is it running?”</text>
  <text x="540" y="102" text-anchor="middle" class="t-s">Metrics, logs, dashboards,</text>
  <text x="540" y="116" text-anchor="middle" class="t-s">and alarms that trigger</text>
  <text x="540" y="130" text-anchor="middle" class="t-s">notifications or actions</text>
  <text x="540" y="156" text-anchor="middle" class="t-m">MONITORING</text>
</svg>
</div>
<figcaption><b>Three questions, three services.</b> If a question asks who deleted a resource, it is CloudTrail. If it asks whether resources still match a rule, or how a resource looked last week, it is Config. If it asks about CPU usage or an alarm, it is CloudWatch.</figcaption>
</figure>
<p><strong>Where security logs live:</strong> CloudTrail logs (stored in Amazon S3, optionally sent to CloudWatch Logs), VPC Flow Logs (IP traffic in your VPC), Amazon S3 server access logs, Elastic Load Balancing access logs, and CloudWatch Logs for application and OS logs.</p>
<p><strong>Access reports:</strong> the <em>IAM credential report</em> lists every user and the status of their passwords, access keys, and MFA. <em>IAM last-accessed information</em> (access advisor) shows which services a principal actually used, so you can remove unused permissions. <em>IAM Access Analyzer</em> finds resources shared with external accounts.</p>

<h2>Services that secure your resources</h2>
<p>These four come up constantly. Learn the verb each one owns.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 210" role="img" aria-label="Detection services (Amazon GuardDuty for threats, Amazon Inspector for vulnerabilities, Amazon Macie for sensitive data) send findings to AWS Security Hub, which aggregates them; Amazon Detective investigates root cause.">
  <rect class="bx-w" x="20" y="16" width="190" height="52" rx="8"/><text x="115" y="38" text-anchor="middle" class="t-b">Amazon GuardDuty</text><text x="115" y="56" text-anchor="middle" class="t-s">Threat detection from logs</text>
  <rect class="bx-w" x="20" y="78" width="190" height="52" rx="8"/><text x="115" y="100" text-anchor="middle" class="t-b">Amazon Inspector</text><text x="115" y="118" text-anchor="middle" class="t-s">Vulnerability scanning</text>
  <rect class="bx-w" x="20" y="140" width="190" height="52" rx="8"/><text x="115" y="162" text-anchor="middle" class="t-b">Amazon Macie</text><text x="115" y="180" text-anchor="middle" class="t-s">Sensitive data (PII) in S3</text>
  <path class="ln" d="M214 42 H250 V104 H286" marker-end="url(#arr)"/>
  <path class="ln" d="M214 104 H286"/>
  <path class="ln" d="M214 166 H250 V104"/>
  <text x="250" y="200" text-anchor="middle" class="t-m">FINDINGS</text>
  <rect class="bx-a" x="292" y="66" width="170" height="76" rx="10"/><text x="377" y="96" text-anchor="middle" class="t-b">AWS Security Hub</text><text x="377" y="114" text-anchor="middle" class="t-s">Aggregates findings and</text><text x="377" y="128" text-anchor="middle" class="t-s">checks best practices</text>
  <line class="ln" x1="466" y1="104" x2="500" y2="104" marker-end="url(#arr)"/>
  <rect class="bx-w" x="506" y="66" width="134" height="76" rx="10"/><text x="573" y="96" text-anchor="middle" class="t-b">Amazon Detective</text><text x="573" y="114" text-anchor="middle" class="t-s">Investigate the</text><text x="573" y="128" text-anchor="middle" class="t-s">root cause</text>
</svg>
</div>
<figcaption><b>Detect, collect, investigate.</b> GuardDuty, Inspector, and Macie each find a different kind of problem. Security Hub gives one consolidated view and posture score. Detective helps you dig into what happened.</figcaption>
</figure>
<div class="keyterms">
  <div><b>Amazon GuardDuty</b><span>Intelligent threat detection. Continuously analyzes CloudTrail events, VPC Flow Logs, and DNS logs for malicious activity such as crypto-mining or compromised credentials. No agents.</span></div>
  <div><b>Amazon Inspector</b><span>Automated vulnerability management. Scans EC2 instances, container images in Amazon ECR, and Lambda functions for software vulnerabilities (CVEs) and unintended network exposure.</span></div>
  <div><b>AWS Security Hub</b><span>Central security posture dashboard. Aggregates findings from GuardDuty, Inspector, Macie, and partners, and runs automated checks against standards such as CIS.</span></div>
  <div><b>AWS Shield</b><span>DDoS protection. Standard is automatic and free; Advanced adds 24/7 response team access and cost protection (see lesson 2.4).</span></div>
</div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Download a SOC 2 or PCI report” → <strong>AWS Artifact</strong>.</li>
  <li>“Which user terminated the instance?” → <strong>CloudTrail</strong>. “Track configuration changes over time” → <strong>Config</strong>.</li>
  <li>“Find unusual API activity or compromised instances” → <strong>GuardDuty</strong>. “Scan for software vulnerabilities” → <strong>Inspector</strong>.</li>
  <li>“Discover PII in S3 buckets” → <strong>Macie</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/artifact/" target="_blank" rel="noopener">AWS Artifact</a> · <a href="https://aws.amazon.com/compliance/programs/" target="_blank" rel="noopener">AWS Compliance Programs</a></li>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/introduction-aws-security/introduction-aws-security.html" target="_blank" rel="noopener">Introduction to AWS Security (whitepaper)</a></li>
</ul>`
},
{
  id: '2.3', d: 'd2', minutes: 11,
  title: 'Access management with IAM',
  summary: 'Users, groups, roles, and policies; protecting the root user; least privilege; IAM Identity Center and federation; credentials and where to store them.',
  html: `
<p><strong>AWS Identity and Access Management (IAM)</strong> controls <em>who</em> can sign in (authentication) and <em>what</em> they can do (authorization). IAM is global (not tied to a Region) and free.</p>

<h2>IAM building blocks</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 260" role="img" aria-label="IAM building blocks. Users belong to groups; policies attach to users, groups, and roles. Roles are assumed by AWS services, users from other accounts, or federated users, and provide temporary credentials.">
  <rect class="bx-w" x="20" y="20" width="110" height="44" rx="8"/><text x="75" y="47" text-anchor="middle" class="t-b">User: Ana</text>
  <rect class="bx-w" x="20" y="74" width="110" height="44" rx="8"/><text x="75" y="101" text-anchor="middle" class="t-b">User: Ben</text>
  <line class="ln" x1="134" y1="42" x2="186" y2="66" marker-end="url(#arr)"/>
  <line class="ln" x1="134" y1="96" x2="186" y2="76" marker-end="url(#arr)"/>
  <text x="160" y="40" text-anchor="middle" class="t-s">member of</text>
  <rect class="bx-d1" x="192" y="42" width="140" height="56" rx="8"/><text x="262" y="66" text-anchor="middle" class="t-b">Group: Developers</text><text x="262" y="84" text-anchor="middle" class="t-s">no credentials itself</text>
  <rect class="bx-am" x="426" y="20" width="214" height="98" rx="8"/>
  <text x="533" y="42" text-anchor="middle" class="t-b">Policy (JSON document)</text>
  <text x="440" y="64" class="t-m">"Effect": "Allow",</text>
  <text x="440" y="82" class="t-m">"Action": "s3:GetObject",</text>
  <text x="440" y="100" class="t-m">"Resource": "arn:…:reports/*"</text>
  <line class="ln-am" x1="420" y1="70" x2="338" y2="70" marker-end="url(#arr)"/>
  <text x="378" y="62" text-anchor="middle" class="t-s">attached to</text>
  <line x1="20" y1="140" x2="640" y2="140" class="dash"/>
  <rect class="bx-a" x="252" y="160" width="170" height="70" rx="10"/><text x="337" y="186" text-anchor="middle" class="t-b">IAM role</text><text x="337" y="204" text-anchor="middle" class="t-s">no long-term password</text><text x="337" y="218" text-anchor="middle" class="t-s">or access keys</text>
  <path class="ln-am" d="M533 122 V195 H428" marker-end="url(#arr)"/>
  <rect class="bx-w" x="20" y="152" width="170" height="26" rx="6"/><text x="105" y="170" text-anchor="middle" class="t-s" style="fill:currentColor">EC2 instance / Lambda function</text>
  <rect class="bx-w" x="20" y="184" width="170" height="26" rx="6"/><text x="105" y="202" text-anchor="middle" class="t-s" style="fill:currentColor">User in another AWS account</text>
  <rect class="bx-w" x="20" y="216" width="170" height="26" rx="6"/><text x="105" y="234" text-anchor="middle" class="t-s" style="fill:currentColor">Federated user (corporate IdP)</text>
  <line class="ln" x1="194" y1="165" x2="246" y2="185" marker-end="url(#arr)"/>
  <line class="ln" x1="194" y1="197" x2="246" y2="197" marker-end="url(#arr)"/>
  <line class="ln" x1="194" y1="229" x2="246" y2="210" marker-end="url(#arr)"/>
  <text x="220" y="252" text-anchor="middle" class="t-s">assume role</text>
  <text x="440" y="252" class="t-s">→ temporary credentials (AWS STS)</text>
</svg>
</div>
<figcaption><b>People get users or federated access; workloads get roles.</b> Permissions always come from policies. Groups only collect users so you can attach a policy once.</figcaption>
</figure>
<div class="keyterms">
  <div><b>IAM user</b><span>An identity for one person or application with long-term credentials: a console password and/or access keys.</span></div>
  <div><b>IAM group</b><span>A collection of users. Attach policies to the group; every member inherits them. Groups cannot be nested and cannot sign in.</span></div>
  <div><b>IAM role</b><span>An identity with permissions but no long-term credentials. Anyone allowed to assume it gets temporary credentials. Use roles for EC2, Lambda, cross-account access, and federation.</span></div>
  <div><b>IAM policy</b><span>A JSON document that allows or denies actions on resources. An explicit Deny always wins; anything not allowed is denied by default.</span></div>
  <div><b>AWS managed policy</b><span>Created and maintained by AWS for common job functions (for example, ReadOnlyAccess). Easy, but often broader than you need.</span></div>
  <div><b>Customer managed policy</b><span>A custom policy you write and reuse across identities, tailored to least privilege. (An <em>inline</em> policy is embedded in one identity only.)</span></div>
</div>

<h2>Principle of least privilege</h2>
<p>Grant only the permissions needed to perform a task, and nothing more. Start small and add permissions as needed. Review regularly with IAM last-accessed information and IAM Access Analyzer, and remove what is unused.</p>

<h2>Protecting the root user</h2>
<p>The <strong>root user</strong> is the identity created with the AWS account, signed in with the account email address. It has complete, unrestricted access, which cannot be limited by IAM policies.</p>
<div class="grid g2">
<div class="callout"><b>Protect it by</b>
<ul>
  <li>Enabling <strong>MFA</strong> on the root user</li>
  <li>Using a strong, unique password</li>
  <li>Not creating root access keys (delete any that exist)</li>
  <li>Using it only for tasks that require it; use IAM or IAM Identity Center for daily work</li>
</ul></div>
<div class="callout"><b>Tasks only the root user can do</b>
<ul>
  <li>Change account settings: account name, email address, root password</li>
  <li>Close the AWS account</li>
  <li>Activate IAM access to the Billing and Cost Management console</li>
  <li>Enable MFA delete on an S3 bucket, or fix a bucket policy that denies all principals</li>
  <li>Restore IAM user permissions if the only admin locks themselves out</li>
  <li>Register as a seller in the Reserved Instance Marketplace</li>
  <li>Sign up for AWS GovCloud (US)</li>
</ul></div>
</div>

<h2>Authentication methods</h2>
<ul>
  <li><strong>Multi-factor authentication (MFA):</strong> something you know (password) plus something you have (authenticator app, hardware key, passkey). Enable it for the root user and every human user.</li>
  <li><strong>AWS IAM Identity Center</strong> (successor to AWS Single Sign-On): the recommended way to give your workforce single sign-on access to <em>multiple AWS accounts</em> and business applications. Connects to an existing identity source such as Microsoft Active Directory or Okta.</li>
  <li><strong>Federation:</strong> users sign in with an external identity provider (SAML 2.0 or OpenID Connect) and receive temporary credentials. No IAM user needed.</li>
  <li><strong>Cross-account IAM roles:</strong> a user in account A assumes a role in account B to work there without a second set of credentials.</li>
  <li><strong>Amazon Cognito:</strong> sign-up and sign-in for <em>customers of your applications</em> (web and mobile users), not for your employees.</li>
</ul>

<h2>Credentials and where to keep them</h2>
<div class="table-wrap"><table>
<thead><tr><th>Credential</th><th>Used for</th><th>Good practice</th></tr></thead>
<tbody>
<tr><td>Password</td><td>AWS Management Console</td><td>Enforce an <strong>IAM password policy</strong> (length, complexity, rotation) and MFA.</td></tr>
<tr><td>Access key ID + secret access key</td><td>AWS CLI, SDKs, API calls</td><td>Never embed in code or share; rotate regularly; prefer roles so no long-term keys exist.</td></tr>
<tr><td>Application secrets (DB passwords, API keys)</td><td>Your applications</td><td>Store in <strong>AWS Secrets Manager</strong> (automatic rotation) or <strong>AWS Systems Manager Parameter Store</strong>.</td></tr>
</tbody></table></div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Give an EC2 instance access to S3” → attach an <strong>IAM role</strong>, never store access keys on the instance.</li>
  <li>“Single sign-on for employees across many AWS accounts” → <strong>IAM Identity Center</strong>.</li>
  <li>“Login for millions of mobile app users” → <strong>Amazon Cognito</strong>.</li>
  <li>“Automatically rotate database credentials” → <strong>Secrets Manager</strong>.</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>Groups contain users only, not roles or other groups. And an IAM policy cannot restrict the root user of the same account; only an AWS Organizations service control policy (SCP) can limit what a member account's root user does.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" target="_blank" rel="noopener">IAM security best practices</a></li>
  <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html" target="_blank" rel="noopener">Tasks that require root user credentials</a></li>
</ul>`
},
{
  id: '2.4', d: 'd2', minutes: 8,
  title: 'Security components and resources',
  summary: 'Edge protection with AWS WAF, AWS Shield, and AWS Firewall Manager; third-party tools in AWS Marketplace; and where AWS publishes security information.',
  html: `
<h2>Protecting a web application layer by layer</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 230" role="img" aria-label="A request travels from users through AWS Shield at the edge, Amazon CloudFront with AWS WAF, an Application Load Balancer, security groups, to EC2 instances. AWS Firewall Manager centrally manages WAF rules, Shield Advanced, and security groups across accounts.">
  <rect class="bx-w" x="10" y="92" width="84" height="56" rx="8"/><text x="52" y="116" text-anchor="middle" class="t-b">Users</text><text x="52" y="134" text-anchor="middle" class="t-s">and attackers</text>
  <line class="ln" x1="98" y1="120" x2="134" y2="120" marker-end="url(#arr)"/>
  <rect class="bx-d2" x="140" y="64" width="530" height="116" rx="12" style="fill-opacity:.35"/>
  <text x="152" y="84" class="t-m">AWS SHIELD · DDoS protection across the edge and Regions</text>
  <rect class="bx-a" x="156" y="96" width="144" height="70" rx="8"/><text x="228" y="122" text-anchor="middle" class="t-b">CloudFront</text><text x="228" y="140" text-anchor="middle" class="t-s">+ AWS WAF rules</text><text x="228" y="154" text-anchor="middle" class="t-s">(SQLi, XSS, rate limits)</text>
  <line class="ln" x1="304" y1="131" x2="336" y2="131" marker-end="url(#arr)"/>
  <rect class="bx-w" x="342" y="96" width="132" height="70" rx="8"/><text x="408" y="122" text-anchor="middle" class="t-b">Load balancer</text><text x="408" y="140" text-anchor="middle" class="t-s">ALB (WAF can</text><text x="408" y="154" text-anchor="middle" class="t-s">attach here too)</text>
  <line class="ln" x1="478" y1="131" x2="510" y2="131" marker-end="url(#arr)"/>
  <rect class="dash" x="516" y="96" width="142" height="70" rx="8"/><text x="587" y="112" text-anchor="middle" class="t-s">security group</text>
  <rect class="bx-w" x="530" y="118" width="114" height="38" rx="6"/><text x="587" y="142" text-anchor="middle" class="t-b">EC2 instances</text>
  <rect class="bx-am" x="156" y="10" width="502" height="38" rx="8"/><text x="407" y="34" text-anchor="middle"><tspan class="t-b">AWS Firewall Manager</tspan> · one policy, every account</text>
  <line class="ln-am" x1="228" y1="48" x2="228" y2="92" marker-end="url(#arr)"/>
  <line class="ln-am" x1="587" y1="48" x2="587" y2="92" marker-end="url(#arr)"/>
  <text x="340" y="206" text-anchor="middle" class="t-s">Layer 7 (HTTP) filtering = WAF · Layer 3/4 floods = Shield · Instance-level allow rules = security groups</text>
</svg>
</div>
<figcaption><b>Each control stops a different attack.</b> WAF inspects HTTP requests, Shield absorbs volumetric DDoS attacks, and security groups allow only the ports you open. Firewall Manager applies them consistently across an AWS Organization.</figcaption>
</figure>

<div class="table-wrap"><table>
<thead><tr><th>Service</th><th>What it does</th><th>Key details</th></tr></thead>
<tbody>
<tr><td><strong>AWS WAF</strong></td><td>Web application firewall that filters HTTP(S) requests.</td><td>Blocks SQL injection, cross-site scripting, bad IPs, and countries; rate-based rules. Attaches to CloudFront, Application Load Balancer, API Gateway, AWS AppSync.</td></tr>
<tr><td><strong>AWS Shield Standard</strong></td><td>Automatic protection from common network and transport layer (layer 3/4) DDoS attacks.</td><td>Free for every AWS customer, always on.</td></tr>
<tr><td><strong>AWS Shield Advanced</strong></td><td>Enhanced DDoS protection for EC2, ELB, CloudFront, Global Accelerator, Route 53.</td><td>Paid subscription. 24/7 access to the Shield Response Team (SRT), DDoS cost protection (credits for scaling charges caused by an attack), advanced attack diagnostics, includes AWS WAF at no extra cost for protected resources.</td></tr>
<tr><td><strong>AWS Firewall Manager</strong></td><td>Central management of firewall rules across accounts.</td><td>Requires AWS Organizations. Applies WAF rules, Shield Advanced protections, and security group policies to new and existing resources automatically.</td></tr>
<tr><td><strong>Amazon GuardDuty</strong></td><td>Threat detection.</td><td>See lesson 2.2. It detects; it does not block traffic by itself.</td></tr>
</tbody></table></div>

<h2>Network security basics (preview of 3.5)</h2>
<ul>
  <li><strong>Security groups</strong> act as a virtual firewall for instances (and other ENIs). <em>Stateful</em>, allow rules only.</li>
  <li><strong>Network ACLs</strong> act as a firewall for subnets. <em>Stateless</em>, allow and deny rules, evaluated in number order.</li>
</ul>

<h2>Third-party security products</h2>
<p><strong>AWS Marketplace</strong> is a curated digital catalog where you can find, buy, and deploy third-party software, including firewalls, endpoint protection, SIEM, and vulnerability scanners from well-known security vendors. Billing goes through your AWS bill.</p>

<h2>Where to find AWS security information</h2>
<div class="keyterms">
  <div><b>AWS Security Center</b><span>Security overview pages, compliance, and security bulletins at aws.amazon.com/security.</span></div>
  <div><b>AWS Security Blog</b><span>Announcements, best practices, and walkthroughs from AWS security teams.</span></div>
  <div><b>AWS Knowledge Center</b><span>Answers to the most frequent questions AWS Support receives, including security how-tos.</span></div>
  <div><b>AWS re:Post</b><span>Community Q&amp;A site where AWS experts and customers answer questions.</span></div>
  <div><b>AWS Trusted Advisor</b><span>Automated checks that flag security issues: open ports in security groups, root account without MFA, public S3 buckets, exposed access keys.</span></div>
  <div><b>AWS documentation and whitepapers</b><span>Service security chapters, the Security Pillar of Well-Architected, and Best Practices for Security, Identity, and Compliance.</span></div>
</div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Protect against SQL injection or cross-site scripting” → <strong>AWS WAF</strong>.</li>
  <li>“DDoS protection at no extra cost” → <strong>Shield Standard</strong>. “24/7 DDoS response team” or “cost protection” → <strong>Shield Advanced</strong>.</li>
  <li>“Manage WAF rules across many accounts” → <strong>Firewall Manager</strong>.</li>
  <li>“Buy a third-party security tool billed through AWS” → <strong>AWS Marketplace</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/security/" target="_blank" rel="noopener">AWS Cloud Security</a> · <a href="https://aws.amazon.com/blogs/security/" target="_blank" rel="noopener">AWS Security Blog</a></li>
  <li><a href="https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html" target="_blank" rel="noopener">AWS WAF, Shield, and Firewall Manager guide</a></li>
</ul>`
}
);
