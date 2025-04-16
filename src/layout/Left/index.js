import React, { useEffect, useState } from 'react'
import styles from'./index.less';
import TextSide from '../../components/TextSide'
import ImgSide from '../../components/ImgSide';
import classNames from 'classnames';

export const isTextComponent=1;
export const isImgComponent=2;//用于区分选中了什么组件

function Left() {
  const [showSide,setShowSide]=useState(0);//用于控制显示什么组件

  function _setShowSide(witch){
    if(showSide===witch){
      setShowSide(0);//如果点击是选中的，就关闭。
    }else{
      setShowSide(witch);
    }
  }

  useEffect(()=>{
    document.getElementById('center').addEventListener('click',()=>{
      setShowSide(0)
    })
  },[])//监听，实现点击其他位置，弹出框消失

  return (
    <div className={styles.main}> 
      <ul className={styles.cmps}>
        <li className={classNames(styles.cmp,showSide===isTextComponent&&styles.selected)} onClick={()=>_setShowSide(isTextComponent)}>
          <span>文本</span>
        </li>
        <li className={classNames(styles.cmp,showSide===isImgComponent&&styles.selected)} onClick={()=>_setShowSide(isImgComponent)}>
          <span>图片</span>
        </li>
      </ul>
      {showSide===1&&<TextSide/>}
      {showSide===2&&<ImgSide/>}
    </div>
  )
}

export default Left
