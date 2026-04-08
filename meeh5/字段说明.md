# 生态环境技术调查填报 — 字段对应说明文档

> 本文档列出系统中所有用到的字段，包括表单 name 属性、代码中的 value 值与对应的中文含义，以及字段类型与必填性。

---

## 一、基础信息字段（步骤一，所有类型通用）

| 表单 name | 元素 ID | 中文名称 | 类型 | 必填 | 说明 |
|---|---|---|---|---|---|
| `name` | — | 姓名 | text | ✅ | 联系人姓名 |
| `phone` | `phoneInput` | 手机 | tel | ✅ | 11位手机号 |
| `email` | `emailInput` | 电子邮箱 | email | ✅ | 格式校验 |
| `company` | `companyInput` | 单位全称 | text | ✅ | 支持关键词搜索自动填充 |
| `creditCode` | `creditCodeInput` | 统一社会信用代码 | text | ✅ | 18位，可由企业搜索API自动填充 |
| `legalPerson` | `legalPersonInput` | 法定代表人（负责人） | text | ✅ | 可由企业搜索API自动填充 |
| `establishDate` | `establishDateInput` | 成立时间 | date | ✅ | 格式 yyyy-MM-dd，可自动填充 |

---

## 二、类型选择字段（步骤二）

| 表单 name | 中文名称 | 类型 | 必填 | 可选值 |
|---|---|---|---|---|
| `formType` | 体现形式 | radio | ✅ | `process`=工艺类, `material`=材料类, `equipment`=设备类 |
| `objectName` | 技术名称 | text | ✅ | 根据类型动态显示为"工艺名称"/"材料名称"/"设备名称" |

---

## 三、工艺类字段（formType = `process`）

### 3.1 专业领域

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_field` | 专业领域 | select（单选） | ✅ |

**可选值：**

| value | 中文 |
|---|---|
| `water` | 水处理 |
| `air` | 大气污染治理 |
| `solid` | 固废处理与综合利用 |
| `eco` | 生态修复 |
| `soil` | 土壤修复 |
| `energy` | 节能与碳减排 |

---

### 3.2 工艺颗粒度（所有领域通用）

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_granularity` | 工艺颗粒度 | select（单选） | ✅ |

| value | 中文 |
|---|---|
| `comprehensive` | 综合型工艺系统流程 |
| `functional` | 特定功能型工艺流程 |
| `unit` | 处理单元型工艺 |
| `other` | 其他 |

**级联规则**：选择 `functional`/`unit`/`other` 时，在水处理和大气污染治理领域会显示"工艺环节"。

---

### 3.3 工艺原理（所有领域通用）

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_principle` | 工艺原理 | checkbox（多选） | ✅ |

| value | 中文 |
|---|---|
| `physical` | 物理法 |
| `chemical` | 化学法 |
| `biological` | 生物法 |
| `physicochemical` | 物理化学 |
| `other` | 其他（带填写框） |

---

### 3.4 成熟度（所有领域通用）

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_maturity` | 成熟度 | select（单选） | 选填 |

| value | 中文 |
|---|---|
| `pilot_stable` | 已开展中试，运行稳定，达到预期指标 |
| `pilot_good` | 完成中试研究，情况良好，拟开展示范工程 |
| `demo_observing` | 完成示范工程，运行情况待观察 |
| `stable_2_4` | 建成2~4项工程且运行稳定 |
| `stable_5_plus` | 建成5项及以上工程项目的 |

**级联规则**：选择后三项（`demo_observing` / `stable_2_4` / `stable_5_plus`）时，显示案例简介。

---

### 3.5 技术来源（所有领域通用）

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_source` | 技术来源 | select（单选） | 选填 |

| value | 中文 |
|---|---|
| `overseas` | 海外引进 |
| `domestic_innovation` | 国内自主创新 |
| `domestic_integration` | 国内自主集成 |

---

### 3.6 应用行业（所有领域通用）

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_industry_code[]` | 行业代码 | text（可添加多条） | ✅ |
| `process_industry_major[]` | 大类 | text | ✅ |
| `process_industry_middle[]` | 中类 | text | ✅ |
| `process_industry_minor[]` | 小类 | text | ✅ |

