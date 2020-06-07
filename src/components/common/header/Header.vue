<template>
    <div class="home-header-login">
      <headerItem slot="headerLeft" :postion="`left`"/>
      <header-item slot="headerRightImg" :postion="`right`"/>
    </div>
</template>

<script>
import headerItem from 'components/common/header/headeritem/headerItem'
export default {
  name: 'Header',
  components: {
    headerItem
  },
  methods: {
  }
}
</script>

<style scoped>
.home-header-login {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
