import ReleaseChanges from "./release-changes";
import { Change, hasChanges } from "./util";

interface ReleaseSectionProps {
  name: string;
  features: Change[];
  fixes: Change[];
}

export default function ReleaseSection({ name, features, fixes }: ReleaseSectionProps) {
  if (!hasChanges(features, fixes)) return null;

  return (
    <section className="pb-6">
      <h3 className="text-2xl font-medium text-neutral-900">{name}</h3>
      <ReleaseChanges name="Features" changes={features} />
      <ReleaseChanges name="Fixes" changes={fixes} />
    </section>
  );
}
