---
layout: post
title: "The Harness-Harness: a Cunning Plan for Your AI Agent"
date: 2026-06-13
categories:
  - agent-tooling
  - edinburgh-protocol
  - silo
tags:
  - ai-agents
  - workflow
  - post-blog
status: published
notice: |
  "This is a dirty footprint left in a private hallway.
   
   If you do not already know what these words mean,
   there is absolutely nothing for you here. Move on."
---

The year is 2026. Your AI coding agent just committed a 200-line refactor you
didn't ask for, renamed three environment variables by mistake, and is now
"researching" whether PostgreSQL supports MongoDB-style collections. You
didn't ask it to do any of this. You asked it to fix a typo.

The consultant says you need better prompts. You buy a prompt engineering
course. The agent is now slightly more polite about its rampages, but still
rampaging.

The consultant says you need a framework. You install one. The agent now has
opinions about the framework. You didn't ask it to have opinions.

The consultant says you need a methodology. Briefs. Debriefs. Structured
sessions. An external task database. A hard filesystem boundary. An agent
identity based on 18th-century Scottish philosophy. You install all of it, and
it works. The agent stays on task. The commits are clean. The sessions are
productive.

And then you realize, with a dawning horror familiar to anyone who's ever
climbed the JavaScript framework ladder, that you have built a harness for
your harness. A structure for your structure. A cunning plan. A Harness-Harness.

---

This is not a bug. It's the point.

Every sufficiently complex tool develops a surrounding ecosystem of practice.
Nobody just "writes code in Python." They use a virtual environment, a linter,
a formatter, a test runner, a type checker, and a deployment pipeline. Python
is the harness. The ecosystem is the harness-harness.

AI agents are the same, just faster. The agent is the harness — it writes code,
runs commands, opens files. The harness-harness is everything that keeps it
from writing the wrong code, running the wrong commands, and opening files
in `/etc` because it was "trying to help."

---

So: do you need a harness-harness?

If your agent sessions are under 10 minutes: probably not. Just chat. Fix a
bug. Move on.

If your agent is doing multi-session work across days, commits are going to
production, and you have Opinions about what should and shouldn't be touched:
yes. You need a harness-harness. You need briefs. You need debriefs. You need
a task database that remembers what you were doing when the context window
collapsed. You need a silo boundary that says "I'm staying in" without asking
permission. You need an agent that knows the difference between a map and a
territory.

What you don't need is another framework. A Harness-Harness isn't software.
It's four files and a discipline:

1. **A brief** — what and why, in under 2KB, frozen when work starts
2. **A debrief** — what worked, what didn't, what to try next, written when work ends
3. **A task database** — not a TODO list; a structured log of sessions, handoffs,
   and reviews that survives context compaction
4. **A boundary** — one hard rule: the agent stays in the project

That's it. No YAML config. No plugin marketplace. No SaaS dashboard. Just text
files and a discipline. It's so simple it's almost insulting. Which is, of
course, exactly what makes it a cunning plan.

---

Blackadder would approve. Baldrick definitely wouldn't understand it.