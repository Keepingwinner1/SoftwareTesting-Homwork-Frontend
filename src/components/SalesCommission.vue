/* eslint-disable vue/no-parsing-error */
<template>
  <div >
    <h1>销售佣金计算系统</h1>

    <p class="question">
      对应问题16：一销售系统，如果销售员的年销售额大于200万RMB且请假天数不超过10天的情况下，现金到帐大于等于60%，则佣金（提成）系数为7，即佣金值为销售额除以佣金系数；现金到帐小于60%，佣金不予计算。所有其他情况且现金到帐小于等于85%，则按佣金系数均为6计算佣金，现金到账大于85%，佣金系数按5处理。根据题意设计流程图并设计测试用例实现白盒测试（White Box Test）的1）语句覆盖，2）判断覆盖，3）条件覆盖，4）判断—条件覆盖，5）条件组合覆盖（测试用例及覆盖表示要清晰）。</p>

    <el-divider></el-divider>
    <!-- 流程图展示区域 -->
    <div class="flow-chart">
      <h3>流程图</h3>
      <div class="flow-chart-content">
        <div class="mermaid-container">
          <el-button type="primary" @click="showFlowChartDialog">查看流程图</el-button>
        </div>
      </div>
    </div>

    <!-- 流程图放大对话框 -->
    <el-dialog
      title="流程图"
      :visible.sync="flowChartDialogVisible"
      width="80%"
      :before-close="handleFlowChartDialogClose"
      class="flow-chart-dialog">
      <div class="mermaid">
        flowchart TD
          A[Start] --> B[Input: Sales, Days, CashRatio]
          B --> C{Sales &lt; 0 OR Days &lt; 0 OR CashRatio &lt; 0 ?}
          C -->|Yes|M[End]
          C -->|No| E{Sales &gt; 2 million AND Days ≤ 10?}
          E -->|Yes| F{CashRatio ≥ 60%?}
          F -->|Yes| G[Commission = Sales / 7]
          F -->|No| H[Commission = 0]
          E -->|No| I{CashRatio ≤ 85%?}
          I -->|Yes| J[Commission = Sales / 6]
          I -->|No| K[Commission = Sales / 5]
          G --> L[Output Commission]
          H --> L
          J --> L
          K --> L
          L --> M
      </div>
    </el-dialog>

    <!-- 测试用例展示区域 -->
    <div class="test-cases">
      <h3>测试用例</h3>

      <!-- 语句覆盖测试用例 -->
      <div class="test-case-section">
        <h4>1. 语句覆盖测试用例</h4>
        <div class="manual-input">
          <el-form :inline="true" :model="statementForm" class="demo-form-inline">
            <el-form-item label="年销售额(万)">
              <el-input v-model="statementForm.sales" placeholder="请输入年销售额"></el-input>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="statementForm.leaveDays" placeholder="请输入请假天数"></el-input>
            </el-form-item>
            <el-form-item label="现金到账率">
              <el-input v-model="statementForm.cashRatio" placeholder="请输入现金到账率"></el-input>
            </el-form-item>
            <el-form-item label="预期佣金值">
              <el-input v-model="statementForm.expectedCommission" placeholder="请输入预期佣金值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitStatementForm">添加测试用例</el-button>
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="handleStatementCsvUpload"
                :on-preview="handlePreview"
                :on-remove="handleStatementRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleStatementSuccess"
                :file-list="statementFileList"
                accept=".xlsx,.xls,.csv">
                <el-button type="success">上传测试用例</el-button>
                <span v-if="statementFileList.length > 0" style="margin-left: 10px; color: #67C23A;">
                  已上传: {{ statementFileList[0].name }}
                </span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="testAllStatement" style="margin-left: 10px">测试所有用例</el-button>
          <el-button type="danger" @click="clearAllStatement" style="margin-left: 10px">清空测试用例</el-button>
          <div v-if="statementCoverageCases.length > 0" style="margin-top: 10px">
            <el-alert
              :title="`测试通过率: ${successRate}%`"
              :type="successRate === 100 ? 'success' : successRate >= 80 ? 'warning' : 'error'"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
        <el-table :data="statementCoverageCases" border style="width: 100%">
          <el-table-column prop="id" label="用例编号" width="100"></el-table-column>
          <el-table-column prop="sales" label="年销售额(万)" width="120"></el-table-column>
          <el-table-column prop="leaveDays" label="请假天数" width="100"></el-table-column>
          <el-table-column prop="cashRatio" label="现金到账率" width="120"></el-table-column>
          <el-table-column prop="expectedCommission" label="预期佣金值" width="120"></el-table-column>
          <el-table-column prop="real" label="实际结果" width="120"></el-table-column>
          <el-table-column prop="result" label="是否通过" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '通过'" type="success">通过</el-tag>
              <el-tag v-else-if="scope.row.result === '失败'" type="danger">失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 判断覆盖测试用例 -->
      <div class="test-case-section">
        <h4>2. 判断覆盖测试用例</h4>
        <div class="manual-input">
          <el-form :inline="true" :model="decisionForm" class="demo-form-inline">
            <el-form-item label="年销售额(万)">
              <el-input v-model="decisionForm.sales" placeholder="请输入年销售额"></el-input>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="decisionForm.leaveDays" placeholder="请输入请假天数"></el-input>
            </el-form-item>
            <el-form-item label="现金到账率">
              <el-input v-model="decisionForm.cashRatio" placeholder="请输入现金到账率"></el-input>
            </el-form-item>
            <el-form-item label="预期佣金值">
              <el-input v-model="decisionForm.expectedCommission" placeholder="请输入预期佣金值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitDecisionForm">添加测试用例</el-button>
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="handleDecisionCsvUpload"
                :on-preview="handlePreview"
                :on-remove="handleDecisionRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleDecisionSuccess"
                :file-list="decisionFileList"
                accept=".xlsx,.xls,.csv">
                <el-button type="success">上传测试用例</el-button>
                <span v-if="decisionFileList.length > 0" style="margin-left: 10px; color: #67C23A;">
                  已上传: {{ decisionFileList[0].name }}
                </span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="testAllDecision" style="margin-left: 10px">测试所有用例</el-button>
          <el-button type="danger" @click="clearAllDecision" style="margin-left: 10px">清空测试用例</el-button>
          <div v-if="decisionCoverageCases.length > 0" style="margin-top: 10px">
            <el-alert
              :title="`测试通过率: ${successRate2}%`"
              :type="successRate2 === 100 ? 'success' : successRate2 >= 80 ? 'warning' : 'error'"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
        <el-table :data="decisionCoverageCases" border style="width: 100%">
          <el-table-column prop="id" label="用例编号" width="100"></el-table-column>
          <el-table-column prop="sales" label="年销售额(万)" width="120"></el-table-column>
          <el-table-column prop="leaveDays" label="请假天数" width="100"></el-table-column>
          <el-table-column prop="cashRatio" label="现金到账率" width="120"></el-table-column>
          <el-table-column prop="expectedCommission" label="预期佣金值" width="120"></el-table-column>
          <el-table-column prop="real" label="实际结果" width="120"></el-table-column>
          <el-table-column prop="result" label="是否通过" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '通过'" type="success">通过</el-tag>
              <el-tag v-else-if="scope.row.result === '失败'" type="danger">失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 条件覆盖测试用例 -->
      <div class="test-case-section">
        <h4>3. 条件覆盖测试用例</h4>
        <div class="manual-input">
          <el-form :inline="true" :model="conditionForm" class="demo-form-inline">
            <el-form-item label="年销售额(万)">
              <el-input v-model="conditionForm.sales" placeholder="请输入年销售额"></el-input>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="conditionForm.leaveDays" placeholder="请输入请假天数"></el-input>
            </el-form-item>
            <el-form-item label="现金到账率">
              <el-input v-model="conditionForm.cashRatio" placeholder="请输入现金到账率"></el-input>
            </el-form-item>
            <el-form-item label="预期佣金值">
              <el-input v-model="conditionForm.expectedCommission" placeholder="请输入预期佣金值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitConditionForm">添加测试用例</el-button>
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="handleConditionCsvUpload"
                :on-preview="handlePreview"
                :on-remove="handleConditionRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleConditionSuccess"
                :file-list="conditionFileList"
                accept=".xlsx,.xls,.csv">
                <el-button type="success">上传测试用例</el-button>
                <span v-if="conditionFileList.length > 0" style="margin-left: 10px; color: #67C23A;">
                  已上传: {{ conditionFileList[0].name }}
                </span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="testAllCondition" style="margin-left: 10px">测试所有用例</el-button>
          <el-button type="danger" @click="clearAllCondition" style="margin-left: 10px">清空测试用例</el-button>
          <div v-if="conditionCoverageCases.length > 0" style="margin-top: 10px">
            <el-alert
              :title="`测试通过率: ${successRate3}%`"
              :type="successRate3 === 100 ? 'success' : successRate3 >= 80 ? 'warning' : 'error'"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
        <el-table :data="conditionCoverageCases" border style="width: 100%">
          <el-table-column prop="id" label="用例编号" width="100"></el-table-column>
          <el-table-column prop="sales" label="年销售额(万)" width="120"></el-table-column>
          <el-table-column prop="leaveDays" label="请假天数" width="100"></el-table-column>
          <el-table-column prop="cashRatio" label="现金到账率" width="120"></el-table-column>
          <el-table-column prop="expectedCommission" label="预期佣金值" width="120"></el-table-column>
          <el-table-column prop="real" label="实际结果" width="120"></el-table-column>
          <el-table-column prop="result" label="是否通过" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '通过'" type="success">通过</el-tag>
              <el-tag v-else-if="scope.row.result === '失败'" type="danger">失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 判断-条件覆盖测试用例 -->
      <div class="test-case-section">
        <h4>4. 判断-条件覆盖测试用例</h4>
        <div class="manual-input">
          <el-form :inline="true" :model="decisionConditionForm" class="demo-form-inline">
            <el-form-item label="年销售额(万)">
              <el-input v-model="decisionConditionForm.sales" placeholder="请输入年销售额"></el-input>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="decisionConditionForm.leaveDays" placeholder="请输入请假天数"></el-input>
            </el-form-item>
            <el-form-item label="现金到账率">
              <el-input v-model="decisionConditionForm.cashRatio" placeholder="请输入现金到账率"></el-input>
            </el-form-item>
            <el-form-item label="预期佣金值">
              <el-input v-model="decisionConditionForm.expectedCommission" placeholder="请输入预期佣金值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitDecisionConditionForm">添加测试用例</el-button>
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="handleDecisionConditionCsvUpload"
                :on-preview="handlePreview"
                :on-remove="handleDecisionConditionRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleDecisionConditionSuccess"
                :file-list="decisionConditionFileList"
                accept=".xlsx,.xls,.csv">
                <el-button type="success">上传测试用例</el-button>
                <span v-if="decisionConditionFileList.length > 0" style="margin-left: 10px; color: #67C23A;">
                  已上传: {{ decisionConditionFileList[0].name }}
                </span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="testAllDecisionCondition" style="margin-left: 10px">测试所有用例</el-button>
          <el-button type="danger" @click="clearAllDecisionCondition" style="margin-left: 10px">清空测试用例</el-button>
          <div v-if="decisionConditionCoverageCases.length > 0" style="margin-top: 10px">
            <el-alert
              :title="`测试通过率: ${successRate4}%`"
              :type="successRate4 === 100 ? 'success' : successRate4 >= 80 ? 'warning' : 'error'"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
        <el-table :data="decisionConditionCoverageCases" border style="width: 100%">
          <el-table-column prop="id" label="用例编号" width="100"></el-table-column>
          <el-table-column prop="sales" label="年销售额(万)" width="120"></el-table-column>
          <el-table-column prop="leaveDays" label="请假天数" width="100"></el-table-column>
          <el-table-column prop="cashRatio" label="现金到账率" width="120"></el-table-column>
          <el-table-column prop="expectedCommission" label="预期佣金值" width="120"></el-table-column>
          <el-table-column prop="real" label="实际结果" width="120"></el-table-column>
          <el-table-column prop="result" label="是否通过" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '通过'" type="success">通过</el-tag>
              <el-tag v-else-if="scope.row.result === '失败'" type="danger">失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 条件组合覆盖测试用例 -->
      <div class="test-case-section">
        <h4>5. 条件组合覆盖测试用例</h4>
        <div class="manual-input">
          <el-form :inline="true" :model="conditionCombinationForm" class="demo-form-inline">
            <el-form-item label="年销售额(万)">
              <el-input v-model="conditionCombinationForm.sales" placeholder="请输入年销售额"></el-input>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="conditionCombinationForm.leaveDays" placeholder="请输入请假天数"></el-input>
            </el-form-item>
            <el-form-item label="现金到账率">
              <el-input v-model="conditionCombinationForm.cashRatio" placeholder="请输入现金到账率"></el-input>
            </el-form-item>
            <el-form-item label="预期佣金值">
              <el-input v-model="conditionCombinationForm.expectedCommission" placeholder="请输入预期佣金值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitConditionCombinationForm">添加测试用例</el-button>
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="handleConditionCombinationCsvUpload"
                :on-preview="handlePreview"
                :on-remove="handleConditionCombinationRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleConditionCombinationSuccess"
                :file-list="conditionCombinationFileList"
                accept=".xlsx,.xls,.csv">
                <el-button type="success">上传测试用例</el-button>
                <span v-if="conditionCombinationFileList.length > 0" style="margin-left: 10px; color: #67C23A;">
                  已上传: {{ conditionCombinationFileList[0].name }}
                </span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="testAllConditionCombination" style="margin-left: 10px">测试所有用例</el-button>
          <el-button type="danger" @click="clearAllConditionCombination" style="margin-left: 10px">清空测试用例</el-button>
          <div v-if="conditionCombinationCases.length > 0" style="margin-top: 10px">
            <el-alert
              :title="`测试通过率: ${successRate5}%`"
              :type="successRate5 === 100 ? 'success' : successRate5 >= 80 ? 'warning' : 'error'"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
        <el-table :data="conditionCombinationCases" border style="width: 100%">
          <el-table-column prop="id" label="用例编号" width="100"></el-table-column>
          <el-table-column prop="sales" label="年销售额(万)" width="120"></el-table-column>
          <el-table-column prop="leaveDays" label="请假天数" width="100"></el-table-column>
          <el-table-column prop="cashRatio" label="现金到账率" width="120"></el-table-column>
          <el-table-column prop="expectedCommission" label="预期佣金值" width="120"></el-table-column>
          <el-table-column prop="real" label="实际结果" width="120"></el-table-column>
          <el-table-column prop="result" label="是否通过" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '通过'" type="success">通过</el-tag>
              <el-tag v-else-if="scope.row.result === '失败'" type="danger">失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SalesCommission',
  data () {
    return {
      flowChartDialogVisible: false,
      mermaidInitialized: false,
      // 语句覆盖测试用例相关数据
      statementForm: {
        sales: '',
        leaveDays: '',
        cashRatio: '',
        expectedCommission: ''
      },
      statementFileList: [],
      statementCoverageCases: [],
      successRate: 0,

      // 判断覆盖测试用例相关数据
      decisionForm: {
        sales: '',
        leaveDays: '',
        cashRatio: '',
        expectedCommission: ''
      },
      decisionFileList: [],
      decisionCoverageCases: [],
      successRate2: 0,

      // 条件覆盖测试用例相关数据
      conditionForm: {
        sales: '',
        leaveDays: '',
        cashRatio: '',
        expectedCommission: ''
      },
      conditionFileList: [],
      conditionCoverageCases: [],
      successRate3: 0,

      // 判断-条件覆盖测试用例相关数据
      decisionConditionForm: {
        sales: '',
        leaveDays: '',
        cashRatio: '',
        expectedCommission: ''
      },
      decisionConditionFileList: [],
      decisionConditionCoverageCases: [],
      successRate4: 0,

      // 条件组合覆盖测试用例相关数据
      conditionCombinationForm: {
        sales: '',
        leaveDays: '',
        cashRatio: '',
        expectedCommission: ''
      },
      conditionCombinationFileList: [],
      conditionCombinationCases: [],
      successRate5: 0
    }
  },
  mounted () {
    // 动态加载 mermaid
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js'
    script.onload = () => {
      window.mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        }
      })
      this.mermaidInitialized = true
      this.initMermaid()
    }
    document.head.appendChild(script)
  },
  methods: {
    initMermaid () {
      if (this.mermaidInitialized) {
        try {
          window.mermaid.init(undefined, '.mermaid')
        } catch (error) {
          console.error('Mermaid initialization error:', error)
        }
      }
    },
    showFlowChartDialog () {
      this.flowChartDialogVisible = true
      this.$nextTick(() => {
        try {
          window.mermaid.init(undefined, '.flow-chart-dialog .mermaid')
        } catch (error) {
          console.error('Mermaid dialog initialization error:', error)
        }
      })
    },
    handleFlowChartDialogClose (done) {
      done()
    },
    // 语句覆盖测试用例相关方法
    handleStatementRemove (file, fileList) {
      this.statementCoverageCases = []
      this.statementFileList = []
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
    handleStatementSuccess (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.statementCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.statementCoverageCases = [...this.statementCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.statementCoverageCases = response
      }
    },
    submitStatementForm () {
      if (!this.statementForm.sales || !this.statementForm.leaveDays || !this.statementForm.cashRatio || !this.statementForm.expectedCommission) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.statementCoverageCases.length + 1,
        sales: this.statementForm.sales,
        leaveDays: this.statementForm.leaveDays,
        cashRatio: this.statementForm.cashRatio,
        expectedCommission: this.statementForm.expectedCommission,
        real: '',
        result: ''
      }
      this.statementCoverageCases.push(newCase)
      this.statementForm = { sales: '', leaveDays: '', cashRatio: '', expectedCommission: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAllStatement () {
      try {
        const response = await axios.post('http://localhost:5000/testAllSalesCommission', {
          testCases: this.statementCoverageCases.map(item => ({
            sales: item.sales,
            leaveDays: item.leaveDays,
            cashRatio: item.cashRatio,
            expectedCommission: item.expectedCommission
          }))
        })
        this.statementCoverageCases = this.statementCoverageCases.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.statementCoverageCases.filter(item => item.result === '通过').length
        this.successRate = Math.round((passedCount / this.statementCoverageCases.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAllStatement () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.statementCoverageCases = []
        this.statementFileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleStatementCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.statementCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.statementCoverageCases = [...this.statementCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.statementCoverageCases = response.data
        })
      }
    },

    // 判断覆盖测试用例相关方法
    handleDecisionRemove (file, fileList) {
      this.decisionCoverageCases = []
      this.decisionFileList = []
    },
    handleDecisionSuccess (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.decisionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.decisionCoverageCases = [...this.decisionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.decisionCoverageCases = response
      }
    },
    submitDecisionForm () {
      if (!this.decisionForm.sales || !this.decisionForm.leaveDays || !this.decisionForm.cashRatio || !this.decisionForm.expectedCommission) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.decisionCoverageCases.length + 1,
        sales: this.decisionForm.sales,
        leaveDays: this.decisionForm.leaveDays,
        cashRatio: this.decisionForm.cashRatio,
        expectedCommission: this.decisionForm.expectedCommission,
        real: '',
        result: ''
      }
      this.decisionCoverageCases.push(newCase)
      this.decisionForm = { sales: '', leaveDays: '', cashRatio: '', expectedCommission: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAllDecision () {
      try {
        const response = await axios.post('http://localhost:5000/testAllSalesCommission', {
          testCases: this.decisionCoverageCases.map(item => ({
            sales: item.sales,
            leaveDays: item.leaveDays,
            cashRatio: item.cashRatio,
            expectedCommission: item.expectedCommission
          }))
        })
        this.decisionCoverageCases = this.decisionCoverageCases.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.decisionCoverageCases.filter(item => item.result === '通过').length
        this.successRate2 = Math.round((passedCount / this.decisionCoverageCases.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAllDecision () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.decisionCoverageCases = []
        this.decisionFileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleDecisionCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.decisionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.decisionCoverageCases = [...this.decisionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.decisionCoverageCases = response.data
        })
      }
    },

    // 条件覆盖测试用例相关方法
    handleConditionRemove (file, fileList) {
      this.conditionCoverageCases = []
      this.conditionFileList = []
    },
    handleConditionSuccess (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.conditionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.conditionCoverageCases = [...this.conditionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.conditionCoverageCases = response
      }
    },
    submitConditionForm () {
      if (!this.conditionForm.sales || !this.conditionForm.leaveDays || !this.conditionForm.cashRatio || !this.conditionForm.expectedCommission) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.conditionCoverageCases.length + 1,
        sales: this.conditionForm.sales,
        leaveDays: this.conditionForm.leaveDays,
        cashRatio: this.conditionForm.cashRatio,
        expectedCommission: this.conditionForm.expectedCommission,
        real: '',
        result: ''
      }
      this.conditionCoverageCases.push(newCase)
      this.conditionForm = { sales: '', leaveDays: '', cashRatio: '', expectedCommission: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAllCondition () {
      try {
        const response = await axios.post('http://localhost:5000/testAllSalesCommission', {
          testCases: this.conditionCoverageCases.map(item => ({
            sales: item.sales,
            leaveDays: item.leaveDays,
            cashRatio: item.cashRatio,
            expectedCommission: item.expectedCommission
          }))
        })
        this.conditionCoverageCases = this.conditionCoverageCases.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.conditionCoverageCases.filter(item => item.result === '通过').length
        this.successRate3 = Math.round((passedCount / this.conditionCoverageCases.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAllCondition () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.conditionCoverageCases = []
        this.conditionFileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleConditionCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.conditionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.conditionCoverageCases = [...this.conditionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.conditionCoverageCases = response.data
        })
      }
    },

    // 判断-条件覆盖测试用例相关方法
    handleDecisionConditionRemove (file, fileList) {
      this.decisionConditionCoverageCases = []
      this.decisionConditionFileList = []
    },
    handleDecisionConditionSuccess (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.decisionConditionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.decisionConditionCoverageCases = [...this.decisionConditionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        this.decisionConditionCoverageCases = response
      }
    },
    submitDecisionConditionForm () {
      if (!this.decisionConditionForm.sales || !this.decisionConditionForm.leaveDays || !this.decisionConditionForm.cashRatio || !this.decisionConditionForm.expectedCommission) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.decisionConditionCoverageCases.length + 1,
        sales: this.decisionConditionForm.sales,
        leaveDays: this.decisionConditionForm.leaveDays,
        cashRatio: this.decisionConditionForm.cashRatio,
        expectedCommission: this.decisionConditionForm.expectedCommission,
        real: '',
        result: ''
      }
      this.decisionConditionCoverageCases.push(newCase)
      this.decisionConditionForm = { sales: '', leaveDays: '', cashRatio: '', expectedCommission: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAllDecisionCondition () {
      try {
        const response = await axios.post('http://localhost:5000/testAllSalesCommission', {
          testCases: this.decisionConditionCoverageCases.map(item => ({
            sales: item.sales,
            leaveDays: item.leaveDays,
            cashRatio: item.cashRatio,
            expectedCommission: item.expectedCommission
          }))
        })
        this.decisionConditionCoverageCases = this.decisionConditionCoverageCases.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.decisionConditionCoverageCases.filter(item => item.result === '通过').length
        this.successRate4 = Math.round((passedCount / this.decisionConditionCoverageCases.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAllDecisionCondition () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.decisionConditionCoverageCases = []
        this.decisionConditionFileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleDecisionConditionCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.decisionConditionCoverageCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.decisionConditionCoverageCases = [...this.decisionConditionCoverageCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.decisionConditionCoverageCases = response.data
        })
      }
    },

    // 条件组合覆盖测试用例相关方法
    handleConditionCombinationRemove (file, fileList) {
      this.conditionCombinationCases = []
      this.conditionCombinationFileList = []
    },
    handleConditionCombinationSuccess (response, file) {
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.conditionCombinationCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.conditionCombinationCases = [...this.conditionCombinationCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file.raw)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.conditionCombinationCases = response.data
        })
      }
    },
    submitConditionCombinationForm () {
      if (!this.conditionCombinationForm.sales || !this.conditionCombinationForm.leaveDays || !this.conditionCombinationForm.cashRatio || !this.conditionCombinationForm.expectedCommission) {
        this.$message.error('请填写完整的测试用例信息')
        return
      }
      const newCase = {
        id: this.conditionCombinationCases.length + 1,
        sales: this.conditionCombinationForm.sales,
        leaveDays: this.conditionCombinationForm.leaveDays,
        cashRatio: this.conditionCombinationForm.cashRatio,
        expectedCommission: this.conditionCombinationForm.expectedCommission,
        real: '',
        result: ''
      }
      this.conditionCombinationCases.push(newCase)
      this.conditionCombinationForm = { sales: '', leaveDays: '', cashRatio: '', expectedCommission: '' }
      this.$message.success('测试用例添加成功')
    },
    async testAllConditionCombination () {
      try {
        const response = await axios.post('http://localhost:5000/testAllSalesCommission', {
          testCases: this.conditionCombinationCases.map(item => ({
            sales: item.sales,
            leaveDays: item.leaveDays,
            cashRatio: item.cashRatio,
            expectedCommission: item.expectedCommission
          }))
        })
        this.conditionCombinationCases = this.conditionCombinationCases.map((item, index) => ({
          ...item,
          real: response.data[index].real,
          result: response.data[index].result
        }))
        // 计算成功率
        const passedCount = this.conditionCombinationCases.filter(item => item.result === '通过').length
        this.successRate5 = Math.round((passedCount / this.conditionCombinationCases.length) * 100)
        this.$message.success('所有测试用例执行完成')
      } catch (error) {
        this.$message.error('测试执行失败')
      }
    },
    clearAllConditionCombination () {
      this.$confirm('确定要清空所有测试用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.conditionCombinationCases = []
        this.conditionCombinationFileList = []
        this.$message.success('已清空所有测试用例')
      }).catch(() => {
        this.$message.info('已取消清空操作')
      })
    },
    handleConditionCombinationCsvUpload (options) {
      const file = options.file
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target.result
          const lines = text.split('\n')
          const newCases = lines
            .filter(line => line.trim())
            .map((line, index) => {
              const [sales, leaveDays, cashRatio, expectedCommission] = line.split(',').map(item => item.trim())
              return {
                id: this.conditionCombinationCases.length + index + 1,
                sales,
                leaveDays,
                cashRatio,
                expectedCommission,
                real: '',
                result: ''
              }
            })
          this.conditionCombinationCases = [...this.conditionCombinationCases, ...newCases]
          this.$message.success(`成功导入${newCases.length}个测试用例`)
        }
        reader.readAsText(file)
      } else {
        axios.post('http://localhost:5000/salesCommission', file).then(response => {
          this.conditionCombinationCases = response.data
        })
      }
    }
  },
  watch: {
    mermaidInitialized: {
      handler (newVal) {
        if (newVal) {
          this.initMermaid()
        }
      },
      immediate: true
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
.flow-chart {
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.flow-chart-content {
  margin-top: 20px;
  text-align: center;
}

.flow-chart-content img {
  max-width: 100%;
  height: auto;
}

.test-cases {
  margin-top: 30px;
}

.test-case-section {
  margin-bottom: 30px;
}

h2 {
  color: #303133;
  margin-bottom: 20px;
}

h3 {
  color: #606266;
  margin-bottom: 15px;
}

h4 {
  color: #606266;
  margin-bottom: 10px;
}

.mermaid-container {
  position: relative;
  display: inline-block;
}

.click-hint {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s;
}

.mermaid-container:hover .click-hint {
  opacity: 1;
}

.mermaid {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.flow-chart-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.flow-chart-dialog :deep(.mermaid) {
  cursor: default;
}

.flow-chart-dialog :deep(.mermaid:hover) {
  transform: none;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>
