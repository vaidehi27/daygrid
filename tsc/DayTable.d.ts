/// <reference types="@fullcalendar/core-vdom" />
import { createElement, VNode, EventStore, EventUiHash, DateSpan, EventInteractionState, DayTableModel, Duration, DateComponent, DateRange, Slicer, ViewContext, RefObject, CssDimValue, Hit, DateProfile } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export interface DayTableProps {
    dateProfile: DateProfile;
    dayTableModel: DayTableModel;
    nextDayThreshold: Duration;
    businessHours: EventStore;
    eventStore: EventStore;
    eventUiBases: EventUiHash;
    dateSelection: DateSpan | null;
    eventSelection: string;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    colGroupNode: VNode;
    tableMinWidth: CssDimValue;
    renderRowIntro?: () => VNode;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    expandRows: boolean;
    showWeekNumbers: boolean;
    headerAlignElRef?: RefObject<HTMLElement>;
    clientWidth: number | null;
    clientHeight: number | null;
    forPrint: boolean;
}
export declare class DayTable extends DateComponent<DayTableProps, ViewContext> {
    private slicer;
    private tableRef;
    render(): createElement.JSX.Element;
    handleRootEl: (rootEl: HTMLDivElement | null) => void;
    prepareHits(): void;
    queryHit(positionLeft: number, positionTop: number): Hit;
}
export declare class DayTableSlicer extends Slicer<TableSeg, [DayTableModel]> {
    forceDayIfListItem: boolean;
    sliceRange(dateRange: DateRange, dayTableModel: DayTableModel): TableSeg[];
}
//# sourceMappingURL=DayTable.d.ts.map