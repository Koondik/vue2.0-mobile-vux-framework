<template>
    <transition>
      <!--list路由使用缓存-->
      <keep-alive include="list">
        <router-view></router-view>
      </keep-alive>
      <!--// 这是目前用的比较多的方式-->
      <!--<keep-alive>-->
        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    </transition>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                input1: null,
                input2: null,
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
