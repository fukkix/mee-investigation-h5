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
                showStageWhen: [],
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
                        ]
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
                pollutants: {
                    types: [
                        { value: 'particulate', label: '颗粒物' },
                        { value: 'so2', label: '二氧化硫' },
                        { value: 'nox', label: '氮氧化物' },
                        { value: 'co', label: '一氧化碳' },
                        { value: 'vocs', label: '挥发性有机化合物' },
                        { value: 'dioxin', label: '二噁英' },
                        { value: 'fluoride', label: '氟化物' },
                        { value: 'heavy_metal', label: '重金属' }
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
                    {
                        value: 'dust_removal',
                        label: '除尘',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'dry_flue_gas', label: '干烟气' },
                            { value: 'wet_flue_gas', label: '湿烟气' }
                        ]
                    },
                    {
                        value: 'desulfurization',
                        label: '脱硫',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'wet', label: '湿法' },
                            { value: 'semi_dry', label: '半干法' },
                            { value: 'dry', label: '干法' }
                        ],
                        other: true
                    },
                    {
                        value: 'denitrification',
                        label: '脱硝',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'scr', label: 'SCR' },
                            { value: 'sncr', label: 'SNCR' },
                            { value: 'adsorption', label: '吸附法' },
                            { value: 'catalytic_oxidation', label: '催化氧化法' }
                        ],
                        other: true
                    },
                    {
                        value: 'vocs_removal',
                        label: '脱VOCs',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'condensation', label: '冷凝法' },
                            { value: 'adsorption', label: '吸附法' },
                            { value: 'membrane_separation', label: '膜分离法' },
                            { value: 'combustion', label: '燃烧法' },
                            { value: 'biological', label: '生物处理法' },
                            { value: 'catalytic_oxidation', label: '催化氧化法' }
                        ],
                        other: true
                    },
                    { value: 'filter_material', label: '滤料' },
                    { value: 'catalyst', label: '催化' },
                    { value: 'absorption', label: '吸收' },
                    { value: 'adsorption', label: '吸附' }
                ],
                other: true
            },
            solid: {
                name: '固废处理与综合利用',
                categories: [
                    { value: 'pretreatment', label: '预处理' },
                    { value: 'sorting', label: '分选提纯' },
                    { value: 'concentration', label: '浓缩与脱水' },
                    { value: 'aerobic', label: '好氧生物处理' },
                    { value: 'anaerobic', label: '厌氧发酵' },
                    { value: 'incineration', label: '焚烧处理' },
                    { value: 'pyrolysis', label: '热解处理' },
                    { value: 'chemical_treatment', label: '药剂处理' },
                    { value: 'resource_utilization', label: '资源化利用' },
                    { value: 'co_disposal', label: '协同处置' },
                    { value: 'advanced_treatment', label: '深度处理' },
                    { value: 'landfill', label: '填埋处置' },
                    { value: 'solidification_agent', label: '固化剂' },
                    { value: 'binder', label: '粘结剂' },
                    { value: 'stabilizer', label: '稳定剂' },
                    { value: 'grinding_aid', label: '助磨剂' }
                ],
                other: true
            },
            eco: {
                name: '生态工程',
                categories: [
                    { value: 'organic_amendment', label: '有机改良材料' },
                    { value: 'mineral', label: '矿物材料' },
                    { value: 'microbial_agent', label: '微生物菌剂' },
                    { value: 'chemical_passivation', label: '化学钝化剂' },
                    { value: 'adsorption', label: '吸附材料' },
                    { value: 'microbial_carrier', label: '微生物载体' },
                    { value: 'phytoremediation', label: '植物修复材料' },
                    { value: 'chemical_remediation', label: '化学修复材料' },
                    { value: 'plant_seeds', label: '植物种子' },
                    { value: 'eco_slope', label: '生态护坡材料' },
                    { value: 'water_retention', label: '保水材料' },
                    { value: 'soil_inoculation', label: '土壤接种菌剂' },
                    { value: 'catalyst', label: '催化材料' },
                    { value: 'carbon_fixation', label: '固碳材料' },
                    { value: 'plant_carrier', label: '植物载体' },
                    { value: 'nanomaterial', label: '纳米材料' },
                    { value: 'synthetic_biology', label: '合成生物学材料' },
                    { value: 'biodegradable', label: '生物降解材料' },
                    { value: 'flocculation', label: '絮凝/混凝材料' }
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
                    {
                        value: 'dust_removal',
                        label: '除尘',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'dry_flue_gas', label: '干烟气' },
                            { value: 'wet_flue_gas', label: '湿烟气' }
                        ]
                    },
                    {
                        value: 'desulfurization',
                        label: '脱硫',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'wet', label: '湿法' },
                            { value: 'semi_dry', label: '半干法' },
                            { value: 'dry', label: '干法' }
                        ],
                        other: true
                    },
                    {
                        value: 'denitrification',
                        label: '脱硝',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'scr', label: 'SCR' },
                            { value: 'sncr', label: 'SNCR' },
                            { value: 'adsorption', label: '吸附法' },
                            { value: 'catalytic_oxidation', label: '催化氧化法' }
                        ],
                        other: true
                    },
                    {
                        value: 'vocs_removal',
                        label: '脱VOCs',
                        hasSubOptions: true,
                        subOptions: [
                            { value: 'condensation', label: '冷凝法' },
                            { value: 'adsorption', label: '吸附法' },
                            { value: 'membrane_separation', label: '膜分离法' },
                            { value: 'combustion', label: '燃烧法' },
                            { value: 'biological', label: '生物处理法' },
                            { value: 'catalytic_oxidation', label: '催化氧化法' }
                        ],
                        other: true
                    },
                    { value: 'filter_material', label: '滤料' },
                    { value: 'catalyst', label: '催化' },
                    { value: 'absorption', label: '吸收' },
                    { value: 'adsorption', label: '吸附' }
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
            water: { name: '水处理', pollutantGroups: [{ id: 'eq_w_conv', label: '常规污染物', items: [{v:'codcr',l:'CODCr'},{v:'bod5',l:'BOD5'},{v:'ss',l:'SS'},{v:'nh3n',l:'NH3-N'},{v:'tn',l:'TN'},{v:'tp',l:'TP'},{v:'toc',l:'TOC'},{v:'fe',l:'总铁'},{v:'mn',l:'总锰'},{v:'hardness',l:'总硬度'},{v:'alkalinity',l:'碱度'},{v:'conductivity',l:'电导率'},{v:'tds',l:'总溶固'},{v:'oil',l:'石油类'},{v:'color',l:'色度'},{v:'sulfide',l:'硫化物'}] },{ id: 'eq_w_heavy', label: '重金属污染物', items: [{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}] },{ id: 'eq_w_spec', label: '特殊污染物', items: [{v:'cyanide',l:'总氰化物'},{v:'benzene',l:'苯'},{v:'phenol',l:'挥发酚'},{v:'pah',l:'多环芳烃'}], extras: [{v:'eq_w_new',l:'新污染物',ph:'请填写新污染物'},{v:'eq_w_other',l:'其他',ph:'请填写其他污染物'}] }], features: [{v:'compact',l:'占地集约',t:'s'},{v:'unmanned',l:'无人值守',t:'s'},{v:'iot',l:'物联网',t:'s'},{v:'self_diag',l:'自诊断',t:'s'},{v:'low_fail',l:'低故障率',t:'s'},{v:'low_cost',l:'低运行成本[较同类设备降低：___%至___%]',t:'i',ph:'请填写范围'},{v:'water_fluct',l:'水质波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'temp_fluct',l:'水温波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'acid',l:'耐酸[范围：___至___]',t:'i',ph:'请填写范围'},{v:'alkali',l:'耐碱[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_salt',l:'高盐[范围：___至___]',t:'i',ph:'请填写范围'},{v:'altitude',l:'高海拔[范围：___至___]',t:'i',ph:'请填写范围'},{v:'pressure',l:'高压[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_o2',l:'低溶解氧[范围：___至___]',t:'i',ph:'请填写范围'},{v:'anaerobic',l:'厌氧环境[范围：___至___]',t:'i',ph:'请填写范围'},{v:'low_cn',l:'低碳氮比[范围：___至___]',t:'i',ph:'请填写范围'},{v:'eq_w_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            air: { name: '大气污染治理', pollutantGroups: [{ id: 'eq_a_conv', label: '常规污染物', items: [{v:'particulate',l:'颗粒物'},{v:'so2',l:'二氧化硫'},{v:'nox',l:'氮氧化物'},{v:'co',l:'一氧化碳'},{v:'o3',l:'臭氧'},{v:'pb_comp',l:'铅及其化合物'}] },{ id: 'eq_a_unconv', label: '非常规污染物', items: [{v:'vocs',l:'挥发性有机化合物'},{v:'dioxin',l:'二噁英类'},{v:'pah',l:'多环芳烃'},{v:'heavy_metal',l:'有毒重金属及其化合物'}], extras: [{v:'eq_a_other',l:'其他',ph:'请填写其他污染物'}] }], features: [{v:'flue_fluct',l:'烟气波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'temp_fluct',l:'温度波动幅度宽[范围：___至___]',t:'i',ph:'请填写范围'},{v:'ph_adapt',l:'pH适应[范围：___至___]',t:'i',ph:'请填写范围'},{v:'high_salt',l:'高盐环境[范围：___至___]',t:'i',ph:'请填写范围'},{v:'altitude',l:'耐高海拔',t:'i',ph:'请填写'},{v:'pressure',l:'耐高压',t:'i',ph:'请填写'},{v:'compact',l:'占地集约化',t:'s'},{v:'unmanned',l:'无人值守',t:'s'},{v:'high_rec',l:'高回收率（循环率）',t:'s'},{v:'byproduct',l:'副产品价值',t:'s'},{v:'low_poll',l:'低二次污染',t:'s'},{v:'low_mat',l:'低材料消耗',t:'s'},{v:'low_op',l:'低单位处理能力运行成本',t:'s'},{v:'low_build',l:'低单位处理能力建设投资',t:'s'},{v:'low_energy',l:'低能耗',t:'s'},{v:'low_carbon',l:'低碳排放',t:'s'},{v:'neg_carbon',l:'负碳技术',t:'s'},{v:'eq_a_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            solid: { name: '固废处理与综合利用', pollutantGroups: [{ id: 'eq_s_method', label: '处理方式', items: [{v:'pretreat',l:'预处理'},{v:'sorting',l:'分选提纯'},{v:'dewater',l:'浓缩与脱水'},{v:'aerobic',l:'好氧生物处理'},{v:'anaerobic',l:'厌氧发酵'},{v:'incinerate',l:'焚烧处理'},{v:'pyrolysis',l:'热解处理'},{v:'chemical',l:'药剂处理'},{v:'resource',l:'资源化利用'},{v:'co_dispose',l:'协同处置'},{v:'advanced',l:'深度处理'},{v:'landfill',l:'填埋处置'}], extras: [{v:'eq_s_other',l:'其他',ph:'请填写其他处理方式'}] }], features: [{v:'dry',l:'干式环境',t:'s'},{v:'wet',l:'湿式环境',t:'s'},{v:'high_temp',l:'高温',t:'s'},{v:'low_temp',l:'常温/低温',t:'s'},{v:'high_press',l:'高压环境',t:'s'},{v:'atm',l:'特定气氛',t:'s'},{v:'liquid',l:'液态/熔融态',t:'s'},{v:'solid_state',l:'固态',t:'s'},{v:'eq_s_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            water_eco: { name: '水生态修复', pollutantGroups: [{ id: 'eq_we_conv', label: '常规污染物', items: [{v:'codcr',l:'CODCr'},{v:'bod5',l:'BOD5'},{v:'ss',l:'SS'},{v:'nh3n',l:'NH3-N'},{v:'tn',l:'TN'},{v:'tp',l:'TP'},{v:'toc',l:'TOC'},{v:'fe',l:'总铁'},{v:'mn',l:'总锰'},{v:'hardness',l:'总硬度'},{v:'alkalinity',l:'碱度'},{v:'conductivity',l:'电导率'},{v:'tds',l:'总溶固'},{v:'oil',l:'石油类'},{v:'color',l:'色度'},{v:'sulfide',l:'硫化物'},{v:'pm25',l:'PM2.5'},{v:'pm10',l:'PM10'},{v:'so2',l:'SO2'},{v:'no2',l:'NO2'},{v:'o3',l:'臭氧'}] },{ id: 'eq_we_heavy', label: '重金属污染物', items: [{v:'cr_eco',l:'Cr'},{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}] },{ id: 'eq_we_spec', label: '特殊污染物', items: [{v:'cyanide',l:'总氰化物'},{v:'benzene',l:'苯'},{v:'phenol',l:'挥发酚'},{v:'pah',l:'多环芳烃'},{v:'bap',l:'苯并芘'},{v:'new_poll',l:'新污染物'}], extras: [{v:'eq_we_other',l:'其他',ph:'请填写其他污染物'}] }], features: [] },
            soil: { name: '土壤修复', pollutantGroups: [{ id: 'eq_soil_inorg', label: '无机类污染物', items: [{v:'phr',l:'pHr'},{v:'cyanide',l:'氰化物'},{v:'fluoride',l:'氟化物'}], extras: [{v:'eq_soil_inorg_o',l:'其他',ph:'请填写其他无机类污染物'}] },{ id: 'eq_soil_heavy', label: '重金属污染物', items: [{v:'cu',l:'总铜'},{v:'zn',l:'总锌'},{v:'as',l:'总砷'},{v:'cr6',l:'六价铬'},{v:'cr',l:'总铬'},{v:'pb',l:'总铅'},{v:'ni',l:'总镍'},{v:'hg',l:'总汞'},{v:'cd',l:'总镉'},{v:'be',l:'总铍'},{v:'ag',l:'总银'},{v:'se',l:'总硒'}], extras: [{v:'eq_soil_heavy_o',l:'其他',ph:'请填写其他重金属污染物'}] },{ id: 'eq_soil_voc', label: '挥发性有机污染物', items: [{v:'chlorinated',l:'氯代烃'},{v:'benzene_s',l:'苯系数'}], extras: [{v:'eq_soil_voc_o',l:'其他',ph:'请填写其他挥发性有机污染物'}] },{ id: 'eq_soil_new', label: '新污染物', items: [], extras: [{v:'eq_soil_new_p',l:'若有，请填写',ph:'请填写新污染物'}] },{ id: 'eq_soil_other', label: '其他', items: [], extras: [{v:'eq_soil_o',l:'请填写',ph:'请填写其他污染物'}] }], features: [{v:'operating',l:'在产企业',t:'s'},{v:'retired',l:'停产退役场地',t:'s'},{v:'redevelop',l:'搬迁再开发场地',t:'s'},{v:'soil_only',l:'土壤',t:'s'},{v:'groundwater',l:'地下水',t:'s'},{v:'soil_water',l:'水土协同修复',t:'s'},{v:'eq_soil_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] },
            energy: { name: '节能与碳减排', pollutantGroups: [{ id: 'eq_en_types', label: '处理类型', items: [{v:'waste_heat',l:'余热余能利用'},{v:'combustion',l:'高效燃烧等'},{v:'thermal',l:'热工系统优化'}], extras: [{v:'eq_en_other',l:'其他',ph:'请填写其他类型'}] }], features: [{v:'dry_flue',l:'干烟气',t:'s'},{v:'wet_flue',l:'湿烟气',t:'s'},{v:'high_temp',l:'高温',t:'s'},{v:'low_temp',l:'低温',t:'s'},{v:'pos_press',l:'正压',t:'s'},{v:'neg_press',l:'负压',t:'s'},{v:'high_dust',l:'高粉尘',t:'s'},{v:'acid_gas',l:'酸性气体',t:'s'},{v:'alkali_gas',l:'碱性气体',t:'s'},{v:'eq_en_feat_o',l:'其他',t:'i',ph:'请填写其他特点'}] }
        };
        const equipmentMonitoringConfig = {
            water: { name: '水处理', type: 'checkbox', items: [{v:'cod',l:'COD'},{v:'ammonia',l:'氨氮'},{v:'tp',l:'总磷'},{v:'ss',l:'悬浮物'},{v:'ph',l:'pH'},{v:'do',l:'溶解氧'},{v:'chlorine',l:'余氯'},{v:'heavy_ion',l:'重金属离子'}] },
            air: { name: '大气污染治理', type: 'inputs', corePerf: [{n:'mon_air_mtype',l:'测量类型',ph:'请填写测量类型'},{n:'mon_air_speed',l:'过滤风速 (m/min)',ph:'请填写'},{n:'mon_air_resist',l:'设备阻力 (Pa)',ph:'请填写'},{n:'mon_air_range',l:'量程范围',ph:'请填写'},{n:'mon_air_acc',l:'精度',ph:'请填写'}], workCond: [{n:'mon_air_temp',l:'温度范围',ph:'请填写'},{n:'mon_air_dust',l:'粉尘特性',ph:'请填写'},{n:'mon_air_leak',l:'漏风率',ph:'请填写'},{n:'mon_air_vol_min',l:'处理风量最小值 (m³/h)',ph:'请填写'},{n:'mon_air_vol_max',l:'处理风量最大值 (m³/h)',ph:'请填写'}] },
            water_eco: { name: '水生态修复', type: 'grouped', groups: [{ id: 'mon_iot', label: '生态环境物联网(IoT)传感器', items: [{v:'air_station',l:'空气质量微型站（PM2.5, PM10, O₃, NO₂等）'},{v:'soil_sensor',l:'土壤墒情与pH传感器'},{v:'water_monitor',l:'水质在线监测仪（pH, DO, 氨氮、浊度）'}] },{ id: 'mon_remote', label: '遥感监测设备', items: [{v:'uav_camera',l:'无人机搭载多光谱/高光谱相机'},{v:'veg_stress',l:'监测植被胁迫（反映臭氧等污染损伤）'},{v:'leaf_index',l:'叶面积指数变化'},{v:'chlorophyll',l:'水体叶绿素a（反映富营养化）'}] },{ id: 'mon_irrigation', label: '智能灌溉与施肥控制系统', items: [{v:'precision_ctrl',l:'基于传感器数据和模型，精确控制水肥，减少农业氨挥发'}] }] },
            other: { name: '其他', type: 'textarea' }
        };
