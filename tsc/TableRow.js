import { __assign, __extends, __spreadArrays } from "tslib";
import { DateComponent, createElement, PositionCache, RefMap, mapHash, getSegMeta, Fragment, BgEvent, renderFill, isPropsEqual, createRef, buildEventRangeKey } from '@fullcalendar/common';
import { splitSegsByFirstCol } from './TableSeg';
import { TableCell } from './TableCell';
import { TableListItemEvent } from './TableListItemEvent';
import { TableBlockEvent } from './TableBlockEvent';
import { computeFgSegPlacement } from './event-placement';
import { hasListItemDisplay } from './event-rendering';
var TableRow = /** @class */ (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellElRefs = new RefMap(); // the <td>
        _this.frameElRefs = new RefMap(); // the fc-daygrid-day-frame
        _this.fgElRefs = new RefMap(); // the fc-daygrid-day-events
        _this.segHarnessRefs = new RefMap(); // indexed by "instanceId:firstCol"
        _this.rootElRef = createRef();
        _this.state = {
            framePositions: null,
            maxContentHeight: null,
            segHeights: {}
        };
        return _this;
    }
    TableRow.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, state = _a.state, context = _a.context;
        var colCnt = props.cells.length;
        var businessHoursByCol = splitSegsByFirstCol(props.businessHourSegs, colCnt);
        var bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt);
        var highlightSegsByCol = splitSegsByFirstCol(this.getHighlightSegs(), colCnt);
        var mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt);
        var _b = computeFgSegPlacement(props.cells, props.fgEventSegs, props.dayMaxEvents, props.dayMaxEventRows, state.segHeights, state.maxContentHeight, colCnt, context.options.eventOrder), paddingBottoms = _b.paddingBottoms, segsByFirstCol = _b.segsByFirstCol, segsByEachCol = _b.segsByEachCol, segIsHidden = _b.segIsHidden, segTops = _b.segTops, segMarginTops = _b.segMarginTops, moreCnts = _b.moreCnts, moreTops = _b.moreTops;
        var selectedInstanceHash = // TODO: messy way to compute this
         (props.eventDrag && props.eventDrag.affectedInstances) ||
            (props.eventResize && props.eventResize.affectedInstances) ||
            {};
        return (createElement("tr", { ref: this.rootElRef },
            props.renderIntro && props.renderIntro(),
            props.cells.map(function (cell, col) {
                var normalFgNodes = _this.renderFgSegs(segsByFirstCol[col], segIsHidden, segTops, segMarginTops, selectedInstanceHash, props.todayRange);
                var mirrorFgNodes = _this.renderFgSegs(mirrorSegsByCol[col], {}, segTops, // use same tops as real rendering
                {}, {}, props.todayRange, Boolean(props.eventDrag), Boolean(props.eventResize), false // date-selecting (because mirror is never drawn for date selection)
                );
                return (createElement(TableCell, { key: cell.key, elRef: _this.cellElRefs.createRef(cell.key), innerElRef: _this.frameElRefs.createRef(cell.key) /* FF <td> problem, but okay to use for left/right. TODO: rename prop */, dateProfile: props.dateProfile, date: cell.date, showDayNumber: props.showDayNumbers, showWeekNumber: props.showWeekNumbers && col === 0, forceDayTop: props.showWeekNumbers /* even displaying weeknum for row, not necessarily day */, todayRange: props.todayRange, extraHookProps: cell.extraHookProps, extraDataAttrs: cell.extraDataAttrs, extraClassNames: cell.extraClassNames, moreCnt: moreCnts[col], buildMoreLinkText: props.buildMoreLinkText, onMoreClick: props.onMoreClick, segIsHidden: segIsHidden, moreMarginTop: moreTops[col] /* rename */, segsByEachCol: segsByEachCol[col], fgPaddingBottom: paddingBottoms[col], fgContentElRef: _this.fgElRefs.createRef(cell.key), fgContent: ( // Fragment scopes the keys
                    createElement(Fragment, null,
                        createElement(Fragment, null, normalFgNodes),
                        createElement(Fragment, null, mirrorFgNodes))), bgContent: ( // Fragment scopes the keys
                    createElement(Fragment, null,
                        _this.renderFillSegs(highlightSegsByCol[col], 'highlight'),
                        _this.renderFillSegs(businessHoursByCol[col], 'non-business'),
                        _this.renderFillSegs(bgEventSegsByCol[col], 'bg-event'))) }));
            })));
    };
    TableRow.prototype.componentDidMount = function () {
        this.updateSizing(true);
    };
    TableRow.prototype.componentDidUpdate = function (prevProps, prevState) {
        var currentProps = this.props;
        this.updateSizing(!isPropsEqual(prevProps, currentProps));
    };
    TableRow.prototype.getHighlightSegs = function () {
        var props = this.props;
        if (props.eventDrag && props.eventDrag.segs.length) { // messy check
            return props.eventDrag.segs;
        }
        else if (props.eventResize && props.eventResize.segs.length) { // messy check
            return props.eventResize.segs;
        }
        else {
            return props.dateSelectionSegs;
        }
    };
    TableRow.prototype.getMirrorSegs = function () {
        var props = this.props;
        if (props.eventResize && props.eventResize.segs.length) { // messy check
            return props.eventResize.segs;
        }
        else {
            return [];
        }
    };
    TableRow.prototype.renderFgSegs = function (segs, segIsHidden, // does NOT mean display:hidden
    segTops, segMarginTops, selectedInstanceHash, todayRange, isDragging, isResizing, isDateSelecting) {
        var context = this.context;
        var eventSelection = this.props.eventSelection;
        var framePositions = this.state.framePositions;
        var defaultDisplayEventEnd = this.props.cells.length === 1; // colCnt === 1
        var nodes = [];
        if (framePositions) {
            for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                var seg = segs_1[_i];
                var instanceId = seg.eventRange.instance.instanceId;
                var isMirror = isDragging || isResizing || isDateSelecting;
                var isSelected = selectedInstanceHash[instanceId];
                var isInvisible = segIsHidden[instanceId] || isSelected;
                var isAbsolute = segIsHidden[instanceId] || isMirror || seg.firstCol !== seg.lastCol || !seg.isStart || !seg.isEnd; // TODO: simpler way? NOT DRY
                var marginTop = void 0;
                var top_1 = void 0;
                var left = void 0;
                var right = void 0;
                if (isAbsolute) {
                    top_1 = segTops[instanceId];
                    if (context.isRtl) {
                        right = 0;
                        left = framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol];
                    }
                    else {
                        left = 0;
                        right = framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol];
                    }
                }
                else {
                    marginTop = segMarginTops[instanceId];
                }
                /*
                known bug: events that are force to be list-item but span multiple days still take up space in later columns
                */
                nodes.push(createElement("div", { className: 'fc-daygrid-event-harness' + (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''), key: instanceId, ref: isMirror ? null : this.segHarnessRefs.createRef(instanceId + ':' + seg.firstCol) /* in print mode when in mult cols, could collide */, style: {
                        visibility: isInvisible ? 'hidden' : '',
                        marginTop: marginTop || '',
                        top: top_1 || '',
                        left: left || '',
                        right: right || ''
                    } }, hasListItemDisplay(seg) ?
                    createElement(TableListItemEvent, __assign({ seg: seg, isDragging: isDragging, isSelected: instanceId === eventSelection, defaultDisplayEventEnd: defaultDisplayEventEnd }, getSegMeta(seg, todayRange))) :
                    createElement(TableBlockEvent, __assign({ seg: seg, isDragging: isDragging, isResizing: isResizing, isDateSelecting: isDateSelecting, isSelected: instanceId === eventSelection, defaultDisplayEventEnd: defaultDisplayEventEnd }, getSegMeta(seg, todayRange)))));
            }
        }
        return nodes;
    };
    TableRow.prototype.renderFillSegs = function (segs, fillType) {
        var isRtl = this.context.isRtl;
        var todayRange = this.props.todayRange;
        var framePositions = this.state.framePositions;
        var nodes = [];
        if (framePositions) {
            for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
                var seg = segs_2[_i];
                var leftRightCss = isRtl ? {
                    right: 0,
                    left: framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol]
                } : {
                    left: 0,
                    right: framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol],
                };
                nodes.push(createElement("div", { key: buildEventRangeKey(seg.eventRange), className: 'fc-daygrid-bg-harness', style: leftRightCss }, fillType === 'bg-event' ?
                    createElement(BgEvent, __assign({ seg: seg }, getSegMeta(seg, todayRange))) :
                    renderFill(fillType)));
            }
        }
        return createElement.apply(void 0, __spreadArrays([Fragment, {}], nodes));
    };
    TableRow.prototype.updateSizing = function (isExternalSizingChange) {
        var _a = this, props = _a.props, frameElRefs = _a.frameElRefs;
        if (props.clientWidth !== null) { // positioning ready?
            if (isExternalSizingChange) {
                var frameEls = props.cells.map(function (cell) { return frameElRefs.currentMap[cell.key]; });
                if (frameEls.length) {
                    var originEl = this.rootElRef.current;
                    this.setState({
                        framePositions: new PositionCache(originEl, frameEls, true, // isHorizontal
                        false)
                    });
                }
            }
            var limitByContentHeight = props.dayMaxEvents === true || props.dayMaxEventRows === true;
            this.setState({
                segHeights: this.computeSegHeights(),
                maxContentHeight: limitByContentHeight ? this.computeMaxContentHeight() : null
            });
        }
    };
    TableRow.prototype.computeSegHeights = function () {
        return mapHash(this.segHarnessRefs.currentMap, function (eventHarnessEl) { return (eventHarnessEl.getBoundingClientRect().height); });
    };
    TableRow.prototype.computeMaxContentHeight = function () {
        var firstKey = this.props.cells[0].key;
        var cellEl = this.cellElRefs.currentMap[firstKey];
        var fcContainerEl = this.fgElRefs.currentMap[firstKey];
        return cellEl.getBoundingClientRect().bottom - fcContainerEl.getBoundingClientRect().top;
    };
    TableRow.prototype.getCellEls = function () {
        var elMap = this.cellElRefs.currentMap;
        return this.props.cells.map(function (cell) { return elMap[cell.key]; });
    };
    return TableRow;
}(DateComponent));
export { TableRow };
TableRow.addStateEquality({
    segHeights: isPropsEqual
});
//# sourceMappingURL=TableRow.js.map