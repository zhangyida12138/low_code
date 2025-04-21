import React from "react";
import styles from "./index.less";
import classNames from "classnames";
import { useCanvasByContext } from "../../../store/hooks";
import { deepClone } from "../../../utils";

function ContextMenu({ style,cmp,index,setMenuShow}) {
  const canvas=useCanvasByContext();

  //复制一个元素，记得使用深拷贝。
  const copy=(e)=>{
    e.preventDefault();
    let newCmp=deepClone(cmp);
    newCmp.style.left+=20;
    newCmp.style.top+=20;
    canvas.addCmp(newCmp);
  }

  //使用index删除元素
  const delCmp=(e)=>{
    e.preventDefault();
    canvas.deleteCmp(index);
  }

  return (
    <div onClick={(e)=>{
      e.stopPropagation();
      setMenuShow();
      
    }}>
      <ul className={classNames(styles.main)} style={style}>
        <li className={styles.item} onClick={copy}>
          复制
        </li>
        <li className={styles.item} onClick={delCmp}>
          删除
        </li>
        <li className={styles.item} onClick={() => {}}>
          上移一层
        </li>
        <li className={styles.item} onClick={() => {}}>
          下移一层
        </li>
        <li className={styles.item} onClick={() => {}}>
          置顶
        </li>
        <li className={styles.item} onClick={() => {}}>
          置底
        </li>
      </ul>
    </div>
  );
}

export default ContextMenu;
