<template>
  <section class="section section_top-double">
    <div class="container">
      <div class="g-row g-row_middle mb-24 g-row_d-wrap">
        <div class="g-col g-col_d-100">
          <div class="g-row g-row_middle g-row_m-column-reverse">
            <div class="g-col g-col_m-100 mb-8">
              <h2 class="h1">{{$t('index__trustpilot_rating_label.translation')}}</h2>
            </div>

            <div class="g-col g-col_m-100 mb-m-8">
              <Rating className="rating_large" />
            </div>
          </div>
        </div>

        <div class="g-col g-col_d-100">
          <span class="mr-4 text-grey">
            {{$t('main-trustpilot_based_on.translation')}}
          </span>

          <a href="https://www.trustpilot.com/review/searadar.com" target="_blank" class="link">
            <img src="@/assets/img/trustpilot2.svg" alt="trustpilot" />
          </a>
        </div>
      </div>

      <div class="g-row g-row_wrap">
        <template v-if="reviews.length">
          <div class="g-col g-col_50 g-col_d-60 g-col_t-50 pb-20 m-hidden">
            <ReviewLarge v-if="reviews[0]" :review="reviews[0]"/>
          </div>

          <div class="g-col g-col_25 g-col_d-40 g-col_t-50 g-col_m-100">
            <div class="g-row h-100 g-row_column">
              <div class="g-col g-col_same pb-20">
                <Review v-if="reviews[1]" :review="reviews[1]"/>
              </div>

              <div class="g-col g-col_same pb-20">
                <Review v-if="reviews[2]" :review="reviews[2]"/>
              </div>
            </div>
          </div>

          <div class="g-col g-col_25 g-col_d-100">
            <div class="g-row h-100 g-row_column">
              <div class="g-col g-col_same pb-20 d-hidden">
                <Review v-if="reviews[3]" :review="reviews[3]"/>
              </div>

              <div class="g-col g-col_same pb-20">
                <ReviewLink />
              </div>
            </div>
          </div>
        </template>
        <div v-else>reviews is loading...</div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import Rating from "@/components/Rating/Rating";
// import ReviewLarge from "@/components/Review/ReviewLarge";
// import Review from "@/components/Review/Review";
// import ReviewLink from "@/components/Review/ReviewLink";

defineProps(['reviews'])

</script>
