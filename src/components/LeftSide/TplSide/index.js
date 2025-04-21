import React from "react";
import { useCanvasByContext } from "../../../store/hooks";
import styles from "../index.less";
const settings = [
  {
    key: 0,
    desc: "测试一下",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    data: '{"style":{"width":320,"height":568,"backgroundColor":"rgba(80, 227, 194, 0.5)","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"key":0.6919920527054566,"value":"测试一下","style":{"position":"absolute","top":20,"left":53,"width":80,"height":30,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0,"lineHeight":"30px","fontSize":12,"fontWeight":"normal","color":"#000","backgroundColor":"#ffffff00","textAlign":"left"},"type":1},{"key":0.22887568561191507,"value":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e","style":{"position":"absolute","top":147,"left":1,"width":315,"height":231,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.7166232153634223,"value":"好像还可以吧","style":{"position":"absolute","top":417,"left":102,"width":80,"height":30,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0,"lineHeight":"30px","fontSize":12,"fontWeight":"normal","color":"#000","backgroundColor":"#ffffff00","textAlign":"left"},"type":1}]}'
  },
  {
    key: 1,
    desc: "牛",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    data: '{"style":{"width":320,"height":568,"backgroundColor":"#ffffffff","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"key":0.885881084646175,"value":"https://images.unsplash.com/photo-1470770903676-69b98201ea1c","style":{"position":"absolute","top":328,"left":203,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.5707837162157762,"value":"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d","style":{"position":"absolute","top":29,"left":201,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.6837262957695603,"value":"https://images.unsplash.com/photo-1519682337058-a94d519337bc","style":{"position":"absolute","top":335,"left":43,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.40801970166951673,"value":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e","style":{"position":"absolute","top":151,"left":15,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.43386669848921056,"value":"牛","style":{"position":"absolute","top":0,"left":0,"width":188,"height":108,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0,"lineHeight":"108px","fontSize":43.200000000000024,"fontWeight":"normal","color":"#000","backgroundColor":"#ffffff00","textAlign":"center"},"type":1}]}'
  },
  {
    key: 2,
    desc: "nb",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    data: '{"style":{"width":320,"height":568,"backgroundColor":"#ffffffff","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"key":0.885881084646175,"value":"https://images.unsplash.com/photo-1470770903676-69b98201ea1c","style":{"position":"absolute","top":328,"left":203,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.5707837162157762,"value":"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d","style":{"position":"absolute","top":29,"left":201,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.6837262957695603,"value":"https://images.unsplash.com/photo-1519682337058-a94d519337bc","style":{"position":"absolute","top":335,"left":43,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.40801970166951673,"value":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e","style":{"position":"absolute","top":151,"left":15,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.43386669848921056,"value":"牛","style":{"position":"absolute","top":0,"left":0,"width":188,"height":108,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0,"lineHeight":"108px","fontSize":43.200000000000024,"fontWeight":"normal","color":"#000","backgroundColor":"#ffffff00","textAlign":"center"},"type":1}]}'
  },
  {
    key: 3,
    desc: "woccccc",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    data: '{"style":{"width":320,"height":568,"backgroundColor":"#ffffffff","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"key":0.885881084646175,"value":"https://images.unsplash.com/photo-1470770903676-69b98201ea1c","style":{"position":"absolute","top":328,"left":203,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.5707837162157762,"value":"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d","style":{"position":"absolute","top":29,"left":201,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.6837262957695603,"value":"https://images.unsplash.com/photo-1519682337058-a94d519337bc","style":{"position":"absolute","top":335,"left":43,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.40801970166951673,"value":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e","style":{"position":"absolute","top":151,"left":15,"width":80,"height":80,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0},"type":2},{"key":0.43386669848921056,"value":"牛","style":{"position":"absolute","top":0,"left":0,"width":188,"height":108,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"rgba(255,255,255,1)","transform":0,"lineHeight":"108px","fontSize":43.200000000000024,"fontWeight":"normal","color":"#000","backgroundColor":"#ffffff00","textAlign":"center"},"type":1}]}'
  },
];

function TplSide() {
  const canvas = useCanvasByContext();
  //将json格式的canvas导入
  const setCanvas = (_cmp) => {
    canvas.setCanvas(JSON.parse(_cmp));
  };//导出的时候也导出的是json，但是没有description，key和img

  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            key={item.key}
            className={styles.item}
            onClick={() => setCanvas(item.data)}
          >
            <img src={item.img} alt={item.desc} />
            <div className={styles.desc}>{item.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TplSide;
