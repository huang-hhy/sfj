<template>
  <el-container :class="wrapperClasses">
    <el-header
      v-if="northOptions && $slots.north"
      v-resizable="northOptions.resizable"
      :class="['xdh-layout__north',{'xdh-layout--split':northOptions.split, 'xdh-layout__north--collapsed': northOptions.collapsed}]"
      :height="northOptions.collapsed ? northOptions.collaspedSize: northOptions.height"
    >
      <slot v-if="northOptions.collapsed && $slots['north-collapsed']" name="north-collapsed" />
      <slot v-else name="north" />
      <div v-if="northOptions.split" class="xdh-layout-split__north" @dblclick="toggleCollapsed('north')">
        <slot name="north-split">
          <i :class="northSplitIcon" @click="toggleCollapsed('north')" />
        </slot>
      </div>
    </el-header>

    <el-main v-if="!west && !east" ref="main" class="xdh-layout__main">
      <slot />
    </el-main>

    <el-container v-else class="xdh-layout__wrapper">
      <el-aside
        v-if="westOptions && $slots.west"
        v-resizable="westOptions.resizable"
        :class="['xdh-layout__west',{'xdh-layout--split':westOptions.split, 'xdh-layout__west--collapsed': westOptions.collapsed}]"
        :width="westOptions.collapsed ? westOptions.collaspedSize : westOptions.width"
      >
        <slot v-if="westOptions.collapsed && $slots['west-collapsed']" name="west-collapsed" />
        <slot v-else name="west" />
        <div v-if="westOptions.split" class="xdh-layout-split__west" @dblclick="toggleCollapsed('west')">
          <slot name="west-split">
            <i :class="westSplitIcon" @click="toggleCollapsed('west')" />
          </slot>
        </div>
      </el-aside>

      <el-main v-if="!footerInMain" ref="main" class="xdh-layout__main">
        <slot />
      </el-main>

      <el-container v-if="footerInMain">
        <el-main ref="main" class="xdh-layout__main">
          <slot />
        </el-main>
        <el-footer
          v-if="southOptions && $slots.south"
          v-resizable="southOptions.resizable"
          :class="['xdh-layout__south',{'xdh-layout--split':southOptions.split, 'xdh-layout__south--collapsed': southOptions.collapsed}]"
          :height="southOptions.collapsed ? southOptions.collaspedSize : southOptions.height"
        >
          <slot v-if="southOptions.collapsed" name="south-collapsed" />
          <slot v-else name="south" />
          <div v-if="southOptions.split" class="xdh-layout-split__south" @dblclick="toggleCollapsed('south')">
            <slot name="south-split">
              <i :class="southSplitIcon" @click="toggleCollapsed('south')" />
            </slot>
          </div>
        </el-footer>
      </el-container>

      <el-aside
        v-if="eastOptions && $slots.east"
        v-resizable="eastOptions.resizable"
        :class="['xdh-layout__east',{'xdh-layout--split':eastOptions.split, 'xdh-layout__east--collapsed': eastOptions.collapsed}]"
        :width="eastOptions.collapsed ? eastOptions.collaspedSize : eastOptions.width"
      >
        <slot v-if="eastOptions.collapsed && $slots['east-collapsed']" name="east-collapsed" />
        <slot v-else name="east" />
        <div v-if="eastOptions.split" class="xdh-layout-split__east" @dblclick="toggleCollapsed('east')">
          <slot name="east-split">
            <i :class="eastSplitIcon" @click="toggleCollapsed('east')" />
          </slot>
        </div>
      </el-aside>

    </el-container>

    <el-footer
      v-if="!footerInMain && southOptions && $slots.south"
      v-resizable="southOptions.resizable"
      :class="['xdh-layout__south',{'xdh-layout--split':southOptions.split, 'xdh-layout__south--collapsed': southOptions.collapsed}]"
      :height="southOptions.collapsed ? southOptions.collaspedSize : southOptions.height"
    >
      <slot v-if="southOptions.collapsed && $slots['south-collapsed']" name="south-collapsed" />
      <slot v-else name="south" />
      <div v-if="southOptions.split" class="xdh-layout-split__south" @dblclick="toggleCollapsed('south')">
        <slot name="south-split">
          <i :class="southSplitIcon" @click="toggleCollapsed('south')" />
        </slot>
      </div>
    </el-footer>

  </el-container>
</template>

<script>
/**
   * layout布局组件
   * @module widgets/xdh-layout
   * @example
   *
   * // 使用说明
   * <xdh-layout>
   *     <div slot="north">North</div>
   *     <div>Main</div>
   *     <div slot="south">South</div>
   * </xdh-layout>
   */
