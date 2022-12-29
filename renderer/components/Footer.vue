<template>
  <footer class="footer">
    <section class="section bg-dark text-white">
      <div class="container">
        <div class="g-row g-row_between g-row_m-wrap">
          <div class="g-col g-col_25 g-col_d-33 g-col_m-100 pb-24">
            <div class="mb-20">
              <a href="/" target="_blank" class="logo">
                <img src="@/assets/img/logo-var.svg" alt="logo" />
              </a>
            </div>
            <ul class="footer__list mb-24">
              <li>UAB Searadar</li>
              <li>Register code: 305242131</li>
              <li>A. Smetonos g. 4-2, Vilnius, LT-01115, Lithuania</li>
              <li>
                <a :href="'tel:' + $t('searadar_phone_clear.translation')">{{ $t('searadar_phone.translation')}}</a>
              </li>
              <li>
                <a href="mailto:hello@searadar.com">hello@searadar.com</a>
              </li>
            </ul>

            <div v-if="!isRuLocale" class="text-uppercase fw-semibold fs-14 mb-12">
              {{ $t('follow_us_label.translation') }}
            </div>

            <div v-if="!isRuLocale" class="g-row">
              <div class="g-col">
                <a :href="$t('facebook_link.translation')" target="_blank" class="soc-link text-dark">
                  <SvgIcon iconName="facebook" />
                </a>
              </div>

              <div class="g-col">
                <a :href="$t('instagram_link.translation')" target="_blank" class="soc-link text-dark">
                  <SvgIcon iconName="instagram" />
                </a>
              </div>
            </div>
          </div>

          <div class="g-col g-col_50 g-col_d-33 g-col_m-100 pb-24">
            <div class="m-show">
              <div class="g-row g-row_middle g-row_between" @click="state.showLinks = !state.showLinks">
                <div class="g-col">
                  <div class="text-uppercase fw-semibold fs-14">
                    {{$t('useful_links.translation')}}
                  </div>
                </div>

                <div class="g-col">
                  <button class="button button_simple text-white">
                    <SvgIcon iconName="chevron-down" className="svg-icon_20" />
                  </button>
                </div>
              </div>
            </div>
            <!-- раскрываем по клику на кнопку -->
            <div :class="{ 'm-hidden': !state.showLinks }">
              <div class="g-row g-row_d-wrap">
                <div class="g-col g-col_full g-col_d-100">
                  <ul class="footer__list">
                    <li>
                      <router-link to="/about"> {{$t('about_project_layout.translation')}} </router-link>
                    </li>

                    <li>
                      <router-link to="/how-it-works"> {{$t('how_it_works_layout.translation')}} </router-link>
                    </li>

                    <li>
                      <router-link to="/faq"> {{$t('faqs_layout.translation')}} </router-link>
                    </li>

                    <li>
                      <router-link to="/eco"> Eco project </router-link>
                    </li>

                    <li>
                      <router-link to="/products"> Products </router-link>
                    </li>

                    <li>
                      <router-link to="/rent-request">{{$t('rent-request_layout.translation') }}</router-link>
                    </li>

                    <li>
                      <router-link to="/legal-notice"> {{ $t('legal-notice_layout.translation') }}</router-link>
                    </li>

                    <li>
                      <a target="_blank" href="https://blog.searadar.com/"> {{ $t('blog_label.translation') }} </a>
                    </li>
                  </ul>
                </div>

                <div class="g-col g-col_full g-col_d-100">
                  <ul class="footer__list">
                    <li>
                      <router-link to="/personal/reservations">{{$t('lk_login_header_layout.translation')}}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="g-col g-col_m-100">
            <div class="text-uppercase fw-semibold fs-14 mb-12">
              {{$t('we_accept_label.translation')}}
            </div>

            <div class="g-row g-row_small mb-24">
              <div class="g-col">
                <img src="@/assets/img/Mastercard.png" alt="Mastercard" />
              </div>

              <div class="g-col">
                <img src="@/assets/img/Visa.png" alt="Visa" />
              </div>

              <div class="g-col">
                <img src="@/assets/img/Maestro.png" alt="Maestro" />
              </div>

              <div class="g-col">
                <img src="@/assets/img/Stripe.png" alt="Stripe" />
              </div>
            </div>

            <div class="footer__rating">
              <div class="g-row g-row_middle g-row_between">
                <div class="g-col">
                  <img src="@/assets/img/trustpilot.svg" alt="trustpilot" />
                  <div class="fs-20 text-medium">{{ $t('index__trustpilot_rating_label.translation') }}</div>
                </div>

                <div class="g-col">
                  <Rating :rating="5" class="rating_small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-grey-gradient pt-16">
      <div class="container">
        <div class="g-row g-row_middle g-row_between g-row_m-wrap">
          <div class="g-col g-col_m-100 pb-16">
            <p class="text-white-opacity8">© SeaRadar. All rights reserved</p>
          </div>
          <div class="g-col g-col_m-100 pb-16">
            <p class="text-white-opacity8">This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a> and
              <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
<!--    <client-only>-->
<!--      <cookie-law theme="dark-lime">-->
<!--        <div slot="message">-->
<!--          We use cookies to improve your browsing experience.-->
<!--          <router-link class="cookie-link" to="/legal-notice">Learn more</router-link>-->
<!--        </div>-->
<!--      </cookie-law>-->
<!--    </client-only>-->
  </footer>
</template>

<script setup>
import Rating from "./Rating.vue";
import {defineAsyncComponent, reactive} from "vue";
import { useI18n } from 'vue-i18n'
// import SvgIcon from "@/components/SvgIcon/SvgIcon";
// import ClientOnly from 'vue-client-only';
// const CookieLaw = defineAsyncComponent(() => import('vue-cookie-law'))
const state = reactive({ showLinks: false })
const { locale } = useI18n()
const isRuLocale = locale.value.toUpperCase() === 'RU'
</script>
<style lang="scss">
@import "./footer.scss";
.grecaptcha-badge {
  display: none;
}

.cookie-link {
  text-decoration: underline;
  text-decoration-thickness: from-font;
  text-underline-position: under;
}
</style>
