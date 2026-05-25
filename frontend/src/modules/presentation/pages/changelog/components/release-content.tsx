import type { ReactElement } from 'react';

interface ReleaseContentProps {
  description: string;
  children: ReactElement;
}

export default function ReleaseContent({ description, children }: ReleaseContentProps) {
  return (
    <td className="rounded-lg bg-white p-8">
      <div className="grid grid-cols-10">
        <div className="col-span-4 pr-16">
          <p className="text-lg leading-8">{description}</p>
        </div>
        <div className="col-span-6 max-h-[420px] space-y-8 overflow-y-auto">{children}</div>
      </div>
    </td>
  );
}
