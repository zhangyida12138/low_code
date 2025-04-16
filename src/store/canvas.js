
import { getOnlyKey } from '../utils';
const defaultCanvas = {
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      boxSizing: "content-box",
    },
    // 组件
    cmps: [],
  
    // 仅用于测试
    // cmps: [
    //   {
    //     key: getOnlyKey(),
    //     desc: "文本",
    //     value: "文本",
    //     style: {
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: 100,
    //       height: 30,
    //       fontSize: 12,
    //       color: "red",
    //     },
    //   },
    // ],
  };

  //状态
 export class Canvas{
  constructor(_canvas=defaultCanvas){
    this.canvas=_canvas;//页面数据

    this.listener=[];//订阅事件，用于更新

    //被选中的组件的下标。
    this.selectedCmpIndex=null;
  }

  //get
  getCanvas=()=>{
    return {...this.canvas};//为什么避免污染
    //使用浅拷贝，避免子组件误改组件列表本身。
  }

  getCanvasCmps=()=>{
    return [...this.canvas.cmps];//为什么避免污染
  }

  getSelectedCmpIndex=()=>{
    return this.selectedCmpIndex;
  }

  getSelectedCmp=()=>{
    const cmps=this.getCanvasCmps();
    return cmps[this.selectedCmpIndex];
  }

  setSelectedCmpIndex=(index)=>{
    if(index!==this.selectedCmpIndex){//选中不同的组件才要更新
      this.selectedCmpIndex=index;
      //选中组件以后要加边框，所以需要更新；
      this.updateApp();
    }
  }

  addCmp=(_cmp)=>{
    //更新画布数据
    const cmp={key:getOnlyKey(),..._cmp};
    this.canvas.cmps.push(cmp);

    //选中新增的组件。
    // this.setSelectedCmpIndex(this.canvas.cmps.length-1);//添加的组件就立刻被选中。获取下标

    //因为在后面会更新组件，所以可以只修改下标，不修改使用这个函数，或者下面不更新组件
    this.selectedCmpIndex=this.canvas.cmps.length-1;

    //更新组件，只更显示页面有关系
    this.updateApp();
  }

  updateSelectedCmp=(newStyle={},newValue)=>{//可以更改样式，或者newValue
    const selectedCmp=this.getSelectedCmp();
    if (!selectedCmp) return;
      // console.log("更新选中的组件");

    if(newStyle){
      selectedCmp.style={...selectedCmp.style,...newStyle}
    }

    if(newValue!==undefined){
      selectedCmp.value=newValue;
    }

    this.updateApp();//更新组件
  }

  updateApp=()=>{
    //setState可以刷新,但是这里没有无用的状态
    //forceUpdate也可以刷新（在组件中使用useReducer）
    /**
     * const [,forceUpdate]=useReducer(x=>x+1,0);
     * forceUpdate();
     */
    this.listener.forEach((lis)=>lis());
  }

  updateCanvasStyle=(newStyle)=>{
    this.canvas.style={
      ...this.canvas.style,
      ...newStyle,
    };
    this.updateApp();
  }

  subscribe=(listener)=>{
    this.listener.push(listener);
    return ()=>{
      this.listener.filter(item=>item!==listener);
    }
  }

  //set
  setCanvas=(_canvas)=>{
    Object.assign(this.canvas,_canvas);//因为这个类的状态时放在ref.current中的,使用assign可以复用这个对象，保持原本地址不变，配合ref能保持响应性。
  }
//
//抽象封装，权限隔离或接口隔离
//只读预览模式
  getPublic=()=>{
    const obj={
      getCanvas:this.getCanvas,
      getCanvasCmps:this.getCanvasCmps,
      getSelectedCmp:this.getSelectedCmp,
      getSelectedCmpIndex:this.getSelectedCmpIndex,
      addCmp:this.addCmp,
      setSelectedCmpIndex:this.setSelectedCmpIndex,
      updateSelectedCmp:this.updateSelectedCmp,
      updateCanvasStyle:this.updateCanvasStyle,
      subscribe:this.subscribe,
    }
    return obj;
  }
}