---

### 3.7 工艺环节（按领域不同）

#### 水处理领域工艺环节

| value | 中文 |
|---|---|
| `pretreatment` | 预处理（一级） |
| `main` | 主处理（二级） |
| `advanced` | 深度处理（三级） |
| `post` | 后处理 |

**显示条件**：工艺颗粒度选择 `functional`/`unit`/`other` 时显示。

#### 大气污染治理领域工艺环节

| value | 中文 |
|---|---|
| `pretreatment` | 预处理 |
| `process` | 过程处理 |
| `advanced` | 深度处理 |

**显示条件**：工艺颗粒度选择 `functional`/`unit`/`other` 时显示。

---

### 3.8 工艺特点 — 按领域分别说明

#### 3.8.1 水处理 / 土壤修复领域 — 简单勾选项

| value | 中文 |
|---|---|
| `compact` | 占地集约化 |
| `unmanned` | 无人值守 |
| `high_recovery` | 高回收率（循环率） |
| `byproduct_value` | 副产品价值 |
| `low_pollution` | 低二次污染 |
| `low_material` | 低材料消耗 |
| `low_operation_cost` | 低单位处理能力运行成本 |
| `low_construction_cost` | 低单位处理能力建设投资 |
| `low_energy` | 低能耗 |
| `low_carbon` | 低碳排放 |
| `negative_carbon` | 负碳技术 |

#### 3.8.2 水处理领域 — 带输入框特点

| value | 中文 | placeholder |
|---|---|---|
| `water_fluctuation` | 水质波动幅度宽 | 请填写污染物类型及幅度范围 |
| `temp_fluctuation` | 温度波动幅度宽 | 范围：___至___ |
| `impact_load` | 耐冲击负荷 | 请填写负荷类型及幅度范围 |
| `ph_range` | pH | 范围：___至___ |
| `high_salt` | 高盐环境 | 范围：___至___ |
| `turbidity` | 浊度范围 | 范围：___至___ |
| `high_altitude` | 耐高海拔 | 请填写 |
| `high_pressure` | 耐高压 | 请填写 |
| `low_oxygen` | 耐低溶解氧 | 请填写 |
| `anaerobic` | 适应厌氧环境 | 请填写 |
| `low_cn_ratio` | 适应低碳氮比 | 请填写 |

#### 3.8.3 大气污染治理领域 — 带输入框特点

| value | 中文 | placeholder |
|---|---|---|
| `flue_gas_fluctuation` | 烟气波动幅度宽 | 请填写污染物类型及幅度范围 |
| `temp_fluctuation` | 温度波动幅度宽 | 范围：___至___ |
| `ph_range` | pH | 范围：___至___ |
| `high_salt` | 高盐环境 | 范围：___至___ |
| `high_altitude` | 耐高海拔 | 请填写 |
| `high_pressure` | 耐高压 | 请填写 |

#### 3.8.4 土壤修复领域 — 带输入框特点

| value | 中文 | placeholder |
|---|---|---|
| `pollution_fluctuation` | 处置水土污染物含量波动幅度宽 | 请填写污染物类型及幅度范围 |
| `particle_fluctuation` | 粒径波动幅度宽 | 范围：___至___ |
| `impact_load` | 耐冲击负荷 | 请填写负荷类型及幅度范围 |
| `ph_range` | pH | 范围：___至___ |
| `sand_stone_ratio` | 土质砂石比范围 | 范围：___至___ |
| `moisture_content` | 土质含水率范围 | 范围：___至___ |
| `high_altitude` | 耐高海拔 | 请填写 |
| `high_pressure` | 耐高压 | 请填写 |
| `low_oxygen` | 耐低溶解氧 | 请填写 |
| `anaerobic` | 适应厌氧环境 | 请填写 |
| `low_cn_ratio` | 适应低碳氮比 | 请填写 |

