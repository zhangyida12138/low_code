import React from 'react'
import styles from './index.less'
function Img({value}) {
  return (
    <div className={styles.main}>
      <img src={value} alt='' className={styles.img}/>
    </div>
  )
}

export default Img
