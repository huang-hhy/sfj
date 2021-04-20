<template>
  <vue2-org-tree
    :data="data"
    :horizontal="true"
    collapsable
    @on-expand="onExpand"
    @on-node-click="NodeClick"
    :label-class-name="labelName"
  />
</template>

<script>
  import Vue from 'vue'
  import Vue2OrgTree from 'vue-tree-color'

  Vue.use(Vue2OrgTree)

  export default {
    name: 'orgs',
    props: {
      data: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        labelName: 'orange'
      }
    },
    mounted() {
      this.toggleExpand(this.data, true)
    },
    methods: {
      // labelName(e) {
      //   // const textColor = e.url ? '#d34d4d' : ''
      //   if (e.url) {
      //     return 'orange'
      //   }
      // },
      collapse(list) {
        const _this = this;
        list.forEach(function (child) {
          if (child.expand) {
            child.expand = false;
          }
          child.children && _this.collapse(child.children);
        });
      },
      onExpand(e, data) {
        if ("expand" in data) {
          data.expand = !data.expand;
          if (!data.expand && data.children) {
            this.collapse(data.children);
          }
        } else {
          this.$set(data, "expand", true);
        }
      },
      toggleExpand(data, val) {
        const _this = this;
        if (Array.isArray(data)) {
          data.forEach(function (item) {
            _this.$set(item, "expand", val);
            // if (item.children) {
            //   _this.toggleExpand(item.children, val);
            // }
          });
        } else {
          this.$set(data, "expand", val);
          if (data.children) {
            _this.toggleExpand(data.children, val);
          }
        }
      },
      NodeClick(e, data) {
        if (data.url) {
          window.open(data.url, "_black")
        }
      }
    }
  }

</script>

<style lang="less">
  .effectiveLink {
    color: #d34d4d !important;
  }

  .orange {
    color: #d34d4d;
  }
</style>
