import { useState } from "react";
import { Check, ExternalLink, Wrench, Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";

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
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();

  const t = useTranslations();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickPresets = [
    {
      name: "OpenAI",
      endpoint: "https://api.openai.com",
      model: "gpt-4o",
      link: "https://platform.openai.com/api-keys",
      icon: "🤖"
    },
    {
      name: "DeepSeek",
      endpoint: "https://api.deepseek.com",
      model: "deepseek-chat",
      link: "https://platform.deepseek.com",
      icon: "🐋"
    },
    {
      name: "Gemini (OpenAI Compatible)",
      endpoint: "https://generativelanguage.googleapis.com/v1beta/openai",
      model: "gemini-2.0-flash",
      link: "https://aistudio.google.com/app/apikey",
      icon: "✨"
    },
    {
      name: "Ollama (Local)",
      endpoint: "http://localhost:11434",
      model: "llama3",
      link: "https://ollama.ai",
      icon: "🦙"
    },
    {
      name: "OpenRouter",
      endpoint: "https://openrouter.ai/api",
      model: "openai/gpt-4",
      link: "https://openrouter.ai/keys",
      icon: "🔗"
    },
    {
      name: "Azure OpenAI",
      endpoint: "https://YOUR_RESOURCE.openai.azure.com",
      model: "gpt-4",
      link: "https://portal.azure.com",
      icon: "☁️"
    }
  ];

  const handlePresetSelect = (preset: typeof quickPresets[0]) => {
    setCustomProviderName(preset.name);
    setCustomApiEndpoint(preset.endpoint);
    setCustomModelId(preset.model);
    setSelectedModel("custom");
  };

  const isConfigured = customProviderName && customApiKey && customApiEndpoint && customModelId;

  return (
    <div className="mx-auto py-4 px-4 max-w-3xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-green-500" />
            {t("dashboard.settings.ai.custom.title") || "AI Provider Configuration"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("dashboard.settings.ai.custom.description") || "Configure any AI provider with OpenAI-compatible API"}
          </p>
        </div>

        {/* Quick Presets */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            {t("dashboard.settings.ai.custom.quickPresets") || "Quick Presets"}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={cn(
                  "p-3 rounded-lg border text-left transition-all",
                  "hover:border-primary hover:bg-primary/5",
                  customProviderName === preset.name && "border-primary bg-primary/10"
                )}
              >
                <div className="text-2xl mb-1">{preset.icon}</div>
                <div className="font-medium text-sm">{preset.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {preset.model}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Configuration Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">
              {t("dashboard.settings.ai.custom.providerName")}
            </Label>
            <Input
              value={customProviderName}
              onChange={(e) => setCustomProviderName(e.target.value)}
              placeholder="My AI Provider"
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-900",
                "border-gray-200 dark:border-gray-800",
                "focus:ring-2 focus:ring-primary/20"
              )}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">
              {t("dashboard.settings.ai.custom.apiEndpoint")}
            </Label>
            <Input
              value={customApiEndpoint}
              onChange={(e) => setCustomApiEndpoint(e.target.value)}
              placeholder="https://api.example.com/v1"
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-900",
                "border-gray-200 dark:border-gray-800",
                "focus:ring-2 focus:ring-primary/20"
              )}
            />
            <p className="text-xs text-muted-foreground">
              {t("dashboard.settings.ai.custom.endpointHint") || "API base URL (e.g., https://api.openai.com or http://localhost:11434)"}
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">
              {t("dashboard.settings.ai.custom.modelId")}
            </Label>
            <Input
              value={customModelId}
              onChange={(e) => setCustomModelId(e.target.value)}
              placeholder="gpt-4o, claude-3-sonnet, llama3, etc."
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-900",
                "border-gray-200 dark:border-gray-800",
                "focus:ring-2 focus:ring-primary/20"
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                {t("dashboard.settings.ai.custom.apiKey")}
              </Label>
              {customProviderName && (
                <a
                  href={quickPresets.find(p => p.name === customProviderName)?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  {t("dashboard.settings.ai.getApiKey")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <Input
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              type="password"
              placeholder="sk-xxxxxxxxxxxx"
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-900",
                "border-gray-200 dark:border-gray-800",
                "focus:ring-2 focus:ring-primary/20"
              )}
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm"
          >
            {showAdvanced ? "▼" : "▶"} {t("dashboard.settings.ai.custom.advanced") || "Advanced Settings"}
          </Button>

          {showAdvanced && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("dashboard.settings.ai.custom.advancedHint") || "These settings are automatically configured based on your provider."}
              </p>
              <div className="space-y-2">
                <Label className="text-sm">Computed API URL</Label>
                <code className="block p-2 bg-background rounded text-xs">
                  {customApiEndpoint && customApiEndpoint.endsWith("/chat/completions")
                    ? customApiEndpoint
                    : customApiEndpoint?.endsWith("/v1")
                      ? `${customApiEndpoint}/chat/completions`
                      : `${customApiEndpoint}/v1/chat/completions`}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className={cn(
          "p-4 rounded-lg border",
          isConfigured ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
        )}>
          <div className="flex items-center gap-2">
            {isConfigured ? <Check className="h-5 w-5 text-green-600" /> : <Sparkles className="h-5 w-5 text-yellow-600" />}
            <span className="font-medium">
              {isConfigured
                ? t("dashboard.settings.ai.custom.configured") || "✓ Provider configured and ready to use"
                : t("dashboard.settings.ai.custom.notConfigured") || "⚠ Please fill in all fields to enable AI features"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
