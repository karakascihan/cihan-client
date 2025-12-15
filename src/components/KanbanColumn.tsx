import React from "react";
import KanbanCard from "./KanbanCard";
import { OpportunityDto, OpportunityStage } from "@/api/apiDtos";
import { FaCoins } from "react-icons/fa";

interface Props {
  title: string;
  stage: OpportunityStage;
  opportunities: OpportunityDto[];
  draggingCardId: number | null;
  dragOverColumn: OpportunityStage | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDrop: (id: number, newStatus: OpportunityStage) => void;
  onDoubleClick?: (opportunityDto:OpportunityDto) => void;
  onClick?: (opportunityDto:OpportunityDto) => void;
}

const KanbanColumn: React.FC<Props> = ({
  title,
  stage,
  opportunities,
  draggingCardId,
  dragOverColumn,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDrop,
  onDoubleClick,
  onClick
}) => {
  const handleDrop = (e: React.DragEvent) => {
    const id = e.dataTransfer.getData("id");
    onDrop(Number(id), stage);
  };

  const stageColors: Record<OpportunityStage, string> = {
  [OpportunityStage.New]: "bg-blue-500 border-gray-300 text-gray-800",
  [OpportunityStage.Qualification]: "bg-blue-300 border-blue-300 text-blue-800",
  [OpportunityStage.Negotiation]: "bg-purple-300 border-blue-300 text-blue-800",
  [OpportunityStage.Proposal]: "bg-yellow-300 border-yellow-300 text-yellow-800",
  [OpportunityStage.Won]: "bg-green-300 border-green-300 text-green-800",
  [OpportunityStage.Lost]: "bg-red-300 border-red-300 text-red-800",
  [OpportunityStage.Contract]: "bg-cyan-300 border-red-300 text-red-800",
};
 const grouped = opportunities.reduce<Record<string, number>>((acc, opp) => {
  if (!opp.currency || opp.value === undefined) return acc; // boş değerleri atla
  acc[opp.currency] = (acc[opp.currency] || 0) + opp.value;
  return acc;
}, {});
const groupedArray = Object.entries(grouped).map(([currency, totalValue]) => ({
  currency,
  totalValue,
}));
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragEnter={onDragEnter}
      className={`transition-all duration-200 ease-in-out border-r-1  shadow   border-gray-300  rounded  min-h-[calc(100vh-200px)] ${
        dragOverColumn === stage ? "ring-2 ring-blue-400 bg-blue-50" : ""
      }`}
    >
      <div className="relative flex flex-col justify-between bg-gradient-to-r from-gray-700 to-gray-800 text-white items-center rounded-t-lg shadow-md">
  {/* Başlık */}
  <h3 className="font-semibold text-lg mb-2 mt-2 tracking-wide">{title}</h3>

  {/* Alt kutu */}
  <div className="flex flex-row w-full px-4 py-2 items-center justify-between rounded-full mb-2 shadow-inner relative">
    {/* Toplam Değer + Coin */}
    <div className="flex items-center text-sm font-semibold">
      <div className="flex flex-col">
        {
          groupedArray.map(c=>(
            <span>{c.totalValue.toLocaleString("tr-TR", { style: "currency", currency: c.currency??"TRY" })} </span>
          ))
        }
        </div>
      <FaCoins className="ml-2 text-yellow-400" />
    </div>

    {/* Fırsat Sayısı */}
    <div className="flex items-center bg-gray-500 pl-2 rounded-full shadow-sm">
      <span className="mr-2 font-semibold">{opportunities.length}</span>
    </div>

    {/* Sağ ok ucu (alt kutuya bağlı) */}
  
  </div>
    <div className="absolute top-1/2 right-[-16px] transform -translate-y-1/2 
                    w-0 h-0 border-t-[16px] border-t-transparent 
                    border-b-[16px] border-b-transparent 
                    border-l-[16px] border-l-gray-600">
    </div>
</div>

      <div className={`h-6 ${stageColors[stage?? OpportunityStage.New]} mb-2`}></div>
      <div className="p-2">
      {opportunities.map((op) => (
        <KanbanCard
          key={op.opportunityStage}
          opportunity={op}
          isDragging={draggingCardId === op.id}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDoubleClick={()=>onDoubleClick&&onDoubleClick(op)}
                    onClick={()=>onClick&&onClick(op)}

        />
      ))}
      </div>

    </div>
  );
};

export default KanbanColumn;
