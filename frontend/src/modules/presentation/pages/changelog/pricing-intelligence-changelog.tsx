import ReleaseSection from './release-section';
import ReleaseVersion from './release-version';
import { PricingIntelligenceChangelogParser } from './util';
import ppi_changelog from './prueba-pricing-intelligence.json';
import ReleaseDescription from './release-description';

export default function PricingIntelligenceChangelog() {
  const changelog = new PricingIntelligenceChangelogParser(ppi_changelog).parse();

  return (
    <table className="table-fixed border-separate border-spacing-y-8">
      <thead>
        <tr className="border-solid border-b-gray-800">
          <th className="w-48 text-left text-2xl font-normal">Version</th>
          <th className="text-left text-2xl font-normal">Description</th>
        </tr>
      </thead>
      <tbody>
        {changelog.changelog.map(version => (
          <tr key={version.commit_id}>
            <ReleaseVersion
              version={version.version}
              releaseDate={version.releaseDate.toLocaleDateString()}
            />

            <ReleaseDescription description={version.message}>
              <ReleaseSection
                name="Harvey"
                features={version.harvey.features}
                fixes={version.harvey.fixes}
              />
              <ReleaseSection
                name="PRIME"
                features={version.analysis_api.features}
                fixes={version.analysis_api.fixes}
              />
              <ReleaseSection
                name="MCP"
                features={version.mcp.features}
                fixes={version.mcp.fixes}
              />
              <ReleaseSection
                name="CSP"
                features={version.csp.features}
                fixes={version.csp.fixes}
              />
            </ReleaseDescription>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
