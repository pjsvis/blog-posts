# Justfile

The command vocabulary of the silo. A set of named commands, defined locally in the project, documented in plain text.

The justfile answers the question: *what can I do here?*

It is not a network service. It is not an external reference. It is a list of verbs held in the project, available when you enter the context. The agent reads it and knows what the commands are.

## Structure

Each entry is a named command:

```
command-name:
  description of what it does
  how to invoke it
```

The justfile is the interface between the agent and the silo's capabilities. It should be legible to both agents and humans.

## Principles

- **Defined locally** — the commands live in the project, not in some external service
- **Documented in plain text** — no special format, no tooling required to read it
- **Legible to both agents and humans** — if a human cannot understand what a command does, neither can the agent
- **Deliberate** — the presence of a command is a decision, not a default

The justfile encodes the same assumption as the Palm Pilot: the context must work whether or not the network is available. The agent enters the silo, reads the justfile, and knows what it can do.

**See also:** silo, onboarding, conceptual-entropy