#### 3.8.5 生态修复领域 — 特有简单勾选项

| value | 中文 |
|---|---|
| `energy_type` | 能源类型（太阳能、风能、重力、地热能、生物能、化石能源） |
| `resource_cycle` | 资源循环与再利用（物质、能量） |
| `nature_enhance` | 自然过程强化（生物降解、植物吸收、土壤过滤、湿地净化、生态系统自净） |
| `eco_diversity` | 生态整合性与多样性（植物多样性、动物多样性、微生物多样性、土壤、填料、水体） |
| `eco_friendly` | 环境友好（自然材料、无毒材料、可再生材料） |
| `self_regulation` | 自我调节 |
| `self_repair` | 自我修复 |
| `sustainable` | 可持续 |

（另含与水处理相同的通用勾选项和带输入框项。）

#### 3.8.6 节能与碳减排领域 — 特有简单勾选项

| value | 中文 |
|---|---|
| `combustion_efficiency` | 燃烧效率提升 |
| `low_emission_temp` | 排放温度低 |
| `efficient_heat_exchange` | 高效换热 |
| `low_nox` | 低氮燃烧 |
| `low_heat_upgrade` | 低品质热能提升 |

---

### 3.9 污染物治理对象 — 按领域分别说明

#### 3.9.1 水处理领域

**常规污染物（conventional）：**

| value | 中文 |
|---|---|
| `codcr` | CODCr |
| `bod5` | BOD5 |
| `turbidity_ss` | 浊度（或悬浮物） |
| `nh3n` | NH3-N |
| `tn` | TN |
| `tp` | TP |
| `toc` | TOC |
| `fe` | 总铁 |
| `mn` | 总锰 |
| `hardness` | 总硬度 |
| `alkalinity` | 碱度 |
| `conductivity` | 电导率 |
| `tds` | 总溶固 |
| `oil` | 石油类 |
| `color` | 色度 |
| `sulfide` | 硫化物 |

**重金属污染物（heavyMetal）：**

| value | 中文 |
|---|---|
| `cu` | 总铜 |
| `zn` | 总锌 |
| `as` | 总砷 |
| `cr6` | 六价铬 |
| `cr` | 总铬 |
| `pb` | 总铅 |
| `ni` | 总镍 |
| `hg` | 总汞 |
| `cd` | 总镉 |
| `be` | 总铍 |
| `ag` | 总银 |
| `se` | 总硒 |

**特殊污染物（special）：**

| value | 中文 |
|---|---|
| `cyanide` | 总氰化物 |
| `benzene` | 苯 |
| `phenol` | 挥发酚 |
| `pah` | 多环芳烃 |
| `bap` | 苯并（a）芘 |

另有：`specialOther`（特殊污染物其他）、`newPollutant`（新污染物）、`unconventional`（非常规污染物）、`other`（其他），均为自由填写。

---

#### 3.9.2 大气污染治理领域

**常规污染物（conventional）：**

| value | 中文 |
|---|---|
| `particulate` | 颗粒物 |
| `so2` | 二氧化硫 |
| `nox` | 氮氧化物 |
| `co` | 一氧化碳 |
| `o3` | 臭氧 |
| `pb_compounds` | 铅及其化合物 |

**非常规污染物（unconventional）：**

| value | 中文 |
|---|---|
| `vocs` | 挥发性有机化合物 |
| `dioxin` | 二噁英类 |
| `pah` | 多环芳烃 |
| `heavy_metal` | 有毒重金属及其化合物 |

---

#### 3.9.3 固废处理与综合利用领域

**工艺分类（processClassification）：**

