---
title: Getting started
description: Boot the live image, reach the desktop, and open the installer.
section: Start
order: 2
updated: 2026-09-28
---

This is the short path from a published ISO to the Aegis desktop.

## 1. Get an image

Open the [download page](/download). Save the `.iso` file and compare its SHA-256 digest with the value shown next to that release. The [write guide](/wiki/write-the-image) covers USB creation.

## 2. Boot in UEFI mode

Select the USB device from the firmware boot menu. The loader waits five seconds, then starts Aegis. If the machine drops into a legacy BIOS menu, switch the firmware to UEFI and disable Secure Boot.

## 3. Use the live session

The live image creates a passwordless user named `live` and signs that user in through greetd. The session starts labwc, paints the background, starts the panel, and opens the installer.

The live account exists only on the image. The installed system does not keep it.

## 4. Install, or look around

You can close the installer and use the live desktop. The panel launches applications from `/usr/share/applications`. Super+Enter opens the foot terminal. When you are ready, launch **Install Aegis OS** again from the application list.

Continue with [Install Aegis OS](/wiki/install) for the questions the installer asks.
