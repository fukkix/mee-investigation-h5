# 生态环境技术调查填报系统 - API接口文档

## 目录
1. [企业信息搜索接口](#1-企业信息搜索接口)
2. [表单提交接口](#2-表单提交接口)
3. [表单验证规则](#3-表单验证规则)
4. [业务逻辑说明](#4-业务逻辑说明)
5. [数据库设计建议](#5-数据库设计建议)

---

## 1. 企业信息搜索接口

### 接口说明
根据企业名称关键词搜索企业信息，用于自动填充企业基本信息。

### 请求信息

**接口地址：** `/api/company/search`

**请求方法：** `GET`

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 是 | 企业名称关键词（至少2个字符） |

**请求示例：**
```
GET /api/company/search?keyword=环保科技
```

### 响应信息

**响应格式：** JSON

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| message | string | 响应消息（可选） |
| companies | array | 企业信息列表 |

**companies数组元素结构：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 企业全称 |
| creditCode | string | 统一社会信用代码（18位） |
| legalPerson | string | 法定代表人姓名 |
| establishDate | string | 成立时间（格式：YYYY-MM-DD） |

**成功响应示例：**
```json
{
  "success": true,
  "companies": [
    {
      "name": "北京环保科技有限公司",
      "creditCode": "91110000MA01234567",
      "legalPerson": "张三",
      "establishDate": "2020-01-15"
    }
  ]
}
```

---

## 2. 表单提交接口

### 接口说明
提交完整的调查表数据。后台将根据手机号和企业信息自动处理用户和企业注册。

### 请求信息

**接口地址：** `/api/survey/submit`

**请求方法：** `POST`

**请求头：**
```
Content-Type: application/json
```

**请求体结构：**

```json
{
  "basicInfo": {
    "name": "填表人姓名",
    "phone": "13800138000",
    "email": "example@company.com",
    "company": "企业全称",
    "creditCode": "91110000MA01234567",
    "legalPerson": "法定代表人",
    "establishDate": "2020-01-15"
  },
  "formType": "process|material|equipment",
  "objectName": "技术/材料/设备名称",
  "detailData": {
    "field": "专业领域",
    "industries": [
      {
        "code": "C26",
        "major": "化学原料和化学制品制造业",
        "middle": "基础化学原料制造",
        "minor": "无机酸制造"
      }
    ],
    "features": ["compact", "unmanned"],
    "pollutants": ["cod", "nh3n"],
    // ... 其他详细数据根据formType不同而不同
  },
  "maturity": "3",
  "caseInfo": {
    "projectName": "项目名称",
    "owner": "业主单位",
    "contact": "联系人及方式"
  },
  "awardInfo": {
    "hasAward": true,
    "levels": ["national", "provincial"],
    "grade": "first"
  },
  "submittedAt": "2024-01-15T10:30:00Z"
}
```

### 响应信息

**成功响应：**
```json
{
  "success": true,
  "message": "提交成功",
  "data": {
    "surveyId": "SURVEY_2024_001",
    "isNewUser": true,
    "isNewCompany": false,
    "userInfo": {
      "userId": "USER_001",
      "phone": "13800138000",
      "role": "技术成员",
      "defaultPassword": "Eco@2024",
      "needChangePassword": true
    },
    "companyInfo": {
      "companyId": "COMP_001",
      "name": "企业全称",
      "adminCreated": false
    }
  }
}
```

**失败响应：**
```json
{
  "success": false,
  "message": "提交失败：数据验证错误",
  "errors": [
    {
      "field": "phone",
      "message": "手机号格式不正确"
    }
  ]
}
```

---

## 3. 表单验证规则

### 3.1 手机号验证

**规则：** 11位数字，以1开头，第二位为3-9

**正则表达式：** `/^1[3-9]\d{9}$/`

**错误提示：** "请输入正确的11位手机号"

### 3.2 邮箱验证

**规则：** 标准邮箱格式

**正则表达式：** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**错误提示：** "请输入正确的邮箱格式"

### 3.3 统一社会信用代码验证

**规则：** 18位，由数字或大写英文字母组成

**正则表达式：** `/^[0-9A-Z]{18}$/`

**错误提示：** "请输入正确的18位统一社会信用代码"

---

## 4. 业务逻辑说明

### 4.1 企业注册逻辑

**判断依据：** 统一社会信用代码

**新企业处理流程：**

1. **检查企业是否存在**
   - 根据统一社会信用代码查询企业表
   - 如果不存在，执行新企业注册流程

2. **自动保存为新企业**
   ```sql
   INSERT INTO companies (
     credit_code, 
     name, 
     legal_person, 
     establish_date,
     created_at
   ) VALUES (?, ?, ?, ?, NOW())
   ```

3. **创建企业管理员账号**
   - 角色：企业负责人（拥有企业管理权限）
   - 账号：使用法定代表人信息
   - 密码：系统生成默认密码
   - 权限：
     - 查看本企业所有提交的调查表
     - 管理本企业的技术成员
     - 修改企业基本信息
     - 审核本企业提交的调查表

4. **关联提交用户至该企业**
   ```sql
   UPDATE users 
   SET company_id = ? 
   WHERE user_id = ?
   ```

**已存在企业处理流程：**

1. 检查提交用户是否已关联该企业
2. 如果未关联，将用户关联至该企业
3. 不创建新的管理员账号

### 4.2 用户注册逻辑

**判断依据：** 手机号

**新用户处理流程：**

1. **检查用户是否存在**
   - 根据手机号查询用户表
   - 如果不存在，执行新用户注册流程

2. **自动注册为新用户**
   ```sql
   INSERT INTO users (
     phone,
     name,
     email,
     role,
     password_hash,
     default_password,
     need_change_password,
     created_at
   ) VALUES (?, ?, ?, '技术成员', ?, ?, TRUE, NOW())
   ```

3. **用户角色和权限**
   - 角色：技术成员（普通用户权限）
   - 权限：
     - 提交调查表
     - 查看自己提交的调查表
     - 修改个人信息
     - 不能查看其他人提交的调查表

4. **生成默认密码**
   - 格式建议：`Eco@2024` 或 `手机号后6位`
   - 密码需要加密存储（使用bcrypt或类似算法）
   - 同时保存明文默认密码用于首次登录提示

**已存在用户处理流程：**

1. 直接使用现有用户信息
2. 不修改用户密码
3. 如果用户未关联企业，则关联至提交的企业

### 4.3 表单提交规则

**重要规则：**

1. **多类型提交**
   - 同一用户可以提交多种不同类型的调查表
   - 工艺类、材料类、设备类互不影响

2. **不覆盖历史记录**
   - 每次提交都生成新的独立记录
   - 不会覆盖之前提交的数据
   - 每条记录都有唯一的surveyId

3. **数据存储**
   ```sql
   INSERT INTO surveys (
     survey_id,
     user_id,
     company_id,
     form_type,
     object_name,
     detail_data,
     maturity,
     submitted_at,
     status
   ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
   ```

4. **状态管理**
   - pending：待审核
   - approved：已通过
   - rejected：已驳回
   - draft：草稿（前端本地保存）

### 4.4 Web端登录流程

**首次登录流程：**

1. **用户输入手机号和密码**
   ```
   POST /api/auth/login
   {
     "phone": "13800138000",
     "password": "Eco@2024"
   }
   ```

2. **后端验证**
   - 检查手机号是否存在
   - 验证密码是否正确
   - 检查 `need_change_password` 字段

3. **响应处理**
   ```json
   {
     "success": true,
     "token": "JWT_TOKEN",
     "user": {
       "userId": "USER_001",
       "name": "张三",
       "phone": "13800138000",
       "role": "技术成员",
       "needChangePassword": true,
       "defaultPassword": "Eco@2024"
     }
   }
   ```

4. **前端处理**
   - 如果 `needChangePassword` 为 true
   - 显示初始密码提示弹窗
   - 强制跳转到修改密码页面
   - 不允许访问其他页面

**修改密码接口：**

```
POST /api/auth/change-password
{
  "oldPassword": "Eco@2024",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

**密码验证规则：**
- 新密码不能与默认密码相同
- 长度至少8位
- 必须包含大小写字母、数字
- 建议包含特殊字符

---

## 5. 数据库设计建议

### 5.1 用户表 (users)

```sql
CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  phone VARCHAR(11) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  role ENUM('企业负责人', '技术成员') NOT NULL,
  company_id VARCHAR(50),
  password_hash VARCHAR(255) NOT NULL,
  default_password VARCHAR(50),
  need_change_password BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_company (company_id)
);
```

### 5.2 企业表 (companies)

```sql
CREATE TABLE companies (
  company_id VARCHAR(50) PRIMARY KEY,
  credit_code VARCHAR(18) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  legal_person VARCHAR(100) NOT NULL,
  establish_date DATE NOT NULL,
  admin_user_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_credit_code (credit_code),
  INDEX idx_name (name)
);
```

### 5.3 调查表 (surveys)

```sql
CREATE TABLE surveys (
  survey_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  company_id VARCHAR(50) NOT NULL,
  form_type ENUM('process', 'material', 'equipment') NOT NULL,
  object_name VARCHAR(200) NOT NULL,
  detail_data JSON NOT NULL,
  maturity INT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewer_id VARCHAR(50),
  review_comment TEXT,
  INDEX idx_user (user_id),
  INDEX idx_company (company_id),
  INDEX idx_status (status),
  INDEX idx_form_type (form_type),
  INDEX idx_submitted_at (submitted_at)
);
```

### 5.4 应用行业表 (survey_industries)

```sql
CREATE TABLE survey_industries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id VARCHAR(50) NOT NULL,
  industry_code VARCHAR(50) NOT NULL,
  major_category VARCHAR(200) NOT NULL,
  middle_category VARCHAR(200) NOT NULL,
  minor_category VARCHAR(200) NOT NULL,
  INDEX idx_survey (survey_id),
  FOREIGN KEY (survey_id) REFERENCES surveys(survey_id) ON DELETE CASCADE
);
```

---

## 6. 前端需要调整的地方

### 6.1 提交成功后的处理

**当前代码位置：** `survey.html` 约第2500行 `handleSubmit` 函数

**需要添加的逻辑：**

```javascript
// 提交成功后
if (data.success) {
    // 显示提交成功信息
    let message = '提交成功！';
    
    // 如果是新用户，显示登录信息
    if (data.data.isNewUser) {
        message += `\n\n您的账号已自动创建：`;
        message += `\n手机号：${data.data.userInfo.phone}`;
        message += `\n初始密码：${data.data.userInfo.defaultPassword}`;
        message += `\n\n请使用以上信息登录Web端，首次登录需修改密码。`;
    }
    
    // 如果创建了新企业管理员
    if (data.data.companyInfo.adminCreated) {
        message += `\n\n企业管理员账号已创建，相关信息将通过邮件发送给企业负责人。`;
    }
    
    alert(message);
    
    // 清除表单和草稿
    localStorage.setItem(SUBMITTED_KEY, 'true');
    localStorage.removeItem(STORAGE_KEY);
    
    // 重置表单
    form.reset();
    currentStep = 1;
    selectedFormType = null;
    updateStepDisplay();
    window.scrollTo(0, 0);
}
```

### 6.2 多次提交提示

**建议添加：**

在表单顶部添加提示信息，说明可以多次提交：

```html
<div class="bg-primary-container/10 p-4 rounded-xl mb-4">
    <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">info</span>
        <p class="text-sm text-primary">
            您可以多次提交不同类型的调查表，每次提交都会生成独立的记录，不会覆盖之前的数据。
        </p>
    </div>
</div>
```

---

## 7. 后端接口清单

### 必须实现的接口：

1. **企业搜索** - `GET /api/company/search`
2. **表单提交** - `POST /api/survey/submit`
3. **用户登录** - `POST /api/auth/login`
4. **修改密码** - `POST /api/auth/change-password`
5. **获取用户信息** - `GET /api/user/profile`
6. **获取提交历史** - `GET /api/survey/list`

### 可选接口：

7. **行业代码查询** - `GET /api/industry/classify?code=C26`
8. **草稿保存** - `POST /api/survey/draft`
9. **草稿恢复** - `GET /api/survey/draft`

---

## 8. 安全建议

1. **密码安全**
   - 使用bcrypt加密存储
   - 默认密码强度要求
   - 强制首次登录修改密码

2. **数据验证**
   - 前后端双重验证
   - 防止SQL注入
   - 防止XSS攻击

3. **权限控制**
   - 基于角色的访问控制（RBAC）
   - 企业数据隔离
   - API接口鉴权

4. **审计日志**
   - 记录所有提交操作
   - 记录登录日志
   - 记录密码修改日志

---

## 9. 联系方式

如有问题，请联系开发团队。
