// Pull pickRoom out of lib/rooms.js without its "server-only" import.
import fs from "node:fs";
const src = fs.readFileSync("lib/rooms.js", "utf8");
const body = src.slice(src.indexOf("export function pickRoom"));
const fn = body.slice(0, body.indexOf("\n}\n") + 3).replace("export function", "function");
const pickRoom = new Function(fn + "; return pickRoom;")();

const T = [{ id: 1, name: "T1", capacity: 3 }, { id: 2, name: "T2", capacity: 3 }];
const ONE = [{ year: 2026, month: 11 }];
const TWO = [{ year: 2026, month: 11 }, { year: 2026, month: 12 }];
const occ = (room_id, y, m, gender, n = 1) =>
  Array.from({ length: n }, () => ({ room_id, stay_year: y, stay_month: m, gender }));

let pass = 0, fail = 0;
const is = (label, got, want) => {
  const ok = got === want;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${ok ? "" : `  (got ${got}, wanted ${want})`}`);
  ok ? pass++ : fail++;
};

is("empty ashram -> first room in order",
   pickRoom({ candidates: T, held: [], months: ONE, gender: "female", groupSize: 1 }).room?.name, "T1");

is("T1 has 2 women, 1 bed left -> fills T1",
   pickRoom({ candidates: T, held: occ(1, 2026, 11, "female", 2), months: ONE, gender: "female", groupSize: 1 }).room?.name, "T1");

is("T1 full -> moves to T2",
   pickRoom({ candidates: T, held: occ(1, 2026, 11, "female", 3), months: ONE, gender: "female", groupSize: 1 }).room?.name, "T2");

is("T1 holds men, woman books -> T2",
   pickRoom({ candidates: T, held: occ(1, 2026, 11, "male", 1), months: ONE, gender: "female", groupSize: 1 }).room?.name, "T2");

is("group of 3, T1 has 1 person -> needs the empty T2",
   pickRoom({ candidates: T, held: occ(1, 2026, 11, "female", 1), months: ONE, gender: "female", groupSize: 3 }).room?.name, "T2");

is("everything full -> nothing, reason room_full",
   pickRoom({ candidates: T, held: [...occ(1,2026,11,"female",3), ...occ(2,2026,11,"female",3)], months: ONE, gender: "female", groupSize: 1 }).why, "room_full");

is("all rooms held by men, woman books -> reason gender_locked",
   pickRoom({ candidates: T, held: [...occ(1,2026,11,"male",1), ...occ(2,2026,11,"male",1)], months: ONE, gender: "female", groupSize: 1 }).why, "gender_locked");

// 500 hour: needs the same bed in BOTH months.
is("500hr, T1 free in Nov but full in Dec -> T2",
   pickRoom({ candidates: T, held: occ(1, 2026, 12, "female", 3), months: TWO, gender: "female", groupSize: 1 }).room?.name, "T2");

is("500hr, T1 free both months -> T1",
   pickRoom({ candidates: T, held: occ(2, 2026, 11, "female", 3), months: TWO, gender: "female", groupSize: 1 }).room?.name, "T1");

is("500hr, second month held by men -> T2",
   pickRoom({ candidates: T, held: occ(1, 2026, 12, "male", 1), months: TWO, gender: "female", groupSize: 1 }).room?.name, "T2");

is("no rooms at all -> nothing",
   pickRoom({ candidates: [], held: [], months: ONE, gender: "female", groupSize: 1 }).room, null);

console.log(`\n  ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
