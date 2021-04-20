<template>
  <div>
    <baidu-map
      :center="center"
      :zoom="zoom"
      class="map"
      :scroll-wheel-zoom="true"
      @ready="handler"
    />
  </div>
</template>

<script>
  export default {
    name: 'BdMap',
    props: {
      points: {
        type: Array
      }
    },
    data() {
      return {
        arrayList: [],
        center: {lng: 113.526398, lat: 22.801729},
        zoom: 15,
        BMap: {},
      };
    },
    methods: {
      initMap() {
        this.$nextTick(function () {
          let that = this;
          const BMap = that.BMap.BMap
          const map = that.BMap.map
          map.centerAndZoom(new BMap.Point(113.526398, 22.801729), 16); // 初始化地图,设置中心点坐标和地图级别
          // map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]}));
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
          map.centerAndZoom(new BMap.Point(113.26958, 23.133807), 10);
          // 添加带有定位的导航控件
          var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
          });
          map.addControl(navigationControl);

          function showPoly(pointList) {
            //循环显示点对象
            for (var c = 0; c < pointList.length; c++) {
              //创建小狐狸
              // var pt = new BMap.Point(116.417, 39.909);
              // var myIcon = new BMap.Icon(require('@/assets/pc/home/hongqi30px.gif'), new BMap.Size(30, 30));
              // var myIcon = new BMap.Icon(require('@/assets/pc/home/hongqi.png'), new BMap.Size(30, 30));
              // var marker = new BMap.Marker(pointList[c], {icon: myIcon});
              var marker = new BMap.Marker(pointList[c]);

              let sContent =
                "<p style='line-height: 30px; font-size:14px;'>" + pointList[c].address + "</p>" +
                "<hr/>" +
                "<div style='width:100%;height:180px;background-position: center 0;background-repeat: no-repeat;background-image: url(http://pc.ns.com/content/images/default3.png)'>" +
                "<div style='font-size: 14px;line-height: 20px;'>" +
                "<span>全称：</span>" +
                "<span style='font-weight: bold'>" + pointList[c].address + "</span>" +
                "</div>" +
                "<div style='font-size: 14px;line-height: 20px;'>" +
                "<span>地址：</span>" +
                "<span style='font-weight: bold'>" + pointList[c].address + "+</span>" +
                "</div>" +
                "</div>";
              // var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
              marker.addEventListener("click", function () {
                var opts = {
                  width: 358,     // 信息窗口宽度
                  height: 180,     // 信息窗口高度
                  margin: 0,
                  padding: 0
                }
                const infoWindow = new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象
                this.openInfoWindow(infoWindow);
                //图片加载完毕重绘infowindow
                document.getElementById('imgDemo').onload = function () {
                  infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
                }
              });

              map.addOverlay(marker);

              var bdary = new BMap.Boundary();
              bdary.get("广州", function (rs) {   //获取行政区域
                var count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                  alert('未能获取当前输入行政区域');
                  return;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                  var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                  ply.setFillColor("none");
                  map.addOverlay(ply);  //添加覆盖物
                  pointArray = pointArray.concat(ply.getPath());
                }
                // map.setViewport(pointArray); //调整视野
              });
            }
          }

          for (var i = 0; i < this.points.length; i++) {
            var p = new BMap.Point(this.points[i].lng, this.points[i].lat);
            p.address = this.points[i].address;
            this.arrayList.push(p);
          }
          //显示轨迹
          showPoly(this.arrayList);
        });
      },
      handler({BMap, map}) {
        this.BMap = {BMap, map}
        this.initMap()
      }
    }
  };
</script>

<style lang="less">
  .map {
    width: 100%;
    height: 100%;
  }
  .anchorBL{
    display:none;
  }
</style>
