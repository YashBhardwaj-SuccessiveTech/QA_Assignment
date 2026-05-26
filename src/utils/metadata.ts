import os from "os";

export interface ExecutionMetadata {
  testName: string;
  browser: string;
  os: string;
  platform: string;
  nodeVersion: string;
  timestamp: string;
  workingDirectory: string;
}

export class MetadataCollector {
  static collectEnvironmentMetadata(testName: string): ExecutionMetadata {
    return {
      testName,
      browser: "chromium",
      os: os.type(),
      platform: os.platform(),
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
      workingDirectory: process.cwd()
    };
  }

  static formatMetadata(metadata: ExecutionMetadata): string {
    return `
=== EXECUTION METADATA ===
Test Name: ${metadata.testName}
Browser: ${metadata.browser}
OS: ${metadata.os}
Platform: ${metadata.platform}
Node Version: ${metadata.nodeVersion}
Timestamp: ${metadata.timestamp}
Working Directory: ${metadata.workingDirectory}
=======================
`;
  }
}
