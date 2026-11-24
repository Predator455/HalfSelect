# HalfSelect

A client mod for **Planetary Annihilation: TITANS** that adds one hotkey: keep half of the units you have selected.

Select 10 units, press **Ctrl+H**, and 5 stay selected. Press it again for 2, and so on. Useful for splitting an army without re-dragging boxes.

The unit-type mix is preserved: from 7 tanks and 3 artillery you keep 4 tanks and 1 artillery, not 5 tanks.

## Install

1. Download the zip from the [latest release](https://github.com/Predator455/HalfSelect/releases/latest).
2. Extract it into your `client_mods` folder, so you end up with `client_mods/com.predator455.halfselect/modinfo.json`:
   - Windows: `%LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation\client_mods\`
   - Linux (native): `~/.local/Uber Entertainment/Planetary Annihilation/client_mods/`
   - Linux (Proton): `<steam>/steamapps/compatdata/386070/pfx/drive_c/users/steamuser/AppData/Local/Uber Entertainment/Planetary Annihilation/client_mods/`
   - macOS: `~/Library/Application Support/Uber Entertainment/Planetary Annihilation/client_mods/`
3. Restart the game, open **Community Mods → Installed**, and enable **HalfSelect**.

Create the `client_mods` folder if it does not exist.

## Rebinding

The hotkey appears in **Settings → Keyboard → units → HalfSelect** as "keep half of selection".

## How it picks

It keeps `floor(n / 2)` units (at least 1). Each unit type keeps half of its own count, and any slots left over go to the types with the most units.
