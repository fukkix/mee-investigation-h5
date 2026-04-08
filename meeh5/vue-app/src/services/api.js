// API 服务模块 — Mock 实现

let debounceTimer = null

export async function fetchCompanyList(keyword) {
  // Mock: 实际项目替换为真实 API
  console.log('搜索企业:', keyword)
  return []
}

export async function fetchCompanyDetail(companyName) {
  // Mock: 实际项目替换为真实 API
  console.log('获取企业详情:', companyName)
  return null
}

export function debounce(fn, delay) {
  return function (...args) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => fn.apply(this, args), delay)
  }
}
