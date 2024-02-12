import React, { useEffect, useRef, useState } from 'react'
import FirstView from './components/FirstView';
import HistoryDataView from './components/HistoryDataView';

// TODO implement this component
export default function WindSensorModal({station,closeModal}) {
  const [isHistoryDataModalOpen, setIsHistoryDataModalOpen] = useState(false);
  const modalContainerRef = useRef(null);

  useEffect(() => {
    modalContainerRef.current.style.width = isHistoryDataModalOpen? "1000px":"350px";
  }, [modalContainerRef,isHistoryDataModalOpen]);

  return (
    
    <div ref={modalContainerRef} className={`z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 transition-all duration-1000 rounded-lg px-10 cursor-default`}>
    <div className='flex justify-between relative h-full'>          
    <HistoryDataView station={station} isOpen={isHistoryDataModalOpen} />
    <FirstView station={station} closeModal={closeModal} setIsHistoryDataModalOpen={setIsHistoryDataModalOpen} />  
</div>
</div>
  )
}
