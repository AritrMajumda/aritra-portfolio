import fs from 'fs';

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

let c = fs.readFileSync('work/index.html', 'utf8');

c = replaceAll(c, 'Accommodating Extractivism\u2028 (Postdoctoral project)', 'Project Nexus-DS v2.0\u2028(Autonomous Multi-Agent System)');
c = replaceAll(c, 'Accommodating Extractivism\u2028(DFG-funded project)', 'Project Nexus-DS v2.0\u2028(Full Operational Blueprint)');
c = replaceAll(c, 'Mobile Architecture and Fly-in, Fly-out Urbanism in Western Siberia (1964-1992)', 'Autonomous Data Science Pipeline with Causal Inference & Self-Correcting Agents');
c = replaceAll(c, 'Giproteatr at Work \u2028(PhD project)', 'Regime-Adaptive HFT\u2028(Independent Research)');
c = replaceAll(c, 'Giproteatr at Work (PhD project)', 'Regime-Adaptive HFT\u2028(Independent Research)');
c = replaceAll(c, 'Practices of Architecture at the Soviet Theatre Design Institute (1953\u20131992)', 'Stochastic Control in Non-Stationary Markets using Avellaneda-Stoikov Framework');

fs.writeFileSync('work/index.html', c);
console.log('Work page fixed!');
