<template>
  <div>
    <el-dialog
      title="編輯問卷"
      :visible.sync="dialogFormVisible"
      width="80%">
      <el-form ref="form"  label-width="80px">
        <el-form-item label="試題名稱">
          <el-input v-model="formData.title" placeholder="请输入试题名称" ></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formData.startTime"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="09:00:00"
          />
        </el-form-item>
        <el-form-item label="结束时间">
           <el-date-picker
            v-model="formData.endTime"
             type="datetime"
             placeholder="选择开始时间"
             value-format="yyyy-MM-dd HH:mm:ss"
             default-time="09:00:00"
           />
        </el-form-item>
        <el-form-item label="党组织">
          <el-cascader
            v-model="formData.pbOrgId"
            :options="orgTree"
            :show-all-levels="false"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default{
    name:'jiaoshouform',
    data(){
      return{
         dialogFormVisible: false,
         formData:[],
      }
    },
    props:{
      value:{
        type:Object,
        default:()=>{

        }
      },
      orgTree:{
        type:Array,
        default:()=>[]
      }
    },
    watch:{
      value:{
        handler(val){
          this. dialogFormVisible=true
          // console.log(val)
        }
      }
    }
  }
</script>

<style>
</style>
