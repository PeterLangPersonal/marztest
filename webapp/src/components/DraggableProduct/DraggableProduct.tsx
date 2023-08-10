import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { DraggableProductProps } from '../interfaces';

const DraggableItem = (props: DraggableProductProps) => (
    <div
        ref={props.draggableProvided.innerRef}
        {...props.draggableProvided.draggableProps}
        {...props.draggableProvided.dragHandleProps}
        className='bg-neutral-300 flex items-center justify-between mt-1 p-3 rounded w-full'
        data-testid={`draggable-container-${props.item.ProductID}`}
    >
        {(() => {
            const { ProductID, ProductStatus } = props.item;
            return (
                <button onClick={() => props.removeItem(props.item)}>
                    <FontAwesomeIcon
                        icon={ProductStatus === 'Active' ? faSquareCheck : faSquareXmark}
                        className={`${ProductStatus === 'Active' ? 'text-green-600' : 'text-red-600'} fa-lg`}
                        data-testid={`draggable-btn-${ProductID}`}
                    />
                </button>
            );
        })()}
    </div>
);

export default DraggableItem;