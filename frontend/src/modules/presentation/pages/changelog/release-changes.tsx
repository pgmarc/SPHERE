import { Change } from './util';

interface ReleaseChangesProps {
  name: string;
  changes: Change[];
}

export default function ReleaseChanges({ name, changes }: ReleaseChangesProps) {
  return (
    <details className="group border-t border-neutral-200 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-normal text-neutral-700">
        <span>
          {name} ({changes.length})
        </span>

        <span className="text-neutral-400 transition-transform duration-200 group-open:rotate-180">
          ⌄
        </span>
      </summary>

      <div className="overflow-hidden">
        <ul className="mt-4 space-y-3 pl-5">
          {changes.map(change => (
            <li key={change.commit_id} className="list-disc text-base leading-7 text-neutral-600">
              {change.description}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
