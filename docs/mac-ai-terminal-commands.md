**Title:** The Mac Terminal Commands That Unlock Hidden AI Power

**Author:** Jakub Jirak

**Date:** 02/07/2026

**Source:** [https://jakubjirak.medium.com/the-mac-terminal-commands-that-unlock-hidden-ai-power-5903ef946ef4](https://jakubjirak.medium.com/the-mac-terminal-commands-that-unlock-hidden-ai-power-5903ef946ef4)

---

# Page Structure Map
```text
The Mac Terminal Commands That Unlock Hidden AI Power
├── AI Power User
└── The CLI tricks that turn Ollama and friends from a chat toy into a Unix-grade workhorse
    ├── Ollama beyond `run`
    ├── Pipe anything into a model
    ├── The llm CLI — templates, logs, and plugins
    ├── jq — making API output usable
    └── Aliases — make the good path the lazy path
```

---

## AI Power User

## The CLI tricks that turn Ollama and friends from a chat toy into a Unix-grade workhorse

5 min read

Jul 2, 2026

Most people who install Ollama on a Mac learn exactly one command — `ollama run llama3.1` — and stop there. That's like buying a Mac Studio and only ever using Safari. The real leverage of local AI on macOS lives in the terminal, where models become composable Unix citizens: things you pipe into, alias, schedule, and chain. After eighteen months of running local models daily on an M2 Max, these are the commands that actually changed how I work.

### Ollama beyond `run`

Start with the commands nobody reads the docs for. `ollama ps` shows what's currently loaded into memory and — crucially — how long until it unloads:

$ ollama ps  
NAME            ID            SIZE     PROCESSOR    UNTIL  
qwen2.5:14b     7cdf5a0187d5  9.6 GB   100% GPU     4 minutes from now

That `UNTIL` column matters because model loading is the slowest part of local AI. A 14B model takes 6–8 seconds to load from SSD on my machine; once resident, first token arrives in under half a second. The default keep-alive is five minutes, which is wrong for almost everyone. Fix it with an environment variable:

\# Keep models in memory for 2 hours  
launchctl setenv OLLAMA\_KEEP\_ALIVE 2h  
\# Or forever, if you have RAM to spare  
launchctl setenv OLLAMA\_KEEP\_ALIVE -1

While you’re there, `OLLAMA_NUM_PARALLEL=4` lets the server handle four simultaneous requests — essential if you have scripts and an editor plugin hitting the same model. Restart the Ollama app after setting these.

`ollama show qwen2.5:14b --modelfile` prints the full recipe of any model: its template, parameters, system prompt. And `ollama create` lets you build your own variants. I keep a Modelfile for a Czech↔English translator that I use a dozen times a day:

FROM qwen2.5:14b  
PARAMETER temperature 0.3  
SYSTEM You are a precise Czech-English translator. Output only the translation, no commentary. Preserve tone and register.ollama create translator -f ./Modelfile

Now `ollama run translator "Dej mi vědět, až to bude hotové"` returns a clean translation with no chatty preamble. Custom models cost nothing — they're just metadata over the same weights.

> **Further reading:** How macOS Turns Everyday Tasks Into Invisible Productivity

### Pipe anything into a model

The single most underrated fact about `ollama run` is that it reads stdin. That makes every file, command output, and clipboard on your Mac a valid prompt:

\# Summarize a long README  
cat README.md | ollama run llama3.1 "Summarize in 5 bullet points"

\# Explain a failing build  
swift build 2>&1 | ollama run qwen2.5:14b "Explain this error and suggest a fix"

\# What changed in this branch, in English  
git diff main | ollama run llama3.1 "Write a one-paragraph PR description"

On macOS this gets a superpower other platforms don’t have: `pbpaste` and `pbcopy`. The clipboard becomes an AI pipeline. My most-used one-liner of 2026, no contest:

pbpaste | ollama run translator | pbcopy

Copy Czech text anywhere, run the command, paste English. Round trip on a 14B model: about three seconds. Other variants I run weekly:

\# Fix grammar in whatever I just copied  
pbpaste | ollama run llama3.1 "Fix grammar and spelling only. Output the corrected text." | pbcopy

\# Turn a rambling Slack message into something professional  
pbpaste | ollama run llama3.1 "Rewrite this concisely and professionally" | pbcopy

No app, no subscription, no text leaving the machine.

### The llm CLI — templates, logs, and plugins

Simon Willison’s `llm` tool is the missing standard library for command-line AI. Install it with `brew install llm`, point it at Ollama with the `llm-ollama` plugin (`llm install llm-ollama`), and you get three things Ollama alone doesn't give you.

First, **templates** — saved prompts with parameters:

llm --model qwen2.5:14b --system "Write a conventional commit message for this diff. One line, max 72 chars." --save commitmsg  
git diff --staged | llm -t commitmsg

Second, **logging**. Every prompt and response is stored in a local SQLite database. `llm logs -n 3` shows your last three interactions; `llm logs --search "kubernetes"` finds that explanation from two weeks ago you forgot to save. This alone justifies the install — your AI history becomes greppable.

Third, **model agility**. The same command works against Ollama, OpenAI, Anthropic, or Gemini by swapping `-m`. I run drafts locally and only escalate to a cloud model when the local answer disappoints:

cat spec.md | llm -m qwen2.5:14b "Find logical inconsistencies"  
cat spec.md | llm -m claude-4.5-sonnet "Find logical inconsistencies"  # second opinion

### jq — making API output usable

If you script against Ollama’s HTTP API directly (`localhost:11434`), responses come as JSON, and `jq` is how you stay sane. Get just the text out of a generate call:

curl -s http://localhost:11434/api/generate \\  
  -d '{"model":"llama3.1","prompt":"Name three macOS automation tools","stream":false}' \\  
  | jq -r '.response'

More usefully, `jq` lets you audit your local model collection. Which models are eating your SSD?

curl -s http://localhost:11434/api/tags | jq -r '.models\[\] | "\\(.size/1e9 | floor)GB\\t\\(.name)"' | sort -rn

And when a model emits structured output (ask for JSON in the prompt, or use Ollama’s `format: json` parameter), `jq` turns it into something a script can act on — extracting `.severity` from a code-review response, or `.tags[]` from an auto-tagging prompt. That's the difference between AI as a chat partner and AI as a build step.

> **Further reading:** LM Studio vs. Ollama — The Local AI Showdown Nobody Wrote Honestly

### Aliases — make the good path the lazy path

The commands above only change your life if they cost zero keystrokes of thinking. That’s what shell functions are for. The pattern: every AI task you do more than twice a week becomes a verb.

Here’s my snippet collection — paste into `~/.zshrc`, adjust models to your RAM tier, and reload with `source ~/.zshrc`:

\# --- AI toolkit ---------------------------------------------  
\# Translate clipboard (Czech <-> English), result back to clipboard  
alias tr-clip='pbpaste | ollama run translator | pbcopy && echo "translated ✓"'

\# Fix grammar in clipboard  
alias fix-clip='pbpaste | ollama run llama3.1 "Fix grammar and spelling only. Output corrected text, nothing else." | pbcopy'

\# Summarize any file: aisum notes.md  
aisum() { cat "$1" | ollama run qwen2.5:14b "Summarize in 5 concise bullet points"; }

\# Explain the last command's failure: rerun with aiwhy <command>  
aiwhy() { "$@" 2>&1 | ollama run qwen2.5:14b "This command failed. Explain why and suggest a fix:"; }

\# Commit message from staged changes  
aicommit() { git diff --staged | llm -t commitmsg; }

\# Ask a quick question without leaving the prompt: ai "how do I..."  
ai() { ollama run llama3.1 "$\*"; }

\# What's loaded right now  
alias aips='ollama ps'  
\# ------------------------------------------------------------

Two honest caveats. Local models in the 8–14B class will occasionally produce a wrong `jq` filter or a confidently broken fix — treat `aiwhy` output as a hypothesis, not a verdict. And keep an eye on RAM: with `OLLAMA_KEEP_ALIVE=-1` and a 14B model resident, you're permanently donating ~10 GB. On a 64 GB Mac Studio that's free; on a 16 GB Air it's a tax.

But the core shift is real. Once models live in your shell — pipeable, aliasable, loggable — you stop “going to the AI” and the AI starts sitting inside the workflows you already have. That’s the hidden power: not a smarter model, just shorter distance between a thought and its execution.

**Seriously. Medium has changed their promotion and payout algorithms, so pressing like and leaving a comment makes a HUGE difference.**
