export interface GitCliffCommit {
  id: string;
  message: string;
  group: string | null;
  scope: string | null;
  raw_message: string;
}

interface GitCliffVersion {
  version: string;
  timestamp: string;
  message: string;
  commit_id: string;
  commits: GitCliffCommit[];
}

export type GitCliffContext = GitCliffVersion[];
