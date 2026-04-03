# 工艺类表单重构实施指南

## 概述
根据用户需求，需要完全重新实现工艺类（process）的级联逻辑，特别是水处理领域的详细选项。

## 主要变更

### 1. HTML结构变更

已完成：将工艺类表单简化为：
```html
<div id="processForm" class="dynamic-form step-hidden">
    <div class="space-y-4">
        <!-- 专业领域选择 -->
        <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-primary">
            <label>专业领域 <span class="text-error">*</span></label>
            <select name="process_field" required id="processFieldSelect">
                <option value="">请选择</option>
                <option value="water">水处理</option>
                <option value="air">大气污染治理</option>
                <option value="solid">固废处理与综合利用</option>
                <option value="eco">生态修复</option>
                <option value="soil">土壤修复</option>
                <option value="energy">节能与碳减排</option>
            </select>
        </div>

        <!-- 动态内容区域（选择专业领域后显示） -->
        <div id="processDynamicContent"></div>
    </div>
</div>
```

### 2. JavaScript函数需要添加

需要在 `handleProcessFieldChange` 函数后添加新函数 `generateProcessDynamicContent(selectedField)`

该函数需要根据选择的专业领域生成完整的表单内容，包括：

#### 水处理领域 (water)
1. **工艺颗粒度**（单选，必填）
   - 综合型工艺系统流程
   - 特定功能型工艺流程
   - 处理单元型工艺
   - 其他

2. **工艺原理**（多选，必填）
   - 物理法
   - 化学法
   - 生物法
   - 物理化学
   - 其他（带填写框）

3. **技术来源**（单选，选填）
   - 海外引进
   - 国内自主创新
   - 国内自主集成

4. **应用行业**（可添加多个）
   - 行业代码
   - 大类
   - 中类
   - 小类
   - [+] 添加行业按钮

5. **工艺环节**（多选，选填）
   - 仅当工艺颗粒度选择后三项时显示
   - 预处理（一级）
   - 主处理（二级）
   - 深度处理（三级）
   - 后处理

6. **工艺特点**（多选，必填）
   带二级菜单的选项：
   - ☐ 水质波动幅度宽（填写范围）
   - ☐ 温度波动幅度宽（填写范围）
   - ☐ 耐冲击负荷（填写类型及幅度范围）
   - ☐ pH（填写范围）
   - ☐ 高盐环境（填写范围）
   - ☐ 浊度范围（填写范围）
   - ☐ 耐高海拔（填写框）
   - ☐ 耐高压（填写框）
   - ☐ 耐低溶解氧（填写框）
   - ☐ 适应厌氧环境（填写框）
   - ☐ 适应低碳氮比（填写框）
   
   简单勾选：
   - ☐ 占地集约化
   - ☐ 无人值守
   - ☐ 高回收率（循环率）
   - ☐ 副产品价值
   - ☐ 低二次污染
   - ☐ 低材料消耗
   - ☐ 低单位处理能力运行成本
   - ☐ 低单位处理能力建设投资
   - ☐ 低能耗
   - ☐ 低碳排放
   - ☐ 负碳技术
   - ☐ 其他（填写框）

7. **污染物治理对象**（多选，必填）
   
   常规污染物：
   - ☐ CODCr
   - ☐ BOD5
   - ☐ 浊度（或悬浮物）
   - ☐ NH3-N
   - ☐ TN
   - ☐ TP
   - ☐ TOC
   - ☐ 总铁
   - ☐ 总锰
   - ☐ 总硬度
   - ☐ 碱度
   - ☐ 电导率
   - ☐ 总溶固
   - ☐ 石油类
   - ☐ 色度
   - ☐ 硫化物
   
   重金属污染物：
   - ☐ 总铜
   - ☐ 总锌
   - ☐ 总砷
   - ☐ 六价铬
   - ☐ 总铬
   - ☐ 总铅
   - ☐ 总镍
   - ☐ 总汞
   - ☐ 总镉
   - ☐ 总铍
   - ☐ 总银
   - ☐ 总硒
   
   特殊污染物：
   - ☐ 总氰化物
   - ☐ 苯
   - ☐ 挥发酚
   - ☐ 多环芳烃
   - ☐ 苯并（a）芘
   - ☐ 其他_____等
   
   其他：
   - ☐ 新污染物（填写框）
   - ☐ 非常规污染物（填写框）
   - ☐ 其他（填写框）

