import { createPlugin } from '@fullcalendar/common';
import { DayTableView } from './DayTableView';
import { TableDateProfileGenerator } from './TableDateProfileGenerator';
import { OPTION_REFINERS } from './options';
import './options-declare';
import './main.css';
export * from './api-type-deps';
export { DayTable, DayTableSlicer } from './DayTable';
export { Table } from './Table';
export { TableView } from './TableView';
export { buildDayTableModel } from './DayTableView';
export { DayTableView as DayGridView }; // export as old name!
export default createPlugin({
    initialView: 'dayGridMonth',
    optionRefiners: OPTION_REFINERS,
    views: {
        dayGrid: {
            component: DayTableView,
            dateProfileGeneratorClass: TableDateProfileGenerator
        },
        dayGridDay: {
            type: 'dayGrid',
            duration: { days: 1 }
        },
        dayGridWeek: {
            type: 'dayGrid',
            duration: { weeks: 1 }
        },
        dayGridMonth: {
            type: 'dayGrid',
            duration: { months: 1 },
            monthMode: true,
            fixedWeekCount: true
        }
    }
});
//# sourceMappingURL=main.js.map