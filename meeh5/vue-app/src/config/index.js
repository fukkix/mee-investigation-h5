// 工艺类配置
export const processConfig = {
  water: {
    name: '水处理',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: ['functional', 'unit', 'other'],
    stageOptions: [
      { value: 'pretreatment', label: '预处理（一级）' },
      { value: 'main', label: '主处理（二级）' },
      { value: 'advanced', label: '深度处理（三级）' },
      { value: 'post', label: '后处理' }
    ],
    features: {
      withInput: [
        { value: 'water_fluctuation', label: '水质波动幅度宽', placeholder: '范围：___至___' },
        { value: 'temp_fluctuation', label: '温度波动幅度宽', placeholder: '范围：___至___' },
        { value: 'impact_load', label: '耐冲击负荷', placeholder: '请填写负荷类型及幅度范围' },
        { value: 'ph_range', label: 'pH', placeholder: '范围：___至___' },
        { value: 'high_salt', label: '高盐环境', placeholder: '范围：___至___' },
        { value: 'turbidity', label: '浊度范围', placeholder: '范围：___至___' },
        { value: 'high_altitude', label: '耐高海拔', placeholder: '请填写' },
        { value: 'high_pressure', label: '耐高压', placeholder: '请填写' },
        { value: 'low_oxygen', label: '耐低溶解氧', placeholder: '请填写' },
        { value: 'anaerobic', label: '适应厌氧环境', placeholder: '请填写' },
        { value: 'low_cn_ratio', label: '适应低碳氮比', placeholder: '请填写' }
      ],
      simple: [
        { value: 'compact', label: '占地集约化' },
        { value: 'unmanned', label: '无人值守' },
        { value: 'high_recovery', label: '高回收率（循环率）' },
        { value: 'byproduct_value', label: '副产品价值' },
        { value: 'low_pollution', label: '低二次污染' },
        { value: 'low_material', label: '低材料消耗' },
        { value: 'low_operation_cost', label: '低单位处理能力运行成本' },
        { value: 'low_construction_cost', label: '低单位处理能力建设投资' },
        { value: 'low_energy', label: '低能耗' },
        { value: 'low_carbon', label: '低碳排放' },
        { value: 'negative_carbon', label: '负碳技术' }
      ],
      other: true
    },
    pollutants: {
      conventional: [
        { value: 'codcr', label: 'CODCr' },
        { value: 'bod5', label: 'BOD5' },
        { value: 'turbidity_ss', label: '浊度（或悬浮物）' },
        { value: 'nh3n', label: 'NH3-N' },
        { value: 'tn', label: 'TN' },
        { value: 'tp', label: 'TP' },
        { value: 'toc', label: 'TOC' },
        { value: 'fe', label: '总铁' },
        { value: 'mn', label: '总锰' },
        { value: 'hardness', label: '总硬度' },
        { value: 'alkalinity', label: '碱度' },
        { value: 'conductivity', label: '电导率' },
        { value: 'tds', label: '总溶固' },
        { value: 'oil', label: '石油类' },
        { value: 'color', label: '色度' },
        { value: 'sulfide', label: '硫化物' }
      ],
      heavyMetal: [
        { value: 'cu', label: '总铜' },
        { value: 'zn', label: '总锌' },
        { value: 'as', label: '总砷' },
        { value: 'cr6', label: '六价铬' },
        { value: 'cr', label: '总铬' },
        { value: 'pb', label: '总铅' },
        { value: 'ni', label: '总镍' },
        { value: 'hg', label: '总汞' },
        { value: 'cd', label: '总镉' },
        { value: 'be', label: '总铍' },
        { value: 'ag', label: '总银' },
        { value: 'se', label: '总硒' }
      ],
      special: [
        { value: 'cyanide', label: '总氰化物' },
        { value: 'benzene', label: '苯' },
        { value: 'phenol', label: '挥发酚' },
        { value: 'pah', label: '多环芳烃' },
        { value: 'bap', label: '苯并（a）芘' }
      ],
      specialOther: true,
      newPollutant: true,
      unconventional: true,
      other: true
    }
  },
  air: {
    name: '大气污染治理',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: ['functional', 'unit', 'other'],
    stageOptions: [
      { value: 'pretreatment', label: '预处理' },
      { value: 'process', label: '过程处理' },
      { value: 'advanced', label: '深度处理' }
    ],
    features: {
      withInput: [
        { value: 'flue_gas_fluctuation', label: '烟气波动幅度宽', placeholder: '请填写污染物类型及幅度范围' },
        { value: 'temp_fluctuation', label: '温度波动幅度宽', placeholder: '范围：___至___' },
        { value: 'ph_range', label: 'pH', placeholder: '范围：___至___' },
        { value: 'high_salt', label: '高盐环境', placeholder: '范围：___至___' },
        { value: 'high_altitude', label: '耐高海拔', placeholder: '请填写' },
        { value: 'high_pressure', label: '耐高压', placeholder: '请填写' }
      ],
      simple: [
        { value: 'compact', label: '占地集约化' },
        { value: 'unmanned', label: '无人值守' },
        { value: 'high_recovery', label: '高回收率（循环率）' },
        { value: 'byproduct_value', label: '副产品价值' },
        { value: 'low_pollution', label: '低二次污染' },
        { value: 'low_material', label: '低材料消耗' },
        { value: 'low_operation_cost', label: '低单位处理能力运行成本' },
        { value: 'low_construction_cost', label: '低单位处理能力建设投资' },
        { value: 'low_energy', label: '低能耗' },
        { value: 'low_carbon', label: '低碳排放' },
        { value: 'negative_carbon', label: '负碳技术' }
      ],
      other: true
    },
    pollutants: {
      conventional: [
        { value: 'particulate', label: '颗粒物' },
        { value: 'so2', label: '二氧化硫' },
        { value: 'nox', label: '氮氧化物' },
        { value: 'co', label: '一氧化碳' },
        { value: 'o3', label: '臭氧' },
        { value: 'pb_compounds', label: '铅及其化合物' }
      ],
      unconventional: [
        { value: 'vocs', label: '挥发性有机化合物' },
        { value: 'dioxin', label: '二噁英类' },
        { value: 'pah', label: '多环芳烃' },
        { value: 'heavy_metal', label: '有毒重金属及其化合物' }
      ],
      other: true
    }
  },
  solid: {
    name: '固废处理与综合利用',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: [],
    processClassification: [
      { value: 'pretreatment', label: '预处理' },
      { value: 'sorting', label: '分选提纯' },
      { value: 'dewatering', label: '浓缩与脱水' },
      { value: 'aerobic', label: '好氧生物处理' },
      { value: 'anaerobic', label: '厌氧发酵' },
      { value: 'incineration', label: '焚烧处理' },
      { value: 'pyrolysis', label: '热解处理' },
      { value: 'chemical', label: '药剂处理' },
      { value: 'resource', label: '资源化利用' },
      { value: 'co_disposal', label: '协同处置' },
      { value: 'advanced', label: '深度处理' },
      { value: 'landfill', label: '填埋处置' }
    ],
    processClassificationOther: true,
    pollutants: {
      types: [
        { value: 'urban', label: '城市固废' },
        { value: 'industrial', label: '工业固废' },
        { value: 'hazardous', label: '危险废物' },
        { value: 'mining', label: '矿山固废' },
        { value: 'ferrous', label: '黑色冶金固废' },
        { value: 'nonferrous', label: '有色冶金固废' },
        { value: 'chemical', label: '化工固废' },
        { value: 'other_industrial', label: '其他工业固废' },
        { value: 'blast_furnace', label: '高炉渣' },
        { value: 'steel_slag', label: '钢渣' },
        { value: 'iron_dust', label: '含铁尘泥' },
        { value: 'scrap_steel', label: '废钢' },
        { value: 'fly_ash', label: '粉煤灰/脱硫石膏' }
      ],
      other: true
    }
  },
  eco: {
    name: '生态修复',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: [],
    features: {
      withInput: [
        { value: 'water_fluctuation', label: '水质波动幅度宽', placeholder: '范围：___至___' },
        { value: 'temp_fluctuation', label: '温度波动幅度宽', placeholder: '范围：___至___' },
        { value: 'impact_load', label: '耐冲击负荷', placeholder: '请填写负荷类型及幅度范围' },
        { value: 'ph_range', label: 'pH', placeholder: '范围：___至___' },
        { value: 'high_salt', label: '高盐环境', placeholder: '范围：___至___' },
        { value: 'turbidity', label: '浊度范围', placeholder: '范围：___至___' },
        { value: 'high_altitude', label: '耐高海拔', placeholder: '请填写' },
        { value: 'high_pressure', label: '耐高压', placeholder: '请填写' },
        { value: 'low_oxygen', label: '耐低溶解氧', placeholder: '请填写' },
        { value: 'anaerobic', label: '适应厌氧环境', placeholder: '请填写' },
        { value: 'low_cn_ratio', label: '适应低碳氮比', placeholder: '请填写' }
      ],
      simple: [
        { value: 'energy_type', label: '能源类型（太阳能、风能、重力、地热能、生物能、化石能源）' },
        { value: 'resource_cycle', label: '资源循环与再利用（物质、能量）' },
        { value: 'nature_enhance', label: '自然过程强化（生物降解、植物吸收、土壤过滤、湿地净化、生态系统自净）' },
        { value: 'eco_diversity', label: '生态整合性与多样性（植物多样性、动物多样性、微生物多样性、土壤、填料、水体）' },
        { value: 'eco_friendly', label: '环境友好（自然材料、无毒材料、可再生材料）' },
        { value: 'self_regulation', label: '自我调节' },
        { value: 'self_repair', label: '自我修复' },
        { value: 'sustainable', label: '可持续' },
        { value: 'compact', label: '占地集约化' },
        { value: 'unmanned', label: '无人值守' },
        { value: 'high_recovery', label: '高回收率（循环率）' },
        { value: 'byproduct_value', label: '副产品价值' },
        { value: 'low_pollution', label: '低二次污染' },
        { value: 'low_material', label: '低材料消耗' },
        { value: 'low_operation_cost', label: '低单位处理能力运行成本' },
        { value: 'low_construction_cost', label: '低单位处理能力建设投资' },
        { value: 'low_energy', label: '低能耗' },
        { value: 'low_carbon', label: '低碳排放' },
        { value: 'negative_carbon', label: '负碳技术' }
      ],
      other: true
    },
    pollutants: {
      pollutionControl: {
        conventional: [
          { value: 'codcr', label: 'CODCr' }, { value: 'bod5', label: 'BOD5' }, { value: 'ss', label: 'SS' },
          { value: 'nh3n', label: 'NH3-N' }, { value: 'tn', label: 'TN' }, { value: 'tp', label: 'TP' },
          { value: 'toc', label: 'TOC' }, { value: 'fe', label: '总铁' }, { value: 'mn', label: '总锰' },
          { value: 'hardness', label: '总硬度' }, { value: 'alkalinity', label: '碱度' },
          { value: 'conductivity', label: '电导率' }, { value: 'tds', label: '总溶固' },
          { value: 'oil', label: '石油类' }, { value: 'color', label: '色度' }, { value: 'sulfide', label: '硫化物' },
          { value: 'pm25', label: 'PM2.5' }, { value: 'pm10', label: 'PM10' },
          { value: 'so2', label: 'SO2' }, { value: 'no2', label: 'NO2' }, { value: 'o3', label: '臭氧' }
        ],
        heavyMetal: [
          { value: 'cr_eco', label: 'Cr' }, { value: 'cu', label: '总铜' }, { value: 'zn', label: '总锌' },
          { value: 'as', label: '总砷' }, { value: 'cr6', label: '六价铬' }, { value: 'cr', label: '总铬' },
          { value: 'pb', label: '总铅' }, { value: 'ni', label: '总镍' }, { value: 'hg', label: '总汞' },
          { value: 'cd', label: '总镉' }, { value: 'be', label: '总铍' }, { value: 'ag', label: '总银' },
          { value: 'se', label: '总硒' }
        ],
        special: [
          { value: 'cyanide', label: '总氰化物' }, { value: 'benzene', label: '苯' },
          { value: 'phenol', label: '挥发酚' }, { value: 'pah', label: '多环芳烃' }, { value: 'bap', label: '苯并芘' }
        ],
        newPollutant: true,
        other: true
      },
      restoration: [
        { value: 'vegetation', label: '植被覆盖率提升', hasInput: true, placeholder: '请填写' },
        { value: 'biodiversity_animal', label: '生物多样性提升 - 动物' },
        { value: 'biodiversity_plant', label: '生物多样性提升 - 植物' },
        { value: 'biodiversity_microbe', label: '生物多样性提升 - 微生物' },
        { value: 'biodiversity_enzyme', label: '生物多样性提升 - 土壤酶活性' },
        { value: 'stability', label: '生态系统稳定性提升', hasInput: true, placeholder: '生态系统内稳性' }
      ],
      resourceProtection: [
        { value: 'soil_water', label: '水土保持' }, { value: 'resource_saving', label: '资源节约' },
        { value: 'water_source', label: '水源地保障' }, { value: 'waste_cycle', label: '废弃物循环' },
        { value: 'eco_balance', label: '生态平衡' }
      ],
      disasterPrevention: [
        { value: 'wave_reduction', label: '削浪护岸' }, { value: 'windbreak', label: '防风固沙' },
        { value: 'landslide', label: '滑坡治理' }
      ],
      landscape: [
        { value: 'living_env', label: '人居环境提升' }, { value: 'negative_ion', label: '负氧离子' },
        { value: 'beautification', label: '景观美化' }, { value: 'microclimate', label: '改善微气候' }
      ],
      unconventional: true,
      other: true
    }
  },
  soil: {
    name: '土壤修复',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: [],
    features: {
      withInput: [
        { value: 'pollution_fluctuation', label: '处置水土污染物含量波动幅度宽', placeholder: '请填写污染物类型及幅度范围' },
        { value: 'particle_fluctuation', label: '粒径波动幅度宽', placeholder: '范围：___至___' },
        { value: 'impact_load', label: '耐冲击负荷', placeholder: '请填写负荷类型及幅度范围' },
        { value: 'ph_range', label: 'pH', placeholder: '范围：___至___' },
        { value: 'sand_stone_ratio', label: '土质砂石比范围', placeholder: '范围：___至___' },
        { value: 'moisture_content', label: '土质含水率范围', placeholder: '范围：___至___' },
        { value: 'high_altitude', label: '耐高海拔', placeholder: '请填写' },
        { value: 'high_pressure', label: '耐高压', placeholder: '请填写' },
        { value: 'low_oxygen', label: '耐低溶解氧', placeholder: '请填写' },
        { value: 'anaerobic', label: '适应厌氧环境', placeholder: '请填写' },
        { value: 'low_cn_ratio', label: '适应低碳氮比', placeholder: '请填写' }
      ],
      simple: [
        { value: 'compact', label: '占地集约化' }, { value: 'unmanned', label: '无人值守' },
        { value: 'high_recovery', label: '高回收率（循环率）' }, { value: 'byproduct_value', label: '副产品价值' },
        { value: 'low_pollution', label: '低二次污染' }, { value: 'low_material', label: '低材料消耗' },
        { value: 'low_operation_cost', label: '低单位处理能力运行成本' },
        { value: 'low_construction_cost', label: '低单位处理能力建设投资' },
        { value: 'low_energy', label: '低能耗' }, { value: 'low_carbon', label: '低碳排放' },
        { value: 'negative_carbon', label: '负碳技术' }
      ],
      other: true
    },
    pollutants: {
      inorganic: [
        { value: 'ph', label: 'pH' }, { value: 'cyanide', label: '氰化物' }, { value: 'fluoride', label: '氟化物' }
      ],
      inorganicOther: true,
      heavyMetal: [
        { value: 'cu', label: '总铜' }, { value: 'zn', label: '总锌' }, { value: 'as', label: '总砷' },
        { value: 'cr6', label: '六价铬' }, { value: 'cr', label: '总铬' }, { value: 'pb', label: '总铅' },
        { value: 'ni', label: '总镍' }, { value: 'hg', label: '总汞' }, { value: 'cd', label: '总镉' },
        { value: 'be', label: '总铍' }, { value: 'ag', label: '总银' }, { value: 'se', label: '总硒' }
      ],
      heavyMetalOther: true,
      volatile: [
        { value: 'chlorinated', label: '氯代烃' }, { value: 'benzene', label: '苯系数' }
      ],
      volatileOther: true,
      semiVolatile: [
        { value: 'benzene2', label: '苯系数' }, { value: 'pah', label: '多环芳烃' },
        { value: 'pesticide', label: '有机农药类' }, { value: 'pcb', label: '多氯联苯' }
      ],
      semiVolatileOther: true,
      newPollutant: true,
      other: true
    }
  },
  energy: {
    name: '节能与碳减排',
    hasGranularity: true,
    granularityOptions: [
      { value: 'comprehensive', label: '综合型工艺系统流程' },
      { value: 'functional', label: '特定功能型工艺流程' },
      { value: 'unit', label: '处理单元型工艺' },
      { value: 'other', label: '其他' }
    ],
    showStageWhen: [],
    features: {
      withInput: [
        { value: 'high_altitude', label: '耐高海拔', placeholder: '请填写' },
        { value: 'high_pressure', label: '耐高压', placeholder: '请填写' }
      ],
      simple: [
        { value: 'combustion_efficiency', label: '燃烧效率提升' },
        { value: 'low_emission_temp', label: '排放温度低' },
        { value: 'efficient_heat_exchange', label: '高效换热' },
        { value: 'low_nox', label: '低氮燃烧' },
        { value: 'low_heat_upgrade', label: '低品质热能提升' },
        { value: 'compact', label: '占地集约化' }, { value: 'unmanned', label: '无人值守' },
        { value: 'high_recovery', label: '高回收率（循环率）' }, { value: 'byproduct_value', label: '副产品价值' },
        { value: 'low_pollution', label: '低二次污染' },
        { value: 'low_operation_cost', label: '低单位处理能力运行成本' },
        { value: 'low_construction_cost', label: '低单位处理能力建设投资' },
        { value: 'low_carbon', label: '低碳排放' }
      ],
      other: true
    },
    pollutants: {
      types: [
        { value: 'dusty_flue_gas', label: '含尘烟气', hasInput: true, placeholder: '包括' },
        { value: 'wet_flue_gas', label: '含湿烟气', hasInput: true, placeholder: '包括' },
        { value: 'low_temp_water', label: '低温热水', hasInput: true, placeholder: '包括' },
        { value: 'unconventional_medium', label: '非常规介质（若有请填写）', hasInput: true, placeholder: '请填写非常规介质' }
      ],
      other: true
    }
  }
}