8. **成熟度**（单选，选填）
   - 1级 - 实验室阶段
   - 2级 - 中试阶段
   - 3级 - 已有应用案例
   - 4级 - 成熟应用
   - 5级 - 广泛应用

9. **获奖情况**（单选）
   - 否
   - 是（展开奖项级别和等级）

#### 其他专业领域
大气、固废、生态修复、土壤修复、节能与碳减排等领域也需要类似的详细选项结构。

### 3. 级联逻辑规则

1. **初始状态**：选择专业领域后，其他选项全部隐藏
2. **选择具体领域后**：才展示工艺颗粒度（仅水处理）
3. **工艺颗粒度选择后**：
   - 如果选择后三项（特定功能型/处理单元型/其他），在应用行业后出现工艺环节选项
   - 如果选择"综合型工艺系统流程"，不显示工艺环节
4. **工艺特点**：带二级菜单的选项，勾选后显示填写框
5. **污染物治理对象**：分类多选，每个大类下有子选项

### 4. 事件绑定

需要使用事件委托处理动态生成的元素：
```javascript
// 在form元素上监听change事件
form.addEventListener('change', function(e) {
    // 处理工艺颗粒度变化
    if (e.target.id === 'processGranularitySelect') {
        handleProcessGranularityChange(e);
    }
    
    // 处理工艺特点复选框（带二级菜单）
    if (e.target.name === 'process_feature' && e.target.dataset.hasSubInput) {
        toggleSubInput(e.target);
    }
});
```

### 5. 数据提交格式

提交时需要将所有选项整理成结构化数据：
```javascript
{
    process_field: "water",
    process_granularity: "functional",
    process_principle: ["physical", "chemical"],
    process_source: "domestic_innovation",
    process_industries: [
        {code: "C26", major: "化学原料", middle: "基础化学", minor: "有机化学"},
        {code: "C30", major: "非金属矿物", middle: "水泥制造", minor: "水泥"}
    ],
    process_stage: ["pretreatment", "main"],
    process_features: {
        simple: ["compact", "unmanned", "low_energy"],
        withRange: {
            water_fluctuation: "COD 100-500mg/L",
            temp_fluctuation: "5-35℃",
            ph: "6-9"
        }
    },
    pollutants: {
        conventional: ["cod", "bod", "ss", "nh3n"],
        heavy_metal: ["cu", "zn"],
        special: ["cyanide"],
        new: "PFAS类物质",
        other: "其他特殊污染物"
    },
    maturity: "4",
    has_award: "yes",
    award_level: ["national", "provincial"],
    award_grade: "first"
}
```

## 实施步骤

1. ✅ 已完成：简化HTML结构，移除旧的静态字段
2. ✅ 已完成：更新 `handleProcessFieldChange` 函数调用新的生成函数
3. ⏳ 待完成：实现 `generateProcessDynamicContent(field)` 函数
4. ⏳ 待完成：实现工艺颗粒度变化处理
5. ⏳ 待完成：实现工艺特点二级菜单逻辑
6. ⏳ 待完成：实现污染物分类多选逻辑
7. ⏳ 待完成：更新表单验证逻辑
8. ⏳ 待完成：更新数据提交格式化逻辑

## 注意事项

1. 所有动态生成的元素需要使用事件委托绑定事件
2. 二级菜单的填写框需要在勾选时显示，取消勾选时隐藏并清空
3. 工艺环节的显示条件：水处理 + 工艺颗粒度为后三项
4. 成熟度3-5级需要在步骤4显示案例简介
5. 获奖情况选"是"需要展开奖项级别和等级选择
6. 手机端适配：所有输入框垂直排列，有足够的点击区域
7. 统一所有下拉框和输入框的圆角样式

## 测试要点

1. 选择不同专业领域，验证动态内容正确显示
2. 水处理领域：验证工艺颗粒度和工艺环节的联动
3. 验证工艺特点二级菜单的显示/隐藏
4. 验证污染物分类多选逻辑
5. 验证表单验证（必填项检查）
6. 验证数据提交格式
7. 手机端测试所有交互功能
