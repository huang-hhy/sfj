/**
 * dom操作模块, 更多dom操作可以使用 element-ui/lib/util/dom
 * @module utils/dom
 * @author 陈华春
 */

export function offsetLeft(el) {
  return el.offsetParent ? el.offsetLeft + offsetLeft(el.offsetParent) : el.offsetLeft
}

export function offsetTop(el) {
  return el.offsetParent ? el.offsetTop + offsetTop(el.offsetParent) : el.offsetTop
}

export function getScroll(target, top) {
  if (!target) return 0
  if (target === window) {
    const prop = top ? 'pageYOffset' : 'pageXOffset'
    const method = top ? 'scrollTop' : 'scrollLeft'

    let ret = target[prop]

    if (typeof ret !== 'number') {
      ret = window.document.documentElement[method]
    }

    return ret
  } else {
    const method = top ? 'scrollTop' : 'scrollLeft'
    return target[method]
  }
}

export function getOffset(element) {
  const rect = element.getBoundingClientRect()

  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)

  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll(start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

/**
 * 在元素前插入元素
 * @param {HTMLElement} newEl 新DOM元素
 * @param {HTMLElement} targetEl 在指定目标DOM元素前插入
 */
export function insertAfter(newEl, targetEl) {
  const parentEl = targetEl.parentNode
  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl)
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling)
  }
}

/**
 * 判断元素是否隐藏
 * @param  {HTMLElement} el 元素DOM对象
 * @return {boolean} 是否隐藏
 */
export function isHidden(el) {
  const style = window.getComputedStyle(el)
  return (style.display === 'none' || style.visibility === 'hidden')
}
