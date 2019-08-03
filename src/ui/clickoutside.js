/**
 * 点击元素外面触发事件
 * @author jrs
 */
import { $dom } from 'jtpl'

let nodeList = []
let startEvent
let ctx = '#jui#clickoutsideContext'
let ctxId = 0

document.addEventListener('mousedown', event => {
  startEvent = event
})

document.addEventListener('mouseup', event => {
  nodeList.forEach(el => {
    // 在元素里面不触发
    if (el.contains(startEvent.target) ||
      el.contains(event.target) || 
      el === event.target) {
      return
    }
    
    if (el[ctx]) {
      el[ctx].bindFn()
    }
  })
})

const clickoutside = {
  bind(selector, bindFn) {
    let el = selector
    if (!selector instanceof HTMLElement) {
      el = $dom(selector).el
    }
    el[ctx] = {
      id: ctxId++,
      bindFn
    }
    nodeList.push(el)
  },
  unbind(selector) {
    let el = $dom(selector).el
    let len = nodeList.length
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
  }
}


export default clickoutside