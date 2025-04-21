import React, { useEffect, useState } from 'react'
import styles from'./index.less';
import TextSide from '../../components/LeftSide/TextSide'
import ImgSide from '../../components/LeftSide/ImgSide';
import TplSide from '../../components/LeftSide/TplSide'
import GraphSide from '../../components/LeftSide/GraphSide';
import classNames from 'classnames';

export const isTextComponent=1;
export const isImgComponent=2;//用于区分选中了什么组件
export const isTplSide=3;
export const isGraphSide=4;

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
    document.getElementById('right').addEventListener('click',()=>{
      setShowSide(0)
    })
  },[])//监听，实现点击其他位置，弹出框消失

  return (
    <div id='left' className={styles.main}> 
      <ul className={styles.cmps}>
      <li className={classNames(styles.cmp,showSide===isTplSide&&styles.selected)} onClick={()=>_setShowSide(isTplSide)}>
          <span>模版</span>
        </li>
        <li className={classNames(styles.cmp,showSide===isTextComponent&&styles.selected)} onClick={()=>_setShowSide(isTextComponent)}>
          <span>文本</span>
        </li>
        <li className={classNames(styles.cmp,showSide===isImgComponent&&styles.selected)} onClick={()=>_setShowSide(isImgComponent)}>
          <span>图片</span>
        </li>
        <li className={classNames(styles.cmp,showSide===isGraphSide&&styles.selected)} onClick={()=>_setShowSide(isGraphSide)}>
          <span>形状</span>
        </li>
      </ul>
      {showSide===1&&<TextSide/>}
      {showSide===2&&<ImgSide/>}
      {showSide===3&&<TplSide/>}
      {showSide===4&&<GraphSide/>}
    </div>
  )
}

export default Left
