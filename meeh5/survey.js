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

        // 将"起始值/结束值"两个输入同步为一个隐藏字段，保持原有提交字段兼容
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

        // ========== 事件绑定（调用各模块函数） ==========

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

