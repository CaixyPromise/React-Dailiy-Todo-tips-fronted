import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { modalActions } from "@/store/modules/Modal/Modal.store";
const BtnAddTask: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();

  const onOpenModal = () => {
    dispatch(modalActions.openModalCreateTask());
  };
  return (
    <>
      <button className={`btn  ${className}`} onClick={onOpenModal} title="添加新的任务!! 开启斗志满满的一天!!">
        添加任务
      </button>
    </>
  );
};

export default BtnAddTask;
