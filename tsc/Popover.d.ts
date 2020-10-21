import { createElement, ComponentChildren, BaseComponent, Ref, Dictionary } from '@fullcalendar/common';
export interface PopoverProps {
    title: string;
    extraClassNames?: string[];
    extraAttrs?: Dictionary;
    alignmentEl: HTMLElement;
    topAlignmentEl?: HTMLElement;
    onClose?: () => void;
    elRef?: Ref<HTMLDivElement>;
    children?: ComponentChildren;
}
export declare class Popover extends BaseComponent<PopoverProps> {
    private rootEl;
    private repositioner;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleRootEl: (el: HTMLElement | null) => void;
    handleDocumentMousedown: (ev: any) => void;
    handleDocumentScroll: () => void;
    handleCloseClick: () => void;
    private updateSize;
}
//# sourceMappingURL=Popover.d.ts.map