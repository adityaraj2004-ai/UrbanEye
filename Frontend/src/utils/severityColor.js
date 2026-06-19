const COLORS = {
    low: '#22c55e',
    medium: '#f97316',
    high: '#ef4444',
    critical: '#7f1d1d',
  };
  
  const BG = {
    low: 'bg-green-500/10 text-green-400 border border-green-500/20',
    medium: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    high: 'bg-red-500/10 text-red-400 border border-red-500/20',
    critical: 'bg-red-900/20 text-red-300 border border-red-900/40',
  };
  
  export function getSeverityColor(severity) {
    return COLORS[severity] || '#6b7280';
  }
  
  export function getSeverityBg(severity) {
    return BG[severity] || 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20';
  }
  
  export function getSeverityLabel(severity) {
    if (!severity) return 'Unknown';
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  }
  