| value | 中文 |
|---|---|
| `pretreatment` | 预处理 |
| `sorting` | 分选提纯 |
| `dewatering` | 浓缩与脱水 |
| `aerobic` | 好氧生物处理 |
| `anaerobic` | 厌氧发酵 |
| `incineration` | 焚烧处理 |
| `pyrolysis` | 热解处理 |
| `chemical` | 药剂处理 |
| `resource` | 资源化利用 |
| `co_disposal` | 协同处置 |
| `advanced` | 深度处理 |
| `landfill` | 填埋处置 |

**污染物治理对象（types）：**

| value | 中文 |
|---|---|
| `urban` | 城市固废 |
| `industrial` | 工业固废 |
| `hazardous` | 危险废物 |
| `mining` | 矿山固废 |
| `ferrous` | 黑色冶金固废 |
| `nonferrous` | 有色冶金固废 |
| `chemical` | 化工固废 |
| `other_industrial` | 其他工业固废 |
| `blast_furnace` | 高炉渣 |
| `steel_slag` | 钢渣 |
| `iron_dust` | 含铁尘泥 |
| `scrap_steel` | 废钢 |
| `fly_ash` | 粉煤灰/脱硫石膏 |

---

#### 3.9.4 生态修复领域

**污染治理型 — 常规污染物（pollutionControl.conventional）：**

| value | 中文 |
|---|---|
| `codcr` | CODCr |
| `bod5` | BOD5 |
| `ss` | SS |
| `nh3n` | NH3-N |
| `tn` | TN |
| `tp` | TP |
| `toc` | TOC |
| `fe` | 总铁 |
| `mn` | 总锰 |
| `hardness` | 总硬度 |
| `alkalinity` | 碱度 |
| `conductivity` | 电导率 |
| `tds` | 总溶固 |
| `oil` | 石油类 |
| `color` | 色度 |
| `sulfide` | 硫化物 |
| `pm25` | PM2.5 |
| `pm10` | PM10 |
| `so2` | SO2 |
| `no2` | NO2 |
| `o3` | 臭氧 |

**污染治理型 — 重金属污染物（pollutionControl.heavyMetal）：**

| value | 中文 |
|---|---|
| `cr_eco` | Cr |
| `cu` | 总铜 |
| `zn` | 总锌 |
| `as` | 总砷 |
| `cr6` | 六价铬 |
| `cr` | 总铬 |
| `pb` | 总铅 |
| `ni` | 总镍 |
| `hg` | 总汞 |
| `cd` | 总镉 |
| `be` | 总铍 |
| `ag` | 总银 |
| `se` | 总硒 |

**污染治理型 — 特殊污染物（pollutionControl.special）：**

| value | 中文 |
|---|---|
| `cyanide` | 总氰化物 |
| `benzene` | 苯 |
| `phenol` | 挥发酚 |
| `pah` | 多环芳烃 |
| `bap` | 苯并芘 |

**生态恢复/重建型（restoration）：**

| value | 中文 | 备注 |
|---|---|---|
| `vegetation` | 植被覆盖率提升 | 带填写框 |
| `biodiversity_animal` | 生物多样性提升 - 动物 | |
| `biodiversity_plant` | 生物多样性提升 - 植物 | |
| `biodiversity_microbe` | 生物多样性提升 - 微生物 | |
| `biodiversity_enzyme` | 生物多样性提升 - 土壤酶活性 | |
| `stability` | 生态系统稳定性提升 | 带填写框，内容为"生态系统内稳性" |

**资源保护与可持续利用型（resourceProtection）：**

| value | 中文 |
|---|---|
| `soil_water` | 水土保持 |
| `resource_saving` | 资源节约 |
| `water_source` | 水源地保障 |
| `waste_cycle` | 废弃物循环 |
| `eco_balance` | 生态平衡 |

**灾害防治与风险减缓型（disasterPrevention）：**

| value | 中文 |
|---|---|
| `wave_reduction` | 削浪护岸 |
| `windbreak` | 防风固沙 |
| `landslide` | 滑坡治理 |

**景观美化与游憩功能提升型（landscape）：**

