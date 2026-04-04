# 接口说明文档

## 概览

本系统共需对接以下接口：

| 接口 | 用途 | 状态 |
|------|------|------|
| 企业搜索 | 输入单位名称关键词，返回匹配列表 | 待接入 |
| 企业详情 | 根据单位名称返回完整信息（信用代码、法人、成立时间） | 待接入 |
| 表单提交 | 提交填报数据 | 待接入 |

---

## 1. 企业搜索接口

**用途**：用户在"单位全称"输入框输入关键词时触发，展示下拉匹配列表

**触发条件**：输入字符 ≥ 2 个，防抖 400ms

**代码位置**：`survey.html` → `fetchCompanyList(keyword)`

### 请求

```
GET /api/company/search?keyword={关键词}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| keyword | string | 用户输入的单位名称关键词 |

### 响应

```json
{
  "list": [
    {
      "name": "某某环保科技有限公司",
      "creditCode": "91110000XXXXXXXX"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| list | array | 匹配的企业列表 |
| list[].name | string | 单位全称 |
| list[].creditCode | string | 统一社会信用代码（可选，用于下拉预览） |

### 接入方式

打开 `survey.html`，找到 `fetchCompanyList` 函数，取消注释并删除 mock 数据：

```javascript
async function fetchCompanyList(keyword) {
    // 取消下方注释：
    const res = await fetch(`/api/company/search?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    return data.list || [];

    // 删除这行 mock：
    // return [];
}
```

---

## 2. 企业详情接口

**用途**：用户从下拉列表点击某个企业后触发，自动填充信用代码、法定代表人、成立时间

**代码位置**：`survey.html` → `fetchCompanyDetail(companyName)`

### 请求

```
GET /api/company/detail?name={单位全称}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 单位全称（精确匹配） |

### 响应

```json
{
  "name": "某某环保科技有限公司",
  "creditCode": "91110000XXXXXXXX",
  "legalPerson": "张三",
  "establishDate": "2020-01-01"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 单位全称 |
| creditCode | string | 统一社会信用代码（18位） |
| legalPerson | string | 法定代表人姓名 |
| establishDate | string | 成立时间，格式 `yyyy-MM-dd` |

### 自动填充字段

接口返回后，系统自动填入以下表单字段：

| 接口字段 | 表单字段 | 元素 ID |
|---------|---------|---------|
| creditCode | 统一社会信用代码 | `creditCodeInput` |
| legalPerson | 法定代表人（负责人） | `legalPersonInput` |
| establishDate | 成立时间 | `establishDateInput` |

### 接入方式

打开 `survey.html`，找到 `fetchCompanyDetail` 函数，取消注释并删除 mock 数据：

```javascript
async function fetchCompanyDetail(companyName) {
    // 取消下方注释：
    const res = await fetch(`/api/company/detail?name=${encodeURIComponent(companyName)}`);
    const data = await res.json();
    return data;

    // 删除这行 mock：
    // return null;
}
```

---

## 3. 表单提交接口

**用途**：用户完成填报后点击"提交"按钮触发

**代码位置**：`survey.html` → `handleSubmit()`

### 请求

```
POST /api/survey/submit
Content-Type: application/json
```

### 请求体结构

```json
{
  "name": "姓名",
  "phone": "手机号",
  "email": "邮箱",
  "company": "单位全称",
  "creditCode": "统一社会信用代码",
  "legalPerson": "法定代表人",
  "establishDate": "成立时间",
  "formType": "process | material | equipment",
  "objectName": "工艺/材料/设备名称",

  // 工艺类字段（formType = process）
  "process_field": "water | air | solid | eco | soil | energy",
  "process_granularity": "综合型 | 特定功能型 | ...",
  "process_principle": ["physical", "chemical", ...],
  "process_maturity": "pilot_stable | demo | stable_2_4 | ...",
  "process_source": "overseas | domestic_innovation | ...",
  "process_industry_code[]": ["行业代码1", ...],
  "process_industry_major[]": ["大类1", ...],
  "process_industry_middle[]": ["中类1", ...],
  "process_industry_minor[]": ["小类1", ...],
  "process_stage": ["pretreatment", "main", ...],
  "process_feature": ["water_fluctuation", "compact", ...],
  "pollutant": ["codcr", "nh3n", ...],
  "case_project_name": "项目名称",
  "case_owner": "业主单位",
  "case_contact_name": "联系人",
  "case_contact_phone": "联系电话",
  "process_has_award": "yes | no",
  "process_award_level": ["national", "provincial", ...],
  "process_award_grade": "first | second | ...",

  // 材料类字段（formType = material）
  "material_field": "water | air | solid | eco | soil | energy",
  "material_category": ["filter", "membrane", ...],
  "material_industry_code[]": [...],
  "material_maturity": "...",
  "material_has_award": "yes | no",

  // 设备类字段（formType = equipment）
  "equipment_type": "treatment | monitoring",
  "equipment_field": "water | air | solid | ..."
}
```

### 响应

```json
{
  "code": 0,
  "message": "提交成功",
  "data": {
    "submitId": "唯一提交ID"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | number | 0 = 成功，非0 = 失败 |
| message | string | 提示信息 |
| data.submitId | string | 本次提交的唯一ID |

### 接入方式

打开 `survey.html`，找到 `handleSubmit` 函数，取消注释替换模拟提交：

```javascript
// 替换这段模拟提交：
// await new Promise(resolve => setTimeout(resolve, 1000));

// 改为真实请求：
const response = await fetch(SUBMIT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
const result = await response.json();
if (result.code !== 0) throw new Error(result.message);
```

同时更新 `survey.html` 顶部的 API 地址常量：

```javascript
const API_BASE = 'https://your-real-api.com'; // 替换为实际地址
```

---

## 错误处理规范

所有接口建议统一返回格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

| code | 含义 |
|------|------|
| 0 | 成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 500 | 服务器错误 |
