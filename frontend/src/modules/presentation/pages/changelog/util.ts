interface GitCliffCommit {
  id: string;
  message: string;
  body: string | null;
  group: string;
  breaking_description: string | null;
  breaking: boolean;
  scope: string | null;
  merge_commit: boolean;
  raw_message: string;
}

interface GitCliffVersion {
  version: string;
  message: string;
  commits: GitCliffCommit[];
  commit_id: string;
  timestamp: number;
}

type GitCliffContext = GitCliffVersion[];

export interface Change {
  commit_id: string;
  description: string;
}

interface Section {
  features: Change[];
  fixes: Change[];
}

interface Release {
  commit_id: string;
  version: string;
  message: string;
  releaseDate: Date;
}

interface StandardRelease extends Release, Section {}

interface PricingIntelligenceRelease extends Release {
  harvey: Section;
  analysis_api: Section;
  mcp: Section;
  csp: Section;
}

interface StandardChangelog {
  id: 'standard';
  changelog: StandardRelease[];
}

interface PricingIntelligenceChangelog {
  id: 'pricing-intelligence';
  changelog: PricingIntelligenceRelease[];
}

type Changelog = StandardChangelog | PricingIntelligenceChangelog;

interface GitCliffContextParser {
  parse(): Changelog;
}

function unixEpochToDate(unixEpoch: number): Date {
  return new Date(unixEpoch * 1000);
}

export function hasChanges(features: Change[], fixes: Change[]): boolean {
  return features.length + fixes.length > 0;
}

export class StandardChangelogParser implements GitCliffContextParser {
  private readonly context: GitCliffContext;
  private readonly changelog: StandardChangelog;

  constructor(context: GitCliffContext) {
    this.context = context;
    this.changelog = { id: 'standard', changelog: [] };
  }

  parse() {
    for (const version of this.context) {
      const features: Change[] = [];
      const fixes: Change[] = [];

      for (const commit of version.commits) {
        if (commit.merge_commit) continue;
        const change: Change = { commit_id: commit.id, description: commit.message };
        if (commit.raw_message.startsWith('feat') && !commit.scope) {
          features.push(change);
        } else if (commit.raw_message.startsWith('fix') && !commit.scope) {
          fixes.push(change);
        } else {
          continue;
        }
      }

      const changelogVersion: StandardRelease = {
        commit_id: version.commit_id,
        version: version.version,
        releaseDate: unixEpochToDate(version.timestamp),
        message: version.message,
        features,
        fixes,
      };

      this.changelog.changelog.push(changelogVersion);
    }

    return this.changelog;
  }
}

export class PricingIntelligenceChangelogParser implements GitCliffContextParser {
  private readonly context: GitCliffContext;
  private readonly changelog: PricingIntelligenceChangelog;

  constructor(context: GitCliffContext) {
    this.context = context;
    this.changelog = { id: 'pricing-intelligence', changelog: [] };
  }

  parse() {
    for (const version of this.context) {
      const harvey: Section = {
        features: [],
        fixes: [],
      };

      const analysis_api: Section = {
        features: [],
        fixes: [],
      };

      const mcp: Section = {
        features: [],
        fixes: [],
      };

      const csp: Section = {
        features: [],
        fixes: [],
      };

      for (const commit of version.commits) {
        if (commit.merge_commit) continue;
        const change: Change = { commit_id: commit.id, description: commit.message };
        switch (commit.group) {
          case 'features_harvey': {
            harvey.features.push(change);
            break;
          }
          case 'fixes_harvey': {
            harvey.fixes.push(change);
            break;
          }
          case 'features_analysis_api': {
            analysis_api.features.push(change);
            break;
          }
          case 'fixes_analysis_api': {
            analysis_api.fixes.push(change);
            break;
          }
          case 'features_mcp': {
            mcp.features.push(change);
            break;
          }
          case 'fixes_mcp': {
            mcp.fixes.push(change);
            break;
          }
          case 'features_csp': {
            csp.features.push(change);
            break;
          }
          case 'fixes_csp': {
            csp.fixes.push(change);
            break;
          }
          default:
            continue;
        }
      }

      const changelogVersion: PricingIntelligenceRelease = {
        commit_id: version.commit_id,
        version: version.version,
        releaseDate: unixEpochToDate(version.timestamp),
        message: version.message,
        harvey,
        analysis_api,
        mcp,
        csp,
      };

      this.changelog.changelog.push(changelogVersion);
    }

    return this.changelog;
  }
}