| value | 中文 |
|---|---|
| `living_env` | 人居环境提升 |
| `negative_ion` | 负氧离子 |
| `beautification` | 景观美化 |
| `microclimate` | 改善微气候 |

---

#### 3.9.5 土壤修复领域

**无机类污染物（inorganic）：**

| value | 中文 |
|---|---|
| `ph` | pH |
| `cyanide` | 氰化物 |
| `fluoride` | 氟化物 |

**重金属污染物（heavyMetal）：** 同水处理领域。

**挥发性有机污染物（volatile）：**

| value | 中文 |
|---|---|
| `chlorinated` | 氯代烃 |
| `benzene` | 苯系数 |

**半挥发性有机污染物（semiVolatile）：**

| value | 中文 |
|---|---|
| `benzene2` | 苯系数 |
| `pah` | 多环芳烃 |
| `pesticide` | 有机农药类 |
| `pcb` | 多氯联苯 |

---

#### 3.9.6 节能与碳减排领域

| value | 中文 | 备注 |
|---|---|---|
| `dusty_flue_gas` | 含尘烟气 | 带填写框"包括" |
| `wet_flue_gas` | 含湿烟气 | 带填写框"包括" |
| `low_temp_water` | 低温热水 | 带填写框"包括" |
| `unconventional_medium` | 非常规介质（若有请填写） | 带填写框 |

---

### 3.10 案例简介

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `case_project_name` | 项目名称 | text | ✅ |
| `case_owner` | 业主单位名称 | text | ✅ |
| `case_contact_name` | 联系人 | text | ✅ |
| `case_contact_phone` | 联系电话 | text | ✅ |

**显示条件**：成熟度选择后三项时出现。

---

### 3.11 获奖情况

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `process_has_award` | 是否获奖 | radio | 选填 |

| value | 中文 |
|---|---|
| `no` | 否 |
| `yes` | 是（展开详细内容） |

**奖项级别（多选）：**

| value | 中文 |
|---|---|
| `international` | 国际级 |
| `national` | 国家级 |
| `provincial` | 省部级 |

**获奖等级（多选）：**

| value | 中文 |
|---|---|
| `special` | 特等奖 |
| `first` | 一等奖 |
| `second` | 二等奖 |
| `third` | 三等奖 |
| `excellent` | 优秀奖 |
| `other` | 其他 |

---

## 四、材料类字段（formType = `material`）

### 4.1 专业应用领域

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `material_field` | 专业应用领域 | select（单选） | ✅ |

可选值同工艺类的 `process_field`。

---

### 4.2 功能分类 / 工艺环节

#### 水处理

| value | 中文 |
|---|---|
| `filter` | 过滤材料 |
| `adsorption` | 吸附材料 |
| `ion_exchange` | 离子交换材料 |
| `catalyst` | 催化材料 |
| `disinfection` | 杀菌消毒材料 |
| `flocculation` | 絮凝/混凝材料 |
| `corrosion_inhibitor` | 缓蚀阻垢材料 |
| `biological` | 生物处理材料 |
| `membrane` | 膜材料 |
| `demulsifier` | 破乳药剂 |
| `heavy_metal_capture` | 重金属捕捉剂 |
| `redox` | 氧化还原药剂 |

#### 大气污染治理

| value | 中文 |
|---|---|
| `separation_filter` | 分离/过滤材料 |
| `adsorption_separation` | 吸附分离材料 |
| `catalytic_conversion` | 催化转换材料 |
| `absorption_reaction` | 吸收/反应材料 |
| `auxiliary_functional` | 辅助与功能材料 |

#### 固废处理与综合利用

| value | 中文 |
|---|---|
| `solidification_agent` | 固化剂 |
| `binder` | 粘结剂 |
| `stabilizer` | 稳定剂 |
| `grinding_aid` | 助磨剂 |

#### 生态修复

同水处理领域分类。

#### 土壤修复

