import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const files = [
  ["hero/suburban-home.jpg", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80"],
  ["hero/service.jpg", "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["ac/outdoor-unit.jpg", "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["ac/condenser-close.jpg", "https://images.pexels.com/photos/4489740/pexels-photo-4489740.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["services/technician.jpg", "https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["services/panel.jpg", "https://images.unsplash.com/photo-1621905252507-b35492cc74f4?auto=format&fit=crop&w=1400&q=80"],
  ["services/thermostat.jpg", "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["emergency/technician-work.jpg", "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["furnace/mechanical-room.jpg", "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80"],
  ["furnace/industrial-pipes.jpg", "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80"],
  ["commercial/building.jpg", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"],
  ["commercial/office.jpg", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"],
  ["about/home-keys.jpg", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"],
  ["about/house.jpg", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"],
  ["local/neighborhood.jpg", "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/brick-home.jpg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/colonial.jpg", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"],
  ["local/ranch.jpg", "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["maintenance/tools.jpg", "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["heat-pump/install.jpg", "https://images.pexels.com/photos/8961257/pexels-photo-8961257.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["heat-pump/outdoor.jpg", "https://images.unsplash.com/photo-1631545796609-2c2c2c2c2c2c?auto=format&fit=crop&w=1600&q=80"],
  ["ductless/indoor.jpg", "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["iaq/vents.jpg", "https://images.pexels.com/photos/8134848/pexels-photo-8134848.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["iaq/ducts.jpg", "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=80"],
];

const fallbacks = {
  "heat-pump/outdoor.jpg": "https://images.pexels.com/photos/4489740/pexels-photo-4489740.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "heat-pump/install.jpg": "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "emergency/technician-work.jpg": "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "iaq/vents.jpg": "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80",
  "iaq/ducts.jpg": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80",
  "ductless/indoor.jpg": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "services/thermostat.jpg": "https://images.unsplash.com/photo-1545259741-2ea0ebf3ed0c?auto=format&fit=crop&w=1400&q=80",
};

async function grab(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 NewarkHVACRebuild/1.0", Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`too small ${url}`);
  return buf;
}

async function exists(path) {
  try {
    const s = await stat(path);
    return s.size > 8000;
  } catch {
    return false;
  }
}

for (const [rel, url] of files) {
  const dest = join(root, rel);
  await mkdir(dirname(dest), { recursive: true });
  if (await exists(dest)) {
    console.log("skip", rel);
    continue;
  }
  try {
    const buf = await grab(url);
    await writeFile(dest, buf);
    console.log("ok", rel, buf.length);
  } catch (err) {
    const alt = fallbacks[rel];
    if (!alt) {
      console.error("fail", rel, err.message);
      continue;
    }
    try {
      const buf = await grab(alt);
      await writeFile(dest, buf);
      console.log("fallback", rel, buf.length);
    } catch (err2) {
      console.error("fail", rel, err2.message);
    }
  }
}
