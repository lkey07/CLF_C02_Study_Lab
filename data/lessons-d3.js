/* Domain 3 — Cloud Technology and Services (34%) */
window.CLF = window.CLF || {}; CLF.lessons = CLF.lessons || [];
CLF.lessons.push(
{
  id: '3.1', d: 'd3', minutes: 8,
  title: 'Deploying and operating in the AWS Cloud',
  summary: 'Console, CLI, SDKs, APIs, and infrastructure as code; one-time versus repeatable operations; cloud, hybrid, and on-premises deployment models.',
  html: `
<h2>Every path leads to the same API</h2>
<p>Whatever tool you use, it ends up calling the AWS service APIs. The tools differ in who they suit and how repeatable they are.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 250" role="img" aria-label="The AWS Management Console, AWS CLI, AWS SDKs, and infrastructure as code with AWS CloudFormation all send requests to the AWS service APIs, which create and manage resources.">
  <rect class="bx-w" x="20" y="16" width="200" height="46" rx="8"/><text x="120" y="36" text-anchor="middle" class="t-b">Management Console</text><text x="120" y="52" text-anchor="middle" class="t-s">web UI · clicks</text>
  <rect class="bx-w" x="20" y="72" width="200" height="46" rx="8"/><text x="120" y="92" text-anchor="middle" class="t-b">AWS CLI</text><text x="120" y="108" text-anchor="middle" class="t-s">commands and scripts</text>
  <rect class="bx-w" x="20" y="128" width="200" height="46" rx="8"/><text x="120" y="148" text-anchor="middle" class="t-b">AWS SDKs</text><text x="120" y="164" text-anchor="middle" class="t-s">Python, Java, JS, .NET…</text>
  <rect class="bx-a" x="20" y="184" width="200" height="46" rx="8"/><text x="120" y="204" text-anchor="middle" class="t-b">Infrastructure as code</text><text x="120" y="220" text-anchor="middle" class="t-s">AWS CloudFormation templates</text>
  <line class="ln" x1="224" y1="39" x2="300" y2="112" marker-end="url(#arr)"/>
  <line class="ln" x1="224" y1="95" x2="300" y2="118" marker-end="url(#arr)"/>
  <line class="ln" x1="224" y1="151" x2="300" y2="128" marker-end="url(#arr)"/>
  <line class="ln-a" x1="224" y1="207" x2="300" y2="134" marker-end="url(#arr-acc)"/>
  <text x="262" y="72" text-anchor="middle" class="t-s">HTTPS API</text><text x="262" y="84" text-anchor="middle" class="t-s">requests</text>
  <rect class="bx-d3" x="306" y="86" width="140" height="70" rx="10"/><text x="376" y="116" text-anchor="middle" class="t-h">AWS APIs</text><text x="376" y="136" text-anchor="middle" class="t-s">authenticated by IAM</text>
  <line class="ln" x1="450" y1="121" x2="494" y2="121" marker-end="url(#arr)"/>
  <rect class="bx-w" x="500" y="56" width="140" height="130" rx="10"/>
  <text x="570" y="82" text-anchor="middle" class="t-b">Resources</text>
  <text x="570" y="106" text-anchor="middle" class="t-s">EC2 instances</text>
  <text x="570" y="122" text-anchor="middle" class="t-s">S3 buckets</text>
  <text x="570" y="138" text-anchor="middle" class="t-s">VPCs, databases</text>
  <text x="570" y="154" text-anchor="middle" class="t-s">…</text>
</svg>
</div>
<figcaption><b>Same API, different ergonomics.</b> The console is easiest for one-off exploration; the CLI and SDKs are programmatic; infrastructure as code describes whole environments in a file so they can be recreated identically.</figcaption>
</figure>

<div class="table-wrap"><table>
<thead><tr><th>Method</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>AWS Management Console</strong></td><td>Learning, visual exploration, one-time tasks. Also available as the AWS Console Mobile Application for monitoring on the go.</td></tr>
<tr><td><strong>AWS CLI</strong></td><td>Scripting and automating repetitive tasks from a terminal. Uses access keys or IAM Identity Center credentials.</td></tr>
<tr><td><strong>AWS SDKs</strong></td><td>Calling AWS from your application code in a supported programming language.</td></tr>
<tr><td><strong>Infrastructure as code (IaC)</strong></td><td>Repeatable, version-controlled environments. <strong>AWS CloudFormation</strong> provisions a whole stack from a JSON or YAML template, in any account and Region, consistently.</td></tr>
</tbody></table></div>

<h2>One-time operations versus repeatable processes</h2>
<ul>
  <li>A quick test or a single change can be done in the console.</li>
  <li>Anything you will do again (new environments, disaster recovery, multiple Regions, compliance-controlled builds) should be <strong>automated</strong> with IaC or scripts. Automation removes human error and makes environments identical.</li>
  <li><strong>AWS Elastic Beanstalk</strong> deploys web applications: you upload code, and it provisions and manages capacity, load balancing, scaling, and health monitoring for you.</li>
  <li><strong>AWS Systems Manager</strong> operates fleets of servers at scale: patching, running commands, session access without SSH keys, and storing parameters.</li>
</ul>

<h2>Cloud deployment models</h2>
<div class="keyterms">
  <div><b>Cloud (cloud-native / all-in)</b><span>All parts of the application run in the cloud. Built on cloud services or migrated fully.</span></div>
  <div><b>Hybrid</b><span>Connects cloud resources with on-premises infrastructure, for example via AWS Direct Connect or VPN, or by running AWS infrastructure on premises with <strong>AWS Outposts</strong>.</span></div>
  <div><b>On-premises (private cloud)</b><span>Resources deployed in your own data center using virtualization and resource management tools.</span></div>
</div>

<h2>Cloud service models</h2>
<div class="table-wrap"><table>
<thead><tr><th>Model</th><th>You manage</th><th>AWS example</th></tr></thead>
<tbody>
<tr><td><strong>IaaS</strong> (infrastructure as a service)</td><td>OS, runtime, applications, data</td><td>Amazon EC2, Amazon VPC, Amazon EBS</td></tr>
<tr><td><strong>PaaS</strong> (platform as a service)</td><td>Applications and data only</td><td>AWS Elastic Beanstalk, Amazon RDS</td></tr>
<tr><td><strong>SaaS</strong> (software as a service)</td><td>Just your use of the product</td><td>Amazon Connect, Amazon WorkSpaces, third-party SaaS in AWS Marketplace</td></tr>
</tbody></table></div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Provision identical environments repeatedly” or “infrastructure as code” → <strong>AWS CloudFormation</strong>.</li>
  <li>“Developer just uploads code; AWS handles capacity, load balancing, scaling” → <strong>Elastic Beanstalk</strong>.</li>
  <li>“Run AWS services in the customer's own data center” → <strong>AWS Outposts</strong> (hybrid).</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html" target="_blank" rel="noopener">Types of cloud computing</a></li>
  <li><a href="https://aws.amazon.com/cloudformation/" target="_blank" rel="noopener">AWS CloudFormation</a></li>
</ul>`
},
{
  id: '3.2', d: 'd3', minutes: 8,
  title: 'AWS global infrastructure',
  summary: 'Regions, Availability Zones, and edge locations; high availability with multiple AZs; when to use multiple Regions.',
  html: `
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 290" role="img" aria-label="An AWS Region contains three or more isolated Availability Zones, each made of one or more data centers, linked by low-latency private networking. Edge locations outside the Region cache content close to users.">
  <rect class="bx-a" x="20" y="20" width="430" height="250" rx="14" style="fill-opacity:.35"/>
  <text x="36" y="44" class="t-h">Region</text><text x="104" y="44" class="t-s">e.g. ap-southeast-1 (Singapore)</text>
  <g>
    <rect class="bx-w" x="40" y="64" width="120" height="156" rx="10"/><text x="100" y="86" text-anchor="middle" class="t-b">AZ a</text>
    <rect class="bx" x="56" y="98" width="88" height="34" rx="5"/><text x="100" y="120" text-anchor="middle" class="t-s">Data center</text>
    <rect class="bx" x="56" y="140" width="88" height="34" rx="5"/><text x="100" y="162" text-anchor="middle" class="t-s">Data center</text>
    <text x="100" y="202" text-anchor="middle" class="t-s">own power, network</text>
  </g>
  <g>
    <rect class="bx-w" x="175" y="64" width="120" height="156" rx="10"/><text x="235" y="86" text-anchor="middle" class="t-b">AZ b</text>
    <rect class="bx" x="191" y="98" width="88" height="34" rx="5"/><text x="235" y="120" text-anchor="middle" class="t-s">Data center</text>
    <text x="235" y="202" text-anchor="middle" class="t-s">own power, network</text>
  </g>
  <g>
    <rect class="bx-w" x="310" y="64" width="120" height="156" rx="10"/><text x="370" y="86" text-anchor="middle" class="t-b">AZ c</text>
    <rect class="bx" x="326" y="98" width="88" height="34" rx="5"/><text x="370" y="120" text-anchor="middle" class="t-s">Data center</text>
    <rect class="bx" x="326" y="140" width="88" height="34" rx="5"/><text x="370" y="162" text-anchor="middle" class="t-s">Data center</text>
    <text x="370" y="202" text-anchor="middle" class="t-s">own power, network</text>
  </g>
  <line class="ln-a" x1="160" y1="240" x2="175" y2="240"/>
  <line class="ln-a" x1="100" y1="220" x2="100" y2="240"/><line class="ln-a" x1="235" y1="220" x2="235" y2="240"/><line class="ln-a" x1="370" y1="220" x2="370" y2="240"/>
  <line class="ln-a" x1="100" y1="240" x2="370" y2="240"/>
  <text x="235" y="258" text-anchor="middle" class="t-s">redundant, low-latency private links between AZs</text>
  <g>
    <circle cx="530" cy="70" r="8" class="fill-am"/><text x="546" y="74" class="t-s" style="fill:currentColor">Edge location</text>
    <circle cx="590" cy="130" r="8" class="fill-am"/><text x="560" y="154" class="t-s" style="fill:currentColor">Edge location</text>
    <circle cx="515" cy="200" r="8" class="fill-am"/><text x="531" y="204" class="t-s" style="fill:currentColor">Edge location</text>
    <line class="ln-am" x1="456" y1="110" x2="520" y2="74" stroke-dasharray="4 4"/>
    <line class="ln-am" x1="456" y1="160" x2="580" y2="132" stroke-dasharray="4 4"/>
    <line class="ln-am" x1="456" y1="200" x2="505" y2="200" stroke-dasharray="4 4"/>
    <text x="545" y="246" text-anchor="middle" class="t-s">CloudFront · Route 53</text>
    <text x="545" y="260" text-anchor="middle" class="t-s">close to end users</text>
  </g>
</svg>
</div>
<figcaption><b>Region ⊃ Availability Zones ⊃ data centers.</b> AZs are physically separate (meaningful distance apart, separate power and networking) so they do not share single points of failure, but close enough for synchronous replication. Edge locations sit in many more cities than Regions.</figcaption>
</figure>

<div class="keyterms">
  <div><b>Region</b><span>A separate geographic area (for example, Frankfurt or Tokyo). Each Region is isolated from the others and has at least three Availability Zones. Data does not leave a Region unless you move it.</span></div>
  <div><b>Availability Zone (AZ)</b><span>One or more discrete data centers with redundant power, networking, and connectivity within a Region. Named like us-east-1a.</span></div>
  <div><b>Edge location</b><span>A site used by Amazon CloudFront, Route 53, and AWS Global Accelerator to serve users with lower latency. Far more numerous than Regions.</span></div>
  <div><b>Local Zones and Outposts</b><span>Local Zones put compute close to large cities for single-digit-millisecond latency. AWS Outposts brings AWS racks into your own data center.</span></div>
</div>

<h2>High availability with multiple AZs</h2>
<p>Because AZs are isolated, deploying across <strong>at least two AZs</strong> keeps an application running if one AZ has a problem. Typical pattern: an Elastic Load Balancer spreads traffic to EC2 instances in two or more AZs, and Amazon RDS Multi-AZ keeps a standby database in another AZ.</p>

<h2>How to choose a Region</h2>
<ol>
  <li><strong>Compliance and data sovereignty:</strong> laws may require data to stay in a country.</li>
  <li><strong>Proximity to users:</strong> lower latency.</li>
  <li><strong>Service availability:</strong> not every service or feature is in every Region.</li>
  <li><strong>Pricing:</strong> prices differ between Regions.</li>
</ol>

<h2>When to use multiple Regions</h2>
<ul>
  <li><strong>Disaster recovery and business continuity:</strong> survive the loss of an entire Region.</li>
  <li><strong>Low latency for global users:</strong> serve each geography from a nearby Region.</li>
  <li><strong>Data sovereignty:</strong> keep each country's data in that country.</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“High availability” for one application → <strong>multiple AZs</strong>. “Disaster recovery from a regional outage” → <strong>multiple Regions</strong>.</li>
  <li>“Cache content close to users” → <strong>edge locations</strong> (CloudFront).</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>An AZ is <strong>not</strong> a single data center (it can be several), and a Region is <strong>not</strong> an edge location. Some services are global (IAM, Route 53, CloudFront), but most resources such as EC2 instances are created in a specific Region.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/about-aws/global-infrastructure/" target="_blank" rel="noopener">AWS Global Infrastructure</a></li>
</ul>`
},
{
  id: '3.3', d: 'd3', minutes: 11,
  title: 'Compute services',
  summary: 'EC2 instance families, containers (ECS, EKS, ECR, Fargate), serverless with Lambda, plus Auto Scaling and Elastic Load Balancing.',
  html: `
<h2>From full control to no servers</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 190" role="img" aria-label="Compute options from most control to least management: Amazon EC2, containers on EC2 with ECS or EKS, containers on AWS Fargate, and AWS Lambda functions.">
  <defs><linearGradient id="gcmp" x1="0" x2="1"><stop offset="0" style="stop-color:var(--d2)"/><stop offset="1" style="stop-color:var(--accent)"/></linearGradient></defs>
  <rect x="20" y="20" width="620" height="8" rx="4" fill="url(#gcmp)"/>
  <text x="20" y="48" class="t-s" style="fill:currentColor">More control, more to manage</text>
  <text x="640" y="48" text-anchor="end" class="t-s" style="fill:currentColor">Less to manage, pay per use</text>
  <rect class="bx-w" x="20" y="62" width="145" height="110" rx="10"/><text x="92" y="86" text-anchor="middle" class="t-b">Amazon EC2</text>
  <text x="92" y="108" text-anchor="middle" class="t-s">Virtual servers.</text><text x="92" y="122" text-anchor="middle" class="t-s">You pick OS, size,</text><text x="92" y="136" text-anchor="middle" class="t-s">and patch them</text>
  <rect class="bx-w" x="178" y="62" width="145" height="110" rx="10"/><text x="250" y="86" text-anchor="middle" class="t-b">ECS / EKS on EC2</text>
  <text x="250" y="108" text-anchor="middle" class="t-s">Containers, but you</text><text x="250" y="122" text-anchor="middle" class="t-s">still manage the</text><text x="250" y="136" text-anchor="middle" class="t-s">EC2 cluster</text>
  <rect class="bx-w" x="336" y="62" width="145" height="110" rx="10"/><text x="408" y="86" text-anchor="middle" class="t-b">AWS Fargate</text>
  <text x="408" y="108" text-anchor="middle" class="t-s">Serverless engine</text><text x="408" y="122" text-anchor="middle" class="t-s">for containers.</text><text x="408" y="136" text-anchor="middle" class="t-s">No servers to manage</text>
  <rect class="bx-a" x="494" y="62" width="146" height="110" rx="10"/><text x="567" y="86" text-anchor="middle" class="t-b">AWS Lambda</text>
  <text x="567" y="108" text-anchor="middle" class="t-s">Run code on events.</text><text x="567" y="122" text-anchor="middle" class="t-s">Pay per request and</text><text x="567" y="136" text-anchor="middle" class="t-s">ms of run time</text>
  <text x="92" y="160" text-anchor="middle" class="t-m">IaaS</text><text x="250" y="160" text-anchor="middle" class="t-m">containers</text><text x="408" y="160" text-anchor="middle" class="t-m">serverless</text><text x="567" y="160" text-anchor="middle" class="t-m">serverless (FaaS)</text>
</svg>
</div>
<figcaption><b>Pick the least management that still fits.</b> Lambda suits short, event-driven tasks (up to 15 minutes per invocation). Fargate suits containers without managing hosts. EC2 suits anything that needs full OS control or long-running custom software.</figcaption>
</figure>

<h2>Amazon EC2 instance types</h2>
<p>Instance types are grouped into families optimized for different workloads. The letter at the start of the name hints at the family.</p>
<div class="table-wrap"><table>
<thead><tr><th>Family</th><th>Optimized for</th><th>Example workloads</th></tr></thead>
<tbody>
<tr><td><strong>General purpose</strong> (M, T)</td><td>Balance of compute, memory, networking</td><td>Web servers, code repositories, small databases</td></tr>
<tr><td><strong>Compute optimized</strong> (C)</td><td>High-performance processors</td><td>Batch processing, media transcoding, high-performance web servers, scientific modeling, gaming servers</td></tr>
<tr><td><strong>Memory optimized</strong> (R, X)</td><td>Large data sets in memory</td><td>In-memory databases, real-time big data analytics</td></tr>
<tr><td><strong>Accelerated computing</strong> (P, G, Inf, Trn)</td><td>GPUs or custom chips</td><td>Machine learning training and inference, graphics</td></tr>
<tr><td><strong>Storage optimized</strong> (I, D)</td><td>High, sequential read/write to local storage</td><td>Data warehousing, distributed file systems, high-frequency OLTP</td></tr>
<tr><td><strong>HPC optimized</strong> (Hpc)</td><td>Tightly coupled high-performance computing</td><td>Complex simulations, deep learning at scale</td></tr>
</tbody></table></div>

<h2>Containers</h2>
<div class="keyterms">
  <div><b>Amazon ECS</b><span>AWS's own fully managed container orchestration service. Runs containers on EC2 or on Fargate.</span></div>
  <div><b>Amazon EKS</b><span>Managed <strong>Kubernetes</strong>. Choose it when you already use Kubernetes or want to stay portable across environments.</span></div>
  <div><b>Amazon ECR</b><span>Managed container image registry for storing Docker/OCI images.</span></div>
  <div><b>AWS Fargate</b><span>Serverless compute for containers used with ECS or EKS. No EC2 instances to provision, patch, or scale.</span></div>
</div>

<h2>Other compute options</h2>
<div class="keyterms">
  <div><b>AWS Lambda</b><span>Serverless functions triggered by events (S3 upload, API call, schedule, queue message). Scales automatically; max 15 minutes per run.</span></div>
  <div><b>AWS Elastic Beanstalk</b><span>Upload application code; it handles provisioning, load balancing, scaling, and monitoring (PaaS).</span></div>
  <div><b>Amazon Lightsail</b><span>Simple virtual private servers with predictable, low monthly pricing. Good for simple websites and small apps.</span></div>
  <div><b>AWS Batch</b><span>Runs batch computing jobs at any scale, managing the compute resources for you.</span></div>
  <div><b>AWS Outposts</b><span>AWS-managed infrastructure installed in your data center for low-latency or data-residency needs.</span></div>
</div>

<h2>Elasticity: Auto Scaling + load balancing</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 240" role="img" aria-label="An Elastic Load Balancer distributes incoming traffic to EC2 instances in two Availability Zones. An Auto Scaling group adds or removes instances based on demand, and replaces unhealthy instances.">
  <rect class="bx-w" x="20" y="96" width="90" height="48" rx="8"/><text x="65" y="125" text-anchor="middle" class="t-b">Users</text>
  <line class="ln" x1="114" y1="120" x2="150" y2="120" marker-end="url(#arr)"/>
  <rect class="bx-a" x="156" y="86" width="130" height="68" rx="10"/><text x="221" y="114" text-anchor="middle" class="t-b">Load balancer</text><text x="221" y="132" text-anchor="middle" class="t-s">health checks</text>
  <path class="ln" d="M290 108 L360 70" marker-end="url(#arr)"/>
  <path class="ln" d="M290 132 L360 170" marker-end="url(#arr)"/>
  <rect class="dash" x="340" y="16" width="300" height="212" rx="12"/>
  <text x="626" y="34" text-anchor="end" class="t-m t-acc">AUTO SCALING GROUP · min 2 · max 6</text>
  <rect class="bx" x="356" y="44" width="270" height="76" rx="8"/><text x="368" y="62" class="t-s">Availability Zone A</text>
  <rect class="bx-w" x="372" y="72" width="70" height="36" rx="5"/><text x="407" y="95" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <rect class="bx-w" x="452" y="72" width="70" height="36" rx="5"/><text x="487" y="95" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <rect class="dash" x="532" y="72" width="70" height="36" rx="5"/><text x="567" y="95" text-anchor="middle" class="t-s">+ scale out</text>
  <rect class="bx" x="356" y="134" width="270" height="76" rx="8"/><text x="368" y="152" class="t-s">Availability Zone B</text>
  <rect class="bx-w" x="372" y="162" width="70" height="36" rx="5"/><text x="407" y="185" text-anchor="middle" class="t-s" style="fill:currentColor">EC2</text>
  <rect class="bx-r" x="452" y="162" width="70" height="36" rx="5"/><text x="487" y="185" text-anchor="middle" class="t-s" style="fill:currentColor">unhealthy</text>
  <rect class="dash" x="532" y="162" width="70" height="36" rx="5"/><text x="567" y="185" text-anchor="middle" class="t-s">replaced</text>
</svg>
</div>
<figcaption><b>Load balancing spreads traffic; Auto Scaling changes how many servers there are.</b> Together they give elasticity and high availability: capacity follows demand, and failed instances are replaced automatically.</figcaption>
</figure>
<ul>
  <li><strong>Amazon EC2 Auto Scaling / AWS Auto Scaling:</strong> automatically adds instances when demand rises (scale out) and removes them when it falls (scale in); maintains a minimum healthy count.</li>
  <li><strong>Elastic Load Balancing (ELB):</strong> distributes traffic across targets in multiple AZs and stops sending traffic to unhealthy ones.
    <ul>
      <li><em>Application Load Balancer</em>: HTTP/HTTPS (layer 7), routing by path or host.</li>
      <li><em>Network Load Balancer</em>: TCP/UDP (layer 4), ultra-low latency, millions of requests per second.</li>
      <li><em>Gateway Load Balancer</em>: deploy third-party virtual appliances such as firewalls.</li>
    </ul></li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Run code without provisioning servers in response to events” → <strong>Lambda</strong>.</li>
  <li>“Run containers without managing servers” → <strong>Fargate</strong>. “Kubernetes” → <strong>EKS</strong>.</li>
  <li>“Video encoding, scientific modeling, batch processing” → <strong>compute optimized</strong>. “In-memory database” → <strong>memory optimized</strong>.</li>
  <li>“Automatically adjust capacity” → <strong>Auto Scaling</strong> (elasticity). “Distribute traffic” → <strong>ELB</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/ec2/instance-types/" target="_blank" rel="noopener">Amazon EC2 instance types</a></li>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/aws-overview/compute-services.html" target="_blank" rel="noopener">Compute services (Overview of AWS)</a></li>
</ul>`
},
{
  id: '3.4', d: 'd3', minutes: 9,
  title: 'Database services',
  summary: 'Self-managed versus managed databases, relational (RDS, Aurora), NoSQL (DynamoDB), in-memory (ElastiCache), specialty databases, and migration tools.',
  html: `
<h2>Self-managed or AWS-managed?</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Database on Amazon EC2</th><th>AWS managed database (e.g. Amazon RDS)</th></tr></thead>
<tbody>
<tr><td>You manage</td><td>OS, database install, patching, backups, replication, scaling, high availability</td><td>Schema, queries, data, access, performance tuning</td></tr>
<tr><td>AWS manages</td><td>Hardware and virtualization only</td><td>Hardware, OS, engine patching, automated backups, Multi-AZ failover, storage scaling</td></tr>
<tr><td>Choose when</td><td>You need OS-level access, an unsupported engine or version, or custom configuration</td><td>You want less operational work (the usual answer)</td></tr>
</tbody></table></div>

<h2>Which database for which data?</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 300" role="img" aria-label="Database decision guide. Relational data with SQL: Amazon RDS or Amazon Aurora. Key-value at any scale with millisecond latency: Amazon DynamoDB. Microsecond cache: Amazon ElastiCache. JSON documents compatible with MongoDB: Amazon DocumentDB. Highly connected data: Amazon Neptune. Analytics on large data: Amazon Redshift.">
  <rect class="bx-d3" x="250" y="12" width="160" height="40" rx="20"/><text x="330" y="37" text-anchor="middle" class="t-b">What is your data?</text>
  <path class="ln" d="M330 52 V70 H95 V86" marker-end="url(#arr)"/>
  <path class="ln" d="M330 70 H330 V86" marker-end="url(#arr)"/>
  <path class="ln" d="M330 70 H565 V86" marker-end="url(#arr)"/>
  <rect class="bx-w" x="20" y="92" width="150" height="44" rx="8"/><text x="95" y="111" text-anchor="middle" class="t-b">Tables, SQL, joins</text><text x="95" y="127" text-anchor="middle" class="t-s">relational / OLTP</text>
  <rect class="bx-w" x="255" y="92" width="150" height="44" rx="8"/><text x="330" y="111" text-anchor="middle" class="t-b">Flexible schema</text><text x="330" y="127" text-anchor="middle" class="t-s">NoSQL</text>
  <rect class="bx-w" x="490" y="92" width="150" height="44" rx="8"/><text x="565" y="111" text-anchor="middle" class="t-b">Analytics at scale</text><text x="565" y="127" text-anchor="middle" class="t-s">OLAP / warehouse</text>
  <line class="ln" x1="95" y1="136" x2="95" y2="160" marker-end="url(#arr)"/>
  <rect class="bx-a" x="20" y="166" width="150" height="54" rx="8"/><text x="95" y="188" text-anchor="middle" class="t-b">Amazon RDS</text><text x="95" y="206" text-anchor="middle" class="t-s">MySQL, PostgreSQL, …</text>
  <rect class="bx-a" x="20" y="228" width="150" height="54" rx="8"/><text x="95" y="250" text-anchor="middle" class="t-b">Amazon Aurora</text><text x="95" y="268" text-anchor="middle" class="t-s">cloud-native, faster</text>
  <path class="ln" d="M330 136 V152 H205 V166" marker-end="url(#arr)"/>
  <path class="ln" d="M330 152 H455 V166" marker-end="url(#arr)"/>
  <path class="ln" d="M330 152 V166" marker-end="url(#arr)"/>
  <rect class="bx-a" x="180" y="172" width="100" height="62" rx="8"/><text x="230" y="194" text-anchor="middle" class="t-b">DynamoDB</text><text x="230" y="210" text-anchor="middle" class="t-s">key-value,</text><text x="230" y="224" text-anchor="middle" class="t-s">serverless, ms</text>
  <rect class="bx-a" x="288" y="172" width="84" height="62" rx="8"/><text x="330" y="194" text-anchor="middle" class="t-b">DocumentDB</text><text x="330" y="210" text-anchor="middle" class="t-s">JSON,</text><text x="330" y="224" text-anchor="middle" class="t-s">MongoDB API</text>
  <rect class="bx-a" x="380" y="172" width="100" height="62" rx="8"/><text x="430" y="194" text-anchor="middle" class="t-b">Neptune</text><text x="430" y="210" text-anchor="middle" class="t-s">graph,</text><text x="430" y="224" text-anchor="middle" class="t-s">relationships</text>
  <rect class="bx-am" x="240" y="244" width="180" height="44" rx="8"/><text x="330" y="263" text-anchor="middle" class="t-b">ElastiCache</text><text x="330" y="279" text-anchor="middle" class="t-s">in-memory cache, μs latency</text>
  <line class="ln" x1="565" y1="136" x2="565" y2="160" marker-end="url(#arr)"/>
  <rect class="bx-a" x="490" y="166" width="150" height="54" rx="8"/><text x="565" y="188" text-anchor="middle" class="t-b">Amazon Redshift</text><text x="565" y="206" text-anchor="middle" class="t-s">petabyte-scale SQL</text>
</svg>
</div>
<figcaption><b>Start from the shape of the data.</b> Relational → RDS or Aurora. Key-value at massive scale → DynamoDB. Repeated reads that must be very fast → put ElastiCache in front. Reporting across huge datasets → Redshift.</figcaption>
</figure>

<div class="keyterms">
  <div><b>Amazon RDS</b><span>Managed relational database: MySQL, PostgreSQL, MariaDB, Oracle, Microsoft SQL Server, Db2. Automated backups, patching, <strong>Multi-AZ</strong> standby for high availability, <strong>read replicas</strong> for read scaling.</span></div>
  <div><b>Amazon Aurora</b><span>AWS-built relational database compatible with MySQL and PostgreSQL. Up to 5x the throughput of standard MySQL and 3x PostgreSQL; storage keeps six copies across three AZs.</span></div>
  <div><b>Amazon DynamoDB</b><span>Serverless NoSQL key-value and document database with single-digit millisecond performance at any scale. No servers or versions to manage.</span></div>
  <div><b>Amazon ElastiCache</b><span>Managed in-memory caching (Valkey, Redis OSS, Memcached). Reduces database load and gives microsecond read latency.</span></div>
  <div><b>Amazon DocumentDB</b><span>Managed document database with MongoDB compatibility, for JSON data.</span></div>
  <div><b>Amazon Neptune</b><span>Managed graph database for highly connected data: social networks, recommendations, fraud detection.</span></div>
</div>

<h2>Database migration</h2>
<ul>
  <li><strong>AWS Database Migration Service (AWS DMS):</strong> moves data to AWS with minimal downtime; the source database stays operational. Supports homogeneous (Oracle → Oracle) and heterogeneous (Oracle → Aurora) migrations, plus continuous replication.</li>
  <li><strong>AWS Schema Conversion Tool (AWS SCT):</strong> converts the schema and code objects (stored procedures, views) from the source engine to the target engine for heterogeneous migrations.</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Managed relational database, minimal admin” → <strong>RDS</strong>. “High-performance MySQL/PostgreSQL-compatible” → <strong>Aurora</strong>.</li>
  <li>“NoSQL”, “key-value”, “serverless database”, “millisecond latency at any scale” → <strong>DynamoDB</strong>.</li>
  <li>“Improve read performance by caching frequent queries” → <strong>ElastiCache</strong>.</li>
  <li>RDS <strong>Multi-AZ</strong> = availability (failover). RDS <strong>read replicas</strong> = read performance.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/products/databases/" target="_blank" rel="noopener">Databases on AWS</a></li>
  <li><a href="https://docs.aws.amazon.com/decision-guides/latest/databases-on-aws-how-to-choose/databases-on-aws-how-to-choose.html" target="_blank" rel="noopener">Choosing an AWS database service</a></li>
</ul>`
},
{
  id: '3.5', d: 'd3', minutes: 11,
  title: 'Network services',
  summary: 'VPC components, security groups versus network ACLs, Route 53, CloudFront, and the ways to connect to AWS (VPN, Direct Connect).',
  html: `
<h2>Inside an Amazon VPC</h2>
<p><strong>Amazon Virtual Private Cloud (VPC)</strong> is your logically isolated network in an AWS Region. You choose its IP address range and split it into subnets, each in one Availability Zone.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 330" role="img" aria-label="A VPC spans two Availability Zones, each with a public subnet containing a web server and NAT gateway, and a private subnet containing a database. An internet gateway connects public subnets to the internet. A virtual private gateway connects the VPC to the corporate data center over Site-to-Site VPN or AWS Direct Connect.">
  <rect class="bx-w" x="250" y="8" width="150" height="34" rx="17"/><text x="325" y="30" text-anchor="middle" class="t-b">Internet</text>
  <line class="ln" x1="325" y1="42" x2="325" y2="62" marker-end="url(#arr)" marker-start="url(#arr)"/>
  <rect class="bx-a" x="262" y="64" width="126" height="28" rx="6"/><text x="325" y="83" text-anchor="middle" class="t-s" style="fill:currentColor">Internet gateway</text>
  <rect class="bx-d3" x="20" y="96" width="520" height="226" rx="14" style="fill-opacity:.3"/>
  <text x="34" y="116" class="t-h">VPC</text><text x="76" y="116" class="t-s">10.0.0.0/16 · one Region</text>
  <rect class="dash" x="36" y="126" width="236" height="186" rx="10"/><text x="48" y="142" class="t-m">AVAILABILITY ZONE A</text>
  <rect class="dash" x="288" y="126" width="236" height="186" rx="10"/><text x="300" y="142" class="t-m">AVAILABILITY ZONE B</text>
  <rect class="bx-g" x="48" y="150" width="212" height="70" rx="8"/><text x="60" y="168" class="t-s" style="fill:currentColor">Public subnet</text>
  <rect class="bx-w" x="60" y="176" width="90" height="34" rx="5"/><text x="105" y="198" text-anchor="middle" class="t-s" style="fill:currentColor">Web server</text>
  <rect class="bx-w" x="158" y="176" width="90" height="34" rx="5"/><text x="203" y="198" text-anchor="middle" class="t-s" style="fill:currentColor">NAT gateway</text>
  <rect class="bx-g" x="300" y="150" width="212" height="70" rx="8"/><text x="312" y="168" class="t-s" style="fill:currentColor">Public subnet</text>
  <rect class="bx-w" x="312" y="176" width="90" height="34" rx="5"/><text x="357" y="198" text-anchor="middle" class="t-s" style="fill:currentColor">Web server</text>
  <rect class="bx" x="48" y="232" width="212" height="70" rx="8"/><text x="60" y="250" class="t-s" style="fill:currentColor">Private subnet</text>
  <rect class="bx-w" x="60" y="258" width="90" height="34" rx="5"/><text x="105" y="280" text-anchor="middle" class="t-s" style="fill:currentColor">Database</text>
  <rect class="bx" x="300" y="232" width="212" height="70" rx="8"/><text x="312" y="250" class="t-s" style="fill:currentColor">Private subnet</text>
  <rect class="bx-w" x="312" y="258" width="90" height="34" rx="5"/><text x="357" y="280" text-anchor="middle" class="t-s" style="fill:currentColor">DB standby</text>
  <path class="ln" d="M325 92 V120 H215 V148" marker-end="url(#arr)"/>
  <path class="ln" d="M325 120 H462 V148" marker-end="url(#arr)"/>
  <path class="ln-am" d="M150 275 H190 V212" marker-end="url(#arr)" stroke-dasharray="4 3"/>
  <text x="196" y="236" class="t-s" style="fill:var(--amber)">outbound only</text>
  <rect class="bx-am" x="548" y="196" width="120" height="44" rx="8"/><text x="608" y="215" text-anchor="middle" class="t-s" style="fill:currentColor">Virtual private</text><text x="608" y="230" text-anchor="middle" class="t-s" style="fill:currentColor">gateway</text>
  <line class="ln-am" x1="540" y1="218" x2="546" y2="218"/>
  <line class="ln-am" x1="608" y1="240" x2="608" y2="270" marker-end="url(#arr)" marker-start="url(#arr)"/>
  <rect class="bx-w" x="548" y="272" width="120" height="50" rx="8"/><text x="608" y="292" text-anchor="middle" class="t-b">Corporate DC</text><text x="608" y="310" text-anchor="middle" class="t-s">VPN or Direct Connect</text>
</svg>
</div>
<figcaption><b>Public subnets route to an internet gateway; private subnets do not.</b> Resources in a private subnet reach the internet for updates through a NAT gateway (outbound only). A virtual private gateway links the VPC to your own network.</figcaption>
</figure>

<div class="keyterms">
  <div><b>Subnet</b><span>A range of IP addresses in one AZ. <em>Public</em> if its route table has a route to an internet gateway; otherwise <em>private</em>.</span></div>
  <div><b>Internet gateway</b><span>Allows communication between the VPC and the internet.</span></div>
  <div><b>NAT gateway</b><span>Lets instances in private subnets start outbound connections to the internet, while blocking inbound connections.</span></div>
  <div><b>Route table</b><span>Rules that decide where network traffic from a subnet is directed.</span></div>
  <div><b>VPC peering / Transit Gateway</b><span>Peering connects two VPCs privately. Transit Gateway is a hub that connects many VPCs and on-premises networks.</span></div>
  <div><b>AWS PrivateLink</b><span>Private connectivity to AWS services or partner services from your VPC without using the public internet.</span></div>
</div>

<h2>Security groups versus network ACLs</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Security group</th><th>Network ACL</th></tr></thead>
<tbody>
<tr><td>Applies to</td><td>Instance (network interface)</td><td>Subnet</td></tr>
<tr><td>State</td><td><strong>Stateful</strong>: return traffic is automatically allowed</td><td><strong>Stateless</strong>: return traffic must be explicitly allowed</td></tr>
<tr><td>Rules</td><td>Allow rules only</td><td>Allow <em>and</em> deny rules</td></tr>
<tr><td>Evaluation</td><td>All rules evaluated together</td><td>Rules processed in number order; first match wins</td></tr>
<tr><td>Default</td><td>Denies all inbound, allows all outbound</td><td>Default NACL allows all inbound and outbound</td></tr>
</tbody></table></div>
<p>Amazon Inspector also checks network reachability, flagging instances exposed to the internet on unexpected ports.</p>

<h2>DNS, content delivery, and APIs</h2>
<div class="keyterms">
  <div><b>Amazon Route 53</b><span>Highly available DNS service: registers domain names, routes users to resources (routing policies such as latency, geolocation, failover, weighted), and runs health checks.</span></div>
  <div><b>Amazon CloudFront</b><span>Content delivery network (CDN) that caches content at edge locations worldwide for low latency. Integrates with Shield and WAF.</span></div>
  <div><b>AWS Global Accelerator</b><span>Uses the AWS global network and static anycast IP addresses to improve performance and availability of applications for global users (TCP/UDP).</span></div>
  <div><b>Amazon API Gateway</b><span>Create, publish, secure, and monitor APIs at any scale; a common front door for Lambda functions.</span></div>
</div>

<h2>Connecting to AWS</h2>
<div class="table-wrap"><table>
<thead><tr><th>Option</th><th>How</th><th>Choose when</th></tr></thead>
<tbody>
<tr><td><strong>AWS Site-to-Site VPN</strong></td><td>Encrypted IPsec tunnel over the public internet between your network and AWS</td><td>Quick to set up, low cost, acceptable variable performance</td></tr>
<tr><td><strong>AWS Client VPN</strong></td><td>Managed VPN for individual users' devices</td><td>Remote employees connecting securely to AWS and on-premises</td></tr>
<tr><td><strong>AWS Direct Connect</strong></td><td>Dedicated private network connection from your premises to AWS (does not traverse the public internet)</td><td>Consistent performance, high bandwidth, lower data transfer costs; takes weeks to provision</td></tr>
</tbody></table></div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Stateful, instance-level firewall” → <strong>security group</strong>. “Stateless, subnet-level, can deny” → <strong>network ACL</strong>.</li>
  <li>“Dedicated, private, consistent connection” → <strong>Direct Connect</strong>. “Encrypted over the internet, fast to set up” → <strong>Site-to-Site VPN</strong>.</li>
  <li>“DNS” or “register a domain” → <strong>Route 53</strong>. “Cache static content globally” → <strong>CloudFront</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" target="_blank" rel="noopener">What is Amazon VPC?</a></li>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html" target="_blank" rel="noopener">Amazon VPC connectivity options</a></li>
</ul>`
},
{
  id: '3.6', d: 'd3', minutes: 11,
  title: 'Storage services',
  summary: 'Object, block, and file storage; S3 storage classes and lifecycle policies; hybrid storage with Storage Gateway; AWS Backup.',
  html: `
<h2>Three kinds of storage</h2>
<div class="table-wrap"><table>
<thead><tr><th>Type</th><th>Service</th><th>How data is stored and accessed</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>Object</strong></td><td>Amazon S3</td><td>Whole objects (file + metadata) in buckets, accessed over HTTPS by key. Virtually unlimited.</td><td>Backups, static websites, data lakes, media, logs</td></tr>
<tr><td><strong>Block</strong></td><td>Amazon EBS, instance store</td><td>Raw volumes attached to one EC2 instance, like a hard drive.</td><td>Boot volumes, databases on EC2</td></tr>
<tr><td><strong>File</strong></td><td>Amazon EFS, Amazon FSx</td><td>Shared file system mounted by many instances at once.</td><td>Shared content, home directories, lift-and-shift apps</td></tr>
</tbody></table></div>

<h2>Amazon S3</h2>
<p>S3 stores objects up to 5 TB in <strong>buckets</strong>. It is designed for <strong>99.999999999% (11 nines) durability</strong>; Standard stores data across at least three AZs. Bucket names are globally unique, but each bucket lives in one Region.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 300" role="img" aria-label="S3 storage classes from frequent access and higher storage price to archive and lowest storage price: S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA, S3 One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive. A lifecycle policy moves objects down over time.">
  <text x="20" y="20" class="t-m">FREQUENT ACCESS · HIGHER STORAGE PRICE</text>
  <text x="660" y="20" text-anchor="end" class="t-m">ARCHIVE · LOWEST STORAGE PRICE</text>
  <g>
    <rect class="bx-a" x="20" y="34" width="86" height="150" rx="8"/>
    <text x="63" y="56" text-anchor="middle" class="t-b">Standard</text>
    <text x="63" y="80" text-anchor="middle" class="t-s">Frequent</text><text x="63" y="94" text-anchor="middle" class="t-s">access,</text><text x="63" y="108" text-anchor="middle" class="t-s">ms retrieval</text>
    <text x="63" y="170" text-anchor="middle" class="t-m">≥3 AZs</text>
  </g>
  <g>
    <rect class="bx-a" x="114" y="34" width="86" height="150" rx="8"/>
    <text x="157" y="52" text-anchor="middle" class="t-b">Intelligent-</text><text x="157" y="66" text-anchor="middle" class="t-b">Tiering</text>
    <text x="157" y="88" text-anchor="middle" class="t-s">Access</text><text x="157" y="102" text-anchor="middle" class="t-s">unknown or</text><text x="157" y="116" text-anchor="middle" class="t-s">changing</text>
    <text x="157" y="170" text-anchor="middle" class="t-m">≥3 AZs</text>
  </g>
  <g>
    <rect class="bx-w" x="208" y="34" width="86" height="150" rx="8"/>
    <text x="251" y="52" text-anchor="middle" class="t-b">Standard-</text><text x="251" y="66" text-anchor="middle" class="t-b">IA</text>
    <text x="251" y="88" text-anchor="middle" class="t-s">Infrequent,</text><text x="251" y="102" text-anchor="middle" class="t-s">fast when</text><text x="251" y="116" text-anchor="middle" class="t-s">needed</text>
    <text x="251" y="170" text-anchor="middle" class="t-m">≥3 AZs</text>
  </g>
  <g>
    <rect class="bx-am" x="302" y="34" width="86" height="150" rx="8"/>
    <text x="345" y="52" text-anchor="middle" class="t-b">One Zone-</text><text x="345" y="66" text-anchor="middle" class="t-b">IA</text>
    <text x="345" y="88" text-anchor="middle" class="t-s">Infrequent,</text><text x="345" y="102" text-anchor="middle" class="t-s">re-creatable</text><text x="345" y="116" text-anchor="middle" class="t-s">data</text>
    <text x="345" y="170" text-anchor="middle" class="t-m">1 AZ</text>
  </g>
  <g>
    <rect class="bx" x="396" y="34" width="86" height="150" rx="8"/>
    <text x="439" y="52" text-anchor="middle" class="t-b">Glacier</text><text x="439" y="66" text-anchor="middle" class="t-b">Instant</text>
    <text x="439" y="88" text-anchor="middle" class="t-s">Archive read</text><text x="439" y="102" text-anchor="middle" class="t-s">quarterly,</text><text x="439" y="116" text-anchor="middle" class="t-s">ms retrieval</text>
    <text x="439" y="170" text-anchor="middle" class="t-m">ms</text>
  </g>
  <g>
    <rect class="bx" x="490" y="34" width="86" height="150" rx="8"/>
    <text x="533" y="52" text-anchor="middle" class="t-b">Glacier</text><text x="533" y="66" text-anchor="middle" class="t-b">Flexible</text>
    <text x="533" y="88" text-anchor="middle" class="t-s">Archive,</text><text x="533" y="102" text-anchor="middle" class="t-s">retrieval in</text><text x="533" y="116" text-anchor="middle" class="t-s">minutes–hours</text>
    <text x="533" y="170" text-anchor="middle" class="t-m">min–12 h</text>
  </g>
  <g>
    <rect class="bx" x="584" y="34" width="86" height="150" rx="8"/>
    <text x="627" y="52" text-anchor="middle" class="t-b">Glacier Deep</text><text x="627" y="66" text-anchor="middle" class="t-b">Archive</text>
    <text x="627" y="88" text-anchor="middle" class="t-s">Long-term</text><text x="627" y="102" text-anchor="middle" class="t-s">retention,</text><text x="627" y="116" text-anchor="middle" class="t-s">7–10+ years</text>
    <text x="627" y="170" text-anchor="middle" class="t-m">≤12–48 h</text>
  </g>
  <text x="20" y="214" class="t-m t-acc">LIFECYCLE POLICY (example)</text>
  <line class="ln-a" x1="63" y1="234" x2="245" y2="234" marker-end="url(#arr-acc)"/>
  <line class="ln-a" x1="251" y1="234" x2="527" y2="234" marker-end="url(#arr-acc)"/>
  <line class="ln-a" x1="533" y1="234" x2="621" y2="234" marker-end="url(#arr-acc)"/>
  <circle cx="63" cy="234" r="5" class="fill-acc"/>
  <text x="154" y="254" text-anchor="middle" class="t-s">after 30 days</text>
  <text x="390" y="254" text-anchor="middle" class="t-s">after 90 days</text>
  <text x="577" y="254" text-anchor="middle" class="t-s">after 1 year</text>
  <text x="640" y="282" text-anchor="end" class="t-s">…and expire (delete) after 7 years</text>
</svg>
</div>
<figcaption><b>Lower storage price means slower or costlier retrieval.</b> Lifecycle rules move objects automatically as they age, or delete them. Intelligent-Tiering moves data for you when access patterns are unknown, with no retrieval fees.</figcaption>
</figure>
<ul>
  <li><strong>S3 Express One Zone</strong> is a high-performance class for the most latency-sensitive applications, in a single AZ.</li>
  <li><strong>Lifecycle policies</strong> transition objects to cheaper classes or expire them on a schedule; use them for logs, backups, and compliance archives.</li>
  <li>Other S3 features: <strong>versioning</strong> (recover from overwrites and deletes), <strong>replication</strong> (Cross-Region Replication), static website hosting, encryption by default, Block Public Access.</li>
</ul>

<h2>Block storage</h2>
<div class="keyterms">
  <div><b>Amazon EBS</b><span>Persistent block volumes for EC2. Data survives instance stop and termination (if configured). Lives in one AZ; back up with <strong>snapshots</strong> stored in S3. SSD and HDD volume types.</span></div>
  <div><b>EC2 instance store</b><span>Temporary block storage physically attached to the host. Very fast, but data is <strong>lost</strong> when the instance stops, hibernates, or terminates. For buffers, caches, scratch data.</span></div>
</div>

<h2>File storage</h2>
<div class="keyterms">
  <div><b>Amazon EFS</b><span>Serverless, elastic NFS file system for Linux. Thousands of instances across AZs can mount it at once; grows and shrinks automatically.</span></div>
  <div><b>Amazon FSx</b><span>Fully managed third-party file systems: FSx for Windows File Server (SMB, Active Directory), FSx for NetApp ONTAP, FSx for OpenZFS, and FSx for Lustre for HPC.</span></div>
</div>

<h2>Hybrid and protection services</h2>
<div class="keyterms">
  <div><b>AWS Storage Gateway</b><span>Hybrid cloud storage that gives on-premises applications access to virtually unlimited cloud storage, with local caching for low latency. Types: S3 File Gateway, FSx File Gateway, Volume Gateway, Tape Gateway (virtual tape library).</span></div>
  <div><b>AWS Backup</b><span>Centralized, policy-based backup across AWS services (EBS, EC2, RDS, DynamoDB, EFS, FSx, S3, and more) and accounts, with retention rules and audit reports.</span></div>
  <div><b>AWS Elastic Disaster Recovery</b><span>Continuously replicates servers to AWS so you can recover quickly into AWS after a disaster, with low recovery time and point objectives.</span></div>
</div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Unlimited storage for files/images/backups accessed over the web” → <strong>S3</strong>.</li>
  <li>“Shared file system for many Linux instances” → <strong>EFS</strong>. Windows file shares → <strong>FSx for Windows File Server</strong>.</li>
  <li>“Lowest-cost archive, retrieval within 12–48 hours is fine” → <strong>S3 Glacier Deep Archive</strong>.</li>
  <li>“Unknown or changing access patterns” → <strong>S3 Intelligent-Tiering</strong>.</li>
  <li>“Keep on-premises apps but extend storage to the cloud” → <strong>Storage Gateway</strong>. “Central backup policy across services” → <strong>AWS Backup</strong>.</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>Instance store is not persistent. And an EBS volume attaches to instances in its own AZ only (copy a snapshot to move it). EFS, not EBS, is the answer for storage shared by many instances.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/s3/storage-classes/" target="_blank" rel="noopener">Amazon S3 storage classes</a></li>
  <li><a href="https://docs.aws.amazon.com/decision-guides/latest/storage-on-aws-how-to-choose/choosing-aws-storage-service.html" target="_blank" rel="noopener">Choosing an AWS storage service</a></li>
</ul>`
},
{
  id: '3.7', d: 'd3', minutes: 10,
  title: 'AI/ML and analytics services',
  summary: 'Ready-made AI services for text, speech, images, and documents; Amazon Q and SageMaker AI; and the analytics pipeline from Kinesis to Quick Sight.',
  html: `
<h2>Three layers of AI/ML on AWS</h2>
<ul>
  <li><strong>AI services</strong> (no ML expertise needed): call an API to analyze text, images, speech, or documents. Comprehend, Lex, Polly, Rekognition, Textract, Transcribe, Translate.</li>
  <li><strong>Generative AI assistants:</strong> <strong>Amazon Q</strong>. <em>Amazon Q Business</em> answers questions and takes actions using your company's data and systems. <em>Amazon Q Developer</em> helps build, operate, and transform software (code suggestions, troubleshooting, upgrades).</li>
  <li><strong>ML platform:</strong> <strong>Amazon SageMaker AI</strong> to build, train, and deploy your own custom machine learning models at scale, with Amazon SageMaker Studio as the integrated environment.</li>
</ul>

<h2>Pick the AI service by input</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 660 250" role="img" aria-label="AI services by input type. Text: Comprehend (meaning, sentiment) and Translate (languages). Speech: Transcribe (speech to text) and Polly (text to speech). Conversation: Lex (chatbots). Images and video: Rekognition. Documents: Textract.">
  <g>
    <rect class="bx-d1" x="20" y="16" width="120" height="40" rx="20"/><text x="80" y="41" text-anchor="middle" class="t-b">Text</text>
    <line class="ln" x1="140" y1="36" x2="176" y2="36" marker-end="url(#arr)"/>
    <rect class="bx-w" x="182" y="16" width="200" height="40" rx="8"/><text x="196" y="41" class="t-b">Comprehend</text><text x="290" y="41" class="t-s">sentiment, entities</text>
    <rect class="bx-w" x="392" y="16" width="200" height="40" rx="8"/><text x="406" y="41" class="t-b">Translate</text><text x="482" y="41" class="t-s">language → language</text>
  </g>
  <g>
    <rect class="bx-d2" x="20" y="72" width="120" height="40" rx="20"/><text x="80" y="97" text-anchor="middle" class="t-b">Speech</text>
    <line class="ln" x1="140" y1="92" x2="176" y2="92" marker-end="url(#arr)"/>
    <rect class="bx-w" x="182" y="72" width="200" height="40" rx="8"/><text x="196" y="97" class="t-b">Transcribe</text><text x="284" y="97" class="t-s">speech → text</text>
    <rect class="bx-w" x="392" y="72" width="200" height="40" rx="8"/><text x="406" y="97" class="t-b">Polly</text><text x="452" y="97" class="t-s">text → lifelike speech</text>
  </g>
  <g>
    <rect class="bx-d3" x="20" y="128" width="120" height="40" rx="20"/><text x="80" y="153" text-anchor="middle" class="t-b">Conversation</text>
    <line class="ln" x1="140" y1="148" x2="176" y2="148" marker-end="url(#arr)"/>
    <rect class="bx-w" x="182" y="128" width="410" height="40" rx="8"/><text x="196" y="153" class="t-b">Lex</text><text x="232" y="153" class="t-s">chatbots and voice bots; powers Amazon Connect bots</text>
  </g>
  <g>
    <rect class="bx-d4" x="20" y="184" width="120" height="40" rx="20"/><text x="80" y="209" text-anchor="middle" class="t-b">Images / docs</text>
    <line class="ln" x1="140" y1="204" x2="176" y2="204" marker-end="url(#arr)"/>
    <rect class="bx-w" x="182" y="184" width="200" height="40" rx="8"/><text x="196" y="209" class="t-b">Rekognition</text><text x="290" y="209" class="t-s">faces, objects</text>
    <rect class="bx-w" x="392" y="184" width="200" height="40" rx="8"/><text x="406" y="209" class="t-b">Textract</text><text x="474" y="209" class="t-s">text, forms, tables</text>
  </g>
</svg>
</div>
<figcaption><b>Name the input and the output.</b> Speech to text is Transcribe; text to speech is Polly. Reading words from scanned forms is Textract; understanding the meaning of text is Comprehend.</figcaption>
</figure>

<h2>The analytics pipeline</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 210" role="img" aria-label="Analytics pipeline: ingest streaming data with Amazon Kinesis, store it in an Amazon S3 data lake, catalog and transform with AWS Glue, query with Amazon Athena, Amazon Redshift, or Amazon EMR, and visualize with Amazon Quick Sight.">
  <text x="70" y="20" text-anchor="middle" class="t-m">INGEST</text>
  <text x="200" y="20" text-anchor="middle" class="t-m">STORE</text>
  <text x="330" y="20" text-anchor="middle" class="t-m">CATALOG / ETL</text>
  <text x="470" y="20" text-anchor="middle" class="t-m">QUERY / PROCESS</text>
  <text x="610" y="20" text-anchor="middle" class="t-m">VISUALIZE</text>
  <rect class="bx-w" x="20" y="60" width="100" height="70" rx="8"/><text x="70" y="90" text-anchor="middle" class="t-b">Kinesis</text><text x="70" y="108" text-anchor="middle" class="t-s">real-time streams</text>
  <line class="ln" x1="124" y1="95" x2="146" y2="95" marker-end="url(#arr)"/>
  <rect class="bx-a" x="150" y="60" width="100" height="70" rx="8"/><text x="200" y="90" text-anchor="middle" class="t-b">S3</text><text x="200" y="108" text-anchor="middle" class="t-s">data lake</text>
  <line class="ln" x1="254" y1="95" x2="276" y2="95" marker-end="url(#arr)"/>
  <rect class="bx-w" x="280" y="60" width="100" height="70" rx="8"/><text x="330" y="90" text-anchor="middle" class="t-b">Glue</text><text x="330" y="108" text-anchor="middle" class="t-s">serverless ETL</text>
  <line class="ln" x1="384" y1="95" x2="406" y2="95" marker-end="url(#arr)"/>
  <rect class="bx-w" x="410" y="34" width="120" height="40" rx="8"/><text x="420" y="58" class="t-b">Athena</text><text x="474" y="58" class="t-s">SQL on S3</text>
  <rect class="bx-w" x="410" y="80" width="120" height="40" rx="8"/><text x="420" y="104" class="t-b">Redshift</text><text x="482" y="104" class="t-s">warehouse</text>
  <rect class="bx-w" x="410" y="126" width="120" height="40" rx="8"/><text x="420" y="150" class="t-b">EMR</text><text x="458" y="150" class="t-s">Spark, Hadoop</text>
  <line class="ln" x1="534" y1="95" x2="556" y2="95" marker-end="url(#arr)"/>
  <rect class="bx-d1" x="560" y="60" width="100" height="70" rx="8"/><text x="610" y="90" text-anchor="middle" class="t-b">Quick Sight</text><text x="610" y="108" text-anchor="middle" class="t-s">BI dashboards</text>
  <text x="340" y="186" text-anchor="middle" class="t-s">Amazon OpenSearch Service: search and log analytics</text>
  <text x="340" y="202" text-anchor="middle" class="t-s">AWS Glue Data Catalog: shared table definitions for Athena, Redshift, and EMR</text>
</svg>
</div>
<figcaption><b>Ingest, store, prepare, query, see.</b> Questions usually name one stage. “Real-time streaming data” is Kinesis; “query S3 with SQL, no servers” is Athena; “dashboards for business users” is Quick Sight.</figcaption>
</figure>

<div class="keyterms">
  <div><b>Amazon Athena</b><span>Serverless, interactive SQL queries directly on data in S3. Pay per query (data scanned).</span></div>
  <div><b>Amazon Kinesis</b><span>Collect, process, and analyze real-time streaming data: clickstreams, IoT telemetry, logs, video (Kinesis Data Streams, Amazon Data Firehose, Kinesis Video Streams).</span></div>
  <div><b>AWS Glue</b><span>Serverless data integration: discover data, build the Data Catalog, and run extract, transform, and load (ETL) jobs.</span></div>
  <div><b>Amazon Quick</b><span>AWS's AI-powered workspace for business users. Its business intelligence capability, Quick Sight (formerly Amazon QuickSight), builds interactive dashboards and reports.</span></div>
  <div><b>Amazon Redshift</b><span>Petabyte-scale cloud data warehouse for fast SQL analytics on structured data.</span></div>
  <div><b>Amazon EMR</b><span>Managed big data platform for Apache Spark, Hadoop, Hive, and other open-source frameworks.</span></div>
  <div><b>Amazon OpenSearch Service</b><span>Managed OpenSearch for full-text search, log analytics, and observability dashboards.</span></div>
</div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Build, train, and deploy custom ML models” → <strong>SageMaker AI</strong>. “Pre-trained, just call an API” → the specific AI service.</li>
  <li>“Detect faces/objects/inappropriate content in images” → <strong>Rekognition</strong>. “Extract data from invoices or forms” → <strong>Textract</strong>.</li>
  <li>“Customer sentiment from reviews” → <strong>Comprehend</strong>. “Chatbot” → <strong>Lex</strong>.</li>
  <li>“Generative AI assistant for employees using company data” → <strong>Amazon Q Business</strong>. “For developers” → <strong>Amazon Q Developer</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/ai/services/" target="_blank" rel="noopener">AWS AI services</a> · <a href="https://aws.amazon.com/sagemaker-ai/" target="_blank" rel="noopener">Amazon SageMaker AI</a></li>
  <li><a href="https://aws.amazon.com/big-data/datalakes-and-analytics/" target="_blank" rel="noopener">Analytics on AWS</a></li>
</ul>`
},
{
  id: '3.8', d: 'd3', minutes: 10,
  title: 'Other in-scope service categories',
  summary: 'Application integration (EventBridge, SNS, SQS, Step Functions), business applications, developer tools, end-user computing, Amplify, and IoT Core.',
  html: `
<h2>Application integration: decouple your components</h2>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 290" role="img" aria-label="Messaging patterns. Amazon SQS: a producer puts messages in a queue and a consumer pulls them when ready. Amazon SNS: a publisher sends one message to a topic, which pushes copies to many subscribers such as email, SMS, Lambda, and SQS. Amazon EventBridge: events from AWS services, SaaS apps, and your apps go to an event bus where rules route them to targets.">
  <text x="20" y="22" class="t-h">SQS · queue (pull)</text>
  <rect class="bx-w" x="20" y="36" width="100" height="44" rx="8"/><text x="70" y="63" text-anchor="middle" class="t-b">Producer</text>
  <line class="ln" x1="124" y1="58" x2="160" y2="58" marker-end="url(#arr)"/>
  <rect class="bx-a" x="166" y="36" width="180" height="44" rx="8"/>
  <rect class="bx-w" x="178" y="46" width="22" height="24" rx="3"/><rect class="bx-w" x="206" y="46" width="22" height="24" rx="3"/><rect class="bx-w" x="234" y="46" width="22" height="24" rx="3"/>
  <text x="300" y="63" text-anchor="middle" class="t-s" style="fill:currentColor">messages wait</text>
  <line class="ln" x1="350" y1="58" x2="386" y2="58" marker-end="url(#arr)"/>
  <rect class="bx-w" x="392" y="36" width="100" height="44" rx="8"/><text x="442" y="63" text-anchor="middle" class="t-b">Consumer</text>
  <text x="506" y="54" class="t-s">polls when ready;</text><text x="506" y="68" class="t-s">absorbs traffic spikes</text>
  <line x1="20" y1="96" x2="660" y2="96" class="grid-l"/>
  <text x="20" y="120" class="t-h">SNS · topic (push, fan-out)</text>
  <rect class="bx-w" x="20" y="148" width="100" height="44" rx="8"/><text x="70" y="175" text-anchor="middle" class="t-b">Publisher</text>
  <line class="ln" x1="124" y1="170" x2="160" y2="170" marker-end="url(#arr)"/>
  <rect class="bx-am" x="166" y="148" width="120" height="44" rx="8"/><text x="226" y="175" text-anchor="middle" class="t-b">SNS topic</text>
  <line class="ln" x1="290" y1="160" x2="350" y2="132" marker-end="url(#arr)"/>
  <line class="ln" x1="290" y1="166" x2="350" y2="158" marker-end="url(#arr)"/>
  <line class="ln" x1="290" y1="174" x2="350" y2="184" marker-end="url(#arr)"/>
  <line class="ln" x1="290" y1="180" x2="350" y2="210" marker-end="url(#arr)"/>
  <rect class="bx-w" x="356" y="120" width="110" height="22" rx="5"/><text x="411" y="136" text-anchor="middle" class="t-s" style="fill:currentColor">Email</text>
  <rect class="bx-w" x="356" y="146" width="110" height="22" rx="5"/><text x="411" y="162" text-anchor="middle" class="t-s" style="fill:currentColor">SMS / mobile push</text>
  <rect class="bx-w" x="356" y="172" width="110" height="22" rx="5"/><text x="411" y="188" text-anchor="middle" class="t-s" style="fill:currentColor">Lambda function</text>
  <rect class="bx-w" x="356" y="198" width="110" height="22" rx="5"/><text x="411" y="214" text-anchor="middle" class="t-s" style="fill:currentColor">SQS queue</text>
  <text x="484" y="164" class="t-s">every subscriber gets</text><text x="484" y="178" class="t-s">a copy at once</text>
  <line x1="20" y1="232" x2="660" y2="232" class="grid-l"/>
  <text x="20" y="256" class="t-h">EventBridge · event bus (route by rules)</text>
  <text x="20" y="278" class="t-s">Events from AWS services, SaaS apps, and your code → rules → targets. Also runs schedules.</text>
</svg>
</div>
<figcaption><b>Queue, topic, or bus.</b> SQS holds messages until a consumer is ready (one consumer per message). SNS pushes each message to all subscribers immediately. EventBridge routes events by rules from many sources, including third-party SaaS.</figcaption>
</figure>
<div class="keyterms">
  <div><b>Amazon SQS</b><span>Fully managed message queue for decoupling and buffering. Standard queues (at-least-once, best-effort order) and FIFO queues (exactly-once, strict order).</span></div>
  <div><b>Amazon SNS</b><span>Pub/sub messaging and notifications: application-to-application fan-out and application-to-person (SMS, email, mobile push).</span></div>
  <div><b>Amazon EventBridge</b><span>Serverless event bus that connects applications using events from AWS services, your apps, and SaaS partners; includes a scheduler.</span></div>
  <div><b>AWS Step Functions</b><span>Visual workflows that coordinate multiple AWS services (for example, Lambda functions) into step-by-step, retry-aware processes.</span></div>
</div>

<h2>Business applications</h2>
<div class="keyterms">
  <div><b>Amazon Connect</b><span>Omnichannel cloud contact center: set up customer service phone lines and chat in minutes, pay per use.</span></div>
  <div><b>Amazon SES</b><span>Simple Email Service: send transactional and marketing email at scale (and receive email).</span></div>
</div>

<h2>Developer tools</h2>
<div class="keyterms">
  <div><b>AWS CLI</b><span>Command line tool to manage AWS services and automate them with scripts.</span></div>
  <div><b>AWS CodeBuild</b><span>Fully managed build service: compiles source code, runs tests, produces deployable packages. Pay per build minute.</span></div>
  <div><b>AWS CodePipeline</b><span>Continuous integration and continuous delivery (CI/CD): automates the build, test, and deploy stages of each release.</span></div>
  <div><b>AWS X-Ray</b><span>Traces requests through distributed applications and microservices to find performance bottlenecks and errors.</span></div>
</div>

<h2>End-user computing</h2>
<div class="keyterms">
  <div><b>Amazon WorkSpaces</b><span>Managed virtual desktops (desktop as a service) for Windows or Linux, accessed from any device.</span></div>
  <div><b>Amazon AppStream 2.0</b><span>Streams individual desktop <em>applications</em> to a web browser, without delivering a full desktop.</span></div>
  <div><b>Amazon WorkSpaces Secure Browser</b><span>A fully managed remote browser that streams web content to users, so internal websites and SaaS apps are accessed without data reaching the device. (AWS has announced it is no longer open to new customers after October 29, 2026.)</span></div>
</div>

<h2>Frontend web and mobile, and IoT</h2>
<div class="keyterms">
  <div><b>AWS Amplify</b><span>Build, deploy, and host full-stack web and mobile applications quickly, with authentication, APIs, storage, and CI/CD hosting built in.</span></div>
  <div><b>AWS IoT Core</b><span>Securely connect billions of IoT devices to the cloud and route their messages (MQTT, HTTPS) to other AWS services.</span></div>
</div>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Decouple components, buffer requests” → <strong>SQS</strong>. “Send notifications/alerts to many subscribers” → <strong>SNS</strong>. “React to events from SaaS apps or on a schedule” → <strong>EventBridge</strong>.</li>
  <li>“Call center” → <strong>Amazon Connect</strong>. “Bulk marketing email” → <strong>SES</strong>.</li>
  <li>“Virtual desktop” → <strong>WorkSpaces</strong>. “Stream a single application to a browser” → <strong>AppStream 2.0</strong>.</li>
  <li>“Automate release pipeline” → <strong>CodePipeline</strong>. “Debug latency in microservices” → <strong>X-Ray</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/aws-overview/application-integration.html" target="_blank" rel="noopener">Application integration (Overview of AWS)</a></li>
  <li><a href="https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html" target="_blank" rel="noopener">CLF-C02 in-scope services</a></li>
</ul>`
}
);
