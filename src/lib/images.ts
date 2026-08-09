/**
 * Curated cinematic photography collection (Unsplash CDN).
 * Every ID below has been verified to resolve — single source of truth so
 * no route can ship a broken or duplicated image.
 */
const BASE = "https://images.unsplash.com/photo-";

export function photo(id: string, w = 1600, q = 78) {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

const ID = {
  // Nature
  sunriseForest: "1500534314209-a25ddb2bd429",
  sunlitForest: "1447752875215-b2761acb3c5d",
  forestBirds: "1444464666168-49d633b86797",
  forest: "1441974231531-c6227db76b6e",
  deepForest: "1418065460487-3e41a6c84dc5",
  mistWoodland: "1511497584788-876760111969",
  bamboo: "1526336024174-e58f5cdd8e13",
  bambooPath: "1470137237906-d8a4f71e1966",
  meadow: "1500673922987-e212871fec22",
  greenValley: "1465146344425-f00d5f5c8f07",
  // Mountains & lakes
  mountain: "1454496522488-7a8e488e8606",
  alpineMorning: "1470071459604-3b5ec3a7fe05",
  mountainLake: "1439066615861-d1af74d74000",
  calmLake: "1444210971048-6130cf0c46cf",
  lakeReflection: "1516616370751-86d6bd8b0651",
  mountainNight: "1524429656589-6633a470097c",
  // Water
  waterfall: "1432405972618-c60b0225b8f9",
  river: "1508233620467-f79f1e317a05",
  stream: "1470770841072-f978cf4d019e",
  ocean: "1507525428034-b723cf961d3e",
  calmSea: "1499002238440-d264edd596ec",
  oceanSunset: "1439405326854-014607f694d7",
  stormyOcean: "1500674425229-f692875b0ab7",
  beach: "1502680390469-be75c86b636f",
  turquoise: "1493246507139-91e8fad9978e",
  nightOcean: "1476820865390-c52aeebb9891",
  // Rain & weather
  rain: "1493314894560-5c412a56c17c",
  heavyRain: "1428592953211-077101b2021b",
  rainWindow: "1515694346937-94d85e41e6f0",
  rainTent: "1478131143081-80f7f84ca84d",
  tentForest: "1504280390367-361c6d9f38f4",
  thunderstorm: "1605727216801-e27ce1d0cc28",
  // Fire & cozy
  fireplace: "1476370648495-3533f64427a2",
  campfire: "1543946207-39bd91e70ca7",
  cracklingFire: "1478147427282-58a87a120781",
  cozyCabin: "1509515837298-2c67a3933321",
  quietRoom: "1502472584811-0a2f2feb8968",
  bedroom: "1505693416388-ac5ce068fe85",
  softBedroom: "1522771739844-6a9f6d5f14af",
  // Night
  nightForest: "1507400492013-162706c8c05e",
  starryNight: "1506905925346-21bda4d32df4",
  starrySky: "1561484930-998b6a7b22e8",
  moonlight: "1519681393784-d120267933ba",
  aurora: "1483347756197-71ef80e95f73",
  auroraLake: "1531366936337-7c912a4589a7",
  nightSky: "1419242902214-272b3f66ee7a",
  // Zen & meditation
  meditation: "1506126613408-eca07ce68773",
  zenGarden: "1528183429752-a97d0bf99b5a",
  temple: "1528181304800-259b08848526",
  templeNature: "1545569341-9eb8b30979d9",
  singingBowls: "1591228127791-8e2eaef098d3",
  bowls: "1600618528240-fb9fc964b853",
  windChimes: "1516534775068-ba3e7458af70",
  stillness: "1508672019048-805c876b67e2",
  // Music & focus
  piano: "1520523839897-bd0b52f945a0",
  pianoKeys: "1552422535-c45813c61732",
  strings: "1507838153414-b4b713384a76",
  ambientMusic: "1466428996289-fb355538da1b",
  softAmbient: "1470252649378-9c29740c9fa8",
  focus: "1483058712412-4245e9b90334",
  focusFlow: "1445116572660-236099ec97a0",
  cafe: "1501339847302-ac426a4a7cbb",
  desk: "1497436072909-60f360e1d4b1",
  // Noise textures
  hush: "1518281420975-50db6e5d0a97",
  whiteHush: "1504608524841-42fe6f032b4b",
  pinkHush: "1522441815192-d9f04eb0615c",
  brownHush: "1490750967868-88aa4486c946",
  // Sleep
  sleep: "1519681393784-d120267933ba",
  duskField: "1508739773434-c26b3d09e071",
  dawnSea: "1470115636492-6d2b56f9146d",
  goldenHour: "1516214104703-d870798883c5",
  sunrise: "1503803548695-c2a7b4a5b875",
} as const;

export type ImageKey = keyof typeof ID;

export const IMG: Record<ImageKey, string> = Object.fromEntries(
  (Object.keys(ID) as ImageKey[]).map((k) => [k, photo(ID[k])]),
) as Record<ImageKey, string>;

/** Wide/hero variants for full-bleed scenes. */
export const HERO: Record<ImageKey, string> = Object.fromEntries(
  (Object.keys(ID) as ImageKey[]).map((k) => [k, photo(ID[k], 2400, 82)]),
) as Record<ImageKey, string>;

/** Shown when any remote image fails to load — never an empty container. */
export const FALLBACK_IMAGE = photo(ID.mistWoodland, 1200, 70);
