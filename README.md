# Slate 流程

### 构建初始状态
  > Slate 附带的 Value 模型
  ```
  const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.'
                }
              ]
            }
          ]
        }
      ]
    }
  })
  ```

### 构建应用

  ```
  // 设置应用创建时的初始状态.
  state = {
    value: initialValue
  }

  // 发生变更时，使用新的编辑器状态更新应用的 React 状态.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  <Editor value={this.state.value} onChange={this.onChange} />
  ```
 
### 增加事件回调

  ```
  // 定义一个新的回调函数，在按键时记录下按下的 key code。
  onKeyDown = (event, change) => {
    console.log(event.key)
  }

  <Editor 
    value={this.state.value} 
    onChange={this.onChange} 
    onKeyDown={this.onKeyDown} />
  ```

### 订制 block 节点

  - 节点的 renderer 就是简单的 React 组件

  ```
  // 为代码块定义 React 组件以作为 renderer.
  function CodeNode(props) {
    return <pre {...props.attributes}><code>{props.children}</code></pre>
  }

  // 为 Editor 添加这个 renderer

  <Editor 
    value={this.state.value} 
    onChange={this.onChange} 
    onKeyDown={this.onKeyDown}
    renderNode={this.renderNode} />

  renderNode = (props) => {
    switch (props.node.type) {
      case 'code': return <CodeNode {...props} />
    }
  }
  ```

  - 再在 onKeyDown 回调中添加一个快捷键即可

  ```
  onKeyDown = (event, change) => {
    if (event.key != '`' || !event.ctrlKey) return;
    event.preventDefault();
    // 判断当前选中 block 是否为代码块
    const isCode = change.value.blocks.some(block => block.type == 'code');
    // 根据 `isCode` 设置 block 类型
    change.setBlock(isCode ? 'paragraph' : 'code');
    return true;
  }
  ```

### 应用自定义格式

  - 为其添加 加粗 、 斜体 、代码块 或 中划线等

  > 类型一共为两种： mark 类型 和 node 类型
  > 分别被 renderMark 和 renderNode 所接受

  1. 在 onKeyDown 中添加一个快捷键回调， bold 为 schema 中的 mark 类型
  ```
  onKeyDown = (event, change) => {
    if (!event.ctrlKey) return

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        change.addMark('bold')
        return true
      }
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        const isCode = change.value.blocks.some(block => block.type == 'code')
        event.preventDefault()
        change.setBlock(isCode ? 'paragraph' : 'code')
        return true
      }
    }
  }
  ```

  2. 创建了此快捷键后，还需要为 blod 添加一个 mark 类型的 renderer

  ```
  // 定义一个 React 组件来渲染粗体文本
  function BoldMark(props) {
    return <strong>{props.children}</strong>
  }
  ```

  3. 为 Editor 添加 mark 信息

  ```

  // 为 Editor 添加这个 renderMark

  <Editor 
    value={this.state.value} 
    onChange={this.onChange} 
    onKeyDown={this.onKeyDown}
    renderNode={this.renderNode}
    renderMark={this.renderMark} />

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold': return <BoldMark {...props} />
    }
  }
  ```
### 使用插件

  1. 编写一个接收下列参数的新函数：要开闭的 mark 类型 type 和按下的按键键值 code

  ```
  function MarkHotkey(options) {

    // 从用户传入的参数中获取选项值.
    const { type, key } = options;

    // 返回我们包含了 `onKeyDown` 回调的插件对象
    return {
      onKeyDown(event, change) {
        // 检查按下的键是否匹配 `code` 选项.
        if (!event.ctrlKey || event.key != key) return

        event.preventDefault()

        // 根据 `type` 来开闭 mark.
        change.toggleMark(type)
        return true
      }
    }
  }
  ```

  2. 编写好一个可以为任何类型的 mark 复用的函数，就可以移除不必要的函数了

  - 添加插件配置

  ```
  // 初始化加粗文本插件.
  const boldPlugin = MarkHotkey({
    type: 'bold',
    key: 'b'
  })
  // 创建插件数组.
  const plugins = [
    boldPlugin
  ]
  ```
  
  - 替换插件配置

  ```
  class Edit extends React.Component {

    state = {
      value: initialValue,
    }

    onChange = ({ value }) => {
      this.setState({ value })
    }

    render() {
      return (
        // 添加 `plugin` 属性到编辑器，并移除 `onKeyDown`.
        <Editor
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderMark={this.renderMark}
        />
      )
    }
    
    renderMark = (props) => {
      switch (props.mark.type) {
        case 'bold': return <strong>{props.children}</strong>
      }
    }
  }
  ```

  3. 现在可以动态添加多个插件配置

  - 添加 斜体，代码、中划线 和下划线 mark 

  ```
  // 为每种 mark 初始化一个插件
  const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: 'd', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' })
  ]

  ...

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold': return <strong>{props.children}</strong>
      // 添加新的 mark renderer...
      case 'code': return <code>{props.children}</code>
      case 'italic': return <em>{props.children}</em>
      case 'strikethrough': return <del>{props.children}</del>
      case 'underline': return <u>{props.children}</u>
    }
  }
  ```

### 保存到数据库

  - 这里分为两种保存方式

  1. Slate 附带的 Value 模型, 存入 **JSON** 格式的数据
  
  修改 onChange 函数

  ```
  onChange = ({ value }) => {
    // Save the value to Local Storage.
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('content', content)

    this.setState({ value })
  }
  ```
  修改初始化接收参数

  ```
  // 只要 localStorage 中存在初始状态，则从中拉取出来放到初始化中
  const existingValue = JSON.parse(localStorage.getItem('content'))；
  const initialValue = Value.fromJSON(existingValue || { 
    document: { ... }
  });
  ```
  以上存储将在编辑器中进行任何操作就进行储存，本地还可以，但HTTP就需要特殊处理

  ```
  onChange = ({ value }) => {
    // 保存前检查 document 是否改变.
    if (value.document != this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
    }

    this.setState({ value })
  }
  ```

  2. 如果需要的是 **JSON以外** 的格式，就需要进行不同方式的序列化
  
  - 以纯文本形式存储

  > 可以通过 Slate 自带的 Plain 序列化器来实现

  ```
  // 切换到 Plain 序列化器
  import Plain from 'slate-plain-serializer';

  const existingValue = localStorage.getItem('content')
  const initialValue = Plain.deserialize(existingValue || 'A string of plain text.')

  ...

  onChange = ({ value }) => {
    if (value.document != this.state.value.document) {
      const content = Plain.serialize(value)
      localStorage.setItem('content', content)
    }

    this.setState({ value })
  }
  ```
### 存取 HTML 内容

  1. 添加一个 HTML 序列化器

  - A `paragraph` block.
  - A `code` block for code samples.
  - A `quote` block for quotes...
  - And `bold`, `italic` and `underline` formatting.

  默认情况下，Html 序列化器和 Slate 一样不了解 schema 中内容。要解决这个问题，我们需要将一系列的 rules 传入它。每条规则都定义了如何序列化与反序列化 Slate 对象。

  ```
  const rules = [
    // 通过反序列化函数添加我们的第一条规则.
    {
      deserialize(el, next) {
        if (el.tagName.toLowerCase() == 'p') {
          return {
            object: 'block',
            type: 'paragraph',
            nodes: next(el.childNodes)
          }
        }
      }
      // 为规则添加添加序列化函数…
      serialize(obj, children) {
        if (obj.object == 'block' && obj.type == 'paragraph') {
          return <p>{children}</p>
        }
      }
    }
  ]
  ```
  
  现在序列化器就可以处理 paragraph 节点了
  添加一些需要的其它 block 类型

  ```
  // 使用词典重构 block 标签来保持代码简洁.
  const BLOCK_TAGS = {
    p: 'paragraph',
    blockquote: 'quote',
    pre: 'code'
  }

  const rules = [
    {
      // 修改 deserialize 来处理更多类型的 block…
      deserialize(el, next) {
        const type = BLOCK_TAGS[el.tagName.toLowerCase()]
        if (!type) return
        return {
          object: 'block',
          type: type,
          nodes: next(el.childNodes)
        }
      },
      // 修改 serialize 来处理更多类型的 block…
      serialize(obj, children) {
        if (obj.object != 'block') return
        switch (obj.type) {
          case 'paragraph': return <p>{children}</p>
          case 'quote': return <blockquote>{children}</blockquote>
          case 'code': return <pre><code>{children}</code></pre>
        }
      }
    }
  ]
  ```

  添加 mark 类型序列

  ```
  // 添加一个用于 mark 标签的新词典
  const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
  }
  ```

  修改规则

  ```
  const rules = [
    {
      // 修改 deserialize 来处理更多类型的 block…
      deserialize(el, next) {
        const type = BLOCK_TAGS[el.tagName.toLowerCase()]
        if (!type) return
        return {
          object: 'block',
          type: type,
          nodes: next(el.childNodes)
        }
      },
      // 修改 serialize 来处理更多类型的 block…
      serialize(obj, children) {
        if (obj.object != 'block') return
        switch (obj.type) {
          case 'paragraph': return <p>{children}</p>
          case 'quote': return <blockquote>{children}</blockquote>
          case 'code': return <pre><code>{children}</code></pre>
        }
      }
    },
    { 
      // 添加一条处理 mark 的新规则…
      deserialize(el, next) {
        const type = MARK_TAGS[el.tagName.toLowerCase()]
        if (!type) return
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes)
        }
      },
      serialize(obj, children) {
        if (obj.object != 'mark') return
        switch (obj.type) {
          case 'bold': return <strong>{children}</strong>
          case 'italic': return <em>{children}</em>
          case 'underline': return <u>{children}</u>
        }
      }
    }
  ]
  ```
  > 全部规则创建完成以后，就可以开始创建一个新的 Html 序列化器并传入这些规则：

  ```
  import { Html } from 'slate';
  // 使用我们上面的规则创建一个新的序列化器
  const html = new Html({ rules })
  ```

  - 存取以及初始化内容
  
  ```
  const initialState = (
    localStorage.getItem('content') || '<p></p>'
  )

  ...

  state = {
    value: html.deserialize(initialValue),
  }

  // 存入内容
  onChange = ({ value }) => {
    // When the document changes, save the serialized HTML to Local Storage.
    if (value.document != this.state.value.document) {
      const string = html.serialize(value)
      localStorage.setItem('content', string)
    }

    this.setState({ value })
  }
  ```

  - 使用 nodes 和 marks

  ```
  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        // Add the ability to render our nodes and marks...
        renderNode={this.renderNode}
        renderMark={this.renderMark}
      />
    )
  }
  
  renderNode = (props) => {
    switch (props.node.type) {
      case 'code': return <pre {...props.attributes}><code>{props.children}</code></pre>
      case 'paragraph': return <p {...props.attributes}>{props.children}</p>
      case 'quote': return <blockquote {...props.attributes}>{props.children}</blockquote>
    }
  }

  // Add a `renderMark` method to render marks.
  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold': return <strong>{props.children}</strong>
      case 'italic': return <em>{props.children}</em>
      case 'underline': return <u>{props.children}</u>
    }
  }
  ```

# 组件流程制定

  1. 工具栏配置项

  > Value:  initalValue JSON
  > Text:   initalText  text
  > Html:   initalHtml  html

  2. 创建插件插件
  
  3. 动态生成插件配置
  4. 绑定插件到编辑器中
  5. 初始化模型的值
