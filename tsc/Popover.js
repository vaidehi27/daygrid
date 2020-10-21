import { __assign, __extends } from "tslib";
import { createElement, applyStyle, BaseComponent, DelayedRunner, setRef } from '@fullcalendar/common';
var PADDING_FROM_VIEWPORT = 10;
var SCROLL_DEBOUNCE = 10;
var Popover = /** @class */ (function (_super) {
    __extends(Popover, _super);
    function Popover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.repositioner = new DelayedRunner(_this.updateSize.bind(_this));
        _this.handleRootEl = function (el) {
            _this.rootEl = el;
            if (_this.props.elRef) {
                setRef(_this.props.elRef, el);
            }
        };
        // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
        _this.handleDocumentMousedown = function (ev) {
            var onClose = _this.props.onClose;
            // only hide the popover if the click happened outside the popover
            if (onClose && !_this.rootEl.contains(ev.target)) {
                onClose();
            }
        };
        _this.handleDocumentScroll = function () {
            _this.repositioner.request(SCROLL_DEBOUNCE);
        };
        _this.handleCloseClick = function () {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose();
            }
        };
        return _this;
    }
    Popover.prototype.render = function () {
        var theme = this.context.theme;
        var props = this.props;
        var classNames = [
            'fc-popover',
            theme.getClass('popover')
        ].concat(props.extraClassNames || []);
        return (createElement("div", __assign({ className: classNames.join(' ') }, props.extraAttrs, { ref: this.handleRootEl }),
            createElement("div", { className: 'fc-popover-header ' + theme.getClass('popoverHeader') },
                createElement("span", { className: 'fc-popover-title' }, props.title),
                createElement("span", { className: 'fc-popover-close ' + theme.getIconClass('close'), onClick: this.handleCloseClick })),
            createElement("div", { className: 'fc-popover-body ' + theme.getClass('popoverContent') }, props.children)));
    };
    Popover.prototype.componentDidMount = function () {
        document.addEventListener('mousedown', this.handleDocumentMousedown);
        document.addEventListener('scroll', this.handleDocumentScroll);
        this.updateSize();
    };
    Popover.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this.handleDocumentMousedown);
        document.removeEventListener('scroll', this.handleDocumentScroll);
    };
    // TODO: adjust on window resize
    /*
    NOTE: the popover is position:fixed, so coordinates are relative to the viewport
    NOTE: the PARENT calls this as well, on window resize. we would have wanted to use the repositioner,
          but need to ensure that all other components have updated size first (for alignmentEl)
    */
    Popover.prototype.updateSize = function () {
        var _a = this.props, alignmentEl = _a.alignmentEl, topAlignmentEl = _a.topAlignmentEl;
        var rootEl = this.rootEl;
        if (!rootEl) {
            return; // not sure why this was null, but we shouldn't let external components call updateSize() anyway
        }
        var dims = rootEl.getBoundingClientRect(); // only used for width,height
        var alignment = alignmentEl.getBoundingClientRect();
        var top = topAlignmentEl ? topAlignmentEl.getBoundingClientRect().top : alignment.top;
        top = Math.min(top, window.innerHeight - dims.height - PADDING_FROM_VIEWPORT);
        top = Math.max(top, PADDING_FROM_VIEWPORT);
        var left;
        if (this.context.isRtl) {
            left = alignment.right - dims.width;
        }
        else {
            left = alignment.left;
        }
        left = Math.min(left, window.innerWidth - dims.width - PADDING_FROM_VIEWPORT);
        left = Math.max(left, PADDING_FROM_VIEWPORT);
        applyStyle(rootEl, { top: top, left: left });
    };
    return Popover;
}(BaseComponent));
export { Popover };
//# sourceMappingURL=Popover.js.map