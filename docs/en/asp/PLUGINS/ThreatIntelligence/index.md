# Threat Intelligence Plugin

## Features

- Multi-provider threat intelligence query tool plugin with a unified query interface.
- Supports registering multiple intelligence sources, returning aggregated results in a single query.
- Automatically calculates aggregated risk levels (high/medium/low) based on each Provider's results.

## Architecture

The TI plugin uses a Provider registration pattern:

```
TIToolKit.query(indicator, provider=None)
  └── PROVIDERS["AlienVaultOTX"]  →  AlienVaultOTX.query()
  └── PROVIDERS["NewProvider"]    →  NewProvider.query()    # Extensible
```

- The `PROVIDERS` dictionary registers all available intelligence sources
- **AlienVaultOTX** is registered as the default Provider
- Can be extended by adding new Provider functions

## Adding a New Provider

1. Create a `PLUGINS/NewProvider/` directory, implement client code and `CONFIG.example.py`
2. Implement the `query(indicator: str) -> dict` function
3. Register in the `PROVIDERS` dictionary in `PLUGINS/TI/tools.py`:

```python
from PLUGINS.NewProvider.client import NewProvider

PROVIDERS: Dict[str, Callable[[str], dict]] = {
    "AlienVaultOTX": AlienVaultOTX.query,
    "NewProvider": NewProvider.query,
}
```

## Usage

```python
from PLUGINS.TI.tools import TIToolKit

# Query all Providers
result = TIToolKit.query("8.8.8.8")

# Query a specific Provider
result = TIToolKit.query("8.8.8.8", provider="AlienVaultOTX")
```

## Related

- [AlienVaultOTX Plugin](../AlienVaultOTX/) — Default registered threat intelligence source
- [Threat Intelligence Enrichment Playbook](../../PLAYBOOKS/Threat_Intelligence_Enrichment/) — Uses the TI plugin for intelligence enrichment
