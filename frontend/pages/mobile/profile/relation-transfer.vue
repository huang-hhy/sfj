<template>
  <div>
    <nav-header :title="title"></nav-header>
    <form>
      <ul class="appointment_item">
        <li><label>姓名</label><input v-model="$store.state.user.userName" type="text" placeholder=" "/></li>
        <li><label>转出组织</label><input v-model="$store.state.user.orgName" type="text" placeholder="从原组织转出"/></li>
        <li><label>接收党委</label>
          <el-select v-model="receive" placeholder="请选择接收党委">
            <el-option v-for="(item,index) in orgList" :key="item.id" :label="item.orgName" :value="item.id"
                       @click.native="changeOrg(item.id)">
              {{ item.orgName }}
            </el-option>
          </el-select>
        </li>
        <li><label>转接说明</label>
          <el-input
            type="textarea"
            placeholder="请输入调动原因,不超过200字"
            rows='4' cols='50'
            maxlength="200"
            v-model="content">
          </el-input>
          <p class="note">注：如需上传附件，请在pc端执行操作</p>
        </li>
        <!--        <li><label>党费缴至</label><input v-model="time" type="date" placeholder=" "/></li>-->
      </ul>
    </form>
    <div class="appointment_btn  fr" v-show="btn==1">
      <!--      <button class="reset" v-on:click="rest()">重置</button>-->
      <button class="release fr" type="submit" @click="gotoFom()">提交申请</button>
    </div>
    <div class="appointment_btn  fr"  v-show="btn==0">
      <button class="release fr" type="submit" @click="gotoModify()">提交修改</button>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import {setRelation, getOrgList, getRelationDetail, modifyRelation} from "@/api/mobile"

export default {
  name: "relation-transfer",
  components: {NavHeader},
  props: {
    title: {
      type: String,
      default: '关系转接申请'
    }
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 关系转接申请',
      meta: [
        {
          hid: this.$store.state.app.title,
          name: this.$store.state.app.title,
          content: this.$store.state.app.title
        }
      ]
    }
  },
  data() {
    return {
      id:'',
      btn: {},
      receive: '其他',
      type: '类型1',
      time: '',
      orgList: [],
      futureOrgId: '',
      content: ''
    }
  },
  mounted() {
    this.getOrgInfo()
    let {id} = this.$route.query
    this.btn =this.$route.query.btn
    console.log(this.btn)
    this.getRelationInfo(id)
  },
  methods: {
    changeOrg(e) {
      this.futureOrgId = e
      console.log(this.futureOrgId)
      console.log(e)
    },
    gotoFom() {
      let data = {
        futureOrgId: this.futureOrgId,
        content: this.content,
        annexUrl: ''
      }
      console.log(data)
      this.setRelationInfo(data)
    },
    gotoModify(){
      let data ={
        id:this.id,
        content:this.content,
        annexUrl:'',
        futureOrgId:this.futureOrgId
      }
      console.log(data)
      this.modifyInfo(data)
    },
    // 清空
    rest: function () {
      this.receive = "",
        this.content = ""
    },
    //新增关系转接接口
    setRelationInfo(data) {
      setRelation(data).then(res => {
        if (res.code * 1 === 0) {
          console.log(res)
          this.$toast('提交成功')
          this.rest()
          this.$router.push({path:'/mobile/profile/relation'})
        } else {
          console.log(res)
          this.$toast(res.msg)
        }
      })
    },

    //修改关系转接接口
    modifyInfo(data){
      modifyRelation(data).then(res =>{
        if (res.code * 1 === 0) {
          console.log(res)
          this.$toast('提交成功')
          this.$router.push({path:'/mobile/profile/relation'})
        }else {
          console.log(res)
          this.$toast(res.msg)
        }
      })
    },

    // 关系转接详情
    getRelationInfo(id){
      getRelationDetail(id).then(res =>{
        if (res.code * 1 === 0) {
          this.content = res.data.content
          this.receive = res.data.futureOrgName
          this.futureOrgId = res.data.futureOrgId
          this.id =res.data.id
          console.log(res)
        }
      })
    },

    //查询组织列表
    getOrgInfo() {
      getOrgList({}).then(res => {
        if (res.code * 1 === 0) {
          this.orgList = res.data
          console.log(this.orgList)
        }
      })
    }
  },

}
</script>

<style scoped lang="less">

.appointment_item {
  background: #ffffff;
  overflow: auto;
  margin-top: 7vh;

  li {
    padding: 2.8vw 0;
    margin: 0 5vw;
    border-bottom: 1px solid #EEEEEE;
    font-size: 4vw;
  }

  label {
    padding-right: 2vw;
  }

  input {
    padding: 4vw 0vw;
    font-size: 4vw;
    color: #666666;
  }

  input[type="date"] {
    color: #bcbcbc;
    padding-left: 10px;
    background-color: #ffffff;
  }

  input::-webkit-input-placeholder {
    color: #cccccc;
    font-size: 4vw;
  }

}

.appointment_btn {
  width: 100%;
  position: fixed;
  bottom: 3vh;
  right: 25%;

  button {
    width: 50%;
    height: 7vh;
    font-size: 2.4vh;
    display: inline-block;
  }

  .release {
    border-top: 1px solid #F44436;
    background: #F44436;
    color: #ffffff;
    border-radius: 4px;
  }

  .reset {
    border-top: 1px solid #EEEEEE;
    background: #ffffff;
    color: #F44436;
  }
}

.note {
  font-size: 1.8vh;
  color: #bcbcbc;
  padding: 1vh;
}

</style>
