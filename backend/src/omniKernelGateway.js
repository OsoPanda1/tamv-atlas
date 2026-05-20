import { createHash, randomBytes } from 'node:crypto';
import { EventEmitter } from 'node:events';

export class DekateorlEngine {
  constructor(strictMode = true) {
    this.strictMode = strictMode;
    this.violationPatterns = [/\b(exploit|manipulate|deceive|harm|abuse)\b/i, /\b(propaganda|misinformation|fake\s+news)\b/i];
    this.hardStopKeywords = ['child exploitation', 'hate speech', 'terrorism'];
  }
  async evaluate(input = '') {
    const text = String(input).toLowerCase();
    const violations = [];
    for (const k of this.hardStopKeywords) if (text.includes(k)) violations.push(`Hard Stop: ${k}`);
    if (violations.length) return { approved: false, riskScore: 1, violations, hardStopTriggered: true, explanation: 'HARD STOP', timestamp: new Date().toISOString() };
    for (const p of this.violationPatterns) if (p.test(text)) violations.push(`Pattern:${p.source}`);
    const risk = Math.min(1, violations.length * 0.2);
    return { approved: this.strictMode ? risk < 0.3 : risk < 0.5, riskScore: risk, violations, hardStopTriggered: false, explanation: risk < 0.3 ? 'approved' : 'blocked', timestamp: new Date().toISOString() };
  }
}

export class BookPIChain {
  constructor() { this.chain = [this.#genesis()]; }
  #hash(block) { return createHash('sha256').update(JSON.stringify(block)).digest('hex'); }
  #genesis() { const b = { index: 0, timestamp: new Date().toISOString(), type: 'GENESIS', data: {}, previousHash: '0'.repeat(64), nonce: randomBytes(8).toString('hex') }; return { ...b, currentHash: this.#hash(b) }; }
  recordEvent(type, data) { const prev = this.chain[this.chain.length - 1]; const b = { index: this.chain.length, timestamp: new Date().toISOString(), type, data, previousHash: prev.currentHash, nonce: randomBytes(8).toString('hex') }; const block = { ...b, currentHash: this.#hash(b) }; this.chain.push(block); return block.currentHash; }
  verifyIntegrity() { for (let i = 1; i < this.chain.length; i += 1) if (this.chain[i].previousHash !== this.chain[i - 1].currentHash) return false; return true; }
}

export class AnubisSentinel {
  constructor(max = 0.75) { this.max = max; }
  async analyzeRequest(_user, payload) { const size = JSON.stringify(payload ?? {}).length; const score = size > 50000 ? 0.8 : 0.05; return { anomalyScore: score, threatLevel: score >= this.max ? 'high' : 'low', violations: score >= this.max ? ['payload-size'] : [], timestamp: new Date().toISOString() }; }
  shouldBlock(m) { return m.anomalyScore >= this.max; }
}

export class OmniKernelGatewayV5 extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = { defaultDailyLimit: 1000, ENABLE_BOOKPI: true, ENABLE_ANUBIS_SENTINEL: true, ENABLE_DEKATEORL_FILTER: true, MAX_ANOMALY_SCORE: 0.75, ...config };
    this.users = new Map();
    this.dekateorl = new DekateorlEngine(true);
    this.bookpi = new BookPIChain();
    this.anubis = new AnubisSentinel(this.config.MAX_ANOMALY_SCORE);
    this.metrics = { totalRequests: 0, successfulRequests: 0, blockedByDekateorl: 0, blockedByAnubis: 0 };
  }
  registerUser(isni, name) {
    const u = { isni, name, todayUsage: 0, totalUsage: 0, dailyLimit: this.config.defaultDailyLimit, createdAt: new Date().toISOString(), tamvCredits: 100, trustScore: 1 };
    this.users.set(isni, u);
    const hash = this.bookpi.recordEvent('USER_REGISTRATION', { isni, name });
    return { ...u, registrationHash: hash };
  }
  async processRequest(isni, requestType, payload) {
    this.metrics.totalRequests += 1;
    const u = this.users.get(isni);
    if (!u) return { approved: false, blockReason: 'Usuario no encontrado', metrics: {} };
    const anubis = await this.anubis.analyzeRequest(isni, payload);
    if (this.config.ENABLE_ANUBIS_SENTINEL && this.anubis.shouldBlock(anubis)) { this.metrics.blockedByAnubis += 1; return { approved: false, blockReason: 'ANUBIS block', metrics: { anubis } }; }
    const dek = await this.dekateorl.evaluate(payload?.content ?? '');
    if (this.config.ENABLE_DEKATEORL_FILTER && !dek.approved) { this.metrics.blockedByDekateorl += 1; return { approved: false, blockReason: dek.explanation, metrics: { anubis, dekateorl: dek } }; }
    if (u.todayUsage + 1 > u.dailyLimit) return { approved: false, blockReason: 'Cuota diaria excedida', metrics: { anubis, dekateorl: dek } };
    u.todayUsage += 1; u.totalUsage += 1; this.metrics.successfulRequests += 1;
    const bookpiHash = this.bookpi.recordEvent('REQUEST_PROCESSED', { isni, requestType });
    return { approved: true, result: { status: 'success', requestType, isni, processedAt: new Date().toISOString() }, metrics: { anubis, dekateorl: dek, bookpiHash } };
  }
  buildSystemStatus() { return { federation: { mode: 'hybrid', layers: { L0_Dekateorl: 'ACTIVE', L2_BookPI: 'ACTIVE', L3_ANUBIS: 'ACTIVE' } }, metrics: { ...this.metrics, activeUsers: this.users.size }, bookpi: { chainLength: this.bookpi.chain.length, integrityValid: this.bookpi.verifyIntegrity() } }; }
  getUserMetrics(isni) { return this.users.get(isni) ?? null; }
}

export function createOmniKernelGateway(config = {}) { return new OmniKernelGatewayV5(config); }
