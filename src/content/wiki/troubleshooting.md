---
title: Troubleshooting
description: Fixes for boot, installer, disk, and repository errors on Aegis OS.
section: System
order: 12
updated: 2026-09-28
---

Match the message on screen to one of the cases below before you rerun the installer.

## The USB drive does not boot

Confirm the firmware is in UEFI mode and Secure Boot is off. Rewrite the image in DD mode. A tool that converts the ISO into its own layout can drop the systemd-boot files.

## The installer will not open

The installer checks `/etc/aegis-live`. On an installed system that file is absent, so the program exits. Boot the live image to install. `--force` is reserved for a system you are willing to repartition.

## The disk is rejected

The device must be a whole disk of at least 8 GiB: `/dev/sdX`, `/dev/vdX`, `/dev/nvmeXnY`, or `/dev/mmcblkN`. Partition names are rejected. The confirmation box must contain the basename only, such as `nvme0n1`, with the same spelling as the list.

## Firmware is not UEFI

If `/sys/firmware/efi` is missing, the installer stops. Reboot with UEFI enabled. There is no BIOS installation path.

## Installation stops during pacstrap

The target system is downloaded during install. Check the network, the Arch mirror list, and the clock. A wrong clock makes TLS requests fail. `timedatectl` on the live system shows whether NTP has caught up.

## The installed disk boots back to the USB image

Remove the USB drive, or move the internal Linux Boot Manager above the USB device in the firmware boot order.

## Pacman cannot find the aegis database

Open `/etc/pacman.conf` and confirm the server line from [Repository and keys](/wiki/repository-and-keys). Then run `sudo pacman -Sy`. A missing `aegis.db` on the release means the package repository has not been published yet.

## Signature errors

`Optional TrustAll` ignores a missing signature. After you switch to `Required`, install `aegis-keyring` and run `pacman-key --populate aegis` before you sync again.
