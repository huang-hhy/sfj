<template>
  <div>
    <navHeader :title="title"></navHeader>
    <meetingInfo :info="info"></meetingInfo>
  </div>
</template>

<script>

  import navHeader from '@/components/mobile/layout/nav-header'
  import meetingInfo from "@/components/mobile/meeting/meeting-info";

  export default {
    data() {
      return {
        title: '会议信息',
        info: []
      }
    },
    mounted() {
      this.info = [
        {
          type: '待参加',
          infoList: [
            {id: 1, month: '20-10', day: '20', week: '星期一', name: '10月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
            {id: 2, month: '20-09', day: '20', week: '星期三', name: '9月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
            {id: 3, month: '20-08', day: '20', week: '星期四', name: '8月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
          ]
        },
        {
          type: '已结束',
          infoList: [
            {id: 1, month: '19-10', day: '20', week: '星期一', name: '10月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
            {id: 2, month: '19-09', day: '20', week: '星期三', name: '9月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
            {id: 3, month: '19-08', day: '20', week: '星期四', name: '8月份党支部委员会', time: '09:30-10:45', place: '小会议室'},
          ]
        }
      ]
    },
    components: {
      navHeader,
      meetingInfo
    }
  }
</script>

<style scoped lang="less">

</style>
