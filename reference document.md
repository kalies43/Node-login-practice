# Node.js Practice Project: Login System

A phased, hands-on project for learning how a web backend works: **browser → server → database**.

This document contains the **problem statement, phases, and checklists only**. There are no solutions in it. The goal is to figure each phase out by reading docs, experimenting, and debugging.

---

## Project Goal

Build a small web application where a user can:

1. Register an account
2. Log in with their credentials
3. Access a page that only logged-in users can see
4. Log out

The backend is written in **Node.js**, data is stored in **SQLite**, and the finished app is **containerized and deployed**.

## What You Will Learn

- How Node.js runs JavaScript outside the browser
- How an HTTP server receives requests and sends responses
- How a frontend talks to a backend using `fetch`
- How to store and query data with SQL
- Why passwords must be hashed, and how
- How sessions or tokens keep a user logged in
- How to package and deploy a Node app (Docker, reverse proxy)

## Rules of the Challenge

- Do the phases **in order**. Each one builds on the last.
- **Read official docs first**, search second, ask for help third.
- Commit to Git **at the end of every phase** (or more often).
- Fill in the **Reflection** section after each phase. Writing down what confused you is where most of the learning happens.
- Don't copy-paste code you can't explain line by line.

---

## Progress Tracker

| Phase | Topic | Status | Date Completed |
| --- | --- | --- | --- |
| 0 | Setup | ☐ |  |
| 1 | Core Node (no frameworks) | ☐ |  |
| 2 | Express server | ☐ |  |
| 3 | Database with SQLite | ☐ |  |
| 4 | Registration and password hashing | ☐ |  |
| 5 | Login endpoint | ☐ |  |
| 6 | Frontend forms | ☐ |  |
| 7 | Sessions and protected routes | ☐ |  |
| 8 | Hardening and error handling | ☐ |  |
| 9 | Containerize and deploy | ☐ |  |
| ★ | Stretch goals | ☐ |  |

---

## Suggested Folder Structure

You can change this, but be able to explain your choices.

```
node-login-practice/
├── public/          # frontend files (HTML, CSS, client-side JS)
├── src/             # server code
├── data/            # database file lives here (gitignored)
├── .env.example     # shows required env vars, with no real secrets
├── .gitignore
├── package.json
└── README.md
```

---

## Phase 0: Setup

**Goal:** A clean project that runs and is under version control.

**Tasks**

- \[ \] Install Node.js (LTS version) and confirm with `node -v` and `npm -v`
- \[ \] Create a project folder and initialize a Git repository
- \[ \] Initialize `package.json`
- \[ \] Create a `.gitignore` that excludes `node_modules`, the database file, and `.env`
- \[ \] Push an initial commit to GitHub

**Concepts to look up**

- What is `package.json` and what does each field do?
- What is `node_modules` and why is it never committed?

**Done when:** your repo is on GitHub, and a fresh clone followed by `npm install` works.

**Reflection:** What is the difference between `node` and `npm`?

I think node is the program and npm is the one that supplies that the program need? Or npm is the package manager?

---

## Phase 1: Core Node (No Frameworks)

**Goal:** Understand that Node is just JavaScript with access to your computer.

**Tasks**

- ~~\[ \] Write a script that prints a message and exits~~
- ~~\[ \] Write a script that reads a file and prints its contents~~
- ~~\[ \] Write a script that lists all files in a folder~~
- ~~\[ \] Write a script that reads a file and counts its lines~~
- ~~\[ \] Using only the built-in~~ ~~`http`~~ ~~module, create a server that responds with text~~
- ~~\[ \] Make that server respond differently depending on the URL requested~~
- ~~\[ \] Log every incoming request (method and URL) to the terminal~~

**Concepts to look up**

- `fs` vs `fs/promises`
- Synchronous vs asynchronous code. Why does `readFile` take a callback or return a promise?
- What are `req` and `res`?
- What does it mean that a server "listens" on a port?

**Done when:** you can open `localhost:<port>` in a browser and see different responses for different paths.

**Reflection:** In your own words, what happens between the moment you press Enter in the browser and the moment text appears on the page?

I think the moment I press Enter, my pc requests to have access to the resource or the website that my Node.js serves which is at this moment, the http.createServer’s res.end.

---

## Phase 2: Express Server

**Goal:** Rebuild your Phase 1 server using Express and understand what Express adds.

**Tasks**