import Resizable from '@/components/custom-form/utils/resizable'

const defaultOptions = {
  split: false,
  collapsed: false,
  collaspedSize: '40px'
}

const createResizableOptions = function(region, dir, options, vm) {
  return {
    minWidth: 40,
    minHeight: 40,
    maxWidth: 10000,
    maxHeight: 10000,
    handles: dir,
    edge: 10,
    onlySize: true,
    onStartResize(e) {
      /**
         * 开始拖拽改变尺寸时触发
         * @event on-start-resize
         * @param {string} region 区块 north / south / west / east
         * @param {object} e resizable 事件对象
         */
      vm.$emit('on-start-resize', region, e)
    },
    onStopResize(e) {
      /**
         * 停止拖拽改变尺寸时触发
         * @event on-stop-resize
         * @param {string} region 区块 north / south / west / east
         * @param {object} e resizable 事件对象
         */
      vm.$emit('on-stop-resize', region, e)
    },
    onResize(e) {
      /**
         * 正在拖拽改变尺寸时触发
         * @event on-resize
         * @param {string} region 区块 north / south / west / east
         * @param {object} e resizable 事件对象
         */
      vm.$emit('on-resize', region, e)
    },
    ...options
  }
}

/**
   * 插槽
   * @member slot
   * @property {string} [default] 默认表示居中main布局内的插槽
   * @property {string} [north] 顶部插槽
   * @property {string} [south] 底部插槽
   * @property {string} [west] 左侧栏插槽
   * @property {string} [east] 右侧栏插槽
   * @property {string} [north-collapsed] 顶部收起时的内容
   * @property {string} [south-collapsed] 底部收起时的内容
   * @property {string} [west-collapsed] 左侧收起时的内容
   * @property {string} [east-collapsed] 右侧收起时的内容
   * @property {string} [north-split] 顶部分割区内容
   * @property {string} [south-split] 底部分割区内容
   * @property {string} [west-split] 左侧分割区内容
   * @property {string} [east-split] 右侧分割区内容
   */

