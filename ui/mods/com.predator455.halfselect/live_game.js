// HalfSelect — live_game scene.
// halfselect_select_half: keep half of the current selection, preserving the unit-type mix.
// halfselect_select_idle: keep only the selected units that have no orders queued.
(function () {
    var TAG = '[HALFSELECT] ';

    /**
     * Picks ids to keep: floor(n/2) overall (at least 1), taken per unit type so the
     * composition survives; leftover slots go to the types with the most units.
     * @param {Object<string, number[]>} specIds spec -> unit ids, as in the selection payload
     * @returns {number[]}
     */
    function pickHalf(specIds) {
        var groups = _.map(specIds, function (ids, spec) { return { spec: spec, ids: ids, take: Math.floor(ids.length / 2) }; });
        var total = _.reduce(groups, function (sum, g) { return sum + g.ids.length; }, 0);
        var target = Math.max(1, Math.floor(total / 2));
        var taken = _.reduce(groups, function (sum, g) { return sum + g.take; }, 0);
        var byRemainder = _.sortBy(_.filter(groups, function (g) { return g.ids.length > g.take; }),
            function (g) { return -g.ids.length; });
        for (var i = 0; taken < target && i < byRemainder.length; i++, taken++)
            byRemainder[i].take++;
        return _.flatten(_.map(groups, function (g) { return g.ids.slice(0, g.take); }));
    }

    function selectHalf() {
        var sel = model.selection();
        if (!sel || !sel.spec_ids)
            return;
        var keep = pickHalf(sel.spec_ids);
        if (keep.length)
            api.select.unitsById(keep);
    }

    /**
     * Keeps the ids whose unit state reports an empty order queue.
     * @param {number[]} ids unit ids, in the same order as states
     * @param {Array<Object|null>} states result of worldview.getUnitState(ids)
     * @returns {number[]}
     */
    function pickIdle(ids, states) {
        return _.filter(ids, function (id, i) {
            var state = states[i];
            return state && state.unit_spec && _.isEmpty(state.orders);
        });
    }

    function selectIdle() {
        var sel = model.selection();
        if (!sel || !sel.spec_ids)
            return;
        var ids = _.flatten(_.values(sel.spec_ids));
        api.getWorldView(0).getUnitState(ids).then(function (states) {
            var keep = pickIdle(ids, _.isArray(states) ? states : [states]);
            // No idle unit: leave the selection alone rather than emptying it.
            if (keep.length)
                api.select.unitsById(keep);
        });
    }

    function registerActions() {
        action_sets.gameplay.halfselect_select_half = selectHalf;
        action_sets.gameplay.halfselect_select_idle = selectIdle;
        // input_maps was built before this mod loaded; rebuild it and re-bind Mousetrap.
        globalHandlers['inputmap.reload']();
        active_maps.valueHasMutated();
    }

    try {
        registerActions();
        console.log(TAG + 'loaded');
    } catch (e) {
        console.error(TAG + 'failed to load: ' + e);
    }
})();
