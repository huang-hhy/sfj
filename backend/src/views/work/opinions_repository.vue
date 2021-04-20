<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>意见征集详情</span>
    </div>
    <div v-for="(item, index) in list.solicitOpinionsRepositoryList" :key="index" class="content">
      <p class="title">
        <span>{{ item.userName }}</span>
        <el-popconfirm
          title="确定删除该条评论？"
          @onConfirm="handleDelete(item.id)"
        >
          <el-button slot="reference" size="mini" type="danger">删除</el-button>
        </el-popconfirm>
      </p>
      <p class="container">{{ item.content }}</p>
      <p v-for="(i, ind) in item.uploadUrl" :key="ind" class="indent">
        <a :href="downloadUrl + '?name=' + i">{{ i }}</a>
      </p>
      <p class="indent">{{ item.createTime }}</p>
    </div>
  </el-card>
</template>

<script>
import { getSolicitOpinion, deleteRepository } from '@/api/work'
import { getUser } from '@/api/permission'
import Vue from 'vue'
import { decrypt } from '@/utils/tools'

export default {
  name: 'OpinionsRepository',
  data() {
    return {
      list: {},
      id: '',
      downloadUrl: '/api/common/download/resource'
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getList()
  },
  methods: {
    getList() {
      getSolicitOpinion({ id: this.id }).then(res => {
        if (res.code * 1 === 0) {
          this.list = res.data
          this.list.solicitOpinionsRepositoryList.forEach((item, index) => {
            this.getUserList(item.userId, index)
            item.createTime = this.$moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
            if (item.uploadUrl) {
              item.uploadUrl = item.uploadUrl.split(',')
            } else {
              item.uploadUrl = []
            }
          })
        }
      })
    },
    getUserList(id, index) {
      getUser(id).then(res => {
        if (res.code * 1 === 0) {
          res.data.userName = decrypt(res.data.userName)
          Vue.set(this.list.solicitOpinionsRepositoryList[index], 'userName', res.data.userName)
        }
      })
    },
    handleDelete(id) {
      const params = {
        ids: id
      }
      deleteRepository(params).then(res => {
        if (res.code * 1 === 0) {
          this.getList()
          this.$message.success('删除成功')
        }
      })
    }
  }
}
</script>

<style lang="less">
  .box-card {
    .content {
      .el-form-item__label {
        font-weight: normal;
      }
    }
  }
</style>

<style scoped lang="less">
  .box-card {

    .content {
      margin: 10px 0 50px;
      .title {
        font-size: 20px;
        font-weight: bold;
        color: #2d2f33;
        line-height: 20px;

        .el-button {
          margin-left: 30px;
        }
      }

      .container {
        color: #2d2f33;
        font-size: 16px;
        line-height: 20px;
        text-indent: 2em;
      }

      .indent {
        text-indent: 2em;
        color: #8c939d;
        font-size: 14px;
        line-height: 10px;
      }
    }
    /*.content {*/
    /*  margin-bottom: 50px;*/
    /*  border-bottom: #8c939d 1px dashed;*/
    /*  max-width: 1000px;*/

    /*  img {*/
    /*    width: 150px;*/
    /*    height: 150px;*/
    /*    border-radius: 8px;*/
    /*    margin-right: 10px;*/
    /*  }*/
    /*}*/
  }
</style>
