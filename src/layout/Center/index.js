import React, { useCallback, useState } from "react";
import styles from "./index.less";
import { useCanvasByContext, useCanvasData } from "../../store/hooks";
import Cmp from "../../components/CmpFn";
import classNames from "classnames";
function Center() {
  const canvas = useCanvasByContext();

  const canvasData = useCanvasData(); //自定义的钩子函数，从context中获取数据，并提取出来。
  const { cmps,style } = canvasData;

  // 定义缩放比例
  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width) > 800 ? 50 : 100
  ); //初始化缩放比例

  const onDrop = useCallback((e) => {
    //获取放下的位置
    const endX = e.pageX;
    const endY = e.pageY;

    let cmp=e.dataTransfer.getData('drag-cmp');//获取拖拽得到的事件数据。

    if(!cmp) {//如果没有数据，就退出。
      return ;
    }
    
    cmp=JSON.parse(cmp);
    
    const DOMCanvasPos={//用于找到canvas左上角定点对于页面原点的位置
      top:'110',//header的50px+canvas的padding-top的50px,
      left:document.body.clientWidth/2-(style.width/2)*(zoom/100),//因为canvas是居中的，找到中点，减去一半的宽度，要考虑缩放的问题
    };

    const startX=DOMCanvasPos.left;
    const startY=DOMCanvasPos.top;
    
    // 假设拖拽的是中心点
    let disX=endX-startX;
    let disY=endY-startY;//计算出偏移量
    
    //根据缩放比例修正偏移量
    disX=disX*(100/zoom)-(cmp.style.width/2);
    disY=disY*(100/zoom)-(cmp.style.height/2);

    //要计算是否出了画布的范围,如果出了范围就设置为最大范围，因为拖拽的算是中心点
    if(disX>(style.width-cmp.style.width)){
      disX=style.width-cmp.style.width;
    }else if(disX<0){
      disX=0;
    }
    if(disY>(style.height-cmp.style.height)){
      disY=style.height-cmp.style.height;
    }else if(disY<0){
      disY=0;
    }

    
    //计算出最后的位置
    cmp.style.top=disY;
    cmp.style.left=disX;
    //更新
    canvas.addCmp(cmp);

  }, [zoom,style.width]); //缓存函数

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
        onDrop={onDrop}//松手添加组件
        onDragOver={allowDrop}
      >
        {cmps.map((cmp, index) => (
          // 遍历所有cmp组件并渲染。
          <Cmp
            key={cmp.key}
            cmp={cmp}
            selected={selectedId === index}
            index={index}
            zoom={zoom}
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
