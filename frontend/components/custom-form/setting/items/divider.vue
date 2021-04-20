<template>
  <div class="xdh-form-divider">
    <el-divider direction="horizontal" :content-position="contentPosition">
      <slot>
        <i v-if="icon" :class="icon" />
        {{ content }}
      </slot>
    </el-divider>
    <slot name="body" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'right', 'center'].includes(val)
      }
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
