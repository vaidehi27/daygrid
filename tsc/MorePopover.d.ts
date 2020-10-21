import { DateComponent, DateMarker, createElement, EventInstanceHash, Hit, DateRange, DateProfile } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export interface MorePopoverProps {
    date: DateMarker;
    dateProfile: DateProfile;
    segs: TableSeg[];
    selectedInstanceId: string;
    hiddenInstances: EventInstanceHash;
    alignmentEl: HTMLElement;
    topAlignmentEl?: HTMLElement;
    onCloseClick?: () => void;
    todayRange: DateRange;
}
export declare class MorePopover extends DateComponent<MorePopoverProps> {
    private popoverEl;
    render(): createElement.JSX.Element;
    handlePopoverEl: (popoverEl: HTMLElement | null) => void;
    queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit | null;
    isPopover(): boolean;
}
//# sourceMappingURL=MorePopover.d.ts.map