// 材料类配置
export const materialConfig = {
  water: {
    name: '水处理',
    categories: [
      { value: 'filter', label: '过滤材料' }, { value: 'adsorption', label: '吸附材料' },
      { value: 'ion_exchange', label: '离子交换材料' }, { value: 'catalyst', label: '催化材料' },
      { value: 'disinfection', label: '杀菌消毒材料' }, { value: 'flocculation', label: '絮凝/混凝材料' },
      { value: 'corrosion_inhibitor', label: '缓蚀阻垢材料' }, { value: 'biological', label: '生物处理材料' },
      { value: 'membrane', label: '膜材料' }, { value: 'demulsifier', label: '破乳药剂' },
      { value: 'heavy_metal_capture', label: '重金属捕捉剂' }, { value: 'redox', label: '氧化还原药剂' }
    ],
    other: true
  },
  air: {
    name: '大气污染治理',
    categories: [
      { value: 'separation_filter', label: '分离/过滤材料' },
      { value: 'adsorption_separation', label: '吸附分离材料' },
      { value: 'catalytic_conversion', label: '催化转换材料' },
      { value: 'absorption_reaction', label: '吸收/反应材料' },
      { value: 'auxiliary_functional', label: '辅助与功能材料' }
    ],
    other: true
  },
  solid: {
    name: '固废处理与综合利用',
    categories: [
      { value: 'solidification_agent', label: '固化剂' }, { value: 'binder', label: '粘结剂' },
      { value: 'stabilizer', label: '稳定剂' }, { value: 'grinding_aid', label: '助磨剂' }
    ],
    other: true
  },
  eco: {
    name: '生态修复',
    categories: [
      { value: 'filter', label: '过滤材料' }, { value: 'adsorption', label: '吸附材料' },
      { value: 'ion_exchange', label: '离子交换材料' }, { value: 'catalyst', label: '催化材料' },
      { value: 'disinfection', label: '杀菌消毒材料' }, { value: 'flocculation', label: '絮凝/混凝材料' },
      { value: 'corrosion_inhibitor', label: '缓蚀阻垢材料' }, { value: 'biological', label: '生物处理材料' },
      { value: 'membrane', label: '膜材料' }, { value: 'demulsifier', label: '破乳药剂' },
      { value: 'heavy_metal_capture', label: '重金属捕捉剂' }, { value: 'redox', label: '氧化还原药剂' }
    ],
    other: true
  },
  soil: {
    name: '土壤修复',
    categories: [
      { value: 'oxidation_agent', label: '氧化药剂' }, { value: 'reduction_agent', label: '还原药剂' },
      { value: 'solidification_agent', label: '固化稳定化药剂' }, { value: 'adsorption', label: '吸附材料' },
      { value: 'heavy_metal_capture', label: '重金属捕捉剂' }
    ],
    other: true
  },
  energy: {
    name: '节能与碳减排',
    categories: [
      { value: 'solidification_agent', label: '固化剂' }, { value: 'binder', label: '粘结剂' },
      { value: 'stabilizer', label: '稳定剂' }, { value: 'grinding_aid', label: '助磨剂' }
    ],
    other: true
  }
}

