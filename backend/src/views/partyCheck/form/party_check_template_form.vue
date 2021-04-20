<template>
  <div class="main">
    <el-card class="box-card">
      <h2>体检表模板</h2>
      <div class="btn-group" />
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <div class="head-form">
          <el-form-item label="体检名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="体检类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option label="年中体检" value="1" />
              <el-option label="年度体检" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围" prop="name">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              :default-time="['00:00:00', '23:59:59']"
            />
          </el-form-item>
        </div>
        <div class="partycheck-main">
          <el-button type="primary" @click="projectFlag=true">添加项目</el-button>
          <div v-for="(item,index) in partySpiritProjectList" :key="index" class="project-box">
            <div class="list-tit">
              <h3>{{ item.name }}</h3>
              <el-button type="primary" size="small" class="addSubject" @click="addSubject(index)">添加题目</el-button>
            </div>
            <template v-if="item.partySpiritSubjectList">
              <div v-for="(item2,index2) in item.partySpiritSubjectList" :key="index2" class="subject-box">
                <div class="subject-text">{{ index2 + 1 }}.{{ item2.subject }}({{ item2.subjectScore }}分)
                  <el-button type="primary" style="vertical-align: top" size="mini" @click="editSubject(index2,index)">编辑题目</el-button>
                  <el-button type="danger" style="vertical-align: top" size="mini" @click="delSubject(index2,index)">删除题目</el-button>
                </div>

                <template v-if="item2.partySpiritAnswerList">
                  <div v-for="(item3,index3) in item2.partySpiritAnswerList" :key="index3" style="display: flex">
                    <div class="answer-text">{{ item3.answerKey }}.{{ item3.answerValue }}（{{
                      item3.answerScore
                    }}分）
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>

      </el-form>
    </el-card>
    <div class="bottom-btn">
      <div class="bottom-box">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button type="success" @click="publish()">发布</el-button>
        <el-button type="danger" @click="cancel()">取消</el-button>
      </div>
    </div>

    <el-dialog
      title="选择党性体检项目"
      :visible.sync="projectFlag"
      width="30%"
    >
      <el-select v-model="selectedProject" placeholder="请选择">
        <el-option v-for="(item,index) in projectList" :key="item.id" :label="item.name" :value="index+1" />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectFlag = false">取 消</el-button>
        <el-button
          :disabled="selectedProject?false:true"
          type="primary"
          @click="submitProject(selectedProject)"
        >确 定</el-button>
      </span>
    </el-dialog>

    <publish-form
      v-model="dialogFormVisible"
      :org-arr="orgArr"
      @publishFormClose="publishFormClose"
      @publishSubmit="publishSubmit"
    />

    <el-dialog
      title="添加题目"
      :visible.sync="subjectFlag"
      width="50%"
    >
      <el-form ref="subjectForm" :model="subject" :rules="rules" label-width="120px">
        <el-form-item label="题目名称" prop="name">
          <el-input v-model="subject.subject" />
        </el-form-item>
        <el-form-item label="题目分值" prop="name">
          <el-input-number v-model="subject.subjectScore" :min="0" />
        </el-form-item>
        <el-button type="primary" plain @click="addAnswer">添加选项</el-button>
        <div class="answerArea">
          <div v-for="(item,index) in answerList" :key="index" class="item">
            <div class="answerKey">{{ alphaArr[index] }}.</div>
            <div class="answerName">
              <el-input v-model="item.answerValue" />
            </div>
            <div class="answerScore">
              <el-input-number v-model="item.answerScore" :min="0" />
            </div>
            <div class="delAnswer">
              <el-button type="danger" icon="el-icon-delete" circle @click="delAnswer(index)" />
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subjectFlag = false">取 消</el-button>
        <el-button type="primary" @click="subjectSubmit(subjectStatus)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryOrgTree } from '@/api/permission'
import { uniqueByKey, alphaArr } from '@/utils/tools'
import {
  partySpiritClassificationQuery,
  partySpiritSaveTemplate,
  partySpiritGetTemplateById,
  partySpiritUpdateTemplate,
  partySpiritDeleteSubject,
  partySpiritDeleteAnswer,
  partySpiritRelease
} from '@/api/partyCheck'
import publishForm from '@/views/partyCheck/form/dialog/publishForm'
import { closeCurTag } from '@/layout/components/TagsView/closeCurTag'

