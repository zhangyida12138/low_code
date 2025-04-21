import React, { useState } from "react";
import styles from "./index.less";
import classNames from "classnames";
import { useCanvasByContext } from "../../store/hooks";
import { isImgComponent } from "../../layout/Left";
import { isTextComponent } from "../../layout/Left";
import Img from "../Img";
import Text from "../Text";
import ContextMenu from "./ContextMenu";


//Todo 拖拽，删除，改变层级关系等
function Cmp({ cmp, selected, index, zoom }) {
  const { style, value } = cmp; //从每个cmp中解构出style和内容。
  const canvas = useCanvasByContext();
  const { height, width } = style;
  const transform = `rotate(${style.transform}deg)`; //rotate(0deg)格式
  const [menuShow, setMenuShow] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault(); //防止默认右键的菜单栏
    e.stopPropagation();
    setMenuShow(true);

  };
  // 监听移动的位置
  const onMouseDownCmp = (e) => {
    //拖拽前先设置为选中
    e.preventDefault();
    canvas.setSelectedCmpIndex(index);
    //拖拽的开始位置

    let startX = e.pageX;
    let startY = e.pageY;

    //拖拽移动
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      //根据zoom修正disX和disY.
      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      let top = cmp.style.top + disY;
      let left = cmp.style.left + disX;

      //组件只能在画布内移动，但是现在旋转的角可以越界
      if (top < 0) {
        top = 0;
      }

      if (top > canvas.canvas.style.height - height) {
        top = canvas.canvas.style.height - height;
      }
      if (left < 0) {
        left = 0;
      }
      if (left > canvas.canvas.style.width - width) {
        left = canvas.canvas.style.width - width;
      }

      canvas.updateSelectedCmp({ top, left });

      startX = x;
      startY = y;
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      canvas.recordCanvasChangeHistory();
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const setSelected = (e) => {
    e.stopPropagation();
    /**即使你在子组件的 onClick 合成事件中调用了 e.stopPropagation()，也只能阻止 React 合成事件的冒泡，不能阻止原生 DOM 事件冒泡，所以父组件通过 addEventListener 监听的原生事件仍然会触发。 */
    // e.nativeEvent.stopImmediatePropagation()
    canvas.setSelectedCmpIndex(index);
    // if (canvas.getSelectedCmpIndex() === index) {
    //   canvas.setSelectedCmpIndex(-1);
    // } else {
    //   canvas.setSelectedCmpIndex(index);
    // }//由于拖动的时候也会触发Click事件，所以不能点两次取消
  }; //点击该组件后以后设置为选中

  //监听变形，拖拽变形
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

      //这里可以判断x,y是否超出canvas范围，但是如果只在这里判断的话，可能拖动下面的点向上移动时越界（有min-height）

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom); //拉伸也要根据缩放比例进行拉伸

      const newStyle = {};

      //检测是向哪里拖拽，向上向左拖拽顶点会变，这里设置绝对定位的偏移
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

      //设置最小宽度和高度。当顶点只能从x轴或者y轴改变size的话可以这样
      // if (cmp.style.width + disX <= 20) {
      //   return ;
      // }

      // if (cmp.style.height + disY <= 20) {
      //   return ;
      // }

      //计算组件最新的宽高
      const newHeight = cmp.style.height + disY;
      Object.assign(newStyle, {
        width: cmp.style.width + disX,
        height: newHeight,
      }); //设置组件高度

      if(newStyle.width<20){
        newStyle.width=20;
        delete newStyle.left;//如果宽度变小的，不应该改变left偏移
      }
      if(newStyle.height<20){
        newStyle.height=20;
        delete newStyle.top;//如果高度变小的，不应该改变top偏移
      }

      if (cmp.style.fontSize) {
        //如果这是个文本组件，拖动的时候，文本的行高的字体大小也要跟着变化
        const n = newHeight / cmp.style.height; //计算变化了多少倍

        let newFontSize = n * cmp.style.fontSize;
        newFontSize =
          newFontSize < 12 ? 12 : newFontSize > 130 ? 130 : newFontSize; //避免字体太小或者太大。
        Object.assign(newStyle, {
          fontSize: newFontSize, //字体不能parseInt，否者慢慢拖动会被视为没变化
          lineHeight: newHeight + "px",
        });
      }
      canvas.updateSelectedCmp(newStyle);

      startX = x;
      startY = y;
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      canvas.recordCanvasChangeHistory();
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const trans = parseFloat(style.transform);

    const r = height / 2;
    //转换为弧度，js的三角函数都是使用弧度，因为旋转点在上方，所以需要加90度。
    const ang = ((trans + 90) * Math.PI) / 180;

    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r]; //计算出从旋转控制点，退回中心点的偏移向量
    //即使组件呗旋转过，也可以获取中心点的坐标。
    let startX = e.pageX + offsetX;
    let startY = e.pageY + offsetY;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      //计算偏移量
      let disX = x - startX;
      let disY = y - startY;

      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;
      deg = parseInt(deg);

      canvas.updateSelectedCmp({ transform: deg });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    // startX=x;
    // startY=y;
  };

  return (
    // 类组件中的方法要使用this访问。
    <div
      className={styles.main}
      draggable={true}
      onMouseDown={onMouseDownCmp}
      onClick={(e) => {
        setSelected(e);
        setMenuShow(false); //关闭显示菜单栏
      }}
      onContextMenu={handleContextMenu}
    >
      {/* 组件本身 */}
      <div
        className={classNames(
          styles.cmp,
          selected ? styles.selected : styles.unselected
        )}
        style={{ ...style, transform }}
      >
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
          style={{ top: -6, left: -6, transform: `scale(${100 / zoom})` }}
          data-direction="top, left"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: -6,
            left: width / 2 - 5,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="top"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: -6,
            left: width - 4,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="top right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height / 2 - 5,
            left: width - 4,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 4,
            left: width - 4,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="bottom right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 4,
            left: width / 2 - 5,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="bottom"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 4,
            left: -6,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="bottom left"
        />
        <li
          className={styles.stretchDot}
          style={{
            top: height / 2 - 5,
            left: -6,
            transform: `scale(${100 / zoom})`,
          }}
          data-direction="left"
        />
        <li
          className={classNames(styles.rotate, "iconfont icon-xuanzhuan")}
          style={{
            top: height + 10,
            left: width / 2 - 12,
            transform: `scale(${100 / zoom})`,
          }}
          onMouseDown={(e) => {
            rotate(e);
          }}
        />
      </ul>
      {/* 右键显示菜单栏,组件被选中的情况下才会出现 */}
      {selected && menuShow && (
        <ContextMenu
          style={{
            top: style.top,
            left: style.left + width / 2,
            transform: `scale(${100 / zoom})`,
          }}
          cmp={cmp}
          index={index}
          setMenuShow={()=>{setMenuShow(false)}}//传入一个回调，让子组件清空状态
        />
      )}
    </div>
  );
}

function setCmp(cmp) {
  const { key, ...safeProps } = cmp;
  switch (cmp.type) {
    case isImgComponent:
      return <Img {...safeProps} />;
    case isTextComponent:
      return <Text {...safeProps} />;
    default:
      break;
  }
}

export default Cmp;