- \[ \] Install Express
- \[ \] Create a server that listens on a port set by an environment variable (with a sensible default)
- \[ \] Serve static files (an HTML page) from the `public/` folder
- \[ \] Create a `GET` route that returns JSON
- \[ \] Create a `POST` route that reads a JSON body and returns it back
- \[ \] Write a simple middleware that logs each request
- \[ \] Return a proper 404 response for unknown routes

**Concepts to look up**

- What is middleware, and why does the order matter?
- What does `express.json()` do, and what happens if you forget it?
- HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and status codes (200, 201, 400, 401, 404, 500)
- Environment variables and `.env` files

**Done when:** you can test your `POST` route with a tool like `curl`, Postman, or a browser `fetch`.

**Reflection:** What problem does Express solve compared to the raw `http` module?

It creates reusable code and overall good coding design. And it doesn't look cluttered for me. It also handles the http methods easier for me to look at and later on review what might be wrong.

---

## Phase 3: Database with SQLite

**Goal:** Persist data in a real database.

**Tasks**

- \[ \] Choose and install an SQLite library for Node
- \[ \] Create a database file inside `data/`
- \[ \] Design a `users` table (decide which columns you need and why)
- \[ \] Make the table creation run safely every time the server starts
- \[ \] Write code to insert a test user
- \[ \] Write code to look up a user by username
- \[ \] Verify the data persists after restarting the server
- \[ \] Inspect the database file using an SQLite viewer or the `sqlite3` CLI

**Concepts to look up**

- Primary keys and `UNIQUE` constraints
- What a **prepared statement** (parameterized query) is
- What **SQL injection** is, with a real example of how it works
- Why you never build a query by joining strings with user input

**Done when:** you can insert and retrieve a user, and trying to insert a duplicate username fails in a controlled way.

**Reflection:** Why is a `UNIQUE` constraint on the database safer than only checking in your JavaScript code?

---

## Phase 4: Registration and Password Hashing

**Goal:** Create accounts without ever storing a plain-text password.

**Tasks**

- \[ \] Research the difference between **hashing**, **encryption**, and **encoding**
- \[ \] Choose a password hashing library and install it
- \[ \] Create a `POST /api/register` endpoint
- \[ \] Validate input: required fields, minimum password length, reasonable username format
- \[ \] Hash the password before saving it
- \[ \] Return a clear error if the username is already taken
- \[ \] Never return the password or hash in any response
- \[ \] Open the database and confirm the stored value is not readable as the original password

**Concepts to look up**

- What is a salt, and why is it needed?
- What is a "cost factor" or "salt rounds"?
- Why are fast hashes like MD5 or SHA-256 a bad choice for passwords?

**Done when:** registering the same password for two different users produces two different stored hashes.

**Reflection:** If your database leaked tomorrow, what would an attacker see, and why is that better than plain text?

---

## Phase 5: Login Endpoint

**Goal:** Verify credentials on the server.

**Tasks**

- \[ \] Create a `POST /api/login` endpoint
- \[ \] Look up the user by username
- \[ \] Compare the submitted password against the stored hash using the library's compare function
- \[ \] Return `401` for wrong credentials
- \[ \] Make the error message **identical** whether the username or the password was wrong
- \[ \] Test every case: valid login, wrong password, unknown user, missing fields

**Concepts to look up**

- Why must the error message be the same for "user not found" and "wrong password"?
- Why can't you just decrypt the stored hash and compare?

**Done when:** all four test cases behave correctly when called with `curl` or Postman.

**Reflection:** Where exactly does the credential check happen, in the browser or on the server? Why does that matter?

---

## Phase 6: Frontend Forms

**Goal:** Connect a real UI to your API.

**Tasks**

- \[ \] Build a registration page and a login page (plain HTML/CSS/JS is fine)
- \[ \] Use `fetch` to send form data to your endpoints as JSON
- \[ \] Handle success and error responses and show messages to the user
- \[ \] Prevent the default form submission behavior and understand why
- \[ \] Disable the submit button while a request is in flight

**Concepts to look up**

- `fetch` with `async/await`, and how to check `response.ok`
- `event.preventDefault()`
- Why client-side validation is a convenience and **not** security

**Done when:** you can register and log in using only the browser UI.

**Reflection:** If you remove all validation from your frontend, is your app still safe? Why or why not?

---

## Phase 7: Sessions and Protected Routes

**Goal:** Remember that a user is logged in between requests.

**Tasks**

