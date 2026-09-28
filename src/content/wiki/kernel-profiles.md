---
title: Kernel profiles
description: balanced, performance, and powersave configs for the linux-aegis 6.18 package.
section: System
order: 9
updated: 2026-09-28
---

`linux-aegis` tracks Linux 6.18 longterm, starting at 6.18.54. The package starts from the Arch `linux` configuration and applies small fragments. It does not carry an out-of-tree scheduler.

## Profiles

| Profile | Default governor | Boot parameter | Timer frequency |
| --- | --- | --- | --- |
| balanced | schedutil | `preempt=voluntary` | 1000 Hz |
| performance | performance | `preempt=full` | 1000 Hz |
| powersave | powersave | `preempt=none` | 250 Hz |

`balanced` is the package default. All three cpufreq governors are built in, and `CONFIG_PREEMPT_DYNAMIC` lets the boot parameter select the preemption model. Put the parameter you want in the systemd-boot entry.

## Shared options

Every profile keeps:

- tickless idle (`CONFIG_NO_HZ_IDLE`) and high-resolution timers
- the energy model
- zstd compression for the kernel image and modules
- zswap with zstd
- debug info disabled, so the package stays smaller

CPU vulnerability mitigations stay at the upstream default. `mitigations=off` is an unsupported local change.

## Source check

The kernel build verifies the kernel.org tarball with the detached signature for Linus Torvalds or Greg Kroah-Hartman before it compiles. Release tags upload `linux-aegis` and `linux-aegis-headers`.

The first operating-system images can still install Arch `linux`. Switch the image to `linux-aegis` after that package is in the [pacman repository](/wiki/repository-and-keys).
