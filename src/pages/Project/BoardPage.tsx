import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { SmartTable, Column } from "@/components/SmartTable";
import { createPersonel, deletePersonel, fetchpersonels, updatePersonel } from "@/store/slices/personalSlice";
import { useModal } from "@/context/ModalContext";
import { GenericForm } from "@/components/GenericForm";
import { BoardDto, PersonelDto, PersonelDtoForInsertion } from "@/api/apiDtos";
import { FaArrowRight, FaGofore, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useConfirm } from "@/context/ConfirmContext";
import { deleteBoard, fetchBoards } from "@/store/features/boardSlice";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

export default function BoardPage(
) {
  const boards = useSelector<RootState, BoardDto[]>((x) => x.boards.items);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const navigate=useNavigate();
const confirm=useConfirm();
  useEffect(() => {
  dispatch(fetchBoards());
  }, [dispatch])
  
  const getColumns = (): Column<BoardDto>[] => {
    const sendData: Column<BoardDto>[] = [
      { accessor: "__index", header: "#" },

      {
        accessor: "name",
        header: "Proje Adı",
        filterable: true,
        sortable: true,
      },
      {
        accessor: "description",
        header: "Açıklama",
        filterable: true,
        sortable: true,
      },
        {
            header: "İşlemler",
            accessor: "id",
            body: (row: BoardDto) => (
              <div className="flex flex-row">
                 <button
                            onClick={() => {
                             navigate("/proje/"+row.id)
                            }}
                            className="
                                    inline-flex items-center 
                                    px-4 py-2 
                                    bg-yellow-500 hover:bg-yellow-600 
                                    text-white 
                                    rounded 
                                    mr-2
                                  "
                          >
                            <FiArrowUpRight   title="Projeye git" />
                          </button>
                <button
                  onClick={async () => {
                    const isConfirmed = await confirm({
                      title: "Silme işlemi",
                      message: "Projeyi silmek istediğinize emin misiniz?",
                      confirmText: "Evet",
                      cancelText: "Vazgeç",
                    });
                    if (isConfirmed) {
                      dispatch(deleteBoard({
                          boardId: row.id
                      }));
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
                >
                  <FaTrash title="Sil" />
                </button>
              </div>
            ),
          },
    ];
    
    return sendData;
  };
 
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Proje Takvimi</h2>
      <SmartTable
        data={boards ?? []}
        enablePagination={false}
       onDoubleClick={(row)=>  navigate("/proje/"+row.id)}
        scrollHeight={ "calc(100vh - 200px)"
        }
        // newRecordVoid={()=>navigate("/proje")}
        columns={getColumns()}
        rowIdAccessor={"id"}
      />
    </div>
  );
}
