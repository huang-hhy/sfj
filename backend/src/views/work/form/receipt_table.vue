<template>
  <div>
    <el-button type="primary" size="mini" @click="addReceiptHeader">添加表头</el-button>
    <div v-for="(item,index) in value" :key="index" style="margin: 10px 0">
      <el-input v-model="item.text" type="text" style="width: 80%" />
      <el-button style="width: 10%" type="danger" size="mini" @click="delByIndex(index)">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiptTable',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      handler(val) {
      },
      deep: true
    }
  },
  methods: {
    delByIndex(index) {
      this.value.splice(index, 1)
    },
    addReceiptHeader() {
      this.value.push({
        text: ''
      })
    }
  }

}
</script>

<style scoped>

</style>
