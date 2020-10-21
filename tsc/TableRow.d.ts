/// <reference types="@fullcalendar/core-vdom" />
import { EventSegUiInteractionState, VNode, DateComponent, createElement, PositionCache, DateRange, DateProfile } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
import { TableCellModel, MoreLinkArg } from './TableCell';
export interface TableRowProps {
    cells: TableCellModel[];
    renderIntro?: () => VNode;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    clientWidth: number | null;
    clientHeight: number | null;
    onMoreClick?: (arg: MoreLinkArg) => void;
    dateProfile: DateProfile;
    todayRange: DateRange;
    showDayNumbers: boolean;
    showWeekNumbers: boolean;
    buildMoreLinkText: (num: number) => string;
}
interface TableRowState {
    framePositions: PositionCache;
    maxContentHeight: number | null;
    segHeights: {
        [instanceIdAndFirstCol: string]: number;
    } | null;
}
export declare class TableRow extends DateComponent<TableRowProps, TableRowState> {
    private cellElRefs;
    private frameElRefs;
    private fgElRefs;
    private segHarnessRefs;
    private rootElRef;
    state: TableRowState;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableRowProps, prevState: TableRowState): void;
    getHighlightSegs(): TableSeg[];
    getMirrorSegs(): TableSeg[];
    renderFgSegs(segs: TableSeg[], segIsHidden: {
        [instanceId: string]: boolean;
    }, // does NOT mean display:hidden
    segTops: {
        [instanceId: string]: number;
    }, segMarginTops: {
        [instanceId: string]: number;
    }, selectedInstanceHash: {
        [instanceId: string]: any;
    }, todayRange: DateRange, isDragging?: boolean, isResizing?: boolean, isDateSelecting?: boolean): VNode[];
    renderFillSegs(segs: TableSeg[], fillType: string): import("preact").VNode<any>;
    updateSizing(isExternalSizingChange: any): void;
    computeSegHeights(): {
        [key: string]: number;
    };
    computeMaxContentHeight(): number;
    getCellEls(): HTMLTableCellElement[];
}
export {};
//# sourceMappingURL=TableRow.d.ts.map