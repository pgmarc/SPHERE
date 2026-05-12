import ReleaseVersion from './release-version';
import { StandardChangelogParser } from './util';
import ppi_changelog from './prueba-pricing-intelligence.json';
import ReleaseChanges from './release-changes';
import ReleaseDescription from './release-description';

export default function StandardChangelog() {
  const changelog = new StandardChangelogParser(ppi_changelog).parse();

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
              <ReleaseChanges name="Features" changes={version.features} />
              <ReleaseChanges name="Fixes" changes={version.fixes} />
            </ReleaseDescription>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
