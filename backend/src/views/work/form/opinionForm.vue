<template>
  <div>
    <el-dialog
      :title="list.id ? '编辑意见征集详情' : '新增意见征集'"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-form
        ref="opinionForm"
        :model="list"
        :rules="opinionRules"
        label-width="90px"
        class="opinionForm"
      >
        <el-form-item label="征集组织" prop="orgName">
          <el-select v-model="list.orgId" class="w240" clearable filterable placeholder="请选择征集组织">
            <el-option
              v-for="item in orgList"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="征集标题" prop="title">
          <el-input v-model="list.title" class="w240" placeholder="请输入征集意见的标题" />
        </el-form-item>
        <el-form-item label="发布时间" prop="publicTime">
          <el-date-picker
            v-model="list.publicTime"
            type="datetime"
            placeholder="请选择发布时间"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="征集内容" prop="content">
          <vue-ueditor-wrap
            v-model="list.content"
            :config="myConfig"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel('opinionForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit('opinionForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="查看评论详情"
      :visible.sync="dialogFormVisible2"
      :show-close="false"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-form
        ref="opinions"
        :model="list"
        label-width="80px"
        class="opinionForm"
      >
        <div v-for="(item, index) in list.solicitOpinionsRepositoryList" :key="index">
          <div :class="index === list.solicitOpinionsRepositoryList.length - 1 ? 'opinion' : 'borderOpinion opinion'">
            <el-row>
              <el-col :span="12">
                <el-form-item label="建议人">
                  <el-input v-model="item.userName" class="w240" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建议时间">
                  <el-date-picker
                    v-model="item.createTime"
                    type="datetime"
                    style="width: 240px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="附件">
              <img
                v-for="(i, ind) in item.uploadUrl"
                :key="ind"
                :src="$config.downloadPath + i"
              >
            </el-form-item>
            <el-form-item label="建议内容">
              <el-input v-model="item.content" type="textarea" :rows="5" />
            </el-form-item>
            <el-popconfirm
              title="确定删除此条建议？"
              @onConfirm="handleDelete(item.id)"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryOrg, getUser } from '@/api/permission'
import { deleteRepository } from '@/api/work'
import Vue from 'vue'
import { decrypt } from '@/utils/tools'
import moment from 'moment'

export default {
  name: 'OpinionForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      list: {},
      opinionRules: {},
      orgList: [],
      moment: moment,
      myConfig: {
        // 编辑器不自动被内容撑高
        // autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 600,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
        // serverUrl: 'http://35.201.165.105:8000/controller.php',
        serverUrl: '/api//common/upload',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.list = JSON.parse(JSON.stringify(val))
        this.list.solicitOpinionsRepositoryList.forEach((item, index) => {
          item.createTime = this.moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          if (item.uploadUrl) {
            item.uploadUrl = item.uploadUrl.split(',')
          } else {
            item.uploadUrl = []
          }
          this.getUserList(item.userId, index)
          console.log(item)
        })
        if (this.list.dialog === '1') {
          this.dialogFormVisible = true
        } else if (this.list.dialog === '2') {
          this.dialogFormVisible2 = true
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      queryOrg({ orgName: '' }).then(res => {
        if (res.code * 1 === 0) {
          this.orgList = res.data
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
          this.$message.success('删除建议成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.list.publicTime = new Date(this.list.publicTime).getTime() / 1000 + ''
      Vue.delete(this.list, 'refresh')
      Vue.set(this.list, 'functionType', '0')
      this.orgList.forEach(item => {
        if (item.id === this.list.orgId) {
          Vue.set(this.list, 'orgName', item.orgName)
        }
      })
      const data = JSON.parse(JSON.stringify(this.list))
      console.log(data)
      // this.$emit('doSubmit', data)
      this.handleCancel(name)
    }
  }
}
</script>

<style lang="less">
  .opinionForm {
    max-height: 500px;
    overflow: auto;
    .el-form-item__label {
      font-weight: normal;
    }

    .opinion {
      overflow: hidden;

      img {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        margin: 0 10px;
      }

      .el-button {
        float: right;
      }
    }

    .borderOpinion {
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: #8c939d 1px dashed;
    }
  }

  .opinionForm::-webkit-scrollbar {
    width: 2px;
  }
  #edui_fixedlayer{
    z-index: 9999 !important;
  }
  .v-modal {
    z-index: 1 !important;
  }
</style>
