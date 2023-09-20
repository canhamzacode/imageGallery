import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ImageCard from '../components/ImageCard';
import initialItems from '../data/InitialItem';

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredItems, setFilteredItems] = useState(initialItems);
    const [isLoading, setIsLoading] = useState(false);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(filteredItems);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setFilteredItems(reorderedItems);
    };

    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchInput(value);

        // Filter items based on the search input
        const filtered = initialItems.filter((item) =>
            item.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="w-full md:px-[40px] p-[20px] grid gap-[40px]">
            <div className="w-full flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search Image"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="bg-red-400 text-white placeholder-white border-none outline-none w-full max-w-[300px] p-[10px] rounded-md"
                />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="image-gallery" direction="horizontal">
                    {(provided) => (
                        <div
                            className="w-full grid grid-cols-1 md:grid-cols-3 gap-[15px]"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : filteredItems.length === 0 ? (
                                <p>No results found</p>
                            ) : (
                                filteredItems.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ImageCard
                                                    image={item.src}
                                                    author={item.author}
                                                    title={item.title}
                                                    tags={item.tags}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Home;