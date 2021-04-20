<template>
  <div>
    <el-button type="primary" class="release" @click="release">保存</el-button>
    <div class="form_pc">
      <div class="pc_body">
        <div class="container" @dblclick="handleDblClick">
          <xdh-form
            ref="form"
            class="design-form"
            :class="classes"
            v-bind="form"
            :model="model"
            design-mode
            :load="load"
          >
            <xdh-form-item
              v-for="item in fields"
              :key="item.prop"
              v-bind="clone(item)"
              :class="{'is-helper':showHelper===item, 'is-select':editField===item}"
              @mouseenter.native="handleMouseEnter(item)"
              @mouseleave.native="handleMouseLeave(item)"
            >
              <div slot="body" class="mask" @click.stop="handleEditItem(item)">
                <span v-show="item.depend" class="depend-info">依赖：{{ item.depend }}</span>
                <div class="handle-btns">
                  <i class="el-icon-delete" @click.stop="removeItem(item)" />
                </div>
              </div>
            </xdh-form-item>
          </xdh-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XdhForm from '@/components/custom-form/form/xdh-form'
import XdhFormItem from '@/components/custom-form/form/xdh-form-item'
import Sortable from 'sortablejs'
import { load } from '@/components/custom-form/utils/dict'
import { mapState, mapGetters } from 'vuex'
import {
  saveStandardizationForm,
  editStandardizationForm
} from '@/api/work'

export default {
  components: {
    XdhForm,
    XdhFormItem
  },
  data() {
    return {
      pc: {},
      showHelper: null,
      dragging: false,
      load: load
    }
  },
  computed: {
    ...mapState({
      form: state => state.custom.formModel,
      fields: state => state.custom.fields,
      editField: state => state.custom.editField
    }),
    ...mapGetters(['model']),
    classes() {
      return {
        'is-empty': this.fields.length === 0
      }
    },
    model() {
      const m = {}
      this.fields.forEach(item => {
        if (!item) return
        // 分隔线组件无值
        if (item.type !== 'divider') {
          m[item.prop] = (item.props || {}).value || item.value
        }
      })
      return m
    }
  },
  mounted() {
    let isAdd = false
    this.sortable = new Sortable(this.$refs.form.$refs.body, {
      group: 'component',
      animation: 200,
      filter: '.xdh-form__footer',
      onStart: () => {
        this.dragging = true
        this.showHelper = null
      },
      onEnd: () => {
        this.dragging = false
      },
      onSort: (e) => {
        // 添加也会触发onSort， 用个变量去来区分
        if (!isAdd) {
          this.$store.commit('sortFields', e)
        }
        isAdd = false
      },
      onAdd: (e) => {
        const item = e.item.__item__
        if (item) {
          isAdd = true
          this.handleDrop(item, e.newIndex)
        }
        this.$nextTick(() => {
          e.item.parentNode.removeChild(e.item)
        })
      }
    })
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy()
    }
  },
  methods: {
    handleSubmit(model) {
      // console.log('submit', model)
    },
    release() {
      const self = this
      const { id, type } = self.$route.query
      const data = { partyStepId: id, customForm: JSON.stringify(self.fields) }
      if (type * 1 === 1) {
        saveStandardizationForm(data).then(res => {
          if (res.code === 0) {
            self.$message.success('保存成功')
          } else {
            self.$message.error(res.msg)
          }
        })
      } else if (type * 1 === 2) {
        editStandardizationForm(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            self.$message.success('保存成功')
          } else {
            self.$message.error(res.msg)
          }
        })
      }
      this.$router.push({ path: '/work/recruiting-party-members-process' })
    },
    clone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    handleDrop(item, index) {
      if (item) {
        const defaultName = `${item.type}_${new Date().getTime()}`
        const newItem = {
          ...item,
          prop: defaultName,
          label: item.title,
          value: item.value
        }
        delete newItem.title
        this.$store.commit('addField', { field: newItem, index: index })
      }
    },
    handleMouseEnter(item) {
      if (this.dragging) return
      this.showHelper = item
    },
    handleMouseLeave() {
      this.showHelper = null
    },
    handleEditItem(item) {
      // this.editField = item
      this.$store.commit('setEditField', item)
    },
    removeItem(item) {
      const isDepend = !!this.fields.find(n => n.depend === item.prop)
      if (isDepend) {
        this.$message.warning('该字段被其他字段依赖，不能删除')
        return
      }
      this.$store.commit('setEditField', null)
      this.$store.commit('removeField', item)
    },
    handleDblClick() {
      this.$store.commit('setEditField', null)
    }
  }
}
</script>

