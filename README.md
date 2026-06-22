# Project 1 — Continuous Integration with GitHub Actions

Automated validation of a Node.js application using GitHub Actions and Jest. Every push to the repository triggers a CI pipeline that installs dependencies, executes tests, and reports success or failure before any future deployment stage is allowed to proceed.

## The Problem This Solves

Before Continuous Integration, developers were responsible for manually verifying their own code.

A typical workflow looked like:

1. Write code
2. Run tests locally (if remembered)
3. Push code to GitHub
4. Hope nothing was missed

This works when one developer has full context of every change.

As projects grow, problems appear:

* Did anyone actually run the tests?
* Did the tests pass?
* Was the latest change validated?
* Can the team trust the current codebase?

Manual validation depends on human discipline. Continuous Integration replaces trust with automated verification.

Every code change is checked the same way, every time.

---

## What Was Built

* Simple Node.js application
* Automated test suite using Jest
* GitHub repository with proper Git workflow
* GitHub Actions CI pipeline
* Automatic dependency installation
* Automatic test execution on push
* Pass/fail reporting directly inside GitHub
* Intentional failure testing to validate the pipeline itself

---

## Architecture

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    │ triggers workflow
    ▼
GitHub Actions Runner
    │
    ├── Checkout Repository
    │
    ├── Install Dependencies
    │      npm install
    │
    ├── Run Tests
    │      npm test
    │
    └── Report Result
           PASS / FAIL
```

The GitHub Actions runner is a temporary Linux machine created automatically for each pipeline run.

The runner starts completely empty and performs the validation process from scratch every time.

---

## Pipeline Structure

```text
push to main
     │
     ▼
┌───────────────────┐
│ Checkout Code     │
│                   │
│ Downloads the     │
│ repository onto   │
│ the runner.       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Install           │
│ Dependencies      │
│                   │
│ npm install       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Run Tests         │
│                   │
│ npm test          │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Pass / Fail       │
│ Reported to       │
│ GitHub            │
└───────────────────┘
```

---

## Why Testing Matters

A program can start successfully and still be wrong.

Example:

```javascript
function add(a, b) {
    return a + b + 1;
}
```

The application runs.

Nothing crashes.

Node.js reports no errors.

But:

```javascript
add(1,2)
```

returns:

```javascript
4
```

instead of:

```javascript
3
```

This is called a logical bug.

The application is running.

The logic is incorrect.

Automated tests exist to verify behavior, not just prevent crashes.

---

## Validation Through Failure

One of the most important parts of this project was intentionally breaking the application.

The goal was not to see a green pipeline.

The goal was to verify that the CI system could detect problems.

After intentionally breaking the test:

* The workflow failed
* GitHub reported the failure
* The pipeline stopped automatically

This proved that the validation process was functioning correctly.

A CI pipeline that never fails cannot be trusted.

Understanding failure is part of understanding CI.

---

## Key Technical Decisions

### 1 — Automated Validation on Every Push

Every push to the configured branch automatically triggers validation.

Developers do not need to remember to run tests manually.

The process is enforced automatically.

---

### 2 — Clean Runner Every Time

GitHub Actions creates a new Linux machine for every run.

This prevents:

* leftover files
* hidden dependencies
* machine-specific configuration

Every validation starts from a known clean state.

---

### 3 — Jest for Automated Testing

The project uses Jest to verify application behavior.

Example:

```javascript
expect(add(1,2)).toBe(3);
```

The test encodes an expectation.

If the expectation is violated, the pipeline fails automatically.

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Vimukthi-Randunu/ci-cd-project-1.git
cd ci-cd-project-1
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```
---
## Evolution

This project solved:

"How do we automatically verify that code works?"

The next problem naturally appeared:

"How do we automatically deploy validated code to real infrastructure?"

That led to Project 2 — Continuous Deployment.

---
## Part of a Progressive DevOps Series

✅ Project 1 — Continuous Integration with GitHub Actions (Current Repository)

➡️ Project 2 — Continuous Deployment to AWS EC2 with health checks and rollback

➡️ Project 3 — Language-agnostic CI/CD using Python Flask

➡️ Project 4 — Dockerized deployments with Git SHA image tagging and rollback

➡️ Project 5 — Multi-container systems with Docker Compose

➡️ Project 6 — Staging and production environments with approval gates

➡️ Project 7 — Real-world open-source application modernization

➡️ Project 8 — Production-grade FastAPI Waitlist API

➡️ Project 9 — Webhook Delivery System with Observability

➡️ Project 10 — Kubernetes Orchestration
