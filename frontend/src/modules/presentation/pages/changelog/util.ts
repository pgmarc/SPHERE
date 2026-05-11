import ppi_changelog from './prueba-pricing-intelligence.json';

type Changelog = ChangelogVersion[];

interface ChangelogVersion {
  version: string;
  message: string;
  timestamp: number;
  harvey: {
    features: string[];
    fixes: string[];
  };
  analysis_api: {
    features: string[];
    fixes: string[];
  };
  mcp: {
    features: string[];
    fixes: string[];
  };
  csp: {
    features: string[];
    fixes: string[];
  };
}

export function parsePricingIntelligenceChangelog() {
  const parsedChangelog: Changelog = [];

  for (const version of ppi_changelog) {
    const harvey: { features: string[]; fixes: string[] } = {
      features: [],
      fixes: [],
    };

    const analysis_api: { features: string[]; fixes: string[] } = {
      features: [],
      fixes: [],
    };

    const mcp: { features: string[]; fixes: string[] } = {
      features: [],
      fixes: [],
    };

    const csp: { features: string[]; fixes: string[] } = {
      features: [],
      fixes: [],
    };

    for (const commit of version.commits) {
      if (commit.merge_commit) continue;
      const commit_message = commit.message;
      switch (commit.group) {
        case 'features_harvey': {
          harvey.features.push(commit_message);
          break;
        }
        case 'fixes_harvey': {
          harvey.fixes.push(commit_message);
          break;
        }
        case 'features_analysis_api': {
          analysis_api.features.push(commit_message);
          break;
        }
        case 'fixes_analysis_api': {
          analysis_api.fixes.push(commit_message);
          break;
        }
        case 'features_mcp': {
          mcp.features.push(commit_message);
          break;
        }
        case 'fixes_mcp': {
          mcp.fixes.push(commit_message);
          break;
        }
        case 'features_csp': {
          csp.features.push(commit_message);
          break;
        }
        case 'fixes_csp': {
          csp.fixes.push(commit_message);
          break;
        }
        default:
          continue;
      }
    }

    const changelogVersion: ChangelogVersion = {
      version: version.version,
      timestamp: version.timestamp,
      message: version.message,
      harvey,
      analysis_api,
      mcp,
      csp,
    };

    parsedChangelog.push(changelogVersion);
  }

  return parsedChangelog;
}