- \[ \] Research the difference between **session cookies** and **tokens (JWT)**, then choose one and write down why
- \[ \] After a successful login, establish a session or issue a token
- \[ \] Create a `GET /api/me` (or a dashboard page) that only works when logged in
- \[ \] Return `401` when it's accessed without valid authentication
- \[ \] Create a logout endpoint that ends the session
- \[ \] Set cookie options deliberately (`httpOnly`, `sameSite`, `secure`) and understand each one
- \[ \] Put the secret key in an environment variable, never in code

**Concepts to look up**

- HTTP is stateless. What does that mean, and how do cookies work around it?
- What does `httpOnly` protect against?
- Where is session data stored, and what are the tradeoffs?

**Done when:** logging in unlocks the protected page, and logging out locks it again.

**Reflection:** Why is a stolen session cookie as dangerous as a stolen password?

---

## Phase 8: Hardening and Error Handling

**Goal:** Make the app behave well when things go wrong.

**Tasks**

- \[ \] Add a central error-handling middleware so the server never crashes on a bad request
- \[ \] Make sure error responses never leak stack traces or internal details
- \[ \] Add rate limiting to the login endpoint to slow down brute-force attempts
- \[ \] Add security headers (research what `helmet` does)
- \[ \] Add a `/health` endpoint that returns a simple status
- \[ \] Review your code against the OWASP authentication cheat sheet and list what you've covered and what you haven't

**Concepts to look up**

- What happens in Node when an async function throws and nothing catches it?
- What is brute-forcing, and how does rate limiting reduce it?
- What is CSRF, and does your chosen session approach need protection from it?

**Done when:** you can intentionally send garbage requests and the server stays up with sensible error responses.

**Reflection:** List three ways someone could attack your app, and what stops each one.

---

## Phase 9: Containerize and Deploy

**Goal:** Run your app the way real systems run it.

**Tasks**

- \[ \] Write a `Dockerfile` for the app
- \[ \] Add a `.dockerignore`
- \[ \] Write a `docker-compose.yml` that passes configuration through environment variables
- \[ \] Mount a volume so the database file survives container restarts and rebuilds
- \[ \] Add a restart policy
- \[ \] Add a container health check using your `/health` endpoint
- \[ \] Put the app behind a reverse proxy (Caddy or nginx) with HTTPS
- \[ \] Check the logs and confirm you can see requests and errors

**Concepts to look up**

- What is the difference between an image and a container?
- Why does data disappear when a container is removed, and how do volumes fix it?
- What does a reverse proxy do, and why not expose Node directly?
- Why should Node not run as root inside the container?

**Done when:** the app runs from a single `docker compose up`, survives a restart with its data intact, and is reachable through your reverse proxy.

**Reflection:** What would you need to change to run this on a different server?

---

## ★ Stretch Goals

Pick any that interest you.

- \[ \] Send a Telegram notification after several failed login attempts on one account
- \[ \] Add password reset or change-password functionality
- \[ \] Add user roles (for example `admin` and `user`) and an admin-only route
- \[ \] Add automated tests for your endpoints
- \[ \] Swap SQLite for PostgreSQL running in a separate container
- \[ \] Add structured logging
- \[ \] Set up a GitHub Actions workflow that runs your tests on every push
- \[ \] Write a short post about what you learned and link it here

---

## Learning Log

Use this as you go. Honest notes are more valuable than polished ones.

| Date | Phase | What I built | What confused me | How I solved it |
| --- | --- | --- | --- | --- |
| Nov 19 | 1 | HTTP server | The req and res variables. And FS module and what is promise vs await | Just looked at analogies for await and promise, and asked AI what sub-properties does req have and how to use it. Without telling me directly what the answer is. |

---

## Resources

Use official documentation as your main source.

- Node.js docs: https://nodejs.org/docs/latest/api/
- Express docs: https://expressjs.com/
- better-sqlite3 (one SQLite option): https://github.com/WiseLibs/better-sqlite3
- MDN Web Docs (`fetch`, HTTP, cookies): https://developer.mozilla.org/
- OWASP Cheat Sheet Series (authentication, sessions, password storage): https://cheatsheetseries.owasp.org/
- Docker docs: https://docs.docker.com/

---

## Final Checklist Before Calling It Done

- \[ \] The app runs from a fresh clone using the instructions in this README
- \[ \] No secrets, `.env` files, or database files are committed
- \[ \] Every phase has a commit and a completed reflection
- \[ \] I can explain every line of my code to someone else
