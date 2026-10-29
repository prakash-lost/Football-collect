import React, { useState } from "react";
import { Badge } from "./ui/badge";

/**
 * Football Pitch Visualization Component
 * Renders Starting XI formation on a tactical pitch canvas
 */
export default function MatchPitch({ homeLineup, awayLineup }) {
  const [selectedTeamTab, setSelectedTeamTab] = useState("home");

  if (!homeLineup && !awayLineup) {
    return (
      <div className="p-8 text-center rounded-xl bg-surface-elevated/40 border border-border text-muted-foreground text-xs">
        Tactical formations and starting lineups not yet released for this fixture.
      </div>
    );
  }

  const activeLineup = selectedTeamTab === "home" ? homeLineup : awayLineup;

  if (!activeLineup || !activeLineup.startXI || activeLineup.startXI.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl bg-surface-elevated/40 border border-border text-muted-foreground text-xs">
        Starting XI not confirmed for this side yet.
      </div>
    );
  }

  // Parse lines based on formation or player grid
  const startXI = activeLineup.startXI;
  const formation = activeLineup.formation || "4-3-3";
  const formationParts = formation.split("-").map(Number);

  // Group players by line: Goalkeeper (line 0), Defenders (line 1), Midfielders (line 2...), Forwards (last)
  const lines = [];

  // Check if grid coordinates exist e.g. "1:1", "2:4"
  const hasGrid = startXI.some((p) => p.grid && p.grid.includes(":"));

  if (hasGrid) {
    const gridMap = new Map();
    startXI.forEach((p) => {
      const [r] = (p.grid || "1:1").split(":").map(Number);
      if (!gridMap.has(r)) gridMap.set(r, []);
      gridMap.get(r).push(p);
    });
    // Sort rows from 1 (GK at bottom) to max (Strikers at top)
    const sortedRowKeys = Array.from(gridMap.keys()).sort((a, b) => a - b);
    sortedRowKeys.forEach((k) => lines.push(gridMap.get(k)));
  } else {
    // Partition using formation numbers
    lines.push([startXI[0]]); // GK
    let currIdx = 1;
    formationParts.forEach((count) => {
      lines.push(startXI.slice(currIdx, currIdx + count));
      currIdx += count;
    });
    if (currIdx < startXI.length) {
      lines[lines.length - 1] = lines[lines.length - 1].concat(startXI.slice(currIdx));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Team Lineup Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-elevated border border-border">
          {homeLineup && (
            <button
              type="button"
              onClick={() => setSelectedTeamTab("home")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                selectedTeamTab === "home"
                  ? "bg-card text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {homeLineup.team?.logo && (
                <img src={homeLineup.team.logo} alt="" className="size-4 object-contain" />
              )}
              <span>{homeLineup.team?.name || "Home XI"}</span>
              <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                {homeLineup.formation}
              </Badge>
            </button>
          )}

          {awayLineup && (
            <button
              type="button"
              onClick={() => setSelectedTeamTab("away")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                selectedTeamTab === "away"
                  ? "bg-card text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {awayLineup.team?.logo && (
                <img src={awayLineup.team.logo} alt="" className="size-4 object-contain" />
              )}
              <span>{awayLineup.team?.name || "Away XI"}</span>
              <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                {awayLineup.formation}
              </Badge>
            </button>
          )}
        </div>

        {activeLineup.coach?.name && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Manager:</span>
            <strong className="text-foreground">{activeLineup.coach.name}</strong>
          </div>
        )}
      </div>

      {/* Pitch Canvas Graphic */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] max-w-xl mx-auto rounded-xl border-2 border-[#2a3a24] bg-gradient-to-b from-[#182614] via-[#1a2d16] to-[#142211] p-4 flex flex-col justify-between overflow-hidden shadow-inner select-none">
        {/* Pitch Field Markings (Center circle, penalty boxes) */}
        <div className="absolute inset-x-4 top-0 h-16 border-b border-x border-[#384e30]/60 rounded-b-md pointer-events-none" />
        <div className="absolute inset-x-12 top-0 h-8 border-b border-x border-[#384e30]/60 rounded-b-md pointer-events-none" />
        <div className="absolute inset-x-4 bottom-0 h-16 border-t border-x border-[#384e30]/60 rounded-t-md pointer-events-none" />
        <div className="absolute inset-x-12 bottom-0 h-8 border-t border-x border-[#384e30]/60 rounded-t-md pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#384e30]/60 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full border border-[#384e30]/60 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[#384e30] pointer-events-none" />

        {/* Tactical Rows (Rendered from Attacking line at top to GK at bottom) */}
        <div className="relative z-10 w-full h-full flex flex-col-reverse justify-around py-2">
          {lines.map((linePlayers, lineIdx) => (
            <div key={lineIdx} className="w-full flex items-center justify-around px-2">
              {linePlayers.map((player) => (
                <div
                  key={player.id || player.name}
                  className="flex flex-col items-center group cursor-pointer"
                  title={`${player.name} (#${player.number}) - ${player.pos}`}
                >
                  {/* Player Dot */}
                  <div className="size-7 sm:size-8 rounded-full bg-[#111310] border-2 border-primary text-primary-foreground font-mono font-black text-xs flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-[11px] font-bold text-foreground">
                      {player.number || "•"}
                    </span>
                  </div>

                  {/* Player Name Pill */}
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-[#111310]/90 border border-border text-[9px] sm:text-[10px] font-bold text-foreground truncate max-w-[70px] sm:max-w-[85px] text-center backdrop-blur-xs">
                    {player.name ? player.name.split(" ").slice(-1)[0] : "Player"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Substitutes Bench */}
      {activeLineup.substitutes && activeLineup.substitutes.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
            Available Substitutes ({activeLineup.substitutes.length})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
            {activeLineup.substitutes.map((sub) => (
              <div
                key={sub.id || sub.name}
                className="flex items-center gap-2 p-2 rounded-md bg-surface-elevated/60 border border-border"
              >
                <span className="size-5 rounded-full bg-surface-base border border-border font-mono font-bold text-[10px] text-primary flex items-center justify-center shrink-0">
                  {sub.number || "—"}
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-foreground truncate block text-xs">
                    {sub.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {sub.pos}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

