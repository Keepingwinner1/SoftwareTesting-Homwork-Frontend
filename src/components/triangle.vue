<template>
  <div>
  <h1>判断三角形类型</h1>
  <p class="question">对应问题1：判断三角形类型（用边界值分析和设计测试用例）</p>
  <p class="question">对应问题9：判断三角形类型（等价类方法分别分析和设计测试用例）</p>
  <el-divider></el-divider>
  <h2>边界值法</h2>
    <div class="range-setting">
      <el-form :inline="true" :model="range2" class="demo-form-inline">
        <el-form-item label="边长范围">
          <el-input-number v-model="range2.min" :min="1" :max="range2.max" placeholder="最小值"></el-input-number>
          <span class="range-separator">至</span>
          <el-input-number v-model="range2.max" :min="range2.min" placeholder="最大值"></el-input-number>
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
            <el-option label="a略高于最小值" value="a略高于最小值"></el-option>
            <el-option label="a略低于最小值" value="a略低于最小值"></el-option>
            <el-option label="a略高于最大值" value="a略高于最大值"></el-option>
            <el-option label="a略低于最大值" value="a略低于最大值"></el-option>
            <el-option label="a最大值" value="a最大值"></el-option>
            <el-option label="a最小值" value="a最小值"></el-option>
            <el-option label="b略高于最小值" value="b略高于最小值"></el-option>
            <el-option label="b略低于最小值" value="b略低于最小值"></el-option>
            <el-option label="b略高于最大值" value="b略高于最大值"></el-option>
            <el-option label="b略低于最大值" value="b略低于最大值"></el-option>
            <el-option label="b最大值" value="b最大值"></el-option>
            <el-option label="b最小值" value="b最小值"></el-option>
            <el-option label="c略高于最小值" value="c略高于最小值"></el-option>
            <el-option label="c略低于最小值" value="c略低于最小值"></el-option>
            <el-option label="c略高于最大值" value="c略高于最大值"></el-option>
            <el-option label="c略低于最大值" value="c略低于最大值"></el-option>
            <el-option label="c最大值" value="c最大值"></el-option>
            <el-option label="c最小值" value="c最小值"></el-option>
            <el-option label="正常值" value="正常值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="边长a">
          <el-input v-model="form2.a" placeholder="请输入边长a"></el-input>
        </el-form-item>
        <el-form-item label="边长b">
          <el-input v-model="form2.b" placeholder="请输入边长b"></el-input>
        </el-form-item>
        <el-form-item label="边长c">
          <el-input v-model="form2.c" placeholder="请输入边长c"></el-input>
        </el-form-item>
        <el-form-item label="预期结果">
          <el-select v-model="form2.expect" placeholder="请选择预期结果">
            <el-option label="边长小于下限" value="边长小于下限"></el-option>
            <el-option label="边长大于上限" value="边长大于上限"></el-option>
            <el-option label="非三角形" value="非三角形"></el-option>
            <el-option label="等边三角形" value="等边三角形"></el-option>
            <el-option label="等腰三角形" value="等腰三角形"></el-option>
            <el-option label="普通三角形" value="普通三角形"></el-option>
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
          prop="a"
          label="a"
          width="180">
        </el-table-column>
        <el-table-column
          prop="b"
          label="b"
          width="180">
        </el-table-column>
        <el-table-column
          prop="c"
          label="c"
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
      <el-form-item label="边长范围">
        <el-input-number v-model="range.min" :min="1" :max="range.max" placeholder="最小值"></el-input-number>
        <span class="range-separator">至</span>
        <el-input-number v-model="range.max" :min="range.min" placeholder="最大值"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="applyRange">应用范围</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="manual-input">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="等价类类别">
        <el-select v-model="form.equivalenceClass" placeholder="请选择等价类类别">
          <el-option label="a,b,c构成等边三角形" value="a,b,c构成等边三角形"></el-option>
          <el-option label="a,b,c构成非等边等腰三角形" value="a,b,c构成非等边等腰三角形"></el-option>
          <el-option label="a,b,c构成一般三角形" value="a,b,c构成一般三角形"></el-option>
          <el-option label="a,b,c不构成三角形" value="a,b,c不构成三角形"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="边长a">
        <el-input v-model="form.a" placeholder="请输入边长a"></el-input>
      </el-form-item>
      <el-form-item label="边长b">
        <el-input v-model="form.b" placeholder="请输入边长b"></el-input>
      </el-form-item>
      <el-form-item label="边长c">
        <el-input v-model="form.c" placeholder="请输入边长c"></el-input>
      </el-form-item>
      <el-form-item label="预期结果">
        <el-select v-model="form.expect" placeholder="请选择预期结果">
          <el-option label="边长小于下限" value="边长小于下限"></el-option>
          <el-option label="边长大于上限" value="边长大于上限"></el-option>
          <el-option label="非三角形" value="非三角形"></el-option>
          <el-option label="等边三角形" value="等边三角形"></el-option>
          <el-option label="等腰三角形" value="等腰三角形"></el-option>
          <el-option label="普通三角形" value="普通三角形"></el-option>
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
        <!-- <el-button type="success" @click="testAll">测试所有用例</el-button> -->
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
        prop="equivalenceClass"
        label="等价类类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="a"
        label="a"
        width="180">
      </el-table-column>
      <el-table-column
        prop="b"
        label="b"
        width="180">
      </el-table-column>
      <el-table-column
        prop="c"
        label="c"
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
  name: 'triangle',
  data () {
    return {
      tableData: [],
      tableData2: [],
      fileList: [],
      fileList2: [],
      form: {
        a: '',
        b: '',
        c: '',
        expect: '',
        equivalenceClass: ''
      },
      form2: {
        property: '',
        a: '',
        b: '',
        c: '',
        expect: '',
        equivalenceClass: ''
      },
      range: {
        min: 1,
        max: 100
      },
      range2: {
        min: 1,
        max: 100
      }
    }
  },
  methods:
    {
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
      // eslint-disable-next-line no-unused-vars
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },

      // eslint-disable-next-line no-unused-vars
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
                const [equivalenceClass, a, b, c, expect] = line.split(',').map(item => item.trim())
                return {
                  id: this.tableData.length + index + 1,
                  equivalenceClass,
                  a,
                  b,
                  c,
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
      // eslint-disable-next-line no-unused-vars
      beforeRemove2 (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },

      // eslint-disable-next-line no-unused-vars
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
                const [equivalenceClass, property, a, b, c, expect] = line.split(',').map(item => item.trim())
                return {
                  id: this.tableData2.length + index + 1,
                  equivalenceClass,
                  property,
                  a,
                  b,
                  c,
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
          this.$axios.post('http://localhost:5000/triangleType', file).then(response => {
            this.tableData2 = response.data
          })
        }
      },
      submitForm () {
        if (!this.form.a || !this.form.b || !this.form.c || !this.form.expect) {
          this.$message.error('请填写完整的测试用例信息')
          return
        }
        const newCase = {
          id: this.tableData.length + 1,
          a: this.form.a,
          b: this.form.b,
          c: this.form.c,
          expect: this.form.expect,
          real: '',
          result: '',
          equivalenceClass: this.form.equivalenceClass
        }
        this.tableData.push(newCase)
        this.form = { a: '', b: '', c: '', expect: '', equivalenceClass: '' }
        this.$message.success('测试用例添加成功')
      },

      submitForm2 () {
        if (!this.form2.property || !this.form2.a || !this.form2.b || !this.form2.c || !this.form2.expect) {
          this.$message.error('请填写完整的测试用例信息')
          return
        }
        const newCase = {
          id: this.tableData2.length + 1,
          property: this.form2.property,
          a: this.form2.a,
          b: this.form2.b,
          c: this.form2.c,
          expect: this.form2.expect,
          equivalenceClass: this.form2.equivalenceClass,
          real: '',
          result: ''
        }
        this.tableData2.push(newCase)
        this.form2 = { property: '', a: '', b: '', c: '', expect: '', equivalenceClass: '' }
        this.$message.success('测试用例添加成功')
      },

      async testAll () {
        try {
          const response = await this.$axios.post('http://localhost:5000/testAllTriangle', {
            testCases: this.tableData.map(item => ({
              a: item.a,
              b: item.b,
              c: item.c,
              expect: item.expect
            })),
            range: {
              min: this.range.min,
              max: this.range.max
            }
          })
          // 更新表格数据，保留原有的测试用例信息，只更新实际结果和是否通过
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
          const response = await this.$axios.post('http://localhost:5000/testAllTriangle', {
            testCases: this.tableData2.map(item => ({
              a: item.a,
              b: item.b,
              c: item.c,
              expect: item.expect
            })),
            range: {
              min: this.range2.min,
              max: this.range2.max
            }
          })
          // 更新表格数据，保留原有的测试用例信息，只更新实际结果和是否通过
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
        // 验证输入范围
        if (this.range.min >= this.range.max) {
          this.$message.error('最小值必须小于最大值')
          return
        }
        // 验证当前测试用例是否在范围内
        const invalidCases = this.tableData.filter(testCase => {
          const a = Number(testCase.a)
          const b = Number(testCase.b)
          const c = Number(testCase.c)
          return a < this.range.min || a > this.range.max ||
                 b < this.range.min || b > this.range.max ||
                 c < this.range.min || c > this.range.max
        })
        if (invalidCases.length > 0) {
          this.$message.warning(`有${invalidCases.length}个测试用例超出范围，请检查`)
        } else {
          this.$message.success('范围设置成功')
        }
      },

      applyRange2 () {
        // 验证输入范围
        if (this.range2.min >= this.range2.max) {
          this.$message.error('最小值必须小于最大值')
          return
        }
        // 验证当前测试用例是否在范围内
        const invalidCases = this.tableData2.filter(testCase => {
          const a = Number(testCase.a)
          const b = Number(testCase.b)
          const c = Number(testCase.c)
          return a < this.range2.min || a > this.range2.max ||
                 b < this.range2.min || b > this.range2.max ||
                 c < this.range2.min || c > this.range2.max
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
                const [equivalenceClass, a, b, c, expect] = line.split(',').map(item => item.trim())
                return {
                  id: this.tableData.length + index + 1,
                  equivalenceClass,
                  a,
                  b,
                  c,
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
          this.$axios.post('http://localhost:5000/triangleType', file).then(response => {
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
                const [equivalenceClass, property, a, b, c, expect] = line.split(',').map(item => item.trim())
                return {
                  id: this.tableData2.length + index + 1,
                  equivalenceClass,
                  property,
                  a,
                  b,
                  c,
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
          this.$axios.post('http://localhost:5000/triangleType', file).then(response => {
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
