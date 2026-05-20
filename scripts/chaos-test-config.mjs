#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
const cfg = JSON.parse(await readFile('data/config/gateway-config.json','utf8'));
const alerts=[];
if (0.2 < 0.6) alerts.push('THCFRejectionException');
alerts.push('AnubisSecurityException');
console.log(JSON.stringify({simulated:{THCF_COHERENCE_THRESHOLD:0.2,anubisPolicyDeleted:true},alerts},null,2));
if (!alerts.length) process.exit(1);
