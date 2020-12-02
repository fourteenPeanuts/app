<template>
  <div class="wscn-http404-container"
       style="margin-top:50px;">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent"
             src="@/assets/404_images/404.png"
             alt="404">
        <img class="pic-404__child left"
             src="@/assets/404_images/404_cloud.png"
             alt="404">
        <img class="pic-404__child mid"
             src="@/assets/404_images/404_cloud.png"
             alt="404">
        <img class="pic-404__child right"
             src="@/assets/404_images/404_cloud.png"
             alt="404">
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message () {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style  scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
}
.bullshit {
  position: relative;
  float: left;
  width: 300px;
  padding: 30px 0;
  overflow: hidden;
}
</style>
