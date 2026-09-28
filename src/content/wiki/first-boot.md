---
title: First boot
description: Sign in with tuigreet and confirm the installed Aegis session.
section: Install
order: 5
updated: 2026-09-28
---

The installed system uses the same desktop session as the live image, with a different login path.

## Sign in

greetd starts tuigreet. Type the username and password from the installer. The greeter does not log in automatically, and the root account has a locked password.

If the greeter does not appear, boot the firmware menu and select the Linux Boot Manager entry created by `bootctl`.

## Session

After login, `aegis-session` sets the Wayland environment, starts the polkit authentication agent when it is installed, starts PipeWire, and runs labwc. Labwc paints a solid background and starts the panel and the dock. The first login also opens the tour.

The installer does not open on its own after installation. Launch it from the application menu only if you intend to partition another disk. That requires the live image marker, or an explicit `--force`.

## Network and updates

NetworkManager is enabled. Once you are online:

```bash
sudo pacman -Syu
```

The Aegis repository is added when `aegis-mirrorlist` is installed and `/etc/pacman.conf` does not already contain an `[aegis]` section. See [Repository and keys](/wiki/repository-and-keys).

## Daily use

Super+Enter opens foot. The panel clock uses local time. Power and reboot actions call `systemctl`. Application launchers come from desktop files in `/usr/share/applications`.
