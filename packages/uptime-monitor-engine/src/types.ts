export enum ContentTypes {
  TEXT = 'text'
}

export enum Status {
  UP = 'up',
  DOWN = 'down'
}

export enum ContentRequirementsResult {
  FULFILLED = 'fulfilled',
  FAILED = 'failed'
}

export type UptimeMonitorContentRequirements = {
  type: string;
  value: string;
};

export type UptimeMonitorCheck = {
  url: string;
  contentRequirements: UptimeMonitorContentRequirements[];
};

export type UptimeMonitorConfig = {
  checks: UptimeMonitorCheck[];
};
