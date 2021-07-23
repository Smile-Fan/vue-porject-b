<template>
  <div class="container">
    <div class="card-content">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :md="8">
            <a-card title="热销商品" :bordered="false">
              <p>商品1</p>
              <p>商品2</p>
            </a-card>
          </a-col>
          <a-col :md="8">
            <a-card title="昨日营收" :bordered="false">
              <p>营收1</p>
              <p>营收2</p>
            </a-card>
          </a-col>
          <a-col :md="8">
            <a-card title="系统公告" :bordered="false">
              <p>公告1</p>
              <p>公告2</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <charts />
  </div>
</template>

<script>
import charts from '@/components/charts/index.vue';

export default {
  components: {
    charts,
  },
};
</script>

<style lang="less" scoped>
.container {
  .paging {
    margin: 30px;
  }
}
</style>
