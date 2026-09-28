---
title: Repository and keys
description: Add the Aegis pacman repository and understand the signature policy.
section: System
order: 11
updated: 2026-09-28
---

The Aegis package database is a rolling GitHub release. Pacman reads it like any other repository.

## Server

```ini
[aegis]
SigLevel = Optional TrustAll
Server = https://github.com/AegisOperativeSystem/aegis-pkgs/releases/download/x86_64
```

`aegis-mirrorlist` ships the server line in `/etc/pacman.d/aegis-mirrorlist` and appends the block above when `/etc/pacman.conf` has no `[aegis]` section. The database file is published as `aegis.db`.

Refresh the databases:

```bash
sudo pacman -Sy
pacman -Sl aegis
```

## Signatures

New repositories start at `Optional TrustAll` so images can install packages before a keyring exists. The signed policy ships at `/usr/share/aegis/pacman/aegis-signed.conf` and sets `SigLevel = Required`.

After `aegis-keyring` contains the published public key:

```bash
sudo pacman-key --populate aegis
```

Replace the trust-all block with the signed snippet, then refresh pacman. Keep the private key off the image and out of git.

## What gets published

Pushes that change package recipes rebuild the repository and upload it to the `x86_64` release. A kernel release can ask the same pipeline to index `linux-aegis` into that database.

The ISO build creates a temporary local repository so the image can include these packages while it is being assembled. That local server is a build detail. Installed systems use the GitHub URL above.
