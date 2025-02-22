import { ReactNode } from "react";
import { Image } from "@raycast/api";
import { getFavicon } from "@raycast/utils";

export interface SearchResult<T> {
  readonly isLoading: boolean;
  readonly errorView?: ReactNode;
  readonly data?: T[];
}

export interface HistoryEntry {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly lastVisited: Date;
}

export type GroupedEntries = Map<string, HistoryEntry[]>;

export class Tab {
  static readonly TAB_CONTENTS_SEPARATOR: string = "~~~";

  constructor(
    public readonly title: string,
    public readonly url: string,
    public readonly favicon: string,
    public readonly windowsIndex: number,
    public readonly tabIndex: number
  ) {}

  static parse(line: string): Tab {
    const parts = line.split(this.TAB_CONTENTS_SEPARATOR);

    return new Tab(parts[0], parts[1], parts[2], +parts[3], +parts[4]);
  }

  key(): string {
    return `${this.windowsIndex}${Tab.TAB_CONTENTS_SEPARATOR}${this.tabIndex}`;
  }

  urlWithoutScheme(): string {
    return this.url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
  }

  googleFavicon(): Image.ImageLike {
    return getFavicon(this.url);
  }
}

type BookmarkNodeType = "folder" | "url";

export interface BookmarkDirectory {
  date_added: string;
  children: BookmarkDirectory[];
  type: BookmarkNodeType;
  id: string;
  guid: string;
  source?: string;
  url?: string;
  name: string;
  [key: string]: unknown;
}

export interface RawBookmarkRoot {
  [key: string]: BookmarkDirectory;
}

export interface RawBookmarks {
  roots: RawBookmarkRoot;
  [key: string]: unknown;
}
