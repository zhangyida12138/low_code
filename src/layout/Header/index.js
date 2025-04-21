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
  //上一步
  const goPrevCanvasHistory=(e)=>{
    canvas.goPrevCanvasHistory();
  }
  //下一步
  const goNextCanvasHistory=(e)=>{
    canvas.goNextCanvasHistory();
  }
  //清空画布
  const emptyCanvas=(e)=>{
    canvas.emptyCanvas();
  }

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

      <div className={classNames(styles.item)} onClick={goPrevCanvasHistory}>
        <span
          className={classNames(
            "iconfont icon-xiayibu",
            styles.icon
          )}
          style={{ transform: `rotateY(180deg)` }}
        ></span>
        <span className={styles.txt}>上一步</span>
      </div>

      <div className={classNames(styles.item)} onClick={goNextCanvasHistory}>
        <span
          className={classNames(
            "iconfont icon-xiayibu",
            styles.icon
          )}
          
        ></span>
        <span className={styles.txt}>下一步</span>
      </div>

      <div className={classNames(styles.item)} onClick={emptyCanvas}>
        <span
          className={classNames("iconfont icon-qingkong", styles.icon)}
        ></span>
        <span className={styles.txt}>清空</span>
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
