<template>
  <section class="main-search section section_top">
    <div class="main-search__bg"></div>

    <div class="container">
      <div class="g-row g-row_bottom g-row_reverse g-row_m-wrap">
        <div class="g-col g-col_m-100 pb-24 s-hidden">
          <div class="main-search__rate text-white">
            <img src="@/assets/img/trustpilot.svg" alt="trustpilot" />
            <div class="h4">
              <span>{{
                  $t("index__trustpilot_rating_label.translation")
                }}</span>
            </div>
          </div>
        </div>

        <div class="g-col g-col_full g-col_m-100 pb-24">
          <h1 class="mb-20 text-white h1">
            {{ $t("index_jumbotron_header.translation") }}
          </h1>
          <div class="main-search__slogan h5 text-white">
            {{ $t("index_jumbotron_description.translation") }}
            <a class="link link_underline-hover text-main" href="/fdp" target="_blank">
              without a deposit
            </a>
          </div>
        </div>
      </div>

      <form class="main-search__fields">
        <div class="g-row g-row_small mb-20 mb-m-0 g-row_t-wrap">
          <div class="g-col g-col_33 g-col_t-100 pb-12">
            <multiselect
                :value="searchData.countries"
                :multiple="true"
                :close-on-select="false"
                :hide-selected="true"
                :options="searchData.countriesOptions"
                :options-limit="200"
                label="name"
                track-by="id"
                :loading="isLoadingForm"
                :placeholder="$t('lk__нормальное_состояние__62.translation')"
                icon="location"
                :valid="!isError"
                :error="error"
                @search-change="onSearchPlaces"
                @input="setSelectedCountry"
                @select="isError = false"
            >
              <template slot="tag" slot-scope="{ option, remove }">
                <span
                    class="multiselect__tag"
                    :class="{
                      'multiselect__tag--area': option?.type === 'region',
                    }"
                >
                  <span
                      v-if="option?.countryAlpha2Code"
                      class="multiselect__tag-image"
                  >
                    <img
                        :src="
                        `/img/flags/` + option.countryAlpha2Code + `.png`
                      "
                        alt="flag"
                    />
                  </span>
                  <span
                      v-text="option?.name"
                      class="multiselect__tag-text"
                  />
                  <span
                      tabindex="1"
                      class="multiselect__tag-close"
                      @keypress.enter.prevent="remove(option)"
                      @mousedown.prevent="remove(option)"
                  >
                    <SvgIcon iconName="close" className="svg-icon_16" />
                  </span>
                </span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span
                    v-if="option?.countryAlpha2Code"
                    class="option__image"
                >
                  <img
                      :src="
                      `/img/flags/` + option.countryAlpha2Code + `.png`
                    "
                      alt="flag"
                  />
                </span>
                <span class="option__title">{{ option?.name }}</span>
                <span class="option__bage label-text">{{ option?.type }}</span>
              </template>
            </multiselect>
          </div>

          <div class="g-col g-col_25 g-col_t-33 g-col_m-100 pb-12">
            <Calendar
                v-model="date"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                :default-value="new Date()"
                type="date"
                :editable="false"
                :clearable="clearable"
                value-type="date"
                range
                :placeholder="$t('lk__нормальное_состояние__53.translation')"
                format="D MMM YYYY"
                :lang="$i18n.locale"
                :open.sync="state.isCalendarOpen"
            >
              <template #header>
                <button
                    class="mx-datepicker-popup-close button button_simple"
                    @click="state.isCalendarOpen = false"
                >
                  <SvgIcon iconName="close" />
                </button>
              </template>
            </Calendar>
          </div>

          <div class="g-col g-col_22 g-col_t-33 g-col_m-100 pb-12">
            <DropdownSelect
                :options="filters.boatTypes"
                :value="searchData.type"
                :with-icon="true"
                :placeholder="
                  $t('личный_кабинет__плейсхордер_ушел_сюда__71.translation')
                "
                icon="yacht"
                append-to-body
                @input="
                  (value, loading, toggle) =>
                    changeType(value, loading, toggle, 'types')
                "
            />
          </div>

          <div class="g-col g-col_full g-col_t33 g-col_m-100">
            <button
                type="button"
                class="button button_primary button_large button_full"
                @click="submitSearch"
            >
              {{ $t("btn_find_index.translation") }}
            </button>
          </div>
        </div>

        <div class="m-hidden">
          <div class="g-row g-row_medium">
            <div class="g-col g-col_33">
              <div class="label-text fs-12 text-white mb-8">
                {{ $t("index_search_range_price_index.translation") }}
              </div>

              <Slider
                  :min-data="minPrice"
                  :max-data="maxPrice"
                  :formatter="(price) => `${price.toLocaleString()} €`"
                  @change="handlePriceChange"
              />
            </div>

            <div class="g-col g-col_33">
              <div class="label-text fs-12 text-white mb-8">
                {{ $t("cabin_count_search.translation") }}
              </div>

              <Slider
                  :min-data="minCabins"
                  :max-data="maxCabins"
                  @change="handleCabinsChange"
              />
            </div>

            <div class="g-col g-col_33">
              <div class="label-text fs-12 text-white mb-8">
                {{ $t("boat_year_search.translation") }}
              </div>

              <Slider
                  :min-data="minYear"
                  :max-data="maxYear"
                  :formatter="yearsFormatter"
                  @change="handleYearsChange"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
