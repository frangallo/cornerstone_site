"use client";

import { useState } from "react";
import { BookOpen, Users, Monitor } from "lucide-react";

const tabs = [
  { id: "training", label: "Team Training", icon: BookOpen, color: "#7C3AED", bg: "#EDE8FE" },
  { id: "hiring", label: "AI Hiring", icon: Users, color: "#0284C7", bg: "#E0F2FE" },
  { id: "dashboard", label: "Control Center", icon: Monitor, color: "#16A34A", bg: "#DCFCE7" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function TechnologyTabs() {
  const [active, setActive] = useState<TabId>("training");
  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-200">
      {/* Tab bar */}
      <div className="flex border-b border-black/[0.06]">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-5 text-sm font-medium transition-colors ${
                i > 0 ? "border-l border-black/[0.06]" : ""
              }`}
              style={isActive ? { background: tab.color, color: "#fff", fontWeight: 600 } : { color: "#78716C" }}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 text-left">
        {active === "training" && <TrainingPanel />}
        {active === "hiring" && <HiringPanel />}
        {active === "dashboard" && <DashboardPanel />}
      </div>
    </div>
  );
}

function TrainingPanel() {
  return (
    <>
      <div className="mb-6">
        <p className="text-[18px] font-semibold text-carbon">Your team gets better at AI every day.</p>
        <p className="text-sm text-warm-gray mt-1">Real-time training that raises output quality across your team.</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-6">
        <div className="bg-cream rounded-xl p-4 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Team AI proficiency</p>
          <p className="font-mono text-[36px] font-bold leading-none" style={{ color: "#7C3AED" }}>7.2</p>
          <p className="text-[11px] text-[#22C55E] mt-1">↑ 1.4 from baseline</p>
        </div>
        <div className="bg-cream rounded-xl p-4 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Training sessions completed</p>
          <p className="font-mono text-[36px] font-bold leading-none" style={{ color: "#7C3AED" }}>34</p>
          <p className="text-[11px] text-[#22C55E] mt-1">↑ 12 this month</p>
        </div>
      </div>

      <p className="text-xs font-semibold text-carbon mb-3">Team progress</p>
      <div className="flex flex-col gap-3">
        {[
          { name: "Sarah M.", dept: "Operations", level: "Advanced", pct: 88, color: "#7C3AED" },
          { name: "Jake R.", dept: "Sales", level: "Intermediate", pct: 65, color: "#7C3AED" },
          { name: "Maria L.", dept: "Finance", level: "Getting started", pct: 35, color: "#D97706" },
        ].map((row) => (
          <div key={row.name}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-warm-gray">{row.name} — {row.dept}</span>
              <span className="text-[11px] font-medium" style={{ color: row.color }}>{row.level}</span>
            </div>
            <div className="w-full h-[7px] bg-cream rounded overflow-hidden">
              <div className="h-full rounded" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function HiringPanel() {
  return (
    <>
      <div className="mb-5">
        <p className="text-[18px] font-semibold text-carbon">Every new hire raises the bar.</p>
        <p className="text-sm text-warm-gray mt-1">AI proficiency screening built into your hiring process.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[10px] text-warm-gray mb-1">Candidates screened</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#0284C7" }}>48</p>
          <p className="text-[10px] text-[#22C55E] mt-1">↑ 22%</p>
        </div>
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[10px] text-warm-gray mb-1">Avg proficiency</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#0284C7" }}>6.8</p>
          <p className="text-[10px] text-[#22C55E] mt-1">↑ above avg</p>
        </div>
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[10px] text-warm-gray mb-1">Hire rate</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#0284C7" }}>73%</p>
          <p className="text-[10px] text-[#22C55E] mt-1">↑ 18%</p>
        </div>
      </div>

      <p className="text-[11px] font-semibold text-carbon mb-2.5">Recent candidates</p>
      <div className="flex flex-col">
        {[
          { initials: "AT", avatarBg: "#0284C7", name: "Alex Torres", role: "Marketing Manager", pct: 84, color: "#0284C7", colorBg: "#E0F2FE", score: "8.4", status: "Hired", statusBg: "#DCFCE7", statusColor: "#16A34A" },
          { initials: "CP", avatarBg: "#D97706", name: "Chris Park", role: "Sales Rep", pct: 62, color: "#D97706", colorBg: "#FEF3C7", score: "6.2", status: "In review", statusBg: "#FEF3C7", statusColor: "#D97706" },
          { initials: "DW", avatarBg: "#16A34A", name: "Dana Williams", role: "Ops Analyst", pct: 79, color: "#16A34A", colorBg: "#DCFCE7", score: "7.9", status: "Hired", statusBg: "#DCFCE7", statusColor: "#16A34A" },
        ].map((row, i, arr) => (
          <div key={row.initials} className={`flex items-center gap-3 py-2.5 ${i < arr.length - 1 ? 'border-b border-black/[0.05]' : ''}`}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: row.avatarBg }}>
              <span className="text-[10px] font-bold text-white">{row.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-carbon">{row.name}</span>
              <span className="text-xs text-warm-gray"> — {row.role}</span>
            </div>
            <div className="w-20 h-[5px] rounded-sm overflow-hidden flex-shrink-0" style={{ background: row.colorBg }}>
              <div className="h-full rounded-sm" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
            <span className="font-mono text-[13px] font-bold min-w-[28px] text-right" style={{ color: row.color }}>{row.score}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg flex-shrink-0" style={{ background: row.statusBg, color: row.statusColor }}>{row.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function DashboardPanel() {
  return (
    <>
      <div className="mb-6">
        <p className="text-[18px] font-semibold text-carbon">You see exactly what AI is doing.</p>
        <p className="text-sm text-warm-gray mt-1">A live control center for everything AI in your business.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Hours saved</p>
          <p className="font-mono text-[28px] font-bold leading-none text-amber">47</p>
          <p className="text-[11px] text-[#22C55E] mt-1">↑ 12%</p>
        </div>
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Workflows</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#7C3AED" }}>12</p>
          <p className="text-[11px] text-[#22C55E] mt-1">↑ 3 new</p>
        </div>
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Adoption</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#0284C7" }}>84%</p>
          <p className="text-[11px] text-[#22C55E] mt-1">↑ 8%</p>
        </div>
        <div className="bg-cream rounded-[10px] p-3.5 text-center">
          <p className="text-[11px] text-warm-gray mb-1">Cost saved</p>
          <p className="font-mono text-[28px] font-bold leading-none" style={{ color: "#22C55E" }}>$18K</p>
          <p className="text-[11px] text-[#22C55E] mt-1">this month</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div>
          <p className="text-xs font-semibold text-carbon mb-3">Active workflows</p>
          <div className="flex flex-col gap-3">
            {[
              { name: "Invoice processing", pct: 92, color: "#22C55E" },
              { name: "Lead scoring", pct: 78, color: "#D97706" },
              { name: "Report generation", pct: 65, color: "#0284C7" },
              { name: "Onboarding emails", pct: 45, color: "#7C3AED" },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between">
                <span className="text-xs text-warm-gray">{row.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-[120px] h-2 bg-cream rounded overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${row.pct}%`, background: row.color }} />
                  </div>
                  <span className="text-[11px] font-semibold min-w-[32px] text-right" style={{ color: row.color }}>{row.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-carbon mb-3">Monthly impact</p>
          <div className="flex items-end gap-2 h-[120px]">
            {[
              { h: "30%", active: false },
              { h: "42%", active: false },
              { h: "52%", active: false },
              { h: "48%", active: false },
              { h: "65%", active: false },
              { h: "82%", active: true },
              { h: "95%", active: true },
            ].map((bar, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[5px]"
                style={{ height: bar.h, background: bar.active ? "#0284C7" : "#E0F2FE" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
