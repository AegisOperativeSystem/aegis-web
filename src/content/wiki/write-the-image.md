---
title: Write the ISO to a USB drive
description: Verify the SHA-256 digest and write the Aegis OS hybrid image to a USB disk.
section: Start
order: 3
updated: 2026-09-28
---

Aegis images are hybrid ISOs produced by `mkarchiso`. You can write one straight to a USB disk.

## Check the file

On the [download page](/download), copy the SHA-256 digest published for that asset.

```bash
sha256sum aegis-*.iso
```

On macOS:

```bash
shasum -a 256 aegis-*.iso
```

The printed digest must match the release card character for character. A mismatch means the file is incomplete or was altered. Download it again.

## Choose the USB disk

```bash
lsblk -d -o NAME,SIZE,MODEL,TRAN
```

Use the whole disk, for example `/dev/sdb`. A partition such as `/dev/sdb1` is the wrong target. Writing the image replaces the partition table on that disk.

## Write with dd

```bash
sudo dd if=aegis-YYYY.MM.DD-x86_64.iso of=/dev/sdX bs=4M conv=fsync status=progress
```

Replace `sdX` with the device you confirmed. Unmount every partition on that disk before you start. `conv=fsync` returns only after the data has reached the device.

## Other writers

Fedora Media Writer and Ventoy can start the image. In Rufus, use DD mode so the hybrid layout stays intact. ISO mode rewrites the image and can break the UEFI boot path.

## Eject

```bash
sudo eject /dev/sdX
```

Boot the target computer from that USB device in UEFI mode. The next page is [Getting started](/wiki/getting-started).
