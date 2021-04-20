<template>
  <vue2-org-tree
    :data="data"
    :horizontal="true"
    collapsable
    @on-expand="onExpand"

  />
</template>

<script>
  import Vue from 'vue'
  import Vue2OrgTree from 'vue-tree-color'
  import { getOrganization } from '@/api/pc'
  Vue.use(Vue2OrgTree)

  export default{
    name:'orgs',
    data(){
      return{
        hhy:[],
        data:{
          id:'1',
          label:'众拓计算机科技有限公司',
          children:[

          ]
        },
      }
    },
    mounted(){
      this.toggleExpand(this.data,true)
      this.getOrganizationChart()
      this.data.children=this.hhy
    },
    methods:{
      collapse(list) {
         var _this = this;
          list.forEach(function(child) {
              if (child.expand) {
                child.expand = false;
              }
              child.children && _this.collapse(child.children);
      	});
      },


      onExpand(e,data) {
          if ("expand" in data) {
             data.expand = !data.expand;
          	if (!data.expand && data.children) {
             		this.collapse(data.children);
          	}
          } else {
              this.$set(data, "expand", true);
          }
      },


      toggleExpand(data, val) {
          var _this = this;
          if (Array.isArray(data)) {
              data.forEach(function(item) {
                _this.$set(item, "expand", val);
                if (item.children) {
                  _this.toggleExpand(item.children, val);
                }
            	});
          } else {
              this.$set(data, "expand", val);
              if (data.children) {
                _this.toggleExpand(data.children, val);
              }
          }
      },

      //获取组织架构树数据
      getOrganizationChart(){
        getOrganization().then(res =>{
         for(let i=0;i<res.data.length;i++){
           if(i==0){
             // this.datas={
             //   id:res.data[i].id,
             //   label:res.data[i].label
             // }
           }else{
             // this.datas.children
             // {
             //   id:res.data[i].id,
             //   label:res.data[i].label
             // }
             this.hhy.push(res.data[i])
           }
         }

        })
      },

    }
  }
</script>

<style>
  .org-tree-node-children{
    overflow: hidden;
  }
  /* .org-tree-node-label */
  .org-tree-node-label-inner{
    height: 120px;
    line-height: 100px;
    background-color: white;
    box-shadow: darkgray 7px 10px 20px 5px;
  }
  /* .org-tree-node-label-inner */

  .horizontal .org-tree-node{
    /* box-shadow: darkgray 7px 10px 20px 5px; */
    margin-bottom: 50px;

  }


  .org-tree-node-label-inner{
    font-size: 50px;
  }
  .org-tree-node-label-inner{
    font-size: 50px;
  }
  .org-tree-node-btn{
    width: 200px;
    height: 100px;
  }
</style>
