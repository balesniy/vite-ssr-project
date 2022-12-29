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
                :value="formData.countries"
                :multiple="true"
                :close-on-select="false"
                :hide-selected="true"
                :options="countries"
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
              <template slot="tag" slot-scope="props">
                <span
                    class="multiselect__tag"
                    :class="{
                    'multiselect__tag--area': props.option.type === 'region',
                  }"
                >
                  <span
                      v-if="props.option.countryAlpha2Code"
                      class="multiselect__tag-image"
                  >
                    <img
                        :src="
                        `/img/flags/` + props.option.countryAlpha2Code + `.png`
                      "
                        alt="flag"
                    />
                  </span>
                  <span
                      v-text="props.option.name"
                      class="multiselect__tag-text"
                  ></span>
                  <span
                      tabindex="1"
                      class="multiselect__tag-close"
                      @keypress.enter.prevent="props.remove(props.option)"
                      @mousedown.prevent="props.remove(props.option)"
                  >
                    <SvgIcon iconName="close" className="svg-icon_16" />
                  </span>
                </span>
              </template>
              <template slot="option" slot-scope="props">
                <span
                    v-if="props.option.countryAlpha2Code"
                    class="option__image"
                >
                  <img
                      :src="
                      `/img/flags/` + props.option.countryAlpha2Code + `.png`
                    "
                      alt="flag"
                  />
                </span>
                <span class="option__title">{{ props.option.name }}</span>
                <span class="option__bage label-text">{{
                    props.option.type
                  }}</span>
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
                :open.sync="isCalendarOpen"
            >
              <template #header>
                <button
                    class="mx-datepicker-popup-close button button_simple"
                    @click="isCalendarOpen = false"
                >
                  <SvgIcon iconName="close" />
                </button>
              </template>
            </Calendar>
          </div>

          <div class="g-col g-col_22 g-col_t-33 g-col_m-100 pb-12">
            <DropdownSelect
                :options="getTypes"
                :value="formData.types.label"
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
                  :min-data="getMinPrice"
                  :max-data="getMaxPrice"
                  :formatter="(price) => `${price.toLocaleString()} €`"
                  @change="handlePriceChange"
              />
            </div>

            <div class="g-col g-col_33">
              <div class="label-text fs-12 text-white mb-8">
                {{ $t("cabin_count_search.translation") }}
              </div>

              <Slider
                  :min-data="getMinCabins"
                  :max-data="getMaxCabins"
                  @change="handleCabinsChange"
              />
            </div>

            <div class="g-col g-col_33">
              <div class="label-text fs-12 text-white mb-8">
                {{ $t("boat_year_search.translation") }}
              </div>

              <Slider
                  :min-data="getMinYear"
                  :max-data="getMaxYear"
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
import { useSearch } from '@/stores/search.js'

const searchData = useSearch()
</script>

<script>
// import DropdownSelect from "@/components/Dropdowns/Select/Select.vue";
// import Slider from "@/components/Slider/Slider";
// import Calendar from "@/components/Calendars/DateTimePicker";
// import Multiselect from "@/components/Inputs/Multiselect";
// import SvgIcon from "@/components/SvgIcon/SvgIcon";
//
// import debounce from "lodash/debounce";
//
// import { createNamespacedHelpers } from "vuex";
// import { IS_DEV } from "@/utils/config";
//
// const { mapState, mapMutations } = createNamespacedHelpers("searchForm");

export default {
  props: {
    filters: {
      type: Object,
    },
    loaded: Boolean,
  },
  data() {
    return {
      isLoadingForm: false,
      isError: false,
      clearable: true,
      isCalendarOpen: false,
    };
  },
  computed: {
    getTypes() {
      return [
        { label: this.$t("личный_кабинет__готово__69.translation"), value: "" },
        { label: this.$t("type_sailboat.translation"), value: 2 },
        { label: this.$t("type_motorboat.translation"), value: 4 },
        { label: this.$t("type_catamaran.translation"), value: 3 },
        { label: this.$t("type_riverboat.translation"), value: 5 },
        { label: this.$t("type_trimaran.translation"), value: 6 },
        { label: this.$t("type_gulet.translation"), value: 1 },
      ];
    },
    getMinPrice() {
      if (this.filters.pricesRange) {
        return parseInt(this.filters.pricesRange.min);
      }
      return 0;
    },
    getMaxPrice() {
      if (this.filters.pricesRange) {
        return parseInt(this.filters.pricesRange.max);
      }
      return 100000;
    },
    getMinCabins() {
      if (this.filters.cabinsRange) {
        return parseInt(this.filters.cabinsRange[0].min);
      }
      return 0;
    },
    getMaxCabins() {
      if (this.filters.cabinsRange) {
        return parseInt(this.filters.cabinsRange[0].max);
      }
      return 0;
    },
    getMinYear() {
      if (!this.filters.boatYearsRange) {
        return 0;
      }
      const min = parseInt(this.filters.boatYearsRange[0].min);
      return min < 2000 ? 1999 : min;
    },
    getMaxYear() {
      if (this.filters.boatYearsRange) {
        return parseInt(this.filters.boatYearsRange[0].max);
      }
      return 0;
    },
    // ...mapState(["formData", "countries"]),
    date: {
      get() {
        return this.$store.state.searchForm.formData.date;
      },
      set(value) {
        // console.log(value);
        this.$store.commit("searchForm/setDates", value);
      },
    },
    error() {
      return this.isError ? "pick at least one country" : "";
    },
  },
  methods: {
    // ...mapMutations([
    //   "setPrice",
    //   "setCabins",
    //   "setYears",
    //   "setSelectedCountry",
    // ]),
    handleCabinsChange(value) {
      this.setCabins(value);
    },
    handleYearsChange([minValue, maxValue]) {
      this.setYears([minValue === 1999 ? 0 : minValue, maxValue]);
    },
    handlePriceChange(value) {
      this.setPrice(value);
    },
    submitSearch() {
      if (!this.formData.countries.length) {
        this.isError = true;
        return;
      }

      if (!IS_DEV) {
        this.$gtm.trackEvent({ event: "search" });
      }

      this.$router.push({
        path: "search",
        query: this.$store.getters["searchForm/query"],
      });
    },
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    yearsFormatter(v) {
      if (v < 2000) {
        return "< 2000";
      }
      return v;
    },
    selectNextWeek(emit) {
      const start = new Date();
      const end = new Date();
      end.setTime(end.getTime() + 7 * 24 * 3600 * 1000);
      const date = [start, end];
      emit(date);
    },
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
    if (!this.countries.length) {
      // список мест еще не загружался в форму
      this.$store.dispatch("searchForm/selectCountryRegion", {
        locale: this.$i18n.locale,
        query: "",
        countryCode: "",
      });
    }
  },
};
</script>

<style lang="scss">
@import "./main-search.scss";
</style>