| value | 中文 |
|---|---|
| `oxidation_agent` | 氧化药剂 |
| `reduction_agent` | 还原药剂 |
| `solidification_agent` | 固化稳定化药剂 |
| `adsorption` | 吸附材料 |
| `heavy_metal_capture` | 重金属捕捉剂 |

#### 节能与碳减排

同固废处理与综合利用分类。

> 所有领域的功能分类均支持"其他"自由填写选项。

---

### 4.3 应用行业

同工艺类。

### 4.4 成熟度

同工艺类。

### 4.5 获奖情况

同工艺类。

---

## 五、设备类字段（formType = `equipment`）

### 5.1 设备类别

| 表单 name | 中文名称 | 类型 | 必填 |
|---|---|---|---|
| `equipment_type` | 设备类别 | select（单选） | ✅ |

| value | 中文 | 下属专业领域 |
|---|---|---|
| `treatment` | 治理设备 | 水处理、大气污染治理、固废处理与综合利用、水生态修复、土壤修复、节能与碳减排 |
| `monitoring` | 检（监）测设备 | 水处理、大气污染治理、水生态修复、其他 |

---

### 5.2 治理设备 — 专业领域

| value | 中文 |
|---|---|
| `water` | 水处理 |
| `air` | 大气污染治理 |
| `solid` | 固废处理与综合利用 |
| `water_eco` | 水生态修复 |
| `soil` | 土壤修复 |
| `energy` | 节能与碳减排 |

---

### 5.3 治理设备 — 污染物类别/处理类型

每个领域的污染物选项与工艺类对应领域基本一致，此处列出差异点：

- **水处理**：分为常规污染物、重金属污染物、特殊污染物三组（含"新污染物"和"其他"填写框），另有非常规污染物填写框。
- **大气污染治理**：分为常规污染物、非常规污染物两组。
- **固废处理与综合利用**：以处理方式代替污染物。
- **水生态修复**：同工艺类生态修复中的污染治理型常规/重金属/特殊分组。
- **土壤修复**：分为无机类、重金属、挥发性有机、新污染物、其他。
- **节能与碳减排**：余热余能利用、高效燃烧等、热工系统优化。

---

### 5.4 治理设备 — 设备特点/适用环境

#### 水处理领域设备特点

**简单勾选（t='s'）：**

| value | 中文 |
|---|---|
| `compact` | 占地集约 |
| `unmanned` | 无人值守 |
| `iot` | 物联网信息系统 |
| `self_diag` | 自诊断能力 |
| `simple_ui` | 界面操作简洁 |
| `low_fail` | 故障率低 |

**带输入框（t='i'）：**

| value | 中文 |
|---|---|
| `low_cost` | 低运行成本[较同类设备降低：___%至___%] |
| `water_fluct` | 水质波动幅度宽[范围：___至___] |
| `temp_fluct` | 水温波动幅度宽[范围：___至___] |
| `acid` | 耐酸[范围：___至___] |
| `alkali` | 耐碱[范围：___至___] |
| `high_salt` | 高盐[范围：___至___] |
| `high_turbidity` | 高浊度[范围：___至___] |
| `low_turbidity` | 低浊度[范围：___至___] |
| `high_temp` | 高温[范围：___至___] |
| `low_temp` | 低温[范围：___至___] |
| `altitude` | 高海拔[范围：___至___] |
| `pressure` | 高压[范围：___至___] |
| `low_o2` | 低溶解氧[范围：___至___] |
| `anaerobic` | 厌氧环境[范围：___至___] |
| `low_cn` | 低碳氮比[范围：___至___] |

#### 大气污染治理领域设备特点

带输入框：烟气波动、温度波动、pH、高盐、耐高海拔、耐高压  
简单勾选：占地集约化、无人值守、高回收率、副产品价值、低二次污染、低材料消耗、低运行成本、低建设投资、低能耗、低碳排放、负碳技术

#### 固废处理与综合利用领域设备特点

