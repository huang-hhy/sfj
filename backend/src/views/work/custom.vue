<template>
  <XdhLayout fixed :west.sync="west" :east.sync="east">
    <div class="body">
      <markers />
    </div>
    <div slot="west" class="west">
      <ComponentList />
    </div>
    <div slot="east" class="east">
      <SettingPanel />
    </div>
  </XdhLayout>
</template>

<script>
import XdhLayout from '@/components/custom-form/form/xdh-layout'
import ComponentList from '@/components/custom-form/template/component-list'
import SettingPanel from '@/components/custom-form/template/setting-panel'
import markers from '@/components/custom-form/template/markers'
import { mapState } from 'vuex'
import propsLib from '@/components/custom-form/setting/props'
import { getForms } from '@/components/custom-form/utils/storage'
export default {
  components: {
    XdhLayout,
    ComponentList,
    SettingPanel,
    markers
  },
  data() {
    return {
      west: {
        width: '290px',
        collaspedSize: '0',
        split: true
      },
      east: {
        width: '350px',
        collaspedSize: '0',
        split: true
      }
    }
  },
  computed: {
    ...mapState({
      form: state => state.formModel,
      fields: state => state.fields
    })
  },
  watch: {
    form() {
      this.save()
    },
    fields() {
      this.save()
    }
  },
  created() {
    const id = this.$route.params.id
    if (id) {
      const model = getForms(id)
      this.$store.commit('setFields', model.fields || [])
    }
    this.$store.commit('setProps', propsLib)
  }
}
</script>

<style lang="scss" scoped>
  .xdh-layout {
    background: #F5F7FA;
    height: 1000px;
    width: 100%;
  }

  .body {
    padding: 10px;
    margin: 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    position: absolute;
    box-sizing: border-box;
    background-color: #ffffff;
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px;
    background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(0,0,0,0.05)' stroke-width='0.5'/%3E%3C/pattern%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='url(%23smallGrid)'/%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(0,0,0,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E");
  }

  .container {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  .west, .east {
    /*background: #ecf5ff;*/
    background: #ffffff;
    height: 100%;
    overflow: auto;
    position: absolute;
    width: 100%;
    /*border: 1px solid #000;*/
  }

  .west {
    padding-right: 10px;
    overflow: hidden;
  }

  .tabs {
    /deep/ {
      .el-tabs__header {

      }
    }
  }
</style>
