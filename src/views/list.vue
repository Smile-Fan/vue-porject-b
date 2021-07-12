<template>
  <div class="list-container">
    <Drawer />
    <div class="search">
      <a-input
        placeholder="请输入关键词"
        style="width: 200px"
        v-model="keyWords"
      />
      <a-select
        :default-value="1"
        style="width: 120px"
        class="seletCategory"
        v-model="searchCategory"
      >
        <a-select-option
          :value="index"
          v-for="(item, index) in this.cateList"
          :key="index"
        >
          {{ item }}
        </a-select-option>
      </a-select>
      <a-button type="primary" icon="search" @click="handleClickSearch">
        检索
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record._id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, data">
        <span class="action" @click="edit(data)">编辑</span>
        <a-divider type="vertical" />
        <span class="action" @click="del(data)">删除</span>
        <a-divider type="vertical" />
        <span class="action" @click="more(data)"> 详情 </span>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getProduct, getCategory, delProduct } from '@/api/request';
import Drawer from '@/components/drawer/index.vue';

export default {
  data() {
    return {
      data: [],
      flag: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: true,
      },
      cateList: [],
      loading: false,
      keyWords: null,
      searchCategory: null,
      status: ['下架', '上架'],
    };
  },
  components: {
    Drawer,
  },
  created() {
    this.fetchCategory();
    this.fetch();
  },
  computed: {
    columns() {
      return this.$store.state.headTitle;
    },
  },
  methods: {
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      pager.pageSize = pagination.pageSize;
      this.pagination = pager;
      this.fetch({
        size: this.pagination.pageSize,
        page: this.pagination.current,
      });
    },
    fetch(params = {}) {
      this.loading = true;
      getProduct({
        page: 1,
        size: 10,
        ...params,
      }).then(({ data }) => {
        // eslint-disable-next-line no-param-reassign
        data.data = data.data.map((item) => ({
          ...item,
          categoryName: this.cateList[item.category],
          upStatus: this.status[item.status],
        }));
        const pagination = { ...this.pagination };
        pagination.total = data.total;
        this.loading = false;
        this.data = data.data;
        this.pagination = pagination;
      });
    },
    fetchCategory() {
      getCategory({ appkey: this.$store.state.userInfo.appkey }).then((data) => {
        data.data.data.forEach((item) => {
          this.cateList[item.id] = item.name;
        });
        this.cateList[0] = '全部';
        this.$store.dispatch('setCategoryInfo', data.data.data);
      });
    },
    edit(data) {
      this.$bus.$emit('edit', data);
      this.flag = true;
    },
    del(data) {
      delProduct({
        id: data.id,
      }).then((res) => {
        alert(res.msg);
      });
    },
    more(data) {
      console.log(data);
    },
    handleClickSearch() {
      this.fetch({
        searchWord: this.keyWords,
        category: this.searchCategory === 0 ? null : this.searchCategory,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.action {
  cursor: pointer;
  &:hover {
    color: #6565e2;
  }
}
.search {
  margin-bottom: 15px;
}
.seletCategory {
  margin: 0px 25px;
}
</style>
