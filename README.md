*** 持续更新！ ***

# 记录一下难点亮点

classnames库，可以在css模块化的基础上，添加额外的classname，不影响原本的classname；
``` javascript
//原本添加新的classname不方便。
<div className={styles.cmp} style={style}>
      {value}
</div>

//安装了classnames库以后，可以用classNames函数。
//新增一个ass类
<div className={classNames(styles.main,'ass')} style={style}>
      {value}
</div>
```
难点：
react合成事件和dom原生事件执行顺序。
移动，拉伸，旋转时的复杂事件监听以及坐标问题。
简单写一个深克隆来实现对象的复制和粘贴，以及undo等功能


Todo:
1. 目前拖拽所有点都可以在x和y轴变形，应该调整。
2. 在变形的过程中会导致超出canvas范围，应该调整。
3. 
