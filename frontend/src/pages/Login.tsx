import logo from "@/assets/img/logo.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useThemeStore from "../states/themeStore"

// AXIOS =======================
import axios, { AxiosResponse, AxiosError } from 'axios';

// Base URL configuration
const BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies (for JWT)
});

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// AXIOS ======================

const Login = () => {
  const navigate = useNavigate()
  const { lightBlue } = useThemeStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Replace with actual login logic
    if (email === "test@example.com" && password === "password123") {
      alert("Login successful!")
      navigate("/employee-home")
    } else {
      alert("Invalid email or password")
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div
        className="border-1 shadow-lg w-full max-w-md p-8 space-y-6"
        style={{ background: lightBlue }}
      >
        <div className="flex items-center gap-3">
          <img src={logo} width={40} height={40} alt="Logo" />
          <h2 className="text-xl font-bold text-black">Welcome Back</h2>
        </div>
        <hr />

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#ED8E6B] font-bold"
            onClick={async () => {

              try {
                const response = await api.post<ApiResponse<{ token: string }>>('auth/login', {
                  email,
                  password
                });

                const data = response.data;
                if (data.success) {
                  localStorage.setItem('token', data.data?.token || '');
                  alert("Login successful!")
                  navigate("/employee-home")
                }
              } catch (error) {
                alert("Login failed. Please check your credentials and try again.")
              }

            }}
          >
            Login
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline p-1"
            onClick={() => navigate("/registration")}
          >


          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
