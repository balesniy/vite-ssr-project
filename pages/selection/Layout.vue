<template>
  <div :class="{'block-scroll': isOpen}">
    <header class="header">
      <div class="mobile-nav">
        <a href=""><img class="header-logo" src="./assets/logo-dark.svg" alt=""></a>
        <div class="buttons">
          <button class="button chat"><img src="./assets/icon-chat.svg" alt=""></button>
          <button class="button call"><img src="./assets/icon-phone.svg" alt=""></button>
          <button :class="{'is-open': isOpen}" class="button burger" @click="isOpen=!isOpen">
            <span class="burger__line"></span>
            <span class="burger__line"></span>
            <span class="burger__line"></span>
          </button>
        </div>
      </div>
      <div class="menu-content" :class="{'is-open': isOpen}">
        <ul class="menu-items">
          <li>item 1</li>
          <li class="md-hidden">item 2</li>
          <li class="sm-hidden">item 3</li>
          <li>item 4</li>
          <li>item 5</li>
          <li>item 6</li>
          <li>item 7</li>
        </ul>
      </div>
    </header>
    <slot/>
    <footer>page footer</footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    isOpen: false,
  }),
}
</script>
<style scoped lang="scss">
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (min-width: 768px) {
  .md-hidden {
    display: none;
  }
}
@media (max-width: 768px) {
  .sm-hidden {
    display: none;
  }
}

.block-scroll {
  height: 100vh;
  height: 100dvh;
  overflow-y: hidden;
}

.header {
  position: relative;
  box-shadow: 0px 1px 4px rgba(16, 24, 40, 0.08);
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.mobile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px 12px;
}

.menu-content {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 52px);
  transform: translateX(-100%);
  opacity: 0;
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(0,0,0,.2);

  &.is-open {
    opacity: 1;
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    position: relative;
    opacity: 1;
    transform: translateX(0);
    background-color: transparent;
    height: auto;
    width: auto;
  }
}

.menu-items {
  margin: 0;
  padding: 12px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: white;
  max-height: 85%;
  overflow: auto;
  @media (min-width: 768px) {
    background-color: transparent;
    flex-direction: row;
    align-items: center;
  }
}

.buttons {
  width: min(36%, 136px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: none;
  }
}

.button {
  cursor: pointer;
  background: transparent;
  border: none;

  &.chat {
    border-radius: 30px;
    box-shadow: 0px 0px 8px rgba(63, 145, 242, 0.5);
  }

  &.call {
    border-radius: 30px;
    box-shadow: 0px 0px 8px rgba(50, 213, 131, 0.5);
  }
}

.burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 24px;
  height: 24px;

  &__line {
    width: 16px;
    height: 2px;
    margin: 0;
    border-radius: 2px;
    transition: transform 0.2s linear, top 0.2s linear, opacity 0.2s linear;
    background: #000000;

    &:first-child {
      top: 0;
      transform: rotate(0deg);
      position: relative;
    }

    &:nth-child(2) {
      opacity: 1;
    }

    &:nth-child(3) {
      position: relative;
      top: 0;
      transform: rotate(0deg);
    }
  }

  &.is-open {
    .burger__line {
      &:first-child {
        top: 6px;
        transform: rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        top: -6px;
        transform: rotate(-45deg);
      }
    }
  }
}

.header-logo {
  display: block;
}
</style>
