/// <reference types="@fullcalendar/core-vdom" />
import { Ref, ComponentChildren, createElement, DateMarker, DateComponent, CssDimValue, DateRange, DateProfile, VUIEvent, ViewApi, Dictionary, MountArg } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export interface TableCellProps {
    date: DateMarker;
    dateProfile: DateProfile;
    extraHookProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
    elRef?: Ref<HTMLTableCellElement>;
    innerElRef?: Ref<HTMLDivElement>;
    bgContent: ComponentChildren;
    fgContentElRef?: Ref<HTMLDivElement>;
    fgContent: ComponentChildren;
    fgPaddingBottom: CssDimValue;
    moreCnt: number;
    moreMarginTop: number;
    showDayNumber: boolean;
    showWeekNumber: boolean;
    forceDayTop: boolean;
    todayRange: DateRange;
    buildMoreLinkText: (num: number) => string;
    onMoreClick?: (arg: MoreLinkArg) => void;
    segsByEachCol: TableSeg[];
    segIsHidden: {
        [instanceId: string]: boolean;
    };
}
export interface TableCellModel {
    key: string;
    date: DateMarker;
    extraHookProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
}
export interface MoreLinkArg {
    date: DateMarker;
    allSegs: TableSeg[];
    hiddenSegs: TableSeg[];
    moreCnt: number;
    dayEl: HTMLElement;
    ev: VUIEvent;
}
export interface HookProps {
    date: Date;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
}
export interface MoreLinkContentArg {
    num: number;
    text: string;
    view: ViewApi;
}
export declare type MoreLinkMountArg = MountArg<MoreLinkContentArg>;
export declare class TableCell extends DateComponent<TableCellProps> {
    private rootEl;
    render(): createElement.JSX.Element;
    handleRootEl: (el: HTMLElement) => void;
    handleMoreLinkClick: (ev: VUIEvent) => void;
}
//# sourceMappingURL=TableCell.d.ts.map