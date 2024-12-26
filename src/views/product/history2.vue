<template>
    <div>
        <h1>历史价格</h1>
        <h2>选择你要查询的商品</h2>


        <!-- 搜索结果表格 -->
        <el-table :data="historyResults" border style="margin-top: 20px; width: 80%;justify-content: center;">
            <!-- 商品ID列 -->
            <el-table-column prop="num_iid" label="商品ID" width="150"></el-table-column>
            <!-- 商品名称列 -->
            <el-table-column prop="title" label="商品名称"></el-table-column>
            <!-- 商品价格列 -->
            <el-table-column prop="price" label="价格" width="150"></el-table-column>
            <!-- 商品操作列 -->
            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <!-- 修改为带加号的按钮 -->
                    <el-button type="success" icon="el-icon-plus" @click="handleQuery(scope.row)">
                        查询
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>


</template>
<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { getHistoryFromMysql } from '@/api/history.js'
const historyResults = ref([
    { num_iid: null, title: null, price: null } // 明确表示 "无数据"
]);

const router = useRouter()

const readMysql = async (row) => {
    const response = await getHistoryFromMysql();
    const data = JSON.parse(response.data)
    console.log(data)
    historyResults.value = data
}

onMounted(() => {
    readMysql()
})

</script>

