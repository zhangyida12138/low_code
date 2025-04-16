import React from "react";
import styles from "./index.less";
import { useCanvasByContext } from "../../store/hooks";
import classNames from "classnames";
function Header() {
  const canvas = useCanvasByContext();

  const save = (e) => {
    const data = canvas.getCanvas();
    //将data发送给服务器。
    console.log(JSON.stringify(data)); //sy-log
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.item}
        onClick={(e) => {
          save(e);
        }}
      >
        <span
          className={classNames("iconfont icon-baocun", styles.icon)}
        ></span>
        <span className={styles.txt}>保存</span>
      </div>
      <div
        className={styles.item}
        onClick={(e) => {
          save(e);
        }}
      >
        <span className={classNames("iconfont icon-fabu", styles.icon)}></span>
        <span className={styles.txt}>发布</span>
      </div>
    </div>
  );
}

export default Header;
