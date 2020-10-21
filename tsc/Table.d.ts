/// <reference types="@fullcalendar/core-vdom" />
import { EventSegUiInteractionState, VNode, DateComponent, RefObject, CssDimValue, createElement, Ref, DateProfile } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
import { TableCellModel, MoreLinkArg } from './TableCell';
export interface TableProps {
    elRef?: Ref<HTMLDivElement>;
    dateProfile: DateProfile;
    cells: TableCellModel[][];
    renderRowIntro?: () => VNode;
    colGroupNode: VNode;
    tableMinWidth: CssDimValue;
    expandRows: boolean;
    showWeekNumbers: boolean;
    clientWidth: number | null;
    clientHeight: number | null;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    headerAlignElRef?: RefObject<HTMLElement>;
    forPrint: boolean;
}
interface TableState {
    morePopoverState: MorePopoverState | null;
}
interface MorePopoverState extends MoreLinkArg {
    currentFgEventSegs: TableSeg[];
}
export declare class Table extends DateComponent<TableProps, TableState> {
    private splitBusinessHourSegs;
    private splitBgEventSegs;
    private splitFgEventSegs;
    private splitDateSelectionSegs;
    private splitEventDrag;
    private splitEventResize;
    private buildBuildMoreLinkText;
    private rootEl;
    private rowRefs;
    private rowPositions;
    private colPositions;
    state: {
        morePopoverState: any;
    };
    render(): createElement.JSX.Element;
    handleRootEl: (rootEl: HTMLElement | null) => void;
    handleMoreLinkClick: (arg: MoreLinkArg) => void;
    handleMorePopoverClose: () => void;
    prepareHits(): void;
    positionToHit(leftPosition: any, topPosition: any): {
        row: any;
        col: any;
        dateSpan: {
            range: {
                start: Date;
                end: Date;
            };
            allDay: boolean;
        };
        dayEl: HTMLTableCellElement;
        relativeRect: {
            left: any;
            right: any;
            top: any;
            bottom: any;
        };
    };
    private getCellEl;
    private getCellRange;
}
export {};
//# sourceMappingURL=Table.d.ts.map