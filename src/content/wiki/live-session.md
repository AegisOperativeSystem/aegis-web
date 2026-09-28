---
title: Live session
description: How the passwordless live user, greetd, and the installer fit together.
section: Install
order: 6
updated: 2026-09-28
---

The live image is a normal Aegis session plus a few units that exist only before installation.

## Boot chain

systemd-boot loads the kernel and the Archiso initramfs. The image finds itself by `archisosearchuuid`, then starts the live system. `aegis-live-setup.service` runs before greetd.

That setup unit:

- creates the user `live` when it is missing
- removes the password on that account
- enables greetd, NetworkManager, and itself

greetd then starts `aegis-session` as `live`.

## Installer privilege

The installer changes disks, so it runs through pkexec. A polkit rule grants `org.aegis.install` to the user `live` without a password prompt. The installed system does not include that automatic grant for your user. Administrative actions there go through sudo or a normal polkit prompt.

## Marker file

`/etc/aegis-live` marks a live image. The installer exits on a system without that file unless you pass `--force`. This keeps an installed desktop from opening a destructive disk tool by accident.

## What stays behind

The live user, the passwordless polkit rule, and the live marker are part of the image profile. They are not the account created on the target disk. Your installed user is the one you typed into the installer.
