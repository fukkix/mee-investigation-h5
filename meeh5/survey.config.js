// ========== 配置对象（从 survey.js 拆分） ==========

// ========== 工艺/材料/设备基础配置 ==========
const processConfig = {
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
                features: {
                    withInput: [
                        { value: 'water_fluctuation', label: '水质波动幅度宽', placeholder: '请填写污染物类型及幅度范围' },
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
                            { value: 'codcr', label: 'CODCr' },
                            { value: 'bod5', label: 'BOD5' },
                            { value: 'ss', label: 'SS' },
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
                            { value: 'sulfide', label: '硫化物' },
                            { value: 'pm25', label: 'PM2.5' },
                            { value: 'pm10', label: 'PM10' },
                            { value: 'so2', label: 'SO2' },
                            { value: 'no2', label: 'NO2' },
                            { value: 'o3', label: '臭氧' }
                        ],
                        heavyMetal: [
                            { value: 'cr_eco', label: 'Cr' },
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
                            { value: 'bap', label: '苯并芘' }
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
                        { value: 'soil_water', label: '水土保持' },
                        { value: 'resource_saving', label: '资源节约' },
                        { value: 'water_source', label: '水源地保障' },
                        { value: 'waste_cycle', label: '废弃物循环' },
                        { value: 'eco_balance', label: '生态平衡' }
                    ],
                    disasterPrevention: [
                        { value: 'wave_reduction', label: '削浪护岸' },
                        { value: 'windbreak', label: '防风固沙' },
                        { value: 'landslide', label: '滑坡治理' }
                    ],
                    landscape: [
                        { value: 'living_env', label: '人居环境提升' },
                        { value: 'negative_ion', label: '负氧离子' },
                        { value: 'beautification', label: '景观美化' },
                        { value: 'microclimate', label: '改善微气候' }
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
                    inorganic: [
                        { value: 'ph', label: 'pH' },
                        { value: 'cyanide', label: '氰化物' },
                        { value: 'fluoride', label: '氟化物' }
                    ],
                    inorganicOther: true,
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
                    heavyMetalOther: true,
                    volatile: [
                        { value: 'chlorinated', label: '氯代烃' },
                        { value: 'benzene', label: '苯系数' }
                    ],
                    volatileOther: true,
                    semiVolatile: [
                        { value: 'benzene2', label: '苯系数' },
                        { value: 'pah', label: '多环芳烃' },
                        { value: 'pesticide', label: '有机农药类' },
                        { value: 'pcb', label: '多氯联苯' }
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
                        { value: 'compact', label: '占地集约化' },
                        { value: 'unmanned', label: '无人值守' },
                        { value: 'high_recovery', label: '高回收率（循环率）' },
                        { value: 'byproduct_value', label: '副产品价值' },
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
        };

        
        // ========== 材料类完整配置对象 ==========
        
        const materialConfig = {
            water: {
                name: '水处理',
                categories: [
                    { value: 'filter', label: '过滤材料' },
                    { value: 'adsorption', label: '吸附材料' },
                    { value: 'ion_exchange', label: '离子交换材料' },
                    { value: 'catalyst', label: '催化材料' },
                    { value: 'disinfection', label: '杀菌消毒材料' },
                    { value: 'flocculation', label: '絮凝/混凝材料' },
                    { value: 'corrosion_inhibitor', label: '缓蚀阻垢材料' },
                    { value: 'biological', label: '生物处理材料' },
                    { value: 'membrane', label: '膜材料' },
                    { value: 'demulsifier', label: '破乳药剂' },
                    { value: 'heavy_metal_capture', label: '重金属捕捉剂' },
                    { value: 'redox', label: '氧化还原药剂' }
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
                    { value: 'solidification_agent', label: '固化剂' },
                    { value: 'binder', label: '粘结剂' },
                    { value: 'stabilizer', label: '稳定剂' },
                    { value: 'grinding_aid', label: '助磨剂' }
                ],
                other: true
            },
            eco: {
                name: '生态修复',
                categories: [
                    { value: 'filter', label: '过滤材料' },
                    { value: 'adsorption', label: '吸附材料' },
                    { value: 'ion_exchange', label: '离子交换材料' },
                    { value: 'catalyst', label: '催化材料' },
                    { value: 'disinfection', label: '杀菌消毒材料' },
                    { value: 'flocculation', label: '絮凝/混凝材料' },
                    { value: 'corrosion_inhibitor', label: '缓蚀阻垂材料' },
                    { value: 'biological', label: '生物处理材料' },
                    { value: 'membrane', label: '膜材料' },
                    { value: 'demulsifier', label: '破乳药剂' },
                    { value: 'heavy_metal_capture', label: '重金属捕捉剂' },
                    { value: 'redox', label: '氧化还原药剂' }
                ],
                other: true
            },
            soil: {
                name: '土壤修复',
                categories: [
                    { value: 'oxidation_agent', label: '氧化药剂' },
                    { value: 'reduction_agent', label: '还原药剂' },
                    { value: 'solidification_agent', label: '固化稳定化药剂' },
                    { value: 'adsorption', label: '吸附材料' },
                    { value: 'heavy_metal_capture', label: '重金属捕捉剂' }
                ],
                other: true
            },
            energy: {
                name: '节能与碳减排',
                categories: [
                    { value: 'solidification_agent', label: '固化剂' },
                    { value: 'binder', label: '粘结剂' },
                    { value: 'stabilizer', label: '稳定剂' },
                    { value: 'grinding_aid', label: '助磨剂' }
                ],
                other: true
            }
        };

        
        // ========== 设备类简化配置（核心结构） ==========
        
        const equipmentConfig = {
            treatment: {
                name: '治理设备',
                fields: ['water', 'air', 'solid', 'water_eco', 'soil', 'energy']
            },
            monitoring: {
                name: '检（监）测设备',
                fields: ['water', 'air', 'water_eco', 'other']
            }
        };

// ========== 设备完整实现配置 ==========
const equipmentTreatmentConfig = {
            water: { name: '水处理', pollutantGroups: [{ id: 'eq_w_conv', label: '常规污染物', items: [{v:'codcr',l:'CODCr'},{v:'bod5',l:'BOD5'},{v:'ss',l:'SS'},{v:'nh3n',l:'NH3-N'},{v:'tn',l:'TN'},{v:'tp',l:'TP'},{v:'toc',l:'TOC'},{v:'fe',l:'总铁'},{v:'mn',l:'总锰'},{v:'hardness',l:'总硬度'},{v:'alkalinity',l:'碱度'},{v:'conductivity',l:'电导率'},{v:'tds',l:'总溶固'},{v:'oil',l:'石油类'},{v:'color',l:'色度'},{v:'sulfide',l:'硫化物'}] },{ id: 'eq_w_heavy', label: '重金属污染物', items: [{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}] },{ id: 'eq_w_spec', label: '特殊污染物', items: [{v:'cyanide',l:'总氰化物'},{v:'benzene',l:'苯'},{v:'phenol',l:'挥发酚'},{v:'pah',l:'多环芳烃'}], extras: [{v:'eq_w_new',l:'新污染物',ph:'请填写新污染物'},{v:'eq_w_other',l:'其他',ph:'请填写其他污染物'}] }], nonConventional: true, nonConventionalOther: true, features: [{v:'compact',l:'占地集约',t:'s'},{v:'unmanned',l:'无人值守',t:'s'},{v:'iot',l:'物联网信息系统',t:'s'},{v:'self_diag',l:'自诊断能力',t:'s'},{v:'simple_ui',l:'界面操作简洁',t:'s'},{v:'low_fail',l:'故障率低',t:'s'},{v:'low_cost',l:'低运行成本[较同类设备降低：___%至___%]',t:'i',ph:'请填写范围'},{v:'water_fluct',l:'水质波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'temp_fluct',l:'水温波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'acid',l:'耐酸[范围：___至___]',t:'i',ph:'请填写范围'},{v:'alkali',l:'耐碱[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_salt',l:'高盐[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_turbidity',l:'高浊度[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_turbidity',l:'低浊度[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_temp',l:'高温[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_temp',l:'低温[范围：___至___]',t:'i',ph:'请填写范围'},{v:'altitude',l:'高海拔[范围：___至___]',t:'i',ph:'请填写范围'},{v:'pressure',l:'高压[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_o2',l:'低溶解氧[范围：___至___]',t:'i',ph:'请填写范围'},{v:'anaerobic',l:'厌氧环境[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_cn',l:'低碳氮比[范围：___至___]',t:'i',ph:'请填写范围'},{v:'eq_w_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            air: { name: '大气污染治理', pollutantGroups: [{ id: 'eq_a_conv', label: '常规污染物', items: [{v:'particulate',l:'颗粒物'},{v:'so2',l:'二氧化硫'},{v:'nox',l:'氮氧化物'},{v:'co',l:'一氧化碳'},{v:'o3',l:'臭氧'},{v:'pb_comp',l:'铅及其化合物'}] },{ id: 'eq_a_unconv', label: '非常规污染物', items: [{v:'vocs',l:'挥发性有机化合物'},{v:'dioxin',l:'二噁英类'},{v:'pah',l:'多环芳烃'},{v:'heavy_metal',l:'有毒重金属及其化合物'}], extras: [{v:'eq_a_other',l:'其他',ph:'请填写其他污染物'}] }], features: [{v:'flue_fluct',l:'烟气波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'temp_fluct',l:'温度波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'ph_adapt',l:'pH适应[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_salt',l:'高盐环境[范围：___至___]',t:'i',ph:'请填写范围'},{v:'altitude',l:'耐高海拔',t:'i',ph:'请填写'},{v:'pressure',l:'耐高压',t:'i',ph:'请填写'},{v:'compact',l:'占地集约化',t:'s'},{v:'unmanned',l:'无人值守',t:'s'},{v:'high_rec',l:'高回收率（循环率）',t:'s'},{v:'byproduct',l:'副产品价值',t:'s'},{v:'low_poll',l:'低二次污染',t:'s'},{v:'low_mat',l:'低材料消耗',t:'s'},{v:'low_op',l:'低单位处理能力运行成本',t:'s'},{v:'low_build',l:'低单位处理能力建设投资',t:'s'},{v:'low_energy',l:'低能耗',t:'s'},{v:'low_carbon',l:'低碳排放',t:'s'},{v:'neg_carbon',l:'负碳技术',t:'s'},{v:'eq_a_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            solid: { name: '固废处理与综合利用', pollutantGroups: [{ id: 'eq_s_method', label: '处理方式', items: [{v:'pretreat',l:'预处理'},{v:'sorting',l:'分选提纯'},{v:'dewater',l:'浓缩与脱水'},{v:'aerobic',l:'好氧生物处理'},{v:'anaerobic',l:'厌氧发酵'},{v:'incinerate',l:'焚烧处理'},{v:'pyrolysis',l:'热解处理'},{v:'chemical',l:'药剂处理'},{v:'resource',l:'资源化利用'},{v:'co_dispose',l:'协同处置'},{v:'advanced',l:'深度处理'},{v:'landfill',l:'填埋处置'}], extras: [{v:'eq_s_other',l:'其他',ph:'请填写其他处理方式'}] }], features: [{v:'dry',l:'干式环境',t:'s'},{v:'wet',l:'湿式环境',t:'s'},{v:'high_temp',l:'高温',t:'s'},{v:'low_temp',l:'常温/低温',t:'s'},{v:'high_press',l:'高压环境',t:'s'},{v:'atm',l:'特定气氛',t:'s'},{v:'liquid',l:'液态/熔融态',t:'s'},{v:'solid_state',l:'固态',t:'s'},{v:'eq_s_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            water_eco: { name: '水生态修复', pollutantGroups: [{ id: 'eq_we_conv', label: '常规污染物', items: [{v:'codcr',l:'CODCr'},{v:'bod5',l:'BOD5'},{v:'ss',l:'SS'},{v:'nh3n',l:'NH3-N'},{v:'tn',l:'TN'},{v:'tp',l:'TP'},{v:'toc',l:'TOC'},{v:'fe',l:'总铁'},{v:'mn',l:'总锰'},{v:'hardness',l:'总硬度'},{v:'alkalinity',l:'碱度'},{v:'conductivity',l:'电导率'},{v:'tds',l:'总溶固'},{v:'oil',l:'石油类'},{v:'color',l:'色度'},{v:'sulfide',l:'硫化物'},{v:'pm25',l:'PM2.5'},{v:'pm10',l:'PM10'},{v:'so2',l:'SO2'},{v:'no2',l:'NO2'},{v:'o3',l:'臭氧'}] },{ id: 'eq_we_heavy', label: '重金属污染物', items: [{v:'cr_eco',l:'Cr'},{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}] },{ id: 'eq_we_spec', label: '特殊污染物', items: [{v:'cyanide',l:'总氰化物'},{v:'benzene',l:'苯'},{v:'phenol',l:'挥发酚'},{v:'pah',l:'多环芳烃'},{v:'bap',l:'苯并芘'},{v:'new_poll',l:'新污染物'}], extras: [{v:'eq_we_other',l:'其他',ph:'请填写其他污染物'}] }], features: [] },
            soil: { name: '土壤修复', pollutantGroups: [{ id: 'eq_soil_inorg', label: '无机类污染物', items: [{v:'phr',l:'pHr'},{v:'cyanide',l:'氰化物'},{v:'fluoride',l:'氟化物'}], extras: [{v:'eq_soil_inorg_o',l:'其他',ph:'请填写其他无机类污染物'}] },{ id: 'eq_soil_heavy', label: '重金属污染物', items: [{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}], extras: [{v:'eq_soil_heavy_o',l:'其他',ph:'请填写其他重金属污染物'}] },{ id: 'eq_soil_voc', label: '挥发性有机污染物', items: [{v:'chlorinated',l:'氯代烃'},{v:'benzene_s',l:'苯系数'}], extras: [{v:'eq_soil_voc_o',l:'其他',ph:'请填写其他挥发性有机污染物'}] },{ id: 'eq_soil_new', label: '新污染物', items: [], extras: [{v:'eq_soil_new_p',l:'若有，请填写',ph:'请填写新污染物'}] },{ id: 'eq_soil_other', label: '其他', items: [], extras: [{v:'eq_soil_o',l:'请填写',ph:'请填写其他污染物'}] }], features: [{v:'operating',l:'在产企业',t:'s'},{v:'retired',l:'停产退役场地',t:'s'},{v:'redevelop',l:'搬迁再开发场地',t:'s'},{v:'soil_only',l:'土壤',t:'s'},{v:'groundwater',l:'地下水',t:'s'},{v:'soil_water',l:'水土协同修复',t:'s'},{v:'eq_soil_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            energy: { name: '节能与碳减排', pollutantGroups: [{ id: 'eq_en_types', label: '处理类型', items: [{v:'waste_heat',l:'余热余能利用'},{v:'combustion',l:'高效燃烧等'},{v:'thermal',l:'热工系统优化'}], extras: [{v:'eq_en_other',l:'其他',ph:'请填写其他类型'}] }], features: [{v:'dry_flue',l:'干烟气',t:'s'},{v:'wet_flue',l:'湿烟气',t:'s'},{v:'high_temp',l:'高温',t:'s'},{v:'low_temp',l:'低温',t:'s'},{v:'pos_press',l:'正压',t:'s'},{v:'neg_press',l:'负压',t:'s'},{v:'high_dust',l:'高粉尘',t:'s'},{v:'acid_gas',l:'酸性气体',t:'s'},{v:'alkali_gas',l:'碱性气体',t:'s'},{v:'eq_en_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] }
        };
        const equipmentMonitoringConfig = {
            water: { name: '水处理', type: 'grouped', groups: [
                { id: 'mon_w_phys', label: '综合指标-理化指标', items: [{v:'water_temp',l:'水温'},{v:'color',l:'色度'},{v:'odor',l:'臭'},{v:'turbidity',l:'浊度'},{v:'transparency',l:'透明度'},{v:'ph',l:'pH'},{v:'residue',l:'残渣'},{v:'mineralization',l:'矿化度'},{v:'conductivity',l:'电导率'},{v:'redox',l:'氧化还原电位'},{v:'acidity',l:'酸度'},{v:'alkalinity',l:'碱度'},{v:'co2',l:'二氧化碳'}], extras:[{v:'mon_w_phys_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_anion', label: '综合指标-无机阴离子', items: [{v:'sulfide',l:'硫化物'},{v:'cyanide',l:'氰化物'},{v:'sulfate',l:'硫酸盐'},{v:'boron',l:'硼'},{v:'chlorine_free',l:'游离氯和总氯'},{v:'chloride',l:'氯化物'},{v:'fluoride',l:'氟化物'},{v:'iodide',l:'碘化物'}] },
                { id: 'mon_w_nutrient', label: '综合指标-营养盐及有机污染综合指标', items: [{v:'do',l:'溶解氧'},{v:'cod',l:'化学需氧量'},{v:'codmn',l:'高锰酸盐指数'},{v:'bod',l:'生化需氧量'},{v:'toc',l:'总有机碳'},{v:'p_element',l:'元素磷'},{v:'phosphorus',l:'磷'},{v:'kjeldahl_n',l:'凯氏氮'},{v:'tn',l:'总氮'},{v:'no3n',l:'硝酸盐氮'},{v:'no2n',l:'亚硝酸盐氮'},{v:'nh3n',l:'氨氮'}], extras:[{v:'mon_w_nutr_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_metal', label: '综合指标-金属及其化合物', items: [{v:'ag',l:'银'},{v:'al',l:'铝'},{v:'as',l:'砷'},{v:'ba',l:'钡'},{v:'be',l:'铍'},{v:'bi',l:'铋'},{v:'cd',l:'镉'},{v:'co',l:'钴'},{v:'cr',l:'铬'},{v:'cu',l:'铜'},{v:'hg',l:'汞'},{v:'fe',l:'铁'},{v:'mn',l:'锰'},{v:'ni',l:'镍'},{v:'mo',l:'钼'},{v:'pb',l:'铅'},{v:'sb',l:'锑'},{v:'se',l:'硒'},{v:'zn',l:'锌'},{v:'v',l:'钒'},{v:'in_tl',l:'铟和铊'},{v:'th',l:'钍'},{v:'u',l:'铀'},{v:'k_na',l:'钾和钠'},{v:'ca_mg',l:'钙、镁（含总硬度）'}], extras:[{v:'mon_w_metal_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_org_class', label: '有机污染物-类别测定', items: [{v:'volatile_phenol',l:'挥发酚类'},{v:'benzamine',l:'苯氨类'},{v:'aox',l:'可吸附有机卤素（AOX）'},{v:'tox',l:'总有机卤化物（TOX）'},{v:'oil',l:'石油类'},{v:'organic_matter',l:'有机质'}], extras:[{v:'mon_w_org_c_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_org_voc', label: '有机污染物-挥发性和半挥发性', items: [{v:'voc',l:'挥发性有机物'},{v:'svoc',l:'半挥发性有机物'}], extras:[{v:'mon_w_org_v_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_org_spec', label: '有机污染物-特定污染物测定', items: [{v:'benzene_org',l:'苯系有机物'},{v:'volatile_halide',l:'挥发性卤代烃'},{v:'phenol_comp',l:'酚类化合物'},{v:'chlorobenzene',l:'氯苯类化合物'},{v:'aniline',l:'苯胺类化合物'},{v:'nitrobenzene',l:'硝基苯类化合物'},{v:'formaldehyde',l:'甲醛'},{v:'organochlorine',l:'有机氯农药'},{v:'organophosphorus',l:'有机磷农药'},{v:'atrazine',l:'阿特拉津'},{v:'acrylonitrile',l:'丙烯腈和丙烯醛'},{v:'trichloroacetaldehyde',l:'三滤乙醛'},{v:'pah',l:'多环芳烃'},{v:'dioxin',l:'二噁英类'},{v:'pcb',l:'多氯联苯'},{v:'organotin',l:'有机锡化物'},{v:'anionic_det',l:'阴离子洗涤剂'}], extras:[{v:'mon_w_org_s_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_bio', label: '生物监测', items: [{v:'plankton',l:'浮游生物'},{v:'benthos',l:'底栖生物'},{v:'primary_prod',l:'初级生产力测定'},{v:'bacteria_total',l:'细菌总数'},{v:'total_coliform',l:'总大肠杆菌'},{v:'fecal_coliform',l:'粪大肠杆菌、沙门氏菌'}], extras:[{v:'mon_w_bio_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_auto', label: '水质自动监测系统', items: [{v:'auto_ph',l:'pH（氢离子浓度指数）'},{v:'auto_cond',l:'电导率'},{v:'auto_do',l:'溶解氧（DO）'},{v:'auto_turb',l:'浊度'},{v:'auto_temp',l:'温度'},{v:'auto_cod',l:'化学需氧量'},{v:'auto_codmn',l:'高锰酸盐指数'},{v:'auto_toc',l:'总有机碳'},{v:'auto_oil',l:'石油类'},{v:'auto_cn',l:'氰化物'},{v:'auto_as',l:'砷'},{v:'auto_cr6',l:'六价铬'},{v:'auto_pb',l:'铅'},{v:'auto_cd',l:'镉'},{v:'auto_nh3n',l:'氨氮'},{v:'auto_tn',l:'总氮'},{v:'auto_tp',l:'总磷'},{v:'auto_do2',l:'溶解氧'},{v:'auto_flow',l:'污水流量'}], extras:[{v:'mon_w_auto_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_w_sediment', label: '底质监测', items: [] }
            ] },
            air: { name: '大气污染治理', type: 'grouped', groups: [
                { id: 'mon_a_phys', label: '综合指标-理化指标', items: [{v:'a_temp',l:'温度'},{v:'a_pressure',l:'压力'},{v:'a_speed',l:'流速'},{v:'a_humidity',l:'湿度'},{v:'a_o2',l:'烟气含氧量'},{v:'a_blackness',l:'烟气黑度'}], extras:[{v:'mon_a_phys_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_gas', label: '综合指标-气态污染物', items: [{v:'a_so2',l:'二氧化硫（SO2）'},{v:'a_nox',l:'氮氧化物（NOX）'},{v:'a_pm',l:'颗粒物浓度'},{v:'a_co',l:'一氧化碳（CO）'},{v:'a_co2',l:'二氧化碳（CO2）'},{v:'a_o3',l:'臭氧（O3）'},{v:'a_h2s',l:'硫化氢（H2S）'},{v:'a_hf',l:'氟化氢（HF）'},{v:'a_hcl',l:'氯化氢（HCl）'},{v:'a_nh3',l:'氨（NH3）'},{v:'a_hcn',l:'氰化氢（HCN）'},{v:'a_cl2',l:'氯气（Cl2）'},{v:'a_fluoride',l:'氟化物'}], extras:[{v:'mon_a_gas_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_heavy', label: '综合指标-重金属', items: [{v:'a_hg',l:'汞（Hg）'},{v:'a_pb',l:'铅（Pb）'},{v:'a_cd',l:'镉（Cd）'},{v:'a_cr',l:'铬（Cr）'},{v:'a_as',l:'砷（As）'}], extras:[{v:'mon_a_heavy_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_org_class', label: '有机污染物-类别测定', items: [{v:'a_tvoc',l:'总挥发性有机物（TVOC）'},{v:'a_nmhc',l:'非甲烷总烃'},{v:'a_vhc',l:'挥发性卤代烃'},{v:'a_phenol',l:'酚类化合物'},{v:'a_aldehyde',l:'醛酮类化合物'},{v:'a_pah',l:'多环芳烃'},{v:'a_dioxin',l:'二噁英类'},{v:'a_pcb',l:'多氯联苯'}], extras:[{v:'mon_a_org_c_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_org_voc', label: '有机污染物-挥发性和半挥发性', items: [{v:'a_voc',l:'挥发性有机物'},{v:'a_svoc',l:'半挥发性有机物'}], extras:[{v:'mon_a_org_v_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_org_spec', label: '有机污染物-特定污染物测定', items: [{v:'a_benzene',l:'苯'},{v:'a_toluene',l:'甲苯'},{v:'a_xylene',l:'二甲苯'},{v:'a_ethylbenzene',l:'乙苯'},{v:'a_styrene',l:'苯乙烯'},{v:'a_formaldehyde',l:'甲醛'},{v:'a_acetaldehyde',l:'乙醛'},{v:'a_acrolein',l:'丙烯醛'},{v:'a_vinyl_cl',l:'氯乙烯'},{v:'a_tce',l:'三氯乙烯'},{v:'a_pce',l:'四氯乙烯'},{v:'a_chloroform',l:'三氯甲烷'},{v:'a_ccl4',l:'四氯化碳'}], extras:[{v:'mon_a_org_s_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_a_bio', label: '生物监测', items: [{v:'a_microbe',l:'大气微生物总数'},{v:'a_bacteria_aero',l:'细菌气溶胶'},{v:'a_fungi_aero',l:'真菌气溶胶'},{v:'a_pollen',l:'花粉过敏原'}], extras:[{v:'mon_a_bio_o',l:'其他',ph:'请填写'}] }
            ] },
            water_eco: { name: '水生态修复', type: 'grouped', groups: [
                { id: 'mon_eco_phys', label: '综合指标-理化指标', items: [{v:'eco_w_temp',l:'水温'},{v:'eco_color',l:'色度'},{v:'eco_odor',l:'臭'},{v:'eco_turb',l:'浊度'},{v:'eco_trans',l:'透明度'},{v:'eco_ph',l:'pH'},{v:'eco_residue',l:'残渣'},{v:'eco_mineral',l:'矿化度'},{v:'eco_cond',l:'电导率'},{v:'eco_redox',l:'氧化还原电位'},{v:'eco_acid',l:'酸度'},{v:'eco_alka',l:'碱度'},{v:'eco_co2',l:'二氧化碳'}], extras:[{v:'mon_eco_phys_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_anion', label: '综合指标-无机阴离子', items: [{v:'eco_sulfide',l:'硫化物'},{v:'eco_cyanide',l:'氰化物'},{v:'eco_sulfate',l:'硫酸盐'},{v:'eco_boron',l:'硼'},{v:'eco_cl_free',l:'游离氯和总氯'},{v:'eco_chloride',l:'氯化物'},{v:'eco_fluoride',l:'氟化物'},{v:'eco_iodide',l:'碘化物'}] },
                { id: 'mon_eco_nutrient', label: '综合指标-营养盐及有机污染综合指标', items: [{v:'eco_do',l:'溶解氧'},{v:'eco_cod',l:'化学需氧量'},{v:'eco_codmn',l:'高锰酸盐指数'},{v:'eco_bod',l:'生化需氧量'},{v:'eco_toc',l:'总有机碳'},{v:'eco_p_el',l:'元素磷'},{v:'eco_p',l:'磷'},{v:'eco_kjn',l:'凯氏氮'},{v:'eco_tn',l:'总氮'},{v:'eco_no3n',l:'硝酸盐氮'},{v:'eco_no2n',l:'亚硝酸盐氮'},{v:'eco_nh3n',l:'氨氮'}], extras:[{v:'mon_eco_nutr_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_metal', label: '综合指标-金属及其化合物', items: [{v:'eco_ag',l:'银'},{v:'eco_al',l:'铝'},{v:'eco_as',l:'砷'},{v:'eco_ba',l:'钡'},{v:'eco_be',l:'铍'},{v:'eco_bi',l:'铋'},{v:'eco_cd',l:'镉'},{v:'eco_co',l:'钴'},{v:'eco_cr',l:'铬'},{v:'eco_cu',l:'铜'},{v:'eco_hg',l:'汞'},{v:'eco_fe',l:'铁'},{v:'eco_mn',l:'锰'},{v:'eco_ni',l:'镍'},{v:'eco_mo',l:'钼'},{v:'eco_pb',l:'铅'},{v:'eco_sb',l:'锑'},{v:'eco_se',l:'硒'},{v:'eco_zn',l:'锌'},{v:'eco_v',l:'钒'},{v:'eco_in_tl',l:'铟和铊'},{v:'eco_th',l:'钍'},{v:'eco_u',l:'铀'},{v:'eco_k_na',l:'钾和钠'},{v:'eco_ca_mg',l:'钙、镁（含总硬度）'}], extras:[{v:'mon_eco_metal_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_org_class', label: '有机污染物-类别测定', items: [{v:'eco_phenol',l:'挥发酚类'},{v:'eco_benzamine',l:'苯氨类'},{v:'eco_nitrobenz',l:'硝基苯类'},{v:'eco_aox',l:'可吸附有机卤素（AOX）'},{v:'eco_tox',l:'总有机卤化物（TOX）'},{v:'eco_oil',l:'石油类'},{v:'eco_org',l:'有机质'}], extras:[{v:'mon_eco_org_c_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_org_voc', label: '有机污染物-挥发性和半挥发性', items: [{v:'eco_voc',l:'挥发性有机物'},{v:'eco_svoc',l:'半挥发性有机物'}], extras:[{v:'mon_eco_org_v_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_org_spec', label: '有机污染物-特定污染物测定', items: [{v:'eco_benzene_org',l:'苯系有机物'},{v:'eco_vhc',l:'挥发性卤代烃'},{v:'eco_phenol_c',l:'酚类化合物'},{v:'eco_clbenz',l:'氯苯类化合物'},{v:'eco_aniline',l:'苯胺类化合物'},{v:'eco_nitrobenz_c',l:'硝基苯类化合物'},{v:'eco_phthalate',l:'邻苯二甲酸类'},{v:'eco_formaldehyde',l:'甲醛'},{v:'eco_orgcl',l:'有机氯农药'},{v:'eco_orgp',l:'有机磷农药'},{v:'eco_atrazine',l:'阿特拉津'},{v:'eco_acrylo',l:'丙烯腈和丙烯醛'},{v:'eco_tcaa',l:'三滤乙醛'},{v:'eco_pah',l:'多环芳烃'},{v:'eco_dioxin',l:'二噁英类'},{v:'eco_pcb',l:'多氯联苯'},{v:'eco_orgtin',l:'有机锡化物'},{v:'eco_anionic',l:'阴离子洗涤剂'}], extras:[{v:'mon_eco_org_s_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_bio', label: '生物监测', items: [{v:'eco_plankton',l:'浮游生物'},{v:'eco_benthos',l:'底栖生物'},{v:'eco_animal',l:'动物'},{v:'eco_plant',l:'植物'},{v:'eco_primary',l:'初级生产力测定'},{v:'eco_bacteria',l:'细菌总数'},{v:'eco_coliform',l:'总大肠杆菌'},{v:'eco_fecal',l:'粪大肠杆菌、沙门氏菌'},{v:'eco_strep',l:'粪链球菌'}] },
                { id: 'mon_eco_auto', label: '水质自动监测系统', items: [{v:'eco_a_ph',l:'pH（氢离子浓度指数）'},{v:'eco_a_cond',l:'电导率'},{v:'eco_a_do',l:'溶解氧（DO）'},{v:'eco_a_turb',l:'浊度'},{v:'eco_a_temp',l:'温度'},{v:'eco_a_cod',l:'化学需氧量'},{v:'eco_a_codmn',l:'高锰酸盐指数'},{v:'eco_a_toc',l:'总有机碳'},{v:'eco_a_oil',l:'石油类'},{v:'eco_a_cn',l:'氰化物'},{v:'eco_a_as',l:'砷'},{v:'eco_a_cr6',l:'六价铬'},{v:'eco_a_pb',l:'铅'},{v:'eco_a_cd',l:'镉'},{v:'eco_a_nh3n',l:'氨氮'},{v:'eco_a_tn',l:'总氮'},{v:'eco_a_tp',l:'总磷'},{v:'eco_a_do2',l:'溶解氧'},{v:'eco_a_flow',l:'污水流量'}], extras:[{v:'mon_eco_auto_o',l:'其他',ph:'请填写'}] },
                { id: 'mon_eco_sediment', label: '底质监测', items: [{v:'eco_sed_dist',l:'低质扰动'},{v:'eco_sed_nutr',l:'营养盐释放'}] },
                { id: 'mon_eco_atm', label: '大气监测', items: [{v:'eco_atm_pm25',l:'PM2.5'},{v:'eco_atm_pm10',l:'PM₁₀'},{v:'eco_atm_so2',l:'SO₂'},{v:'eco_atm_no2',l:'NO₂'},{v:'eco_atm_co',l:'CO'},{v:'eco_atm_o3',l:'O₃'},{v:'eco_atm_vocs',l:'VOCs'},{v:'eco_atm_nh3',l:'NH₃'},{v:'eco_atm_ch4',l:'CH4'},{v:'eco_atm_co2',l:'CO2'},{v:'eco_atm_neg_ion',l:'负离子'}], extras:[{v:'mon_eco_atm_o',l:'其他',ph:'请填写'}] }
            ] },
            other: { name: '其他', type: 'textarea' }
        };
