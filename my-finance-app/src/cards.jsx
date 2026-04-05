import { useState } from "react";

const BALANCE_DATA = [
  { month: "Jan", value: 11500 },
  { month: "Feb", value: 14800 },
  { month: "Mar", value: 13200 },
  { month: "Apr", value: 17200 },
  { month: "May", value: 16500 },
  { month: "Jun", value: 22800 },
];

const SPENDING_CATEGORIES = [
  { label: "Bills", pct: 31, color: "#7c3aed" },
  { label: "Food", pct: 24, color: "#5b21b6" },
  { label: "Travel", pct: 18, color: "#8b5cf6" },
  { label: "Shopping", pct: 16, color: "#c4b5fd" },
  { label: "Entertainment", pct: 12, color: "#a78bfa" },
];

function buildPieSegments(cats) {
  const cx = 100;
  const cy = 100;
  const r = 80;
  let angle = -90;

  return cats.map((c) => {
    const startAngle = angle;
    const sweep = (c.pct / 100) * 360;
    angle += sweep;

    const rad = (d) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad(startAngle));
    const y1 = cy + r * Math.sin(rad(startAngle));
    const x2 = cx + r * Math.cos(rad(angle));
    const y2 = cy + r * Math.sin(rad(angle));
    const large = sweep > 180 ? 1 : 0;
    const mid = startAngle + sweep / 2;

    return {
      ...c,
      d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`,
      lx: cx + 118 * Math.cos(rad(mid)),
      ly: cy + 118 * Math.sin(rad(mid)),
    };
  });
}

function buildLinePath(data, w, h) {
  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));
  const pad = { top: 20, bottom: 20, left: 10, right: 10 };

  const points = data.map((d, i) => ({
    ...d,
    x: pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right),
    y: pad.top + (1 - (d.value - min) / (max - min)) * (h - pad.top - pad.bottom),
  }));

  const path = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");
  const area =
    `M${points[0].x},${h} ` +
    points.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${points[points.length - 1].x},${h} Z`;

  return { points, path, area };
}

// Cards starts here !! I have put them in seperate file but at last i have mixed all of them up inorder to maintain a simple file structure.
function StatCard({ label, value, change, positive, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
          <p className={`stat-change ${positive ? "pos" : "neg"}`}>{change}</p>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </div>
  );
}

// for line chart also i took the help of AI , coz this is a bit complex to code from scratch for me.
function LineChart() {
  const W = 560, H = 220;
  const { points, path, area } = buildLinePath(BALANCE_DATA, W, H);
  const [hovered, setHovered] = useState(null);
  const Y_GUIDES = [0, 0.33, 0.66, 1];

  return (
    <div className="chart-card">
      <h3 className="chart-title">Balance Over Time</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="line-svg">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"    />
          </linearGradient>
        </defs>

        {Y_GUIDES.map((t, i) => {
          const y   = 20 + t * 180;
          const val = Math.round(22800 - t * (22800 - 5500));
          return (
            <g key={i}>
              <line x1={10} y1={y} x2={W - 10} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={12} y={y - 5} fontSize={10} fill="#9ca3af">
                ${(val / 1000).toFixed(1)}k
              </text>
            </g>
          );
        })}

        <path d={area} fill="url(#areaGrad)" />
        <path d={path} fill="none" stroke="#7c3aed" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle cx={p.x} cy={p.y} r={hovered === i ? 11 : 0} fill="#7c3aed" fillOpacity={0.2} />
            <circle cx={p.x} cy={p.y} r={hovered === i ? 7 : 5}  fill="#7c3aed" />
            {hovered === i && (
              <g>
                <rect x={p.x - 36} y={p.y - 34} width={72} height={24} rx={6} fill="#1e1b4b" />
                <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize={11} fill="#fff" fontWeight={600}>
                  ${(p.value / 1000).toFixed(1)}k
                </text>
              </g>
            )}
            <text x={p.x} y={H - 2} textAnchor="middle" fontSize={11} fill="#9ca3af">
              {p.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── PieChart ───────────────────────────────────────────────────
function PieChart() {
  const segments = buildPieSegments(SPENDING_CATEGORIES);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Spending by Category</h3>
      <div className="pie-wrap">
        <svg viewBox="0 0 200 200" className="pie-svg">
          {segments.map((s, i) => (
            <path
              key={i}
              d={s.d}
              fill={s.color}
              stroke="#fff"
              strokeWidth={2}
              opacity={hovered === null || hovered === i ? 1 : 0.5}
              style={{
                transform:       hovered === i ? "scale(1.05)" : "scale(1)",
                transformOrigin: "100px 100px",
                transition:      "all 0.2s ease",
                cursor:          "pointer",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="pie-legend">
          {segments.map((s, i) => (
            <div
              key={i}
              className="legend-row"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="legend-dot" style={{ background: s.color }} />
              <span className="legend-label">{s.label}</span>
              <span className="legend-pct">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { StatCard, LineChart, PieChart };
