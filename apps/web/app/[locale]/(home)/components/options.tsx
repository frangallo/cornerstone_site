import { Reveal } from "./reveal";

const OPTS = [
  { title: "Buy more tools.", body: "Sign up for ChatGPT. Let your software vendor turn on their AI features. Half the seats sit unused. You're not sure what's working.", verdict: "Spent the money. Nothing to show." },
  { title: "Hire a freelancer.", body: "They'll build a chatbot or wire up a Zapier flow, then move on. Nobody on your team knows how it works.", verdict: "One-off. No transfer." },
  { title: "Figure it out internally.", body: "Your best people are already stretched thin. Nobody has 20 hours a week to research AI on top of their actual job.", verdict: "Ambitious. Unrealistic." },
  { title: "Do nothing.", body: "And hope your competitors are figuring it out just as slowly. Some are. Many aren't — they're pulling ahead every month.", verdict: "The default. The riskiest." },
];

export function Options() {
  return (
    <section className="section section-cream" id="approach">
      <div className="wrap">
        <Reveal className="options-grid">
          <div>
            <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>The Problem</div>
            <h2 className="bigword">
              Every option<br />
              feels <span className="bigword-script">wrong.</span><br />
              <span className="bigword-orange">And you know</span><br />
              you need to do <span className="bigword-orange">something.</span>
            </h2>
          </div>
          <div className="option-cards">
            {OPTS.map((o, i) => (
              <div key={i} className="option-card crossed">
                <h4>{o.title}</h4>
                <p>{o.body}</p>
                <div className="option-verdict">{o.verdict}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
