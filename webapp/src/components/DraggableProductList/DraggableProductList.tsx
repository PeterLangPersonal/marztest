import React from 'react';
import { DraggableProvided, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableProduct from '../DraggableProduct/DraggableProduct';
import { DraggableProductListProps } from '../interfaces';

const DraggableProductList = (props: DraggableProductListProps) => (
    <Droppable droppableId={props.ID}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                className='bg-neutral-500 p-4 w-full'
                data-testid={`droppable-container-${props.ID}`}
            >
                <h5
                    className='font-bold text-white'
                    data-testid={`droppable-title-${props.ID}`}
                >
                    {props.listTitle}
                </h5>
                {
                    props.items.length > 0 && props.items.map((item, index) => (
                        <Draggable
                            key={item.ProductID}
                            draggableId={`${item.ProductID}`}
                            index={index}
                        >
                            {(provided: DraggableProvided) => (
                                <DraggableProduct
                                    item={item}
                                    draggableProvided={provided}
                                    removeItem={props.removeItem}
                                />
                            )}
                        </Draggable>
                    ))
                }
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default DraggableProductList;