import { __assign, __extends } from "tslib";
import { createElement, DateComponent, buildNavLinkData, RenderHook, WeekNumberRoot, DayCellRoot, DayCellContent, BaseComponent, setRef, createFormatter, Fragment, } from '@fullcalendar/common';
var DEFAULT_WEEK_NUM_FORMAT = createFormatter({ week: 'narrow' });
var TableCell = /** @class */ (function (_super) {
    __extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRootEl = function (el) {
            _this.rootEl = el;
            setRef(_this.props.elRef, el);
        };
        _this.handleMoreLinkClick = function (ev) {
            var props = _this.props;
            if (props.onMoreClick) {
                var allSegs = props.segsByEachCol;
                var hiddenSegs = allSegs.filter(function (seg) { return props.segIsHidden[seg.eventRange.instance.instanceId]; });
                props.onMoreClick({
                    date: props.date,
                    allSegs: allSegs,
                    hiddenSegs: hiddenSegs,
                    moreCnt: props.moreCnt,
                    dayEl: _this.rootEl,
                    ev: ev
                });
            }
        };
        return _this;
    }
    TableCell.prototype.render = function () {
        var _this = this;
        var _a = this.context, options = _a.options, viewApi = _a.viewApi;
        var props = this.props;
        var date = props.date, dateProfile = props.dateProfile;
        var hookProps = {
            num: props.moreCnt,
            text: props.buildMoreLinkText(props.moreCnt),
            view: viewApi
        };
        var navLinkAttrs = options.navLinks
            ? { 'data-navlink': buildNavLinkData(date, 'week'), tabIndex: 0 }
            : {};
        return (createElement(DayCellRoot, { date: date, dateProfile: dateProfile, todayRange: props.todayRange, showDayNumber: props.showDayNumber, extraHookProps: props.extraHookProps, elRef: this.handleRootEl }, function (rootElRef, classNames, rootDataAttrs, isDisabled) { return (createElement("td", __assign({ ref: rootElRef, className: ['fc-daygrid-day'].concat(classNames, props.extraClassNames || []).join(' ') }, rootDataAttrs, props.extraDataAttrs),
            createElement("div", { className: 'fc-daygrid-day-frame fc-scrollgrid-sync-inner', ref: props.innerElRef /* different from hook system! RENAME */ },
                props.showWeekNumber &&
                    createElement(WeekNumberRoot, { date: date, defaultFormat: DEFAULT_WEEK_NUM_FORMAT }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("a", __assign({ ref: rootElRef, className: ['fc-daygrid-week-number'].concat(classNames).join(' ') }, navLinkAttrs), innerContent)); }),
                !isDisabled &&
                    createElement(TableCellTop, { date: date, dateProfile: dateProfile, showDayNumber: props.showDayNumber, forceDayTop: props.forceDayTop, todayRange: props.todayRange, extraHookProps: props.extraHookProps }),
                createElement("div", { className: 'fc-daygrid-day-events', ref: props.fgContentElRef, style: { paddingBottom: props.fgPaddingBottom } },
                    props.fgContent,
                    Boolean(props.moreCnt) &&
                        createElement("div", { className: 'fc-daygrid-day-bottom', style: { marginTop: props.moreMarginTop } },
                            createElement(RenderHook, { hookProps: hookProps, classNames: options.moreLinkClassNames, content: options.moreLinkContent, defaultContent: renderMoreLinkInner, didMount: options.moreLinkDidMount, willUnmount: options.moreLinkWillUnmount }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("a", { onClick: _this.handleMoreLinkClick, ref: rootElRef, className: ['fc-daygrid-more-link'].concat(classNames).join(' ') }, innerContent)); }))),
                createElement("div", { className: 'fc-daygrid-day-bg' }, props.bgContent)))); }));
    };
    return TableCell;
}(DateComponent));
export { TableCell };
function renderTopInner(props) {
    return props.dayNumberText;
}
function renderMoreLinkInner(props) {
    return props.text;
}
var TableCellTop = /** @class */ (function (_super) {
    __extends(TableCellTop, _super);
    function TableCellTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCellTop.prototype.render = function () {
        var props = this.props;
        var navLinkAttrs = this.context.options.navLinks
            ? { 'data-navlink': buildNavLinkData(props.date), tabIndex: 0 }
            : {};
        return (createElement(DayCellContent, { date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, showDayNumber: props.showDayNumber, extraHookProps: props.extraHookProps, defaultContent: renderTopInner }, function (innerElRef, innerContent) { return ((innerContent || props.forceDayTop) &&
            createElement("div", { className: 'fc-daygrid-day-top', ref: innerElRef },
                createElement("a", __assign({ className: 'fc-daygrid-day-number' }, navLinkAttrs), innerContent || createElement(Fragment, null, "\u00A0")))); }));
    };
    return TableCellTop;
}(BaseComponent));
//# sourceMappingURL=TableCell.js.map