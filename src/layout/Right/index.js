import React, {  useState } from 'react'
import styles from'./index.less';
import { useCanvasByContext } from '../../store/hooks';
import EditCmp from '../../components/EditCmp';
import EditCanvas from '../../components/EditCanvas'
function Right() {
  const canvas=useCanvasByContext();
  const selectedCmp=canvas.getSelectedCmp();
  const [show,setShow]=useState(true);
  return (
    <div className={styles.main} id='right'>
      <div 
      className={styles.switch}
      onClick={()=>{
        setShow(!show);
      }}>
        {show?'隐藏编辑区域':'显示编辑区域'}

      </div>
      {show&&(selectedCmp?<EditCmp/>:<EditCanvas/>)}
    </div>
  )
}

export default Right
