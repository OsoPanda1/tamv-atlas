const SUPPORTED_MODALITIES = ['text', 'voice', 'image'];

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
}

export function createIsabellaEngine() {
  const ledger = [];
  const plugins = new Map([
    ['rag-secretaria', { id: 'rag-secretaria', enabled: true }],
    ['gobernanza', { id: 'gobernanza', enabled: false }],
  ]);

  function appendLedger(type, detail) {
    const entry = {
      id: `evt_${ledger.length + 1}`,
      type,
      timestamp: new Date().toISOString(),
      detail,
    };
    ledger.push(entry);
    return entry;
  }

  return {
    chat({ input = '', modality = 'text', profile = 'general' } = {}) {
      const normalizedInput = normalizeText(input);
      if (!normalizedInput) {
        throw new Error('input is required');
      }
      if (!SUPPORTED_MODALITIES.includes(modality)) {
        throw new Error(`unsupported modality: ${modality}`);
      }

      const response = {
        answer: `Isabella IA procesó (${modality}): ${normalizedInput}`,
        profile,
        safeguards: ['privacy-minimization', 'human-override-ready'],
      };

      const ledgerEvent = appendLedger('chat', {
        modality,
        profile,
        inputLength: normalizedInput.length,
      });

      return { response, ledgerEvent };
    },

    vision({ mode = 'scene', source = '' } = {}) {
      const result = {
        mode,
        source,
        labels: ['persona', 'objeto', 'escena'],
      };
      const ledgerEvent = appendLedger('vision', { mode, hasSource: Boolean(source) });
      return { result, ledgerEvent };
    },

    audio({ mode = 'analysis', transcript = '' } = {}) {
      const result = {
        mode,
        transcript,
        emotion: transcript ? 'calm' : 'neutral',
      };
      const ledgerEvent = appendLedger('audio', { mode, hasTranscript: Boolean(transcript) });
      return { result, ledgerEvent };
    },

    haptics({ pattern = 'pulse', intensity = 0.5 } = {}) {
      if (intensity < 0 || intensity > 1) {
        throw new Error('intensity must be between 0 and 1');
      }
      const result = { pattern, intensity };
      const ledgerEvent = appendLedger('haptics', result);
      return { result, ledgerEvent };
    },

    registerLedgerEvent(payload = {}) {
      return appendLedger(payload.type ?? 'custom', payload.detail ?? payload);
    },

    getLedgerEvent(id) {
      return ledger.find((entry) => entry.id === id) ?? null;
    },

    listPlugins() {
      return Array.from(plugins.values());
    },

    installPlugin(id) {
      const pluginId = normalizeText(id);
      if (!pluginId) {
        throw new Error('plugin id is required');
      }
      const plugin = { id: pluginId, enabled: true };
      plugins.set(pluginId, plugin);
      appendLedger('plugin.install', { id: pluginId });
      return plugin;
    },
  };
}
