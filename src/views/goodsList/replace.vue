<template>
  <div></div>
</template>

<script>
export default {
  name: 'Replace',
  data () {
    this.$router.replace({
      path: '/index/goodsList',
      query: {categoryId: this.$route.query.categoryId}
    })
    return {}
  }
}
</script>

<style scoped>

</style>
