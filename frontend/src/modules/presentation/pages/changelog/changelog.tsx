import ToolChangelog from './tool-changelog';
import { parsePricingIntelligenceChangelog } from './util';

export default function Changelog() {
  const changelog = parsePricingIntelligenceChangelog();

  return (
    <table className="w-full border-separate border-spacing-y-8 px-8">
      <thead>
        <tr className="border-b border-neutral-200">
          <th className="w-[220px] min-w-[220px] pb-6 text-left text-2xl font-normal">
            Version
          </th>

          <th className="pb-6 text-left text-2xl font-normal">Description</th>
        </tr>
      </thead>

      <tbody>
        {changelog.map(version => (
          <tr key={version.version} id={version.version}>
            <Version version={version.version} timestamp={version.timestamp} />

            {/* TODO: Description component */}
            <td className="px-6 py-8 rounded-lg bg-white">
              <div className="grid grid-cols-[320px_1fr] gap-20">
                {/* LEFT */}
                <div className="space-y-5">
                  <p className="text-base leading-8 text-neutral-500">{version.message}</p>
                </div>

                <div className="max-h-[420px] overflow-y-auto pr-2">
                  <div className="space-y-8">
                    <ToolChangelog
                      name="Harvey"
                      features={version.harvey.features}
                      fixes={version.harvey.fixes}
                    />

                    <ToolChangelog
                      name="PRIME"
                      features={version.analysis_api.features}
                      fixes={version.analysis_api.fixes}
                    />

                    <ToolChangelog
                      name="MCP"
                      features={version.mcp.features}
                      fixes={version.mcp.fixes}
                    />

                    <ToolChangelog
                      name="CSP"
                      features={version.csp.features}
                      fixes={version.csp.fixes}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface VersionProps {
  version: string;
  timestamp: number;
}

function Version({ version, timestamp }: VersionProps) {
  const unixEpochToDate = (unixEpoch: number): Date => new Date(unixEpoch * 1000);

  return (
    <td className="py-8 align-top">
      <p className="text-lg font-normal">{version}</p>
      <p className="text-lg font-normal">{unixEpochToDate(timestamp).toLocaleDateString()}</p>
    </td>
  );
}
