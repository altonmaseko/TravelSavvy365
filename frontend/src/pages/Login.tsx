import logo from "@/assets/img/logo.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useThemeStore from "../states/themeStore"
import { toast } from 'react-hot-toast';

import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const { lightBlue } = useThemeStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        "email": email,
        "password": password,
      })

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        toast.success("Login successful! Redirecting...")


        navigate("/home")
      } else {
        toast.error("Login failed! Please check your credentials.")
      }
    } catch (error) {
      // give error from response
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Login failed: ${error.response.data.message || 'An error occurred'}`);
      } else {
        toast.error("Login failed! Please try again later.");
      }
    }

  }

  return (
    <div className="w-screen h-full flex items-center justify-center ">
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
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
