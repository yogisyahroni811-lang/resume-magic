"use client";

import { useState, useEffect } from "react";
import { Check, Wrench, Eye, EyeOff, AlertCircle, Trash2, Loader2, ChevronDown } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";

const providerOptions = [
  { value: "openai", label: "OpenAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"], defaultUrl: "https://api.openai.com" },
  { value: "anthropic", label: "Anthropic (Claude)", models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"], defaultUrl: "https://api.anthropic.com/v1" },
  { value: "google", label: "Google AI (Gemini)", models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"], defaultUrl: "https://generativelanguage.googleapis.com/v1beta/openai" },
  { value: "deepseek", label: "DeepSeek", models: ["deepseek-chat", "deepseek-reasoner"], defaultUrl: "https://api.deepseek.com" },
  { value: "moonshot", label: "Moonshot (Kimi)", models: ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"], defaultUrl: "https://api.moonshot.cn/v1" },
  { value: "ollama", label: "Ollama (Local)", models: ["llama3.1", "llama3", "mistral", "codellama"], defaultUrl: "http://localhost:11434" },
  { value: "openrouter", label: "OpenRouter", models: ["openai/gpt-4o", "anthropic/claude-3.5-sonnet", "google/gemini-pro"], defaultUrl: "https://openrouter.ai/api" },
  { value: "azure", label: "Azure OpenAI", models: ["gpt-4o", "gpt-4", "gpt-35-turbo"], defaultUrl: "https://YOUR_RESOURCE.openai.azure.com" },
  { value: "groq", label: "Groq", models: ["llama-3.1-70b-versatile", "mixtral-8x7b-32768", "gemma-7b-it"], defaultUrl: "https://api.groq.com/openai" },
  { value: "custom", label: "Custom Provider", models: [], defaultUrl: "" },
];

const AISettingsPage = () => {
  const {
    customProviderName,
    customApiKey,
    customApiEndpoint,
    customModelId,
    setCustomProviderName,
    setCustomApiKey,
    setCustomApiEndpoint,
    setCustomModelId,
    setSelectedModel,
    isConfigured,
  } = useAIConfigStore();

  const t = useTranslations();

  const [mounted, setMounted] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    setSelectedModel("custom");

    // Load existing config
    if (customProviderName) setProvider(customProviderName);
    if (customModelId) setModel(customModelId);
    if (customApiKey) setApiKey(customApiKey);
    if (customApiEndpoint) setBaseUrl(customApiEndpoint);
  }, []);

  const selectedProvider = providerOptions.find(p => p.value === provider);
  const availableModels = selectedProvider?.models || [];

  const handleProviderChange = (value: string) => {
    const prov = providerOptions.find(p => p.value === value);
    setProvider(value);
    if (prov?.defaultUrl && !baseUrl) {
      setBaseUrl(prov.defaultUrl);
    }
    if (prov?.models?.length) {
      setModel(prov.models[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Save to store
    setCustomProviderName(provider);
    setCustomApiKey(apiKey);
    setCustomApiEndpoint(baseUrl);
    setCustomModelId(model);
    setSelectedModel("custom");

    setTimeout(() => setIsSaving(false), 500);
  };

  const handleRemoveKey = () => {
    setApiKey("");
    setCustomApiKey("");
  };

  if (!mounted) {
    return <div className="p-8">Loading...</div>;
  }

  const isConnected = isConfigured();

  return (
    <div className="mx-auto py-4 px-4 max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          {t("dashboard.settings.ai.custom.title") || "AI Configuration"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground ml-14">
          {t("dashboard.settings.ai.custom.description") || "Connect your preferred AI provider — 10+ providers supported"}
        </p>
      </div>

      {/* Security Notice */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
        <Check className="h-4 w-4 text-primary inline mr-2" />
        <strong>Local-First Storage:</strong> Your API key is stored securely in your browser's localStorage.
        All AI calls go through secure HTTPS — your API key never appears in browser DevTools Network tab.
      </div>

      {/* Main Configuration Card */}
      <div className="border rounded-xl p-6 space-y-6">
        {/* Remove Key Button */}
        {isConnected && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveKey}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("dashboard.settings.ai.custom.removeKey") || "Remove Key"}
            </Button>
          </div>
        )}

        {/* AI Provider & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("dashboard.settings.ai.custom.provider") || "AI Provider"}
            </Label>
            <select
              value={provider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {providerOptions.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("dashboard.settings.ai.custom.model") || "Model"}
            </Label>

            {/* Model Dropdown with Custom Option */}
            <div className="relative">
              <select
                value={model}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setModel("");
                  } else {
                    setModel(e.target.value);
                  }
                }}
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                {availableModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
                <option value="__custom__">✏️ Custom Model...</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>

            {/* Custom Model Input (shown when "Custom Model" selected) */}
            {model === "" && (
              <div className="flex gap-2">
                <Input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Type custom model ID..."
                  className="h-10 flex-1"
                  autoFocus
                />
                <Button
                  size="sm"
                  className="h-10 px-4"
                >
                  Set
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* API Key */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <span>🔑</span>
            {t("dashboard.settings.ai.custom.apiKey") || "API Key"}
            {isConnected && (
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                {t("dashboard.settings.ai.custom.keySaved") || "Key saved"}
              </span>
            )}
          </Label>
          <div className="relative">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={showApiKey ? "text" : "password"}
              placeholder={isConnected ? "(leave blank to keep existing)" : "sk-xxxxxxxxxxxx"}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <hr className="border-border" />

        {/* Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("dashboard.settings.ai.custom.customBaseUrl") || "Custom Base URL"}
              <span className="text-muted-foreground font-normal ml-1">(optional)</span>
            </Label>
            <Input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com/v1"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("dashboard.settings.ai.custom.maxTokens") || "Max Tokens"}
            </Label>
            <Input
              type="number"
              placeholder="40000"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("dashboard.settings.ai.custom.temperature") || "Temperature"}
            </Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="2"
              placeholder="0.1"
              className="h-10"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* Connection Status & Save Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-muted-foreground">Saving...</span>
              </>
            ) : isConnected ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400">
                  {t("dashboard.settings.ai.custom.connectedTo") || "Connected to"} {selectedProvider?.label || provider}
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-muted-foreground">{t("dashboard.settings.ai.custom.notConfigured") || "Not configured"}</span>
              </>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || !apiKey || !model}
            className="min-w-[160px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("common.saving") || "Saving..."}
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                {t("dashboard.settings.ai.custom.saveConfiguration") || "Save Configuration"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
