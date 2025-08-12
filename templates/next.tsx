import React from "react"
import { useState } from "react"

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = (field: keyof TransactionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const simulateFraudDetection = async (data: TransactionData): Promise<number> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple mock prediction logic
    const amount = parseFloat(data.amount) || 0
    const suspiciousAmount = amount > 10000
    const suspiciousTime = new Date().getHours() < 6 || new Date().getHours() > 22
    
    if (suspiciousAmount || suspiciousTime) {
      return Math.random() > 0.3 ? 1 : 0 // Higher chance of fraud
    }
    
    return Math.random() > 0.8 ? 1 : 0 // Lower chance of fraud
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await simulateFraudDetection(formData)
      setPrediction(result)
    } catch (error) {
      console.error('Error predicting fraud:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      transactionId: "",
      transactionDate: "",
      amount: "",
      merchantId: "",
      transactionType: "",
      location: "",
    })
    setPrediction(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Credit Card Fraud Detection</h1>
          <p className="text-gray-600 mt-2">Enter transaction details to check for potential fraud</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                placeholder="Enter transaction ID"
                value={formData.transactionId}
                onChange={(e) => handleInputChange("transactionId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Date
              </label>
              <input
                id="transactionDate"
                type="datetime-local"
                value={formData.transactionDate}
                onChange={(e) => handleInputChange("transactionDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="merchantId" className="block text-sm font-medium text-gray-700 mb-1">
                Merchant ID
              </label>
              <input
                id="merchantId"
                type="text"
                placeholder="Enter merchant ID"
                value={formData.merchantId}
                onChange={(e) => handleInputChange("merchantId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <select
                id="transactionType"
                value={formData.transactionType}
                onChange={(e) => handleInputChange("transactionType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="purchase">Purchase</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="transfer">Transfer</option>
                <option value="refund">Refund</option>
                <option value="payment">Payment</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Analyzing..." : "Detect Fraud"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className={`mt-6 p-4 rounded-md ${
            prediction === 1 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                prediction === 1 ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
              <div>
                <h3 className={`font-semibold ${
                  prediction === 1 ? 'text-red-800' : 'text-green-800'
                }`}>
                  {prediction === 1 ? 'Potential Fraud Detected!' : 'Transaction Appears Normal'}
                </h3>
                <p className={`mt-1 text-sm ${
                  prediction === 1 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {prediction === 1 
                    ? 'This transaction shows suspicious patterns. Please review manually.' 
                    : 'This transaction appears to be legitimate based on the analysis.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}