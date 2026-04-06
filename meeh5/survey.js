// ========== 全局变量和常量 ==========
        
        // 状态管理
        let currentStep = 1;
        const totalSteps = 4;
        let selectedFormType = null;
        
        // DOM 元素
        const form = document.getElementById('surveyForm');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        const stepIndicator = document.getElementById('stepIndicator');
        
        // 本地存储键名
        const STORAGE_KEY = 'survey_draft';
        const SUBMITTED_KEY = 'survey_submitted';
        
        // API 配置
        const API_BASE = 'https://api.example.com'; // 替换为实际API地址
        const COMPANY_SEARCH_API = `${API_BASE}/company/search`;
        const SUBMIT_API = `${API_BASE}/survey/submit`;

        
        // ========== 工具函数 ==========
        
        function updateStepDisplay() {
            stepIndicator.textContent = `步骤 ${currentStep}/${totalSteps}`;
            
            document.querySelectorAll('.step-section').forEach(section => {
                section.classList.add('step-hidden');
            });
            
            const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
            if (currentSection) {
                currentSection.classList.remove('step-hidden');
                currentSection.classList.add('fade-in');
            }
            
            prevBtn.disabled = currentStep === 1;
            
            if (currentStep === totalSteps) {
                nextBtn.classList.add('step-hidden');
                submitBtn.classList.remove('step-hidden');
            } else {
                nextBtn.classList.remove('step-hidden');
                submitBtn.classList.add('step-hidden');
            }
        }
        
        function handleNext() {
            if (!validateCurrentStep()) {
                return;
            }
            
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepDisplay();
                scrollToContent();
            }
        }
        
        function handlePrev() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
                scrollToContent();
            }
        }
        
        // 滚动到当前步骤的内容区域（跳过标题）
        function scrollToContent() {
            setTimeout(() => {
                const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
                if (currentSection) {
                    // 找到第一个输入框或选择框
                    const firstInput = currentSection.querySelector('input, select, textarea');
                    if (firstInput) {
                        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        // 如果没有输入框，滚动到步骤标题下方
                        const stepTitle = currentSection.querySelector('.bg-secondary-container\\/20');
                        if (stepTitle) {
                            stepTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }
                }
            }, 100);
        }
        
        function validateCurrentStep() {
            const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
            const inputs = currentSection.querySelectorAll('input[required], select[required], textarea[required]');
            
            let isValid = true;
            inputs.forEach(input => {
                // 跳过隐藏的元素（自身或父级隐藏）
                if (!isVisible(input)) {
                    input.classList.remove('border-error');
                    return;
                }
                if (!input.value.trim()) {
                    input.classList.add('border-error');
                    isValid = false;
                } else {
                    input.classList.remove('border-error');
                }
            });
            
            if (!isValid) {
                alert('请填写所有必填项');
            }
            
            return isValid;
        }
        
        // 判断元素是否可见（自身及所有父级都不能是 display:none）
        function isVisible(el) {
            while (el && el !== document.body) {
                if (el.style.display === 'none') return false;
                if (el.classList && el.classList.contains('step-hidden')) return false;
                el = el.parentElement;
            }
            return true;
        }
        
        function handleFormTypeChange(e) {
            selectedFormType = e.target.value;
            
            document.querySelectorAll('.dynamic-form').forEach(form => {
                form.classList.add('step-hidden');
            });
            
            const objectNameLabel = document.getElementById('objectNameLabel');
            
            if (selectedFormType === 'process') {
                document.getElementById('processForm').classList.remove('step-hidden');
                objectNameLabel.textContent = '工艺名称';
            } else if (selectedFormType === 'material') {
                document.getElementById('materialForm').classList.remove('step-hidden');
                objectNameLabel.textContent = '材料名称';
            } else if (selectedFormType === 'equipment') {
                document.getElementById('equipmentForm').classList.remove('step-hidden');
                objectNameLabel.textContent = '设备名称';
            }
        }
        
        function saveDraft() {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            data.currentStep = currentStep;
            data.selectedFormType = selectedFormType;
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            alert('草稿已保存');
        }
        
        function loadDraft() {
            const draft = localStorage.getItem(STORAGE_KEY);
            if (draft) {
                try {
                    const data = JSON.parse(draft);
                    Object.keys(data).forEach(key => {
                        const input = form.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.value = data[key];
                        }
                    });
                    if (data.currentStep) {
                        currentStep = data.currentStep;
                    }
                    if (data.selectedFormType) {
                        selectedFormType = data.selectedFormType;
                        const radio = form.querySelector(`input[name="formType"][value="${selectedFormType}"]`);
                        if (radio) {
                            radio.checked = true;
                            handleFormTypeChange({ target: radio });
                        }
                    }
                    updateStepDisplay();
                } catch (e) {
                    console.error('加载草稿失败', e);
                }
            }
        }
        
        async function handleSubmit() {
            if (!validateCurrentStep()) {
                return;
            }
            
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            });
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = '提交中...';
                
                // 这里替换为实际的API调用
                // const response = await fetch(SUBMIT_API, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });
                
                // 模拟提交
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                localStorage.setItem(SUBMITTED_KEY, 'true');
                localStorage.removeItem(STORAGE_KEY);
                
                alert('提交成功！');
                form.reset();
                currentStep = 1;
                updateStepDisplay();
                
            } catch (error) {
                console.error('提交失败', error);
                alert('提交失败，请重试');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '提交';
            }
        }
        
        function addIndustryRow(containerId, prefix) {
            const container = document.getElementById(containerId);
            const newRow = document.createElement('div');
            newRow.className = 'industry-row mb-4 p-3 bg-surface-container-low/30 rounded-xl relative';
            newRow.innerHTML = `
                <button type="button" class="absolute top-2 right-2 text-error hover:opacity-80" onclick="this.parentElement.remove()">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
                <input type="text" name="${prefix}_industry_code[]" required
                    class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                    placeholder="行业代码"/>
                <input type="text" name="${prefix}_industry_major[]" required
                    class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                    placeholder="大类"/>
                <input type="text" name="${prefix}_industry_middle[]" required
                    class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                    placeholder="中类"/>
                <input type="text" name="${prefix}_industry_minor[]" required
                    class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="小类"/>
            `;
            container.appendChild(newRow);
        }

        // 将“起始值/结束值”两个输入同步为一个隐藏字段，保持原有提交字段兼容
        function bindRangePairInputs(scope = document) {
            scope.querySelectorAll('.range-pair').forEach(pair => {
                const minInput = pair.querySelector('.range-min');
                const maxInput = pair.querySelector('.range-max');
                const hiddenInput = pair.querySelector('.range-hidden');
                if (!minInput || !maxInput || !hiddenInput) return;

                const syncValue = () => {
                    const min = minInput.value.trim();
                    const max = maxInput.value.trim();
                    hiddenInput.value = (min || max) ? `${min}至${max}` : '';
                };

                minInput.addEventListener('input', syncValue);
                maxInput.addEventListener('input', syncValue);
                syncValue();
            });
        }

        
        // ========== 工艺类动态表单生成 ==========
        
        function generateProcessDynamicContent(field) {
            const config = processConfig[field];
            const container = document.getElementById('processDynamicContent');
            
            let html = '';
            
            // 1. 工艺颗粒度
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        工艺颗粒度 <span class="text-error">*</span>
                    </label>
                    <select name="process_granularity" required id="processGranularitySelect"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="">请选择</option>
                        ${config.granularityOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>
                </div>
            `;
            
            // 2. 工艺原理
            html += `
                <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4">
                    <label class="block text-on-surface font-semibold text-base mb-3">
                        工艺原理 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                    <div class="space-y-3">
                        <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                type="checkbox" name="process_principle" value="physical"/>
                            <span class="ml-3 text-on-surface-variant font-medium">物理法</span>
                        </label>
                        <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                type="checkbox" name="process_principle" value="chemical"/>
                            <span class="ml-3 text-on-surface-variant font-medium">化学法</span>
                        </label>
                        <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                type="checkbox" name="process_principle" value="biological"/>
                            <span class="ml-3 text-on-surface-variant font-medium">生物法</span>
                        </label>
                        <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                type="checkbox" name="process_principle" value="physicochemical"/>
                            <span class="ml-3 text-on-surface-variant font-medium">物理化学</span>
                        </label>
                        <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20 principle-other-checkbox" 
                                type="checkbox" name="process_principle" value="other"/>
                            <span class="ml-3 text-on-surface-variant font-medium">其他</span>
                        </label>
                        <div class="pl-8 principle-other-input" style="display:none;">
                            <input type="text" name="process_principle_other_text" 
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="请说明其他工艺原理"/>
                        </div>
                    </div>
                </div>
            `;
            
            // 3. 成熟度
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        成熟度
                    </label>
                    <select name="process_maturity" id="processMaturitySelect"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="">请选择（选填）</option>
                        <option value="pilot_stable">已开展中试，运行稳定，达到预期指标</option>
                        <option value="pilot_complete">完成中试研究，情况良好，拟开展示范工程</option>
                        <option value="demo">完成示范工程，运行情况待观察</option>
                        <option value="stable_2_4">建成2~4项工程且运行稳定</option>
                        <option value="stable_5plus">建成5项及以上工程项目的</option>
                    </select>
                </div>
            `;
            
            // 4. 技术来源
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        技术来源
                    </label>
                    <select name="process_source"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="">请选择（选填）</option>
                        <option value="overseas">海外引进</option>
                        <option value="domestic_innovation">国内自主创新</option>
                        <option value="domestic_integration">国内自主集成</option>
                    </select>
                </div>
            `;
            
            // 5. 应用行业
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-2">
                        应用行业 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">可添加多个应用行业</p>
                    <div id="processIndustryContainer">
                        <div class="industry-row mb-4 p-3 bg-surface-container-low/30 rounded-xl">
                            <input type="text" name="process_industry_code[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="行业代码"/>
                            <input type="text" name="process_industry_major[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="大类"/>
                            <input type="text" name="process_industry_middle[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="中类"/>
                            <input type="text" name="process_industry_minor[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="小类"/>
                        </div>
                    </div>
                    <button type="button" id="addProcessIndustry"
                        class="text-primary text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
                        <span class="material-symbols-outlined text-lg">add_circle</span>
                        添加行业
                    </button>
                </div>
            `;
            
            // 6. 工艺环节（条件显示）
            if (config.showStageWhen && config.showStageWhen.length > 0) {
                html += `
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
            
            // 7. 工艺特点（仅水处理）
            if (field === 'water' && config.features) {
                html += generateWaterFeaturesSection(config.features);
            }
            
            // 8. 污染物治理对象（简化版）
            html += generatePollutantsSection(config.pollutants, field);
            
            // 9. 案例简介（条件显示）
            html += `
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
                        <div class="space-y-2">
                            <input type="text" name="case_contact_name" id="caseContactName"
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="联系人姓名"/>
                            <input type="tel" name="case_contact_phone" id="caseContactPhone"
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="联系电话"/>
                        </div>
                    </div>
                </div>
            `;
            
            // 10. 获奖情况
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        是否获得过奖励
                    </label>
                    <select name="process_has_award" id="processHasAwardSelect"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="no">否</option>
                        <option value="yes">是</option>
                    </select>
                </div>
                <div id="processAwardDetails" style="display:none;">
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mb-4 mt-4">
                        <label class="block text-on-surface font-semibold text-base mb-3">
                            奖项级别 <span class="text-error">*</span>
                        </label>
                        <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                        <div class="space-y-3">
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="process_award_level" value="international"/>
                                <span class="ml-3 text-on-surface-variant font-medium">国际级</span>
                            </label>
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="process_award_level" value="national"/>
                                <span class="ml-3 text-on-surface-variant font-medium">国家级</span>
                            </label>
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="process_award_level" value="provincial"/>
                                <span class="ml-3 text-on-surface-variant font-medium">省部级</span>
                            </label>
                        </div>
                    </div>
                    <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                        <label class="block text-on-surface font-semibold text-sm mb-3">
                            获奖等级 <span class="text-error">*</span>
                        </label>
                        <select name="process_award_grade" id="processAwardGrade"
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
            
            container.innerHTML = html;
            bindProcessEvents(field);
        }

        
        function generateWaterFeaturesSection(features) {
            let html = `
                <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mt-4">
                    <label class="block text-on-surface font-semibold text-base mb-3">
                        工艺特点 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                    <div class="space-y-2">
            `;
            
            // 带二级菜单的选项
            features.withInput.forEach(feature => {
                const inputId = `feature_input_${feature.value}`;
                const isRangeInput = /___\s*至\s*___/.test(feature.placeholder || '');
                html += `
                    <div>
                        <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 feature-with-input" 
                                type="checkbox" name="process_feature" value="${feature.value}" data-input-id="${inputId}"/>
                            <span class="ml-2 text-on-surface-variant text-sm">${feature.label}</span>
                        </label>
                        <div id="${inputId}" class="pl-6 mt-2" style="display:none;">
                            ${isRangeInput ? `
                                <div class="range-pair flex items-center gap-2">
                                    <input type="text"
                                        class="range-min flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="起始值"/>
                                    <span class="text-on-surface-variant text-sm">至</span>
                                    <input type="text"
                                        class="range-max flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="结束值"/>
                                    <input type="hidden" class="range-hidden" name="process_feature_${feature.value}_detail"/>
                                </div>
                            ` : `
                                <input type="text" name="process_feature_${feature.value}_detail"
                                    class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="${feature.placeholder}"/>
                            `}
                        </div>
                    </div>
                `;
            });
            
            // 简单勾选的选项
            features.simple.forEach(feature => {
                html += `
                    <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                            type="checkbox" name="process_feature" value="${feature.value}"/>
                        <span class="ml-2 text-on-surface-variant text-sm">${feature.label}</span>
                    </label>
                `;
            });
            
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
        
        // ── 通用辅助：渲染一个可折叠的污染物分组 ──────────────────────────
        // groupId:  唯一ID前缀
        // label:    分组名称（父项文字）
        // items:    子项数组 [{ value, label, hasInput?, placeholder? }]
        // extraItems: 分组末尾的带填写框独立项（specialOther / newPollutant 等）
        function renderPollutantGroup(groupId, label, items, extraItems) {
            const subId = `pg_sub_${groupId}`;
            let subHtml = '';

            if (items && items.length) {
                items.forEach(p => {
                    if (p.hasInput) {
                        const iid = `pollutant_input_${groupId}_${p.value}`;
                        subHtml += `
                            <div>
                                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer">
                                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input"
                                        type="checkbox" name="pollutant" value="${p.value}" data-input-id="${iid}"/>
                                    <span class="ml-2 text-on-surface-variant text-xs">${p.label}</span>
                                </label>
                                <div id="${iid}" class="pl-6 mt-1" style="display:none;">
                                    <input type="text" name="pollutant_${p.value}_detail"
                                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="${p.placeholder || '请填写'}"/>
                                </div>
                            </div>`;
                    } else {
                        subHtml += `
                            <label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer">
                                <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20"
                                    type="checkbox" name="pollutant" value="${p.value}"/>
                                <span class="ml-2 text-on-surface-variant text-xs">${p.label}</span>
                            </label>`;
                    }
                });
            }

            if (extraItems) {
                extraItems.forEach(ex => {
                    const iid = `pollutant_input_${ex.value}`;
                    subHtml += `
                        <div>
                            <label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer">
                                <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input"
                                    type="checkbox" name="pollutant" value="${ex.value}" data-input-id="${iid}"/>
                                <span class="ml-2 text-on-surface-variant text-xs">${ex.label}</span>
                            </label>
                            <div id="${iid}" class="pl-6 mt-1" style="display:none;">
                                <input type="text" name="pollutant_${ex.value}_detail"
                                    class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="${ex.placeholder || '请填写'}"/>
                            </div>
                        </div>`;
                });
            }

            return `
                <div class="pollutant-group mt-2">
                    <!-- 父项：点击展开/收起 -->
                    <button type="button"
                        class="pollutant-group-toggle w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors"
                        data-target="${subId}" aria-expanded="false">
                        <span class="text-on-surface font-medium text-sm">${label}</span>
                        <span class="material-symbols-outlined text-on-surface-variant text-lg transition-transform pg-arrow">expand_more</span>
                    </button>
                    <!-- 子项列表（默认折叠） -->
                    <div id="${subId}" class="pl-3 mt-1 space-y-1" style="display:none;">
                        ${subHtml}
                    </div>
                </div>`;
        }

        // ── 独立带填写框项（不属于任何分组，直接显示在顶层） ──────────────
        function renderPollutantStandalone(value, label, placeholder) {
            const iid = `pollutant_input_${value}`;
            return `
                <div class="mt-2">
                    <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                        <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 pollutant-with-input"
                            type="checkbox" name="pollutant" value="${value}" data-input-id="${iid}"/>
                        <span class="ml-2 text-on-surface-variant text-sm">${label}</span>
                    </label>
                    <div id="${iid}" class="pl-6 mt-1" style="display:none;">
                        <input type="text" name="pollutant_${value}_detail"
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="${placeholder || '请填写'}"/>
                    </div>
                </div>`;
        }

        // ── 主函数：根据领域生成污染物区块 ───────────────────────────────
        function generatePollutantsSection(pollutants, field) {
            let inner = '';

            if (field === 'water') {
                inner += renderPollutantGroup('conventional', '常规污染物', pollutants.conventional);
                inner += renderPollutantGroup('heavyMetal',  '重金属污染物', pollutants.heavyMetal);
                inner += renderPollutantGroup('special', '特殊污染物', pollutants.special,
                    pollutants.specialOther ? [{ value: 'special_other', label: '其他_____等', placeholder: '请填写其他特殊污染物' }] : null);
                if (pollutants.newPollutant)
                    inner += renderPollutantStandalone('new_pollutant', '新污染物', '请填写新污染物');
                if (pollutants.unconventional)
                    inner += renderPollutantStandalone('unconventional', '非常规污染物（若有，请填写）', '请填写非常规污染物');
                if (pollutants.other)
                    inner += renderPollutantStandalone('other', '其他', '请填写其他污染物');

            } else if (field === 'air') {
                inner += renderPollutantGroup('conventional', '常规污染物', pollutants.conventional);
                inner += renderPollutantGroup('unconventional', '非常规污染物', pollutants.unconventional,
                    pollutants.other ? [{ value: 'air_other', label: '其他', placeholder: '请填写其他污染物' }] : null);

            } else if (field === 'solid') {
                inner += renderPollutantGroup('types', '固废类型', pollutants.types,
                    pollutants.other ? [{ value: 'solid_other', label: '其他', placeholder: '请填写其他固废类型' }] : null);

            } else if (field === 'eco') {
                inner += renderPollutantGroup('pollutionControl', '污染治理型 - 常规污染物',
                    pollutants.pollutionControl.conventional);
                inner += renderPollutantGroup('restoration', '生态恢复/重建型', pollutants.restoration);
                inner += renderPollutantGroup('resourceProtection', '资源保护与可持续利用型', pollutants.resourceProtection);
                inner += renderPollutantGroup('disasterPrevention', '灾害防治与风险减缓型', pollutants.disasterPrevention);
                inner += renderPollutantGroup('landscape', '景观美化与游憩功能提升型', pollutants.landscape);
                if (pollutants.unconventional)
                    inner += renderPollutantStandalone('eco_unconventional', '非常规污染物（若有，请填写）', '请填写非常规污染物');
                if (pollutants.other)
                    inner += renderPollutantStandalone('eco_other', '其他', '请填写其他');

            } else if (field === 'soil') {
                inner += renderPollutantGroup('inorganic', '无机类污染物', pollutants.inorganic,
                    pollutants.inorganicOther ? [{ value: 'inorganic_other', label: '其他', placeholder: '请填写其他无机类污染物' }] : null);
                inner += renderPollutantGroup('heavyMetal', '重金属污染物', pollutants.heavyMetal,
                    pollutants.heavyMetalOther ? [{ value: 'heavy_metal_other', label: '其他', placeholder: '请填写其他重金属污染物' }] : null);
                inner += renderPollutantGroup('volatile', '挥发性有机污染物', pollutants.volatile,
                    pollutants.volatileOther ? [{ value: 'volatile_other', label: '其他', placeholder: '请填写其他挥发性有机污染物' }] : null);
                inner += renderPollutantGroup('semiVolatile', '半挥发性有机污染物', pollutants.semiVolatile,
                    pollutants.semiVolatileOther ? [{ value: 'semi_volatile_other', label: '其他', placeholder: '请填写其他半挥发性有机污染物' }] : null);
                if (pollutants.newPollutant)
                    inner += renderPollutantStandalone('soil_new_pollutant', '新污染物（若有，请填写）', '请填写新污染物');
                if (pollutants.other)
                    inner += renderPollutantStandalone('soil_other', '其他', '请填写其他');

            } else if (field === 'energy') {
                inner += renderPollutantGroup('types', '污染物类型', pollutants.types,
                    pollutants.other ? [{ value: 'energy_other', label: '其他', placeholder: '请填写其他污染物' }] : null);
            }

            return `
                <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4">
                    <label class="block text-on-surface font-semibold text-base mb-3">
                        污染物治理对象 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">点击分类展开子选项，可多选</p>
                    <div class="space-y-1">
                        ${inner}
                    </div>
                </div>`;
        }
        
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
            
            // 2. 工艺原理"其他"复选框
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
                            inputDiv.querySelectorAll('input, textarea').forEach(input => {
                                input.value = '';
                            });
                        }
                    }
                });
            });

            bindRangePairInputs();
            
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

            // 4b. 污染物分组折叠按钮
            document.querySelectorAll('.pollutant-group-toggle').forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const subList = document.getElementById(targetId);
                    const arrow = this.querySelector('.pg-arrow');
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    if (subList) subList.style.display = expanded ? 'none' : 'block';
                    if (arrow) arrow.style.transform = expanded ? '' : 'rotate(180deg)';
                    this.setAttribute('aria-expanded', String(!expanded));
                });
            });
            
            // 5. 成熟度变化 -> 控制案例简介显示
            const maturitySelect = document.getElementById('processMaturitySelect');
            if (maturitySelect) {
                maturitySelect.addEventListener('change', function(e) {
                    const value = e.target.value;
                    const caseSection = document.getElementById('processCaseSection');
                    if (caseSection) {
                        if (['demo', 'stable_2_4', 'stable_5plus'].includes(value)) {
                            caseSection.style.display = 'block';
                            document.getElementById('caseProjectName')?.setAttribute('required', 'required');
                            document.getElementById('caseOwner')?.setAttribute('required', 'required');
                            document.getElementById('caseContactName')?.setAttribute('required', 'required');
                            document.getElementById('caseContactPhone')?.setAttribute('required', 'required');
                        } else {
                            caseSection.style.display = 'none';
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

        
        // ========== 材料类动态表单生成（简化版） ==========
        
        function generateMaterialDynamicContent(field) {
            const config = materialConfig[field];
            const container = document.getElementById('materialDynamicContent');
            
            let html = `
                <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4">
                    <label class="block text-on-surface font-semibold text-base mb-3">
                        功能分类或工艺环节 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                    <div class="space-y-2">
            `;
            
            config.categories.forEach(category => {
                if (category.hasSubOptions) {
                    const subId = `material_cat_sub_${category.value}`;
                    html += `
                        <div>
                            <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 material-cat-with-sub" 
                                    type="checkbox" name="material_category" value="${category.value}" data-sub-id="${subId}"/>
                                <span class="ml-2 text-on-surface-variant text-sm">${category.label}</span>
                            </label>
                            <div id="${subId}" class="pl-6 mt-2 space-y-2" style="display:none;">
                    `;
                    
                    category.subOptions.forEach(sub => {
                        html += `
                            <label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer">
                                <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="material_category_${category.value}" value="${sub.value}"/>
                                <span class="ml-2 text-on-surface-variant text-xs">${sub.label}</span>
                            </label>
                        `;
                    });
                    
                    html += `
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                type="checkbox" name="material_category" value="${category.value}"/>
                            <span class="ml-2 text-on-surface-variant text-sm">${category.label}</span>
                        </label>
                    `;
                }
            });
            
            if (config.other) {
                html += `
                    <div>
                        <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                            <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 material-cat-with-input" 
                                type="checkbox" name="material_category" value="other" data-input-id="material_cat_other_input"/>
                            <span class="ml-2 text-on-surface-variant text-sm">其他</span>
                        </label>
                        <div id="material_cat_other_input" class="pl-6 mt-2" style="display:none;">
                            <input type="text" name="material_category_other_detail" 
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="请填写其他功能分类"/>
                        </div>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
            
            // 应用行业
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-2">
                        应用行业 <span class="text-error">*</span>
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">可添加多个应用行业</p>
                    <div id="materialIndustryContainer">
                        <div class="industry-row mb-4 p-3 bg-surface-container-low/30 rounded-xl">
                            <input type="text" name="material_industry_code[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="行业代码"/>
                            <input type="text" name="material_industry_major[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="大类"/>
                            <input type="text" name="material_industry_middle[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2"
                                placeholder="中类"/>
                            <input type="text" name="material_industry_minor[]" required
                                class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="小类"/>
                        </div>
                    </div>
                    <button type="button" id="addMaterialIndustry"
                        class="text-primary text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
                        <span class="material-symbols-outlined text-lg">add_circle</span>
                        添加行业
                    </button>
                </div>
            `;
            
            // 成熟度
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        成熟度
                    </label>
                    <select name="material_maturity" id="materialMaturitySelect"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="">请选择（选填）</option>
                        <option value="pilot_stable">已开展中试，运行稳定，达到预期指标</option>
                        <option value="pilot_complete">完成中试研究，情况良好，拟开展示范工程</option>
                        <option value="demo">完成示范工程，运行情况待观察</option>
                        <option value="stable_2_4">建成2~4项工程且运行稳定</option>
                        <option value="stable_5plus">建成5项及以上工程项目的</option>
                    </select>
                </div>
            `;
            
            // 案例简介（成熟度后三项时显示）
            html += `
                <div id="materialCaseSection" class="mt-4" style="display:none;">
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
                        <input type="text" name="case_project_name" id="materialCaseProjectName"
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请输入项目名称"/>
                    </div>
                    <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary-container mb-4">
                        <label class="block text-on-surface font-semibold text-sm mb-2">
                            业主单位名称 <span class="text-error">*</span>
                        </label>
                        <input type="text" name="case_owner" id="materialCaseOwner"
                            class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="请输入业主单位名称"/>
                    </div>
                    <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-tertiary-container">
                        <label class="block text-on-surface font-semibold text-sm mb-2">
                            联系人及联系方式 <span class="text-error">*</span>
                        </label>
                        <div class="space-y-2">
                            <input type="text" name="case_contact_name" id="materialCaseContactName"
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="联系人姓名"/>
                            <input type="tel" name="case_contact_phone" id="materialCaseContactPhone"
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="联系电话"/>
                        </div>
                    </div>
                </div>
            `;

            // 获奖情况
            html += `
                <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4">
                    <label class="block text-on-surface font-semibold text-sm mb-3">
                        是否获得过奖励
                    </label>
                    <select name="material_has_award" id="materialHasAwardSelect"
                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="no">否</option>
                        <option value="yes">是</option>
                    </select>
                </div>
                <div id="materialAwardDetails" style="display:none;">
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mb-4 mt-4">
                        <label class="block text-on-surface font-semibold text-base mb-3">
                            奖项级别 <span class="text-error">*</span>
                        </label>
                        <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                        <div class="space-y-3">
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20"
                                    type="checkbox" name="material_award_level" value="international"/>
                                <span class="ml-3 text-on-surface-variant font-medium">国际级</span>
                            </label>
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20"
                                    type="checkbox" name="material_award_level" value="national"/>
                                <span class="ml-3 text-on-surface-variant font-medium">国家级</span>
                            </label>
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20"
                                    type="checkbox" name="material_award_level" value="provincial"/>
                                <span class="ml-3 text-on-surface-variant font-medium">省部级</span>
                            </label>
                        </div>
                    </div>
                    <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                        <label class="block text-on-surface font-semibold text-sm mb-3">
                            获奖等级 <span class="text-error">*</span>
                        </label>
                        <select name="material_award_grade" id="materialAwardGrade"
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
            
            container.innerHTML = html;
            bindMaterialEvents();
        }
        
        function bindMaterialEvents() {
            // 带二级菜单的复选框
            document.querySelectorAll('.material-cat-with-sub').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const subId = this.dataset.subId;
                    const subDiv = document.getElementById(subId);
                    if (subDiv) {
                        subDiv.style.display = this.checked ? 'block' : 'none';
                        if (!this.checked) {
                            subDiv.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                        }
                    }
                });
            });
            
            // 带填写框的复选框
            document.querySelectorAll('.material-cat-with-input').forEach(checkbox => {
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
            
            // 添加行业按钮
            const addIndustryBtn = document.getElementById('addMaterialIndustry');
            if (addIndustryBtn) {
                addIndustryBtn.addEventListener('click', function() {
                    addIndustryRow('materialIndustryContainer', 'material');
                });
            }

            // 成熟度 -> 案例简介
            const maturitySelect = document.getElementById('materialMaturitySelect');
            if (maturitySelect) {
                maturitySelect.addEventListener('change', function(e) {
                    const caseSection = document.getElementById('materialCaseSection');
                    if (!caseSection) return;
                    if (['demo', 'stable_2_4', 'stable_5plus'].includes(e.target.value)) {
                        caseSection.style.display = 'block';
                        document.getElementById('materialCaseProjectName')?.setAttribute('required', 'required');
                        document.getElementById('materialCaseOwner')?.setAttribute('required', 'required');
                        document.getElementById('materialCaseContactName')?.setAttribute('required', 'required');
                        document.getElementById('materialCaseContactPhone')?.setAttribute('required', 'required');
                    } else {
                        caseSection.style.display = 'none';
                        document.getElementById('materialCaseProjectName')?.removeAttribute('required');
                        document.getElementById('materialCaseOwner')?.removeAttribute('required');
                        document.getElementById('materialCaseContactName')?.removeAttribute('required');
                        document.getElementById('materialCaseContactPhone')?.removeAttribute('required');
                    }
                });
            }

            // 获奖情况 -> 获奖详情
            const awardSelect = document.getElementById('materialHasAwardSelect');
            if (awardSelect) {
                awardSelect.addEventListener('change', function(e) {
                    const awardDetails = document.getElementById('materialAwardDetails');
                    const awardGrade = document.getElementById('materialAwardGrade');
                    if (!awardDetails) return;
                    if (e.target.value === 'yes') {
                        awardDetails.style.display = 'block';
                        awardGrade?.setAttribute('required', 'required');
                    } else {
                        awardDetails.style.display = 'none';
                        awardGrade?.removeAttribute('required');
                        document.querySelectorAll('input[name="material_award_level"]').forEach(cb => cb.checked = false);
                        if (awardGrade) awardGrade.value = '';
                    }
                });
            }
        }
        
        // ========== 设备类生成函数 ==========

        // 通用：渲染污染物分组（折叠，复用工艺类同款逻辑）
        function renderEqPollutantGroup(g) {
            const subId = 'eq_pg_' + g.id;
            let sub = '';
            (g.items||[]).forEach(p => { sub += '<label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="eq_pollutant" value="'+p.v+'"/><span class="ml-2 text-on-surface-variant text-xs">'+p.l+'</span></label>'; });
            (g.extras||[]).forEach(ex => { const iid='eq_pi_'+ex.v; sub += '<div><label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 eq-pollutant-with-input" type="checkbox" name="eq_pollutant" value="'+ex.v+'" data-input-id="'+iid+'"/><span class="ml-2 text-on-surface-variant text-xs">'+ex.l+'</span></label><div id="'+iid+'" class="pl-6 mt-1" style="display:none;"><input type="text" name="eq_pollutant_'+ex.v+'_detail" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="'+ex.ph+'"/></div></div>'; });
            return '<div class="pollutant-group mt-2"><button type="button" class="eq-pollutant-group-toggle w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors" data-target="'+subId+'" aria-expanded="false"><span class="text-on-surface font-medium text-sm">'+g.label+'</span><span class="material-symbols-outlined text-on-surface-variant text-lg transition-transform pg-arrow">expand_more</span></button><div id="'+subId+'" class="pl-3 mt-1 space-y-1" style="display:none;">'+sub+'</div></div>';
        }

        // 通用：渲染设备特点
        function renderEqFeatures(features) {
            if (!features || !features.length) return '';
            let html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">设备特点/适用环境</label><p class="text-xs text-on-surface-variant mb-3">（可多选，选填）</p><div class="space-y-2">';
            features.forEach(f => {
                if (f.t === 's') {
                    html += '<label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="eq_feature" value="'+f.v+'"/><span class="ml-2 text-on-surface-variant text-sm">'+f.l+'</span></label>';
                } else {
                    const iid = 'eq_feat_'+f.v;
                    const isRangeInput = /___\s*至\s*___/.test(f.l || '') || /范围/.test(f.ph || '');
                    if (isRangeInput) {
                        html += '<div><label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 eq-feature-with-input" type="checkbox" name="eq_feature" value="'+f.v+'" data-input-id="'+iid+'"/><span class="ml-2 text-on-surface-variant text-sm">'+f.l+'</span></label><div id="'+iid+'" class="pl-6 mt-1" style="display:none;"><div class="range-pair flex items-center gap-2"><input type="text" class="range-min flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="起始值"/><span class="text-on-surface-variant text-sm">至</span><input type="text" class="range-max flex-1 bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="结束值"/><input type="hidden" class="range-hidden" name="eq_feature_'+f.v+'_detail"/></div></div></div>';
                    } else {
                        html += '<div><label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 eq-feature-with-input" type="checkbox" name="eq_feature" value="'+f.v+'" data-input-id="'+iid+'"/><span class="ml-2 text-on-surface-variant text-sm">'+f.l+'</span></label><div id="'+iid+'" class="pl-6 mt-1" style="display:none;"><input type="text" name="eq_feature_'+f.v+'_detail" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="'+f.ph+'"/></div></div>';
                    }
                }
            });
            html += '</div></div>';
            return html;
        }

        // 通用：渲染应用行业+来源+成熟度+案例简介+获奖情况（治理/检测设备共用）
        function renderEqCommonFields(sourceMultiple) {
            const sourceType = sourceMultiple ? 'checkbox' : 'radio';
            return '<div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4"><label class="block text-on-surface font-semibold text-sm mb-2">应用行业 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">可添加多个应用行业</p><div id="equipmentIndustryContainer"><div class="industry-row mb-4 p-3 bg-surface-container-low/30 rounded-xl"><input type="text" name="equipment_industry_code[]" required class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2" placeholder="行业代码"/><input type="text" name="equipment_industry_major[]" required class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2" placeholder="大类"/><input type="text" name="equipment_industry_middle[]" required class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-2" placeholder="中类"/><input type="text" name="equipment_industry_minor[]" required class="w-full bg-white border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="小类"/></div></div><button type="button" id="addEquipmentIndustry" class="text-primary text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"><span class="material-symbols-outlined text-lg">add_circle</span>添加行业</button></div>' +
                '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">来源</label><div class="space-y-3"><label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="'+sourceType+'" name="equipment_source" value="domestic"/><span class="ml-3 text-on-surface-variant font-medium">国内生产</span></label><label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="'+sourceType+'" name="equipment_source" value="overseas"/><span class="ml-3 text-on-surface-variant font-medium">海外生产</span></label></div></div>' +
                '<div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4"><label class="block text-on-surface font-semibold text-sm mb-3">成熟度</label><select name="equipment_maturity" id="equipmentMaturitySelect" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"><option value="">请选择（选填）</option><option value="pilot_stable">已开展中试，运行稳定，达到预期指标</option><option value="pilot_complete">完成中试研究，情况良好，拟开展示范工程</option><option value="demo">完成示范工程，运行情况待观察</option><option value="stable_2_4">建成2~4项工程且运行稳定</option><option value="stable_5plus">建成5项及以上工程项目的</option></select></div>' +
                '<div id="equipmentCaseSection" class="mt-4" style="display:none;"><div class="bg-primary-container/10 p-4 rounded-xl mb-4"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary">info</span><p class="text-sm text-primary font-medium">您选择的成熟度需要提供案例简介</p></div></div><div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-primary mb-4"><label class="block text-on-surface font-semibold text-sm mb-2">项目名称 <span class="text-error">*</span></label><input type="text" name="case_project_name" id="equipmentCaseProjectName" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="请输入项目名称"/></div><div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary-container mb-4"><label class="block text-on-surface font-semibold text-sm mb-2">业主单位名称 <span class="text-error">*</span></label><input type="text" name="case_owner" id="equipmentCaseOwner" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="请输入业主单位名称"/></div><div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-tertiary-container"><label class="block text-on-surface font-semibold text-sm mb-2">联系人及联系方式 <span class="text-error">*</span></label><div class="space-y-2"><input type="text" name="case_contact_name" id="equipmentCaseContactName" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="联系人姓名"/><input type="tel" name="case_contact_phone" id="equipmentCaseContactPhone" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="联系电话"/></div></div></div>' +
                '<div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4"><label class="block text-on-surface font-semibold text-sm mb-3">是否获得过奖励</label><select name="equipment_has_award" id="equipmentHasAwardSelect" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"><option value="no">否</option><option value="yes">是</option></select></div><div id="equipmentAwardDetails" style="display:none;"><div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mb-4 mt-4"><label class="block text-on-surface font-semibold text-base mb-3">奖项级别 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">（可多选）</p><div class="space-y-3"><label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="equipment_award_level" value="international"/><span class="ml-3 text-on-surface-variant font-medium">国际级</span></label><label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="equipment_award_level" value="national"/><span class="ml-3 text-on-surface-variant font-medium">国家级</span></label><label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="equipment_award_level" value="provincial"/><span class="ml-3 text-on-surface-variant font-medium">省部级</span></label></div></div><div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm"><label class="block text-on-surface font-semibold text-sm mb-3">获奖等级 <span class="text-error">*</span></label><select name="equipment_award_grade" id="equipmentAwardGrade" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"><option value="">请选择</option><option value="special">特等奖</option><option value="first">一等奖</option><option value="second">二等奖</option><option value="third">三等奖</option><option value="excellent">优秀奖</option><option value="other">其他</option></select></div></div>';
        }

        // 治理设备：根据专业领域生成动态内容
        function generateTreatmentFieldContent(field) {
            const cfg = equipmentTreatmentConfig[field];
            if (!cfg) return '';
            let html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">污染物类别 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">点击分类展开子选项，可多选</p><div class="space-y-1">';
            cfg.pollutantGroups.forEach(g => { html += renderEqPollutantGroup(g); });
            html += '</div></div>';
            html += renderEqFeatures(cfg.features);
            html += renderEqCommonFields(true);
            return html;
        }

        // 检测设备：根据专业领域生成动态内容
        function generateMonitoringFieldContent(field) {
            const cfg = equipmentMonitoringConfig[field];
            if (!cfg) return '';
            let html = '';
            if (cfg.type === 'checkbox') {
                html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">检测内容 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">（可多选）</p><div class="space-y-2">';
                cfg.items.forEach(p => { html += '<label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer"><input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" type="checkbox" name="mon_content" value="'+p.v+'"/><span class="ml-2 text-on-surface-variant text-sm">'+p.l+'</span></label>'; });
                html += '</div></div>';
            } else if (cfg.type === 'inputs') {
                html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">核心性能（必填）</label><div class="space-y-3">';
                cfg.corePerf.forEach(f => { html += '<div><label class="block text-on-surface-variant text-sm mb-1">'+f.l+'</label><input type="text" name="'+f.n+'" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="'+f.ph+'"/></div>'; });
                html += '</div></div><div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">工况适应性（必填）</label><div class="space-y-3">';
                cfg.workCond.forEach(f => { html += '<div><label class="block text-on-surface-variant text-sm mb-1">'+f.l+'</label><input type="text" name="'+f.n+'" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="'+f.ph+'"/></div>'; });
                html += '</div></div>';
            } else if (cfg.type === 'grouped') {
                html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">检测设备类型 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">点击分类展开子选项，可多选</p><div class="space-y-1">';
                cfg.groups.forEach(g => { html += renderEqPollutantGroup(g); });
                html += '</div></div>';
            } else {
                html = '<div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm mt-4"><label class="block text-on-surface font-semibold text-sm mb-2">检测内容说明</label><textarea name="mon_other_content" rows="4" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="请根据情况填写检测内容说明"></textarea></div>';
            }
            html += renderEqCommonFields(false);
            return html;
        }

        // 主入口：设备类别选择后调用
        function generateEquipmentDynamicContent(type) {
            const container = document.getElementById('equipmentDynamicContent');
            const fieldOptions = type === 'treatment'
                ? '<option value="">请选择</option><option value="water">水处理</option><option value="air">大气污染治理</option><option value="solid">固废处理与综合利用</option><option value="water_eco">水生态修复</option><option value="soil">土壤修复</option><option value="energy">节能与碳减排</option>'
                : '<option value="">请选择</option><option value="water">水处理</option><option value="air">大气污染治理</option><option value="water_eco">水生态修复</option><option value="other">其他</option>';
            container.innerHTML = '<div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-primary mt-4"><label class="block text-on-surface font-semibold text-sm mb-3">专业领域 <span class="text-error">*</span></label><select name="equipment_field" required id="equipmentFieldSelect" class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">'+fieldOptions+'</select></div><div id="equipmentFieldDynamicContent"></div>';
            // 绑定专业领域选择事件
            document.getElementById('equipmentFieldSelect').addEventListener('change', function(e) {
                const fieldContent = document.getElementById('equipmentFieldDynamicContent');
                if (!e.target.value) { fieldContent.innerHTML = ''; return; }
                fieldContent.innerHTML = type === 'treatment'
                    ? generateTreatmentFieldContent(e.target.value)
                    : generateMonitoringFieldContent(e.target.value);
                bindEquipmentEvents();
            });
        }

        // 绑定设备类事件
        function bindEquipmentEvents() {
            // 污染物分组折叠
            document.querySelectorAll('.eq-pollutant-group-toggle').forEach(btn => {
                btn.addEventListener('click', function() {
                    const sub = document.getElementById(this.dataset.target);
                    const arrow = this.querySelector('.pg-arrow');
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    if (sub) sub.style.display = expanded ? 'none' : 'block';
                    if (arrow) arrow.style.transform = expanded ? '' : 'rotate(180deg)';
                    this.setAttribute('aria-expanded', String(!expanded));
                });
            });
            // 污染物带填写框
            document.querySelectorAll('.eq-pollutant-with-input').forEach(cb => {
                cb.addEventListener('change', function() {
                    const d = document.getElementById(this.dataset.inputId);
                    if (d) { d.style.display = this.checked ? 'block' : 'none'; if (!this.checked) { const i = d.querySelector('input'); if (i) i.value = ''; } }
                });
            });
            // 设备特点带填写框
            document.querySelectorAll('.eq-feature-with-input').forEach(cb => {
                cb.addEventListener('change', function() {
                    const d = document.getElementById(this.dataset.inputId);
                    if (d) {
                        d.style.display = this.checked ? 'block' : 'none';
                        if (!this.checked) {
                            d.querySelectorAll('input, textarea').forEach(i => {
                                i.value = '';
                            });
                        }
                    }
                });
            });
            bindRangePairInputs();
            // 添加行业
            const addBtn = document.getElementById('addEquipmentIndustry');
            if (addBtn) addBtn.addEventListener('click', () => addIndustryRow('equipmentIndustryContainer', 'equipment'));
            // 成熟度 -> 案例简介
            const matSel = document.getElementById('equipmentMaturitySelect');
            if (matSel) matSel.addEventListener('change', function(e) {
                const cs = document.getElementById('equipmentCaseSection');
                if (!cs) return;
                if (['demo','stable_2_4','stable_5plus'].includes(e.target.value)) {
                    cs.style.display = 'block';
                    ['equipmentCaseProjectName','equipmentCaseOwner','equipmentCaseContactName','equipmentCaseContactPhone'].forEach(id => document.getElementById(id)?.setAttribute('required','required'));
                } else {
                    cs.style.display = 'none';
                    ['equipmentCaseProjectName','equipmentCaseOwner','equipmentCaseContactName','equipmentCaseContactPhone'].forEach(id => document.getElementById(id)?.removeAttribute('required'));
                }
            });
            // 获奖情况 -> 获奖详情
            const awdSel = document.getElementById('equipmentHasAwardSelect');
            if (awdSel) awdSel.addEventListener('change', function(e) {
                const ad = document.getElementById('equipmentAwardDetails');
                const ag = document.getElementById('equipmentAwardGrade');
                if (!ad) return;
                if (e.target.value === 'yes') { ad.style.display = 'block'; ag?.setAttribute('required','required'); }
                else { ad.style.display = 'none'; ag?.removeAttribute('required'); document.querySelectorAll('input[name="equipment_award_level"]').forEach(c => c.checked = false); if (ag) ag.value = ''; }
            });
        }
        // ========== 事件绑定 ==========
        
        // ========== 单位搜索 & 自动填充 API 预留 ==========

        // TODO: 替换为实际的企业信息查询 API
        // 接口规范（GET）：
        //   请求：/api/company/search?keyword=关键词
        //   响应：{ list: [{ name, creditCode, legalPerson, establishDate }] }
        async function fetchCompanyList(keyword) {
            // ---- 接入真实 API 时，取消下方注释并删除 mock 数据 ----
            // const res = await fetch(`/api/company/search?keyword=${encodeURIComponent(keyword)}`);
            // const data = await res.json();
            // return data.list || [];

            // Mock 数据（仅用于开发测试，接入 API 后删除）
            return [];
        }

        // TODO: 替换为实际的企业详情查询 API
        // 接口规范（GET）：
        //   请求：/api/company/detail?name=单位全称
        //   响应：{ name, creditCode, legalPerson, establishDate }
        async function fetchCompanyDetail(companyName) {
            // ---- 接入真实 API 时，取消下方注释并删除 mock 数据 ----
            // const res = await fetch(`/api/company/detail?name=${encodeURIComponent(companyName)}`);
            // const data = await res.json();
            // return data;

            // Mock 数据（仅用于开发测试，接入 API 后删除）
            return null;
        }

        // 自动填充企业信息到表单
        function fillCompanyInfo(company) {
            if (!company) return;
            const creditCodeInput = document.getElementById('creditCodeInput');
            const legalPersonInput = document.getElementById('legalPersonInput');
            const establishDateInput = document.getElementById('establishDateInput');

            if (company.creditCode && creditCodeInput) {
                creditCodeInput.value = company.creditCode;
                creditCodeInput.classList.remove('border-error');
            }
            if (company.legalPerson && legalPersonInput) {
                legalPersonInput.value = company.legalPerson;
            }
            if (company.establishDate && establishDateInput) {
                // 统一转为 yyyy-MM-dd 格式
                establishDateInput.value = company.establishDate.slice(0, 10);
            }
        }

        // 渲染搜索结果下拉列表
        function renderCompanyResults(list) {
            const resultsBox = document.getElementById('companySearchResults');
            if (!list || list.length === 0) {
                resultsBox.classList.add('hidden');
                return;
            }
            resultsBox.innerHTML = list.map(item => `
                <div class="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-sm border-b border-outline-variant/10 last:border-0"
                     data-name="${item.name}">
                    <div class="font-medium text-on-surface">${item.name}</div>
                    <div class="text-xs text-on-surface-variant mt-0.5">${item.creditCode || ''}</div>
                </div>
            `).join('');
            resultsBox.classList.remove('hidden');

            // 点击某条结果
            resultsBox.querySelectorAll('[data-name]').forEach(el => {
                el.addEventListener('click', async () => {
                    const name = el.dataset.name;
                    document.getElementById('companyInput').value = name;
                    resultsBox.classList.add('hidden');

                    // 调用详情接口自动填充
                    const detail = await fetchCompanyDetail(name);
                    if (detail) {
                        fillCompanyInfo(detail);
                    } else {
                        // 如果列表里已经有完整信息，直接用
                        const found = list.find(i => i.name === name);
                        if (found) fillCompanyInfo(found);
                    }
                });
            });
        }

        // 绑定单位输入框的搜索事件
        function bindCompanySearch() {
            const companyInput = document.getElementById('companyInput');
            const resultsBox = document.getElementById('companySearchResults');
            if (!companyInput) return;

            let debounceTimer = null;

            companyInput.addEventListener('input', () => {
                const keyword = companyInput.value.trim();
                clearTimeout(debounceTimer);

                if (keyword.length < 2) {
                    resultsBox.classList.add('hidden');
                    return;
                }

                // 防抖 400ms
                debounceTimer = setTimeout(async () => {
                    const list = await fetchCompanyList(keyword);
                    renderCompanyResults(list);
                }, 400);
            });

            // 点击页面其他地方关闭下拉
            document.addEventListener('click', (e) => {
                if (!companyInput.contains(e.target) && !resultsBox.contains(e.target)) {
                    resultsBox.classList.add('hidden');
                }
            });
        }

        function bindEvents() {
            // 导航按钮
            nextBtn.addEventListener('click', handleNext);
            prevBtn.addEventListener('click', handlePrev);
            submitBtn.addEventListener('click', handleSubmit);
            saveDraftBtn.addEventListener('click', saveDraft);
            
            // 表单类型选择
            document.querySelectorAll('input[name="formType"]').forEach(radio => {
                radio.addEventListener('change', handleFormTypeChange);
            });
            
            // 工艺类：专业领域选择
            const processFieldSelect = document.getElementById('processFieldSelect');
            if (processFieldSelect) {
                processFieldSelect.addEventListener('change', function(e) {
                    if (e.target.value) {
                        generateProcessDynamicContent(e.target.value);
                    }
                });
            }
            
            // 材料类：专业领域选择
            const materialFieldSelect = document.getElementById('materialFieldSelect');
            if (materialFieldSelect) {
                materialFieldSelect.addEventListener('change', function(e) {
                    if (e.target.value) {
                        generateMaterialDynamicContent(e.target.value);
                    }
                });
            }
            
            // 设备类：设备类别选择
            const equipmentTypeSelect = document.getElementById('equipmentTypeSelect');
            if (equipmentTypeSelect) {
                equipmentTypeSelect.addEventListener('change', function(e) {
                    if (e.target.value) {
                        generateEquipmentDynamicContent(e.target.value);
                    }
                });
            }

            // 单位搜索自动填充
            bindCompanySearch();
        }
        
        // ========== 初始化 ==========
        
        function init() {
            // 检查是否刚提交过
            if (localStorage.getItem(SUBMITTED_KEY) === 'true') {
                localStorage.removeItem(SUBMITTED_KEY);
                localStorage.removeItem(STORAGE_KEY);
            } else {
                // 恢复草稿
                loadDraft();
            }
            
            updateStepDisplay();
            bindEvents();
        }
        
        // 页面加载完成后初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

