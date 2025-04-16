import React, { useCallback, useState } from "react";
import styles from "./index.less";
import { useCanvasByContext, useCanvasData } from "../../store/hooks";
import Cmp from "../../components/CmpFn";
import classNames from "classnames";
function Center() {
  const canvas = useCanvasByContext();

  const canvasData = useCanvasData(); //自定义的钩子函数，从context中获取数据，并提取出来。
  const { cmps } = canvasData;

  // 定义缩放比例
  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width) > 800 ? 50 : 100
  ); //初始化缩放比例

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
  //使用useEffect的话有bug，由于canvas是上下文，一旦修改里面index，就会重新渲染然后useEffect就会重新执行。
  //原生dom事件执行完才会执行合成事件，影响效果。

  const whichKeyEvent = (e) => {
    //阻止默认事件导致按下，页面滚动条
    e.stopPropagation();

    const selectedCmp = canvas.getSelectedCmp();
    //如果没有组件被选中，就不触发行为。
    if (!selectedCmp) {
      return;
    }

    //不是上下左右四个键就不做反应
    if (e.keyCode < 37 || e.keyCode > 40) {
      return;
    }
    
    e.preventDefault();//确定了是上下左右键才阻止默认事件。
    const { top, left } = selectedCmp.style;
    const newStyle = { top: top, left: left };

    switch (e.keyCode) {
      //左
      case 37:
        newStyle.left -= 1;
        break;
      //上
      case 38:
        newStyle.top -= 1;
        break;
      //右
      case 39:
        newStyle.left += 1;
        break;
      //下
      case 40:
        newStyle.top += 1;
        break;
      default:
        break;
    }
    canvas.updateSelectedCmp(newStyle);
  };

  return (
    <div
      id="center"
      className={styles.main}
      onClick={(e) => {
        canvas.setSelectedCmpIndex(-1);
      }}
      // tabIndex可以让非表单元素可以被聚焦，接收键盘事件。数字界定在页面上前进的顺序tab顺序
      tabIndex="0"
      onKeyDown={(e) => {
        whichKeyEvent(e);
      }}
    >
      {/* onDrop事件是用来监听松手位置，但是松手的时候，内容会被放在其他组件上，这默认是禁止的，所以需要用到onDrageOver来阻止默认事件。 */}
      <div
        className={styles.canvas}
        style={{
          ...canvasData.style,
          backgroundImage: `url(${canvasData.style.backgroundImage})`,
          transform: `scale(${zoom / 100})`,
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
      <ul className={styles.zoom}>
        <li
          className={classNames(styles.icon)}
          onClick={() => {
            const newZoom = zoom - 25 > 0 ? zoom - 25 : zoom;
            setZoom(newZoom);
          }}
        >
          -
        </li>

        <li className={styles.num}>
          <input
            type="num"
            value={zoom}
            onChange={(e) => {
              let newValue = e.target.value;
              newValue = newValue > 25 ? newValue : 25;
              setZoom(newValue - 0);
            }}
          />
          %
        </li>
        <li
          className={classNames(styles.icon)}
          onClick={(e) => {
            setZoom(zoom + 25);
          }}
        >
          +
        </li>
      </ul>
    </div>
  );
}

export default Center;
