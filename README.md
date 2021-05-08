# mini-2vdom

## 介绍

将html字符串转换为虚拟dom的小工具

## 支持

- 类似 ```<h2><small>123</small></h2>``` 的任意层嵌套标签
- 类似```<ul loading class="list" style="width: 300px; color: red; border: 1px solid #fff;">```等属性的解析和提取

## 不支持
- 根节点的多个标签并列，即只能有一个根标签
- 类似 ```<input/>``` 的自闭合标签
- 标签属性使用单引号包裹
- 标签属性 ```=``` 与 ```""``` 之间有空格

## 使用

引入文件后会向全局暴露```toVDOM```函数, 用于将标签字符串转换为虚拟DOM对象

```HTML
<script src="/mini-2vdom.js"></script>

<script type="text/template" id="tplt">
  <div 
    class="container menu" 
    id="main"
  >
    <h3 class="title">菜单</h3>
    <ul loading class="list" style="width: 300px; color: red; border: 1px solid #fff;">
      <li key="1">宫保鸡丁<span class="del">&times;</span></li>
      <li key="2">鱼香肉丝<span class="del">&times;</span></li>
    </ul>
  </div>
</script>

<script>
  toVDOM(document.getElementById('tplt').innerHTML);
</script>
```

转换结果

```javascript
{
  sel: "div"
  data: {
    class: {
      container: true,
      menu: true
    }, 
    id: "main"
  },
  children: [
    {
      sel: "h3",
      data: {
        class: {
          title: true
        }
      },
      text: "菜单"
    }, 
    {
      sel: "ul",
      data: {
        class: {
          list: true
        },
        loading: true,
        style: {
          border: "1px solid #fff",
          color: "red",
          width: "300px",
        }
      },
      children: [
        {
          sel: "li",
          children: [{
            sel: "span",
            data: {
              class: {
                del: true
              }
            },
            text: "&times;"
          }],
          data: {key: "1"},
          text: "宫保鸡丁"
        },
        {
          sel: "li",
          children: [{
            sel: "span",
            data: {
              class: {
                del: true
              },
              key: "2",
            },
            text: "&times;"
          }],
          data: {},
          text: "鱼香肉丝"
        }
      ]
    }
  ]
}

```