import { CalendlyButton } from "@/components/calendly-button";
import { Reveal } from "./reveal";

const SMALL_W = 210;
const SMALL_H = 290;
const LARGE_W = 340;
const LARGE_H = 460;
const MED_W = 270;
const MED_H = 340;

const leftPhotos = [
  { img: "/team/photo-6.jpg", w: SMALL_W, h: SMALL_H, leftPx: 90, mt: 0, z: 1 },
  { img: "/team/photo-2.jpg", w: LARGE_W, h: LARGE_H, leftPx: -200, mt: -100, z: 2 },
  { img: "/team/photo-3.jpg", w: MED_W, h: MED_H, leftPx: 100, mt: -60, z: 3 },
];

const rightPhotos = [
  { img: "/team/photo-1.jpg", w: SMALL_W, h: SMALL_H, rightPx: 90, mt: 0, z: 1 },
  { img: "/team/photo-4.jpg", w: LARGE_W, h: LARGE_H, rightPx: -200, mt: -100, z: 2 },
  { img: "/team/photo-5.jpg", w: MED_W, h: MED_H, rightPx: 100, mt: -60, z: 3 },
];

export function Operators() {
  return (
    <section className="section section-paper" id="operators" style={{ position: "relative", overflow: "hidden" }}>
      <div className="bg-stars" style={{ opacity: 0.35 }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="ops-eyebrow-row">
          <div className="eyebrow eyebrow-navy">Who actually shows up</div>
        </div>

        <Reveal className="ops-stage ops-stage-flank">
          <div className="ops-flank ops-flank-left">
            {leftPhotos.map((p, i) => (
              <div
                key={i}
                className="ops-flank-photo"
                style={{
                  width: `${p.w}px`,
                  height: `${p.h}px`,
                  marginLeft: `${p.leftPx}px`,
                  marginTop: `${p.mt}px`,
                  zIndex: p.z,
                }}
              >
                <div className="ops-flank-img" style={{ backgroundImage: `url(${p.img})` }} />
              </div>
            ))}
          </div>

          <div className="ops-center ops-center-flank">
            <h2 className="ops-title">
              <span className="ops-title-line">One team.</span>
              <span className="ops-title-line ops-title-orange">One system</span>
              <span className="ops-title-line">embedded</span>
              <span className="ops-title-line ops-title-script">within yours.</span>
            </h2>
            <p className="ops-sub">
              Plug into Cornerstone's system and see what happens when people, process and technology revolve around AI.
            </p>
            <CalendlyButton className="btn btn-orange btn-arrow">Book a Call</CalendlyButton>
          </div>

          <div className="ops-flank ops-flank-right">
            {rightPhotos.map((p, i) => (
              <div
                key={i}
                className="ops-flank-photo"
                style={{
                  width: `${p.w}px`,
                  height: `${p.h}px`,
                  marginRight: `${p.rightPx}px`,
                  marginTop: `${p.mt}px`,
                  zIndex: p.z,
                }}
              >
                <div className="ops-flank-img" style={{ backgroundImage: `url(${p.img})` }} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
