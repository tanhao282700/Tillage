<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods:{
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height:100%;
  width:100%;
  background:url('./assets/img/fullBg.png') no-repeat center;
  background-size:100% 100%;
}

</style>
