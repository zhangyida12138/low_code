import React from 'react'
import styles from './index.less'
import {useCanvasByContext} from '../../store/hooks'
import InputColor from '../../lib/InputColor';
import Item from '../../lib/Item';
function EditCanvas() {
  const canvas=useCanvasByContext();
  const style= canvas.getCanvas().style;



  const handleStyleChange=(e,{name,value})=>{//用于修改属性的值
    canvas.updateCanvasStyle({[name]:value})
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>画布属性</div>
      <Item label='画布宽度(px):'>
        <input type='number' className={styles.itemRight} value={style.width} onChange={(e)=>{handleStyleChange(e,{name:'width',value:e.target.value-0})}}/>
        {/* 宽度-0就是转换成数字 */}
      </Item>

      <Item label='画布高度(px):'>
        <input type='number' className={styles.itemRight} value={style.height} onChange={(e)=>{handleStyleChange(e,{name:'height',value:e.target.value-0})}}/>
      </Item>

      <Item label='背景颜色:'>
        {/* 第三方库，用于显示颜色 */}
        <InputColor className={styles.itemRight} color={style.backgroundColor} onChangeComplete={(e)=>{handleStyleChange(e,{name:'backgroundColor',value:`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`})}}/>
      </Item>

      <Item label='背景图片:'>
      <input type='text' className={styles.itemRight} value={style.backgroundImage} onChange={(e)=>{handleStyleChange(e,{name:'backgroundImage',value:e.target.value})}}/>
      </Item>
    </div>
  )
}



export default EditCanvas
