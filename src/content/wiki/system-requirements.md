---
title: System requirements
description: Hardware and firmware requirements for the Aegis OS live image and installer.
section: Start
order: 1
updated: 2026-09-28
---

Aegis OS targets a narrow machine profile so the image, the installer, and the bootloader stay on one path.

## Firmware

The live image and the installed system boot with UEFI and systemd-boot. Legacy BIOS is outside the current build. Secure Boot is not set up: disable it in firmware setup before you boot the USB drive.

## Processor and disk

| Requirement | Value |
| --- | --- |
| Architecture | x86_64 |
| Firmware | UEFI |
| Disk | Whole disk, at least 8 GiB |
| Partition table | GPT, written by the installer |
| EFI system partition | 1 GiB, FAT32, label `AEGIS_ESP`, mounted at `/boot` |
| Root | ext4 or btrfs, label `aegis` |

The installer accepts a whole `/dev/sdX`, `/dev/vdX`, `/dev/nvmeXnY`, or `/dev/mmcblkN` device. It refuses partition nodes such as `/dev/sda1` or `/dev/nvme0n1p1`.

## Network

Installation downloads the target system with `pacstrap`, so the live session needs a working network connection and access to the Arch mirrors. The desktop itself starts without a network.

## Memory

The live session runs labwc, a GTK4 panel, and the installer. A machine with 2 GiB of RAM can boot the session. More memory makes package installation more comfortable.
