// ========== 材料类完整配置对象 ==========
// 根据 MATERIAL_FIELDS_CONFIG.md 生成

const materialConfig = {
    // 1. 水处理
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
    
    // 2. 大气污染治理
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
    
    // 3. 固废处理与综合利用
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
    
    // 4. 生态工程
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
    
    // 5. 土壤修复
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
    
    // 6. 节能与碳减排
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
