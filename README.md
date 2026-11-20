# CLF-C02 Study Lab

A free, static study site for the **AWS Certified Cloud Practitioner (CLF-C02)** exam.
No build step, no backend, no login. Open `index.html` or host the folder anywhere.

## What's inside

| Section | What it does |
|---|---|
| **Learn** | 19 lessons, one per task statement in the official exam guide (v1.3, Oct 2026), with diagrams, exam tips, and common traps |
| **Services** | Searchable catalog of all 111 in-scope services, each with the "exam cue" phrase that points to it |
| **Flashcards** | 179 cards (services + key concepts), with a "still learning" filter |
| **Practice** | Questions filtered by domain, task statement, unseen, wrong, or bookmarked, with instant explanations |
| **Mock exam** | 8 fixed Practice Tests (65 questions / 90 minutes each, no overlap, best score tracked) plus random exams (65/90, 33/45, 15/20), all weighted like the official exam; flag, navigator, timer, review |
| **Review** | Mistakes (auto-tracked), bookmarks, and exam history |
| **Question bank** | Browse and search all 531 original questions with answers and explanations |
| **Resources** | Official AWS training, whitepapers, hands-on and community links, and a 4-week plan |
| **Progress & backup** | Export and import progress as JSON, theme, reset |

The fixed Practice Tests are built from the bank with a seeded shuffle. Adding questions to a domain can change which questions land in each test; past results stay intact because each attempt stores its own question ids.

Progress is stored in the browser's `localStorage` under the key `clfc02.v1`.

## Project structure

```
index.html              App shell (navigation, shared SVG markers)
assets/css/styles.css   Design tokens (light + dark) and all styles
assets/js/app.js        Router, views, practice and exam engines, storage
data/domains.js         Domains, weights, task statements
data/lessons-d1..4.js   Lesson HTML (with inline SVG diagrams)
data/services.js        In-scope service catalog
data/concepts.js        Concept flashcards
data/questions-d*.js    Question bank (531 questions)
data/notes/notes-*.js   Per-option explanations + AWS documentation sources for every question
```

## Adding questions

Add a line to the right `data/questions-dN.js` file:

```js
Q(51, '1.4', 'Question text? (Choose two.)',
  ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'], [0, 2],
  '<p>Explanation. Say why the right answers are right <b>and</b> why the others are wrong.</p>'),
```

- `51` becomes the id `d1-051`. Keep ids unique; never reuse a deleted id, or stored progress will point to the wrong question.
- `'1.4'` is the task statement (must exist in `data/domains.js`).
- The answer array holds zero-based option indexes. More than one index makes it a multiple-response question; end the stem with `(Choose two.)`.
- Options are shuffled when shown, except when one says "All of the above" or similar.

Then add its per-option explanations and sources to a file in `data/notes/` (loaded by `index.html`):

```js
'd1-051': { x: ['Why option A is right/wrong', 'Why B…', 'Why C…', 'Why D…'],
            s: ['https://docs.aws.amazon.com/…'] },
```

`x` must have exactly one entry per option, in the original option order. `s` should only contain official AWS pages you have opened and checked.

## Deploying for free

Any static host works. Pick one:

### GitHub Pages
1. Create a GitHub repository and push this folder to it.
2. Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

### Cloudflare Pages
1. Push the folder to GitHub (or GitLab).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: *None*. Build command: empty. Output directory: `/`.
4. You get `https://<project>.pages.dev`, redeployed on every push.

### Amazon S3 + CloudFront (good CLF-C02 practice)
1. Create an S3 bucket and upload all files, keeping the folder structure.
2. Create a CloudFront distribution with the bucket as origin using **Origin Access Control**, so the bucket stays private. Set the default root object to `index.html`.
3. Before anything else, create an **AWS Budgets** alert (for example, $1), enable **MFA on the root user**, and do daily work as an IAM Identity Center or IAM user.

## Content notes

- Lessons and questions follow the official exam guide and in-scope service list. Check the [exam guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) for updates.
- Support plans reflect the December 2025 lineup (Basic, Business Support+, Enterprise Support, Unified Operations). Developer, Business, and Enterprise On-Ramp are discontinued on January 1, 2027.
- All questions are original and written for this site. They are not real exam questions.
