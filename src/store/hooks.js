import { useContext } from "react";
import {CanvasContext} from '../context'
import { useRef } from "react";
import { Canvas } from "./canvas";

export function useCanvasByContext(){
    const canvas=useContext(CanvasContext)

    return canvas;//获取整个canvas，包含了canvas数据和方法。
}

export function useCanvasData(){
    const canvas=useContext(CanvasContext)
    return canvas.getCanvas();//获取整个canvas的数据（浅拷贝），包含了组件和canvas的样式。
}

export function useCanvasCmp(){
    const canvas=useContext(CanvasContext)
    return canvas.getCanvasCmps();//获取canvas中要渲染的组件
}

export default function useCanvas(canvas){//可以传递一个canvas进来初始化
    const canvasRef=useRef();
    //.current本质上不是dom，是一个可持续的容器，可以装任何数据，这里装的是Canvas类的实例
    if(!canvasRef.current){//确保Canvas实例在组件整个生命周期中，只创建一次
      if(canvas){
        canvasRef.current=canvas;
      }else{
        const canvas=new Canvas();
        canvasRef.current=canvas;
      }
    }
    return canvasRef.current;//.current存储了dom的实际的值。
  }