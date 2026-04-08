// ========== 材料类动态表单生成 ==========
        
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
