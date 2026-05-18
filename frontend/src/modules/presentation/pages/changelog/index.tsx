import { useState } from 'react';
import PricingIntelligenceChangelog from './pricing-intelligence-changelog';
import StandardChangelog from './standard-changelog';

export default function ChangelogPage() {
  const [tab, setTab] = useState<string>('pricing-intelligence');

  const handleTabChange = (tab: string) => setTab(tab);

  const commonCssRules =
    'text-lg pl-4 border-l border-transparent hover:border-l-sphere-grey-400 hover:text-black';

  return (
    <section className="px-16 grid grid-cols-[var(--container-2xs)_minmax(0, 1fr)] gap-8">
      <div className="col_start-1 pt-8 pr-8 border-r border-r-sphere-grey-300">
        <h2 className="text-lg mb-4 font-semibold">Changelog</h2>
        <ul className="cursor-pointer border-l border-l-sphere-grey-300">
          <li onClick={() => handleTabChange('sphere')}>
            <span
              className={`${commonCssRules}${tab === 'sphere' ? ' border-l-sphere-grey-600' : ''}`}
            >
              Sphere
            </span>
          </li>
          <li onClick={() => handleTabChange('pricing-intelligence')}>
            <span
              className={`${commonCssRules}${tab === 'pricing-intelligence' ? ' border-l-sphere-grey-600' : ''}`}
            >
              Pricing Intelligence
            </span>
          </li>
        </ul>
      </div>
      <div className="col-start-2">
        {tab === 'pricing-intelligence' && <PricingIntelligenceChangelog />}
        {tab === 'sphere' && <StandardChangelog />}
      </div>
    </section>
  );
}
