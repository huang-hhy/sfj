<template>
  <div class="news_content">
    <h2 class="title">{{item.articleTitle}}</h2>
    <p class="article_name" v-if="item.articleName">{{item.articleName}}</p>
    <p class="article_time">
      <span class="time">发布时间：{{item.createTime}}</span>
      <span class="source">来源：{{item.orgName}}</span>
    </p>
    <div class="content" v-html="item.articleInfo.content"></div>
  </div>
</template>

<script>
  import {xssParse} from '@/utils/xss'

  export default {
    name: "news-content",
    props:{
      item:{
        type:Object
      }
    },
    data() {
      return {
        test: {
          articleTitle: '斯柯达就开始觉得考四级的会计师看到的是款经典款',
          createTime: '2020-06-21 09:24',
          articleName: '卓说',
          orgName: "人民网",
          content: `<h5 style="text-align: left;"><span style="font-size: 14px; font-weight: normal;">&nbsp; &nbsp; &nbsp; 6月15日至17日，自治区党委书记、自治区人大常委会主任鹿心社深入桂林市调研。这是鹿心社来到阳朔县遇龙河旅游度假区，实地察看受灾和灾后恢复情况。本报记者 黄 克/摄</span></h5><div><p style="text-align: center;"><img alt="" src="http://www.people.com.cn/mediafile/pic/20200618/48/580340164209361556.jpg">&nbsp;&nbsp;<br></p><p>&nbsp; &nbsp; &nbsp; 本报兴安讯 （记者/魏恒）6月15日至17日，自治区党委书记、自治区人大常委会主任鹿心社深入桂林市调研。他强调，要坚持以习近平总书记在全国两会期间的重要讲话和重要指示精神为统领，深化对全国两会精神的学习贯彻，扎实做好“六稳”工作，全面落实“六保”任务，进一步统筹推进常态化疫情防控和经济社会发展，为决胜全面建成小康社会、决战脱贫攻坚打下坚实基础。</p><p>&nbsp; &nbsp; &nbsp; 近日来桂林连遭暴雨袭击，多地洪水泛滥，灾情比较严重。鹿心社首先来到阳朔县阳朔镇朝阳、朝隆村和遇龙河旅游度假区，实地察看受灾和灾后恢复情况。目前，水位逐步回落，街面店铺、景区民宿已经恢复营业。鹿心社对当地充分发挥党组织和基层党员干部带头作用、全力防汛抗洪救灾予以肯定。他强调，要加快水毁设施修复重建，恢复正常生产生活秩序，抓好受灾村民尤其是贫困户生活保障工作，全方位确保游客安全。当前，广西正处在主汛期，各地各部门绝不能麻痹大意。要始终坚持人民至上，密切关注水文气象，加强监测预报预警和危险地段巡查排查，防范短时集中降雨导致水库水塘溃坝和次生地质灾害，千方百计保障人民群众生命财产安全。</p><blockquote>&nbsp; &nbsp; &nbsp; 作为全国五个少数民族自治区中第一家国家级高新区，桂林国家高新区已经走过32年的历程。去年，桂林市委、市政府对高新区管理体制进行全面整合，形成“一区多园”发展模式，今年以来，面对新冠肺炎疫情，招商引资和工业产值仍逆势增长。“发展变化大，成绩来之不易。”鹿心社在走访园区企业时表示，要高度重视城市建设规划管理，加快培育新技术、新产业、新业态，进一步增强桂林综合实力。有关部门要加大政策落实力度，着力解决产业链协同复工复产中的各种堵点、难点问题，帮助市场主体纾困发展，为重点群体就业提供保障。</blockquote><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>&nbsp;1</th><th>2&nbsp;</th><th>3&nbsp;</th><th>4&nbsp;</th><th>5&nbsp;</th></tr><tr><td>&nbsp;1</td><td>&nbsp;1</td><td>&nbsp;1</td><td>&nbsp;1</td><td>&nbsp;1</td></tr></tbody></table><p><br></p><p>&nbsp; &nbsp; &nbsp; 智神信息技术股份有限公司是一家高新技术企业，吸纳上千人就业。疫情发生后，该公司迅速调整产品结构，积极扩大国内市场，生产迅速恢复。“危机危机，危中有机。”鹿心社说，只有始终关注技术前沿，始终关注用户需求，在创新、研发上下功夫，才能培育新的增长点，在激烈的市场竞争中渡过难关、立于不败之地。君泰福电气公司是一家高端制造企业，2月中旬以来克服疫情影响，积极开展复工复产，增订单、稳岗位、保就业，产能迅速恢复到去年同期水平。鹿心社称赞道：“坚持目标导向，始终保持争先状态和领先地位，这是企业的成功之道。”中国中药（桂林）产业园是“央企入桂”项目，即将建成投产。鹿心社表示，央企项目普遍规模大、投资大、辐射带动力强，这对缺少“大块头”的广西产业来讲非常重要。广西山清水秀生态美，药医资源丰富。希望双方加强合作，通过创新和现代技术为中医药、民族医药产业发展插上腾飞的翅膀。</p><p>&nbsp; &nbsp; &nbsp; 今年是桂林基本建成国际旅游胜地之年，鹿心社专门考察了常态化疫情防控下促进文旅产业复苏情况。在靖江王府片区历史文化旅游休闲街区，各种餐饮、休闲娱乐、购物等店铺纷纷开门迎客，人气渐旺。鹿心社表示，桂林通过“拆围透墙”、历史文化地段保护修缮及旧城改造等举措，有效改善了人居环境，优化了商业形态。当前，国家正大力实施扩大内需战略，要抓住国内旅游消费反弹的有利契机，苦练内功、提升档次，积极谋划打造“夜经济”等特色品牌，促进旅游消费，加快文旅产业全面复苏。在灵川县千年桂林项目现场，鹿心社表示，桂林作为全区文化旅游产业发展的龙头，要坚持以项目为抓手，打造一批高品质文旅融合产品，吸纳更多人就业创业，壮大全区文旅产业。</p><p>&nbsp; &nbsp; &nbsp; 走进灵川县党群服务中心，看到来自县直机关的预备党员正在组织学习全国两会精神，鹿心社对他们提出勉励，希望各地坚持党建引领，用心用情用力做好各项民生工作，加强和创新基层社会治理，高质量打好脱贫攻坚收官战，解决好人民群众关心的实际问题，以实实在在的工作实绩取信于民，把全国两会精神落到实处。</p><p>&nbsp; &nbsp; &nbsp; 桂林率先开展新型城镇化示范乡镇建设，形成一批经济强镇、文化古镇、旅游名镇。鹿心社在兴安县华江瑶族乡调研时指出，要认真总结经验做法，把示范乡镇建设与脱贫攻坚、乡村振兴紧密结合起来，因地制宜发展特色产业，提升乡村风貌，增强乡镇居民的获得感和幸福感。鹿心社还实地考察了老山界红色历史文化保护传承、猫儿山国家级自然保护区生态保护和开发情况。</p><p style="text-align: right;">黄伟京、赵乐秦一同调研。</p></div><div style="text-align: right;">(责编：吕腾龙、常雪梅)</div>`


        }
      }
    },
    mounted() {
    },
    methods: {
      xssParse(html) {
        return xssParse(html)
      }
    }
  }
