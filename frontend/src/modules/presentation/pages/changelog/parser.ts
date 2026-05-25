import type { GitCliffCommit, GitCliffContext } from './git-cliff';
import ppi_changelog from './data/prueba-pricing-intelligence.json';
import sphere_changelog from './data/pricing-intelligence.json';

export interface Change {
  id: string;
  description: string;
}

interface ChangeSection {
  name: string;
  features: Change[];
  fixes: Change[];
}

export interface Release {
  id: string;
  version: string;
  description: string;
  releaseDate: Date;
  sections: ChangeSection[];
}

type Section = 'Features' | 'Fixes' | PricingIntelSection

enum PricingIntelSection {
  HARVEY = 'Harvey',
  PRIME = 'PRIME',
  MCP = 'MCP',
  CSP = 'CSP',
  AMINT = 'AMINT',
  UI = 'UI',
}

enum SectionType {
  Feat = "feat",
  Fix = "fix"
}

type GroupMapping = Record<
  string,
  {
    section: Section;
    type: SectionType;
  }
>;

const standardMapping: GroupMapping = {
  features: {
    section: 'Features',
    type: SectionType.Feat,
  },
  fixes: {
    section: 'Fixes',
    type: SectionType.Fix,
  },
};

const pricingIntelligenceMapping: GroupMapping = {
  features_harvey: {
    section: PricingIntelSection.HARVEY,
    type: SectionType.Feat,
  },
  fixes_harvey: {
    section: PricingIntelSection.HARVEY,
    type: SectionType.Fix,
  },
  features_analysis_api: {
    section: PricingIntelSection.PRIME,
    type: SectionType.Feat,
  },
  fixes_analysis_api: {
    section: PricingIntelSection.PRIME,
    type: SectionType.Fix,
  },
  features_mcp: {
    section: PricingIntelSection.MCP,
    type: SectionType.Feat,
  },
  fixes_mcp: {
    section: PricingIntelSection.MCP,
    type: SectionType.Fix,
  },
  features_csp: {
    section: PricingIntelSection.CSP,
    type: SectionType.Feat,
  },
  fixes_csp: {
    section: PricingIntelSection.CSP,
    type: SectionType.Fix,
  },
  features_amint: {
    section: PricingIntelSection.AMINT,
    type: SectionType.Feat,
  },
  fixes_amint: {
    section: PricingIntelSection.AMINT,
    type: SectionType.Fix,
  },
  features_ui: {
    section: PricingIntelSection.UI,
    type: SectionType.Feat,
  },
  fixes_ui: {
    section: PricingIntelSection.UI,
    type: SectionType.Fix,
  },
};

class ChangelogParser {
  constructor(
    private readonly context: GitCliffContext,
    private readonly mapping: GroupMapping
  ) {}

  parse(): Release[] {
    return this.context.map(version => {
      const sections = this.parseSections(version.commits);

      return {
        id: version.commit_id,
        version: version.version,
        description: version.message,
        releaseDate: new Date(version.timestamp),
        sections,
      };
    });
  }

  private parseSections(commits: GitCliffCommit[]): ChangeSection[] {
    const res = new Map<string, ChangeSection>();
    for (const commit of commits) {
      const group = this.resolveGroup(commit);

      if (!group) continue;

      const config = this.mapping[group];

      if (!config) continue;

      if (!res.has(config.section)) {
        res.set(config.section, {
          name: config.section,
          features: [],
          fixes: [],
        });
      }

      const section = res.get(config.section)!;

      const change = {
        id: commit.id,
        description: commit.message,
      };

      if (config.type === SectionType.Feat) {
        section.features.push(change);
      } else {
        section.fixes.push(change);
      }
    }
    return Array.from(res.values());
  }

  private resolveGroup(commit: GitCliffCommit): string | null {
    if (commit.group) return commit.group;

    if (commit.raw_message.startsWith('feat')) {
      return 'features';
    }

    if (commit.raw_message.startsWith('fix')) {
      return 'fixes';
    }

    return null;
  }
}

export function getChangelogParser(type: string): ChangelogParser {
  switch (type) {
    case 'pricing-intelligence':
      return new ChangelogParser(ppi_changelog, pricingIntelligenceMapping);
    case 'sphere':
      return new ChangelogParser(sphere_changelog, standardMapping);
    default:
      throw new Error(`unknown changelog paser of type ${type}`);
  }
}

export function hasChanges(features: Change[], fixes: Change[]): boolean {
  return features.length + fixes.length > 0;
}
