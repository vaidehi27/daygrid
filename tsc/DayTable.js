import { __assign, __extends } from "tslib";
import { createElement, createRef, DateComponent, Slicer } from '@fullcalendar/common';
import { Table } from './Table';
var DayTable = /** @class */ (function (_super) {
    __extends(DayTable, _super);
    function DayTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.slicer = new DayTableSlicer();
        _this.tableRef = createRef();
        _this.handleRootEl = function (rootEl) {
            if (rootEl) {
                _this.context.registerInteractiveComponent(_this, { el: rootEl });
            }
            else {
                _this.context.unregisterInteractiveComponent(_this);
            }
        };
        return _this;
    }
    DayTable.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        return (createElement(Table, __assign({ ref: this.tableRef, elRef: this.handleRootEl }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), { dateProfile: props.dateProfile, cells: props.dayTableModel.cells, colGroupNode: props.colGroupNode, tableMinWidth: props.tableMinWidth, renderRowIntro: props.renderRowIntro, dayMaxEvents: props.dayMaxEvents, dayMaxEventRows: props.dayMaxEventRows, showWeekNumbers: props.showWeekNumbers, expandRows: props.expandRows, headerAlignElRef: props.headerAlignElRef, clientWidth: props.clientWidth, clientHeight: props.clientHeight, forPrint: props.forPrint })));
    };
    DayTable.prototype.prepareHits = function () {
        this.tableRef.current.prepareHits();
    };
    DayTable.prototype.queryHit = function (positionLeft, positionTop) {
        var rawHit = this.tableRef.current.positionToHit(positionLeft, positionTop);
        if (rawHit) {
            return {
                component: this,
                dateSpan: rawHit.dateSpan,
                dayEl: rawHit.dayEl,
                rect: {
                    left: rawHit.relativeRect.left,
                    right: rawHit.relativeRect.right,
                    top: rawHit.relativeRect.top,
                    bottom: rawHit.relativeRect.bottom
                },
                layer: 0
            };
        }
    };
    return DayTable;
}(DateComponent));
export { DayTable };
var DayTableSlicer = /** @class */ (function (_super) {
    __extends(DayTableSlicer, _super);
    function DayTableSlicer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.forceDayIfListItem = true;
        return _this;
    }
    DayTableSlicer.prototype.sliceRange = function (dateRange, dayTableModel) {
        return dayTableModel.sliceRange(dateRange);
    };
    return DayTableSlicer;
}(Slicer));
export { DayTableSlicer };
//# sourceMappingURL=DayTable.js.map