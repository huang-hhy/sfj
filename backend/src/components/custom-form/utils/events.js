/**
 * 事件基类，提供DOM事件和自定义事件侦听、触发、销毁功能，自定义事件基于Vue实现，面向对象类可继承该类实现事件相关功能
 * @module utils/events
 * @author 陈华春
 */

import { on, off } from 'element-ui/lib/utils/dom'
import Vue from 'vue'

/**
 * 事件处理基类
 * @export
 */
class Events {
  /**
   * @constructor
   */
  constructor() {
    this.__handlers__ = []

    /**
     * 自定义事件处理对象，基于Vue实例实现，私有属性
     * @type {Vue}
     */
    this.__event__ = new Vue({})
  }

  on(el, eventName, callback) {
    const proxy = callback.bind(this)
    const handler = { el, eventName, callback, proxy }
    this.__handlers__.push(handler)
    on(el, eventName, proxy)
  }

  /**
   * 绑定自定义事件
   * @param {String} name 事件名称
   * @param {Function} handler 事件处理函数
   * @returns {Vue}
   */
  $on(name, handler) {
    return this.__event__.$on.apply(this.__event__, arguments)
  }

  off(el, eventName, callback) {
    if (!el) return
    const length = arguments.length
    this.__handlers__.forEach((item, index) => {
      switch (length) {
        case 3:
          if (item.el === el && item.eventName === eventName && item.callback === callback) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
        case 2:
          if (item.el === el && item.eventName === eventName) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
        case 1:
          if (item.el === el) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
      }
    })
  }

  /**
   * 销毁自定义事件
   * @param {String} [name] 事件名称，可选，不传表示销毁当前实例的全部事件
   * @param {Function} [handler] 事件回调函数，可选，不传表示销毁当前实例指定时间名称的全部事件
   * @returns {Vue}
   */
  $off(name, handler) {
    return this.__event__.$off.apply(this.__event__, arguments)
  }

  /**
   * 触发自定义事件
   * @param {string} name 事件名称
   * @param {Function} handler 事件回调函数
   * @returns {Vue}
   */
  $emit(name, handler) {
    return this.__event__.$emit.apply(this.__event__, arguments)
  }

  /**
   * 销毁实例，把DOM和自定义事件全部销毁，释放内存
   */
  destroy() {
    this.__handlers__.forEach(item => {
      off(item.el, item.eventName, item.proxy)
    })
    this.__handlers__ = []
    this.__event__.$off()
    this.__event__.$destroy()
  }
}

/**
 * 事件基类
 * @type {Events}
 */
export default Events
