# HalfSelect

A client mod for **Planetary Annihilation: TITANS** that adds two selection hotkeys: keep half of the units you have selected, or keep only the idle ones.

Select 10 units, press **Ctrl+H**, and 5 stay selected. Press it again for 2, and so on. Useful for splitting an army without re-dragging boxes.

The unit-type mix is preserved: from 7 tanks and 3 artillery you keep 4 tanks and 1 artillery, not 5 tanks.

**Ctrl+Alt+H** keeps only the idle units of your selection: those with no orders queued. Handy for grabbing the fabbers that finished their jobs out of a big group, or the units that stopped after a move. If none of them is idle, the selection stays as it was.

## Install

1. Download `HalfSelect-x.y.z.zip` from the [latest release](https://github.com/Predator455/HalfSelect/releases/latest).
2. Extract it into the `client_mods` folder for your system (paths below). Create `client_mods` if it does not exist.
3. Restart the game, open **Community Mods → Installed**, and enable **HalfSelect**.

## Install path

### Windows

```
C:\Users\<your user>\AppData\Local\Uber Entertainment\Planetary Annihilation\client_mods\
```

Shortcut: press **Win+R**, paste the line below and press Enter. It opens the folder that contains `client_mods`.

```
%LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation
```

### Linux

Which path applies depends on how Steam runs the game. If unsure, check both: the right one is the `Planetary Annihilation` folder whose `log` subfolder has files from your last game.

**Steam with Proton** (Properties → Compatibility → "Force the use of a specific Steam Play compatibility tool" is ticked):

```
~/.local/share/Steam/steamapps/compatdata/386070/pfx/drive_c/users/steamuser/AppData/Local/Uber Entertainment/Planetary Annihilation/client_mods/
```

If your Steam library is on another drive, replace `~/.local/share/Steam` with that library's folder.

**Native Linux build** (no Proton):

```
~/.local/Uber Entertainment/Planetary Annihilation/client_mods/
```

### Result

After extracting, the folder should look like this:

```
client_mods/
└── com.predator455.halfselect/
    ├── modinfo.json
    └── ui/mods/com.predator455.halfselect/
        ├── keybinds.js
        └── live_game.js
```

If `modinfo.json` ends up one level deeper (for example `client_mods/HalfSelect-1.0.0/com.predator455.halfselect/`), move the `com.predator455.halfselect` folder up so it sits directly in `client_mods`. Otherwise the game will not find it.

## Rebinding

Both hotkeys appear in **Settings → Keyboard → units → HalfSelect**, as "keep half of selection" and "keep only idle units of selection".

## How it picks

It keeps `floor(n / 2)` units (at least 1). Each unit type keeps half of its own count, and any slots left over go to the types with the most units.
