<template>
  <div class="page-wrapper" :class="{'block-scroll': isOpen}">
    <header class="header">
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
      <div class="menu-content" :class="{'is-open': isOpen}">
        <ul class="menu-items">
          <li>item 1</li>
          <li class="md-hidden">item 2</li>
          <li class="sm-hidden">item 3</li>
          <li>item 4</li>
          <li>item 5</li>
          <li>
            <div class="dropdown" :class="{'is-open': isDropdownOpen}">
              <button class="btn" @click="isDropdownOpen=!isDropdownOpen"><span>€</span> EUR <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.8 7.5 6 3.7 2.2 7.5" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></button>
              <ul class="dropdown-options">
                <li><span>$</span> USD</li>
                <li><span>€</span> EUR</li>
                <li><span>zł</span> Polish zloty</li>
                <li><span>₽</span> Rus Ruble</li>
              </ul>
            </div>
          </li>
          <li>item 7</li>
        </ul>
      </div>
    </header>
    <main><slot/></main>
    <footer>page footer</footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    isOpen: false,
    isDropdownOpen: false
  }),
}
</script>
<style scoped lang="scss">
.dropdown {
  .btn {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    gap: 4px;
    font-size: 14px;
    line-height: 20px;

    //width: 80px;
    //height: 30px;

    /* Gray/100 */
    background: #F2F4F7;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  .dropdown-options {
    margin: 20px 0 0;
    padding: 0;
    list-style: none;
    display: none;
    & > * {
      padding: 6px 8px;
    }
    @media (min-width: 768px) {
      position: absolute;
      background: #FFFFFF;
      /* Shadows/xl */
      box-shadow: 0px 5px 24px -4px rgba(16, 24, 40, 0.15), 0px 15px 10px -4px rgba(16, 24, 40, 0.02);
      border-radius: 8px;
      padding: 12px;
    }
  }
  &.is-open .dropdown-options{
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
.page-wrapper {
  padding-top: 52px;
}
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
  &::before {
    content: '';
    position: absolute;
    background-color: rgba(0,0,0,.2);
    inset: 0;
  }
}

.header {
  position: absolute;
  top: 0;
  display: flex;
  row-gap: 12px;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px 12px;
  background-color: white;
  box-shadow: 0px 1px 4px rgba(16, 24, 40, 0.08);
}

.menu-content {
  display: none;
  width: 100%;

  &.is-open {
    display: unset;
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    order: 1;
    background-color: transparent;
    width: auto;
    height: auto;
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
    padding: 0;
  }
}

.buttons {
  width: min(36%, 136px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    order: 2;
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
  @media (min-width: 768px) {
    display: none;
  }
}

.header-logo {
  display: block;
}
</style>
