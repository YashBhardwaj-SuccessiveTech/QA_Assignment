import * as fs from "fs";
import * as path from "path";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export class Logger {
  private logDir: string;
  private logFile: string;
  private testName: string;

  constructor(testName: string) {
    this.testName = testName;
    this.logDir = "reports/logs";
    this.logFile = path.join(
      this.logDir,
      `${Logger.sanitizeFileName(testName)}.log`,
    );

    fs.mkdirSync(this.logDir, { recursive: true });
    this.clearLog();
  }

  private static sanitizeFileName(value: string): string {
    return value
      .replace(/[<>:"/\\|?*\x00-\x1F]+/g, "_")
      .replace(/\s+/g, "_")
      .slice(0, 200);
  }

  private formatLog(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.testName}] ${message}`;
  }

  private writeToFile(formattedMessage: string): void {
    fs.appendFileSync(this.logFile, formattedMessage + "\n");
  }

  debug(message: string): void {
    const formatted = this.formatLog(LogLevel.DEBUG, message);
    console.log(formatted);
    this.writeToFile(formatted);
  }

  info(message: string): void {
    const formatted = this.formatLog(LogLevel.INFO, message);
    console.log(formatted);
    this.writeToFile(formatted);
  }

  warn(message: string): void {
    const formatted = this.formatLog(LogLevel.WARN, message);
    console.warn(formatted);
    this.writeToFile(formatted);
  }

  error(message: string, error?: Error): void {
    const errorDetails = error ? `\n${error.stack}` : "";
    const formatted = this.formatLog(LogLevel.ERROR, message + errorDetails);
    console.error(formatted);
    this.writeToFile(formatted);
  }

  getLogFilePath(): string {
    return this.logFile;
  }

  getLogContent(): string {
    return fs.readFileSync(this.logFile, "utf-8");
  }

  clearLog(): void {
    fs.writeFileSync(this.logFile, "");
  }
}
