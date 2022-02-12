<template>
  <router-view />
</template>

<style lang="scss">
@import "./variables.scss";
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:focus {
  outline: none;
  opacity: 0.5;
}

a {
  text-decoration: none;
  color: $greenLight;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Helvetica, sans-serif;
  font-size: $body-firstFont;
  overflow-x: hidden;
  background: $light;
  width: 100vw;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
