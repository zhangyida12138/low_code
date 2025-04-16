import React from "react";
import styles from "./index.less";
import classNames from "classnames";
import { useCanvasByContext } from "../../store/hooks";
import { isImgComponent } from "../../layout/Left";
import { isTextComponent } from "../../layout/Left";
import Img from "../Img";
import Text from "../Text";
//Todo 拖拽，删除，改变层级关系等
function Cmp({ cmp, selected, index }) {
  const { style, value } = cmp; //从每个cmp中解构出style和内容。
  const canvas = useCanvasByContext();
  const { height, width, } = style;
  const transform = `rotate(${style.transform}deg)`; //rotate(0deg)格式
  const onDragStart = (e) => {
    //拖拽前先设置为选中
    canvas.setSelectedCmpIndex(index);
    //拖拽的开始位置
    const startX = e.pageX;
    const startY = e.pageY;

    e.dataTransfer.setData("text", startX + "," + startY);
  };

  const setSelected = (e) => {
    e.stopPropagation();
    /**即使你在子组件的 onClick 合成事件中调用了 e.stopPropagation()，也只能阻止 React 合成事件的冒泡，不能阻止原生 DOM 事件冒泡，所以父组件通过 addEventListener 监听的原生事件仍然会触发。 */
    // e.nativeEvent.stopImmediatePropagation()

    if (canvas.getSelectedCmpIndex() === index) {
      canvas.setSelectedCmpIndex(-1);
    } else {
      canvas.setSelectedCmpIndex(index);
    }
  }; //点击该组件后以后设置为选中

  const onMouseDown = (e) => {
    const direction = e.target.dataset.direction;
    if (!direction) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    let startX = e.pageX;
    let startY = e.pageY;

    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      const newStyle = {};
      if (direction) {
        if (direction.indexOf("top") >= 0) {
          disY = 0 - disY;
          newStyle.top = cmp.style.top - disY;
        }

        if (direction.indexOf("left") >= 0) {
          disX = 0 - disX;
          newStyle.left = cmp.style.left - disX;
        }
      }
      const newHeight=cmp.style.height+disY;
      Object.assign(newStyle, {
        width: cmp.style.width + disX,
        height: newHeight,
      });//设置组件高度

      if(cmp.style.fontSize){
        //如果这是个文本组件，拖动的时候，文本的行高的字体大小也要跟着变化
        const n=newHeight/cmp.style.height;//计算变化了多少倍
        let newFontSize=n*cmp.style.fontSize;
        newFontSize=newFontSize<12 ?12:newFontSize>130?130:newFontSize;//避免字体太小或者太大。
        Object.assign(newStyle, {
          fontSize:newFontSize,
          lineHeight: newHeight+'px',
        });
      }
      canvas.updateSelectedCmp(newStyle);

      startX = x;
      startY = y;
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const trans=parseFloat(style.transform);

    const r=height/2;
    //转换为弧度，js的三角函数都是使用弧度，因为旋转点在上方，所以需要加90度。
    const ang=((trans+90)*Math.PI) /180;

    const [offsetX,offsetY]=[-Math.cos(ang)*r,-Math.sin(ang)*r];//计算出从旋转控制点，退回中心点的偏移向量
    //即使组件呗旋转过，也可以获取中心点的坐标。
    let startX=e.pageX+offsetX;
    let startY=e.pageY+offsetY;

    const move=(e)=>{
      let x=e.pageX;
      let y=e.pageY;

      //计算偏移量
      let disX=x-startX;
      let disY=y-startY;

      let deg=(360*Math.atan2(disY,disX))/(2*Math.PI)-90;
      deg=deg.toFixed(2);

      canvas.updateSelectedCmp({transform:deg});
    }

    const up=()=>{
      document.removeEventListener('mousemove',move);
      document.removeEventListener('mouseup',up);
    }

    document.addEventListener("mousemove",move);
    document.addEventListener('mouseup',up);
    // startX=x;
    // startY=y;
  };

  return (
    // 类组件中的方法要使用this访问。
    <div
      className={styles.main}
      draggable={true}
      onDragStart={onDragStart}
      onClick={(e) => {
        setSelected(e);
      }}
    >
      {/* 组件本身 */}
      <div className={styles.cmp} style={{ ...style, transform }}>
        {setCmp(cmp)}
      </div>
      {/* 组件的功能，选中的样式 */}
      <ul
        className={classNames(
          styles.editStyle,
          selected ? styles.selected : styles.unselected
        )}
        style={{
          width: style.width,
          height: style.height,
          top: style.top - 2,
          left: style.left - 2,
          transform,
        }}
        onMouseDown={onMouseDown}
      >
        <li
          className={styles.stretchDot}
          style={{ top: -8, left: -8 }}
          data-direction="top, left"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: -8,
            left: width / 2 - 8,
          }}
          data-direction="top"
        />

        <li
          className={styles.stretchDot}
          style={{ top: -8, left: width - 8 }}
          data-direction="top right"
        />

        <li
          className={styles.stretchDot}
          style={{ top: height / 2 - 8, left: width - 8 }}
          data-direction="right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: width - 8,
          }}
          data-direction="bottom right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: width / 2 - 8,
          }}
          data-direction="bottom"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: -8,
          }}
          data-direction="bottom left"
        />
        <li
          className={styles.stretchDot}
          style={{
            top: height / 2 - 8,
            left: -8,
          }}
          data-direction="left"
        />
        <li
          className={classNames(styles.rotate,'iconfont icon-xuanzhuan')}
          style={{
            top: height + 8,
            left: width/2-12,
          }}
          onMouseDown={(e) => {
            rotate(e);
          }}
        />
      </ul>
    </div>
  );
}

function setCmp(cmp) {
  switch (cmp.type) {
    case isImgComponent:
      return <Img {...cmp} />;
    case isTextComponent:
      return <Text {...cmp} />;
    default:
      break;
  }
}

export default Cmp;
