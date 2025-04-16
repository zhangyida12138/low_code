import React, { useCallback, useEffect } from "react";
import styles from "./index.less";
import { useCanvasByContext, useCanvasData } from "../../store/hooks";
import Cmp from "../../components/CmpFn";
function Center() {
  const canvas = useCanvasByContext();

  const canvasData = useCanvasData(); //自定义的钩子函数，从context中获取数据，并提取出来。
  const { cmps } = canvasData;

  const onDrop = useCallback((e) => {
    //获取放下的位置
    const endX = e.pageX;
    const endY = e.pageY;

    //接受数据
    const start = e.dataTransfer.getData("Text").split(",");

    //获取移动距离
    const disX = endX - start[0];
    const disY = endY - start[1];

    const selectedCmp = canvas.getSelectedCmp(); //获取选中组件
    // if (!selectedCmp) return;

    const oldStyle = selectedCmp.style; //计算出组件后面的位置

    const top = oldStyle.top + disY;
    const left = oldStyle.left + disX;

    canvas.updateSelectedCmp({ top, left }); //更新组件的位置
  }, []); //缓存函数

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  const selectedId = canvas.getSelectedCmpIndex();

 //实现点击其他位置，取消选中
  //这里有bug，由于canvas是上下文，一旦修改里面index，就会重新渲染然后useEffect就会重新执行。

  return (
    <div
      id="center"
      className={styles.main}
      onClick={(e) => {
        console.log("center");
        canvas.setSelectedCmpIndex(-1);
      }}
    >
      {/* onDrop事件是用来监听松手位置，但是松手的时候，内容会被放在其他组件上，这默认是禁止的，所以需要用到onDrageOver来阻止默认事件。 */}
      <div
        className={styles.canvas}
        style={{
          ...canvasData.style,
          backgroundImage: `url(${canvasData.style.backgroundImage})`,
        }} //图片属性得单独处理加上url
        onDrop={onDrop}
        onDragOver={allowDrop}
      >
        {cmps.map((cmp, index) => (
          // 遍历所有cmp组件并渲染。
          <Cmp
            key={cmp.key}
            cmp={cmp}
            selected={selectedId === index}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Center;
