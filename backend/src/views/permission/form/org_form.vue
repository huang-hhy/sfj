<template>
  <el-dialog
    :title="formData.id ? '编辑组织' : '新增组织'"
    :visible.sync="dialogFormVisible"
    label-width="120px"
    :close-on-click-modal="false"
    :show-close="false"
    top="15vh"
  >
    <el-form ref="org" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="上级组织" prop="parentId">
        <TreeSelect
          v-model="formData.parentId"
          width="100%"
          :options="orgTree"
          :props="optionsProps"
        />
      </el-form-item>
      <el-form-item label="组织名称" prop="orgName">
        <el-input v-model.trim="formData.orgName" />
      </el-form-item>
      <el-form-item label="组织类型" prop="orgTypeId">
        <el-select v-model="formData.orgTypeId" placeholder="请选择组织类型">
          <el-option v-for="(type,index) in orgType" :key="index" :label="type.orgTypeName" :value="type.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" :min="0" />
      </el-form-item>
      <el-form-item label="经纬度">
        <el-input :value="point" disabled />
      </el-form-item>
      <el-form-item label="所在地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入搜索地址" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="mapNameChange" />
        </el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <baidu-map
          :center="center"
          :zoom="zoom"
          class="map"
          :scroll-wheel-zoom="true"
          @ready="handler"
          @click="getClickInfo"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('org')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('org')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from '@/components/tree-select'
import { jsonAssgin } from '@/utils/tools'

export default {
  name: 'OrgForm',
  components: { TreeSelect },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    orgTree: {
      type: Array,
      default: () => []
    },
    orgType: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        id: '',
        parentId: '',
        orgName: '',
        address: '',
        orgTypeId: '',
        orgTypeName: '',
        children: [],
        lng: '',
        lat: '',
        sort: ''
      },
      point: '',
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      BMap: {},

      rules: {
        orgName: { required: true, message: '请选输入组织名称', trigger: 'blur' }
      },
      dialogFormVisible: false,
      optionsProps: {
        label: 'label',
        children: 'children',
        value: 'id'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = jsonAssgin(this.formData, val)
        if (this.formData.lng) { this.point = this.formData.lng + ',' + this.formData.lat }
        this.dialogFormVisible = true
      },
      deep: true
    }
  },
  methods: {
    initMap() {
      this.$nextTick(() => {
        const that = this
        const BMap = that.BMap.BMap
        const map = that.BMap.map
        const geoc = new BMap.Geocoder()
        const point = new BMap.Point(116.3964, 39.9093)
        map.centerAndZoom(point, 10)
        map.enableScrollWheelZoom()
        var geolocation = new BMap.Geolocation()
        // 定位
        geolocation.getCurrentPosition(
          r => {
            var mk = new BMap.Marker(r.point)
            map.addOverlay(mk)
            map.panTo(r.point)
            geoc.getLocation(r.point, function(rs) {
              that.formData.lng = rs.point.lng
              that.formData.lat = rs.point.lat
              var addComp = rs.addressComponents
              that.formData.address =
                  addComp.province +
                  addComp.city +
                  addComp.district +
                  addComp.street +
                  addComp.streetNumber
              that.loading = false
              that.mapGetshow = false
            })
          },
          { enableHighAccuracy: true }
        )
        // 鼠标点击
        map.addEventListener('click', function(e) {
          var pt = e.point
          var marker = new BMap.Marker(pt) // 创建标注
          map.clearOverlays()
          map.addOverlay(marker)
          geoc.getLocation(pt, function(rs) {
            var addComp = rs.addressComponents
            that.formData.address =
                addComp.province +
                addComp.city +
                addComp.district +
                addComp.street +
                addComp.streetNumber
          })
        })
      })
    },
    handler({ BMap, map }) {
      this.BMap = { BMap, map }
      this.initMap()
    },
    getClickInfo(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
      this.formData.lng = e.point.lng
      this.formData.lat = e.point.lat
      this.point = this.formData.lng + ',' + this.formData.lat
    },
    mapNameChange() {
      const that = this
      let point
      let marker = null
      const BMap = that.BMap.BMap
      const map = that.BMap.map
      const geoc = new BMap.Geocoder()
      const local = new BMap.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: res => {
          if (local.getResults() !== undefined) {
            map.clearOverlays() // 清除地图上所有覆盖物
            if (local.getResults().getPoi(0)) {
              point = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
              map.centerAndZoom(point, 10)
              marker = new BMap.Marker(point) // 创建标注
              map.addOverlay(marker) // 将标注添加到地图中
              marker.enableDragging() // 可拖拽
              geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents

                that.mapPointName =
                    addComp.province +
                    ', ' +
                    addComp.city +
                    ', ' +
                    addComp.district +
                    ', ' +
                    addComp.street +
                    ', ' +
                    addComp.streetNumber
              })
            } else {
              alert('未匹配到地点!可拖动地图上的红色图标到精确位置')
            }
          } else {
            alert('未找到搜索结果')
          }
        }
      })
      local.search(this.formData.address)
    },
    cancelSubmit(name) {
      this.dialogFormVisible = false
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          this.$emit('doSubmit', data)
          this.cancelSubmit(name)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .map {
    margin: 0 auto;
    width: 90%;
    height: 300px;
  }
  .anchorBL{
    display:none;
  }
</style>
