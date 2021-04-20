<template>
  <div class="sass-container">
    <div class="sass-main">
      <div class="sass-title">党建云平台</div>
      <div>
        <div class="sass-card">
          <div class="chart-wrapper row1" @click="toDeskTop('permission')">
            <div class="desktop-name">系统管理</div>
          </div>
          <div class="chart-wrapper row1" @click="toDeskTop('article')">
            <div class="desktop-name">信息管理</div>
          </div>
          <div class="chart-wrapper row1" @click="toDeskTop('work')">
            <div class="desktop-name">党务管理</div>
          </div>
        </div>
        <div class="sass-card">
          <div class="chart-wrapper row2" @click="toDeskTop('study')">
            <div class="desktop-name">党建教育</div>
          </div>
          <div class="chart-wrapper row2" @click="toDeskTop('count')">
            <div class="desktop-name">统计分析</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import system from '@/router/modules/system'
import article from '@/router/modules/article'
import study from '@/router/modules/study'
import work from '@/router/modules/work'
import count from '@/router/modules/count'
import permission from '@/router/modules/permission'
import { findFirstRouterByAccess } from '@/utils/tools'
export default {
  name: 'SassPlatform',
  methods: {
    toDeskTop(desktop) {
      if (desktop !== this.$store.state.app.desktop) {
        this.$store.dispatch('tagsView/delAllViews', null, { root: true })
      }
      this.$store.commit('app/SET_DESKTOP', desktop)
      this.$router.push({ name: 'dashboard' })
      const access = this.$store.state.user.access
      console.log(access)
      switch (desktop) {
        case 'system':
          this.$router.push({ name: findFirstRouterByAccess(system, access) })
          break
        case 'permission':
          this.$router.push({ name: findFirstRouterByAccess(permission, access) })
          break
        case 'article':
          this.$router.push({ name: findFirstRouterByAccess(article, access) })
          break
        case 'study':
          this.$router.push({ name: findFirstRouterByAccess(study, access) })
          break
        case 'work':
          this.$router.push({ name: findFirstRouterByAccess(work, access) })
          break
        case 'count':
          this.$router.push({ name: findFirstRouterByAccess(count, access) })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sass-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("../../assets/images/desktop/desktop-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #ffffff;
    overflow-y: scroll;

    .sass-main {
      position: absolute;
      top: 10%;
      width: 100%;;

      .sass-card {
        display: flex;
        justify-content: center;
      }

      .sass-title {
        font-family:Source Han Sans SC;
        text-align: center;
        font-size: 36px;
        width: 450px;
        font-weight: bold;
        padding: 20px 0;
        /*position: relative;*/
        background-image: url("../../assets/images/desktop/desktop-title.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        margin: 0 auto 60px;

      }
      .chart-wrapper {
        text-align: center;
        font-weight: bold;
        position: relative;
        background-size: 60px 60px, 100%;
        background-position: center 40% ,center;
        background-repeat: no-repeat;
        /*padding: 80px 150px;*/
        width: 400px;
        height: 280px;

        &:hover {
          cursor: pointer;
        }

        .desktop-name {
          font-weight: 400;
          font-size: 30px;
          margin-top: 180px;
        }
      }
      .row1 {
        &:nth-child(1) {
          background-image: url("../../assets/images/desktop/permission.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/permission-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
        &:nth-child(2) {
          background-image: url("../../assets/images/desktop/system.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/system-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
        &:nth-child(3) {
          background-image: url("../../assets/images/desktop/manage.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/manage-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
      }
      .row2 {
        &:nth-child(1) {
          background-image: url("../../assets/images/desktop/study.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/study-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
        &:nth-child(2) {
          background-image: url("../../assets/images/desktop/count.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/count-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
        &:nth-child(3) {
          background-image: url("../../assets/images/desktop/study.png"), url("../../assets/images/desktop/card-bg.png");
          &:hover {
            background-image: url("../../assets/images/desktop/study-active.png"), url("../../assets/images/desktop/card-bg-active.png");
            color: #5FB8FE;
          }
        }
      }
    }

  }

</style>
