import React from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

export interface DraggableComponentProps {
    nodeRef: React.RefObject<any>, 
    children: React.ReactElement
}

export const DraggableComponent = ({nodeRef, children}: DraggableComponentProps) => {
    const updateArrow = useXarrow();

    return <Draggable nodeRef={nodeRef} bounds="parent" onDrag={updateArrow} onStop={updateArrow}>{children}</Draggable>
}