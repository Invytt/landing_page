"use client";

import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type StepData = {
  n: string;
  title: string;
  desc: string;
  bg: string;
  dark?: boolean;
};

const STEPS: StepData[] = [
  {
    n: "1",
    title: "Create your event",
    desc: "Pick a template, set the date and venue, design your invite. Ready in minutes.",
    bg: "#9b8cdb",
    dark: true,
  },
  {
    n: "2",
    title: "Invite & coordinate",
    desc: "Share one link, track RSVPs (even over WhatsApp), and manage +1s.",
    bg: "#f3b53f",
  },
  {
    n: "3",
    title: "Plan your supplies",
    desc: "Let AI size your food, drink, and supply list to your final guest count, and assign who brings what.",
    bg: "#e2703a",
    dark: true,
  },
  {
    n: "4",
    title: "Book your vendors",
    desc: "Browse vetted caterers, decorators, photographers, and DJs book and pay in-app.",
    bg: "#221c3a",
    dark: true,
  },
  {
    n: "5",
    title: "Split the bill",
    desc: "Collect contributions and split costs with guests no more midnight UPI requests.",
    bg: "#546B41",
    dark: true,
  },
];

function StepCardContent({ data }: { data: StepData }) {
  const fg = data.dark ? "text-white" : "text-black";
  const sub = data.dark ? "text-white/70" : "text-black/60";
  return (
    <>
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ${
          data.dark ? "bg-white/20 text-white" : "bg-black/10 text-black"
        }`}
      >
        {data.n}
      </div>
      <p className={`font-display font-semibold ${fg}`}>{data.title}</p>
      <p className={`mt-1 text-xs ${sub}`}>{data.desc}</p>
    </>
  );
}

function StepNode({ data }: { data: StepData }) {
  return (
    <div
      className="w-80 cursor-grab rounded-2xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:cursor-grabbing"
      style={{ backgroundColor: data.bg }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="h-0! w-0! min-w-0! border-0! bg-transparent! opacity-0"
      />
      <StepCardContent data={data} />
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-0! w-0! min-w-0! border-0! bg-transparent! opacity-0"
      />
    </div>
  );
}

const nodeTypes = { step: StepNode };

// Spread the 5 cards across the canvas (top-left → bottom → top-mid → bottom →
// top-right zigzag) so the initial fitView frames them edge-to-edge instead of
// clustering them in the centre.
const NODE_POS = [
  { x: 0, y: 0 },
  { x: 215, y: 300 },
  { x: 430, y: 0 },
  { x: 645, y: 300 },
  { x: 860, y: 0 },
];

const initialNodes: Node[] = STEPS.map((s, i) => ({
  id: String(i + 1),
  type: "step",
  position: NODE_POS[i] ?? { x: (i % 2) * 240, y: i * 150 },
  data: s,
}));

const initialEdges: Edge[] = STEPS.slice(1).map((_, i) => ({
  id: `e${i + 1}`,
  source: String(i + 1),
  target: String(i + 2),
  type: "smoothstep",
  animated: true,
  style: { stroke: "rgba(0,0,0,0.3)", strokeWidth: 2 },
}));

export default function ExpandableSteps() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <>
      {/* mobile: vertical stack — no canvas, no horizontal scroll */}
      <div className="flex flex-col gap-4 lg:hidden">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl p-6 shadow-sm"
            style={{ backgroundColor: s.bg }}
          >
            <StepCardContent data={s} />
          </div>
        ))}
      </div>

      {/* desktop: interactive draggable flow */}
      <div className="relative hidden h-[36rem] w-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.02] lg:block">
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.08, maxZoom: 1.4 }}
        minZoom={0.4}
        maxZoom={1.6}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={22} color="rgba(165,148,232,0.25)" />
        <Controls
          position="bottom-right"
          showInteractive={false}
          className="shadow-none!"
        />
      </ReactFlow>
      <span className="pointer-events-none absolute bottom-4 left-4 z-10 text-[11px] uppercase tracking-widest text-black/30">
        drag the cards ✦
      </span>
      </div>
    </>
  );
}
