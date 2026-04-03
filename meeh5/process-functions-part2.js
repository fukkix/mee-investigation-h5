// ========== 继续添加到 survey.html 的 init() 之前 ==========

// 生成工艺环节部分
function generateStageSection() {
    return `
        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4" id="processStageSection" style="display:none;">
            <label class="block text-on-surface font-semibold text-base mb-3">
                工艺环节（选填）
            </label>
            <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
            <div class="space-y-3">
                <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="process_stage" value="pretreatment"/>
                    <span class="ml-3 text-on-surface-variant font-medium">预处理（一级）</span>
                </label>
                <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="process_stage" value="main"/>
                    <span class="ml-3 text-on-surface-variant font-medium">主处理（二级）</span>
                </label>
                <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="process_stage" value="advanced"/>
                    <span class="ml-3 text-on-surface-variant font-medium">深度处理（三级）</span>
                </label>
                <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="process_stage" value="post"/>
                    <span class="ml-3 text-on-surface-variant font-medium">后处理</span>
                </label>
            </div>
        </div>
    `;
}

// 生成工艺特点部分（水处理专用，带二级菜单）
function generateFeaturesSection(features) {
    let html = `
        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mt-4">
            <label class="block text-on-surface font-semibold text-base mb-3">
                工艺特点 <span class="text-error">*</span>
            </label>
            <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
            <div class="space-y-2">
    `;
    
    // 带二级菜单的选项
    if (features.withInput) {
        features.withInput.forEach(feature => {
            const inputId = `feature_input_${feature.value}`;
            html += `
                <div>
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 feature-with-input" 
                            type="checkbox" name="process_feature" value="${feature.value}" data-input-id="${inputId}"/>
                        <span class="ml-2 text-on-surface-variant text-sm">${feature.label}</span>
                    </label>
                    <div id="${inputId}" class="pl-6 mt-2" style="display:none;">
                        <input type="text" name="process_feature_${feature.value}_detail" 
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="${feature.placeholder}"/>
                    </div>
                </div>
            `;
        });
    }
    
    // 简单勾选的选项
    if (features.simple) {
        features.simple.forEach(feature => {
            html += `
                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="process_feature" value="${feature.value}"/>
                    <span class="ml-2 text-on-surface-variant text-sm">${feature.label}</span>
                </label>
            `;
        });
    }
    
    // 其他选项
    if (features.other) {
        html += `
            <div>
                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 feature-with-input" 
                        type="checkbox" name="process_feature" value="other" data-input-id="feature_input_other"/>
                    <span class="ml-2 text-on-surface-variant text-sm">其他</span>
                </label>
                <div id="feature_input_other" class="pl-6 mt-2" style="display:none;">
                    <input type="text" name="process_feature_other_detail" 
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="请填写其他工艺特点"/>
                </div>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// 生成污染物治理对象部分（根据领域不同生成不同内容）
function generatePollutantsSection(pollutants, field) {
    let html = `
        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4">
            <label class="block text-on-surface font-semibold text-base mb-3">
                污染物治理对象 <span class="text-error">*</span>
            </label>
            <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
            <div class="space-y-2">
    `;
    
    if (field === 'water') {
        // 水处理：常规污染物
        html += `<div class="font-medium text-sm text-primary mb-2">常规污染物</div>`;
        pollutants.conventional.forEach(p => {
            html += `
                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="pollutant" value="${p.value}"/>
                    <span class="ml-2 text-on-surface-variant text-sm">${p.label}</span>
                </label>
            `;
        });
        
        // 重金属污染物
        html += `<div class="font-medium text-sm text-primary mb-2 mt-4">重金属污染物</div>`;
        pollutants.heavyMetal.forEach(p => {
            html += `
                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="pollutant" value="${p.value}"/>
                    <span class="ml-2 text-on-surface-variant text-sm">${p.label}</span>
                </label>
            `;
        });
        
        // 特殊污染物
        html += `<div class="font-medium text-sm text-primary mb-2 mt-4">特殊污染物</div>`;
        pollutants.special.forEach(p => {
            html += `
                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                        type="checkbox" name="pollutant" value="${p.value}"/>
                    <span class="ml-2 text-on-surface-variant text-sm">${p.label}</span>
                </label>
            `;
        });
        
        // 特殊污染物-其他
        if (pollutants.specialOther) {
            html += `
                <div>
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input" 
                            type="checkbox" name="pollutant" value="special_other" data-input-id="pollutant_input_special_other"/>
                        <span class="ml-2 text-on-surface-variant text-sm">其他_____等</span>
                    </label>
                    <div id="pollutant_input_special_other" class="pl-6 mt-2" style="display:none;">
                        <input type="text" name="pollutant_special_other_detail" 
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请填写其他特殊污染物"/>
                    </div>
                </div>
            `;
        }
        
        // 新污染物
        if (pollutants.newPollutant) {
            html += `
                <div class="mt-4">
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input" 
                            type="checkbox" name="pollutant" value="new_pollutant" data-input-id="pollutant_input_new"/>
                        <span class="ml-2 text-on-surface-variant text-sm">新污染物</span>
                    </label>
                    <div id="pollutant_input_new" class="pl-6 mt-2" style="display:none;">
                        <input type="text" name="pollutant_new_detail" 
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请填写新污染物"/>
                    </div>
                </div>
            `;
        }
        
        // 非常规污染物
        if (pollutants.unconventional) {
            html += `
                <div>
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input" 
                            type="checkbox" name="pollutant" value="unconventional" data-input-id="pollutant_input_unconventional"/>
                        <span class="ml-2 text-on-surface-variant text-sm">非常规污染物(若有，请填写)</span>
                    </label>
                    <div id="pollutant_input_unconventional" class="pl-6 mt-2" style="display:none;">
                        <input type="text" name="pollutant_unconventional_detail" 
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请填写非常规污染物"/>
                    </div>
                </div>
            `;
        }
        
        // 其他
        if (pollutants.other) {
            html += `
                <div>
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input" 
                            type="checkbox" name="pollutant" value="other" data-input-id="pollutant_input_other"/>
                        <span class="ml-2 text-on-surface-variant text-sm">其他</span>
                    </label>
                    <div id="pollutant_input_other" class="pl-6 mt-2" style="display:none;">
                        <input type="text" name="pollutant_other_detail" 
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请填写其他污染物"/>
                    </div>
                </div>
            `;
        }
    }
    // 其他领域的污染物生成逻辑可以后续添加
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// 生成案例简介部分（初始隐藏）
function generateCaseSection() {
    return `
        <div id="processCaseSection" class="mt-4" style="display:none;">
            <div class="bg-primary-container/10 p-4 rounded-xl mb-4">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">info</span>
                    <p class="text-sm text-primary font-medium">您选择的成熟度需要提供案例简介</p>
                </div>
            </div>

            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-primary mb-4">
                <label class="block text-on-surface font-semibold text-sm mb-2">
                    项目名称 <span class="text-error">*</span>
                </label>
                <input type="text" name="case_project_name" id="caseProjectName"
                    class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="请输入项目名称"/>
            </div>

            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary-container mb-4">
                <label class="block text-on-surface font-semibold text-sm mb-2">
                    业主单位名称 <span class="text-error">*</span>
                </label>
                <input type="text" name="case_owner" id="caseOwner"
                    class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="请输入业主单位名称"/>
            </div>

            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-tertiary-container">
                <label class="block text-on-surface font-semibold text-sm mb-2">
                    联系人及联系方式 <span class="text-error">*</span>
                </label>
                <div class="flex gap-2">
                    <input type="text" name="case_contact_name" id="caseContactName"
                        class="flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="联系人姓名"/>
                    <input type="tel" name="case_contact_phone" id="caseContactPhone"
                        class="flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="联系电话"/>
                </div>
            </div>
        </div>
    `;
}

// 生成获奖情况部分
function generateAwardSection(prefix) {
    return `
        <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
            <label class="block text-on-surface font-semibold text-sm mb-3">
                是否获得过奖励
            </label>
            <select name="${prefix}_has_award" id="${prefix}HasAwardSelect"
                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
            </select>
        </div>

        <div id="${prefix}AwardDetails" style="display:none;">
            <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mb-4 mt-4">
                <label class="block text-on-surface font-semibold text-base mb-3">
                    奖项级别 <span class="text-error">*</span>
                </label>
                <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                <div class="space-y-3">
                    <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                            type="checkbox" name="${prefix}_award_level" value="international"/>
                        <span class="ml-3 text-on-surface-variant font-medium">国际级</span>
                    </label>
                    <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                            type="checkbox" name="${prefix}_award_level" value="national"/>
                        <span class="ml-3 text-on-surface-variant font-medium">国家级</span>
                    </label>
                    <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                            type="checkbox" name="${prefix}_award_level" value="provincial"/>
                        <span class="ml-3 text-on-surface-variant font-medium">省部级</span>
                    </label>
                </div>
            </div>

            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <label class="block text-on-surface font-semibold text-sm mb-3">
                    获奖等级 <span class="text-error">*</span>
                </label>
                <select name="${prefix}_award_grade" id="${prefix}AwardGrade"
                    class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">请选择</option>
                    <option value="special">特等奖</option>
                    <option value="first">一等奖</option>
                    <option value="second">二等奖</option>
                    <option value="third">三等奖</option>
                    <option value="excellent">优秀奖</option>
                    <option value="other">其他</option>
                </select>
            </div>
        </div>
    `;
}

// 绑定工艺类事件
function bindProcessEvents(field) {
    const config = processConfig[field];
    
    // 1. 工艺颗粒度变化 -> 控制工艺环节显示
    const granularitySelect = document.getElementById('processGranularitySelect');
    if (granularitySelect) {
        granularitySelect.addEventListener('change', function(e) {
            const stageSection = document.getElementById('processStageSection');
            if (stageSection && config.showStageWhen && config.showStageWhen.includes(e.target.value)) {
                stageSection.style.display = 'block';
            } else if (stageSection) {
                stageSection.style.display = 'none';
            }
        });
    }
    
    // 2. 工艺原理"其他"复选框 -> 显示填写框
    const principleOtherCheckbox = document.querySelector('.principle-other-checkbox');
    if (principleOtherCheckbox) {
        principleOtherCheckbox.addEventListener('change', function() {
            const inputDiv = document.querySelector('.principle-other-input');
            if (inputDiv) {
                inputDiv.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    inputDiv.querySelector('input').value = '';
                }
            }
        });
    }
    
    // 3. 工艺特点带二级菜单的复选框
    document.querySelectorAll('.feature-with-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const inputId = this.dataset.inputId;
            const inputDiv = document.getElementById(inputId);
            if (inputDiv) {
                inputDiv.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    const input = inputDiv.querySelector('input, textarea');
                    if (input) input.value = '';
                }
            }
        });
    });
    
    // 4. 污染物带填写框的复选框
    document.querySelectorAll('.pollutant-with-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const inputId = this.dataset.inputId;
            const inputDiv = document.getElementById(inputId);
            if (inputDiv) {
                inputDiv.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    const input = inputDiv.querySelector('input, textarea');
                    if (input) input.value = '';
                }
            }
        });
    });
    
    // 5. 成熟度变化 -> 控制案例简介显示
    const maturitySelect = document.getElementById('processMaturitySelect');
    if (maturitySelect) {
        maturitySelect.addEventListener('change', function(e) {
            const value = e.target.value;
            const caseSection = document.getElementById('processCaseSection');
            if (caseSection) {
                // 后三项显示案例简介
                if (['demo', 'stable_2_4', 'stable_5plus'].includes(value)) {
                    caseSection.style.display = 'block';
                    // 设置必填
                    document.getElementById('caseProjectName')?.setAttribute('required', 'required');
                    document.getElementById('caseOwner')?.setAttribute('required', 'required');
                    document.getElementById('caseContactName')?.setAttribute('required', 'required');
                    document.getElementById('caseContactPhone')?.setAttribute('required', 'required');
                } else {
                    caseSection.style.display = 'none';
                    // 移除必填
                    document.getElementById('caseProjectName')?.removeAttribute('required');
                    document.getElementById('caseOwner')?.removeAttribute('required');
                    document.getElementById('caseContactName')?.removeAttribute('required');
                    document.getElementById('caseContactPhone')?.removeAttribute('required');
                }
            }
        });
    }
    
    // 6. 获奖情况变化 -> 控制获奖详情显示
    const awardSelect = document.getElementById('processHasAwardSelect');
    if (awardSelect) {
        awardSelect.addEventListener('change', function(e) {
            const awardDetails = document.getElementById('processAwardDetails');
            const awardGrade = document.getElementById('processAwardGrade');
            if (awardDetails) {
                if (e.target.value === 'yes') {
                    awardDetails.style.display = 'block';
                    awardGrade?.setAttribute('required', 'required');
                } else {
                    awardDetails.style.display = 'none';
                    awardGrade?.removeAttribute('required');
                    // 清除选择
                    document.querySelectorAll('input[name="process_award_level"]').forEach(cb => cb.checked = false);
                    if (awardGrade) awardGrade.value = '';
                }
            }
        });
    }
    
    // 7. 添加行业按钮
    const addIndustryBtn = document.getElementById('addProcessIndustry');
    if (addIndustryBtn) {
        addIndustryBtn.addEventListener('click', function() {
            addIndustryRow('processIndustryContainer', 'process');
        });
    }
}
