# 详细实施步骤

## 当前状态
- 已备份原文件为 `survey_backup_20260405_000802.html`
- 已创建三个完整配置文件：
  - `process-config-complete.js` - 工艺类配置
  - `material-config-complete.js` - 材料类配置
  - `equipment-config-complete.js` - 设备类配置

## 实施方案

由于 survey.html 文件很大（3229行），我建议采用以下方案：

### 方案A：模块化整合（推荐）
1. 保持当前 survey.html 的 HTML 结构不变
2. 将三个配置文件的内容整合到 survey.html 的 `<script>` 标签中
3. 逐步测试每个模块

### 方案B：完全重写
创建一个全新的 survey.html，但这需要大量时间

## 推荐：方案A 的详细步骤

### 步骤1：整合配置对象

在 survey.html 的第 1392 行（`const processConfig = {` 之前），替换整个配置对象。

**需要替换的位置：**
- 第 1392-1700 行：processConfig 对象
- 需要添加：materialConfig 对象（完整）
- 需要添加：equipmentConfig 对象（完整）

### 步骤2：创建材料类动态表单生成函数

需要添加以下函数（在工艺类函数之后）：

```javascript
// ========== 材料类动态表单生成函数 ==========

function generateMaterialDynamicContent(field) {
    const config = materialConfig[field];
    const container = document.getElementById('materialDynamicContent');
    
    let html = '';
    
    // 1. 功能分类或工艺环节
    html += generateMaterialCategoriesSection(config, field);
    
    // 2. 应用行业
    html += generateIndustrySection('material');
    
    // 3. 成熟度
    html += generateMaturitySection('material');
    
    // 4. 案例简介（条件显示）
    html += generateCaseSection('material');
    
    // 5. 获奖情况
    html += generateAwardSection('material');
    
    container.innerHTML = html;
    
    // 绑定事件
    bindMaterialEvents(field);
}

function generateMaterialCategoriesSection(config, field) {
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
            // 带二级菜单的选项
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
            
            if (category.other) {
                html += `
                    <div>
                        <label class="flex items-center p-2 rounded-lg bg-surface-container-low/30 hover:bg-secondary-container/10 transition-colors cursor-pointer">
                            <input class="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary/20 material-sub-with-input" 
                                type="checkbox" name="material_category_${category.value}" value="other" data-input-id="material_cat_${category.value}_other_input"/>
                            <span class="ml-2 text-on-surface-variant text-xs">其他</span>
                        </label>
                        <div id="material_cat_${category.value}_other_input" class="pl-6 mt-2" style="display:none;">
                            <input type="text" name="material_category_${category.value}_other_detail" 
                                class="w-full bg-surface-container-low/30 border border-outline-variant/20 rounded-xl p-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="请填写其他"/>
                        </div>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
        } else {
            // 简单选项
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
    
    return html;
}

function bindMaterialEvents(field) {
    // 1. 带二级菜单的复选框
    document.querySelectorAll('.material-cat-with-sub').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const subId = this.dataset.subId;
            const subDiv = document.getElementById(subId);
            if (subDiv) {
                subDiv.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    // 清除所有子选项
                    subDiv.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                    subDiv.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
                }
            }
        });
    });
    
    // 2. 带填写框的复选框
    document.querySelectorAll('.material-cat-with-input, .material-sub-with-input').forEach(checkbox => {
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
    
    // 3. 成熟度变化 -> 控制案例简介显示
    const maturitySelect = document.getElementById('materialMaturitySelect');
    if (maturitySelect) {
        maturitySelect.addEventListener('change', function(e) {
            const value = e.target.value;
            const caseSection = document.getElementById('materialCaseSection');
            if (caseSection) {
                if (['demo', 'stable_2_4', 'stable_5plus'].includes(value)) {
                    caseSection.style.display = 'block';
                    // 设置必填
                    document.getElementById('materialCaseProjectName')?.setAttribute('required', 'required');
                    document.getElementById('materialCaseOwner')?.setAttribute('required', 'required');
                    document.getElementById('materialCaseContactName')?.setAttribute('required', 'required');
                    document.getElementById('materialCaseContactPhone')?.setAttribute('required', 'required');
                } else {
                    caseSection.style.display = 'none';
                    // 移除必填
                    document.getElementById('materialCaseProjectName')?.removeAttribute('required');
                    document.getElementById('materialCaseOwner')?.removeAttribute('required');
                    document.getElementById('materialCaseContactName')?.removeAttribute('required');
                    document.getElementById('materialCaseContactPhone')?.removeAttribute('required');
                }
            }
        });
    }
    
    // 4. 获奖情况变化
    const awardSelect = document.getElementById('materialHasAwardSelect');
    if (awardSelect) {
        awardSelect.addEventListener('change', function(e) {
            const awardDetails = document.getElementById('materialAwardDetails');
            const awardGrade = document.getElementById('materialAwardGrade');
            if (awardDetails) {
                if (e.target.value === 'yes') {
                    awardDetails.style.display = 'block';
                    awardGrade?.setAttribute('required', 'required');
                } else {
                    awardDetails.style.display = 'none';
                    awardGrade?.removeAttribute('required');
                    document.querySelectorAll('input[name="material_award_level"]').forEach(cb => cb.checked = false);
                    if (awardGrade) awardGrade.value = '';
                }
            }
        });
    }
    
    // 5. 添加行业按钮
    const addIndustryBtn = document.getElementById('addMaterialIndustry');
    if (addIndustryBtn) {
        addIndustryBtn.addEventListener('click', function() {
            addIndustryRow('materialIndustryContainer', 'material');
        });
    }
}
```

### 步骤3：创建设备类动态表单生成函数

这部分最复杂，因为设备类分为治理设备和检测设备两个分支。

### 步骤4：更新事件绑定

在 `bindEvents()` 函数中添加材料类和设备类的事件监听。

### 步骤5：测试

按照以下顺序测试：
1. 工艺类 - 水处理
2. 工艺类 - 其他5个领域
3. 材料类 - 所有6个领域
4. 设备类 - 治理设备 - 所有6个领域
5. 设备类 - 检测设备 - 所有4个领域

## 需要我帮你做什么？

由于文件太大，我建议：

1. **选项A**：我创建一个完整的新 survey.html 文件（需要分多次创建）
2. **选项B**：我创建一个 patch 文件，你手动应用更改
3. **选项C**：我逐步指导你修改现有文件的特定部分

请告诉我你希望采用哪种方式？