| value | 中文 |
|---|---|
| `dry` | 干式环境 |
| `wet` | 湿式环境 |
| `high_temp` | 高温 |
| `low_temp` | 常温/低温 |
| `high_press` | 高压环境 |
| `atm` | 特定气氛 |
| `liquid` | 液态/熔融态 |
| `solid_state` | 固态 |

#### 土壤修复领域设备特点

| value | 中文 |
|---|---|
| `operating` | 在产企业 |
| `retired` | 停产退役场地 |
| `redevelop` | 搬迁再开发场地 |
| `soil_only` | 土壤 |
| `groundwater` | 地下水 |
| `soil_water` | 水土协同修复 |

#### 节能与碳减排领域设备特点

| value | 中文 |
|---|---|
| `dry_flue` | 干烟气 |
| `wet_flue` | 湿烟气 |
| `high_temp` | 高温 |
| `low_temp` | 低温 |
| `pos_press` | 正压 |
| `neg_press` | 负压 |
| `high_dust` | 高粉尘 |
| `acid_gas` | 酸性气体 |
| `alkali_gas` | 碱性气体 |

---

### 5.5 治理设备 — 其他通用字段

| 字段 | 说明 |
|---|---|
| 应用行业 | 同工艺类 |
| 来源 | `domestic`=国内生产 / `overseas`=海外生产（多选，选填） |
| 成熟度 | 同工艺类 |
| 案例简介 | 同工艺类 |
| 获奖情况 | 同工艺类 |

---

### 5.6 检（监）测设备 — 检测内容

检（监）测设备的选项结构为分组多选，以下列出各领域分组及其检测项目。

#### 5.6.1 水处理检测内容

| 分组 ID | 分组名称 | 检测项（部分） |
|---|---|---|
| `mon_w_phys` | 综合指标-理化指标 | 水温、色度、臭、浊度、透明度、pH、残渣、矿化度、电导率、氧化还原电位、酸度、碱度、二氧化碳 |
| `mon_w_anion` | 综合指标-无机阴离子 | 硫化物、氰化物、硫酸盐、硼、游离氯和总氯、氯化物、氟化物、碘化物 |
| `mon_w_nutrient` | 综合指标-营养盐及有机污染综合指标 | 溶解氧、化学需氧量、高锰酸盐指数、生化需氧量、总有机碳、元素磷、磷、凯氏氮、总氮、硝酸盐氮、亚硝酸盐氮、氨氮 |
| `mon_w_metal` | 综合指标-金属及其化合物 | 银、铝、砷、钡、铍、铋、镉、钴、铬、铜、汞、铁、锰、镍、钼、铅、锑、硒、锌、钒、铟和铊、钍、铀、钾和钠、钙镁（含总硬度） |
| `mon_w_org_class` | 有机污染物-类别测定 | 挥发酚类、苯氨类、可吸附有机卤素（AOX）、总有机卤化物（TOX）、石油类、有机质 |
| `mon_w_org_voc` | 有机污染物-挥发性和半挥发性 | 挥发性有机物、半挥发性有机物 |
| `mon_w_org_spec` | 有机污染物-特定污染物测定 | 苯系有机物、挥发性卤代烃、酚类化合物、氯苯类化合物、苯胺类化合物、硝基苯类化合物、甲醛、有机氯农药、有机磷农药、阿特拉津、丙烯腈和丙烯醛、三滤乙醛、多环芳烃、二噁英类、多氯联苯、有机锡化物、阴离子洗涤剂 |
| `mon_w_bio` | 生物监测 | 浮游生物、底栖生物、初级生产力测定、细菌总数、总大肠杆菌、粪大肠杆菌、沙门氏菌 |
| `mon_w_auto` | 水质自动监测系统 | pH、电导率、溶解氧、浊度、温度、化学需氧量、高锰酸盐指数、总有机碳、石油类、氰化物、砷、六价铬、铅、镉、氨氮、总氮、总磷、溶解氧、污水流量 |
| `mon_w_sediment` | 底质监测 | （待补充） |

