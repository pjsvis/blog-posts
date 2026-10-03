You hit on the central architectural trade-off: **State Consolidation vs. Local Utility.**

Farming everything out to Omarchy as a single, 24/7 background control plane is technically cleaner, but using your Mac as the primary platform and offloading only during travel is an entirely valid model.

---

## 1. Why Keeping the Mac as Primary Makes Sense

1. **Local Developer Ergonomics:**
When sitting at your desk, local execution on macOS bypasses network hops. Low-latency file system operations, instantaneous git operations, and direct display integration mean your primary dev environment feels as fast as possible.
2. **Resource Allocation:**
Your Mac likely boasts higher single-thread IPC and unified memory bandwidth than a dedicated server or headless box. Reserve the heavier, multi-agent Pi parallel execution runs for the Mac while you're actively working on it.
3. **Intentionality of "Offloading":**
Doing an explicit handover to Omarchy before packing your bags forces a clean synchronization point: you commit your state, test the remote bridge, and confirm the environment is green before closing the lid.

---

## 2. Why the "Omarchy-Only" Model Beckons (The Counter-Argument)

If you keep Herdr running *persistently* on Omarchy as the single source of truth, you eliminate:

* **Context Drift:** No ambiguity about which machine holds the latest local untracked files, branch states, or agent memory caches.
* **Handover Friction:** You never face the "forgot to push before shutting the laptop" scenario.
* **Client Agnosticism:** Your Mac, iPad, iPhone, or any future device are all reduced to pure thin clients. Switching devices requires zero migration steps—you just open the web interface and pick up mid-sentence.

---

## 3. Operational Mechanics: The Active Instance Handover

To make your preferred hybrid model friction-free, manage active state with a simple **Lease/Handover Script**.

```
┌─────────────────────────────────────────────────────────┐
│                    Git / State Repo                     │
│               `active_node.json` (Lock)                │
└───────────────┬─────────────────────────┬───────────────┘
                │                         │
      ┌─────────┴────────┐       ┌────────┴────────┐
      │   Mac Platform   │       │  Omarchy Box    │
      │  (Primary Node)  │       │ (Offload Node)  │
      └──────────────────┘       └─────────────────┘

```

Instead of manually orchestrating multi-step migrations:

1. **The `herdr-offload` Command (Run on Mac before travel):**
* Pushes all local uncommitted changes/branches to a temporary `sync/handover` git ref.
* Exports Herdr workspace topologies (`herdr workspace export`).
* SSHs via Tailscale into Omarchy to execute:
```bash
systemctl --user start herdr.service
herdr-hydrate --from-mac

```


* Updates an environment flag/file: `ACTIVE_HERDR_NODE=omarchy`.


2. **The `herdr-reclaim` Command (Run on Mac upon return):**
* Pulls active workspace states from Omarchy back to the Mac.
* Hydrates local Herdr instances.
* Stops or idles the background Herdr services on Omarchy.
* Updates flag: `ACTIVE_HERDR_NODE=mac`.



---

## Summary

If your mental model favors the Mac as your primary engine, **keep it that way.** Don't re-architect your workflow around an edge case (travel) if it compromises your daily desk experience.

By treating Omarchy as a high-availability "hot standby" that you lease via a single handover command, you maintain your ideal local workspace while ensuring your mobile devices (iPad, iPhone, and Mac) stay wired into your agent engine anywhere on your Tailscale mesh.