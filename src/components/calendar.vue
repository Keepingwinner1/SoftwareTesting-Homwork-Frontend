<template>
  <div>
    <h1>万年历问题</h1>
    <p class="question">
      对应问题2:万年历问题（用边界值方法分别分析和设计测试用例）此处假设年的范围由输入指定[start,end]，月的范围为[1,12]，日的范围为[1,31]。
    </p>
    <p class="question">
      对应问题10:万年历问题（等价类方法分别分析和设计测试用例）。
      此处假设年的范围由输入指定[start,end]，月的范围为[1,12]，日的范围为[1,31]。
    </p>
    <p class="question">
      对应问题11：万年历问题（用决策表设计测试用例，将年份划分成：非闰年，被4整除不被100整除的闰年和被400整除的闰年）。
      此处假设年的范围由输入指定[start,end]，月的范围为[1,12]，日的范围为[1,31]。
    </p>
    <el-divider></el-divider>
    <h2>边界值法</h2>
    <div class="range-setting">
      <el-form :inline="true" :model="range2" class="demo-form-inline">
        <el-form-item label="年份范围">
          <el-input-number v-model="range2.minYear" :min="1" :max="range2.maxYear" placeholder="最小年份"></el-input-number>
          <span class="range-separator">至</span>
          <el-input-number v-model="range2.maxYear" :min="range2.minYear" placeholder="最大年份"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRange2">应用范围</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manual-input">
      <el-form :inline="true" :model="form2" class="demo-form-inline">
        <el-form-item label="属性">
          <el-select v-model="form2.property" placeholder="请选择属性">
            <el-option label="年份略高于最小值" value="年份略高于最小值"></el-option>
            <el-option label="年份略低于最小值" value="年份略低于最小值"></el-option>
            <el-option label="年份略高于最大值" value="年份略高于最大值"></el-option>
            <el-option label="年份略低于最大值" value="年份略低于最大值"></el-option>
            <el-option label="年份最大值" value="年份最大值"></el-option>
            <el-option label="年份最小值" value="年份最小值"></el-option>
            <el-option label="月份略高于最小值" value="月份略高于最小值"></el-option>
            <el-option label="月份略低于最小值" value="月份略低于最小值"></el-option>
            <el-option label="月份略高于最大值" value="月份略高于最大值"></el-option>
            <el-option label="月份略低于最大值" value="月份略低于最大值"></el-option>
            <el-option label="月份最大值" value="月份最大值"></el-option>
            <el-option label="月份最小值" value="月份最小值"></el-option>
            <el-option label="日期略高于最小值" value="日期略高于最小值"></el-option>
            <el-option label="日期略低于最小值" value="日期略低于最小值"></el-option>
            <el-option label="日期略高于最大值" value="日期略高于最大值"></el-option>
            <el-option label="日期略低于最大值" value="日期略低于最大值"></el-option>
            <el-option label="日期最大值" value="日期最大值"></el-option>
            <el-option label="日期最小值" value="日期最小值"></el-option>
            <el-option label="正常值" value="正常值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年">
          <el-input v-model="form2.year" placeholder="请输入年份"></el-input>
        </el-form-item>
        <el-form-item label="月">
          <el-input v-model="form2.month" placeholder="请输入月份"></el-input>
        </el-form-item>
        <el-form-item label="日">
          <el-input v-model="form2.day" placeholder="请输入日期"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-select v-model="form2.expect" placeholder="请选择预期结果">
            <el-option label="年份越界" value="年份越界"></el-option>
            <el-option label="月份越界" value="月份越界"></el-option>
            <el-option label="日期越界" value="日期越界"></el-option>
            <el-option label="日期不合法" value="日期不合法"></el-option>
            <el-option label="日期合法" value="日期合法"></el-option>
          </el-select>
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
          prop="property"
          label="属性"
          width="180">
        </el-table-column>
        <el-table-column
          prop="year"
          label="年"
          width="180">
        </el-table-column>
        <el-table-column
          prop="month"
          label="月"
          width="180">
        </el-table-column>
        <el-table-column
          prop="day"
          label="日"
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
        </el-table-column>
      </el-table>
    </template>
    <el-divider></el-divider>
    <h2>等价类法</h2>
    <div class="range-setting">
      <el-form :inline="true" :model="range" class="demo-form-inline">
        <el-form-item label="年份范围">
          <el-input-number v-model="range.minYear" :min="1" :max="range.maxYear" placeholder="最小年份"></el-input-number>
          <span class="range-separator">至</span>
          <el-input-number v-model="range.maxYear" :min="range.minYear" placeholder="最大年份"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRange">应用范围</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manual-input">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="等价类类别">
          <el-select v-model="form.yearEquivalenceClass" placeholder="请选择年份等价类">
            <el-option label="闰年" value="闰年"></el-option>
            <el-option label="平年" value="平年"></el-option>
            <el-option label="年份小于下限" value="年份小于下限"></el-option>
            <el-option label="年份大于上限" value="年份大于上限"></el-option>
          </el-select>
          <el-select v-model="form.monthEquivalenceClass" placeholder="请选择月份等价类" style="margin-left: 10px">
            <el-option label="31天月份" value="31天月份"></el-option>
            <el-option label="30天月份" value="30天月份"></el-option>
            <el-option label="2月" value="2月"></el-option>
            <el-option label="月份小于下限" value="月份小于下限"></el-option>
            <el-option label="月份大于上限" value="月份大于上限"></el-option>
          </el-select>
          <el-select v-model="form.dayEquivalenceClass" placeholder="请选择日期等价类" style="margin-left: 10px">
            <el-option label="1-28日（所有月份有效）" value="1-28日（所有月份有效）"></el-option>
            <el-option label="29-31日（仅31天月份有效）" value="29-31日（仅31天月份有效）"></el-option>
            <el-option label="29-30日（仅30天月份有效）" value="29-30日（仅30天月份有效）"></el-option>
            <el-option label="29日（仅闰年2月有效）" value="29日（仅闰年2月有效）"></el-option>
            <el-option label="超出月份天数" value="超出月份天数"></el-option>
            <el-option label="非法数值" value="非法数值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年">
          <el-input v-model="form.year" placeholder="请输入年份"></el-input>
        </el-form-item>
        <el-form-item label="月">
          <el-input v-model="form.month" placeholder="请输入月份"></el-input>
        </el-form-item>
        <el-form-item label="日">
          <el-input v-model="form.day" placeholder="请输入日期"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-select v-model="form.expect" placeholder="请选择预期结果">
            <el-option label="年份越界" value="年份越界"></el-option>
            <el-option label="月份越界" value="月份越界"></el-option>
            <el-option label="日期越界" value="日期越界"></el-option>
            <el-option label="日期不合法" value="日期不合法"></el-option>
            <el-option label="日期合法" value="日期合法"></el-option>
          </el-select>
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
          prop="yearEquivalenceClass"
          label="年份等价类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="monthEquivalenceClass"
          label="月份等价类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dayEquivalenceClass"
          label="日期等价类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="year"
          label="年"
          width="180">
        </el-table-column>
        <el-table-column
          prop="month"
          label="月"
          width="180">
        </el-table-column>
        <el-table-column
          prop="day"
          label="日"
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
        </el-table-column>
      </el-table>
    </template>
    <el-divider></el-divider>
    <h2>决策表法</h2>
    <div class="range-setting">
      <el-form :inline="true" :model="range3" class="demo-form-inline">
        <el-form-item label="年份范围">
          <el-input-number v-model="range3.minYear" :min="1" :max="range3.maxYear" placeholder="最小年份"></el-input-number>
          <span class="range-separator">至</span>
          <el-input-number v-model="range3.maxYear" :min="range3.minYear" placeholder="最大年份"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRange3">应用范围</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manual-input">
      <el-form :inline="true" :model="form3" class="demo-form-inline">
        <el-form-item label="决策条件">
          <el-select v-model="form3.yearDecision" placeholder="请选择年份决策条件" style="margin-right: 10px">
            <el-option label="非闰年" value="非闰年"></el-option>
            <el-option label="被4整除不被100整除的闰年" value="被4整除不被100整除的闰年"></el-option>
            <el-option label="被400整除的闰年" value="被400整除的闰年"></el-option>
          </el-select>
          <el-select v-model="form3.monthDecision" placeholder="请选择月份决策条件" style="margin-right: 10px">
            <el-option label="M1 = {2}" value="M1"></el-option>
            <el-option label="M2 = {1,3,5,7,8,10}" value="M2"></el-option>
            <el-option label="M3 = {4,6,9,11}" value="M3"></el-option>
            <el-option label="M4 = {12}" value="M4"></el-option>
          </el-select>
          <el-select v-model="form3.dayDecision" placeholder="请选择日期决策条件">
            <el-option label="D1 = {1~27}" value="D1"></el-option>
            <el-option label="D2 = {28}" value="D2"></el-option>
            <el-option label="D3 = {29}" value="D3"></el-option>
            <el-option label="D4 = {30}" value="D4"></el-option>
            <el-option label="D5 = {31}" value="D5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年">
          <el-input v-model="form3.year" placeholder="请输入年份"></el-input>
        </el-form-item>
        <el-form-item label="月">
          <el-input v-model="form3.month" placeholder="请输入月份"></el-input>
        </el-form-item>
        <el-form-item label="日">
          <el-input v-model="form3.day" placeholder="请输入日期"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-select v-model="form3.expect" placeholder="请选择预期结果">
            <el-option label="年份越界" value="年份越界"></el-option>
            <el-option label="月份越界" value="月份越界"></el-option>
            <el-option label="日期越界" value="日期越界"></el-option>
            <el-option label="日期不合法" value="日期不合法"></el-option>
            <el-option label="日期合法" value="日期合法"></el-option>
          </el-select>
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
          prop="yearDecision"
          label="年份决策条件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="monthDecision"
          label="月份决策条件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dayDecision"
          label="日期决策条件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="year"
          label="年"
          width="180">
        </el-table-column>
        <el-table-column
          prop="month"
          label="月"
          width="180">
        </el-table-column>
        <el-table-column
          prop="day"
          label="日"
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
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      fileList: [],
      fileList2: [],
      fileList3: [],
      form: {
        year: '',
        month: '',
        day: '',
        expect: '',
        yearEquivalenceClass: '',
        monthEquivalenceClass: '',
        dayEquivalenceClass: ''
      },
      form2: {
        property: '',
        year: '',
        month: '',
        day: '',
        expect: ''
      },
      form3: {
        yearDecision: '',
        monthDecision: '',
        dayDecision: '',
        year: '',
        month: '',
        day: '',
        expect: ''
      },
      range: {
        minYear: 1,
        maxYear: 9999
      },
      range2: {
        minYear: 1,
        maxYear: 9999
      },
      range3: {
        minYear: 1,
        maxYear: 9999
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
              const [yearEquivalenceClass, monthEquivalenceClass, dayEquivalenceClass, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData.length + index + 1,
                yearEquivalenceClass,
                monthEquivalenceClass,
                dayEquivalenceClass,
                year,
                month,
                day,
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
    handleRemove2 (file, fileList) {
      console.log(file, fileList)
      // 清空对应的测试用例列表
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
        // 处理CSV文件
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim()) // 过滤空行
            .map((line, index) => {
              const [property, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData2.length + index + 1,
                property,
                year,
                month,
                day,
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
        // 处理Excel文件
        this.tableData2 = response
      }
    },
    submitForm () {
      if (!this.form.year || !this.form.month || !this.form.day || !this.form.expect || !this.form.yearEquivalenceClass || !this.form.monthEquivalenceClass || !this.form.dayEquivalenceClass) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData.length + 1,
        yearEquivalenceClass: this.form.yearEquivalenceClass,
        monthEquivalenceClass: this.form.monthEquivalenceClass,
        dayEquivalenceClass: this.form.dayEquivalenceClass,
        year: this.form.year,
        month: this.form.month,
        day: this.form.day,
        expect: this.form.expect,
        real: '',
        result: ''
      }
      this.tableData.push(newCase)
      this.form = { year: '', month: '', day: '', expect: '', yearEquivalenceClass: '', monthEquivalenceClass: '', dayEquivalenceClass: '' }
      this.$message.success('测试用例添加成功')
    },
    submitForm2 () {
      if (!this.form2.property || !this.form2.year || !this.form2.month || !this.form2.day || !this.form2.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData2.length + 1,
        property: this.form2.property,
        year: this.form2.year,
        month: this.form2.month,
        day: this.form2.day,
        expect: this.form2.expect,
        real: '',
        result: ''
      }
      this.tableData2.push(newCase)
      this.form2 = { property: '', year: '', month: '', day: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll () {
      try {
        const response = await this.$axios.post('http://localhost:5000/testAllCalendar', {
          testCases: this.tableData.map(item => ({
            year: item.year,
            month: item.month,
            day: item.day,
            expect: item.expect
          })),
          range: {
            minYear: this.range.minYear,
            maxYear: this.range.maxYear
          }
        })
        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    async testAll2 () {
      try {
        const response = await this.$axios.post('http://localhost:5000/testAllCalendar', {
          testCases: this.tableData2.map(item => ({
            year: item.year,
            month: item.month,
            day: item.day,
            expect: item.expect
          })),
          range: {
            minYear: this.range2.minYear,
            maxYear: this.range2.maxYear
          }
        })
        this.tableData2 = this.tableData2.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    applyRange () {
      if (this.range.minYear >= this.range.maxYear) {
        this.$message.error('最小年份必须小于最大年份')
        return
      }
      const invalidCases = this.tableData.filter(testCase => {
        const year = Number(testCase.year)
        return year < this.range.minYear || year > this.range.maxYear
      })
      if (invalidCases.length > 0) {
        this.$message.warning(`有${invalidCases.length}个测试用例超出范围，请检查`)
      } else {
        this.$message.success('范围设置成功')
      }
    },
    applyRange2 () {
      if (this.range2.minYear >= this.range2.maxYear) {
        this.$message.error('最小年份必须小于最大年份')
        return
      }
      const invalidCases = this.tableData2.filter(testCase => {
        const year = Number(testCase.year)
        return year < this.range2.minYear || year > this.range2.maxYear
      })
      if (invalidCases.length > 0) {
        this.$message.warning(`有${invalidCases.length}个测试用例超出范围，请检查`)
      } else {
        this.$message.success('范围设置成功')
      }
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
              const [yearEquivalenceClass, monthEquivalenceClass, dayEquivalenceClass, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData.length + index + 1,
                yearEquivalenceClass,
                monthEquivalenceClass,
                dayEquivalenceClass,
                year,
                month,
                day,
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
        this.$axios.post('http://localhost:5000/calendar', file).then(response => {
          this.tableData = response.data
        })
      }
    },
    handleCsvUpload2 (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim()) // 过滤空行
            .map((line, index) => {
              const [property, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData2.length + index + 1,
                property,
                year,
                month,
                day,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData2 = [...this.tableData2, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        // 处理Excel文件
        this.$axios.post('http://localhost:5000/calendar', file).then(response => {
          this.tableData2 = response.data
        })
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
              const [yearDecision, monthDecision, dayDecision, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData3.length + index + 1,
                yearDecision,
                monthDecision,
                dayDecision,
                year,
                month,
                day,
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
      if (!this.form3.yearDecision || !this.form3.monthDecision || !this.form3.dayDecision || !this.form3.year || !this.form3.month || !this.form3.day || !this.form3.expect) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.tableData3.length + 1,
        yearDecision: this.form3.yearDecision,
        monthDecision: this.form3.monthDecision,
        dayDecision: this.form3.dayDecision,
        year: this.form3.year,
        month: this.form3.month,
        day: this.form3.day,
        expect: this.form3.expect,
        real: '',
        result: ''
      }
      this.tableData3.push(newCase)
      this.form3 = { yearDecision: '', monthDecision: '', dayDecision: '', year: '', month: '', day: '', expect: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAll3 () {
      try {
        const response = await this.$axios.post('http://localhost:5000/testAllCalendar', {
          testCases: this.tableData3.map(item => ({
            year: item.year,
            month: item.month,
            day: item.day,
            expect: item.expect
          })),
          range: {
            minYear: this.range3.minYear,
            maxYear: this.range3.maxYear
          }
        })
        this.tableData3 = this.tableData3.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    applyRange3 () {
      if (this.range3.minYear >= this.range3.maxYear) {
        this.$message.error('最小年份必须小于最大年份')
        return
      }
      const invalidCases = this.tableData3.filter(testCase => {
        const year = Number(testCase.year)
        return year < this.range3.minYear || year > this.range3.maxYear
      })
      if (invalidCases.length > 0) {
        this.$message.warning(`有${invalidCases.length}个测试用例超出范围，请检查`)
      } else {
        this.$message.success('范围设置成功')
      }
    },
    handleCsvUpload3 (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [yearDecision, monthDecision, dayDecision, year, month, day, expect] = line.split(',').map(item => item.trim())
              return {
                id: this.tableData3.length + index + 1,
                yearDecision,
                monthDecision,
                dayDecision,
                year,
                month,
                day,
                expect,
                real: '',
                result: ''
              }
            })
          this.tableData3 = [...this.tableData3, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        this.$axios.post('http://localhost:5000/calendar', file).then(response => {
          this.tableData3 = response.data
        })
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
