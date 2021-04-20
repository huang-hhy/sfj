<template>
  <div class="box">
    <nav-header :title="title"></nav-header>
    <div class="card">
      <span :class="{attend:true,active:this.type==1}" @click="changeType('attend',1)">已审批</span>
      <span :class="{no_attend:true,active:this.type==2}" @click="changeType('no-attend',2)">未审批</span>
    </div>
      <ul v-for="(item,index) in applyList" :key="index" v-show="item.status==1 &&changeShowType == 'attend'">
        <li class="appointment_item">
         <div>
           <span>原组织：{{item.pastOrgName}}</span>
           <span>新组织：{{item.futureOrgName}}</span>
           <span>转接说明：{{item.content}}</span>
           <span>调动人：{{item.userName}}</span>
           <span>更新时间：{{item.updateTime}}</span>
           <span>创建时间：{{item.createTime}}</span>
           <span>转接状态：{{item.status==0?'待审核':item.status==1?'已通过':''}}</span>
         </div>
        </li>
      </ul>
    <div>
    <ul v-for="(item2,index2) in applyList" :key="index2" v-show="item2.status==0 &&changeShowType == 'no-attend'">
      <li class="appointment_item" @click="modify(item2.id)">
        <div>
          <span>原组织：{{item2.pastOrgName}}</span>
          <span>新组织：{{item2.futureOrgName}}</span>
          <span>转接说明：{{item2.content}}</span>
          <span>调动人：{{item2.userName}}</span>
          <span>更新时间：{{item2.updateTime}}</span>
          <span>创建时间：{{item2.createTime}}</span>
          <span>转接状态：{{item2.status==0?'待审核':item2.status==1?'已通过':''}}</span>
        </div>
      </li>
    </ul>
    </div>


    <div class="appointment_btn">
      <button @click="$router.push({path:'/mobile/profile/relation-transfer',query:{btn:'1'}})" class="release fr">我要申请</button>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/mobile/layout/nav-header";
import {getRelationList,getRelationDetail} from '@/api/mobile';
import { decrypt } from '@/libs/tools'
export default {
name: "relation",
  components: {NavHeader},
  methods: {
    modify(id){
      console.log('修改')
      this.$router.push({path:'/mobile/profile/relation-transfer',query:{id:id,btn:'0'} })
      console.log('传递的id')
      console.log(id)
    },
    changeType(name,type){
      this.changeShowType = name
      this.type = type
    },
    getRelation(){
      //查询关系转接信息列表
      getRelationList({}).then(res =>{
        if (res.code * 1 === 0) {
          this.applyList = res.data.list
          for (var i = 0; i < res.data.list.length; i++) {
            res.data.list[i].updateTime = this.$op.moment(res.data.list[i].updateTime * 1000).format('YYYY-MM-DD HH:MM:SS')
            res.data.list[i].createTime = this.$op.moment(res.data.list[i].createTime * 1000).format('YYYY-MM-DD HH:MM:SS')
            res.data.list[i].userName =decrypt(res.data.list[i].userName ,"abcdef0123456789")
          }
          console.log(this.applyList)
        }
      })
    },
    // 关系转接详情
    getRelationInfo(){
      getRelationDetail().then(res =>{
        if (res.code * 1 === 0) {
          console.log(res)
        }
      })
    }
  },
  mounted() {
    this.getRelation()
  },
  head() {
    return {
      title: this.$store.state.app.title + '- 关系转接',
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
      type: '1',
      changeShowType: 'attend',
      title: '关系转接',
      applyList: [
        {name: '转出党组织'},
        {name: '接收党工委'},
        {name: '转接类型分类'},
        {name: '党费交至年月'},
        {name: '申请日期'},
        {name: '当前审批组织'},
        {name: '转接状态'},
      ]
    }
  },
}
</script>

<style scoped lang="less">
.box{
  margin-top: 7vh;
}
.appointment_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 25%;

  button {
    width: 50%;
    height: 7vh;
    font-size: 2.4vh;
    display: inline-block;
  }

  .draft {
    border-top: 1px solid #EEEEEE;
    background: #ffffff;
    color: #F44436;
  }

  .release {
    border-top: 1px solid #F44436;
    background: #F44436;
    color: #ffffff;
    border-radius: 4px;
  }
}
.appointment_item {
  padding: 2.8vw 0;
  margin: 0 5vw;
  background: #ffffff;
  overflow: auto;
  border-bottom: 1px solid #EEEEEE;
  font-size: 4vw;
}
.card {
  display: flex;
  text-align: center;

  span {
    display: inline-block;
    width: 50%;
    font-size: 2vh;
    height: 4.8vh;
    line-height: 5vh;
    background: #ffffff;
    color: #F44436;
  }

  .attend {
  }

  .no_attend {
  }
  .active {
    background: #F44436;
    color: #ffffff;
  }
}
</style>
