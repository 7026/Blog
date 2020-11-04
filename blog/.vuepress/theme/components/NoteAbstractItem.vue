<template>
  <div class="abstract-item" @click="$router.push(item.path)">
    <div v-if="item.frontmatter.img" class="img-cover">
      <img :src="item.frontmatter.img" class="cover-img" alt="" srcset="" />
    </div>
    <!-- <div class="test">111</div> -->
    <div class="info">
      <i v-if="item.frontmatter.sticky" class="iconfont reco-sticky"></i>
      <div class="title">
        <i v-if="item.frontmatter.keys" class="iconfont reco-lock"></i>
        <router-link :to="item.path">{{ item.title }}</router-link>
      </div>
      <div class="abstract" v-html="item.excerpt"></div>
      <PageInfo class="page-info" :pageInfo="item" :currentTag="currentTag">
      </PageInfo>
    </div>
  </div>
</template>

<script>
import PageInfo from "./PageInfo";
export default {
  components: { PageInfo },
  props: ["item", "currentPage", "currentTag"],
};
</script>

<style lang="stylus" scoped>
@require '../styles/mode.styl'
.page-info
  margin 0 2rem
  display inline-flex
  flex-wrap wrap
.abstract-item
  position relative
  margin 0 auto 20px
  padding 16px 20px
  width 100%
  overflow hidden
  border-radius $borderRadius
  box-shadow var(--box-shadow)
  box-sizing border-box
  transition all 0.3s
  background-color var(--background-color)
  cursor pointer
  display inline-flex
  > *
    pointer-events auto
    // 自添加样式
  .img-cover
    max-width 320px
    max-height 220px
    flex 1
    overflow hidden
    border-radius 0.5rem
  .cover-img
    border-radius 0.5rem
    max-height 220px
    transition 1s ease-out
  .cover-img:hover
    transform scale3d(1.1, 1.1, 1)
  .info
    flex 1
    display flex
    flex-direction column
    justify-content center
    .abstract
      margin 0 2rem
  .reco-sticky
    position absolute
    top 0
    left 0
    display inline-block
    color $accentColor
    font-size 2.4rem
  &:hover
    box-shadow var(--box-shadow-hover)
  .title
    position relative
    font-size 1.28rem
    line-height 46px
    display inline-block
    margin 0 2rem
    a
      color var(--text-color)
    .reco-lock
      font-size 1.28rem
      color $accentColor
    &:after
      content ''
      position absolute
      width 100%
      height 2px
      bottom 0
      left 0
      background-color $accentColor
      visibility hidden
      -webkit-transform scaleX(0)
      transform scaleX(0)
      transition 0.3s ease-in-out
    &:hover a
      color $accentColor
    &:hover:after
      visibility visible
      -webkit-transform scaleX(1)
      transform scaleX(1)
  .tags
    margin 0 2rem
    .tag-item
      &.active
        color $accentColor
      &:hover
        color $accentColor
@media (max-width $MQMobile)
  .abstract
    margin 0 !important
  .tags
    display block
    margin-top 1rem
    margin-left 0 !important
  .abstract-item
    display block
    text-align center
    .img-cover
      width 100%
      max-width 320px
      display inline-flex
      margin 0 auto
      .cover-img
        border-radius 0.5rem
        max-width 320px
        transition 1s ease-out
      .cover-img:hover
        transform scale3d(1.1, 1.1, 1)
// 自定义样式
@media (max-width 1126px)
  .img-cover
    max-width 200px
    flex 1
    overflow hidden
    border-radius 0.5rem
    display flex
    align-items center
    .cover-img
      border-radius 0.5rem
      max-width 200px
      transition 1s ease-out
@media (max-width 1080px)
  .img-cover
    display none
</style>
