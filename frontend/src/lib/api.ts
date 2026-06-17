import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
})

// 请求拦截器：后续在此注入 token
api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：统一错误处理
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status
    if (status === 401) {
      // TODO: 跳转登录
    }
    return Promise.reject(err.response?.data ?? err)
  },
)

export default api
