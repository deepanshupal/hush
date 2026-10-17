# Troubleshooting

## Shortcuts stopped working (Secure Input)

When a password field is focused, or an app such as Terminal enables "Secure
Keyboard Entry", macOS blocks other apps from seeing key presses, so Hush's
shortcut can't fire. Hush shows a warning in its window and menu bar icon while
this is happening. Close the password prompt or turn off Secure Keyboard Entry
(Terminal → Secure Keyboard Entry) and the shortcut works again.

## Hush keeps asking for Accessibility after an update

Each Hush build has a new code identity until releases are Developer ID signed,
so macOS may keep the old Accessibility switch visibly on while no longer
honoring it. Remove Hush from **System Settings → Privacy & Security →
Accessibility** (select it and click **−**), then reopen Hush and grant access
again. See [BUILD.md](BUILD.md#troubleshooting) for a one-line Terminal fix.

## Text is pasted in the wrong place, or your old clipboard appears

Hush pastes through the clipboard and restores your previous clipboard
afterward. If an app reads the clipboard late, open the debug settings with
<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> and increase the paste delay.

Something else? [Open an issue](https://github.com/DeepanshuPal/hush/issues).
