/* Domain 4 — Billing, Pricing, and Support (12%) */
window.CLF = window.CLF || {}; CLF.lessons = CLF.lessons || [];
CLF.lessons.push(
{
  id: '4.1', d: 'd4', minutes: 11,
  title: 'AWS pricing models',
  summary: 'EC2 purchasing options (On-Demand, Savings Plans, Reserved, Spot, Dedicated, Capacity Reservations), data transfer charges, storage pricing, and the Free Tier.',
  html: `
<p>Three fundamental drivers of AWS cost: <strong>compute</strong>, <strong>storage</strong>, and <strong>outbound data transfer</strong>. The general principle is pay-as-you-go, pay less when you commit, and pay less per unit as you use more.</p>

<h2>Compute purchasing options</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 690 250" role="img" aria-label="Maximum discount compared with On-Demand: On-Demand 0 percent, Compute Savings Plans up to 66 percent, EC2 Instance Savings Plans and Standard Reserved Instances up to 72 percent, Spot Instances up to 90 percent.">
  <text x="230" y="20" class="t-m">MAXIMUM DISCOUNT VS ON-DEMAND</text>
  <line class="grid-l" x1="230" y1="30" x2="230" y2="214"/>
  <line class="grid-l" x1="335" y1="30" x2="335" y2="214" stroke-dasharray="3 4"/>
  <line class="grid-l" x1="440" y1="30" x2="440" y2="214" stroke-dasharray="3 4"/>
  <line class="grid-l" x1="545" y1="30" x2="545" y2="214" stroke-dasharray="3 4"/>
  <line class="grid-l" x1="650" y1="30" x2="650" y2="214" stroke-dasharray="3 4"/>
  <text x="230" y="232" text-anchor="middle" class="t-m">0%</text><text x="335" y="232" text-anchor="middle" class="t-m">25%</text><text x="440" y="232" text-anchor="middle" class="t-m">50%</text><text x="545" y="232" text-anchor="middle" class="t-m">75%</text><text x="650" y="232" text-anchor="middle" class="t-m">100%</text>
  <text x="20" y="56" class="t-b">On-Demand</text><text x="20" y="72" class="t-s">no commitment</text>
  <rect x="230" y="50" width="3" height="22" class="fill-m"/><text x="242" y="66" class="t-s">full price, pay by the second or hour</text>
  <text x="20" y="102" class="t-b">Compute Savings Plans</text><text x="20" y="118" class="t-s">$/hour commit, 1 or 3 yrs</text>
  <rect x="230" y="96" width="277" height="22" rx="4" class="fill-d1"/><text x="515" y="112" class="t-m">up to 66%</text>
  <text x="20" y="148" class="t-b">EC2 Instance SP / RIs</text><text x="20" y="164" class="t-s">1 or 3 yrs, specific family</text>
  <rect x="230" y="142" width="302" height="22" rx="4" class="fill-d3"/><text x="540" y="158" class="t-m">up to 72%</text>
  <text x="20" y="194" class="t-b">Spot Instances</text><text x="20" y="210" class="t-s">can be interrupted</text>
  <rect x="230" y="188" width="378" height="22" rx="4" class="fill-am"/><text x="616" y="204" class="t-m">up to 90%</text>
</svg>
</div>
<figcaption><b>Commitment buys discount; interruptibility buys more.</b> Spot is the cheapest but AWS can reclaim the capacity with a two-minute warning, so it suits only fault-tolerant, flexible workloads.</figcaption>
</figure>

<div class="table-wrap"><table>
<thead><tr><th>Option</th><th>How it works</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>On-Demand</strong></td><td>Pay for compute by the second (Linux) or hour, no long-term commitment.</td><td>Short-term, spiky, or unpredictable workloads; development and testing; first-time apps.</td></tr>
<tr><td><strong>Savings Plans</strong></td><td>Commit to a consistent amount of usage ($/hour) for 1 or 3 years. <em>Compute Savings Plans</em> apply across EC2 (any family, size, Region, OS), AWS Fargate, and AWS Lambda. <em>EC2 Instance Savings Plans</em> apply to one instance family in one Region, for a bigger discount.</td><td>Steady usage where you want flexibility to change instance types or move to containers or serverless.</td></tr>
<tr><td><strong>Reserved Instances (RIs)</strong></td><td>1- or 3-year commitment to an instance configuration. <em>Standard RIs</em>: biggest discount, can modify some attributes. <em>Convertible RIs</em>: smaller discount, can exchange for different families, OS, or tenancy. Pay All Upfront, Partial Upfront, or No Upfront (more upfront = bigger discount).</td><td>Steady-state, predictable workloads such as a production database.</td></tr>
<tr><td><strong>Spot Instances</strong></td><td>Use spare EC2 capacity at up to 90% off. AWS can interrupt with a two-minute notice.</td><td>Batch jobs, data analysis, CI/CD, image rendering: anything that can stop and restart.</td></tr>
<tr><td><strong>Dedicated Hosts</strong></td><td>An entire physical server dedicated to you, with visibility of sockets and cores.</td><td><strong>Bring-your-own-license</strong> (per-socket or per-core licenses) and strict compliance.</td></tr>
<tr><td><strong>Dedicated Instances</strong></td><td>Instances run on hardware dedicated to one customer, but without host-level visibility or control.</td><td>Compliance needing single-tenant hardware, no BYOL requirement.</td></tr>
<tr><td><strong>On-Demand Capacity Reservations</strong></td><td>Reserve capacity in a specific AZ for any duration, no term commitment. Billed at the On-Demand rate whether used or not; combine with Savings Plans or regional RIs for a discount.</td><td>Guaranteeing capacity for a critical event or disaster recovery.</td></tr>
</tbody></table></div>

<h3>Reserved Instance flexibility and AWS Organizations</h3>
<ul>
  <li><strong>Regional RIs</strong> apply the discount to any AZ in the Region and, for Linux, to any size within the same instance family (<em>instance size flexibility</em>). They do not reserve capacity.</li>
  <li><strong>Zonal RIs</strong> apply to one AZ and also <strong>reserve capacity</strong> there.</li>
  <li>In an AWS Organization with consolidated billing, <strong>RI and Savings Plans discounts are shared</strong> across all accounts by default: if the purchasing account does not use them, another account's matching usage gets the discount. The management account can turn sharing off.</li>
  <li>Standard RIs you no longer need can be sold on the <strong>Reserved Instance Marketplace</strong>.</li>
</ul>

<h2>Data transfer costs</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 250" role="img" aria-label="Data transfer pricing. Data in from the internet is free. Data out to the internet is charged. Data between Regions is charged. Data between Availability Zones is charged at a lower rate. Data within the same Availability Zone over private IP is free.">
  <rect class="bx-w" x="20" y="96" width="110" height="56" rx="8"/><text x="75" y="129" text-anchor="middle" class="t-b">Internet</text>
  <rect class="bx-a" x="210" y="20" width="270" height="212" rx="14" style="fill-opacity:.3"/>
  <text x="224" y="42" class="t-b">Region A</text>
  <rect class="bx-w" x="226" y="56" width="110" height="80" rx="8"/><text x="281" y="78" text-anchor="middle" class="t-s">AZ 1</text>
  <rect class="bx" x="238" y="88" width="40" height="30" rx="4"/><text x="258" y="108" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <rect class="bx" x="286" y="88" width="40" height="30" rx="4"/><text x="306" y="108" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <rect class="bx-w" x="354" y="56" width="110" height="80" rx="8"/><text x="409" y="78" text-anchor="middle" class="t-s">AZ 2</text>
  <rect class="bx" x="389" y="88" width="40" height="30" rx="4"/><text x="409" y="108" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <line class="ln-g" x1="278" y1="103" x2="284" y2="103"/>
  <text x="281" y="154" text-anchor="middle" class="t-s" style="fill:var(--good)">same AZ, private IP:</text><text x="281" y="168" text-anchor="middle" class="t-s" style="fill:var(--good)">free</text>
  <line class="ln-am" x1="336" y1="103" x2="385" y2="103" marker-end="url(#arr)" marker-start="url(#arr)"/>
  <text x="409" y="154" text-anchor="middle" class="t-s" style="fill:var(--amber)">across AZs:</text><text x="409" y="168" text-anchor="middle" class="t-s" style="fill:var(--amber)">charged per GB</text>
  <line class="ln-g" x1="134" y1="112" x2="222" y2="112" marker-end="url(#arr)"/>
  <text x="178" y="104" text-anchor="middle" class="t-s" style="fill:var(--good)">in: free</text>
  <line class="ln-r" x1="222" y1="140" x2="134" y2="140" marker-end="url(#arr)"/>
  <text x="178" y="160" text-anchor="middle" class="t-s" style="fill:var(--bad)">out: charged</text>
  <rect class="bx-w" x="550" y="96" width="94" height="56" rx="8"/><text x="597" y="122" text-anchor="middle" class="t-b">Region B</text><text x="597" y="140" text-anchor="middle" class="t-s">another Region</text>
  <line class="ln-r" x1="484" y1="124" x2="544" y2="124" marker-end="url(#arr)"/>
  <text x="514" y="114" text-anchor="middle" class="t-s" style="fill:var(--bad)">charged</text>
  <text x="345" y="214" text-anchor="middle" class="t-s">CloudFront can reduce internet egress cost; Direct Connect lowers transfer-out rates</text>
</svg>
</div>
<figcaption><b>In is free, out costs money.</b> Data coming into AWS from the internet is free. Data going out to the internet and between Regions is charged per GB. Traffic between AZs has a small charge; traffic within one AZ over private IP addresses is free.</figcaption>
</figure>

<h2>Storage pricing</h2>
<ul>
  <li><strong>Amazon S3:</strong> pay per GB-month stored (depends on storage class), per request (PUT, GET), for retrievals from infrequent-access and archive classes, and for data transfer out. Colder classes = cheaper storage, costlier access, and minimum storage durations.</li>
  <li><strong>Amazon EBS:</strong> pay for the <em>provisioned</em> size per GB-month (plus provisioned IOPS/throughput for some types) whether you use it or not; snapshots billed per GB stored.</li>
  <li><strong>Amazon EFS:</strong> pay for the storage you <em>actually use</em>; no pre-provisioning.</li>
</ul>

<h2>AWS Free Tier</h2>
<p>Accounts created on or after July 15, 2025 choose a <strong>free plan</strong> (no charges for up to 6 months or until credits run out) or a <strong>paid plan</strong>. New customers get USD $100 in credits at sign-up and can earn up to $100 more by completing activities. Some services also have <strong>always-free</strong> offers, such as 1 million AWS Lambda requests per month and 25 GB of Amazon DynamoDB storage. Older accounts stay on the legacy 12-month Free Tier.</p>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Steady, predictable, 24/7 for 1–3 years” → <strong>Reserved Instances</strong> or <strong>Savings Plans</strong>. Need flexibility across EC2, Fargate, Lambda → <strong>Compute Savings Plans</strong>.</li>
  <li>“Can tolerate interruptions, lowest cost” → <strong>Spot</strong>. “Short-term, cannot be interrupted, unpredictable” → <strong>On-Demand</strong>.</li>
  <li>“Existing per-socket licenses” → <strong>Dedicated Hosts</strong>. “Guarantee capacity in an AZ without a long commitment” → <strong>Capacity Reservations</strong>.</li>
  <li>Data <strong>into</strong> AWS is free; data <strong>out</strong> to the internet is charged.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/ec2/pricing/" target="_blank" rel="noopener">Amazon EC2 pricing</a> · <a href="https://aws.amazon.com/savingsplans/" target="_blank" rel="noopener">Savings Plans</a></li>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/how-aws-pricing-works.html" target="_blank" rel="noopener">How AWS Pricing Works (whitepaper)</a></li>
  <li><a href="https://aws.amazon.com/free/" target="_blank" rel="noopener">AWS Free Tier</a></li>
</ul>`
},
{
  id: '4.2', d: 'd4', minutes: 9,
  title: 'Billing, budgets, and cost management',
  summary: 'Pricing Calculator, Budgets, Cost Explorer, Cost and Usage Reports, cost allocation tags, and AWS Organizations consolidated billing.',
  html: `
<h2>The right tool for each moment</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 210" role="img" aria-label="Cost tools across time. Before you build: AWS Pricing Calculator estimates cost. While running: AWS Budgets alerts when actual or forecast spend crosses a threshold. After the fact: AWS Cost Explorer visualizes and analyzes past costs and forecasts, and AWS Cost and Usage Reports give the most detailed line-item data.">
  <line class="ln" x1="20" y1="40" x2="660" y2="40" marker-end="url(#arr)"/>
  <text x="110" y="28" text-anchor="middle" class="t-m">BEFORE YOU BUILD</text>
  <text x="340" y="28" text-anchor="middle" class="t-m">WHILE IT RUNS</text>
  <text x="565" y="28" text-anchor="middle" class="t-m">AFTER THE FACT</text>
  <rect class="bx-d1" x="20" y="60" width="180" height="120" rx="10"/>
  <text x="110" y="86" text-anchor="middle" class="t-b">Pricing Calculator</text>
  <text x="110" y="110" text-anchor="middle" class="t-s">Estimate the monthly</text><text x="110" y="124" text-anchor="middle" class="t-s">cost of an architecture</text><text x="110" y="138" text-anchor="middle" class="t-s">you haven't built yet</text>
  <text x="110" y="164" text-anchor="middle" class="t-m">“HOW MUCH WILL IT COST?”</text>
  <rect class="bx-am" x="250" y="60" width="180" height="120" rx="10"/>
  <text x="340" y="86" text-anchor="middle" class="t-b">AWS Budgets</text>
  <text x="340" y="110" text-anchor="middle" class="t-s">Alert when actual or</text><text x="340" y="124" text-anchor="middle" class="t-s">forecast cost or usage</text><text x="340" y="138" text-anchor="middle" class="t-s">passes a threshold</text>
  <text x="340" y="164" text-anchor="middle" class="t-m">“TELL ME BEFORE I OVERSPEND”</text>
  <rect class="bx-d3" x="480" y="60" width="180" height="56" rx="10"/>
  <text x="570" y="82" text-anchor="middle" class="t-b">Cost Explorer</text>
  <text x="570" y="100" text-anchor="middle" class="t-s">charts, filters, forecast</text>
  <rect class="bx-d3" x="480" y="124" width="180" height="56" rx="10"/>
  <text x="570" y="146" text-anchor="middle" class="t-b">Cost and Usage Reports</text>
  <text x="570" y="164" text-anchor="middle" class="t-s">most detailed, hourly, to S3</text>
</svg>
</div>
<figcaption><b>Estimate, alert, analyze.</b> The Pricing Calculator works without an AWS account. Budgets is the only one that warns you proactively. Cost Explorer is for visual analysis; the Cost and Usage Report is raw data for deep analysis with Athena or Quick Sight.</figcaption>
</figure>

<div class="keyterms">
  <div><b>AWS Pricing Calculator</b><span>Free web tool to model and estimate costs for planned use cases, export estimates, and compare options.</span></div>
  <div><b>AWS Budgets</b><span>Set custom cost, usage, RI, or Savings Plans budgets. Get email or SNS alerts on actual or forecasted values; budget actions can apply IAM policies or stop instances automatically.</span></div>
  <div><b>AWS Cost Explorer</b><span>Visualize, understand, and manage costs and usage over time with filters (service, account, tag, Region), forecasts, and RI/Savings Plans and rightsizing recommendations.</span></div>
  <div><b>AWS Cost and Usage Reports (CUR)</b><span>The most comprehensive cost data: line items by hour or day, with resource IDs and tags, delivered to an S3 bucket (now through AWS Data Exports).</span></div>
  <div><b>Billing and Cost Management console</b><span>Bills, payments, invoices, Free Tier usage, and cost allocation tag settings. Billing questions can always be raised with AWS Support at no charge.</span></div>
  <div><b>AWS Cost Anomaly Detection</b><span>Machine-learning monitoring that alerts you to unusual spend spikes.</span></div>
</div>

<h2>Cost allocation tags</h2>
<p>A <strong>tag</strong> is a key-value label on a resource, such as <code>Project=checkout</code> or <code>CostCenter=1234</code>. To use tags for billing, <strong>activate them as cost allocation tags</strong> in the Billing console; they then appear as columns in Cost Explorer and the Cost and Usage Report.</p>
<ul>
  <li><strong>AWS-generated tags</strong> (prefix <code>aws:</code>, such as <code>aws:createdBy</code>) are created by AWS.</li>
  <li><strong>User-defined tags</strong> are created by you.</li>
  <li>Tags are not retroactive: they apply to costs from the time they are activated.</li>
</ul>

<h2>AWS Organizations and consolidated billing</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 240" role="img" aria-label="AWS Organizations: a management account pays one consolidated bill for member accounts grouped into organizational units. Usage is combined for volume discounts and Reserved Instance and Savings Plans sharing. Service control policies limit permissions in member accounts.">
  <rect class="bx-a" x="230" y="14" width="200" height="56" rx="10"/><text x="330" y="38" text-anchor="middle" class="t-b">Management account</text><text x="330" y="56" text-anchor="middle" class="t-s">pays one consolidated bill</text>
  <path class="ln" d="M330 70 V92 H140 V108" marker-end="url(#arr)"/>
  <path class="ln" d="M330 92 H520 V108" marker-end="url(#arr)"/>
  <rect class="dash" x="40" y="112" width="200" height="110" rx="10"/><text x="140" y="132" text-anchor="middle" class="t-m">OU: PRODUCTION</text>
  <rect class="bx-w" x="56" y="144" width="80" height="32" rx="6"/><text x="96" y="165" text-anchor="middle" class="t-s" style="fill:currentColor">Shop</text>
  <rect class="bx-w" x="144" y="144" width="80" height="32" rx="6"/><text x="184" y="165" text-anchor="middle" class="t-s" style="fill:currentColor">Payments</text>
  <rect class="bx-am" x="56" y="186" width="168" height="26" rx="6"/><text x="140" y="203" text-anchor="middle" class="t-s" style="fill:currentColor">SCP: deny leaving the org</text>
  <rect class="dash" x="420" y="112" width="200" height="110" rx="10"/><text x="520" y="132" text-anchor="middle" class="t-m">OU: SANDBOX</text>
  <rect class="bx-w" x="436" y="144" width="80" height="32" rx="6"/><text x="476" y="165" text-anchor="middle" class="t-s" style="fill:currentColor">Dev A</text>
  <rect class="bx-w" x="524" y="144" width="80" height="32" rx="6"/><text x="564" y="165" text-anchor="middle" class="t-s" style="fill:currentColor">Dev B</text>
  <rect class="bx-am" x="436" y="186" width="168" height="26" rx="6"/><text x="520" y="203" text-anchor="middle" class="t-s" style="fill:currentColor">SCP: allow 2 Regions only</text>
  <text x="330" y="150" text-anchor="middle" class="t-s">combined usage →</text>
  <text x="330" y="166" text-anchor="middle" class="t-s">volume pricing tiers,</text>
  <text x="330" y="182" text-anchor="middle" class="t-s">shared RI / SP discounts</text>
</svg>
</div>
<figcaption><b>One payer, many accounts, central guardrails.</b> Consolidated billing combines usage to reach volume discounts sooner, and service control policies (SCPs) set the maximum permissions for member accounts.</figcaption>
</figure>
<ul>
  <li><strong>Consolidated billing:</strong> one bill for all accounts, combined usage for volume pricing tiers (for example, S3 storage tiers), shared RI and Savings Plans discounts, and no extra cost.</li>
  <li><strong>Cost allocation:</strong> each member account's charges are still visible separately; tags and accounts let you charge costs back to teams.</li>
  <li><strong>Service control policies (SCPs):</strong> guardrails that limit what IAM users and roles (including the root user) in member accounts can do.</li>
  <li><strong>AWS Control Tower</strong> sets up and governs a secure multi-account environment (a landing zone) on top of Organizations, using best-practice guardrails.</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Estimate costs before migrating” → <strong>Pricing Calculator</strong>. “Alert when spend will exceed $X” → <strong>Budgets</strong>.</li>
  <li>“Visualize costs over the past months, by service” → <strong>Cost Explorer</strong>. “Most granular billing data” → <strong>Cost and Usage Report</strong>.</li>
  <li>“Track costs by department or project” → <strong>cost allocation tags</strong> (activated in the Billing console).</li>
  <li>“One bill and volume discounts for many accounts” → <strong>AWS Organizations consolidated billing</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/aws-cost-management/" target="_blank" rel="noopener">AWS Cloud Financial Management</a></li>
  <li><a href="https://calculator.aws/" target="_blank" rel="noopener">AWS Pricing Calculator</a></li>
  <li><a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html" target="_blank" rel="noopener">Using cost allocation tags</a></li>
</ul>`
},
{
  id: '4.3', d: 'd4', minutes: 11,
  title: 'Technical resources and AWS Support',
  summary: 'The current AWS Support plans, Trusted Advisor, AWS Health, the Trust and Safety team, AWS Partners and Marketplace, and where to find documentation and help.',
  html: `
<div class="callout new"><b>Changed in 2025–2026</b>
<p>In December 2025 AWS replaced its support lineup. The exam guide (v1.3) now lists <strong>Basic, AWS Business Support+, AWS Enterprise Support, and AWS Unified Operations</strong>. The older Developer, Business, and Enterprise On-Ramp plans stopped being sold to new customers and are discontinued on January 1, 2027. Older practice material may still mention them; see the note at the end of this lesson.</p></div>

<h2>AWS Support plans</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 240" role="img" aria-label="Fastest response time for a critical, business-system-down case: Basic, no technical support cases; Business Support+ under 30 minutes; Enterprise Support under 15 minutes; Unified Operations under 5 minutes.">
  <text x="20" y="22" class="t-m">FASTEST RESPONSE FOR A CRITICAL CASE (BUSINESS SYSTEM DOWN)</text>
  <text x="20" y="62" class="t-b">Basic</text><text x="20" y="78" class="t-s">free, every account</text>
  <rect x="220" y="52" width="420" height="26" rx="5" class="bx"/><text x="234" y="70" class="t-s">No technical support cases (account and billing help only)</text>
  <text x="20" y="112" class="t-b">Business Support+</text><text x="20" y="128" class="t-s">from $29/month</text>
  <rect x="220" y="102" width="300" height="26" rx="5" class="fill-d1"/><text x="530" y="120" class="t-m">&lt; 30 min</text>
  <text x="20" y="162" class="t-b">Enterprise Support</text><text x="20" y="178" class="t-s">from $5,000/month</text>
  <rect x="220" y="152" width="150" height="26" rx="5" class="fill-d3"/><text x="380" y="170" class="t-m">&lt; 15 min</text>
  <text x="20" y="212" class="t-b">Unified Operations</text><text x="20" y="228" class="t-s">from $50,000/month</text>
  <rect x="220" y="202" width="50" height="26" rx="5" class="fill-d2"/><text x="280" y="220" class="t-m">&lt; 5 min</text>
</svg>
</div>
<figcaption><b>Shorter bar, faster help.</b> Higher tiers add faster critical response, a designated Technical Account Manager, and proactive operations services. Prices are monthly minimums; above them, the fee is a percentage of AWS usage.</figcaption>
</figure>

<div class="table-wrap"><table>
<thead><tr><th>Plan</th><th>Who it suits</th><th>Highlights</th></tr></thead>
<tbody>
<tr><td><strong>Basic</strong> (included, free)</td><td>Every AWS account</td><td>24/7 customer service for account and billing questions and service quota increases; documentation, whitepapers, AWS re:Post; <strong>core</strong> Trusted Advisor checks; AWS Health Dashboard. No technical support cases.</td></tr>
<tr><td><strong>AWS Business Support+</strong> (from $29/month per account, or a % of usage)</td><td>Production workloads, startups, small and mid-sized businesses</td><td>24/7 phone, web, and chat access to Cloud Support Engineers; critical (business system down) response &lt; 30 minutes, production system down &lt; 1 hour; <strong>full</strong> set of Trusted Advisor checks; AI-powered troubleshooting and cost recommendations; 24/7 billing support.</td></tr>
<tr><td><strong>AWS Enterprise Support</strong> (from $5,000/month)</td><td>Business-critical and mission-critical workloads</td><td>Critical response &lt; 15 minutes; a <strong>designated Technical Account Manager (TAM)</strong> for proactive guidance, Well-Architected reviews, and AWS Countdown event support; Trusted Advisor Priority; AWS Health API; security incident response support.</td></tr>
<tr><td><strong>AWS Unified Operations</strong> (from $50,000/month)</td><td>Large enterprises with the most critical operations</td><td>Critical response &lt; 5 minutes from incident management engineers; designated TAM plus domain specialist engineers; 24/7 workload monitoring; Infrastructure Event Management; AWS Incident Detection and Response and AWS Countdown Premium included.</td></tr>
</tbody></table></div>
<p>Open and track cases in the <strong>AWS Support Center</strong> in the console. Support plans can be changed by the root user or by IAM principals with support-plan permissions. (Older study material calls this a root-only task; the current AWS list of root-only tasks no longer includes it.)</p>

<h2>AWS Trusted Advisor</h2>
<p>Trusted Advisor inspects your account and recommends improvements in <strong>cost optimization, performance, security, fault tolerance, service limits (quotas), and operational excellence</strong>. Examples: idle load balancers, underused EC2 instances, security groups open to 0.0.0.0/0 on sensitive ports, root user without MFA, S3 buckets with open access, service quotas near their limit.</p>
<ul>
  <li><strong>Basic Support</strong>: core security checks and service quota checks.</li>
  <li><strong>Business Support+ and higher</strong>: the full set of checks, plus API access and integration with Security Hub.</li>
</ul>

<h2>AWS Health</h2>
<ul>
  <li><strong>AWS Health Dashboard</strong>: shows the general status of AWS services <em>and</em> a personalized view of events affecting <em>your</em> resources (for example, scheduled maintenance on an instance you run), with remediation guidance.</li>
  <li><strong>AWS Health API</strong>: programmatic access to the same personalized events, so you can automate responses. Available with higher support plans.</li>
</ul>

<h2>Reporting abuse: AWS Trust and Safety</h2>
<p>If AWS resources are used for abuse (spam, port scanning, denial-of-service attacks, phishing, hosting malware, copyright infringement), report it to the <strong>AWS Trust and Safety team</strong> using the abuse report form (or abuse@amazonaws.com). This is the answer even if the abusive resource is not in your account.</p>

<h2>AWS Partners and AWS Marketplace</h2>
<div class="keyterms">
  <div><b>AWS Partner Network (APN)</b><span>Global community of partners that build on AWS. Two main types: <strong>independent software vendors (ISVs)</strong> that sell software, and <strong>system integrators / consulting partners</strong> that help customers design, migrate, and manage workloads.</span></div>
  <div><b>Partner benefits</b><span>Partner training and certification, partner events, funding and go-to-market programs, and partner volume discounts, among others.</span></div>
  <div><b>AWS Marketplace</b><span>Digital catalog of thousands of third-party software listings, data products, and professional services. Key features: flexible pricing (free trial, hourly, annual, BYOL), private offers, consolidated billing on your AWS bill, <strong>cost management</strong>, and <strong>governance and entitlement</strong> controls over who can buy what.</span></div>
  <div><b>AWS Professional Services</b><span>AWS's own consulting team that works with your staff and partners on large migrations and transformations.</span></div>
  <div><b>AWS solutions architects</b><span>AWS technical experts who help customers design architectures that follow best practices.</span></div>
</div>

<h2>Where to find technical information</h2>
<div class="table-wrap"><table>
<thead><tr><th>Resource</th><th>What you find there</th></tr></thead>
<tbody>
<tr><td><strong>AWS documentation</strong> (docs.aws.amazon.com)</td><td>User guides, API references, tutorials for every service</td></tr>
<tr><td><strong>AWS whitepapers and guides</strong></td><td>Authoritative technical content: Well-Architected Framework, Overview of AWS, security best practices</td></tr>
<tr><td><strong>AWS Prescriptive Guidance</strong></td><td>Strategies, guides, and step-by-step patterns for migration and modernization</td></tr>
<tr><td><strong>AWS Knowledge Center</strong></td><td>Answers to the questions AWS Support receives most often</td></tr>
<tr><td><strong>AWS re:Post</strong></td><td>Community question-and-answer service with AWS experts; Basic Support customers get help here</td></tr>
<tr><td><strong>AWS Blogs</strong></td><td>Announcements, deep dives, and best practices by AWS teams</td></tr>
<tr><td><strong>AWS Skill Builder and AWS Training</strong></td><td>Digital and classroom training, including exam preparation</td></tr>
</tbody></table></div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Designated Technical Account Manager” → <strong>Enterprise Support</strong> or <strong>Unified Operations</strong>. Fastest (&lt; 5 min) critical response → <strong>Unified Operations</strong>.</li>
  <li>“Cheapest plan with 24/7 phone/chat access to engineers” → <strong>Business Support+</strong>.</li>
  <li>“Report an AWS resource sending spam or attacking you” → <strong>AWS Trust and Safety</strong>.</li>
  <li>“Find a consulting partner to help migrate” → <strong>AWS Partner Network</strong> (system integrator). “Buy third-party software billed through AWS” → <strong>AWS Marketplace</strong>.</li>
  <li>“See events affecting my specific resources” → <strong>AWS Health Dashboard</strong>.</li>
</ul></div>
<div class="callout trap"><b>If you see older practice questions</b>
<p>Before December 2025 the plans were Basic, Developer (business-hours email, 12-hour impaired-system response), Business (from $100/month, &lt; 1 hour for production system down, full Trusted Advisor), Enterprise On-Ramp (from $5,500/month, &lt; 30 minutes business-critical, a pool of TAMs), and Enterprise (from $15,000/month, &lt; 15 minutes, designated TAM, Concierge billing team). The TAM-and-15-minutes link for Enterprise still holds; prices and plan names have changed.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/premiumsupport/plans/" target="_blank" rel="noopener">Compare AWS Support plans</a></li>
  <li><a href="https://docs.aws.amazon.com/awssupport/latest/user/support-plans-eos.html" target="_blank" rel="noopener">Developer, Business, and Enterprise On-Ramp end of support</a></li>
  <li><a href="https://aws.amazon.com/premiumsupport/technology/trusted-advisor/" target="_blank" rel="noopener">AWS Trusted Advisor</a> · <a href="https://repost.aws/" target="_blank" rel="noopener">AWS re:Post</a></li>
</ul>`
}
);
