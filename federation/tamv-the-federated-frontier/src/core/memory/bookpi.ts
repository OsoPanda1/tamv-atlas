export interface BookPiEntry {
  id: string;
  title: string;
  plainLanguageSummary: string;
  sourceEventId: string;
  createdAt: string;
}

export class BookPi {
  private entries: BookPiEntry[] = [];

  narrate(title: string, plainLanguageSummary: string, sourceEventId: string): BookPiEntry {
    const entry: BookPiEntry = {
      id: `bookpi_${this.entries.length + 1}`,
      title,
      plainLanguageSummary,
      sourceEventId,
      createdAt: new Date().toISOString(),
    };
    this.entries.push(entry);
    return entry;
  }

  list(): BookPiEntry[] {
    return [...this.entries];
  }
}