// import DropdownSelect from "@/components/Dropdowns/Select/Select.vue";
// import Slider from "@/components/Slider/Slider";
// import Calendar from "@/components/Calendars/DateTimePicker";
// import Multiselect from "@/components/Inputs/Multiselect";
// import SvgIcon from "@/components/SvgIcon/SvgIcon";
//
// import debounce from "lodash/debounce";
// import { IS_DEV } from "@/utils/config";
// const { mapState, mapMutations } = createNamespacedHelpers("searchForm");

import { usePageContext } from '@/renderer/usePageContext.js'
const pageContext = usePageContext()
// console.log({ pageContext })

import { useSearch } from '@/stores/search.js'
import {computed, onMounted, onServerPrefetch, reactive} from "vue";
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  loaded: {
    type: Boolean,
    default: true
  }
})

const searchData = useSearch()
const loadCountries = async () => {
  await searchData.fetchCountries()
}
onServerPrefetch(loadCountries)
// onMounted(loadCountries)
const state = reactive({
  isLoadingForm: false,
  isError: false,
  clearable: true,
  isCalendarOpen: false,
})
const minPrice = computed(() => parseInt(props.filters.pricesRange?.min ?? 0))
const maxPrice = computed(() => parseInt(props.filters.pricesRange?.max ?? 100000))
const minCabins = computed(() => parseInt(props.filters.cabinsRange?.[0].min ?? 0))
const maxCabins = computed(() => parseInt(props.filters.cabinsRange?.[0].max ?? 0))
const minYear = computed(() => {
  if (!props.filters.boatYearsRange) {
    return 0;
  }
  const min = parseInt(props.filters.boatYearsRange[0].min);
  return min < 2000 ? 1999 : min;
})
const maxYear = computed(() => parseInt(props.filters.boatYearsRange?.[0].max ?? 0))
// ...mapState(["formData", "countries"]),
const date = computed(() => ({
  get() {
    return searchData.date;
  },
  set(value) {
    searchData.date = value
  },
}))
const errorText = computed(() => state.isError ? "pick at least one country" : "")
const handleCabinsChange = (value) => {
  searchData.cabins = value
}
const handleYearsChange = ([minValue, maxValue]) => {
  searchData.years = [minValue === 1999 ? 0 : minValue, maxValue]
}
const handlePriceChange = (value) => {
  searchData.price = value
}
const submitSearch = () => {
  if (!searchData.countries.length) {
    state.isError = true;
    return;
  }

  // if (!IS_DEV) {
  //   this.$gtm.trackEvent({ event: "search" });
  // }

  // this.$router.push({
  //   path: "search",
  //   query: this.$store.getters["searchForm/query"],
  // });
}
const disabledBeforeTodayAndAfterAWeek = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
}
const yearsFormatter = (v) => {
  if (v < 2000) {
    return "< 2000";
  }
  return v;
}
const selectNextWeek = (emit) => {
  const start = new Date();
  const end = new Date();
  end.setTime(end.getTime() + 7 * 24 * 3600 * 1000);
  const date = [start, end];
  emit(date);
}
</script>

<script>
export default {
  methods: {
    // ...mapMutations([
    //   "setSelectedCountry",
    // ]),

    async fetchAllDropData() {
      if (this.showFormLoader) {
        this.isLoadingForm = true;
      }

      try {
        await this.selectCountryRegion("", "");
      } catch (e) {
        console.log(e);
      }

      if (this.showFormLoader) {
        this.isLoadingForm = false;
      }
    },
    async selectCountryRegion(query, countryCode) {
      this.isLoadingForm = true;
      const locale = this.$i18n.locale;

      try {
        await this.$store.dispatch("searchForm/selectCountryRegion", {
          locale,
          query,
          countryCode,
        });
        this.isLoadingForm = false;
      } catch (error) {
        console.log(error);
        this.isLoadingForm = false;
      }
    },
    changeType(value, loading, toggle, type) {
      if (type === "countries") {
        if (!value) {
          this.selectCountryRegion("", "", loading);
          this.$store.commit("searchForm/setCountryId", "");
        } else {
          this.selectCountryRegion("", value.id, loading, toggle);
          this.$store.commit("searchForm/setCountryId", value.id);
          this.isError = false;
        }
        this.$store.commit("searchForm/setRegionId", "");
        this.$store.commit(
            "searchForm/setSelectedCountry",
            value || { id: "", label: "", text: "" }
        );
      }

      if (type === "types") {
        this.$store.commit(
            "searchForm/setType",
            value || { id: "", label: "", text: "" }
        );
      }

      // this.formData[type] = value || {id: '', label: '', text: ''};
    },
    onSearchPlaces(search) {
      this.searchPlaces(search, this);
    },
    // searchPlaces: debounce((search, vm) => {
    //   vm.selectCountryRegion(search);
    // }, 350),
  },
  mounted() {
    // console.log('main search mounted with', this.countries)
    // this.fetchAllDropData();
    // if (!this.countries?.length) {
    //   // список мест еще не загружался в форму
    //   this.$store.dispatch("searchForm/selectCountryRegion", {
    //     locale: this.$i18n.locale,
    //     query: "",
    //     countryCode: "",
    //   });
    // }
  },
};
</script>

<style lang="scss">
@import "./main-search.scss";
</style>
