import { notFound } from "next/navigation";
import {
  CompanionScreen,
  CreateScreen,
  EventScreen,
  ExploreScreen,
  GameScreen,
  GuestWebPage,
  HomeScreen,
  InventoryScreen,
  PlanningScreen,
  PlansScreen,
  ProfileScreen,
  QrScreen,
  RsvpScreen,
  ScanScreen,
  ShareScreen,
  SplitScreen,
  TemplatesScreen,
  VendorsScreen,
} from "@/components/screens";

// Development only: every app screen side by side, at full size.
// The first one (#shot) is the texture on the hero's 3D phone. To refresh it,
// run `npm run dev`, open /dev/screens and capture #shot at 3x into
// public/app/hero-screen.png.
export const metadata = { robots: { index: false, follow: false } };

export default function DevScreens() {
  if (process.env.NODE_ENV === "production") notFound();
  const all = [
    <HomeScreen key="home" />,
    <CreateScreen key="create" />,
    <ExploreScreen key="explore" />,
    <PlansScreen key="plans" />,
    <ProfileScreen key="profile" />,
    <RsvpScreen key="rsvp" />,
    <InventoryScreen key="inv" />,
    <TemplatesScreen key="tpl" />,
    <VendorsScreen key="ven" />,
    <PlanningScreen key="plan" />,
    <ShareScreen key="share" />,
    <SplitScreen key="split" />,
    <CompanionScreen key="comp" />,
    <GameScreen key="game" />,
    <QrScreen key="qr" />,
    <ScanScreen key="scan" met />,
  ];
  return (
    <main className="bg-white p-10">
      <div className="flex flex-wrap gap-6">
        <div id="shot" className="outline outline-1 outline-black/20">
          <EventScreen />
        </div>
        {all.map((s) => (
          <div key={s.key} className="outline outline-1 outline-black/20">
            {s}
          </div>
        ))}
        <div className="w-[278px] outline outline-1 outline-black/20">
          <GuestWebPage compact />
        </div>
      </div>
    </main>
  );
}
