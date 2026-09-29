---
title: Install Aegis OS
description: Partition a disk, create an account, and boot the installed system with systemd-boot.
section: Install
order: 4
updated: 2026-09-28
---

The installer is a GTK4 application over a fixed installation plan. It runs on the live image. It refuses to start on an installed system unless you pass `--force`.

## Before you start

- Boot the [live image](/wiki/getting-started). UEFI and legacy BIOS both start the live system. In VirtualBox, attach the ISO to the optical drive. EFI can stay off.
- Connect to a network. `pacstrap` downloads the target system from the Arch mirrors.
- Back up the target disk. The installer replaces its partition table.
- Read the [system requirements](/wiki/system-requirements).

## Disk

The disk page lists whole disks from `lsblk`. Pick one of at least 8 GiB. Type its basename, such as `sda`, `vda`, `nvme0n1`, or `mmcblk0`, into the confirmation field. The name must match the selected device exactly.

The plan then writes:

1. A GPT label.
2. A 1 GiB EFI system partition, type `C12A7328-F81F-11D2-BA4B-00A0C93EC93B`, formatted FAT32, label `AEGIS_ESP`, mounted at `/boot`.
3. A root partition, type `0FC63DAF-8483-4772-8E79-3D69D8477DE4`, formatted ext4 or btrfs, label `aegis`, mounted at `/`.

## Account

Choose a hostname, a username, and a password of at least 8 characters. Type the password twice. The next page sets the timezone, language, and keyboard.

- The hostname is a lowercase DNS label.
- The username cannot be `root`, `live`, or `greeter`.
- The timezone is one of the listed `Region/City` names, or UTC.
- The language is a listed UTF-8 locale, written to `/etc/locale.gen`.
- The keyboard is written to `/etc/vconsole.conf` and to the user labwc environment.
- Swap is off, or a 2 GiB or 4 GiB swapfile on the root filesystem.
- The password is sent to `chpasswd` on standard input and is redacted in the installer log.

The new user is added to `wheel`. `sudo` is allowed for that group. The root password is locked.

## What the installer runs

After you confirm, the backend runs the plan in order: partition, format, mount, `pacstrap`, `fstab`, hostname, locale, user, `bootctl`, initramfs, and service enablement. NetworkManager and greetd are enabled. The boot entry uses the kernel package configured for that image.

The progress page prints each command. When it finishes, it unmounts `/mnt`.

## Reboot

Remove the USB drive and boot the internal disk. The next boot stops at tuigreet. Sign in as the user you created. There is no automatic login on the installed system.

See [First boot](/wiki/first-boot) for the session you land in.
