<template>
  <div ref="list" class="list">
    <el-divider content-position="left">表单域组件</el-divider>
    <xdh-grid ref="fields" :data="fields" direction="row" justify="flex-start" wrap="wrap">
      <div slot-scope="{item, index}" class="box-wrapper">
        <component-item :data="item" :index="index" />
      </div>
    </xdh-grid>
    <el-divider content-position="left">辅助组件</el-divider>
    <xdh-grid ref="helpers" :data="helpers" direction="row" justify="flex-start" wrap="wrap">
      <div slot-scope="{item, index}" class="box-wrapper">
        <component-item :data="item" :index="index" />
      </div>
    </xdh-grid>
  </div>
</template>

<script>
import components from '@/components/custom-form/setting/other/components'
import ComponentItem from './component-item'
import xdhGrid from '@/components/custom-form/form/xdh-grid'
import Sortable from 'sortablejs'

export default {
  name: 'ComponentList',
  components: {
    ComponentItem,
    xdhGrid
  },
  data() {
    return {
      components: components
    }
  },
  computed: {
    fields() {
      return this.components.filter(n => !n.helper)
    },
    helpers() {
      return this.components.filter(n => !!n.helper)
    }
  },
  mounted() {
    this.fieldsSortable = this.createSortable(this.$refs.fields.$el, this.fields)
    this.helpersSortable = this.createSortable(this.$refs.helpers.$el, this.helpers)
  },
  beforeDestroy() {
    this.fieldsSortable && this.fieldsSortable.destroy()
    this.helpersSortable && this.helpersSortable.destroy()
  },
  methods: {
    createSortable(el, items) {
      return new Sortable(el, {
        group: {
          name: 'component',
          pull: 'clone',
          put: false
        },
        sort: false,
        animation: 150,
        setData: (dataTransfer, dragEl) => {
          const index = parseInt(dragEl.dataset.id)
          dragEl.__item__ = items[index]
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .list /deep/ .el-divider__text {
    background: transparent;
  }
  .box-wrapper {
    padding: 10px 0 0 15px;
  }
</style>
