/// <reference types="@fullcalendar/core-vdom" />
import { EventApi, ViewApi, VUIEvent } from '@fullcalendar/common';
export interface EventSegment {
    event: EventApi;
    start: Date;
    end: Date;
    isStart: boolean;
    isEnd: boolean;
}
export declare type MoreLinkAction = MoreLinkSimpleAction | MoreLinkHandler;
export declare type MoreLinkSimpleAction = 'popover' | 'week' | 'day' | 'timeGridWeek' | 'timeGridDay' | string;
export interface MoreLinkArg {
    date: Date;
    allDay: boolean;
    allSegs: EventSegment[];
    hiddenSegs: EventSegment[];
    jsEvent: VUIEvent;
    view: ViewApi;
}
export declare type MoreLinkHandler = (arg: MoreLinkArg) => MoreLinkSimpleAction | void;
//# sourceMappingURL=more-link.d.ts.map