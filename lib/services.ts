export type Service = {
  slug: string;
  title: string;
  icon:
    | "AppWindow"
    | "Building2"
    | "Rows3"
    | "Sun"
    | "Grid3x3"
    | "CloudRain"
    | "BatteryCharging"
    | "SprayCan"
    | "Lightbulb"
    | "Feather"
    | "Fence"
    | "Fan"
    | "Home";
  short: string;
  long: string;
  /** Path under /public to a real photo of this service, e.g. "/services/interior-window-cleaning.jpg". Falls back to the icon when unset. */
  image?: string;
};

export const services: Service[] = [
  {
    slug: "interior-window-cleaning",
    title: "Interior Window Cleaning",
    icon: "AppWindow",
    short: "Streak-free glass, inside every room.",
    long:
      "We work pane by pane with squeegee tools sharpened to a fine edge, clearing dust, fingerprints, and haze from every interior surface. No streaks, no drips on the sill, no shortcuts — just glass you forget is even there.",
    image: "/services/interior-window-cleaning.jpg",
  },
  {
    slug: "exterior-window-cleaning",
    title: "Exterior Window Cleaning",
    icon: "Building2",
    short: "The curb-appeal finish Fort Worth notices.",
    long:
      "Texas dust, pollen, and hard water spots don't stand a chance. We hand-clean every exterior pane and frame, restoring the clear sightlines that make a home look cared-for from the street.",
    image: "/services/exterior-window-cleaning.png",
  },
  {
    slug: "window-track-cleaning",
    title: "Window Track Cleaning",
    icon: "Rows3",
    short: "The grime you never see, gone.",
    long:
      "Tracks and sills collect years of dirt that regular cleaning never reaches. We detail every channel by hand so your windows glide like new and look as good closed as they do open.",
    image: "/services/window-track-cleaning.jpg",
  },
  {
    slug: "skylight-cleaning",
    title: "Skylight Cleaning",
    icon: "Sun",
    short: "Let the actual sunlight back in.",
    long:
      "Skylights take the brunt of the weather and it shows. We safely clean interior and accessible exterior surfaces so natural light pours back into the room the way it was designed to.",
    image: "/services/skylight-cleaning.jpg",
  },
  {
    slug: "screen-cleaning",
    title: "Screen Cleaning",
    icon: "Grid3x3",
    short: "Clear mesh, better airflow, better view.",
    long:
      "Screens trap pollen, dust, and grime that fog up your whole view without you noticing. We remove, clean, and reset every screen so the mesh stays clear and airflow stays honest.",
    image: "/services/screen-cleaning.jpg",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning & Flush",
    icon: "CloudRain",
    short: "Protect the house from the top down.",
    long:
      "Clogged gutters send water where it doesn't belong. We clear debris, flush every downspout, and check flow end to end — cheap insurance against fascia damage and foundation trouble.",
    image: "/services/gutter-cleaning.jpg",
  },
  {
    slug: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    icon: "BatteryCharging",
    short: "Dirty panels are panels losing you money.",
    long:
      "Dust and pollen film cuts panel output more than most homeowners realize. We hand-clean your array with non-abrasive methods to help your system run closer to the efficiency you paid for.",
    image: "/services/solar-panel-cleaning.jpg",
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    icon: "SprayCan",
    short: "Driveways, siding, and walkways — reset.",
    long:
      "From driveways to siding to walkways, we dial in pressure and technique for each surface, lifting years of grime without damaging what's underneath. Old-fashioned elbow grease, modern equipment.",
    image: "/services/power-washing.jpg",
  },
  {
    slug: "light-fixture-cleaning",
    title: "Light Fixture Cleaning",
    icon: "Lightbulb",
    short: "Fixtures that actually look as bright as they shine.",
    long:
      "Ceiling fans, chandeliers, and light fixtures collect dust that regular cleaning never reaches. We clean every fixture by hand so your rooms look as bright as the bulbs inside them.",
    image: "/services/light-fixture-cleaning.jpg",
  },
  {
    slug: "high-dusting",
    title: "High Dusting",
    icon: "Feather",
    short: "The corners and ceiling lines nobody else reaches.",
    long:
      "Ceiling fans, crown molding, vents, and those high corners cobwebs love — we get to all of it with the right tools, so the whole room feels clean, not just the parts at eye level.",
    image: "/services/high-dusting.jpg",
  },
  {
    slug: "glass-railing-cleaning",
    title: "Glass Railing Cleaning",
    icon: "Fence",
    short: "Crystal-clear railings, streak-free.",
    long:
      "Balcony and staircase glass railings take fingerprints and hard water spots fast. We hand-clean every panel to a streak-free shine that lets the view through, not the grime.",
    image: "/services/glass-railing-cleaning.jpg",
  },
  {
    slug: "vent-hood-cleaning",
    title: "Vent Hood Cleaning",
    icon: "Fan",
    short: "Kitchen vent hoods, degreased and gleaming.",
    long:
      "Cooking grease builds up on vent hoods fast and stays there. We break down and clean off the buildup so your kitchen hood looks (and works) like new again.",
    image: "/services/vent-hood-cleaning.jpg",
  },
  {
    slug: "roof-wash",
    title: "Roof Wash",
    icon: "Home",
    short: "Clear the streaks and moss, protect what's underneath.",
    long:
      "Algae streaks and moss don't just look bad — left alone, they shorten your roof's life. We wash roofs safely and thoroughly, protecting curb appeal and the shingles underneath.",
    image: "/services/roof-wash.jpg",
  },
];
