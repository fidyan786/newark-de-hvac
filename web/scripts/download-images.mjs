import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const live = "https://newark-de-hvac.vercel.app/images";

const files = [
  ["hero/service.jpg", `${live}/hero/service.jpg`, "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["hero/suburban-home.jpg", `${live}/hero/suburban-home.jpg`, "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80"],
  ["services/technician.jpg", `${live}/services/technician.jpg`, "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["ac/outdoor-unit.jpg", `${live}/ac/outdoor-unit.jpg`, "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["ac/condenser-close.jpg", `${live}/ac/condenser-close.jpg`, "https://images.pexels.com/photos/4489740/pexels-photo-4489740.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["heat-pump/install.jpg", `${live}/heat-pump/install.jpg`, "https://images.pexels.com/photos/38067246/pexels-photo-38067246.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["heat-pump/outdoor.jpg", `${live}/heat-pump/outdoor.jpg`, "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["commercial/building.jpg", `${live}/commercial/building.jpg`, "https://images.pexels.com/photos/8456426/pexels-photo-8456426.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["commercial/office.jpg", `${live}/commercial/office.jpg`, "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"],
  ["furnace/mechanical-room.jpg", `${live}/furnace/mechanical-room.jpg`, "https://images.unsplash.com/photo-1621905252507-b35492cc74f4?auto=format&fit=crop&w=1600&q=80"],
  ["furnace/industrial-pipes.jpg", `${live}/furnace/industrial-pipes.jpg`, "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80"],
  ["iaq/ducts.jpg", `${live}/iaq/ducts.jpg`, "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=80"],
  ["iaq/vents.jpg", `${live}/iaq/vents.jpg`, "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80"],
  ["ductless/indoor.jpg", `${live}/ductless/indoor.jpg`, "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80"],
  ["services/panel.jpg", `${live}/services/panel.jpg`, "https://images.unsplash.com/photo-1621905252507-b35492cc74f4?auto=format&fit=crop&w=1400&q=80"],
  ["maintenance/tools.jpg", `${live}/maintenance/tools.jpg`, "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["about/house.jpg", `${live}/about/house.jpg`, "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"],
  ["local/neighborhood.jpg", `${live}/local/neighborhood.jpg`, "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/brick-home.jpg", `${live}/local/brick-home.jpg`, "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["local/colonial.jpg", `${live}/local/colonial.jpg`, "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"],
  ["local/ranch.jpg", `${live}/local/ranch.jpg`, "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600"],
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
  if (buf.length < 8000) throw new Error(`too small ${buf.length} ${url}`);
  return buf;
}

for (const [rel, ...urls] of files) {
  const dest = join(root, rel);
  await mkdir(dirname(dest), { recursive: true });
  let ok = false;
  for (const url of urls) {
    try {
      const buf = await grab(url);
      await writeFile(dest, buf);
      console.log("ok", rel, buf.length);
      ok = true;
      break;
    } catch (err) {
      console.error("fail", rel, url, err.message);
    }
  }
  if (!ok) console.error("MISSING", rel);
}
