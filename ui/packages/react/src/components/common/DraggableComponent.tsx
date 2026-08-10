import React from "react";
import Draggable from "react-draggable";

export interface DraggableComponentProps {
    nodeRef: React.RefObject<any>, 
    children: React.ReactElement
}

export const DraggableComponent = ({nodeRef, children}: DraggableComponentProps) => {
    return <Draggable nodeRef={nodeRef} bounds="parent">{children}</Draggable>
}