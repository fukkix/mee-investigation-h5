// ========== 单位搜索 & 自动填充 API ==========

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
