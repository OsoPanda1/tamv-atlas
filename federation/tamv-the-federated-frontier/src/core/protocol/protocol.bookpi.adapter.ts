import { BookPi } from "../memory/bookpi";

export class ProtocolBookPiAdapter {
  constructor(private readonly bookPi: BookPi) {}

  narrate(title: string, plainSummary: string, sourceEventId: string): string {
    return this.bookPi.narrate(title, plainSummary, sourceEventId).id;
  }
}
