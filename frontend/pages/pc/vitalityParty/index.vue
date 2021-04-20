<template>
  <div>
    <NavBar v-model="$store.state.app.menu" :title="$store.state.app.title" :logo="$store.state.app.logo"/>
    <div class="vitalityParty">
      <div class="highlights" v-if="meetingList.length > 0">
        <mainHeader :content="hightlights"/>
        <ul class="meetingList">
          <li v-for="(item, index) in meetingList" :key="index" v-if="index< 9" @click="gotoDetail(item)">
            <el-row class="meetingItem">
              <el-col :span="20">
                <div class="meetingContent">
                  <img src="@/assets/image/point.png"/>
                  <span>{{ item.title }} - {{ item.typeName }}</span>
                  <span>{{ item.topics ? (': ' + item.topics) : '' }}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <p class="createTime">{{ moment(item.createTime * 1000).format('YYYY-MM-DD') }}</p>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <div class="partyMap" id="map">
        <mainHeader :content="partyMap"/>
        <div class="map">
          <client-only>
            <baidu-map :points="points" v-if="points.length" />
          </client-only>
        </div>
      </div>
      <div class="activityCircle" id="orgList">
        <main-header :content="activityCircle"/>
        <orgs :data="orgList" />
      </div>
    </div>
  </div>
</template>

<script>
  import {encrypt} from "../../../libs/tools";

  const orgs = require('@/utils/orgs.js')

  import NavBar from '@/components/layout-pc/common/nav-bar.vue'
  import {mapActions} from 'vuex'
  import config from '@/config'
  import mainHeader from '@/components/pc/common/mainHeader'
  import BaiduMap from '../../../components/pc/map/baidu-map'
  import {getMeetingType, getMeetingList, getHomeData} from '@/api/pc'
  import moment from 'moment'
  import Orgs from "../../../components/pc/vitalityParty/orgs";

  export default {
    name: "profile",
    middleware: 'pcUserAuth',
    components: {
      Orgs,
      BaiduMap,
      config,
      NavBar,
      mainHeader
    },
    head() {
      return {
        title: this.$store.state.app.title + ' - 活力党建'
      }
    },
    data() {
      return {
        meetingList: [],
        moment: moment,
        points: [],
        hightlights: {
          sort: '0',
          name: '活力党建',
          title: '精彩回顾',
          url: '/pc/vitalityParty/organization'
        },
        partyMap: {
          sort: '1',
          name: '活力党建',
          title: '党建地图'
        },
        activityCircle: {
          sort: '1',
          name: '活力党建',
          title: '组织架构'
        },
        orgList: orgs.orgs
      }
    },
    mounted() {
      this.setBaseInfo()
      this.setUserCenter()
      this.getMeetingList()
      this.getHomeDataList()
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'app/setBaseInfo',
        setUserCenter: 'user/setUserCenter'
      }),
      getHomeDataList() {
        getHomeData().then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data.orgs
            if(temp.length > 0) {
              this.points = []
              temp.forEach(item => {
                if (item.lng && item.lat) {
                  this.points.push({
                    id: item.id,
                    lng: item.lng * 1,
                    lat: item.lat * 1,
                    address: item.address
                  })
                }
              })
            }
          }
        })
      },
      getMeetingList() {
        getMeetingType({}, {}).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            temp.forEach(item => {
              getMeetingList({}, {meetingTypeId: item.id, status: '0'}).then(res => {
                if (res.code * 1 === 0) {
                  this.meetingList.push.apply(this.meetingList, res.data.list)
                }
              })
            })
          }
        })
      },
      gotoDetail(item) {
        let params = {
          id: item.id,
          meetingTypeId: item.meetingTypeId
        }
        params = encrypt(JSON.stringify(params))
        this.$router.push({
          path: '/pc/vitalityParty/organizationDetail',
          query: {
            params,
            name: '活力党建'
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .vitalityParty {
    width: 1000px;
    margin: 20px auto;

    .highlights {
      .meetingList {
        li {
          line-height: 40px;
          padding: 0 10px;

          .meetingItem {
            cursor: pointer;
            width: 95%;
            margin: 0 auto;

            .meetingContent {
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              overflow: hidden;
            }

            .createTime {
              text-align: right;
            }
          }

          .meetingItem:hover {
            color: #335C88;
          }
        }
      }
    }

    .partyMap {
      margin: 50px 0;

      .map {
        margin: 30px auto;
      }
    }

    .activityCircle {
      margin: 50px 0;
    }
  }
</style>

