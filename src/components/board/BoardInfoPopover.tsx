import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { FiEdit } from 'react-icons/fi';
import { useModal } from '@/context/ModalContext';
import EditBoardForm from './EditBoardForm';

const BoardInfoPopover: React.FC<{ boardId?: number }> = ({ boardId }) => {
    const selectedBoard = useAppSelector(state => state.boards.items.find(b => b.id === boardId));
    const { openModal } = useModal();
    if (!selectedBoard) return null;

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-title text-lg font-bold text-text-primary truncate">{selectedBoard.name}</h3>
                <div className="flex items-center">
                    <button onClick={() => {
                        openModal({
                            title: 'Proje Düzenleme Ekranı',
                            content: (close: (result: any) => void): React.ReactNode => (
                                <EditBoardForm board={selectedBoard} onClose={() => close(null)} />
                            )
                        });
                    }} className="p-2 text-text-secondary hover:bg-gray-100 rounded-md"><FiEdit /></button>
                </div>
            </div>

            {selectedBoard.description && (
                <p className="text-sm text-text-secondary">{selectedBoard.description}</p>
            )}

            <div className="border-b border-border-color-soft"></div>
        </div>
    );
};

export default BoardInfoPopover;
