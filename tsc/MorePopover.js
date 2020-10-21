import { __assign, __extends } from "tslib";
import { DateComponent, createElement, addDays, getSegMeta, DayCellRoot, DayCellContent } from '@fullcalendar/common';
import { TableBlockEvent } from './TableBlockEvent';
import { TableListItemEvent } from './TableListItemEvent';
import { Popover } from './Popover';
import { hasListItemDisplay } from './event-rendering';
var MorePopover = /** @class */ (function (_super) {
    __extends(MorePopover, _super);
    function MorePopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlePopoverEl = function (popoverEl) {
            _this.popoverEl = popoverEl;
            if (popoverEl) {
                _this.context.registerInteractiveComponent(_this, {
                    el: popoverEl,
                    useEventCenter: false
                });
            }
            else {
                _this.context.unregisterInteractiveComponent(_this);
            }
        };
        return _this;
    }
    MorePopover.prototype.render = function () {
        var _a = this.context, options = _a.options, dateEnv = _a.dateEnv;
        var props = this.props;
        var date = props.date, hiddenInstances = props.hiddenInstances, todayRange = props.todayRange, dateProfile = props.dateProfile, selectedInstanceId = props.selectedInstanceId;
        var title = dateEnv.format(date, options.dayPopoverFormat);
        return (createElement(DayCellRoot, { date: date, dateProfile: dateProfile, todayRange: todayRange, elRef: this.handlePopoverEl }, function (rootElRef, dayClassNames, dataAttrs) { return (createElement(Popover, { elRef: rootElRef, title: title, extraClassNames: ['fc-more-popover'].concat(dayClassNames), extraAttrs: dataAttrs, onClose: props.onCloseClick, alignmentEl: props.alignmentEl, topAlignmentEl: props.topAlignmentEl },
            createElement(DayCellContent, { date: date, dateProfile: dateProfile, todayRange: todayRange }, function (innerElRef, innerContent) { return (innerContent &&
                createElement("div", { className: 'fc-more-popover-misc', ref: innerElRef }, innerContent)); }),
            props.segs.map(function (seg) {
                var instanceId = seg.eventRange.instance.instanceId;
                return (createElement("div", { className: 'fc-daygrid-event-harness', key: instanceId, style: {
                        visibility: hiddenInstances[instanceId] ? 'hidden' : ''
                    } }, hasListItemDisplay(seg) ?
                    createElement(TableListItemEvent, __assign({ seg: seg, isDragging: false, isSelected: instanceId === selectedInstanceId, defaultDisplayEventEnd: false }, getSegMeta(seg, todayRange))) :
                    createElement(TableBlockEvent, __assign({ seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: instanceId === selectedInstanceId, defaultDisplayEventEnd: false }, getSegMeta(seg, todayRange)))));
            }))); }));
    };
    MorePopover.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        var date = this.props.date;
        if (positionLeft < elWidth && positionTop < elHeight) {
            return {
                component: this,
                dateSpan: {
                    allDay: true,
                    range: { start: date, end: addDays(date, 1) }
                },
                dayEl: this.popoverEl,
                rect: {
                    left: 0,
                    top: 0,
                    right: elWidth,
                    bottom: elHeight
                },
                layer: 1
            };
        }
    };
    MorePopover.prototype.isPopover = function () {
        return true; // gross
    };
    return MorePopover;
}(DateComponent));
export { MorePopover };
//# sourceMappingURL=MorePopover.js.map