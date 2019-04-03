<template>
    <h1>404 error</h1>
</template>

<script>
export default {
  created(){
      setTimeout(() => {
          this.$router.push('/login')
      }, 4000);
  }
}
</script>

<style>

</style>
