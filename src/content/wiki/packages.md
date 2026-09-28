---
title: Packages
description: First-party Aegis packages and what the GTK package client is allowed to install.
section: System
order: 10
updated: 2026-09-28
---

Aegis packages are normal Arch packages. `aegis-pkg` is a GTK4 front end for the `aegis` repository. It is not a second package manager.

## Packages

| Package | What it installs |
| --- | --- |
| `aegis-shell` | GTK4 panel and stylesheet |
| `aegis-dock` | Bottom dock and application grid |
| `aegis-tour` | First-run tour |
| `aegis-installer` | Live installer and polkit policy |
| `aegis-pkg` | Repository client |
| `aegis-session` | labwc session, theme, foot config, os-release hook |
| `aegis-mirrorlist` | Repository server line and pacman hook |
| `aegis-keyring` | Public signing key, once the key is published |
| `linux-aegis` | Kernel image and modules |
| `linux-aegis-headers` | Headers for out-of-tree modules |

## The client

`aegis-pkg` refreshes the repository list with `pacman -Sl aegis`. Install runs `pkexec pacman -S --needed --noconfirm`. Remove runs `pkexec pacman -Rns --noconfirm`.

A package name is accepted only when it uses the pacman name character set: lowercase letters, digits, and `@ . _ + -`. The client will not pass shell fragments or repository options through that field.

## Updating

```bash
sudo pacman -Syu
```

That command updates Arch and Aegis packages together once the repository is configured. See [Repository and keys](/wiki/repository-and-keys).
