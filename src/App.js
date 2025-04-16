import Header from "./layout/Header";
import styles from "./App.less";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import useCanvas from "./store/hooks";
import { CanvasContext } from "./context";
import { useEffect, useReducer } from "react";
function App(props) {
  const canvas = useCanvas();//创建一个canvas，也可在这里传入一个canvas初始化。
  const [,forceUpdate]=useReducer(x=>x+1,0);//创建forceUpdate函数。

  useEffect(()=>{
    const unSubscribe=canvas.subscribe(()=>{
      forceUpdate();
    });
    return ()=>{//组件卸载前取消订阅。
      unSubscribe();
    };
  },[]);

  return (
    // less导入模块化
    <div className={styles.main}>
      <CanvasContext.Provider value={canvas}>
        <Header />
        <div className={styles.content}>
          <Left></Left>
          <Center></Center>
          <Right></Right>
        </div>
      </CanvasContext.Provider>
    </div>
  );
}

export default App;
