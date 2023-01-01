<template>
  <div class="drawer">
    <input id="drawer-toggle" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content">
      <div class="page-content">
        <slot/>
        <footer>page footer</footer>
      </div>
      <div class="drawer-side">
        <label for="drawer-toggle" class="drawer-overlay"/>
        <ul class="menu">
          <li class="menu-item"><a>About Us</a></li>
          <li class="menu-item"><a>Login</a></li>
          <li class="menu-item">
            <div class="dropdown">
              <label tabindex="0" class="btn">EUR</label>
              <ul tabindex="0" class="dropdown-content options">
                <li><a>USD</a></li>
                <li><a>EUR</a></li>
                <li><a>Polish zloty</a></li>
                <li><a>Rus Ruble</a></li>
              </ul>
            </div>
          </li>
          <li class="menu-item">
            <div class="dropdown">
              <label tabindex="0" class="btn">EN</label>
              <ul tabindex="0" class="dropdown-content options">
                <li><a>English</a></li>
                <li><a>Russian</a></li>
                <li><a>German</a></li>
                <li><a>Spanish</a></li>
                <li><a>Dutch</a></li>
                <li><a>Polish</a></li>
                <li><a>French</a></li>
                <li><a>Romanian</a></li>
              </ul>
            </div>
          </li>
          <li class="menu-item"><a>Login</a></li>
          <li class="menu-item"><a>Booking application</a></li>
        </ul>
      </div>
      <header class="header">
        <a href=""><img class="header-logo" src="./assets/logo-dark.svg" alt=""></a>
        <div class="buttons">
          <button class="button chat"><img src="./assets/icon-chat.svg" alt=""></button>
          <button class="button call"><img src="./assets/icon-phone.svg" alt=""></button>
          <label for="drawer-toggle" class="button burger">
            <span class="burger__line"></span>
            <span class="burger__line"></span>
            <span class="burger__line"></span>
          </label>
        </div>
      </header>
    </div>
  </div>
</template>
<style scoped lang="scss">
.drawer {
  display: grid;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  height: 100dvh;
}

.drawer-content {
  z-index: 0;
  grid-column-start: 1;
  grid-row-start: 1;
  overflow-y: auto;
  transition-property: all;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  display: grid;
  --header-height: 52px;
}

.drawer-toggle:checked ~ .drawer-content {
  overflow-y: hidden;
}

.page-content {
  margin-top: var(--header-height);
  grid-column-start: 1;
  grid-row-start: 1;
}

:where(.drawer-toggle~.drawer-content) {
  height: inherit;
}

.drawer-toggle {
  position: absolute;
  height: 0;
  width: 0;
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
}

.drawer-side {
  grid-column-start: 1;
  grid-row-start: 1;
  display: grid;
  margin-top: var(--header-height);
  overflow: hidden;
}

.drawer-toggle ~ .drawer-content .drawer-overlay {
  visibility: hidden;
  grid-column-start: 1;
  grid-row-start: 1;
  opacity: 0;
  cursor: pointer;
  background-color: rgba(29, 41, 57, 0.2);
  transition-property: all;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.drawer-toggle:checked ~ .drawer-content .drawer-overlay {
  visibility: visible;
  opacity: .999999;
}

.drawer-toggle ~ .drawer-content .drawer-overlay + * {
  grid-column-start: 1;
  grid-row-start: 1;
  --tw-translate-x: 0;
  --tw-translate-y: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y));
  transition-property: all;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.drawer-toggle:checked ~ .drawer-content .drawer-overlay + * {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
}

.menu {
  background-color: white;
  height: max-content;
  max-height: 80vh;
  overflow: auto;
  padding: 12px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.dropdown {
  position: relative;
}

.dropdown .dropdown-content {
  display: none;
  opacity: 0;
}

.dropdown:focus .dropdown-content, .dropdown:focus-within .dropdown-content {
  display: flex;
  opacity: 1;
}

.btn {
  flex-shrink: 0;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: transparent;
  text-align: center;
  padding-inline: 1rem;
  padding: 5px 8px;
  gap: 4px;

  width: 80px;
  height: 30px;

  /* Gray/100 */
  background: #F2F4F7;
  border-radius: 8px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.header {
  grid-column-start: 1;
  grid-row-start: 1;
  height: min-content;
  background-color: aquamarine;
  z-index: 10;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px 12px;
  box-shadow: 0px 1px 4px rgba(16, 24, 40, 0.08);
}

.buttons {
  width: min(36%, 136px);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  .drawer-toggle:checked ~ .drawer-content & {
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

  @media screen and (min-width: 769px) {
    display: none;
  }
}

.header-logo {
  display: block;
}
</style>
