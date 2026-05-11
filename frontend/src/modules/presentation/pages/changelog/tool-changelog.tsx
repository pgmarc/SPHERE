interface ToolChangelogProps {
  name: string;
  features: string[];
  fixes: string[];
}

export default function ToolChangelog({ name, features, fixes }: ToolChangelogProps) {
  if (features.length + fixes.length === 0) return null;

  return (
    <section className="pb-6">
      <h3 className="text-2xl font-medium text-neutral-900">{name}</h3>
      <ToolFeatures features={features} />
      <ToolFixes fixes={fixes} />
    </section>
  );
}

function ToolFeatures({ features }: { features: string[] }) {
  return (
    <details className="group border-t border-neutral-200 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-normal text-neutral-700">
        <span>Features ({features.length})</span>

        <span className="text-neutral-400 transition-transform duration-200 group-open:rotate-180">
          ⌄
        </span>
      </summary>

      <div className="overflow-hidden">
        <ul className="mt-4 space-y-3 pl-5">
          {features.map(feature => (
            <li key={feature} className="list-disc text-base leading-7 text-neutral-600">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function ToolFixes({ fixes }: { fixes: string[] }) {
  return (
    <details className="group border-t border-neutral-200 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-normal text-neutral-700">
        <span>Fixes ({fixes.length})</span>

        <span className="text-neutral-400 transition-transform duration-200 group-open:rotate-180">
          ⌄
        </span>
      </summary>

      <div className="overflow-hidden">
        <ul className="mt-4 space-y-3 pl-5">
          {fixes.map(fix => (
            <li key={fix} className="list-disc text-base leading-7 text-neutral-600">
              {fix}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
