"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface ThresholdSliderProps {
  label: string
  description?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function ThresholdSlider({ label, description, value, onChange, min = 0, max = 100 }: ThresholdSliderProps) {
  return (
    <div className="space-y-2">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer rounded-lg bg-gray-200 accent-emerald-600"
          />
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="w-8 text-right">{min}%</span>
          <span className="px-2 font-medium text-gray-900">{value}%</span>
          <span className="w-8">{max}%</span>
        </div>
      </div>
    </div>
  )
}

interface AIConfigSettings {
  enableAutoApproval: boolean
  riskThreshold: number
  confidenceThreshold: number
  ocrTextExtraction: boolean
  facialRecognition: boolean
  formatValidation: boolean
  tamperingDetection: boolean
  documentQualityThreshold: number
  faceMatchConfidence: number
  ocrConfidenceThreshold: number
  autoRejectHighRisk: boolean
  autoRejectLowConfidence: boolean
  autoRejectFailedCompliance: boolean
}

interface AIConfigPanelProps {
  appType: string
  configType: "pre-incorporation" | "post-incorporation" | "insolvency"
  defaultSettings?: Partial<AIConfigSettings>
}

export function AIConfigPanel({ appType, configType, defaultSettings }: AIConfigPanelProps) {
  const [settings, setSettings] = useState<AIConfigSettings>({
    enableAutoApproval: false,
    riskThreshold: 75,
    confidenceThreshold: 75,
    ocrTextExtraction: true,
    facialRecognition: true,
    formatValidation: true,
    tamperingDetection: true,
    documentQualityThreshold: 80,
    faceMatchConfidence: 75,
    ocrConfidenceThreshold: 80,
    autoRejectHighRisk: true,
    autoRejectLowConfidence: true,
    autoRejectFailedCompliance: true,
    ...defaultSettings,
  })

  const handleToggle = (key: keyof AIConfigSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }))
  }

  const handleThresholdChange = (key: keyof AIConfigSettings, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getStatusMessage = () => {
    if (!settings.enableAutoApproval) return null

    const messages: Record<string, string> = {
      "name-reservation": "Auto-Approval Enabled For Name Reservation",
      "consent-names": "Auto-Approval Enabled For Consent Names",
      "company-account": "Auto-Approval Enabled For Name Reservation",
      "company-insolvency": "Auto-Approval Enabled For Insolvency",
    }

    return messages[appType] || "Auto-Approval Enabled"
  }

  return (
    <div className="space-y-6">
      {/* Enable Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Enable AI Auto-Approval</h3>
              <p className="text-sm text-gray-600">Automatically approve applications meeting all criteria</p>
            </div>
            <Switch checked={settings.enableAutoApproval} onCheckedChange={() => handleToggle("enableAutoApproval")} />
          </div>
        </CardContent>
      </Card>

      {/* Status Alert */}
      {settings.enableAutoApproval && getStatusMessage() && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="ml-2 text-blue-700">{getStatusMessage()}</AlertDescription>
        </Alert>
      )}

      {/* Threshold Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Threshold Settings</CardTitle>
          <CardDescription>
            {configType === "pre-incorporation" && appType.includes("name")
              ? "Configure scoring thresholds for name reservation"
              : "Configure scoring thresholds for applications"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <ThresholdSlider
            label={
              appType.includes("name") || configType === "pre-incorporation" ? "Similarity Threshold" : "Risk Threshold"
            }
            description={
              appType.includes("name")
                ? "Applications above this threshold will be flagged"
                : "Applications above this threshold will be flagged"
            }
            value={settings.riskThreshold}
            onChange={(value) => handleThresholdChange("riskThreshold", value)}
          />

          <ThresholdSlider
            label="Confidence Threshold for Auto-Approval"
            description="Minimum AI confidence required"
            value={settings.confidenceThreshold}
            onChange={(value) => handleThresholdChange("confidenceThreshold", value)}
          />
        </CardContent>
      </Card>

      {/* Document Verification Engine */}
      {configType !== "insolvency" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Verification Engine</CardTitle>
            <CardDescription>Configure document verification and validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                {
                  key: "ocrTextExtraction",
                  label: "OCR Text Extraction",
                  description: "Extract text from documents for analysis",
                },
                {
                  key: "facialRecognition",
                  label: "Facial Recognition",
                  description: "Detect and verify faces in documents",
                },
                {
                  key: "formatValidation",
                  label: "Format Validation",
                  description: "Validate document formats and files",
                },
                {
                  key: "tamperingDetection",
                  label: "Tampering Detection",
                  description: "Detect document tampering or forgery",
                },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <Switch
                    checked={settings[key as keyof AIConfigSettings] as boolean}
                    onCheckedChange={() => handleToggle(key as keyof AIConfigSettings)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quality Thresholds */}
      {configType !== "insolvency" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quality Thresholds</CardTitle>
            <CardDescription>Configure quality and confidence requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ThresholdSlider
              label="Document Quality Threshold"
              description="Minimum quality score for documents"
              value={settings.documentQualityThreshold}
              onChange={(value) => handleThresholdChange("documentQualityThreshold", value)}
            />

            <ThresholdSlider
              label="Face Match Confidence"
              description="Minimum confidence for face matching"
              value={settings.faceMatchConfidence}
              onChange={(value) => handleThresholdChange("faceMatchConfidence", value)}
            />

            <ThresholdSlider
              label="OCR Confidence Threshold"
              description="Minimum confidence for text extraction"
              value={settings.ocrConfidenceThreshold}
              onChange={(value) => handleThresholdChange("ocrConfidenceThreshold", value)}
            />
          </CardContent>
        </Card>
      )}

      {/* Risk Assessment / KYC Requirements */}
      {configType === "insolvency" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Assessment Rules</CardTitle>
            <CardDescription>Configure risk assessment criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-gray-700">Director conduct assessment</p>
              <p className="text-sm text-gray-700">Creditor verification</p>
              <p className="text-sm text-gray-700">Asset valuation required</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KYC Requirements for Company Accounts */}
      {configType === "post-incorporation" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">KYC Requirements</CardTitle>
            <CardDescription>Configure KYC verification requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-gray-700">PEP screening</p>
              <p className="text-sm text-gray-700">Sanctions check</p>
              <p className="text-sm text-gray-700">Adverse media</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Restricted Words for Name Reservation */}
      {appType === "name-reservation" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Restricted Words</CardTitle>
            <CardDescription>Configure scoring thresholds for name reservation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Add Restricted Words
              </Button>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-gray-700">Federal</p>
                <p className="text-sm text-gray-700">Bank</p>
                <p className="text-sm text-gray-700">Government</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consent Config for Consent Names */}
      {appType === "consent-names" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consent Config</CardTitle>
            <CardDescription>Configure consent requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-700">Federal</p>
              <p className="text-sm text-gray-700">Bank</p>
              <p className="text-sm text-gray-700">Government</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto-Reject Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Auto-Reject Conditions</CardTitle>
          <CardDescription>Configure automatic rejection triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              key: "autoRejectHighRisk",
              label: "High-risk flag detected",
              description: "Auto-reject if critical risk identified",
            },
            {
              key: "autoRejectLowConfidence",
              label: "Confidence below 50%",
              description: "Auto-reject if AI confidence is very low",
            },
            {
              key: "autoRejectFailedCompliance",
              label: "Failed compliance checks",
              description: "Auto-reject if mandatory checks fail",
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <Switch
                checked={settings[key as keyof AIConfigSettings] as boolean}
                onCheckedChange={() => handleToggle(key as keyof AIConfigSettings)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent">
          Reset to Default
        </Button>
        <Button className="bg-emerald-700 hover:bg-emerald-800">Save Configuration</Button>
      </div>
    </div>
  )
}
