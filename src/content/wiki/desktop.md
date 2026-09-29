---
title: Desktop
description: The GTK4 panel, labwc session, theme, and applications in Aegis OS.
section: Desktop
order: 7
updated: 2026-09-28
---

The Aegis desktop is a GTK4 shell on labwc. labwc is the wlroots compositor. Aegis owns the panel, the theme, the session script, and the key bindings.

## Panel

`aegis-shell` anchors a 32 px bar to the top edge and reserves that strip as an exclusive zone. When layer-shell is available it is a proper panel. Otherwise it opens as a 1280×32 window so the same interface can still be inspected.

The bar shows the clock and buttons for applications, the terminal, ending the session, reboot, and power off. The application list reads `/usr/share/applications` and skips entries marked hidden or no-display. Terminal entries run inside foot.

## Session stack

`aegis-session` is the command greetd runs. It exports the Wayland variables, starts the polkit GNOME agent when that binary exists, starts PipeWire, WirePlumber, and the PulseAudio compatibility daemon, then replaces itself with labwc.

labwc autostart paints `#101216` with swaybg and starts the shell and the dock. The dock is a centered pill on the bottom edge. Pinned icons open Files, the text editor, the terminal, and the package client. The grid lists every application. On a first login, `aegis-tour` walks through the desktop and writes `~/.config/aegis/tour-done`. On the live image the installer starts after that tour.

## Applications

The image includes PCManFM, Mousepad, pavucontrol, and foot. The live image boots on UEFI and on legacy BIOS, so a default VirtualBox machine can start it.

## Theme

The labwc theme is an Openbox-format theme named `aegis`. Corners are square and window gaps are zero. The title bar shows the icon, iconify, maximize, and close. The interface font is Noto Sans.

| Token | Hex |
| --- | --- |
| Background | `#101216` |
| Foreground | `#e7ecf3` |
| Muted text | `#8b95a7` |
| Accent | `#7dd3c0` |
| Danger | `#f07178` |

## Sound and portals

PipeWire provides playback and the PulseAudio socket that existing applications expect. `xdg-desktop-portal` and `xdg-desktop-portal-wlr` serve screen and file portals for GTK applications.

## Terminal

The terminal is foot. Its configuration ships in the session package. Super+Enter launches it from labwc, and the panel Terminal button launches the same program.
