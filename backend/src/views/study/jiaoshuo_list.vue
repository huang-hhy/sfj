<template>
  <el-card class="box-card">
    <div slot="header" class="title">
      <span>试卷管理</span>
    </div>

    <div class="list-header">
      <div class="list-header-item">
        <span class="label">日期选择</span>
        <el-date-picker style="margin-right: 50px;"
              v-model="value1"
              type="date"
              placeholder="选择日期">
         </el-date-picker>

        <el-input v-model="page.title" class="w200 content" placeholder="请输入组织名称" />
      </div>
      <el-button type="primary" class="mr8" @click="getJianShuoList">搜索</el-button>
    </div>

     <el-table

          border
         :data="tableData"
         stripe
         style="width: 100%;margin-top: 20px;">
         <el-table-column
          align="center"
           type="index"
           label="序号"
           width="80">
         </el-table-column>
         <el-table-column
         align="center"
           label="问卷调查"
           >
           <template slot-scope="scope">{{scope.row.title}}</template>
         </el-table-column>
        <el-table-column
        align="center"
          label="开始时间"
          width="180">
          <template slot-scope="scope">{{ $moment(scope.row.startTime * 1000).format('YYYY-MM-DD HH:mm') }}</template>
        </el-table-column>
        <el-table-column
        align="center"
          label="结束时间"
          width="180">
          <template slot-scope="scope">{{ $moment(scope.row.endTime * 1000).format('YYYY-MM-DD HH:mm') }}</template>
        </el-table-column>
        <el-table-column
        align="center"
          label="类型"
          width="180">
          <template slot-scope="scope">{{ scope.row.paperTypeId*1 === 1 ? '在线考试':scope.row.paperTypeId*1 === 2 ? '调查问卷' : '民主评议' }}</template>
        </el-table-column>
        <el-table-column
        align="center"
          label="状态"
          width="180">
          <template slot-scope="scope">{{ scope.row.status === '0' ? '正常':'停用' }}</template>
        </el-table-column>
        <el-table-column
        align="center"
          label="操作"
         >
          <template slot-scope="scope">
              <el-button type="primary" size="mini">查看统计</el-button>
              <el-button type="success" size="mini" @click="eidt">编辑</el-button>
              <el-button type="info" size="mini">删除</el-button>
          </template>
        </el-table-column>
       </el-table>
      <div style="width: 800px;margin: 0 auto;">
        <editor-bar v-model="formData.literature" is-clear:false />
      </div>


      <jiaoshouform v-model="item" :org-tree="orgTree"></jiaoshouform>

  </el-card>
</template>

<script>
  import {getExamList} from '@/api/study'
  import {queryOrgTree} from '@/api/permission'
  import EditorBar from '@/components/WangEditor'
  import jiaoshouform from "./form/jiaoshouform.vue"

  export default{
    name:'jiaoshuo',
    components:{
      EditorBar,
      jiaoshouform
    },
    data(){
      return{
        item:{
          refresh: false,
          id: ''
        },
        value1:'',
        orgTree:[],
         pickerOptions: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
      page:{
        current: 1,
        limit: 10,
        total: 0,
        title: '',
        paperTypeId: '2'
      },
      tableData:[],
      formData: {
        literature: '',
      }
    }
  },
  mounted(){
    this.getJianShuoList()
    this.getOrgTree()
  },
  methods:{
    getJianShuoList(){
       const { current: pageNum, limit: pageSize, title, paperTypeId } = this.page
       getExamList({pageNum,pageSize},{title,paperTypeId}).then(res =>{
         if(res.code === 0){
           // console.log(res)
           this.tableData=res.data.list
         }
       })
    },

    //显示对话框
    eidt(){
      this.item={
        id: '',
        refresh: !this.item.refresh
      }
    },

    //获取级联数据
    getOrgTree(){
      const data = {pageNum:1,pageSize:999}
      queryOrgTree(data).then(res=>{
        if(res.code === 0){
          // console.log(res)
          this.orgTree=res.data
        }
      })
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        if (this.formData.audioUrl && JSON.parse(this.formData.audioUrl)) {
          this.$set(this, 'audioFileList', JSON.parse(this.formData.audioUrl))
        }
        if (this.formData.content && JSON.parse(this.formData.content)) {
          this.$set(this, 'contentFileList', JSON.parse(this.formData.content))
        }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
 }
</script>

<style>
</style>
