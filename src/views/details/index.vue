<template>
  <div STYLE="margin: 100px">
    详情{{ this.id }}
  </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
      id: this.$route.query.id
    }
  }
}
</script>

<style scoped>

</style>
