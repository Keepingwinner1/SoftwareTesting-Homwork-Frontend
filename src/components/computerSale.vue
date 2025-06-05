<template>
  <div>
    <h1>电脑销售系统</h1>
    <p class="question">
      对应问题4：电脑销售系统，主机（25￥单位价格，每月最多销售的数量为70），显示器（30￥单位价格，每月最多销售数量为80），外设（45￥单位价格，每月最多销售的数量为90）；每个销售员每月至少销售一台完整的机器，当系统的主机这个变量接受到-1值的时候，系统自动统计该销售员本月的销售总额。当销售额小于等于1000（包括1000）按照10%提佣金，当销售额在1000-1800之间（包括1800）的时候按照15%提佣金，当销售额大于1800时按照20%提佣金。（用边界值方法分析和设计测试用例）</p>
    <el-divider></el-divider>
    <h2>边界值法</h2>
    <div class="manual-input">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="属性">
          <el-select v-model="form.property" placeholder="请选择属性">
            <el-option label="销售额等于1000" value="销售额等于1000"></el-option>
            <el-option label="销售额等于1800" value="销售额等于1800"></el-option>
            <el-option label="销售额略低于1000" value="销售额略低于1000"></el-option>
            <el-option label="销售额略高于1000" value="销售额略高于1000"></el-option>
            <el-option label="销售额略低于1800" value="销售额略低于1800"></el-option>
            <el-option label="销售额略高于1800" value="销售额略高于1800"></el-option>
            <el-option label="主机销量最小值" value="主机销量最小值"></el-option>
            <el-option label="主机销量最大值" value="主机销量最大值"></el-option>
            <el-option label="显示器销量最小值" value="显示器销量最小值"></el-option>
            <el-option label="显示器销量最大值" value="显示器销量最大值"></el-option>
            <el-option label="外设销量最小值" value="外设销量最小值"></el-option>
            <el-option label="外设销量最大值" value="外设销量最大值"></el-option>
            <el-option label="主机销量为0" value="主机销量为0"></el-option>
            <el-option label="显示器销量为0" value="显示器销量为0"></el-option>
            <el-option label="外设销量为0" value="外设销量为0"></el-option>
            <el-option label="主机销量超限" value="主机销量超限"></el-option>
            <el-option label="显示器销量超限" value="显示器销量超限"></el-option>
            <el-option label="外设销量超限" value="外设销量超限"></el-option>
            <el-option label="终止条件" value="终止条件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主机销量">
          <el-input v-model="form.host" placeholder="请输入主机销量"></el-input>
        </el-form-item>
        <el-form-item label="显示器销量">
          <el-input v-model="form.monitor" placeholder="请输入显示器销量"></el-input>
        </el-form-item>
        <el-form-item label="外设销量">
          <el-input v-model="form.peripheral" placeholder="请输入外设销量"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-input v-model="form.expect" placeholder="请输入预期结果（如：销售额<=1000 或 具体数字）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加测试用例</el-button>
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="handleCsvUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="100"
            :on-exceed="handleExceed"
            :on-success="Success"
            :file-list="fileList"
            accept=".xlsx,.xls,.csv">
            <el-button type="success">上传测试用例</el-button>
            <span v-if="fileList.length > 0" style="margin-left: 10px; color: #67C23A;">
              已上传: {{ fileList[0].name }}
            </span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="testAll" style="margin-left: 10px">测试所有用例</el-button>
      <el-button type="danger" @click="clearAll" style="margin-left: 10px">清空测试用例</el-button>
      <div v-if="tableData.length > 0" style="margin-top: 10px">
        <el-alert
          :title="`测试通过率: ${successRate}%`"
          :type="successRate === 100 ? 'success' : successRate >= 80 ? 'warning' : 'error'"
          :closable="false"
          show-icon>
        </el-alert>
      </div>
    </div>
    <template>
      <el-table
        stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用例编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="property"
          label="属性"
          width="180">
        </el-table-column>
        <el-table-column
          prop="host"
          label="主机销量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="monitor"
          label="显示器销量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="peripheral"
          label="外设销量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expect"
          label="预期结果"
          width="180">
        </el-table-column>
        <el-table-column
          prop="real"
          label="实际结果"
          width="180">
        </el-table-column>
        <el-table-column
          prop="result"
          label="是否通过"
          width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.result" :type="scope.row.result === '通过' ? 'success' : 'danger'">
              {{ scope.row.result }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'computerSale',
  data () {
    return {
      tableData: [],
      fileList: [],
      successRate: 0,
      form: {
        property: '',
        host: '',
        monitor: '',
        peripheral: '',
        expect: ''
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      // 清空对应的测试用例列表
      this.tableData = []
      this.fileList = []
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    Success (response, file) {
      if (file.name.endsWith('.csv')) {
        // 处理CSV文件
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim()) // 过滤空行
            .map((line, index) => {
              const [property, host, monitor, peripheral, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData.length + index + 1,
                property,
                host,
                monitor,
                peripheral,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData = [...this.tableData, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        // 处理Excel文件
        this.tableData = response
      }
    },
    submitForm () {
      if (!this.form.property || !this.form.host || !this.form.monitor || !this.form.peripheral || !this.form.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData.length + 1,
        property: this.form.property,
        host: this.form.host,
        monitor: this.form.monitor,
        peripheral: this.form.peripheral,
        expect: this.form.expect,
        real: '',
        result: ''
      }
      this.tableData.push(newCase)
      this.form = { property: '', host: '', monitor: '', peripheral: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll () {
      try {
        const response = await axios.post('http://localhost:5000/testAllComputerSale', {
          testCases: this.tableData.map(item => ({
            host: item.host,
            monitor: item.monitor,
            peripheral: item.peripheral,
            expect: item.expect
          }))
        })
        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.tableData.filter(item => item.result === '通过').length
        this.successRate = Math.round((passedCount / this.tableData.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAll () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = []
        this.fileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim()) // 过滤空行
            .map((line, index) => {
              const [property, host, monitor, peripheral, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData.length + index + 1,
                property,
                host,
                monitor,
                peripheral,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData = [...this.tableData, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        // 处理Excel文件
        axios.post('http://localhost:5000/computerSales', file).then(response => {
          this.tableData = response.data
        })
      }
    }
  }
}
</script>

<style scoped>
.manual-input {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
.upload-demo {
  display: inline-block;
}
</style>
