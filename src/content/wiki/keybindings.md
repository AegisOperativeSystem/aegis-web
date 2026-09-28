---
title: Keybindings
description: Keyboard shortcuts for the labwc session shipped with Aegis OS.
section: Desktop
order: 8
updated: 2026-09-28
---

labwc reads the Aegis bindings from the session package. Super is the Windows or Command key on most keyboards.

| Action | Binding |
| --- | --- |
| Open foot | Super+Enter |
| Close the focused window | Super+Q |
| Close the focused window | Alt+F4 |

Window movement and resizing use labwc's pointer behavior: drag the title bar to move a window, and drag its edges to resize it. Gaps are zero, so windows tile against each other and the panel.

## Panel actions

The panel buttons are mouse and keyboard controls. Tab moves between them. Enter activates the focused button.

| Button | Result |
| --- | --- |
| Apps | Opens the desktop-file launcher |
| Terminal | Runs `foot` |
| Exit | Runs `labwc --exit` and returns to the greeter |
| Reboot | `systemctl reboot` |
| Power | `systemctl poweroff` |

## Changing bindings

User configuration belongs in the labwc config directory under your home, which overrides the packaged file. The packaged defaults live with the `aegis-session` package and return on reinstall if you edit those files in place.
