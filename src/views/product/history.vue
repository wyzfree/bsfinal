
<template>
    <div>
        <div class="text1">历史价格</div>
        <h2>选择你要查询的商品</h2>


        <!-- 搜索结果表格 -->
        <el-table :data="historyResults" border style="margin-top: 20px; width: 80%;justify-content: center;">
            <!-- 商品ID列 -->
            <el-table-column prop="pid" label="商品ID" width="150"></el-table-column>
            <!-- 商品名称列 -->
            <el-table-column prop="pname" label="商品名称"></el-table-column>
            <!-- 商品价格列 -->
            <el-table-column prop="price" label="价格" width="150"></el-table-column>
            <!-- 商品时间列 -->
            <el-table-column prop="ptime" label="时间" width="190"></el-table-column>
            <!-- 商品操作列 -->
            <el-table-column label="操作1" width="150">
                <template #default="scope">
                    <el-button type="success" icon="el-icon-plus" @click="handleQuery(scope.row)">
                        查询
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作2" width="150">
                <template #default="scope">
                    <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>查询结果</h2>
        <el-table :data="certainResults" border style="margin-top: 20px; width: 80%;justify-content: center;">
            <!-- 商品ID列 -->
            <el-table-column prop="pid" label="商品ID" width="150"></el-table-column>
            <!-- 商品名称列 -->
            <el-table-column prop="pname" label="商品名称"></el-table-column>
            <!-- 商品价格列 -->
            <el-table-column prop="price" label="价格" width="150"></el-table-column>
            <!-- 商品时间列 -->
            <el-table-column prop="ptime" label="时间" width="190"></el-table-column>
        </el-table>


         <!-- 图表 -->
    <div id="chart" style="width: 80%; height: 400px; margin: 20px auto;"></div>
    </div>


</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { onMounted, watch } from 'vue'
import { ref } from 'vue'
import { getHistoryFromMysql, deleteHistoryFromMysql, getCertainFromMysql } from '@/api/history.js'
import * as echarts from 'echarts'

const historyResults = ref([
    { pid: null, pname: null, price: null, ptime: null } // 明确表示 "无数据"
]);
const certainResults = ref([
    { pid: null, pname: null, price: null, ptime: null } // 明确表示 "无数据"
]);

const router = useRouter()

const readMysql = async (row) => {
    const response = await getHistoryFromMysql();
    const data = JSON.parse(response.data)
    console.log(data)
    historyResults.value = data
}

const handleDelete = async (row) => {
    const id = row.pid
    console.log(id)
    let result = await deleteHistoryFromMysql(id)
    await readMysql()
    ElMessage.success(result.message ? result.message : '删除成功')
}
const handleQuery = async (row) => {
    const id = row.pid
    //console.log(id)
    let result = await getCertainFromMysql(id)
    const data = JSON.parse(result.data)
    certainResults.value = data
    //console.log(certainResults.value)
}

const drawChart = () => {
  // 获取图表容器
  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)

  // 从查询结果中提取时间和价格
  const times = certainResults.value.map(item => item.ptime)
  const prices = certainResults.value.map(item => item.price)

  // 配置图表选项
  const option = {
    title: {
      text: '历史价格展示',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: times,
      axisLabel: {
        rotate: 45 // 旋转横轴标签，防止重叠
      }
    },
    yAxis: {
      type: 'value',
      name: '价格'
    },
    series: [
      {
        data: prices,
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  }

  // 设置选项并绘制图表
  myChart.setOption(option)
}

// 监听查询结果变化，动态更新图表
watch(certainResults, () => {
  drawChart()
})

onMounted(() => {
    readMysql()
})


</script>


<style scoped>
.text1 {
    font-size: 30px;
    font-weight: bold;
    color: #3e95e1;
}
</style>