</script>

<style scoped lang="less">
  .news_content {
    width: 100%;
    padding: 0 20px 15px 10px;

    .title {
      text-align: center;
      font: bold 28px 微软雅黑;
      color: #333;
      line-height: 34px !important;
    }

    .article_name {
      font-size: 12px;
      text-align: center;
      line-height: 0 !important;
      padding: 3px 0;
    }

    .article_time {
      font-size: 12px;
      text-align: center;
      line-height: 0 !important;
      padding: 3px 0;

      .time {
        margin-right: 20px;
      }
    }
  }

  @deep: ~'>>>';
  @{deep} h1 {
    font-size: 2em;
    margin: .67em 0;
    font-weight: bolder
  }

  @{deep} h2 {
    font-size: 1.5em;
    margin: .75em 0;
    font-weight: bolder
  }

  @{deep} h3 {
    font-size: 1.17em;
    margin: .83em 0;
    font-weight: bolder
  }

  @{deep} h4 {
    margin: 1.12em 0
  }

  @{deep} h5 {
    font-size: .83em;
    margin: 1.5em 0;
    font-weight: bolder
  }

  @{deep} h6 {
    font-size: .75em;
    margin: 1.67em 0;
    font-weight: bolder
  }

  @{deep} p {
    font-size: 14px;
    margin: 1.12em 0;
    text-align: justify;
    line-height: 24px;
  }

  @{deep} img {
    margin: 0 auto;
    width: 90%;
  }

  @{deep} blockquote {
    width: 98%;
    margin: 1vw auto;
    padding: 1vw 0;
    border-left: 1.5vw solid #D0E5F2;
    background: #F1F1F1;
  }

  @{deep} table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #999;
    width: 90%;
    margin: 5px auto;
    border-collapse: collapse;
    table-layout: fixed;
    overflow-x: scroll;

    @{deep} th {
      border: 1px solid #999;
      background: #f1f1f1;
    }

    @{deep} td {
      background: #fff;
      border: 1px solid #999;
    }
  }

  @{deep} div {
    font-size: 14px;
  }
</style>
