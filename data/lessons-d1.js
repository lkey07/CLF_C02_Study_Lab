/* Domain 1 — Cloud Concepts (24%) */
window.CLF = window.CLF || {}; CLF.lessons = CLF.lessons || [];
CLF.lessons.push(
{
  id: '1.1', d: 'd1', minutes: 9,
  title: 'Benefits of the AWS Cloud',
  summary: 'The value proposition of cloud computing: the six advantages, plus high availability, elasticity, agility, and global reach.',
  html: `
<p><strong>Cloud computing</strong> is the on-demand delivery of IT resources (compute, storage, databases, networking, and more) over the internet with pay-as-you-go pricing. Instead of buying and running your own data centers and servers, you rent what you need from a provider like AWS, when you need it.</p>

<h2>The six advantages of cloud computing</h2>
<p>AWS describes six advantages in its <em>Overview of Amazon Web Services</em> whitepaper. Learn them by name, because questions often paraphrase one and ask you to pick it.</p>
<div class="table-wrap"><table>
<thead><tr><th>Advantage</th><th>What it means</th><th>Typical question wording</th></tr></thead>
<tbody>
<tr><td><strong>Trade fixed expense for variable expense</strong></td><td>No large upfront investment in data centers and servers. Pay only for what you consume.</td><td>“avoid large capital expenditure”, “CapEx to OpEx”</td></tr>
<tr><td><strong>Benefit from massive economies of scale</strong></td><td>AWS aggregates usage from hundreds of thousands of customers, so its per-unit costs are lower, and it passes savings on as lower prices.</td><td>“lower pay-as-you-go prices because of aggregate usage”</td></tr>
<tr><td><strong>Stop guessing capacity</strong></td><td>Scale up or down within minutes instead of over-buying for peaks or running out of capacity.</td><td>“unpredictable demand”, “no idle resources”</td></tr>
<tr><td><strong>Increase speed and agility</strong></td><td>New resources are a click or an API call away, so teams experiment and release faster.</td><td>“reduce time to make resources available from weeks to minutes”</td></tr>
<tr><td><strong>Stop spending money running and maintaining data centers</strong></td><td>Focus on your customers and products, not on racking, stacking, and powering servers.</td><td>“focus on business differentiators, not undifferentiated heavy lifting”</td></tr>
<tr><td><strong>Go global in minutes</strong></td><td>Deploy into AWS Regions around the world to give users lower latency.</td><td>“deploy an application to users in multiple countries quickly”</td></tr>
</tbody></table></div>

<h2>Stop guessing capacity</h2>
<p>With on-premises hardware you must buy capacity months ahead, based on a forecast. If you guess high, you pay for idle servers. If you guess low, customers get errors or slow pages. In the cloud, capacity follows demand.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 640 270" role="img" aria-label="Chart comparing fixed on-premises capacity with cloud capacity that follows demand. Fixed capacity is wasted when demand is low and too small when demand peaks.">
  <line class="grid-l" x1="60" y1="30" x2="60" y2="220"/>
  <line class="grid-l" x1="60" y1="220" x2="615" y2="220"/>
  <polygon class="area-am" points="60,140 300,140 300,95 470,95 470,96 420,125 360,120 300,150 240,160 180,190 120,185 60,200"/>
  <polygon class="area-r" points="470,95 480,90 540,60 600,70 612,72 612,95"/>
  <polyline class="ln-am" points="60,140 300,140 300,95 612,95"/>
  <polyline class="ln" style="stroke-width:2.6;opacity:1" points="60,200 120,185 180,190 240,160 300,150 360,120 420,125 480,90 540,60 600,70 612,72"/>
  <polyline class="ln-a" stroke-dasharray="6 4" points="60,192 120,177 180,182 240,152 300,142 360,112 420,117 480,82 540,52 600,62 612,64"/>
  <text x="80" y="172" class="t-s">Idle capacity you paid for</text>
  <text x="314" y="112" class="t-s">More servers bought</text>
  <text x="456" y="44" class="t-s" style="fill:var(--bad)">Demand exceeds capacity</text>
  <text x="456" y="58" class="t-s" style="fill:var(--bad)">→ slow site, lost sales</text>
  <text x="338" y="240" text-anchor="middle" class="t-s">Time →</text>
  <text x="24" y="125" class="t-s" transform="rotate(-90 24 125)" text-anchor="middle">Capacity / demand</text>
  <line x1="80" y1="258" x2="104" y2="258" class="ln" style="stroke-width:2.6;opacity:1"/><text x="110" y="262" class="t-s">Actual demand</text>
  <line x1="220" y1="258" x2="244" y2="258" class="ln-am"/><text x="250" y="262" class="t-s">On-premises capacity (fixed steps)</text>
  <line x1="450" y1="258" x2="474" y2="258" class="ln-a" stroke-dasharray="6 4"/><text x="480" y="262" class="t-s">Cloud capacity (elastic)</text>
</svg>
</div>
<figcaption><b>Fixed capacity is always wrong.</b> It is too big most of the time and too small at the peak. Elastic cloud capacity tracks the demand curve, so you pay for what is used and still meet the peak.</figcaption>
</figure>

<h2>Key qualities the exam tests</h2>
<div class="keyterms">
  <div><b>High availability</b><span>The system stays up and accessible with minimal downtime, typically by running in multiple Availability Zones.</span></div>
  <div><b>Fault tolerance</b><span>The system keeps working without interruption even when a component fails. It is a stricter goal than high availability.</span></div>
  <div><b>Elasticity</b><span>Resources grow and shrink <em>automatically</em> with demand. Example: an Auto Scaling group adding instances at 9 a.m. and removing them at night.</span></div>
  <div><b>Scalability</b><span>The ability to handle more load by adding resources, either bigger instances (vertical) or more instances (horizontal).</span></div>
  <div><b>Agility</b><span>Speed of trying new ideas. Low cost and fast provisioning make experiments cheap, so failure costs little.</span></div>
  <div><b>Reliability</b><span>A workload performs its function correctly and consistently, and recovers quickly from failure.</span></div>
</div>

<h2>Benefits of the global infrastructure</h2>
<ul>
  <li><strong>Speed of deployment:</strong> a new environment in another country takes minutes, not a new data-center project.</li>
  <li><strong>Global reach and low latency:</strong> place applications in Regions close to users and use edge locations (Amazon CloudFront) to cache content near them.</li>
  <li><strong>Availability:</strong> each Region has multiple, isolated Availability Zones, so you can design for failure without building a second data center yourself.</li>
  <li><strong>Data sovereignty:</strong> choose the Region that keeps data inside a required country or jurisdiction.</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Automatically add and remove capacity” → <strong>elasticity</strong>. “Handle growth” → <strong>scalability</strong>.</li>
  <li>“Experiment quickly and cheaply” or “reduce time to market” → <strong>agility</strong> (increase speed and agility).</li>
  <li>“Lower variable costs because AWS buys at huge volume” → <strong>economies of scale</strong>.</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>The cloud does <strong>not</strong> remove all security responsibilities, and it is not automatically cheaper for every workload. Benefits come from paying for use, elasticity, and managed services. Options that say “AWS manages everything” or “no costs at all” are wrong.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html" target="_blank" rel="noopener">Six advantages of cloud computing (AWS whitepaper)</a></li>
  <li><a href="https://aws.amazon.com/what-is-cloud-computing/" target="_blank" rel="noopener">What is cloud computing?</a></li>
</ul>`
},
{
  id: '1.2', d: 'd1', minutes: 8,
  title: 'Design principles: the Well-Architected Framework',
  summary: 'The six pillars, what each one optimizes for, and the cloud design principles that keep showing up in questions.',
  html: `
<p>The <strong>AWS Well-Architected Framework</strong> is a set of best practices and questions for evaluating cloud architectures. It is organized into <strong>six pillars</strong>. You can run a free review of a workload against them in the <strong>AWS Well-Architected Tool</strong> in the console.</p>

<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 270" role="img" aria-label="The six pillars of the AWS Well-Architected Framework supporting a workload: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability.">
  <polygon class="bx-a" points="20,72 340,14 660,72"/>
  <text x="340" y="56" text-anchor="middle" class="t-h">Well-Architected workload</text>
  <g>
    <rect class="bx-w" x="24" y="82" width="96" height="128" rx="6"/>
    <text x="72" y="108" text-anchor="middle" class="t-b">Operational</text><text x="72" y="124" text-anchor="middle" class="t-b">excellence</text>
    <text x="72" y="152" text-anchor="middle" class="t-s">Run and monitor</text><text x="72" y="166" text-anchor="middle" class="t-s">systems; improve</text><text x="72" y="180" text-anchor="middle" class="t-s">processes</text>
  </g>
  <g>
    <rect class="bx-w" x="132" y="82" width="96" height="128" rx="6"/>
    <text x="180" y="116" text-anchor="middle" class="t-b">Security</text>
    <text x="180" y="152" text-anchor="middle" class="t-s">Protect data,</text><text x="180" y="166" text-anchor="middle" class="t-s">systems, and</text><text x="180" y="180" text-anchor="middle" class="t-s">assets</text>
  </g>
  <g>
    <rect class="bx-w" x="240" y="82" width="96" height="128" rx="6"/>
    <text x="288" y="116" text-anchor="middle" class="t-b">Reliability</text>
    <text x="288" y="152" text-anchor="middle" class="t-s">Recover from</text><text x="288" y="166" text-anchor="middle" class="t-s">failure; meet</text><text x="288" y="180" text-anchor="middle" class="t-s">demand</text>
  </g>
  <g>
    <rect class="bx-w" x="348" y="82" width="96" height="128" rx="6"/>
    <text x="396" y="108" text-anchor="middle" class="t-b">Performance</text><text x="396" y="124" text-anchor="middle" class="t-b">efficiency</text>
    <text x="396" y="152" text-anchor="middle" class="t-s">Right resource</text><text x="396" y="166" text-anchor="middle" class="t-s">types; keep up</text><text x="396" y="180" text-anchor="middle" class="t-s">as needs change</text>
  </g>
  <g>
    <rect class="bx-w" x="456" y="82" width="96" height="128" rx="6"/>
    <text x="504" y="108" text-anchor="middle" class="t-b">Cost</text><text x="504" y="124" text-anchor="middle" class="t-b">optimization</text>
    <text x="504" y="152" text-anchor="middle" class="t-s">Deliver value at</text><text x="504" y="166" text-anchor="middle" class="t-s">the lowest price</text>
  </g>
  <g>
    <rect class="bx-w" x="564" y="82" width="96" height="128" rx="6"/>
    <text x="612" y="116" text-anchor="middle" class="t-b">Sustainability</text>
    <text x="612" y="152" text-anchor="middle" class="t-s">Minimize</text><text x="612" y="166" text-anchor="middle" class="t-s">environmental</text><text x="612" y="180" text-anchor="middle" class="t-s">impact</text>
  </g>
  <rect class="bx" x="20" y="220" width="640" height="34" rx="6"/>
  <text x="340" y="242" text-anchor="middle" class="t-s">Foundation: general design principles + the Well-Architected Tool (free review in the console)</text>
</svg>
</div>
<figcaption><b>Six pillars, one workload.</b> Sustainability was added in 2021 as the sixth pillar. Older material that lists five pillars is out of date.</figcaption>
</figure>

<h2>Telling the pillars apart</h2>
<p>Most questions describe a goal and ask which pillar it belongs to. Match the keywords.</p>
<div class="table-wrap"><table>
<thead><tr><th>Pillar</th><th>Key ideas and keywords</th></tr></thead>
<tbody>
<tr><td><strong>Operational excellence</strong></td><td>Perform operations as code (infrastructure as code), make frequent small reversible changes, refine procedures, anticipate failure, learn from operational events, observability.</td></tr>
<tr><td><strong>Security</strong></td><td>Strong identity foundation, least privilege, traceability (logging), security at all layers, encryption in transit and at rest, keep people away from data, prepare for incidents.</td></tr>
<tr><td><strong>Reliability</strong></td><td>Automatically recover from failure, test recovery procedures, scale horizontally, stop guessing capacity, manage change through automation, multi-AZ.</td></tr>
<tr><td><strong>Performance efficiency</strong></td><td>Democratize advanced technologies (use managed services), go global in minutes, use serverless architectures, experiment more often, mechanical sympathy (choose the right instance or database type).</td></tr>
<tr><td><strong>Cost optimization</strong></td><td>Cloud financial management, adopt a consumption model, measure overall efficiency, stop spending on undifferentiated heavy lifting, analyze and attribute expenditure (tags).</td></tr>
<tr><td><strong>Sustainability</strong></td><td>Understand your impact, maximize utilization, use managed services and efficient hardware, reduce downstream impact, shared responsibility for sustainability.</td></tr>
</tbody></table></div>

<h2>General cloud design principles</h2>
<p>Beyond the pillars, AWS recommends a handful of habits that make architectures cloud-native:</p>
<ul>
  <li><strong>Design for failure.</strong> Assume components will fail, and remove single points of failure (for example, run in at least two Availability Zones).</li>
  <li><strong>Decouple components.</strong> Use queues (Amazon SQS) and events (Amazon SNS, Amazon EventBridge) so one part can fail or scale without breaking the others.</li>
  <li><strong>Implement elasticity.</strong> Scale out and in automatically instead of sizing for the peak.</li>
  <li><strong>Think parallel.</strong> Many small instances working at once beat one big one, often for the same price.</li>
  <li><strong>Automate.</strong> Infrastructure as code (AWS CloudFormation) makes environments repeatable and reduces human error.</li>
  <li><strong>Treat servers as disposable resources.</strong> Replace instead of repair; do not hand-tune long-lived servers.</li>
  <li><strong>Use managed services.</strong> Let AWS handle patching, backups, and scaling (Amazon RDS, AWS Lambda, Amazon S3).</li>
</ul>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Ability to recover from infrastructure disruption” → <strong>Reliability</strong>. “Use computing resources efficiently” → <strong>Performance efficiency</strong>.</li>
  <li>“Run and monitor systems, continually improve processes” → <strong>Operational excellence</strong>.</li>
  <li>“Minimize environmental impact, maximize utilization” → <strong>Sustainability</strong>.</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>“Scalability”, “elasticity”, and “agility” are <strong>not</strong> pillar names. If a question asks for a pillar, the answer must be one of the six exact names.</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" target="_blank" rel="noopener">AWS Well-Architected Framework</a></li>
  <li><a href="https://aws.amazon.com/well-architected-tool/" target="_blank" rel="noopener">AWS Well-Architected Tool</a></li>
</ul>`
},
{
  id: '1.3', d: 'd1', minutes: 10,
  title: 'Migration to the AWS Cloud',
  summary: 'The AWS Cloud Adoption Framework (CAF), the 7 Rs of migration, and the AWS services that support a migration journey.',
  html: `
<p>Moving to the cloud is a business change as much as a technical one. AWS gives you a framework to organize the change (the <strong>Cloud Adoption Framework</strong>), a vocabulary for migration strategies (the <strong>7 Rs</strong>), and tools for each step.</p>

<h2>AWS Cloud Adoption Framework (AWS CAF)</h2>
<p>AWS CAF groups guidance into <strong>six perspectives</strong>. Each perspective is owned by different stakeholders.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 300" role="img" aria-label="AWS CAF: three business perspectives (Business, People, Governance) and three technical perspectives (Platform, Security, Operations) leading to four business outcomes.">
  <text x="20" y="22" class="eyebrow t-m" style="letter-spacing:.08em">BUSINESS CAPABILITIES</text>
  <rect class="bx-d1" x="20" y="32" width="128" height="62" rx="8"/><text x="84" y="57" text-anchor="middle" class="t-b">Business</text><text x="84" y="76" text-anchor="middle" class="t-s">CEO, CFO, COO</text>
  <rect class="bx-d1" x="158" y="32" width="128" height="62" rx="8"/><text x="222" y="57" text-anchor="middle" class="t-b">People</text><text x="222" y="76" text-anchor="middle" class="t-s">HR, culture, skills</text>
  <rect class="bx-d1" x="296" y="32" width="128" height="62" rx="8"/><text x="360" y="57" text-anchor="middle" class="t-b">Governance</text><text x="360" y="76" text-anchor="middle" class="t-s">CFO, risk, PMO</text>
  <text x="20" y="134" class="t-m" style="letter-spacing:.08em">TECHNICAL CAPABILITIES</text>
  <rect class="bx-d3" x="20" y="144" width="128" height="62" rx="8"/><text x="84" y="169" text-anchor="middle" class="t-b">Platform</text><text x="84" y="188" text-anchor="middle" class="t-s">CTO, architects</text>
  <rect class="bx-d3" x="158" y="144" width="128" height="62" rx="8"/><text x="222" y="169" text-anchor="middle" class="t-b">Security</text><text x="222" y="188" text-anchor="middle" class="t-s">CISO, security team</text>
  <rect class="bx-d3" x="296" y="144" width="128" height="62" rx="8"/><text x="360" y="169" text-anchor="middle" class="t-b">Operations</text><text x="360" y="188" text-anchor="middle" class="t-s">IT ops, support</text>
  <path class="ln" d="M432 63 H470 V120 H496" marker-end="url(#arr)"/>
  <path class="ln" d="M432 175 H470 V120"/>
  <text x="588" y="22" text-anchor="middle" class="t-m" style="letter-spacing:.08em">BUSINESS OUTCOMES</text>
  <rect class="bx-g" x="500" y="32" width="170" height="40" rx="8"/><text x="585" y="57" text-anchor="middle" class="t-s" style="fill:currentColor">Reduced business risk</text>
  <rect class="bx-g" x="500" y="80" width="170" height="40" rx="8"/><text x="585" y="105" text-anchor="middle" class="t-s" style="fill:currentColor">Improved ESG performance</text>
  <rect class="bx-g" x="500" y="128" width="170" height="40" rx="8"/><text x="585" y="153" text-anchor="middle" class="t-s" style="fill:currentColor">Increased revenue</text>
  <rect class="bx-g" x="500" y="176" width="170" height="40" rx="8"/><text x="585" y="201" text-anchor="middle" class="t-s" style="fill:currentColor">Increased operational efficiency</text>
  <text x="20" y="244" class="t-m" style="letter-spacing:.08em">TRANSFORMATION PHASES</text>
  <rect class="bx" x="20" y="254" width="148" height="34" rx="6"/><text x="94" y="276" text-anchor="middle" class="t-b">Envision</text>
  <rect class="bx" x="186" y="254" width="148" height="34" rx="6"/><text x="260" y="276" text-anchor="middle" class="t-b">Align</text>
  <rect class="bx" x="352" y="254" width="148" height="34" rx="6"/><text x="426" y="276" text-anchor="middle" class="t-b">Launch</text>
  <rect class="bx" x="518" y="254" width="152" height="34" rx="6"/><text x="594" y="276" text-anchor="middle" class="t-b">Scale</text>
  <line class="ln" x1="168" y1="271" x2="184" y2="271" marker-end="url(#arr)"/>
  <line class="ln" x1="334" y1="271" x2="350" y2="271" marker-end="url(#arr)"/>
  <line class="ln" x1="500" y1="271" x2="516" y2="271" marker-end="url(#arr)"/>
</svg>
</div>
<figcaption><b>Six perspectives, four outcomes.</b> Business, People, and Governance focus on business capabilities. Platform, Security, and Operations focus on technical capabilities. The transformation runs through Envision, Align, Launch, and Scale.</figcaption>
</figure>

<div class="table-wrap"><table>
<thead><tr><th>Perspective</th><th>Focus</th></tr></thead>
<tbody>
<tr><td><strong>Business</strong></td><td>Cloud investments accelerate digital transformation and business outcomes. Strategy, portfolio, data monetization.</td></tr>
<tr><td><strong>People</strong></td><td>Bridges technology and business: culture, organizational structure, leadership, training and new skills.</td></tr>
<tr><td><strong>Governance</strong></td><td>Orchestrates the initiative while maximizing benefits and minimizing risk: program management, benefits tracking, risk, cloud financial management.</td></tr>
<tr><td><strong>Platform</strong></td><td>Builds an enterprise-grade, scalable hybrid cloud platform: architecture, modern applications, provisioning.</td></tr>
<tr><td><strong>Security</strong></td><td>Confidentiality, integrity, and availability of data and workloads: identity, threat detection, data protection, incident response.</td></tr>
<tr><td><strong>Operations</strong></td><td>Cloud services run and are delivered at agreed levels: observability, event and incident management, patching, availability.</td></tr>
</tbody></table></div>

<h2>The 7 Rs: migration strategies</h2>
<p>For each application, you choose one of seven strategies. They range from “do nothing” to “rebuild the application for the cloud”.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 680 220" role="img" aria-label="The 7 Rs of migration ordered from least to most effort: Retire, Retain, Rehost, Relocate, Repurchase, Replatform, Refactor.">
  <defs><linearGradient id="g7r" x1="0" x2="1"><stop offset="0" style="stop-color:var(--surface-2)"/><stop offset="1" style="stop-color:var(--accent-soft)"/></linearGradient></defs>
  <rect x="20" y="20" width="640" height="26" rx="13" fill="url(#g7r)" style="stroke:var(--line)"/>
  <text x="34" y="38" class="t-s" style="fill:currentColor">Less effort, less change</text>
  <text x="646" y="38" text-anchor="end" class="t-s" style="fill:currentColor">More effort, more cloud benefit →</text>
  <g>
    <rect class="bx-w" x="20" y="62" width="84" height="140" rx="8"/><text x="62" y="86" text-anchor="middle" class="t-b">Retire</text>
    <text x="62" y="110" text-anchor="middle" class="t-s">Turn it off.</text><text x="62" y="124" text-anchor="middle" class="t-s">No longer</text><text x="62" y="138" text-anchor="middle" class="t-s">needed</text>
  </g>
  <g>
    <rect class="bx-w" x="113" y="62" width="84" height="140" rx="8"/><text x="155" y="86" text-anchor="middle" class="t-b">Retain</text>
    <text x="155" y="110" text-anchor="middle" class="t-s">Keep on-prem</text><text x="155" y="124" text-anchor="middle" class="t-s">for now;</text><text x="155" y="138" text-anchor="middle" class="t-s">revisit later</text>
  </g>
  <g>
    <rect class="bx-a" x="206" y="62" width="84" height="140" rx="8"/><text x="248" y="86" text-anchor="middle" class="t-b">Rehost</text>
    <text x="248" y="110" text-anchor="middle" class="t-s">“Lift and</text><text x="248" y="124" text-anchor="middle" class="t-s">shift” as-is</text><text x="248" y="138" text-anchor="middle" class="t-s">to EC2</text>
    <text x="248" y="186" text-anchor="middle" class="t-m t-acc">MGN</text>
  </g>
  <g>
    <rect class="bx-w" x="299" y="62" width="84" height="140" rx="8"/><text x="341" y="86" text-anchor="middle" class="t-b">Relocate</text>
    <text x="341" y="110" text-anchor="middle" class="t-s">Move VMware</text><text x="341" y="124" text-anchor="middle" class="t-s">VMs without</text><text x="341" y="138" text-anchor="middle" class="t-s">changes</text>
  </g>
  <g>
    <rect class="bx-w" x="392" y="62" width="84" height="140" rx="8"/><text x="434" y="86" text-anchor="middle" class="t-b">Repurchase</text>
    <text x="434" y="110" text-anchor="middle" class="t-s">“Drop and</text><text x="434" y="124" text-anchor="middle" class="t-s">shop”: move</text><text x="434" y="138" text-anchor="middle" class="t-s">to SaaS</text>
  </g>
  <g>
    <rect class="bx-w" x="485" y="62" width="84" height="140" rx="8"/><text x="527" y="86" text-anchor="middle" class="t-b">Replatform</text>
    <text x="527" y="110" text-anchor="middle" class="t-s">“Lift, tinker,</text><text x="527" y="124" text-anchor="middle" class="t-s">and shift”,</text><text x="527" y="138" text-anchor="middle" class="t-s">e.g. to RDS</text>
    <text x="527" y="186" text-anchor="middle" class="t-m t-acc">DMS</text>
  </g>
  <g>
    <rect class="bx-w" x="578" y="62" width="82" height="140" rx="8"/><text x="619" y="86" text-anchor="middle" class="t-b">Refactor</text>
    <text x="619" y="110" text-anchor="middle" class="t-s">Re-architect</text><text x="619" y="124" text-anchor="middle" class="t-s">cloud-native</text><text x="619" y="138" text-anchor="middle" class="t-s">(serverless)</text>
  </g>
</svg>
</div>
<figcaption><b>Pick the R per application, not per company.</b> Rehost is the fastest way to leave a data center; refactor delivers the most cloud benefit but needs the most work.</figcaption>
</figure>

<h2>Tools that support the migration journey</h2>
<div class="keyterms">
  <div><b>Migration Evaluator</b><span>Builds a data-driven business case: projected AWS cost based on your current on-premises usage.</span></div>
  <div><b>AWS Application Discovery Service</b><span>Collects inventory, configuration, and dependency data from on-premises servers to plan the migration.</span></div>
  <div><b>AWS Migration Hub</b><span>One place to track the progress of migrations across multiple AWS and partner tools.</span></div>
  <div><b>AWS Application Migration Service (MGN)</b><span>The primary service for rehosting (lift and shift) servers to Amazon EC2 with minimal downtime, using continuous block-level replication.</span></div>
  <div><b>AWS Database Migration Service (DMS)</b><span>Migrates databases to AWS while the source stays fully operational. Supports continuous <em>database replication</em> (change data capture).</span></div>
  <div><b>AWS Schema Conversion Tool (SCT)</b><span>Converts a database schema and code from one engine to another (for example, Oracle to Amazon Aurora PostgreSQL). Used with DMS for heterogeneous migrations.</span></div>
</div>
<p>People and expertise also support migration: <strong>AWS Professional Services</strong>, <strong>AWS Partners</strong> (system integrators), <strong>AWS Prescriptive Guidance</strong> (patterns and playbooks), and <strong>AWS Skill Builder</strong> training.</p>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Move as-is, as fast as possible” → <strong>Rehost</strong> (AWS Application Migration Service).</li>
  <li>“Same engine, minor optimization, managed database” → <strong>Replatform</strong> (for example, self-managed MySQL to Amazon RDS for MySQL).</li>
  <li>“Different database engine” → <strong>DMS + SCT</strong>. Same engine → DMS alone.</li>
  <li>Training and new skills for staff → CAF <strong>People</strong> perspective. Risk and benefits tracking → <strong>Governance</strong>.</li>
</ul></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/cloud-adoption-framework/" target="_blank" rel="noopener">AWS Cloud Adoption Framework</a></li>
  <li><a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html" target="_blank" rel="noopener">Migration strategies (AWS Prescriptive Guidance)</a></li>
</ul>`
},
{
  id: '1.4', d: 'd1', minutes: 9,
  title: 'Cloud economics',
  summary: 'Fixed versus variable costs, the hidden costs of on-premises data centers, licensing models, rightsizing, automation, and economies of scale.',
  html: `
<h2>Fixed costs versus variable costs</h2>
<p>On premises, most IT spending is a <strong>capital expense (CapEx)</strong>: you buy servers, storage, and network gear up front and depreciate them over years. These are <strong>fixed costs</strong>; you pay them whether the hardware is busy or idle.</p>
<p>In the cloud, spending becomes an <strong>operational expense (OpEx)</strong>: a <strong>variable cost</strong> that rises and falls with usage. You trade a large upfront investment for pay-as-you-go pricing.</p>

<h2>The real cost of on-premises</h2>
<p>When comparing costs, people usually count the servers and miss most of the bill. A <strong>total cost of ownership (TCO)</strong> comparison includes everything below the waterline.</p>
<figure class="dg">
<div class="dg-scroll">
<svg viewBox="0 0 640 300" role="img" aria-label="Iceberg of on-premises costs. Visible: server hardware, storage, software licenses. Hidden: data center space, power and cooling, networking, staff, physical security, maintenance, hardware refresh, over-provisioning.">
  <polygon class="bx-w" points="250,40 330,18 410,40 430,96 230,96"/>
  <text x="330" y="58" text-anchor="middle" class="t-b">Server hardware</text>
  <text x="330" y="74" text-anchor="middle" class="t-s">Storage · Software licenses</text>
  <line x1="20" y1="96" x2="620" y2="96" class="ln-a" stroke-dasharray="8 5"/>
  <text x="24" y="88" class="t-m t-acc">WHAT GETS BUDGETED</text>
  <text x="24" y="114" class="t-m" style="fill:var(--amber)">WHAT ALSO GETS PAID</text>
  <polygon class="bx-am" points="230,96 430,96 560,170 520,270 140,270 100,170"/>
  <text x="330" y="128" text-anchor="middle" class="t-s" style="fill:currentColor">Data center space and real estate</text>
  <text x="330" y="148" text-anchor="middle" class="t-s" style="fill:currentColor">Power, cooling, and backup generators</text>
  <text x="330" y="168" text-anchor="middle" class="t-s" style="fill:currentColor">Network equipment and connectivity</text>
  <text x="330" y="188" text-anchor="middle" class="t-s" style="fill:currentColor">IT staff to rack, patch, and repair</text>
  <text x="330" y="208" text-anchor="middle" class="t-s" style="fill:currentColor">Physical security and compliance audits</text>
  <text x="330" y="228" text-anchor="middle" class="t-s" style="fill:currentColor">Hardware refresh every 3–5 years</text>
  <text x="330" y="248" text-anchor="middle" class="t-s" style="fill:currentColor">Idle capacity bought for peak demand</text>
</svg>
</div>
<figcaption><b>Most on-premises cost is invisible on the purchase order.</b> Use Migration Evaluator or the AWS Pricing Calculator to compare full costs, not just hardware prices.</figcaption>
</figure>

<h2>Licensing strategies</h2>
<div class="table-wrap"><table>
<thead><tr><th>Model</th><th>How it works</th><th>When to use</th></tr></thead>
<tbody>
<tr><td><strong>License included</strong></td><td>The license cost is part of the hourly price (for example, Windows Server or SQL Server on Amazon EC2, Oracle on Amazon RDS license-included).</td><td>No existing licenses; want simplicity and flexibility.</td></tr>
<tr><td><strong>Bring Your Own License (BYOL)</strong></td><td>Reuse licenses you already own. Some vendor terms are tied to physical sockets or cores, which require <strong>Amazon EC2 Dedicated Hosts</strong>.</td><td>You already paid for licenses and want to avoid paying twice.</td></tr>
</tbody></table></div>
<p><strong>AWS License Manager</strong> tracks license usage across AWS and on premises and helps enforce license rules, so you stay compliant with vendor terms.</p>

<h2>Rightsizing</h2>
<p><strong>Rightsizing</strong> means matching instance types and sizes to actual workload needs at the lowest cost. It is one of the quickest ways to save money because many instances are over-provisioned.</p>
<ul>
  <li><strong>AWS Compute Optimizer</strong> analyzes utilization metrics and recommends better EC2 instance types, EBS volumes, Lambda memory sizes, and more.</li>
  <li><strong>AWS Cost Explorer</strong> includes rightsizing recommendations for EC2.</li>
  <li><strong>AWS Trusted Advisor</strong> flags low-utilization EC2 instances and idle resources.</li>
</ul>

<h2>Benefits of automation</h2>
<ul>
  <li><strong>Fewer human errors and consistent environments:</strong> AWS CloudFormation builds identical stacks every time.</li>
  <li><strong>Lower cost:</strong> automatically stop development instances at night, scale in when demand drops.</li>
  <li><strong>Faster delivery:</strong> CI/CD pipelines (AWS CodePipeline, AWS CodeBuild) release changes in minutes.</li>
  <li><strong>Less operational toil:</strong> AWS Systems Manager automates patching and routine tasks.</li>
</ul>

<h2>Economies of scale</h2>
<p>AWS buys hardware, power, and network capacity at enormous volume and runs it efficiently. Lower unit costs let AWS reduce prices; it has done so many times since 2006. Customers benefit without negotiating anything.</p>

<div class="callout tip"><b>Exam tip</b>
<ul>
  <li>“Reduce capital expenditure” or “no upfront cost” → <strong>trade fixed expense for variable expense</strong>.</li>
  <li>Licenses bound to physical cores or sockets → <strong>Dedicated Hosts</strong>. Track license compliance → <strong>AWS License Manager</strong>.</li>
  <li>“Instances are underutilized; reduce cost” → <strong>rightsizing</strong> (Compute Optimizer).</li>
</ul></div>
<div class="callout trap"><b>Common trap</b>
<p>Moving to the cloud does not eliminate cost management. Labor costs move from racking hardware to managing cloud usage, and an unmanaged account can overspend. That is why AWS Budgets, Cost Explorer, and tagging exist (Domain 4).</p></div>

<h3>Official resources</h3>
<ul>
  <li><a href="https://aws.amazon.com/economics/" target="_blank" rel="noopener">AWS Cloud Economics Center</a></li>
  <li><a href="https://aws.amazon.com/compute-optimizer/" target="_blank" rel="noopener">AWS Compute Optimizer</a></li>
</ul>`
}
);
