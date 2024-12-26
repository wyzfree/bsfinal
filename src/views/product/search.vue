<template>
    <div>
        <div class="text1">商品搜索</div>
        <!-- 搜索框和按钮 -->
        <div class="search-bar" style="display: flex; justify-content: center;width:80%;">
            <el-input v-model="searchQuery" placeholder="请输入商品名称" clearable></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>


        <!-- 搜索结果表格 -->
        <div class="text2">淘宝搜索结果</div>
        <el-table :data="TBsearchResults" border style="margin-top: 20px; width: 80%;justify-content: center;">
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
                    <el-button type="success" icon="el-icon-plus" @click="handleAdd(scope.row)">
                        添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

 

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchQuery = ref('')
const TBsearchResults = ref([
    { num_iid: null, title: null, price: null } 
]);

const JDsearchResults = ref([
    { num_iid: null, title: null, price: null } 
]);



// 定义搜索函数
import { TBsearchService,  addService } from '@/api/search.js' 
const handleSearch = async () => {
    // 将输入的查询字符串封装为对象
    const searchData = { keyword: searchQuery.value };
    //console.log(searchData)
    console.log('Calling searchService...');
    let TBresult = await TBsearchService( searchData )
    //let JDresult = await JDsearchService( searchData )
    // 后端返回的结果是字符串格式，需要解析为 JSON
    const TBparsedData = JSON.parse(TBresult.data)
    //const JDparsedData = JSON.parse(JDresult.data)
    // 将解析后的数据存入表格
    TBsearchResults.value = TBparsedData
    //JDsearchResults.value = JDparsedData
    console.log(TBparsedData)
    //console.log(JDparsedData)
    //ElMessage.success(result.message ? result.message : '搜索内容已发送')
}

const handleAdd = async (row) => {
    //console.log(row)
    const itemData = {
        num_iid: row.num_iid,
        title: row.title,
        price: row.price
    }
    console.log("展示itemData")
    console.log(itemData)

    let result = await addService(itemData)
    ElMessage.success(result.message ? result.message : '发送至后端')
}
</script>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}
.text1 {
    font-size: 30px;
    font-weight: bold;
    color: #3e95e1;
}

.text2 {
    font-size: 20px;
    font-weight: bold;
    color: #3e95e1;
    margin-left: 550px;
}
</style>
