export const INCIDENT_CATEGORIES = [
    { value: 'accident', label: 'Accident' },
    { value: 'pothole', label: 'Pothole' },
    { value: 'road_blockage', label: 'Road Blockage' },
    { value: 'traffic_signal_failure', label: 'Traffic Signal Failure' },
    { value: 'waterlogging', label: 'Waterlogging' },
    { value: 'dangerous_road', label: 'Dangerous Road' },
    { value: 'other', label: 'Other' },
  ];
  
  export const SEVERITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  };
  
  export const INCIDENT_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };
  
  export const ROLES = {
    CITIZEN: 'citizen',
    ADMIN: 'admin',
  };