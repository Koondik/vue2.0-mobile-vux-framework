<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="Vux" value="COOL" is-link></cell>
    </group>
    <input type="file" accept="image/*;capture=camera">
    <div style="padding:15px;">
      <x-button @click.native="setFocus" type="primary">set focus</x-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Group, Cell } from 'vux'
import { Search,  XButton } from 'vux'

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

<style lang="scss">
@import "appCard.scss";
$baseColor:#0094ff;
.vux-demo {
  text-align: center;
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