#### 5.6.2 大气污染治理检测内容

| 分组 ID | 分组名称 | 检测项（部分） |
|---|---|---|
| `mon_a_phys` | 综合指标-理化指标 | 温度、压力、流速、湿度、烟气含氧量、烟气黑度 |
| `mon_a_gas` | 综合指标-气态污染物 | SO2、NOX、颗粒物浓度、CO、CO2、O3、H2S、HF、HCl、NH3、HCN、Cl2、氟化物 |
| `mon_a_heavy` | 综合指标-重金属 | Hg、Pb、Cd、Cr、As |
| `mon_a_org_class` | 有机污染物-类别测定 | TVOC、非甲烷总烃、挥发性卤代烃、酚类化合物、醛酮类化合物、多环芳烃、二噁英类、多氯联苯 |
| `mon_a_org_voc` | 有机污染物-挥发性和半挥发性 | 挥发性有机物、半挥发性有机物 |
| `mon_a_org_spec` | 有机污染物-特定污染物测定 | 苯、甲苯、二甲苯、乙苯、苯乙烯、甲醛、乙醛、丙烯醛、氯乙烯、三氯乙烯、四氯乙烯、三氯甲烷、四氯化碳 |
| `mon_a_bio` | 生物监测 | 大气微生物总数、细菌气溶胶、真菌气溶胶、花粉过敏原 |

#### 5.6.3 水生态修复检测内容

分组结构与水处理类似，额外增加：

| 分组 ID | 分组名称 |
|---|---|
| `mon_eco_sediment` | 底质监测（底质扰动、营养盐释放） |
| `mon_eco_atm` | 大气监测（PM2.5、PM10、SO2、NO2、CO、O3、VOCs、NH3、CH4、CO2、负离子） |

#### 5.6.4 其他

检（监）测设备选择"其他"时，提供自由文本输入框。

---

## 六、API 接口字段映射

### 提交数据 JSON 关键字段

```
{
  // 基础信息
  "name", "phone", "email", "company", "creditCode", "legalPerson", "establishDate",

  // 类型选择
  "formType",          // process | material | equipment
  "objectName",        // 技术/工艺/材料/设备名称

  // 工艺类
  "process_field",     // 专业领域 key
  "process_granularity", // 工艺颗粒度
  "process_principle", // 工艺原理 (数组)
  "process_maturity",  // 成熟度
  "process_source",    // 技术来源
  "process_industry_code[]", "process_industry_major[]", "process_industry_middle[]", "process_industry_minor[]",
  "process_stage",     // 工艺环节 (数组)
  "process_feature",   // 工艺特点 (数组)
  "pollutant",         // 污染物治理对象 (数组)
  "case_project_name", "case_owner", "case_contact_name", "case_contact_phone",
  "process_has_award", "process_award_level", "process_award_grade",

  // 材料类
  "material_field",    // 专业应用领域 key
  "material_category", // 功能分类（数组）
  "material_industry_code[]", ...
  "material_maturity",
  "material_has_award",

  // 设备类
  "equipment_type",    // treatment | monitoring
  "equipment_field",   // 专业领域 key
}
```

---

## 七、字段显示条件与级联规则汇总

| 条件 | 触发的字段 |
|---|---|
| 选择 `formType` | 显示对应的工艺/材料/设备表单 |
| 选择专业领域 | 动态渲染该领域的全部子字段（颗粒度、原理、特点、污染物等） |
| 工艺颗粒度 ≠ 综合型 | 水处理/大气污染治理中显示"工艺环节" |
| 成熟度选后三项 | 显示"案例简介" |
| 获奖选"是" | 展开奖项级别和获奖等级 |
| 设备类别选"治理设备" | 显示治理设备的6个专业领域 |
| 设备类别选"检测设备" | 显示检测设备的4个专业领域（水处理/大气/水生态/其他） |

---

*文档生成时间：2026-04-08*
