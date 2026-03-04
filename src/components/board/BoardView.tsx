import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    fetchViewsForBoard, createBoardView, setActiveViewId,
    clearBoardViews, selectBoardViewStatus,
    deleteBoardView, updateBoardView,
    selectViewsForBoard, selectActiveViewIdForBoard, makeSelectActiveView,
} from '../../store/features/boardViewSlice';
import {
    fetchGroupsForBoard, reorderGroupsLocally, updateGroupOrder, selectGroupsForBoard, createGroup
} from '../../store/features/groupSlice';
import {
    fetchColumnsForBoard, reorderColumnsLocally, updateColumnOrder, selectColumnsForBoard
} from '../../store/features/columnSlice';
import {
    fetchItemsForBoard, fetchItemTree, Item, moveItem, reorderItemsLocally as reorderItems, selectItemsForBoard, type MoveItemArgs
} from '../../store/features/itemSlice';

// --- DND-KIT Imports ---
import {
    DndContext,
    closestCenter,
    pointerWithin,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
    type DropAnimation,
    type CollisionDetection
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

// Componentler
import BoardHeader from './BoardHeader';
import GroupSection from '../group/GroupSection';
import BoardActionbar from './BoardActionbar';
import BoardViewTabs from './BoardViewTabs';
import GanttView from './GanttView';
import ItemRow from '../item/ItemRow';

import { getRandomColor } from '../../utils/colors';
import { FiPlus } from 'react-icons/fi';
import { DEFAULT_ZOOM_INDEX } from '../common/constants';
import { fetchUsers } from '@/store/slices/userSlice';
import { useModal } from '@/context/ModalContext';
import AddBoardForm from './AddBoardForm';
import { useTabs } from '@/context/TabsContext';

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: { active: { opacity: '0.5' } },
    }),
};

export const INDENT_STEP = 40;