export default {
  name: 'XdhLayout',
  directives: {
    Resizable
  },
  /**
     * 属性参数
     * @property {boolean | object} [north = true] north 顶部布局显示开关（或配置参数），传false表示手动关闭顶部布局。支持sync修饰符
     * @property {string} [north.height] north作为配置项时的属性，定义顶部的高度
     * @property {boolean} [north.resizable = false] north作为配置项时的属性，是否允许拖动resize
     * @property {boolean} [north.split = false] north作为配置项时的属性，是否与相邻区域接壤
     * @property {boolean | object} [south = true] south 底部布局显示开关（或配置参数）,配置项参考 south， 支持sync修饰符
     * @property {boolean | object} [west = true] west 左侧栏布局显示开关（或配置参数）,配置项参考 south， 支持sync修饰符
     * @property {boolean | object} [north = true] east 右侧栏布局显示开关（或配置参数）,配置项参考 south， 支持sync修饰符
     * @property {boolean} [footerInMain = false] 定义footer布局块是否放进main布局里面
     * @property {boolean} [fixed = true] 定义头部与顶部 布局是否相对 屏幕固定
     */
  props: {
    // header 配置
    north: {
      type: [Boolean, Object],
      default: true
    },
    // footer 配置
    south: {
      type: [Boolean, Object],
      default: true
    },
    // 左aside配置
    west: {
      type: [Boolean, Object],
      default: true
    },
    // 右aside配置
    east: {
      type: [Boolean, Object],
      default: true
    },
    // footer是否放到main里面
    footerInMain: {
      type: Boolean,
      default: false
    },
    // 是否固定头部和底部
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 头部布局真实配置项定义
    northOptions() {
      const resizable = this.north.resizable
        ? createResizableOptions('north', 's', this.north.resizable, this)
        : false
      return this.north
        ? {
          height: '60px',
          ...defaultOptions,
          ...this.north,
          resizable: resizable
        }
        : false
    },
    // 底部布局真实配置项定义
    southOptions() {
      const resizable = this.south.resizable
        ? createResizableOptions('south', 'n', this.south.resizable, this)
        : false
      return this.south
        ? {
          height: '40px',
          ...defaultOptions,
          ...this.south,
          resizable: resizable
        }
        : false
    },
    // 左边栏布局真实配置项定义
    westOptions() {
      const resizable = this.west.resizable
        ? createResizableOptions('west', 'e', this.west.resizable, this)
        : false
      return this.west
        ? {
          width: '30%',
          ...defaultOptions,
          ...this.west,
          resizable: resizable
        }
        : false
    },
    // 右边栏布局真实配置项定义
    eastOptions() {
      const resizable = this.east.resizable
        ? createResizableOptions('east', 'w', this.east.resizable, this)
        : false
      return this.east
        ? {
          width: '30%',
          ...defaultOptions,
          ...this.east,
          resizable: resizable
        }
        : false
    },
    // 根据 props的 fixed属性来计算，是否添加 头部/底部 fixed布局的class
    wrapperClasses() {
      return {
        'xdh-layout': true,
        'xdh-layout--fixed': this.fixed
      }
    },
    northSplitIcon() {
      return this.northOptions.collapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    },
    westSplitIcon() {
      return this.westOptions.collapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'
    },
    eastSplitIcon() {
      return this.eastOptions.collapsed ? 'el-icon-arrow-left' : 'el-icon-arrow-right'
    },
    southSplitIcon() {
      return this.southOptions.collapsed ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    toggleCollapsed(region) {
      const regionOptions = this[`${region}Options`]
      const options = { ...regionOptions }
      options.collapsed = !regionOptions.collapsed
      this.$emit(`update:${region}`, options)
      /**
         * 切换时触发
         * @event on-collapsed
         * @param {string} region 区域 west / north / east /south
         * @param {boolean} collapsed 是否折叠收起
         */
      this.$emit('on-collapsed', region, options.collapsed)
    }
  }
}
</script>
<style lang="scss" scoped>
  .xdh-layout {
    &__north {
      position: relative;

      &.xdh-resizable--resizing {
        transition: none;
      }

      padding: 0;
      flex-shrink: 0;
      transition: height 0.3s;

      &.xdh-layout--split {
        margin-bottom: 12px;
        position: relative;
      }
    }

    &__south {
      position: relative;
      padding: 0;
      flex-shrink: 0;
      transition: height 0.3s;

      &.xdh-resizable--resizing {
        transition: none;
      }

      &.xdh-layout--split {
        margin-top: 12px;
        position: relative;
      }
    }

    &__west {
      position: relative;
      overflow: visible;
      flex-shrink: 0;
      transition: width 0.3s;

      &.xdh-resizable--resizing {
        transition: none;
      }

      &.xdh-layout--split {
        margin-right: 12px;
        position: relative;
      }
    }

    &__east {
      position: relative;
      overflow: visible;
      flex-shrink: 0;
      transition: width 0.3s;

      &.xdh-resizable--resizing {
        transition: none;
      }

      &.xdh-layout--split {
        margin-left: 12px;
        position: relative;
      }
    }

    &__main {
      padding: 0;
      position: relative;
      overflow: visible;

      > .xdh-layout--fixed {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    &__wrapper {
      position: relative;
    }

    &--fixed {
      height: 100%;

      > .xdh-layout__wrapper {
        position: relative;

        > aside {
          padding: 0;
        }
        > .xdh-layout__main {
          overflow: auto;
        }
      }

    }

    &-split__north {
      position: absolute;
      width: 100%;
      height: 12px;
      left: 0;
      bottom: -12px;
      text-align: center;
      font-size: 12px;
      line-height: 12px;

      i {
        width: 50px;
        height: 100%;
        color: #909399;
        background: #d9ecff;
        cursor: pointer;

        &:hover {
          background: #ecf5ff;
          color: #d9ecff;
        }
      }
    }

    &-split__west {
      width: 12px;
      height: 100%;
      position: absolute;
      right: -12px;
      top: 0;
      font-size: 12px;

      i {
        position: absolute;
        left: 0;
        top: 50%;
        height: 50px;
        line-height: 50px;
        transform: translateY(-50%);
        color: #909399;
        background: #d9ecff;
        cursor: pointer;

        &:hover {
          background: #ecf5ff;
          color: #d9ecff;
        }
      }
    }

    &-split__south {
      width: 100%;
      height: 12px;
      position: absolute;
      top: -12px;
      left: 0;
      font-size: 12px;
      text-align: center;
      line-height: 12px;

      i {
        width: 50px;
        height: 100%;
        color: #909399;
        background: #d9ecff;
        cursor: pointer;

        &:hover {
          background: #ecf5ff;
          color: #d9ecff;
        }
      }
    }

    &-split__east {
      width: 12px;
      height: 100%;
      position: absolute;
      left: -12px;
      top: 0;
      font-size: 12px;

      i {
        position: absolute;
        top: 50%;
        left: 0;
        height: 50px;
        line-height: 50px;
        transform: translateY(-50%);
        color: #909399;
        background: #d9ecff;
        cursor: pointer;

        &:hover {
          background: #ecf5ff;
          color: #d9ecff;
        }
      }
    }
  }
</style>
