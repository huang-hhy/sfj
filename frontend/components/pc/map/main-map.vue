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
    name: "main-map.vue",
    data() {
      return {
        center: {lng: 113.27, lat: 23.13},
        zoom: 9,
        BMap: {},
      };
    },
    methods: {
      madeBoundary() {
        const BMap = this.BMap.BMap
        var datas = new Array("白云区-#665599", "海珠区-#559955", "天河区-#666ddd", "荔湾区-#1199cc","南沙区-#EA7E79","番禺区-#68A0CF","增城区-#9B541B","花都区-#FF318C","从化区-#AF4BF8");
        var bdary = new BMap.Boundary();
        for (var i = 0; i < datas.length; i++) {
          this.getBoundary(datas[i], bdary);
        }
      },
      getBoundary(data, bdary) {
        const BMap = this.BMap.BMap
        const map = this.BMap.map
        data = data.split("-");
        bdary.get(data[0], function (rs) {       //获取行政区域
          var count = rs.boundaries.length; //行政区域的点有多少个

          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "#ff0000",
              fillOpacity: 0.5,
              fillColor: data[1]
            }); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
          }
        });
      },
      initMap() {
        this.$nextTick(function () {
          let that = this;
          const BMap = that.BMap.BMap
          const map = that.BMap.map
          map.centerAndZoom(new BMap.Point(113.27,23.13), 9);
          map.enableScrollWheelZoom();
          this.madeBoundary();
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
    width: 770px;
    height: 500px;
  }

  .anchorBL {
    display: none;
  }
</style>
