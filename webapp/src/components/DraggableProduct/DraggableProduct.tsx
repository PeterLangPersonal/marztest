import React from 'react';
import { DraggableProductProps } from '../interfaces';

const DraggableItem = (props: DraggableProductProps) => (
    <div
        ref={props.draggableProvided.innerRef}
        {...props.draggableProvided.draggableProps}
        {...props.draggableProvided.dragHandleProps}
        className='bg-neutral-300 flex items-center justify-between mt-1 p-3 rounded w-full'
        data-testid={`draggable-container-${props.item.ProductID}`}
    >
        <span data-testid={`draggable-productID-${props.item.ProductID}`}>{ props.item.ProductID }</span>
        <span data-testid={`draggable-productName-${props.item.ProductID}`}>{ props.item.ProductName }</span>
        <img src={props.item.ProductPhotoURL} alt={`${props.item.ProductName}`}/>
    </div>
);

export default DraggableItem;