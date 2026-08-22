---
layout: post
title: "A Beginning Is a Delicate Time"
date: 2026-08-22
categories: [engineering, methodology, ai]
tags: [repos, entropy, justfile, laozi, agents]
---

"A beginning is a delicate time."

Princess Irulan says so in the appendix of *Dune*, and she isn't being decorative. The full line runs on: know then that this is the time for taking the most delicate care that the balances are correctly set. Herbert, as ever, is passing Laozi through the stillsuit. Chapter 64 of the *Tao Te Ching* makes the same point with less ceremony: *act on it before it exists; put it in order before it turns chaotic.* A nine-story tower rises from a heap of earth. The heap is when you shape it.

I have been starting a new repository, and the old line kept paying rent.

## The Heap

The repository in question — a terminal markdown viewer — is pre-implementation. No source directory, no compiler output, nothing you could run. What it *does* have is a `justfile`: the facade through which every future session, human or agent, will touch the work. And the facade had, in the way of first drafts everywhere, quietly gone seedy. A help recipe that was twenty-four lines of `echo` statements, half of them duplicating another recipe's job. Registry commands with no descriptions at all. Live git state pasted into what should have been a static page.

Nothing was broken. Everything mattered.

This is the counterintuitive part. It *feels* like the right move is to push on toward the interesting work — the renderer, the thing the repository actually exists to build — and tidy the entrance hall later, if ever. The justfile is not the product. Who cares?

Your agents care. And that is the new factor that makes an old truth newly urgent.

## The Barnacles Calcify Fast

Call it **facade entropy**: the disorder that accumulates on a repository's public surface — unclear commands, duplicated concerns, help text that describes a workflow that no longer exists. In a solo-human repo, facade entropy is a slow tax. You wrote the echoes; you remember what they mean.

In a paired workflow — agent in one terminal, human auditing in another — facade entropy compounds, because **whatever the first sessions produce becomes the house pattern**. Agents are relentless imitators of whatever they can see. An agent arriving in a messy justfile does not think "this facade is cluttered"; it thinks "this is how facades are done here" and contributes to the pattern. Three sessions later, the twenty-four-line echo wall isn't an accident. It's a *style*, with precedent, defended by inertia. The barnacles have become load-bearing.

And the cost curve is brutal. Pre-implementation, the scrape took one afternoon: delete the echo wall, give every recipe a noun-phrase description, group the menu, split static help from live state. Post-implementation, the same cleanup means breaking muscle memory in two species at once — the human's and every agent session's — plus references already quoted in READMEs, playbooks, and commit messages. Entropy compounds. So does the cost of removing it.

## The Convergence

What I find genuinely pleasing is that the lesson needed no originality. Three traditions with no shared ancestry land on the same operational advice:

- **Laozi**: act before things manifest. The heap-of-earth stage is when shaping is cheapest.
- **Hume**: inherited patterns deserve inspection, not absorption. The echo wall was inherited from nobody — which is exactly why it would have been inherited by everybody.
- **Watt**: the governor matters most before the flywheel has speed. A facade is a governor; it steers every future action in the repo.

And the shipwright's edition, which this blog already keeps on file: **scrape the barnacles before you proceed**. Same law, different trade.

When independent traditions converge like this, it isn't coincidence. It's systems behaving like systems. A repository is a system whose initial conditions get copied forward with unusual fidelity, because its readers — human and machine alike — are pattern-matchers working from whatever's in view.

## The Protocol

Stripped of the poetry, the practice is small:

1. **At founding, the facade is the product.** There is no other product yet. Budget accordingly.
2. **Scrape before the first implementation commit**, when nothing depends on the barnacles.
3. **Split the menu from the manual.** The command list names items; a static help page carries the details for those who delve. One concern per recipe; live state in exactly one place.
4. **Name renames as API changes.** Recipe names are the shared vocabulary of two species. Breaking them breaks the audit trail the paired-terminal workflow depends on.
5. **Freeze the record when the arc closes.** The debrief does not get retroactively smoothed. The record is the record.

Point five has its own ancestry. Laozi again, chapter 64, the second half of the verse: *慎終如始* — careful at the end as at the beginning. The balances are set twice: once when the heap is shaped, once when the record is sealed.

A beginning is a delicate time. So, it turns out, is an ending. The middle, where the flywheel is up to speed and the governor is doing its quiet work — that's the part that runs itself.
