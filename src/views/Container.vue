<template>
  <div class="container">
    <div class="card-content">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :md="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :md="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :md="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
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
