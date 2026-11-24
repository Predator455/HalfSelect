// Registers the mod's keybinds so they show up (and can be rebound) in Settings > Keyboard.
(function () {
    var settings = api.settings.definitions.keyboard.settings;
    var common = {
        type: 'keybind',
        set: 'units',
        display_group: '!LOC:units',
        display_sub_group: 'HalfSelect'
    };
    settings.halfselect_select_half = _.assign({ title: 'keep half of selection', default: 'ctrl+h' }, common);
    settings.halfselect_select_idle = _.assign({ title: 'keep only idle units of selection', default: 'ctrl+alt+h' }, common);
})();
