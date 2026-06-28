# 0.4.0 - I always have a choice

## New Features

- Completed the move from a low-code frontend to a fully self-built frontend and backend, covering the core workspace capabilities from previous versions.
- Added an improved Dashboard big-screen experience for key metrics, trends, and runtime status.
- Added Custom Console for managing custom Modules, Playbooks, SIEM YAML files, and related custom definitions from the UI.
- Added Runtime settings with refresh and validation support for custom definitions, making customization easier to iterate.
- Added a Tags settings page to preview all frontend Tag fields, enum values, and colors directly.
- Added authenticated record share links for Case, Alert, Artifact, Enrichment, Playbook, and Knowledge detail views. Unauthenticated users return to the target record after login.
- Added personal notification preferences and improved Inbox behavior for clearer resource labels, Case assignment notifications, and Playbook completion notifications.

## Improvements

- Improved detail layouts and activity-feed loading for Cases, Alerts, Artifacts, Enrichments, Knowledge, and Playbooks.
- Added cursor pagination for comments, audit logs, and other activity feeds to reduce pressure in long-list scenarios.
- Unified Runtime naming and removed hidden environment override settings so runtime configuration is easier to understand.
- Improved user-management safety by preventing administrators from deleting themselves.
- Improved consistency for field display, Tag colors, status values, and risk-level presentation.
- Improved SIEM and MCP capabilities with raw SPL and ES|QL queries, plus more controllable time ranges and result limits for field discovery.
- Added API Key support for ELK integration to reduce authentication setup cost in some deployment environments.

## Deployment and Release Engineering

- Added and improved the Docker Compose release package for single-host deployments with frontend, backend, PostgreSQL, Redis Stack, RustFS, and Worker components.
- The Compose release package now writes the release-specific GHCR backend and frontend image addresses.
- The frontend container includes an HTTPS entrypoint and self-signed certificate generation for easier first deployment.
- Added GitHub Actions CI, Docker image build, and Release workflows as the automation foundation for future releases.
- The release flow now creates `asp-compose-<version>.tar.gz` and attaches it to the GitHub Release.

## Developer Notes

The title of this release comes from a line I like in *Game of Thrones*: **I always have a choice**.

In earlier versions, to move quickly, the frontend and part of the data storage were built on the low-code platform Nocoly, while most of the code I wrote myself was on the backend. That choice did save time in the beginning. But the more the project grew, the clearer it became that the low-code platform was no longer improving efficiency. It was limiting development. Many features could not be implemented, or before designing a feature I first had to ask: what can the low-code platform provide, and what can I build within its boundaries? That means both product design and engineering are pulled by the platform's limits.

There was also a very practical problem: Nocoly consumes a lot of resources and is not especially simple to deploy. For a security operations platform that should support private deployment, low-cost operation, and easy customization, that was not a comfortable foundation.

So 0.4.0 does one very important thing: it brings both frontend and backend back under code that the project controls directly. All core capabilities are implemented in ASP's own code, and the platform no longer depends on a low-code system to define its boundaries. This release reimplements the capabilities from the previous "low-code platform + backend" combination and adds many new ones. More importantly, from this version onward, customization, release, deployment, and future feature work are more direct, clearer, and easier to control.

That is what the title means: when all critical code is in my own hands, I no longer have to accept only the options given by another platform. I always have a choice.

One small complaint though: now that LLMs can help write code, why does it feel even more exhausting?
