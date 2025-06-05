<template>
  <div>
    <h1>电信收费问题</h1>
    <p class="question">
      对应问题7：研究一个与我们的生活息息相关的电信收费问题系统。
      需求描述如下：
      <br>A.每月的电话总费用=基本月租费+折扣后的实际的通话费，如果没有折扣则按实际通话费计算，基本月租费为25元，每分钟通话费为0.15元。
      <br>B.实际通话费是否有折扣与当月的通话时间（分钟）和本年度至本月的累计未按时缴费的次数有关。
      <br>C.当月的通话分钟数和折扣比例及本年度未按时缴费次数之间有直接的对应关系，如果本年度的未按时缴费的次数超过本月通话时间所对应的容许值则免于折扣，并按实际的通话费计算。
      <br>D.通话时间和折扣比例及未按时缴费次数的关系为：
      <br>
      <table border="1" style="border-collapse: collapse; margin: 10px 0; border-color: #409EFF;">
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">本月通话的分钟数</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">通话时间段的最大容许不按时缴费次数</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">通话时间段的折扣率</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">0＜ 通话时间≤60</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">1</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">1.0％</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">60＜ 通话时间≤120</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">2</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">1.5％</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">120＜ 通话时间≤180</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">3</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">2.0％</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">180＜ 通话时间≤300</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">3</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">2.5％</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #409EFF;">300＜ 通话时间</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">6</td>
          <td style="padding: 8px; border: 1px solid #409EFF;">3.0％</td>
        </tr>
      </table>
    </p>
    <el-divider></el-divider>
    <h2>边界值法</h2>
    <div class="manual-input">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="属性">
          <el-select v-model="form.property" placeholder="请选择属性">
            <el-option label="通话时间略高于最小值" value="通话时间略高于最小值"></el-option>
            <el-option label="通话时间略低于最小值" value="通话时间略低于最小值"></el-option>
            <el-option label="通话时间略高于最大值" value="通话时间略高于最大值"></el-option>
            <el-option label="通话时间略低于最大值" value="通话时间略低于最大值"></el-option>
            <el-option label="通话时间最大值" value="通话时间最大值"></el-option>
            <el-option label="通话时间最小值" value="通话时间最小值"></el-option>
            <el-option label="不按时缴费次数略高于最小值" value="不按时缴费次数略高于最小值"></el-option>
            <el-option label="不按时缴费次数略低于最小值" value="不按时缴费次数略低于最小值"></el-option>
            <el-option label="不按时缴费次数略高于最大值" value="不按时缴费次数略高于最大值"></el-option>
            <el-option label="不按时缴费次数略低于最大值" value="不按时缴费次数略低于最大值"></el-option>
            <el-option label="不按时缴费次数最大值" value="不按时缴费次数最大值"></el-option>
            <el-option label="不按时缴费次数最小值" value="不按时缴费次数最小值"></el-option>
            <el-option label="通话时间正常值" value="通话时间正常值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通话时间(分钟)">
          <el-input v-model="form.minute" placeholder="请输入通话时间"></el-input>
        </el-form-item>
        <el-form-item label="不按时缴费次数">
          <el-input v-model="form.times" placeholder="请输入不按时缴费次数"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-input v-model="form.expect" placeholder="请输入预期结果"></el-input>
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
    </div>
    <el-alert
      v-if="tableData.length > 0"
      :title="`测试通过率: ${successRate}%`"
      :type="successRate === 100 ? 'success' : successRate >= 80 ? 'warning' : 'error'"
      :closable="false"
      style="margin: 10px 0">
    </el-alert>
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
          prop="minute"
          label="通话时间(分钟)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="times"
          label="不按时缴费次数"
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

    <el-divider></el-divider>
    <h2>等价类法</h2>
    <div class="manual-input">
      <el-form :inline="true" :model="form2" class="demo-form-inline">
        <el-form-item label="等价类类别">
          <el-select v-model="form2.minuteEquivalenceClass" placeholder="请选择通话时间等价类">
            <el-option label="小于0分钟" value="小于0分钟"></el-option>
            <el-option label="0-60分钟" value="0-60分钟"></el-option>
            <el-option label="60-120分钟" value="60-120分钟"></el-option>
            <el-option label="120-180分钟" value="120-180分钟"></el-option>
            <el-option label="180-300分钟" value="180-300分钟"></el-option>
            <el-option label="300-44640分钟" value="300-44640分钟"></el-option>
            <el-option label="大于44640分钟" value="大于44640分钟"></el-option>
          </el-select>
          <el-select v-model="form2.timesEquivalenceClass" placeholder="请选择不按时缴费次数等价类" style="margin-left: 10px">
            <el-option label="小于0次" value="小于0次"></el-option>
            <el-option label="0-1次" value="0-1次"></el-option>
            <el-option label="2-3次" value="2-3次"></el-option>
            <el-option label="4-6次" value="4-6次"></el-option>
            <el-option label="7-11次" value="7-11次"></el-option>
            <el-option label="大于11次" value="大于11次"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通话时间(分钟)">
          <el-input v-model="form2.minute" placeholder="请输入通话时间"></el-input>
        </el-form-item>
        <el-form-item label="不按时缴费次数">
          <el-input v-model="form2.times" placeholder="请输入不按时缴费次数"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-input v-model="form2.expect" placeholder="请输入预期结果"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm2">添加测试用例</el-button>
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="handleCsvUpload2"
            :on-preview="handlePreview2"
            :on-remove="handleRemove2"
            :before-remove="beforeRemove2"
            multiple
            :limit="100"
            :on-exceed="handleExceed2"
            :on-success="Success2"
            :file-list="fileList2"
            accept=".xlsx,.xls,.csv">
            <el-button type="success">上传测试用例</el-button>
            <span v-if="fileList2.length > 0" style="margin-left: 10px; color: #67C23A;">
              已上传: {{ fileList2[0].name }}
            </span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="testAll2" style="margin-left: 10px">测试所有用例</el-button>
      <el-button type="danger" @click="clearAll2" style="margin-left: 10px">清空测试用例</el-button>
    </div>
    <el-alert
      v-if="tableData2.length > 0"
      :title="`测试通过率: ${successRate2}%`"
      :type="successRate2 === 100 ? 'success' : successRate2 >= 80 ? 'warning' : 'error'"
      :closable="false"
      style="margin: 10px 0">
    </el-alert>
    <template>
      <el-table
        stripe
        :data="tableData2"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用例编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minuteEquivalenceClass"
          label="通话时间等价类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="timesEquivalenceClass"
          label="不按时缴费次数等价类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minute"
          label="通话时间(分钟)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="times"
          label="不按时缴费次数"
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

    <el-divider></el-divider>
    <h2>决策表法</h2>
    <div class="manual-input">
      <el-form :inline="true" :model="form3" class="demo-form-inline">
        <el-form-item label="决策条件">
          <el-select v-model="form3.minuteDecision" placeholder="请选择通话时间决策条件" style="margin-right: 10px">
            <el-option label="T1 = {0-60}" value="T1"></el-option>
            <el-option label="T2 = {61-120}" value="T2"></el-option>
            <el-option label="T3 = {121-180}" value="T3"></el-option>
            <el-option label="T4 = {181-300}" value="T4"></el-option>
            <el-option label="T5 = {300-44640}" value="T5"></el-option>
          </el-select>
          <el-select v-model="form3.timesDecision" placeholder="请选择不按时缴费次数决策条件">
            <el-option label="N1 = {0-1}" value="N1"></el-option>
            <el-option label="N2 = {2}" value="N2"></el-option>
            <el-option label="N3 = {3}" value="N3"></el-option>
            <el-option label="N4 = {4-6}" value="N4"></el-option>
            <el-option label="N5 = {7-11}" value="N5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通话时间(分钟)">
          <el-input v-model="form3.minute" placeholder="请输入通话时间"></el-input>
        </el-form-item>
        <el-form-item label="不按时缴费次数">
          <el-input v-model="form3.times" placeholder="请输入不按时缴费次数"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-input v-model="form3.expect" placeholder="请输入预期结果"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm3">添加测试用例</el-button>
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="handleCsvUpload3"
            :on-preview="handlePreview3"
            :on-remove="handleRemove3"
            :before-remove="beforeRemove3"
            multiple
            :limit="100"
            :on-exceed="handleExceed3"
            :on-success="Success3"
            :file-list="fileList3"
            accept=".xlsx,.xls,.csv">
            <el-button type="success">上传测试用例</el-button>
            <span v-if="fileList3.length > 0" style="margin-left: 10px; color: #67C23A;">
              已上传: {{ fileList3[0].name }}
            </span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="testAll3" style="margin-left: 10px">测试所有用例</el-button>
      <el-button type="danger" @click="clearAll3" style="margin-left: 10px">清空测试用例</el-button>
    </div>
    <el-alert
      v-if="tableData3.length > 0"
      :title="`测试通过率: ${successRate3}%`"
      :type="successRate3 === 100 ? 'success' : successRate3 >= 80 ? 'warning' : 'error'"
      :closable="false"
      style="margin: 10px 0">
    </el-alert>
    <template>
      <el-table
        stripe
        :data="tableData3"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用例编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minuteDecision"
          label="通话时间决策条件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="timesDecision"
          label="不按时缴费次数决策条件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minute"
          label="通话时间(分钟)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="times"
          label="不按时缴费次数"
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
  name: 'charge',
  data () {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      fileList: [],
      fileList2: [],
      fileList3: [],
      successRate: 0,
      successRate2: 0,
      successRate3: 0,
      form: {
        property: '',
        minute: '',
        times: '',
        expect: ''
      },
      form2: {
        minuteEquivalenceClass: '',
        timesEquivalenceClass: '',
        minute: '',
        times: '',
        expect: ''
      },
      form3: {
        minuteDecision: '',
        timesDecision: '',
        minute: '',
        times: '',
        expect: ''
      }
    }
  },
  methods: {
    handleCsvUpload (options) {
      const file = options.file
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const lines = text.split('\n')
        const newCases = lines
          .filter(line => line.trim())
          .map((line, index) => {
            const [property, minute, times, expect] = line.split(',').map(item => item.trim())
            return {
              id: this.tableData.length + index + 1,
              property,
              minute,
              times,
              expect,
              real: '',
              result: ''
            }
          })
        this.tableData = [...this.tableData, ...newCases]
        this.$message.success(`成功导入${newCases.length}个测试用例`)
      }
      reader.readAsText(file)
    },
    handleCsvUpload2 (options) {
      const file = options.file
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const lines = text.split('\n')
        const newCases = lines
          .filter(line => line.trim())
          .map((line, index) => {
            const [minuteEquivalenceClass, timesEquivalenceClass, minute, times, expect] = line.split(',').map(item => item.trim())
            return {
              id: this.tableData2.length + index + 1,
              minuteEquivalenceClass,
              timesEquivalenceClass,
              minute,
              times,
              expect,
              real: '',
              result: ''
            }
          })
        this.tableData2 = [...this.tableData2, ...newCases]
        this.$message.success(`成功导入${newCases.length}个测试用例`)
      }
      reader.readAsText(file)
    },
    handleCsvUpload3 (options) {
      const file = options.file
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const lines = text.split('\n')
        const newCases = lines
          .filter(line => line.trim())
          .map((line, index) => {
            const [minuteDecision, timesDecision, minute, times, expect] = line.split(',').map(item => item.trim())
            return {
              id: this.tableData3.length + index + 1,
              minuteDecision,
              timesDecision,
              minute,
              times,
              expect,
              real: '',
              result: ''
            }
          })
        this.tableData3 = [...this.tableData3, ...newCases]
        this.$message.success(`成功导入${newCases.length}个测试用例`)
      }
      reader.readAsText(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
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
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [property, minute, times, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData.length + index + 1,
                property,
                minute,
                times,
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
        this.tableData = response
      }
    },
    submitForm () {
      if (!this.form.property || !this.form.minute || !this.form.times || !this.form.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData.length + 1,
        property: this.form.property,
        minute: this.form.minute,
        times: this.form.times,
        expect: this.form.expect,
        real: '',
        result: ''
      }
      this.tableData.push(newCase)
      this.form = { property: '', minute: '', times: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll () {
      try {
        const response = await axios.post('http://localhost:5000/testAllCharge', {
          testCases: this.tableData.map(item => ({
            minute: item.minute,
            times: item.times,
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
    // 等价类法相关方法
    handleRemove2 (file, fileList) {
      console.log(file, fileList)
      this.tableData2 = []
      this.fileList2 = []
    },
    handlePreview2 (file) {
      console.log(file)
    },
    handleExceed2 (files, fileList) {
      this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove2 (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    Success2 (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [minuteEquivalenceClass, timesEquivalenceClass, minute, times, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData2.length + index + 1,
                minuteEquivalenceClass,
                timesEquivalenceClass,
                minute,
                times,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData2 = [...this.tableData2, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.tableData2 = response
      }
    },
    submitForm2 () {
      if (!this.form2.minuteEquivalenceClass || !this.form2.timesEquivalenceClass || !this.form2.minute || !this.form2.times || !this.form2.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData2.length + 1,
        minuteEquivalenceClass: this.form2.minuteEquivalenceClass,
        timesEquivalenceClass: this.form2.timesEquivalenceClass,
        minute: this.form2.minute,
        times: this.form2.times,
        expect: this.form2.expect,
        real: '',
        result: ''
      }
      this.tableData2.push(newCase)
      this.form2 = { minuteEquivalenceClass: '', timesEquivalenceClass: '', minute: '', times: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll2 () {
      try {
        const response = await axios.post('http://localhost:5000/testAllCharge', {
          testCases: this.tableData2.map(item => ({
            minute: item.minute,
            times: item.times,
            expect: item.expect
          }))
        })
        this.tableData2 = this.tableData2.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.tableData2.filter(item => item.result === '通过').length
        this.successRate2 = Math.round((passedCount / this.tableData2.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAll2 () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData2 = []
        this.fileList2 = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    // 决策表法相关方法
    handleRemove3 (file, fileList) {
      console.log(file, fileList)
      this.tableData3 = []
      this.fileList3 = []
    },
    handlePreview3 (file) {
      console.log(file)
    },
    handleExceed3 (files, fileList) {
      this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove3 (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    Success3 (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [minuteDecision, timesDecision, minute, times, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData3.length + index + 1,
                minuteDecision,
                timesDecision,
                minute,
                times,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData3 = [...this.tableData3, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.tableData3 = response
      }
    },
    submitForm3 () {
      if (!this.form3.minuteDecision || !this.form3.timesDecision || !this.form3.minute || !this.form3.times || !this.form3.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData3.length + 1,
        minuteDecision: this.form3.minuteDecision,
        timesDecision: this.form3.timesDecision,
        minute: this.form3.minute,
        times: this.form3.times,
        expect: this.form3.expect,
        real: '',
        result: ''
      }
      this.tableData3.push(newCase)
      this.form3 = { minuteDecision: '', timesDecision: '', minute: '', times: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll3 () {
      try {
        const response = await axios.post('http://localhost:5000/testAllCharge', {
          testCases: this.tableData3.map(item => ({
            minute: item.minute,
            times: item.times,
            expect: item.expect
          }))
        })
        this.tableData3 = this.tableData3.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.tableData3.filter(item => item.result === '通过').length
        this.successRate3 = Math.round((passedCount / this.tableData3.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAll3 () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData3 = []
        this.fileList3 = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
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
.range-setting {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
.range-separator {
  margin: 0 10px;
}
.upload-demo {
  display: inline-block;
}
</style>