// 设备类配置
export const equipmentConfig = {
  treatment: { name: '治理设备', fields: ['water', 'air', 'solid', 'water_eco', 'soil', 'energy'] },
  monitoring: { name: '检（监）测设备', fields: ['water', 'air', 'water_eco', 'other'] }
}

export { equipmentTreatmentConfig } from './equipmentTreatment'
export { equipmentMonitoringConfig } from './equipmentMonitoring'

// 通用选项
export const maturityOptions = [
  { value: 'pilot_stable', label: '已开展中试，运行稳定，达到预期指标' },
  { value: 'pilot_complete', label: '完成中试研究，情况良好，拟开展示范工程' },
  { value: 'demo', label: '完成示范工程，运行情况待观察' },
  { value: 'stable_2_4', label: '建成2~4项工程且运行稳定' },
  { value: 'stable_5plus', label: '建成5项及以上工程项目的' }
]

export const CASE_REQUIRED_MATURITY = ['demo', 'stable_2_4', 'stable_5plus']

export const principleOptions = [
  { value: 'physical', label: '物理法' },
  { value: 'chemical', label: '化学法' },
  { value: 'biological', label: '生物法' },
  { value: 'physicochemical', label: '物理化学' },
  { value: 'other', label: '其他' }
]

export const sourceOptions = [
  { value: 'overseas', label: '海外引进' },
  { value: 'domestic_innovation', label: '国内自主创新' },
  { value: 'domestic_integration', label: '国内自主集成' }
]

export const awardLevelOptions = [
  { value: 'international', label: '国际级' },
  { value: 'national', label: '国家级' },
  { value: 'provincial', label: '省部级' }
]

export const awardGradeOptions = [
  { value: 'special', label: '特等奖' },
  { value: 'first', label: '一等奖' },
  { value: 'second', label: '二等奖' },
  { value: 'third', label: '三等奖' },
  { value: 'excellent', label: '优秀奖' },
  { value: 'other', label: '其他' }
]

export const fieldOptions = [
  { value: 'water', label: '水处理' },
  { value: 'air', label: '大气污染治理' },
  { value: 'solid', label: '固废处理与综合利用' },
  { value: 'eco', label: '生态修复' },
  { value: 'soil', label: '土壤修复' },
  { value: 'energy', label: '节能与碳减排' }
]
