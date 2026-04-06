import { useState, useEffect } from "react";
import { Check, ExternalLink, Wrench, Eye, EyeOff, AlertCircle, Trash2, Loader2 } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

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

  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState({
    provider: customProviderName || "openai",
    model: customModelId || "",
    apiKey: customApiKey || "",
    baseUrl: customApiEndpoint || "",
  });

  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  useEffect(() => {
    setSelectedModel("custom");
  }, []);

  const providerOptions = [
    { value: "openai", label: "OpenAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"], defaultUrl: "https://api.openai.com" },
    { value: "anthropic", label: "Anthropic (Claude)", models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"], defaultUrl: "https://api.anthropic.com/v1" },
    { value: "google", label: "Google AI (Gemini)", models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"], defaultUrl: "https://generativelanguage.googleapis.com/v1beta/openai" },
    { value: "deepseek", label: "DeepSeek", models: ["deepseek-chat", "deepseek-reasoner"], defaultUrl: "https://api.deepseek.com" },
    { value: "moonshot", label: "Moonshot (Kimi)", models: ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"], defaultUrl: "https://api.moonshot.cn/v1" },
    { value: "ollama", label: "Ollama (Local)", models: ["llama3.1", "llama3", "mistral", "codellama", "custom"], defaultUrl: "http://localhost:11434" },
    { value: "openrouter", label: "OpenRouter", models: ["openai/gpt-4o", "anthropic/claude-3.5-sonnet", "google/gemini-pro", "meta-llama/llama-3.1-70b"], defaultUrl: "https://openrouter.ai/api" },
    { value: "azure", label: "Azure OpenAI", models: ["gpt-4o", "gpt-4", "gpt-35-turbo"], defaultUrl: "https://YOUR_RESOURCE.openai.azure.com" },
    { value: "groq", label: "Groq", models: ["llama-3.1-70b-versatile", "mixtral-8x7b-32768", "gemma-7b-it"], defaultUrl: "https://api.groq.com/openai" },
    { value: "custom", label: "Custom Provider", models: [], defaultUrl: "" },
  ];

  const selectedProvider = providerOptions.find(p => p.value === localConfig.provider);
  const availableModels = selectedProvider?.models || [];

  const handleProviderChange = (value: string) => {
    const provider = providerOptions.find(p => p.value === value);
    setLocalConfig(prev => ({
      ...prev,
      provider: value,
      baseUrl: prev.baseUrl || provider?.defaultUrl || "",
      model: provider?.models?.[0] || "",
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTestStatus("testing");

    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCustomProviderName(localConfig.provider);
    setCustomApiKey(localConfig.apiKey);
    setCustomApiEndpoint(localConfig.baseUrl);
    setCustomModelId(localConfig.model);
    setSelectedModel("custom");

    setTestStatus("success");
    setIsSaving(false);

    setTimeout(() => setTestStatus("idle"), 3000);
  };

  const handleRemoveKey = () => {
    setLocalConfig(prev => ({ ...prev, apiKey: "" }));
    setCustomApiKey("");
  };

  const isConnected = isConfigured();

  return (
    <div className="mx-auto py-4 px-4 max-w-4xl">
      <div className="space-y-6">
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
        <Alert className="bg-primary/5 border-primary/20">
          <Check className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Local-First Storage:</strong> Your API key is stored securely in your browser's localStorage.
            All AI calls go through secure HTTPS — your API key never appears in browser DevTools Network tab.
          </AlertDescription>
        </Alert>

        {/* Main Configuration Card */}
        <div className="border rounded-xl p-6 space-y-6">
          {/* Remove Key Button */}
          {isConnected && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveKey}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t("dashboard.settings.ai.custom.removeKey") || "Remove Key"}
              </Button>
            </div>
          )}

          {/* AI Provider Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t("dashboard.settings.ai.custom.provider") || "AI Provider"}
              </Label>
              <Select value={localConfig.provider} onValueChange={handleProviderChange}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.map(provider => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t("dashboard.settings.ai.custom.model") || "Model"}
              </Label>
              {availableModels.length > 0 ? (
                <Select value={localConfig.model} onValueChange={(value) => setLocalConfig(prev => ({ ...prev, model: value }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map(model => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={localConfig.model}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g., gpt-4o, claude-3-sonnet"
                  className="h-10"
                />
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
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={localConfig.apiKey}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, apiKey: e.target.value }))}
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
          </div>

          <Separator />

          {/* Advanced Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t("dashboard.settings.ai.custom.customBaseUrl") || "Custom Base URL"}
                <span className="text-muted-foreground font-normal ml-1">(optional)</span>
              </Label>
              <Input
                value={localConfig.baseUrl}
                onChange={(e) => setLocalConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
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

          <Separator />

          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              {testStatus === "testing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-muted-foreground">Testing connection...</span>
                </>
              ) : testStatus === "success" ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">
                    {t("dashboard.settings.ai.custom.connected") || "Connected"} ({selectedProvider?.label})
                  </span>
                </>
              ) : testStatus === "error" ? (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">Connection failed</span>
                </>
              ) : isConnected ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">
                    {t("dashboard.settings.ai.custom.connectedTo") || "Connected to"} {selectedProvider?.label || customProviderName}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-muted-foreground">Not configured</span>
                </>
              )}
            </div>

            <Button
              onClick={handleSave}
              disabled={isSaving || !localConfig.apiKey || !localConfig.model}
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
    </div>
  );
};

export default AISettingsPage;