export default {
  name: 'PartyCheckTemplateAdd',
  components: {
    publishForm
  },
  data() {
    return {
      projectFlag: false,
      subjectFlag: false,
      projectList: [],
      subjectList: [],
      answerList: [],
      selectedProject: '',
      partySpiritProjectList: [],
      partySpiritSubjectList: [],
      subject: {},
      projectIndex: 0, // 当前选中索引项
      subjectIndex: 0, // 当前选中索引项
      subjectStatus: 'add',
      dialogFormVisible: false,
      btnDisabled: true,
      form: {
        id: '',
        name: '',
        date: [],
        type: ''
      },
      rules: {},
      publishObj: {},
      orgArr: [],
      curOrg: '',
      memberData: [],
      publishRules: {},
      alphaArr: [],
      partySpiritData: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getDataById()
    }
  },
  mounted() {
    this.getOrgTree()
    this.projectQuery()
    this.alphaArr = alphaArr
  },
  methods: {
    publishFormClose(val) {
      this.dialogFormVisible = val
    },
    projectQuery() {
      partySpiritClassificationQuery({
        pageNum: 1,
        pageSize: 999
      }).then(res => {
        if (res.code * 1 === 0) {
          this.projectList = res.data.list
        } else {
          this.$message.error('网络连接失败')
        }
      })
    },
    submitProject(index) {
      index = index - 1
      const id = this.projectList[index].id
      for (let i = 0; i < this.partySpiritProjectList.length; i++) {
        if (this.partySpiritProjectList[i].id === id) {
          this.$message.warning('已存在，请勿重复选择')
          return
        }
      }
      this.partySpiritProjectList.push(
        this.projectList[index]
      )
      this.projectFlag = false
    },
    addSubject(index) {
      this.subjectFlag = true
      this.projectIndex = index
      this.subjectStatus = 'add'
    },
    subjectSubmit(subjectStatus) {
      const subject = JSON.parse(JSON.stringify(this.subject))
      const answerList = JSON.parse(JSON.stringify(this.answerList))
      const projectIndex = this.projectIndex
      const subjectIndex = this.subjectIndex
      subject.partySpiritAnswerList = answerList
      if (!this.partySpiritProjectList[projectIndex]['partySpiritSubjectList']) {
        this.partySpiritProjectList[projectIndex]['partySpiritSubjectList'] = []
      }
      if (subjectStatus === 'edit') {
        this.partySpiritProjectList[projectIndex]['partySpiritSubjectList'][subjectIndex] = subject
      } else {
        this.partySpiritProjectList[projectIndex]['partySpiritSubjectList'].push(subject)
      }
      this.subject = {}
      this.answerList = []
      this.subjectFlag = false
    },
    editSubject(subjectIndex, projectIndex) {
      this.subjectIndex = subjectIndex
      this.projectIndex = projectIndex
      this.subjectStatus = 'edit'
      const partySpiritProjectList = JSON.parse(JSON.stringify(this.partySpiritProjectList))
      this.subject = partySpiritProjectList[projectIndex]['partySpiritSubjectList'][subjectIndex]
      this.answerList = partySpiritProjectList[projectIndex]['partySpiritSubjectList'][subjectIndex]['partySpiritAnswerList']
      this.subjectFlag = true
    },
    delSubject(subjectIndex, projectIndex) {
      const partySpiritProjectList = JSON.parse(JSON.stringify(this.partySpiritProjectList))
      if (partySpiritProjectList[projectIndex]['partySpiritSubjectList'][subjectIndex]['id']) {
        partySpiritDeleteSubject(partySpiritProjectList[projectIndex]['partySpiritSubjectList'][subjectIndex]['id']).then(res => {
          if (res.code * 1 === 0) {
            this.getDataById()
          } else {
            this.$message.error('删除失败')
          }
        })
      } else {
        partySpiritProjectList[projectIndex]['partySpiritSubjectList'].splice(subjectIndex, 1)
        this.partySpiritProjectList = partySpiritProjectList
      }
    },
    addAnswer() {
      const len = this.answerList.length
      if (len < 26) {
        this.answerList.push({
          id: '',
          answerValue: '',
          answerScore: 0,
          answerKey: alphaArr[len]
        })
      } else {
        this.$message.warning('无法添加更多选项')
      }
    },
    delAnswer(index) {
      if (this.answerList[index]['id']) {
        partySpiritDeleteAnswer(this.answerList[index]['id']).then(res => {
          if (res.code * 1 === 0) {
            this.getDataById()
          } else {
            this.$message.error('删除失败')
          }
        })
      }
      this.answerList.splice(index, 1)
    },
    cancel() {
      closeCurTag.$emit('route', this.$route)
    },
    publish() {
      this.$set(this, 'dialogFormVisible', true)
    },
    handleSubmit() {
      const partySpiritProjectList = JSON.parse(JSON.stringify(this.partySpiritProjectList))
      const partySpiritSubjectList = []
      partySpiritProjectList.forEach((item, index) => {
        for (let i = 0; i < item.partySpiritSubjectList.length; i++) {
          const tmp = JSON.parse(JSON.stringify(item))
          delete tmp.partySpiritSubjectList
          item.partySpiritSubjectList[i].classificationId = tmp.id
          partySpiritSubjectList.push(item.partySpiritSubjectList[i])
        }
      })
      const sendObj = {
        beginTime: this.form.date[0],
        endTime: this.form.date[1],
        templateType: this.form.type,
        templateTitle: this.form.name,
        orgId: this.$store.state.user.orgId,
        partySpiritSubjectList: partySpiritSubjectList
      }
      if (this.$route.query.id) { // 更新
        sendObj.id = this.$route.query.id
        partySpiritUpdateTemplate(sendObj).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功')
            this.cancel()
          } else {
            this.$message.error('网络连接失败')
          }
        })
      } else { // 新增
        partySpiritSaveTemplate(sendObj).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功')
            this.cancel()
          } else {
            this.$message.error('网络连接失败')
          }
        })
      }
    },
    publishSubmit(obj) {
      const partySpiritProjectList = JSON.parse(JSON.stringify(this.partySpiritProjectList))
      const partySpiritSubjectList = []
      partySpiritProjectList.forEach((item, index) => {
        for (let i = 0; i < item.partySpiritSubjectList.length; i++) {
          const tmp = JSON.parse(JSON.stringify(item))
          delete tmp.partySpiritSubjectList
          item.partySpiritSubjectList[i].classificationId = tmp.id
          partySpiritSubjectList.push(item.partySpiritSubjectList[i])
        }
      })
      partySpiritSubjectList.forEach(item => {
        delete item.id
        delete item.partySpiritClassification
        item.partySpiritAnswerList.forEach(val => {
          delete val.id
        })
      })
      console.log(partySpiritSubjectList)
      const sendObj = {
        partySpiritManage: {
          beginTime: this.form.date[0],
          endTime: this.form.date[1],
          templateType: this.form.type,
          templateTitle: this.form.name,
          orgId: this.$store.state.user.orgId
        },
        partySpiritSubjectList: partySpiritSubjectList
      }
      if (obj.releaseRole) {
        sendObj.partySpiritManage.releaseRole = obj.releaseRole
      }
      if (obj.releaseOrg) {
        sendObj.partySpiritManage.releaseOrg = obj.releaseOrg
      }
      if (obj.releaseUser) {
        sendObj.partySpiritManage.releaseUser = obj.releaseUser
      }
      console.log(sendObj)
      partySpiritRelease(sendObj).then(res => {
        if (res.code * 1 === 0) {
          this.$message.success('操作成功')
          this.cancel()
        } else {
          this.$message.error('网络连接失败')
        }
      })
    },
    getOrgTree() {
      const data = { pageNum: 1, pageSize: 9999 }
      queryOrgTree(data).then(res => {
        if (res.code === 0) {
          this.orgArr = res.data
        } else {
          this.$message.error('网络连接失败')
        }
      })
    },
    getDataById() {
      partySpiritGetTemplateById(this.$route.query.id).then(res => {
        if (res.code * 1 === 0) {
          this.partySpiritData = res.data
          const arr = res.data.partySpiritSubjectList
          let partySpiritProjectList = []
          for (let i = 0; i < arr.length; i++) {
            partySpiritProjectList.push(arr[i].partySpiritClassification)
          }
          partySpiritProjectList = uniqueByKey(partySpiritProjectList, 'id')
          const newArr = partySpiritProjectList.map(item => {
            const tmp = JSON.parse(JSON.stringify(item))
            tmp.partySpiritSubjectList = arr.filter(item2 => {
              return item2.classificationId === item.id
            })
            return tmp
          })
          this.partySpiritProjectList = newArr
          this.form = {
            id: res.data.id,
            name: res.data.templateTitle,
            date: [res.data.beginTime, res.data.endTime],
            type: res.data.templateType.toString()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.main {
}

.btn-group {
  /*display: inline-block;*/
  text-align: right;
}

.box-card {
  margin: 15px;
  overflow: auto;
  background: #fcfcfc;
  padding-bottom: 20vh;
}

h2 {
  display: inline-block;
  text-align: center;
}

.head-form {
  display: inline-block;
  margin: 0 25%;
  height: 160px;
  width: 50%;
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fcfcfc;
  height: 65px;
  padding: 15px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.bottom-box {
  width: 50%;
  margin-left: 20%;
}

.bottom-btn .el-button {
  font-size: 17px;
}

.el-dialog__wrapper {
  /*top: 5%;*/
}

h3 {
  cursor: pointer;
  font-size: 24px;
}
.partycheck-main{
}
.partycheck-main .list-tit {
  position: relative;
  border-bottom: 1px solid #000;
  height: 36px;
  padding: 0 0 10px 10px;
}
.project-box{
  margin: 40px 0;
}

.answerArea {

}

.answerArea .item {
  display: flex;
  height: 60px;
  line-height: 60px;
}

.answerArea .item .answerKey {
  font-size: 20px;
  font-weight: 600;
  width: 5%;
}

.answerKey, .answerName, .answerScore {
  margin: 0 2%;
}

.answerName {
  width: 60%;
}

.subject-text {
  margin: 1% 0 0 2%;
  font-weight: 600;
  font-size: 22px;
  height: 29px;
  line-height: 29px;
}

.answer-text {
  margin: 10px 2% 10px 4%;
}
.addSubject{
  position: absolute;
  top: -6px;
  right: 0;
}
</style>
