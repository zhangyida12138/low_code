import React from "react";
import styles from "../index.less";
import { useCanvasByContext } from "../../../store/hooks";
import { isImgComponent } from "../../../layout/Left";
import { defaultCommonStyle } from "../../../utils/const";
const defaultStyle = {
  ...defaultCommonStyle,
  // height:"auto",
};

const settings = [
  {
    value: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    style: defaultStyle,
  },
  {
    value: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
    style: defaultStyle,
  },
  {
    value: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    style: defaultStyle,
  },
  {
    value: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    style: defaultStyle,
  },
];

function ImgSide() {
  const canvas = useCanvasByContext();
  const addCmp = (cmp) => {
    canvas.addCmp(cmp);
    // console.log(canvas);
  };

  const onDragStart = (e, _cmp) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp)); //事件通信
  };
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            key={item.value}
            className={styles.item}
            onClick={() => addCmp({ ...item, type: isImgComponent })}
            onDragStart={(e) => {
              onDragStart(e, { ...item, type: isImgComponent });
            }}
          >
            <img src={item.value} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImgSide;
