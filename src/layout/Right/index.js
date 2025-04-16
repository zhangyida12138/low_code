import React from 'react'
import styles from'./index.less';
import { useCanvasByContext } from '../../store/hooks';
import EditCmp from '../../components/EditCmp';
import EditCanvas from '../../components/EditCanvas'
function Right() {
  const canvas=useCanvasByContext();
  const selectedCmp=canvas.getSelectedCmp();
  return (
    <div className={styles.main}>
      {selectedCmp?<EditCmp/>:<EditCanvas/>}
    </div>
  )
}

export default Right
