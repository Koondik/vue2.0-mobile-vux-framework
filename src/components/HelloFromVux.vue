<template>
  <div>
    <div class="vux-demo clearfix">
      <img class="logo" src="../assets/vux_logo.png">
      <h1 class="text right bbb">123

      </h1>
    </div>
    <group title="cell demo">
      <cell title="Vux" value="COOL" is-link></cell>
    </group>
    <input type="file" accept="image/*;capture=camera">
    <div class="appCard">
      <x-button @click.native="setFocus" type="primary">set focus</x-button>
    </div>

    <mt-button type="default">default</mt-button>
    <mt-button size="normal">normal</mt-button>
    <mt-button size="large" type="primary">large</mt-button>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';
  import {Button} from 'mint-ui';

  Vue.component(Button.name, Button);

  import {Group, Cell} from 'vux'
  import {Search, XButton} from 'vux'

export default {
  components: {
    Group,
    Cell,
    Search,
    XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style scoped lang="scss"  rel="stylesheet/scss" type="text/scss">
@import "appCard.scss";
$baseColor:#0094ff;
.vux-demo {
  text-align: center;
  display:flex;
}
.logo {
  width: 100px;
  height: 100px
}
.text{
    display:flex;
    .a{
      width:100px;
      color:$baseColor;
    }
}

</style>
