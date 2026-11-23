import { Crumbs } from '../lib/ui.jsx';

/* Editorial header shared by the inner pages: breadcrumb, kicker, a large
   serif title, an optional lead, and an aside for the page's key facts. */
export default function PageHead({ here, kicker, title, lead, aside, children }) {
  return (
    <section className="ph">
      <div className="container">
        <Crumbs here={here} />
        <div className="ph-row">
          <div className="ph-copy">
            {kicker && <p className="t-kicker ph-kicker">{kicker}</p>}
            <h1 className="ph-title">{title}</h1>
            {lead && <p className="ph-lead">{lead}</p>}
          </div>
          {aside && <div className="ph-aside">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
