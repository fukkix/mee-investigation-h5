// ========== 工艺类完整配置对象 ==========
// 根据 PROCESS_FIELDS_CONFIG.md 生成

const processConfig = {
    // 1. 水处理
    water: {
        name: '水处理',
        hasGranularity: true,
        granularityOptions: [
            { value: 'comprehensive', label: '综合型工艺系统流程' },
            { value: 'functional', label: '特定功能型工艺流程' },
            { value: 'unit', label: '处理单元型工艺' },
            { value: 'other', label: '其他' }
        ],
        showStageWhen: ['functional', 'unit', 'other'], // 后三项显示工艺环节
        
        // 工艺特点（水处理专有）
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
        
        // 污染物治理对象
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
    
    // 2. 大气污染治理
    air: {
        name: '大气污染治理',
        hasGranularity: true,
        granularityOptions: [
            { value: 'comprehensive', label: '综合型工艺系统流程' },
            { value: 'functional', label: '特定功能型工艺流程' },
            { value: 'unit', label: '处理单元型工艺' },
            { value: 'other', label: '其他' }
        ],
        showStageWhen: [], // 大气不显示工艺环节
        
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
    
    // 3. 固废处理与综合利用
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
    
    // 4. 生态修复
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
            // 污染治理型
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
            // 生态恢复/重建型
            restoration: [
                { value: 'vegetation', label: '植被覆盖率提升', hasInput: true, placeholder: '请填写' },
                { value: 'biodiversity_animal', label: '生物多样性提升 - 动物' },
                { value: 'biodiversity_plant', label: '生物多样性提升 - 植物' },
                { value: 'biodiversity_microbe', label: '生物多样性提升 - 微生物' },
                { value: 'biodiversity_enzyme', label: '生物多样性提升 - 土壤酶活性' },
                { value: 'stability', label: '生态系统稳定性提升', hasInput: true, placeholder: '生态系统内稳性' }
            ],
            // 资源保护与可持续利用型
            resourceProtection: [
                { value: 'soil_water', label: '水土保持' },
                { value: 'resource_saving', label: '资源节约' },
                { value: 'water_source', label: '水源地保障' },
                { value: 'waste_cycle', label: '废弃物循环' },
                { value: 'eco_balance', label: '生态平衡' }
            ],
            // 灾害防治与风险减缓型
            disasterPrevention: [
                { value: 'wave_reduction', label: '削浪护岸' },
                { value: 'windbreak', label: '防风固沙' },
                { value: 'landslide', label: '滑坡治理' }
            ],
            // 景观美化与游憩功能提升型
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
    
    // 5. 土壤修复
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
    
    // 6. 节能与碳减排
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
