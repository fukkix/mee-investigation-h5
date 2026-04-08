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
                html = '<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container mt-4"><label class="block text-on-surface font-semibold text-base mb-3">检测内容 <span class="text-error">*</span></label><p class="text-xs text-on-surface-variant mb-3">点击分类展开子选项，可多选</p><div class="space-y-1">';
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
