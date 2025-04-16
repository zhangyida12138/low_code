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