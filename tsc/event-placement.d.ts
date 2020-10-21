import { OrderSpec, EventApi } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
import { TableCellModel } from './TableCell';
export declare function computeFgSegPlacement(// for one row. TODO: print mode?
cellModels: TableCellModel[], segs: TableSeg[], dayMaxEvents: boolean | number, dayMaxEventRows: boolean | number, eventHeights: {
    [instanceIdAndFirstCol: string]: number;
}, maxContentHeight: number | null, colCnt: number, eventOrderSpecs: OrderSpec<EventApi>[]): {
    segsByFirstCol: TableSeg[][];
    segsByEachCol: TableSeg[][];
    segIsHidden: {
        [instanceId: string]: boolean;
    };
    segTops: {
        [instanceId: string]: number;
    };
    segMarginTops: {
        [instanceId: string]: number;
    };
    moreCnts: number[];
    moreTops: {
        [col: string]: number;
    };
    paddingBottoms: {
        [col: string]: number;
    };
};
//# sourceMappingURL=event-placement.d.ts.map