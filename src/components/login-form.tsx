"use client"

import { FormEvent, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function LoginFormComponent() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    if (formData.email === "admin" && formData.password === "Admin123*") {
      router.push('/clients');
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center">
          <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 80L50 20L80 80L50 60L20 80Z" fill="url(#logo-gradient)" />
            <defs>
              <linearGradient id="logo-gradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B00" />
                <stop offset="0.5" stopColor="#FF0000" />
                <stop offset="1" stopColor="#9900FF" />
              </linearGradient>
            </defs>
          </svg>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Enter your credentials to access your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleForm}>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-white">Email or Username</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email or username"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-fit h-full px-2 hover:bg-transparent hover:text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Log in
          </Button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-orange-400 hover:text-orange-300">Forgot your password?</a>
        </div>
      </div>
    </div>
  )
}