const BoardView = ({ boardId }: { boardId?: number }) => {
    const { openTab } = useTabs();
    const dispatch = useAppDispatch();
    const { openModal } = useModal();
    const [pageCheck, setPageCheck] = useState(false);

    // Open board selector modal when no boardId prop is given
    useEffect(() => {
        if (boardId) return;
        if (pageCheck) return;
        openModal({
            title: "Proje Uygulama Takimi Oluşturma",
            content: (close: (result: any) => void): React.ReactNode => (
                <AddBoardForm projectType={undefined} onClose={(newBoardId: number) => {
                    if (newBoardId !== -1) {
                        close(null);
                        setPageCheck(true);
                    }
                }} />
            ),
        });
    }, [boardId]);

    // Per-board selectors (memoized to avoid recreating on every render)
    const selectViews = useMemo(() => selectViewsForBoard(boardId ?? 0), [boardId]);
    const selectActiveId = useMemo(() => selectActiveViewIdForBoard(boardId ?? 0), [boardId]);
    const selectActiveViewMemo = useMemo(() => makeSelectActiveView(boardId ?? 0), [boardId]);
    const selectGroups = useMemo(() => selectGroupsForBoard(boardId ?? 0), [boardId]);
    const selectColumns = useMemo(() => selectColumnsForBoard(boardId ?? 0), [boardId]);
    const selectItems = useMemo(() => selectItemsForBoard(boardId ?? 0), [boardId]);

    const boardViews = useAppSelector(selectViews);
    const activeViewId = useAppSelector(selectActiveId);
    const activeView = useAppSelector(selectActiveViewMemo);
    const viewsStatus = useAppSelector(selectBoardViewStatus);
    const groups = useAppSelector(selectGroups);
    const columns = useAppSelector(selectColumns);
    const allItems = useAppSelector(selectItems);

    // State
    const [collapsedGroupIds, setCollapsedGroupIds] = useState<Set<number>>(new Set());
    const [ganttZoomIndex, setGanttZoomIndex] = useState<number>(DEFAULT_ZOOM_INDEX);

    // --- DND STATE ---
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeDragType, setActiveDragType] = useState<'GROUP' | 'ITEM' | 'COLUMN' | null>(null);
    const [activeDragData, setActiveDragData] = useState<any>(null);
    const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);
    const [projectedDepth, setProjectedDepth] = useState(0);

    const isDraggingGroup = activeDragType === 'GROUP';

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor)
    );

    useEffect(() => {
        dispatch(fetchUsers());

        if (boardId) {
            dispatch(fetchViewsForBoard(boardId));
            dispatch(fetchGroupsForBoard(boardId));
            dispatch(fetchColumnsForBoard(boardId));
            dispatch(fetchItemsForBoard(boardId));
        } else {
            if (boardId !== undefined) dispatch(clearBoardViews(boardId));
        }
    }, [boardId, dispatch]);

    // --- HANDLERS ---
    const handleCreateView = (type: 'table' | 'gantt') => {
        if (!boardId) return;
        const defaultName = type === 'table' ? 'Tablo Görünümü' : 'Gantt Görünümü';
        dispatch(createBoardView({ boardId, payload: { name: defaultName, type } }));
    };

    const handleCreateGroupAtBottom = () => {
        if (boardId) {
            dispatch(createGroup({ boardId, groupData: { title: 'Yeni Grup', color: getRandomColor() }, position: 'bottom' }));
        }
    };

    const handleToggleGroup = (groupId: number) => {
        setCollapsedGroupIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(groupId)) newSet.delete(groupId);
            else newSet.add(groupId);
            return newSet;
        });
    };

    const customCollisionDetection: CollisionDetection = (args) => {
        const pointerCollisions = pointerWithin(args);
        if (pointerCollisions.length === 0) return closestCenter(args);
        return pointerCollisions;
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        setActiveDragType(active.data.current?.type);
        setActiveDragData(active.data.current);
        setDragOverItemId(null);
        setProjectedDepth(0);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over || active.data.current?.type !== 'ITEM') {
            setDragOverItemId(null);
            setProjectedDepth(0);
            return;
        }
        if (over.data.current?.type === 'ITEM') {
            const overId = Number(over.id.toString().replace('item-', ''));
            const activeIdNum = Number(active.id.toString().replace('item-', ''));
            if (overId === activeIdNum) return;
            setDragOverItemId(overId);
            const initialLeft = active.rect.current.initial?.left ?? 0;
            const currentLeft = active.rect.current.translated?.left ?? 0;
            const deltaX = currentLeft - initialLeft;
            setProjectedDepth(Math.max(0, Math.floor(deltaX / INDENT_STEP)));
        } else {
            setDragOverItemId(null);
            setProjectedDepth(0);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveDragType(null);
        setActiveDragData(null);
        setDragOverItemId(null);
        setProjectedDepth(0);

        if (!over || !boardId) return;

        // 1. GROUP REORDER
        if (active.data.current?.type === 'GROUP') {
            if (active.id !== over.id) {
                const oldIndex = groups.findIndex(g => `group-${g.id}` === active.id);
                const newIndex = groups.findIndex(g => `group-${g.id}` === over.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    const newGroups = arrayMove(groups, oldIndex, newIndex);
                    dispatch(reorderGroupsLocally({ boardId, orderedGroups: newGroups }));
                    dispatch(updateGroupOrder({ boardId, orderedGroupIds: newGroups.map(g => g.id) }));
                }
            }
            return;
        }

        // 2. COLUMN REORDER
        if (active.data.current?.type === 'COLUMN' && over.data.current?.type === 'COLUMN') {
            const activeColumnId = active.data.current.column.id;
            const overColumnId = over.data.current.column.id;
            if (activeColumnId !== overColumnId) {
                const oldIndex = columns.findIndex(c => c.id === activeColumnId);
                const newIndex = columns.findIndex(c => c.id === overColumnId);
                if (oldIndex !== -1 && newIndex !== -1) {
                    const newColumns = arrayMove(columns, oldIndex, newIndex);
                    dispatch(reorderColumnsLocally({ boardId, orderedColumns: newColumns }));
                    dispatch(updateColumnOrder({ boardId, orderedColumnIds: newColumns.map(c => c.id) }));
                }
            }
            return;
        }

        // 3. ITEM REORDER & HIERARCHY
        if (active.data.current?.type === 'ITEM') {
            const draggedItem = active.data.current.item as Item;
            const sourceGroupId = active.data.current.groupId as number;

            if (over.data.current?.type === 'CONTAINER') {
                const destGroupId = over.data.current.groupId as number;
                const destItems = allItems.filter(i => i.groupId === destGroupId);
                handleMoveItemLogic(draggedItem, sourceGroupId, destGroupId, destItems.length, null);
                return;
            }

            if (over.data.current?.type === 'ITEM') {
                const targetItem = over.data.current.item as Item;
                const destGroupId = over.data.current.groupId as number;
                const destItems = allItems.filter(i => i.groupId === destGroupId).sort((a, b) => a.order - b.order);
                const overIndex = destItems.findIndex(i => i.id === targetItem.id);
                if (overIndex === -1) return;

                const isBelowOverItem = over.rect.top + over.rect.height / 2 < active.rect.current.translated!.top;
                let newIndex = isBelowOverItem ? overIndex + 1 : overIndex;

                const initialLeft = active.rect.current.initial?.left ?? 0;
                const currentLeft = active.rect.current.translated?.left ?? 0;
                const deltaX = currentLeft - initialLeft;
                const isIndent = deltaX > INDENT_STEP;

                let finalParentId: number | null | undefined;
                if (isIndent) {
                    finalParentId = targetItem.id;
                } else {
                    finalParentId = targetItem.parentItemId ?? null;
                }

                if (finalParentId === draggedItem.id) return;
                handleMoveItemLogic(draggedItem, sourceGroupId, destGroupId, newIndex, finalParentId);
            }
        }
    };

    const handleMoveItemLogic = (
        draggedItem: Item,
        sourceGroupId: number,
        destGroupId: number,
        destinationIndex: number,
        parentItemId: number | null | undefined
    ) => {
        const moveArgs: MoveItemArgs = {
            boardId: boardId!,
            itemId: draggedItem.id,
            sourceGroupId,
            destinationGroupId: destGroupId,
            sourceIndex: 0,
            destinationIndex,
            parentItemId
        };

        dispatch(reorderItems(moveArgs));
        dispatch(moveItem(moveArgs))
            .unwrap()
            .then(() => {
                dispatch(fetchItemTree({ boardId: boardId!, groupId: sourceGroupId }));
                if (sourceGroupId !== destGroupId) {
                    dispatch(fetchItemTree({ boardId: boardId!, groupId: destGroupId }));
                }
            })
            .catch(() => {
                dispatch(fetchItemsForBoard(boardId!));
            });
    };

    const isGanttView = activeView?.type?.toUpperCase() === '1';

    return (
        <div className={`flex flex-col ${isGanttView ? 'h-full' : ''}`}>
            <div className="sticky top-0 z-30 bg-white">
                <div className="px-6 pb-2"><BoardHeader boardId={boardId} /></div>
                <div className="px-6">
                    <BoardViewTabs
                        views={boardViews.map(v => ({ id: v.id, name: v.name, type: v.type.toLowerCase() as any }))}
                        activeViewId={activeViewId}
                        onViewChange={(id) => dispatch(setActiveViewId({ boardId: boardId!, viewId: id as number }))}
                        onAddViewTypeSelected={handleCreateView}
                        onDeleteView={(id) => dispatch(deleteBoardView({ boardId: boardId!, viewId: id }))}
                        onRenameView={(id, name) => dispatch(updateBoardView({ boardId: boardId!, viewId: id, payload: { name } }))}
                    />
                </div>
                {!isGanttView && (
                    <>
                        <div className="h-px bg-gray-200 mx-6"></div>
                        <div className="px-6 py-3"><BoardActionbar selectedBoardId={boardId} /></div>
                    </>
                )}
            </div>

            {viewsStatus === 'succeeded' && (
                <div className={isGanttView ? 'flex-1 overflow-hidden' : 'bg-white p-4 min-h-[calc(100vh-200px)]'}>
                    {isGanttView ? (
                        <GanttView
                            boardId={boardId || 0}
                            viewId={activeView!.id}
                            settingsJson={activeView!.settingsJson}
                            zoomIndex={ganttZoomIndex}
                            onZoomIndexChange={setGanttZoomIndex}
                        />
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={customCollisionDetection}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={groups.map(g => `group-${g.id}`)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-6">
                                    {groups.map((group) => (
                                        <GroupSection
                                            key={group.id}
                                            group={group}
                                            isCollapsed={activeDragType === 'GROUP' ? true : collapsedGroupIds.has(group.id)}
                                            onToggleCollapse={() => handleToggleGroup(group.id)}
                                            selectedBoardId={boardId}
                                            dragOverItemId={dragOverItemId}
                                            projectedDepth={dragOverItemId && activeDragType === 'ITEM' ? projectedDepth : 0}
                                        />
                                    ))}
                                </div>
                            </SortableContext>

                            <button onClick={handleCreateGroupAtBottom} className="mt-8 ml-1 flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors shadow-sm">
                                <FiPlus /> Yeni Grup Ekle
                            </button>

                            <DragOverlay dropAnimation={dropAnimation}>
                                {activeId ? (
                                    activeDragType === 'GROUP' ? (
                                        <div className="opacity-90 rotate-2 cursor-grabbing">
                                            <GroupSection selectedBoardId={boardId} group={activeDragData.group} isCollapsed={true} onToggleCollapse={() => { }} isOverlay={true} dragOverItemId={null} projectedDepth={0} />
                                        </div>
                                    ) : activeDragType === 'ITEM' ? (
                                        <div className="opacity-95 cursor-grabbing bg-white shadow-2xl rounded-md border border-blue-500 overflow-hidden">
                                            <ItemRow
                                                item={activeDragData.item}
                                                color="#ccc"
                                                columns={columns}
                                                gridTemplateColumns={`60px minmax(200px, 1fr) ${columns.map(() => '150px').join(' ')} 60px`}
                                                boardId={boardId || 0}
                                                isOverlay={true}
                                            />
                                        </div>
                                    ) : activeDragType === 'COLUMN' ? (
                                        <div className="bg-gray-800 text-white p-2 rounded shadow-xl text-xs uppercase font-bold w-[150px] h-10 flex items-center justify-center">
                                            {activeDragData.column.title}
                                        </div>
                                    ) : null
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardView;
