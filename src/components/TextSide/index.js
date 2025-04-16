import React from 'react'
import styles from './index.less'
import { useCanvasByContext } from '../../store/hooks';
import {isTextComponent} from '../../layout/Left'
import { defaultCommonStyle } from '../../utils/const';
const defaultStyle = {
  ...defaultCommonStyle,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
};

const settings = [
  {
    value: "标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "正文",
    style: defaultStyle,
  },
];

function TextSide() {
  const canvas=useCanvasByContext();
  const addCmp=(cmp)=>{
    canvas.addCmp(cmp);
    // console.log(canvas);
    
  }
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map(item=><li key={item.value} className={styles.item} onClick={()=>addCmp({...item,type:isTextComponent})}>{item.value}</li>)}
      </ul>
    </div>
  )
}

export default TextSide
