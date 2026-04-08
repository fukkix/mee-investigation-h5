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
            
            // 6. 工艺环节（条件显示）- 使用配置的stageOptions或默认选项
            if (config.showStageWhen && config.showStageWhen.length > 0) {
                const stageOptions = config.stageOptions || [
                    { value: 'pretreatment', label: '预处理（一级）' },
                    { value: 'main', label: '主处理（二级）' },
                    { value: 'advanced', label: '深度处理（三级）' },
                    { value: 'post', label: '后处理' }
                ];
                html += `
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container mt-4" id="processStageSection" style="display:none;">
                        <label class="block text-on-surface font-semibold text-base mb-3">
                            工艺环节（选填）
                        </label>
                        <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                        <div class="space-y-3">
                            ${stageOptions.map(opt => `
                            <label class="flex items-center p-3 rounded-xl bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-5 h-5 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="process_stage" value="${opt.value}"/>
                                <span class="ml-3 text-on-surface-variant font-medium">${opt.label}</span>
                            </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // 6b. 固废工艺分类（仅固废领域）
            if (config.processClassification) {
                html += `
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4">
                        <label class="block text-on-surface font-semibold text-base mb-3">
                            工艺分类 <span class="text-error">*</span>
                        </label>
                        <p class="text-xs text-on-surface-variant mb-3">（可多选）</p>
                        <div class="space-y-2">
                            ${config.processClassification.map(opt => `
                            <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20" 
                                    type="checkbox" name="process_classification" value="${opt.value}"/>
                                <span class="ml-2 text-on-surface-variant text-sm">${opt.label}</span>
                            </label>
                            `).join('')}
                            ${config.processClassificationOther ? `
                            <div>
                                <label class="flex items-center p-2 rounded-lg bg-surface-container-low/50 hover:bg-secondary-container/20 transition-colors cursor-pointer">
                                    <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 feature-with-input" 
                                        type="checkbox" name="process_classification" value="other" data-input-id="process_classification_other_input"/>
                                    <span class="ml-2 text-on-surface-variant text-sm">其他</span>
                                </label>
                                <div id="process_classification_other_input" class="pl-6 mt-2" style="display:none;">
                                    <input type="text" name="process_classification_other_detail" 
                                        class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="请填写其他工艺分类"/>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
            
            // 7. 工艺特点（所有有features配置的领域）
            if (config.features) {
                html += generateFeaturesSection(config.features, field);
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

        
        function generateFeaturesSection(features, field) {
            const fieldPrefix = field || 'process';
            let html = `
                <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary mt-4">
                    <label class="block text-on-surface font-semibold text-base mb-3">
                        工艺特点 ${field === 'water' ? '<span class="text-error">*</span>' : ''}
                    </label>
                    <p class="text-xs text-on-surface-variant mb-3">（可多选${field !== 'water' ? '，选填' : ''}）</p>
                    <div class="space-y-2">
            `;
            
            // 带二级菜单的选项
            if (features.withInput) {
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
        
        // ── 通用辅助：渲染一个可折叠的污染物分组 ──────────────────────────
        // groupId:  唯一ID前缀
        // label:    分组名称（父项文字）
        // items:    子项数组 [{ value, label, hasInput?, placeholder? }]
        // extraItems: 分组末尾的带填写框独立项（specialOther / newPollutant 等）
        function renderPollutantGroup(groupId, label, items, extraItems) {
            const subId = `pollutant_sub_${groupId}`;
            let subHtml = '';
            
            if (items && items.length) {
                items.forEach(p => {
                    if (p.hasInput) {
                        const iid = `pollutant_input_${p.value}`;
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
                            placeholder="${placeholder}"/>
                    </div>
                </div>`;
        }

        // ── 污染物治理对象完整区块 ───────────────────────────────────────
        function generatePollutantsSection(pollutants, field) {
            let inner = '';

            if (field === 'water') {
                inner += renderPollutantGroup('conventional', '常规污染物', pollutants.conventional);
                inner += renderPollutantGroup('heavyMetal', '重金属污染物', pollutants.heavyMetal);
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
                inner += renderPollutantGroup('pollutionControl_conv', '污染治理型 - 常规污染物',
                    pollutants.pollutionControl.conventional);
                if (pollutants.pollutionControl.heavyMetal)
                    inner += renderPollutantGroup('pollutionControl_heavy', '污染治理型 - 重金属污染物',
                        pollutants.pollutionControl.heavyMetal);
                if (pollutants.pollutionControl.special)
                    inner += renderPollutantGroup('pollutionControl_spec', '污染治理型 - 特殊污染物',
                        pollutants.pollutionControl.special);
                if (pollutants.pollutionControl.newPollutant)
                    inner += renderPollutantStandalone('eco_new_pollutant', '污染治理型 - 新污染物', '请填写新污染物');
                if (pollutants.pollutionControl.other)
                    inner += renderPollutantStandalone('eco_pollution_other', '污染治理型 - 其他', '请填写其他');
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
