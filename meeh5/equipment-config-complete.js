// ========== 设备类完整配置对象 ==========
// 根据 EQUIPMENT_FIELDS_CONFIG.md 生成

const equipmentConfig = {
    // 治理设备
    treatment: {
        name: '治理设备',
        fields: {
            // 1. 水处理
            water: {
                name: '水处理',
                pollutants: {
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
                        { value: 'pah', label: '多环芳烃' }
                    ],
                    newPollutant: true,
                    other: true
                },
                features: [
                    { value: 'compact', label: '占地集约', type: 'simple' },
                    { value: 'unmanned', label: '无人值守', type: 'simple' },
                    { value: 'iot', label: '物联网', type: 'simple' },
                    { value: 'self_diagnosis', label: '自诊断', type: 'simple' },
                    { value: 'low_failure', label: '低故障率', type: 'simple' },
                    { value: 'low_operation_cost', label: '低运行成本[较同类设备降低：___%至___%]', type: 'range' },
                    { value: 'water_fluctuation', label: '水质波动幅度宽[范围：___至___]', type: 'range' },
                    { value: 'temp_fluctuation', label: '水温波动幅度宽[范围：___至___]', type: 'range' },
                    { value: 'acid_resistant', label: '耐酸[范围：___至___]', type: 'range' },
                    { value: 'alkali_resistant', label: '耐碱[范围：___至___]', type: 'range' },
                    { value: 'high_salt', label: '高盐[范围：___至___]', type: 'range' },
                    { value: 'high_altitude', label: '高海拔[范围：___至___]', type: 'range' },
                    { value: 'high_pressure', label: '高压[范围：___至___]', type: 'range' },
                    { value: 'low_oxygen', label: '低溶解氧[范围：___至___]', type: 'range' },
                    { value: 'anaerobic', label: '厌氧环境[范围：___至___]', type: 'range' },
                    { value: 'low_cn_ratio', label: '低碳氮比[范围：___至___]', type: 'range' }
                ],
                other: true
            },
            
            // 2. 大气污染治理
            air: {
                name: '大气污染治理',
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
                },
                features: [
                    { value: 'flue_gas_fluctuation', label: '烟气波动幅度宽[范围：___至___]', type: 'range' },
                    { value: 'temp_fluctuation', label: '温度波动幅度宽[范围：___至___]', type: 'range' },
                    { value: 'ph_adaptation', label: 'pH适应[范围：___至___]', type: 'range' },
                    { value: 'high_salt', label: '高盐环境[范围：___至___]', type: 'range' },
                    { value: 'high_altitude', label: '耐高海拔', type: 'input' },
                    { value: 'high_pressure', label: '耐高压', type: 'input' },
                    { value: 'compact', label: '占地集约化', type: 'simple' },
                    { value: 'unmanned', label: '无人值守', type: 'simple' },
                    { value: 'high_recovery', label: '高回收率（循环率）', type: 'simple' },
                    { value: 'byproduct_value', label: '副产品价值', type: 'simple' },
                    { value: 'low_pollution', label: '低二次污染', type: 'simple' },
                    { value: 'low_material', label: '低材料消耗', type: 'simple' },
                    { value: 'low_operation_cost', label: '低单位处理能力运行成本', type: 'simple' },
                    { value: 'low_construction_cost', label: '低单位处理能力建设投资', type: 'simple' },
                    { value: 'low_energy', label: '低能耗', type: 'simple' },
                    { value: 'low_carbon', label: '低碳排放', type: 'simple' },
                    { value: 'negative_carbon', label: '负碳技术', type: 'simple' }
                ],
                other: true
            },
            
            // 3. 固废处理与综合利用
            solid: {
                name: '固废处理与综合利用',
                pollutants: {
                    methods: [
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
                        { value: 'landfill', label: '填埋处置' }
                    ],
                    other: true
                },
                features: [
                    { value: 'dry_environment', label: '干式环境', type: 'simple' },
                    { value: 'wet_environment', label: '湿式环境', type: 'simple' },
                    { value: 'high_temp', label: '高温', type: 'simple' },
                    { value: 'normal_low_temp', label: '常温/低温', type: 'simple' },
                    { value: 'high_pressure', label: '高压环境', type: 'simple' },
                    { value: 'specific_atmosphere', label: '特定气氛', type: 'simple' },
                    { value: 'liquid_molten', label: '液态/熔融态', type: 'simple' },
                    { value: 'solid', label: '固态', type: 'simple' }
                ],
                other: true
            },
            
            // 4. 水生态修复
            water_eco: {
                name: '水生态修复',
                pollutants: {
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
                        { value: 'cr', label: 'Cr' },
                        { value: 'cu', label: '总铜' },
                        { value: 'zn', label: '总锌' },
                        { value: 'as', label: '总砷' },
                        { value: 'cr6', label: '六价铬' },
                        { value: 'cr_total', label: '总铬' },
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
                        { value: 'bap', label: '苯并芘' },
                        { value: 'new_pollutant', label: '新污染物' }
                    ],
                    other: true
                }
            },
            
            // 5. 土壤修复
            soil: {
                name: '土壤修复',
                pollutants: {
                    inorganic: [
                        { value: 'phr', label: 'pHr' },
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
                    newPollutant: true,
                    other: true
                },
                features: [
                    { value: 'operating_enterprise', label: '在产企业', type: 'simple' },
                    { value: 'retired_site', label: '停产退役场地', type: 'simple' },
                    { value: 'redevelopment_site', label: '搬迁再开发场地', type: 'simple' },
                    { value: 'soil', label: '土壤', type: 'simple' },
                    { value: 'groundwater', label: '地下水', type: 'simple' },
                    { value: 'soil_water_synergy', label: '水土协同修复', type: 'simple' }
                ],
                other: true
            },
            
            // 6. 节能与碳减排
            energy: {
                name: '节能与碳减排',
                pollutants: {
                    types: [
                        { value: 'waste_heat', label: '余热余能利用' },
                        { value: 'efficient_combustion', label: '高效燃烧等' },
                        { value: 'thermal_optimization', label: '热工系统优化' }
                    ],
                    other: true
                },
                features: [
                    { value: 'dry_flue_gas', label: '干烟气', type: 'simple' },
                    { value: 'wet_flue_gas', label: '湿烟气', type: 'simple' },
                    { value: 'high_temp', label: '高温', type: 'simple' },
                    { value: 'low_temp', label: '低温', type: 'simple' },
                    { value: 'positive_pressure', label: '正压', type: 'simple' },
                    { value: 'negative_pressure', label: '负压', type: 'simple' },
                    { value: 'high_dust', label: '高粉尘', type: 'simple' },
                    { value: 'acidic_gas', label: '酸性气体', type: 'simple' },
                    { value: 'alkaline_gas', label: '碱性气体', type: 'simple' }
                ],
                other: true
            }
        }
    },
    
    // 检测设备
    monitoring: {
        name: '检（监）测设备',
        fields: {
            // 1. 水处理
            water: {
                name: '水处理',
                detectionContent: [
                    { value: 'cod', label: 'COD' },
                    { value: 'ammonia_nitrogen', label: '氨氮' },
                    { value: 'total_phosphorus', label: '总磷' },
                    { value: 'suspended_solids', label: '悬浮物' },
                    { value: 'ph', label: 'pH' },
                    { value: 'dissolved_oxygen', label: '溶解氧' },
                    { value: 'residual_chlorine', label: '余氯' },
                    { value: 'heavy_metal_ions', label: '重金属离子' }
                ]
            },
            
            // 2. 大气污染治理
            air: {
                name: '大气污染治理',
                corePerformance: [
                    { value: 'measurement_type', label: '测量类型', type: 'input' },
                    { value: 'filter_wind_speed', label: '过滤风速', type: 'input', unit: 'm/min' },
                    { value: 'equipment_resistance', label: '设备阻力', type: 'input', unit: 'Pa' },
                    { value: 'range', label: '量程范围', type: 'input' },
                    { value: 'accuracy', label: '精度', type: 'input' }
                ],
                workingConditions: [
                    { value: 'temp_range', label: '温度范围', type: 'input' },
                    { value: 'dust_characteristics', label: '粉尘特性', type: 'input' },
                    { value: 'air_leakage_rate', label: '漏风率', type: 'input' },
                    { value: 'air_volume_fluctuation', label: '处理风量（工况波动', type: 'range', unit: 'm³/h' }
                ]
            },
            
            // 3. 水生态修复
            water_eco: {
                name: '水生态修复',
                detectionTypes: [
                    {
                        value: 'iot_sensors',
                        label: '生态环境物联网(IoT)传感器',
                        subTypes: [
                            { value: 'air_quality_station', label: '空气质量微型站（PM2.5, PM10, O₃, NO₂等）' },
                            { value: 'soil_moisture_ph', label: '土壤墒情与pH传感器' },
                            { value: 'water_quality_monitor', label: '水质在线监测仪（pH, DO, 氨氮、浊度）' }
                        ]
                    },
                    {
                        value: 'remote_sensing',
                        label: '遥感监测设备',
                        subTypes: [
                            { value: 'uav_multispectral', label: '无人机搭载多光谱/高光谱相机' },
                            { value: 'vegetation_stress', label: '监测植被胁迫（反映臭氧等污染损伤）' },
                            { value: 'leaf_area_index', label: '叶面积指数变化' },
                            { value: 'chlorophyll_a', label: '水体叶绿素a（反映富营养化）' }
                        ]
                    },
                    {
                        value: 'smart_irrigation',
                        label: '智能灌溉与施肥控制系统',
                        subTypes: [
                            { value: 'precision_control', label: '基于传感器数据和模型，精确控制水肥，减少农业氨挥发（大气中NH₃是PM2.5和氮沉降的重要前体物）' }
                        ]
                    }
                ]
            },
            
            // 4. 其他
            other: {
                name: '其他',
                detectionContent: {
                    type: 'textarea',
                    placeholder: '请根据情况填写检测内容说明'
                }
            }
        }
    }
};
