import { useEffect, useRef, useState } from 'react';
import './SensorModal.css'

import FirstView from './components/FirstView';
import HistoryDataView from './components/HistoryDataView';


export default function SensorModal({sensor,closeModal}) { 
  const [isHistoryDataModalOpen, setIsHistoryDataModalOpen] = useState(false);
  const modalContainerRef = useRef(null);

  useEffect(() => {
    modalContainerRef.current.style.width = isHistoryDataModalOpen? "1000px":"350px";
  }, [modalContainerRef,isHistoryDataModalOpen]);
  
  return (
      <div ref={modalContainerRef} className={`z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 transition-all duration-1000 rounded-lg px-10 cursor-default`}>
        <div className='flex justify-between relative h-full'>          
        <HistoryDataView sensor={sensor} isOpen={isHistoryDataModalOpen} />
        <FirstView sensor={sensor} closeModal={closeModal} setIsHistoryDataModalOpen={setIsHistoryDataModalOpen} />  
</div>
</div>
  )
}
