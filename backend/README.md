# Backend

Agno AgentOS backend service.

## Setup & Running

```bash
# Install dependencies
uv sync

# Run backend agent service
uv run main.py
```

## Updating dependencies

To upgrade all packages in the backend to their latest versions:

```bash
uv lock --upgrade
uv sync
```
