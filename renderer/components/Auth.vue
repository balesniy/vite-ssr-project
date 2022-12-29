<template>
  <div>
    <router-link v-if="user.isUserAuth" to="/personal/reservations" class="auth-link">
      <avatar
        v-if="!profileSidebarInfo.avatar.avatar_file_name && !user.isUserIncomplete"
        class="auth-link__image mr-8"
        :class="{
          update: profileSidebarInfo.isUpdate,
          'is-gold': profileSidebarInfo.partnerStatus.includes('gold'),
        }"
        :username="profileSidebarInfo.firstName + ' ' + profileSidebarInfo.lastName"
        :size="32"
      />
      <span v-else class="auth-link__image mr-8">
        <img v-if="user.isUserIncomplete" src="@/assets/img/avatar.svg" alt="avatar" />
        <img
          v-else
          :class="{
            update: profileSidebarInfo.isUpdate,
            'is-gold': profileSidebarInfo.partnerStatus.includes('gold'),
          }"
          :src="renderedPhoto"
          alt="avatar"
        />
      </span>
      <span v-if="user.userProfile" class="auth-link__text fs-14 fw-medium">
        {{ user.userName }}
      </span>
      <span v-else class="auth-link__text fs-14 fw-medium">
        {{ $t('lk__lk.translation') }}
      </span>
    </router-link>

    <template v-else>
      <a href="#" class="auth-link" @click.prevent="$bvModal.show('modal-sign-in')">
        <span class="auth-link__image">
          <img src="@/assets/img/avatar.svg" alt="avatar" />
        </span>
        <span class="auth-link__text fs-14 fw-medium m-hidden ml-8">
          {{ $t('lk_.translation') }}
        </span>
      </a>
    </template>
  </div>
</template>

<script setup>
// import Avatar from 'vue-avatar';
// import { getAbsoluteImgPath } from '@/helpers/pictures';
import {useUser} from "@/stores/user.js";
import {computed} from "vue";

const user = useUser()
const profileSidebarInfo = user.profileSidebarInfo // fixme
const renderedPhoto = computed(() => profileSidebarInfo?.avatar.avatar_file_name ?? '')
</script>

<style lang="scss">
@import './auth.scss';
</style>
