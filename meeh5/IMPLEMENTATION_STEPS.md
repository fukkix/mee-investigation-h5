# 工艺类表单实施步骤

## 已完成的工作

1. ✅ 创建了工艺类配置表 (`PROCESS_FIELDS_CONFIG.md`)
2. ✅ 创建了设备类配置表 (`EQUIPMENT_FIELDS_CONFIG.md`)
3. ✅ 创建了材料类配置表 (`MATERIAL_FIELDS_CONFIG.md`)
4. ✅ 简化了HTML结构，将工艺类表单改为动态生成
5. ✅ 添加了工艺类配置对象 (`processConfig`)

## 下一步工作

由于代码量较大（预计2000+行），建议采用以下方式完成：

### 方案一：分步实现（推荐）

#### 第1步：实现水处理领域（最复杂）
先完成水处理领域的完整逻辑，包括：
- 工艺颗粒度选择
- 工艺原理
- 成熟度
- 技术来源
- 应用行业
- 工艺环节（级联显示）
- 工艺特点（带二级菜单）
- 污染物治理对象（分类多选）
- 案例简介（级联显示）
- 获奖情况

#### 第2步：复制扩展到其他领域
将水处理的逻辑复制到其他5个领域，根据配置表调整选项。

#### 第3步：实现设备类
参考工艺类的实现方式，完成设备类的级联逻辑。

#### 第4步：实现材料类
材料类最简单，最后完成。

### 方案二：使用配置驱动（更优雅）

创建一个通用的表单生成引擎，根据配置对象自动生成表单。

优点：
- 代码量少
- 易于维护
- 扩展性强

缺点：
- 需要更多时间设计
- 调试相对复杂

## 当前状态

已经在 `survey.html` 中添加了 `processConfig` 配置对象，包含了所有6个专业领域的完整配置。

## 需要实现的核心函数

### 1. `generateProcessDynamicContent(field)`
根据选择的专业领域，生成完整的表单内容。

```javascript
function generateProcessDynamicContent(field) {
    const config = processConfig[field];
    const container = document.getElementById('processDynamicContent');
    
    let html = '';
    
    // 1. 工艺颗粒度
    if (config.hasGranularity) {
        html += generateGranularitySection(config.granularityOptions);
    }
    
    // 2. 工艺原理
    html += generatePrincipleSection();
    
    // 3. 成熟度
    html += generateMaturitySection();
    
    // 4. 技术来源
    html += generateSourceSection();
    
    // 5. 应用行业
    html += generateIndustrySection('process');
    
    // 6. 工艺环节（条件显示）
    if (config.showStageWhen.length > 0) {
        html += generateStageSection();
    }
    
    // 7. 工艺特点（水处理有）
    if (config.features) {
        html += generateFeaturesSection(config.features);
    }
    
    // 8. 污染物治理对象
    html += generatePollutantsSection(config.pollutants, field);
    
    // 9. 案例简介（条件显示）
    html += generateCaseSection();
    
    // 10. 获奖情况
    html += generateAwardSection('process');
    
    container.innerHTML = html;
    
    // 绑定事件
    bindProcessEvents(field);
}
```

### 2. 辅助生成函数

```javascript
// 生成工艺颗粒度部分
function generateGranularitySection(options) { ... }

// 生成工艺原理部分
function generatePrincipleSection() { ... }

// 生成成熟度部分
function generateMaturitySection() { ... }

// 生成技术来源部分
function generateSourceSection() { ... }

// 生成应用行业部分
function generateIndustrySection(prefix) { ... }

// 生成工艺环节部分
function generateStageSection() { ... }

// 生成工艺特点部分（带二级菜单）
function generateFeaturesSection(features) { ... }

// 生成污染物治理对象部分
function generatePollutantsSection(pollutants, field) { ... }

// 生成案例简介部分
function generateCaseSection() { ... }

// 生成获奖情况部分
function generateAwardSection(prefix) { ... }
```

### 3. 事件绑定函数

```javascript
function bindProcessEvents(field) {
    const config = processConfig[field];
    
    // 工艺颗粒度变化
    const granularitySelect = document.getElementById('processGranularitySelect');
    if (granularitySelect) {
        granularitySelect.addEventListener('change', function(e) {
            const stageSection = document.getElementById('processStageSection');
            if (config.showStageWhen.includes(e.target.value)) {
                stageSection.style.display = 'block';
            } else {
                stageSection.style.display = 'none';
            }
        });
    }
    
    // 工艺特点带二级菜单的复选框
    document.querySelectorAll('.feature-with-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const inputId = this.dataset.inputId;
            const inputDiv = document.getElementById(inputId);
            if (inputDiv) {
                inputDiv.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    inputDiv.querySelector('input, textarea').value = '';
                }
            }
        });
    });
    
    // 成熟度变化
    const maturitySelect = document.getElementById('processMaturitySelect');
    if (maturitySelect) {
        maturitySelect.addEventListener('change', function(e) {
            const value = e.target.value;
            const caseSection = document.getElementById('processCaseSection');
            // 后三项显示案例简介
            if (['demo', 'stable_2_4', 'stable_5plus'].includes(value)) {
                caseSection.style.display = 'block';
            } else {
                caseSection.style.display = 'none';
            }
        });
    }
    
    // 获奖情况变化
    const awardSelect = document.getElementById('processHasAwardSelect');
    if (awardSelect) {
        awardSelect.addEventListener('change', function(e) {
            const awardDetails = document.getElementById('processAwardDetails');
            awardDetails.style.display = e.target.value === 'yes' ? 'block' : 'none';
        });
    }
}
```

## 建议的实施顺序

1. **先实现基础框架**
   - 创建所有辅助生成函数的空壳
   - 确保函数调用链路通畅

2. **逐个实现简单字段**
   - 工艺原理（简单多选）
   - 技术来源（简单单选）
   - 成熟度（简单单选）
   - 获奖情况（简单级联）

3. **实现复杂字段**
   - 工艺颗粒度（带级联）
   - 工艺环节（条件显示）
   - 应用行业（可添加多个）

4. **实现最复杂字段**
   - 工艺特点（带二级菜单）
   - 污染物治理对象（多级分类）
   - 案例简介（条件显示+验证）

5. **测试和调试**
   - 测试每个领域的显示
   - 测试级联逻辑
   - 测试表单验证
   - 测试数据提交

## 预计工作量

- 基础框架：1小时
- 简单字段：2小时
- 复杂字段：3小时
- 最复杂字段：4小时
- 测试调试：2小时
- **总计：约12小时**

## 需要的帮助

如果您希望我继续实现，请告诉我：
1. 是否采用方案一（分步实现）还是方案二（配置驱动）？
2. 是否先完成水处理领域的完整实现？
3. 是否需要我一次性生成所有代码（会很长）？

或者，您可以：
- 让我先实现一个简化版本（只包含必填字段）
- 让我创建一个独立的JavaScript文件
- 让我提供详细的代码模板供您填充
