import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const files = [
  // Hero — technician working on an outdoor AC / heat-pump unit
  ["hero/service.jpg", "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["services/technician.jpg", "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["emergency/technician-work.jpg", "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1600"],

  // Cooling — American-style outdoor condenser
  ["ac/outdoor-unit.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Condenser_unit_for_central_air_conditioning.JPG?width=1600"],
  ["ac/condenser-close.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Inside_of_split_type_ac_outdoor_unit.jpg?width=1400"],

  // Heat pumps
  ["heat-pump/install.jpg", "https://images.pexels.com/photos/38067246/pexels-photo-38067246.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["heat-pump/outdoor.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Condenser_unit_for_central_air_conditioning.JPG?width=1600"],

  // Commercial rooftop
  ["commercial/building.jpg", "https://images.pexels.com/photos/8456426/pexels-photo-8456426.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["commercial/office.jpg", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"],

  // Furnace / mechanical
  ["furnace/mechanical-room.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/HVAC_Air_Handler_Unit%2C_pic1.JPG?width=1600"],
  ["furnace/industrial-pipes.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Condensing_Furnace_Outlet.jpg?width=1400"],

  // Indoor air / ducts
  ["iaq/ducts.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/HVAC_Air_Handler_Unit%2C_pic2.JPG?width=1400"],
  ["iaq/vents.jpg", "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80"],
  ["ductless/indoor.jpg", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80"],

  // Electrical / maintenance
  ["services/panel.jpg", "https://images.unsplash.com/photo-1621905252507-b35492cc74f4?auto=format&fit=crop&w=1400&q=80"],
  ["services/thermostat.jpg", "https://images.unsplash.com/photo-1545259741-2ea0ebf3ed0c?auto=format&fit=crop&w=1400&q=80"],
  ["maintenance/tools.jpg", "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=80"],

  // Local / homes — American residential
  ["hero/suburban-home.jpg", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80"],
  ["about/house.jpg", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"],
  ["about/home-keys.jpg", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"],
  ["local/neighborhood.jpg", "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/brick-home.jpg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/colonial.jpg", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"],
  ["local/ranch.jpg", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600"],
];

async function grab(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "NewarkHVACPros/1.0 (https://newark-de-hvac.vercel.app/; image-rebuild)",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get("content-type") || "";
  if (type.includes("text/html")) throw new Error(`html ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 12000) throw new Error(`too small ${buf.length} ${url}`);
  return buf;
}

for (const [rel, url] of files) {
  const dest = join(root, rel);
  await mkdir(dirname(dest), { recursive: true });
  try {
    const buf = await grab(url);
    await writeFile(dest, buf);
    console.log("ok", rel, buf.length);
  } catch (err) {
    console.error("fail", rel, err.message);
  }
}
