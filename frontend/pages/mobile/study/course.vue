<template>
  <div>
    <courseDetail></courseDetail>
  </div>
</template>

<script>
  import courseDetail from '@/components/mobile/study/course-detail'
  import {getCourseDetail} from '@/api/mobile'

  export default {
    name: "course",
    components: {
      courseDetail
    },
    methods: {
    },
    mounted() {
    },
  }
</script>

<style scoped>

</style>
