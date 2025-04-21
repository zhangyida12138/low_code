import React from 'react'
import styles from './index.less';
import classNames from 'classnames';

function ContextMenu({style}) {
    
  return (
    <div>
      <ul className={classNames(styles.main)} style={style}>
        <li className={styles.item}>复制</li>
        <li className={styles.item}>删除</li>
        <li className={styles.item}>上移一层</li>
        <li className={styles.item}>下移一层</li>
        <li className={styles.item}>置顶</li>
        <li className={styles.item}>置底</li>
      </ul>
    </div>
  )
}

export default ContextMenu
