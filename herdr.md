herdr — terminal workspace manager for AI coding agents

Usage: herdr [options]
       herdr --session <name> [options]
       herdr --remote <ssh-target> [--session <name>]
       herdr session attach <name>
       herdr update
       herdr server stop
       herdr server reload-config
       herdr workspace <subcommand> ...
       herdr tab <subcommand> ...
       herdr agent <subcommand> ...
       herdr pane <subcommand> ...
       herdr wait <subcommand> ...
       herdr session <subcommand> ...
       herdr integration <subcommand> ...

Common commands:
  herdr                            Launch or attach to the persistent session
  herdr status [server|client]     Show local client and running server status
  herdr update                     Download and install the latest version
  herdr server stop                Stop the running server via the API socket
  herdr server reload-config       Reload config.toml in the running server
  herdr workspace <subcommand>     Workspace helpers over the socket API
  herdr tab <subcommand>           Tab helpers over the socket API
  herdr agent <subcommand>         Agent/terminal helpers over the socket API
  herdr pane <subcommand>          Pane control helpers over the socket API
  herdr wait <subcommand>          Blocking wait helpers over the socket API
  herdr session <subcommand>       Manage named persistent sessions
  herdr integration <subcommand>   Manage built-in agent integrations

Advanced commands:
  herdr server                     Run as headless server
  herdr client                     Connect to a running server as a thin client

Options:
  --no-session        Run monolithically (no server/client, escape hatch)
  --session <name>    Use or create a named persistent session
  --remote <target>   Attach through SSH to a remote Herdr server
  --default-config    Print default configuration and exit
  --version, -V       Print version and exit
  --help, -h          Show this help

Config: /Users/petersmith/.config/herdr/config.toml
Logs:   /Users/petersmith/.config/herdr/herdr.log (plus herdr-client.log, herdr-server.log)
Env:    HERDR_CONFIG_PATH overrides config file path
Home:   https://herdr.dev
