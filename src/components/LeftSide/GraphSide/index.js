import React from "react";
import styles from "../index.less";
import { defaultCommonStyle } from "../../../utils/const";
import { useCanvasByContext } from "../../../store/hooks";
import { isGraphSide } from "../../../layout/Left";

const defaultStyle = {
  ...defaultCommonStyle,
  backgroundColor: "blue",
};

const settings = [
  {
    value: "空心矩形",
    style: {
      ...defaultStyle,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "blue",
    },
  },
  {
    value: "实心矩形",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "blue",
      borderColor: "blue",
    },
  },
  {
    value: "空心圆形",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
      borderRadius: "50%",
      borderColor: "blue",
    },
  },
  {
    value: "实心圆形",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "blue",
      borderRadius: "50%",
      borderColor: "blue",
    },
  },
  {
    value: "直角三角形",
    style: {
      ...defaultStyle,
      backgroundColor: "blue",
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)", // 左下为直角
    },
  },
  {
    value: "等边三角形",
    style: {
      ...defaultStyle,
      backgroundColor: "blue",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // 顶点在上
    },
  },
];

function GraphSide() {
  const canvas = useCanvasByContext();
  const addCmp = (cmp) => {
    canvas.addCmp(cmp);
  };
  //只是用于记录拖拽了那些属性，哪些值。
  //只有放手了才生成组件，在画布上添加onDrop事件。
  const onDragStart = (e, _cmp) => {
    
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp)); //事件通信
    //由于三角形是通过clipPath实现的，显示拖动还是矩形
    // console.log(_cmp);
    
    // // 创建一个影子图像元素
    // const ghost = document.createElement("div");
    // ghost.style.position = "absolute";
    // ghost.style.width = "80px";
    // ghost.style.height = "80px";
    // ghost.style.borderColor= _cmp.style.borderColor;
    // ghost.style.borderRadius= _cmp.style.borderRadius;
    // ghost.style.borderStyle= _cmp.style.borderStyle;
    // ghost.style.backgroundColor = _cmp.style.backgroundColor;
    // ghost.style.clipPath = _cmp.style.clipPath;//不支持
    // console.log(ghost);
    // document.body.appendChild(ghost);
    
    // // 设置为拖动的影像
    // e.dataTransfer.setDragImage(ghost, 40, 40);
    // setTimeout(() => document.body.removeChild(ghost), 0);
    // // 稍后移除
    // // setTimeout(() => document.body.removeChild(ghost), 0);
  };

  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            draggable="true"
            key={item.value}
            className={styles.item}
            onClick={() => addCmp({ ...item, type: isGraphSide })}
            onDragStart={(e) => {
              onDragStart(e, { ...item, type: isGraphSide });
            }}
            style={{
              backgroundColor: item.style.backgroundColor,
              border: item.style.border,
              borderColor: item.style.borderColor,
              borderRadius: item.style.borderRadius,
              clipPath: item.style.clipPath,
            }}//三角形的拽动拖影显示不了，必须要自己设置。
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default GraphSide;
