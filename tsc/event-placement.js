import { __assign } from "tslib";
import { sortEventSegs, addDays, intersectRanges } from '@fullcalendar/common';
export function computeFgSegPlacement(// for one row. TODO: print mode?
cellModels, segs, dayMaxEvents, dayMaxEventRows, eventHeights, maxContentHeight, colCnt, eventOrderSpecs) {
    var colPlacements = []; // if event spans multiple cols, its present in each col
    var moreCnts = []; // by-col
    var segIsHidden = {};
    var segTops = {}; // always populated for each seg
    var segMarginTops = {}; // simetimes populated for each seg
    var moreTops = {};
    var paddingBottoms = {}; // for each cell's inner-wrapper div
    for (var i = 0; i < colCnt; i++) {
        colPlacements.push([]);
        moreCnts.push(0);
    }
    segs = sortEventSegs(segs, eventOrderSpecs);
    for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        var seg = segs_1[_i];
        var instanceId = seg.eventRange.instance.instanceId;
        var eventHeight = eventHeights[instanceId + ':' + seg.firstCol];
        placeSeg(seg, eventHeight || 0); // will keep colPlacements sorted by top
    }
    if (dayMaxEvents === true || dayMaxEventRows === true) {
        limitByMaxHeight(moreCnts, segIsHidden, colPlacements, maxContentHeight); // populates moreCnts/segIsHidden
    }
    else if (typeof dayMaxEvents === 'number') {
        limitByMaxEvents(moreCnts, segIsHidden, colPlacements, dayMaxEvents); // populates moreCnts/segIsHidden
    }
    else if (typeof dayMaxEventRows === 'number') {
        limitByMaxRows(moreCnts, segIsHidden, colPlacements, dayMaxEventRows); // populates moreCnts/segIsHidden
    }
    // computes segTops/segMarginTops/moreTops/paddingBottoms
    for (var col = 0; col < colCnt; col++) {
        var placements = colPlacements[col];
        var currentNonAbsBottom = 0;
        var currentAbsHeight = 0;
        for (var _a = 0, placements_1 = placements; _a < placements_1.length; _a++) {
            var placement = placements_1[_a];
            var seg = placement.seg;
            if (!segIsHidden[seg.eventRange.instance.instanceId]) {
                segTops[seg.eventRange.instance.instanceId] = placement.top; // from top of container
                if (seg.firstCol === seg.lastCol && seg.isStart && seg.isEnd) { // TODO: simpler way? NOT DRY
                    segMarginTops[seg.eventRange.instance.instanceId] =
                        placement.top - currentNonAbsBottom; // from previous seg bottom
                    currentAbsHeight = 0;
                    currentNonAbsBottom = placement.bottom;
                }
                else { // multi-col event, abs positioned
                    currentAbsHeight = placement.bottom - currentNonAbsBottom;
                }
            }
        }
        if (currentAbsHeight) {
            if (moreCnts[col]) {
                moreTops[col] = currentAbsHeight;
            }
            else {
                paddingBottoms[col] = currentAbsHeight;
            }
        }
    }
    function placeSeg(seg, segHeight) {
        if (!tryPlaceSegAt(seg, segHeight, 0)) {
            for (var col = seg.firstCol; col <= seg.lastCol; col++) {
                for (var _i = 0, _a = colPlacements[col]; _i < _a.length; _i++) { // will repeat multi-day segs!!!!!!! bad!!!!!!
                    var placement = _a[_i];
                    if (tryPlaceSegAt(seg, segHeight, placement.bottom)) {
                        return;
                    }
                }
            }
        }
    }
    function tryPlaceSegAt(seg, segHeight, top) {
        if (canPlaceSegAt(seg, segHeight, top)) {
            for (var col = seg.firstCol; col <= seg.lastCol; col++) {
                var placements = colPlacements[col];
                var insertionIndex = 0;
                while (insertionIndex < placements.length &&
                    top >= placements[insertionIndex].top) {
                    insertionIndex++;
                }
                placements.splice(insertionIndex, 0, {
                    seg: seg,
                    top: top,
                    bottom: top + segHeight
                });
            }
            return true;
        }
        else {
            return false;
        }
    }
    function canPlaceSegAt(seg, segHeight, top) {
        for (var col = seg.firstCol; col <= seg.lastCol; col++) {
            for (var _i = 0, _a = colPlacements[col]; _i < _a.length; _i++) {
                var placement = _a[_i];
                if (top < placement.bottom && top + segHeight > placement.top) { // collide?
                    return false;
                }
            }
        }
        return true;
    }
    // what does this do!?
    for (var instanceIdAndFirstCol in eventHeights) {
        if (!eventHeights[instanceIdAndFirstCol]) {
            segIsHidden[instanceIdAndFirstCol.split(':')[0]] = true;
        }
    }
    var segsByFirstCol = colPlacements.map(extractFirstColSegs); // operates on the sorted cols
    var segsByEachCol = colPlacements.map(function (placements, col) {
        var segs = extractAllColSegs(placements);
        segs = resliceDaySegs(segs, cellModels[col].date, col);
        return segs;
    });
    return {
        segsByFirstCol: segsByFirstCol,
        segsByEachCol: segsByEachCol,
        segIsHidden: segIsHidden,
        segTops: segTops,
        segMarginTops: segMarginTops,
        moreCnts: moreCnts,
        moreTops: moreTops,
        paddingBottoms: paddingBottoms
    };
}
function extractFirstColSegs(oneColPlacements, col) {
    var segs = [];
    for (var _i = 0, oneColPlacements_1 = oneColPlacements; _i < oneColPlacements_1.length; _i++) {
        var placement = oneColPlacements_1[_i];
        if (placement.seg.firstCol === col) {
            segs.push(placement.seg);
        }
    }
    return segs;
}
function extractAllColSegs(oneColPlacements) {
    var segs = [];
    for (var _i = 0, oneColPlacements_2 = oneColPlacements; _i < oneColPlacements_2.length; _i++) {
        var placement = oneColPlacements_2[_i];
        segs.push(placement.seg);
    }
    return segs;
}
function limitByMaxHeight(hiddenCnts, segIsHidden, colPlacements, maxContentHeight) {
    limitEvents(hiddenCnts, segIsHidden, colPlacements, true, function (placement) {
        return placement.bottom <= maxContentHeight;
    });
}
function limitByMaxEvents(hiddenCnts, segIsHidden, colPlacements, dayMaxEvents) {
    limitEvents(hiddenCnts, segIsHidden, colPlacements, false, function (placement, levelIndex) {
        return levelIndex < dayMaxEvents;
    });
}
function limitByMaxRows(hiddenCnts, segIsHidden, colPlacements, dayMaxEventRows) {
    limitEvents(hiddenCnts, segIsHidden, colPlacements, true, function (placement, levelIndex) {
        return levelIndex < dayMaxEventRows;
    });
}
/*
populates the given hiddenCnts/segIsHidden, which are supplied empty.
TODO: return them instead
*/
function limitEvents(hiddenCnts, segIsHidden, colPlacements, _moreLinkConsumesLevel, isPlacementInBounds) {
    var colCnt = hiddenCnts.length;
    var segIsVisible = {}; // TODO: instead, use segIsHidden with true/false?
    var visibleColPlacements = []; // will mirror colPlacements
    for (var col = 0; col < colCnt; col++) {
        visibleColPlacements.push([]);
    }
    for (var col = 0; col < colCnt; col++) {
        var placements = colPlacements[col];
        var level = 0;
        for (var _i = 0, placements_2 = placements; _i < placements_2.length; _i++) {
            var placement = placements_2[_i];
            if (isPlacementInBounds(placement, level)) {
                recordVisible(placement);
            }
            else {
                recordHidden(placement, level, _moreLinkConsumesLevel);
            }
            // only considered a level if the seg had height
            if (placement.top !== placement.bottom) {
                level++;
            }
        }
    }
    function recordVisible(placement) {
        var seg = placement.seg;
        var instanceId = seg.eventRange.instance.instanceId;
        if (!segIsVisible[instanceId]) {
            segIsVisible[instanceId] = true;
            for (var col = seg.firstCol; col <= seg.lastCol; col++) {
                visibleColPlacements[col].push(placement);
            }
        }
    }
    function recordHidden(placement, currentLevel, moreLinkConsumesLevel) {
        var seg = placement.seg;
        var instanceId = seg.eventRange.instance.instanceId;
        if (!segIsHidden[instanceId]) {
            segIsHidden[instanceId] = true;
            for (var col = seg.firstCol; col <= seg.lastCol; col++) {
                var hiddenCnt = ++hiddenCnts[col];
                if (moreLinkConsumesLevel && hiddenCnt === 1) {
                    var doomedLevel = currentLevel - 1;
                    while (visibleColPlacements[col].length > doomedLevel) {
                        recordHidden(visibleColPlacements[col].pop(), // removes
                        visibleColPlacements[col].length, // will execute after the pop. will be the index of the removed placement
                        false);
                    }
                }
            }
        }
    }
}
// Given the events within an array of segment objects, reslice them to be in a single day
function resliceDaySegs(segs, dayDate, colIndex) {
    var dayStart = dayDate;
    var dayEnd = addDays(dayStart, 1);
    var dayRange = { start: dayStart, end: dayEnd };
    var newSegs = [];
    for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
        var seg = segs_2[_i];
        var eventRange = seg.eventRange;
        var origRange = eventRange.range;
        var slicedRange = intersectRanges(origRange, dayRange);
        if (slicedRange) {
            newSegs.push(__assign(__assign({}, seg), { firstCol: colIndex, lastCol: colIndex, eventRange: {
                    def: eventRange.def,
                    ui: __assign(__assign({}, eventRange.ui), { durationEditable: false }),
                    instance: eventRange.instance,
                    range: slicedRange
                }, isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(), isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf() }));
        }
    }
    return newSegs;
}
//# sourceMappingURL=event-placement.js.map