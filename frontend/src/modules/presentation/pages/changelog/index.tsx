import { useState } from 'react';
import PricingIntelligenceChangelog from './pricing-intelligence-changelog';
import StandardChangelog from './standard-changelog';

export default function ChangelogPage() {
  const [tab, setTab] = useState<string>('pricing-intelligence');

  const handleTabChange = (tab: string) => setTab(tab);

  return (
    <section className="px-16">
      <h1 className="text-3xl mb-4 font-bold">Changelog</h1>
      <div>
        <button
          type="button"
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          onClick={() => handleTabChange('pricing-intelligence')}
        >
          Pricing Intelligence
        </button>
        <button
          type="button"
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          onClick={() => handleTabChange('sphere')}
        >
          SPHERE
        </button>
      </div>
      {tab === 'pricing-intelligence' && <PricingIntelligenceChangelog />}
      {tab === 'sphere' && <StandardChangelog />}
    </section>
  );
}
