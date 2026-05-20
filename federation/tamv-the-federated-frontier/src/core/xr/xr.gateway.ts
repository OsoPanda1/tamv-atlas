export interface XrGatewayEvent {
  type: string;
  payload: Record<string, unknown>;
}

export class XrGateway {
  private listeners = new Set<(event: XrGatewayEvent) => void>();

  subscribe(listener: (event: XrGatewayEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  publish(event: XrGatewayEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }
}
