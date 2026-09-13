import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(fileURLToPath(new URL(".", import.meta.url)), "..", "public", "images", "_candidates");
await mkdir(dir, { recursive: true });

const files = [
  ["pexels-7031406.jpg", "https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["pexels-380769.jpg", "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["pexels-585419.jpg", "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["pexels-257736.jpg", "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["pexels-1115804.jpg", "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["unsplash-ducts.jpg", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80"],
  ["unsplash-house2.jpg", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"],
  ["unsplash-interior.jpg", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"],
  ["unsplash-industrial.jpg", "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"],
  ["unsplash-tech.jpg", "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80"],
  ["unsplash-office.jpg", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"],
  ["pixabay-ac1.jpg", "https://cdn.pixabay.com/photo/2017/09/07/19/15/air-conditioning-2725795_1280.jpg"],
  ["pixabay-ac2.jpg", "https://cdn.pixabay.com/photo/2020/04/24/07/21/air-conditioner-5085875_1280.jpg"],
  ["pixabay-heat.jpg", "https://cdn.pixabay.com/photo/2014/07/10/17/18/heating-389351_1280.jpg"],
  ["pixabay-ac3.jpg", "https://cdn.pixabay.com/photo/2017/06/13/22/42/air-conditioner-2401166_1280.jpg"],
  ["pixabay-ac4.jpg", "https://cdn.pixabay.com/photo/2016/10/22/17/10/air-conditioner-1760997_1280.jpg"],
];

async function grab(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "NewarkHVACPros/1.0", Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 10000) throw new Error("small " + buf.length);
  return buf;
}

for (const [name, url] of files) {
  try {
    const buf = await grab(url);
    await writeFile(join(dir, name), buf);
    console.log("ok", name, buf.length);
  } catch (err) {
    console.error("fail", name, err.message);
  }
}