<style scoped lang="scss">
  .release {
    float: right;
    margin-top: -40px;
  }

  .container {
    /*padding: 0px 30px;*/

    .xdh-form-divider {
      cursor: move;

      &.is-helper {
        /deep/ {
          .xdh-form-item__body {
            display: block;
            top: -16px;
            height: 30px;
            border: 3px dotted #67c23a !important;
            background: rgba(103, 194, 58, 0.2) !important;
          }
        }
      }

      &.is-select {
        /deep/ {
          .xdh-form-item__body {
            border: 3px dotted #e6a23c;
            background: rgba(230, 162, 60, 0.2);
            display: block;
            top: -16px;
            height: 30px;
          }
        }
      }
    }

    .xdh-form-item {
      position: relative;
      cursor: move;

      &.is-helper, &.is-helper.is-depend {
        /deep/ {
          .xdh-form-item__body {
            display: block;
            border: 3px dotted #67c23a !important;
            background: rgba(103, 194, 58, 0.2) !important;
          }
        }
      }

      &.is-select, &.is-select.is-depend {
        /deep/ {
          .xdh-form-item__body {
            display: block;
            border: 3px dotted #e6a23c;
            background: rgba(230, 162, 60, 0.2);
          }

          .handle-btns {
            display: block
          }
        }
      }

      &.is-depend {
        /deep/ {
          .xdh-form-item__body {
            display: block;
            border: 3px dotted #909399;
            background: rgba(66, 66, 66, 0.05);
          }

          .depend-info {
            text-align: left;
            font-size: 12px;
            background: rgba(66, 66, 66, 0.4);
            color: #FFFFFF;
            padding: 3px;
            border-radius: 2px;
            position: absolute;
            left: 10px;
            top: -15px;
          }

          .handle-btns {
            display: none;
          }

        }
      }

      &.sortable-ghost {
        /deep/ {
          .xdh-form-item__body {
            display: block;
            border: none;
            background: mix(#FFFFFF, #E6A23C, 90%);
            opacity: 0.5;
          }
        }
      }
    }

    /deep/ {
      .xdh-form__body {
        padding-top: 10px;
      }

      .is-empty {
        .xdh-form__body {
          height: calc(100% - 100px);
        }
      }

      .xdh-grid__item {
        display: inline-block;
        height: 40px;
        width: 100%;
        overflow: hidden;
        padding: 0;
        margin: 0;
        background: mix(#FFFFFF, #F56C6C, 80%);

        * {
          display: none;
        }
      }

      .el-form--inline {
        .xdh-grid__item {
          width: 150px;
        }
      }

      .xdh-form-item__body {
        display: none;
        position: absolute;
        z-index: 1000;
        width: 100%;
        height: 100%;
        left: 0;
        top: -3px;
        border-radius: 4px;

      }
    }

    .mask {
      height: 100%;
    }
  }

  .handle-btns {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;

    i {
      padding: 5px 10px;
      cursor: pointer;
    }

    .el-icon-delete {
      color: #f56c6c;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .design-form {
    height: 100%;
    margin-right: 10px;
    margin-left: 10px;
  }

  .form_pc {
    width: 1000px;
    height: 700px;
    margin: 40px auto;
    overflow: hidden;
    border: 1px solid #2d8cf0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-box-shadow: 5px 10px 15px #ccc;
    -moz-box-shadow: 5px 10px 15px #ccc;
    -o-box-shadow: 5px 10px 15px #ccc;
    box-shadow: 5px 10px 15px #ccc;
    background: #ffffff !important;

    .pc_body {
      width: 1000px;
      height: 700px;
      margin: 10px 0;
      position: relative;
      padding: 20px 40px 10px 40px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
