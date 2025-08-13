"use client"

import type React from "react"
import { useState } from "react"
import { AlertCircle, CheckCircle, CreditCard, Shield, Zap, Loader2 } from "lucide-react"

interface TransactionData {
  transactionId: string
  transactionDate: string
  amount: string
  merchantId: string
  transactionType: string
  location: string
}

export default function FraudDetectionPage() {
  const [formData, setFormData] = useState<TransactionData>({
    transactionId: "",
    transactionDate: "",
    amount: "",
    merchantId: "",
    transactionType: "",
    location: "",
  })

  const [prediction, setPrediction] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof TransactionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const simulateFraudDetection = (data: TransactionData): number => {
    // Simple simulation logic - in real app this would call ML model
    const amount = Number.parseFloat(data.amount)
    const isHighAmount = amount > 5000
    const isSuspiciousType = data.transactionType === "online" || data.transactionType === "atm"

    // Higher chance of fraud for high amounts or suspicious types
    if (isHighAmount && isSuspiciousType) {
      return Math.random() > 0.3 ? 1 : 0
    } else if (isHighAmount || isSuspiciousType) {
      return Math.random() > 0.7 ? 1 : 0
    } else {
      return Math.random() > 0.9 ? 1 : 0
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = simulateFraudDetection(formData)
    setPrediction(result)
    setIsLoading(false)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background with floating elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Floating animated elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-reverse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse-slow"></div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Enhanced header with glassmorphism and animations */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-4 shadow-2xl">
                <Shield className="h-12 w-12 text-cyan-400 animate-shield-glow" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
              AI Fraud Detection
            </h1>
            <p className="text-slate-300 text-lg font-medium">Advanced machine learning powered transaction analysis</p>
          </div>

          {/* Enhanced form card with glassmorphism and hover effects */}
          <div className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up animation-delay-200 rounded-lg">
            <div className="border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold">Transaction Analysis</h2>
                  <p className="text-slate-400">Enter transaction details for AI-powered fraud detection</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label
                      htmlFor="transactionId"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Transaction ID
                    </label>
                    <input
                      id="transactionId"
                      placeholder="TXN123456789"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange("transactionId", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="transactionDate"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Transaction Date
                    </label>
                    <input
                      id="transactionDate"
                      type="datetime-local"
                      value={formData.transactionDate}
                      onChange={(e) => handleInputChange("transactionDate", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label
                      htmlFor="amount"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Amount ($)
                    </label>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="merchantId"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Merchant ID
                    </label>
                    <input
                      id="merchantId"
                      placeholder="MERCH001"
                      value={formData.merchantId}
                      onChange={(e) => handleInputChange("merchantId", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label
                      htmlFor="transactionType"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Transaction Type
                    </label>
                    <select
                      id="transactionType"
                      value={formData.transactionType}
                      onChange={(e) => handleInputChange("transactionType", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    >
                      <option value="" disabled className="text-slate-500">
                        Select type
                      </option>
                      <option value="purchase" className="text-white">Purchase</option>
                      <option value="online" className="text-white">Online</option>
                      <option value="atm" className="text-white">ATM Withdrawal</option>
                      <option value="transfer" className="text-white">Transfer</option>
                      <option value="refund" className="text-white">Refund</option>
                    </select>
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="location"
                      className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      placeholder="New York, NY"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/10 rounded-md px-4 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    isLoading ? "cursor-wait" : ""
                  }`}
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="animate-pulse">Analyzing Transaction...</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce animation-delay-100"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce animation-delay-200"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5" />
                      Analyze with AI
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Enhanced results card with dramatic animations */}
          {prediction !== null && (
            <div
              className={`mt-8 backdrop-blur-xl border-2 shadow-2xl transition-all duration-700 animate-fade-in-up animation-delay-300 rounded-lg ${
                prediction === 0
                  ? "bg-emerald-500/10 border-emerald-400/30 hover:shadow-emerald-500/20"
                  : "bg-red-500/10 border-red-400/30 hover:shadow-red-500/20"
              }`}
            >
              <div className="pt-8 pb-8 px-6">
                <div className="text-center">
                  {prediction === 0 ? (
                    <div className="space-y-6 animate-success-reveal">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse-glow"></div>
                        <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto relative animate-check-bounce" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-text-shimmer">
                          Transaction Verified
                        </h3>
                        <p className="text-slate-300 text-lg">
                          ✅ This transaction appears to be legitimate and secure
                        </p>
                        <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
                          <Shield className="h-4 w-4" />
                          <span>AI Confidence: 94.7%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-danger-reveal">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse-danger"></div>
                        <AlertCircle className="h-20 w-20 text-red-400 mx-auto relative animate-alert-shake" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent animate-text-shimmer">
                          Fraud Detected
                        </h3>
                        <p className="text-slate-300 text-lg">
                          ⚠️ This transaction has been flagged as potentially fraudulent
                        </p>
                        <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium">
                          <AlertCircle className="h-4 w-4" />
                          <span>Risk Level: High (87.3%)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="mt-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 py-2 px-6 rounded-lg"
                    onClick={() => {
                      setPrediction(null)
                      setFormData({
                        transactionId: "",
                        transactionDate: "",
                        amount: "",
                        merchantId: "",
                        transactionType: "",
                        location: "",
                      })
                    }}
                  >
                    Analyze Another Transaction
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}