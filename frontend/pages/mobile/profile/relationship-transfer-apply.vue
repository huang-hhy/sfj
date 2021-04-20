<template>
  <div>
    <navHeader :title="title"></navHeader>
    <div class="content">
      <van-field
        readonly
        clickable
        label="转入组织："
        :value="orgName"
        placeholder="选择转入组织"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        v-model="reason"
        rows="5"
        autosize
        label="转入原因："
        type="textarea"
        maxlength="200"
        placeholder="请输入转入原因"
        show-word-limit
      />
      <van-field
        label="图片上传："
        :border="false"
      />
      <div class="tui-box-upload">
        <div class="img-upLoad" v-for="(item,index) in imgs" :key="index">
          <img class="imgIcon" :src="attachUrl+item" alt="">
          <div class="tui-img-del" @click="deleteIcon(index)"></div>
        </div>
        <el-upload
          class="logo-uploader"
          :action="uploadPath"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img class="imgIcon" src="@/assets/mobile/profile/upload.png" alt="上传">
        </el-upload>
      </div>
    </div>
    <button class="apply">提交</button>
  </div>
</template>

<script>
  import navHeader from '@/components/mobile/layout/nav-header'
  import config from '@/config';
  import {orgList} from '@/api/mobile'

  export default {
    name: "relationship-transfer-apply",
    data() {
      return {
        headers: {},
        attachUrl: config.attachUrl,
        uploadPath: '/api/common/upload',
        title: '组织关系转接申请',
        orgName: '',
        orgId: '',
        reason: '',
        showPicker: false,
        imgs: [],
        orgLists: [],
        columns: []
      }
    },
    methods: {
      orgList() {
        orgList({}).then(res => {
          if (res.code === 0) {
            let t = []
            this.orgLists = res.data
            this.orgLists.forEach(item=>{
              t.push(item.orgName)
            })
            this.columns = t
          }
        })
      },
      handleSuccess(res) {
        if (res.code === 0) {
          this.imgs.push(res.data.url)
        }
      },
      beforeUpload() {
      },
      onConfirm(value) {
        this.orgName = value
        const index = this.orgLists.findIndex(_=>_.name===name)
        this.orgId = index !== -1 && this.orgLists[index].id ? this.orgLists[index].id : ''
        this.showPicker = false
      },
      deleteIcon(index) {
        this.imgs.splice(index, 1)
      }
    },
    mounted() {
      this.orgList()
      if (process.client) {
        this.headers = {Authorization: sessionStorage.getItem('token')}
      }
    },
    components: {
      navHeader
    }
  }
</script>

<style scoped>
  .content {
    margin: 7vh 0;
  }

  .tui-box-upload {
    margin: 0 2.6vw;
  }

  .img-upLoad {
    display: inline-block;
    position: relative;
  }

  .logo-uploader {
    display: inline-block;
  }

  .imgIcon {
    width: 18vw;
    height: 18vw;
    margin-right: 5vw;
    margin-bottom: 2vw;
  }

  .tui-img-del {
    width: 4vw;
    height: 4vw;
    position: absolute;
    right: 2vw;
    top: -1vw;
    background-color: #EB0909;
    border-radius: 50%;
    color: white;
    font-size: 3vw;
    z-index: 999;
  }

  .tui-img-del::before {
    content: '';
    width: 2vw;
    height: 2px;
    position: absolute;
    left: 1vw;
    top: 1.5vw;
    background-color: #fff;
  }

  .apply {
    width: 100%;
    background: #E43D3D;
    color: #FFFFFF;
    text-align: center;
    height: 6vh;
    line-height: 6vh;
    font-size: 2.2vh;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
