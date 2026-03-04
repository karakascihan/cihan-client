import React, { useState, useEffect } from 'react';
import {
    FiFilter, FiCalendar, FiChevronDown, FiPlus,
    FiMinus, FiSettings, FiAnchor
} from 'react-icons/fi';
import { format, isValid } from 'date-fns';

export type ViewModeOption = 'day' | 'week' | 'month' | 'quarter' | 'year';

interface GanttToolbarProps {
    // Gantt Kontrolleri
    scrollToDate: (date: Date) => void;
    currentLevel: ViewModeOption;
    onViewModeChange: (mode: ViewModeOption) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    zoomIndex: number;
    maxZoomIndex: number;
    onSettingsClick: () => void;
    isSettingsOpen: boolean;
    onAutoFit: () => void;
    // Baz Tarih (opsiyonel — GanttBaselineModal içindeki toolbar'ı etkilemez)
    projectStartDate?: Date | null;
    onBaseDateChange?: (date: Date) => void;
}

const VIEW_MODE_LABELS: Record<ViewModeOption, string> = {
    day: 'Gün',
    week: 'Hafta',
    month: 'Ay',
    quarter: 'Çeyrek',
    year: 'Yıl',
};

const GanttToolbar: React.FC<GanttToolbarProps> = ({
    scrollToDate,
    currentLevel,
    onViewModeChange,
    onZoomIn,
    onZoomOut,
    zoomIndex,
    maxZoomIndex,
    onSettingsClick,
    isSettingsOpen,
    onAutoFit,
    projectStartDate,
    onBaseDateChange,
}) => {
    const buttonBase = "flex items-center gap-x-2 px-3 py-1.5 text-sm rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50";
    const iconButtonBase = "p-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50";

    // Baz tarih için yerel state
    const [localBaseDate, setLocalBaseDate] = useState<string>('');

    // projectStartDate dışarıdan değiştiğinde senkronize et
    useEffect(() => {
        if (projectStartDate && isValid(projectStartDate)) {
            setLocalBaseDate(format(projectStartDate, 'yyyy-MM-dd'));
        }
    }, [projectStartDate]);

    const handleApplyBaseDate = () => {
        if (!localBaseDate || !onBaseDateChange) return;
        // Tarayıcı timezone sorununu önlemek için T00:00:00 ekle
        const date = new Date(localBaseDate + 'T00:00:00');
        if (isValid(date)) onBaseDateChange(date);
    };

    const handleTodayClick = () => scrollToDate(new Date());
    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onViewModeChange(event.target.value as ViewModeOption);
    };

    const isZoomInDisabled = zoomIndex >= maxZoomIndex;
    const isZoomOutDisabled = zoomIndex <= 0;

    return (
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white gap-x-2 flex-wrap">

            {/* Sol Taraf */}
            <div className="flex items-center gap-x-2">
                <h1 className="text-xl font-semibold text-gray-900">Gantt</h1>
                <button className={iconButtonBase} title="Gelişmiş Filtre">
                    <FiFilter className="w-5 h-5" />
                </button>
            </div>

            {/* Sağ Taraf: Araçlar */}
            <div className="flex items-center gap-x-2 flex-wrap">

                {/* Baz Tarih Kontrolü — sadece prop verilmişse göster */}
                {onBaseDateChange !== undefined && (
                    <>
                        <div
                            className="flex items-center gap-x-1.5 px-2.5 py-1 rounded-md border border-gray-200 bg-gray-50 text-sm"
                            title="Baz tarihi değiştirerek tüm görev tarihlerini kaydırabilirsiniz"
                        >
                            <FiAnchor className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                            <span className="text-xs text-gray-500 whitespace-nowrap font-medium">Baz Tarih</span>
                            <input
                                type="date"
                                value={localBaseDate}
                                onChange={(e) => setLocalBaseDate(e.target.value)}
                                className="text-xs border-0 bg-transparent text-gray-700 focus:outline-none focus:ring-0 w-[116px] cursor-pointer"
                            />
                            <button
                                type="button"
                                onClick={handleApplyBaseDate}
                                disabled={!localBaseDate}
                                className="px-2 py-0.5 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                            >
                                Uygula
                            </button>
                        </div>
                        <div className="w-px h-6 bg-gray-200" />
                    </>
                )}

                <button type="button" className={buttonBase} onClick={handleTodayClick}>
                    <FiCalendar className="w-4 h-4" />
                    <span>Bugün</span>
                </button>

                <button type="button" className={buttonBase} onClick={onAutoFit}>
                    <span>Otomatik Sığdırma</span>
                </button>

                <div className="w-px h-6 bg-gray-300" />

                {/* Preset Dropdown */}
                <div className="relative">
                    <select
                        onChange={handlePresetChange}
                        value={currentLevel}
                        className={`${buttonBase} appearance-none pr-8 bg-gray-100`}
                        title="Görünüm Seç"
                    >
                        {(Object.keys(VIEW_MODE_LABELS) as ViewModeOption[]).map(mode => (
                            <option key={mode} value={mode}>
                                {VIEW_MODE_LABELS[mode]}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Zoom Butonları */}
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        type="button"
                        onClick={onZoomOut}
                        disabled={isZoomOutDisabled}
                        className={`${iconButtonBase} rounded-r-none border-r border-gray-300 disabled:cursor-not-allowed`}
                        title="Uzaklaştır"
                    >
                        <FiMinus className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={onZoomIn}
                        disabled={isZoomInDisabled}
                        className={`${iconButtonBase} rounded-l-none disabled:cursor-not-allowed`}
                        title="Yakınlaştır"
                    >
                        <FiPlus className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={onSettingsClick}
                    className={`${iconButtonBase} ${isSettingsOpen ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    title="Widget Ayarları"
                >
                    <FiSettings className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default GanttToolbar;
