import { Identity, ClassNamesGenerator, CustomContentGenerator, DidMountHandler, WillUnmountHandler } from '@fullcalendar/common';
import { MoreLinkContentArg, MoreLinkAction } from './api-type-deps';
export declare const OPTION_REFINERS: {
    moreLinkClick: Identity<MoreLinkAction>;
    moreLinkClassNames: Identity<ClassNamesGenerator<MoreLinkContentArg>>;
    moreLinkContent: Identity<CustomContentGenerator<MoreLinkContentArg>>;
    moreLinkDidMount: Identity<DidMountHandler<import("@fullcalendar/common").MountArg<MoreLinkContentArg>>>;
    moreLinkWillUnmount: Identity<WillUnmountHandler<import("@fullcalendar/common").MountArg<MoreLinkContentArg>>>;
};
//# sourceMappingURL=options.d.ts.map