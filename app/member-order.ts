import type { Member } from "./members-data";

const alphabetical = new Intl.Collator("es", { sensitivity: "base", numeric: true });

function category(member: Member): number {
  const role = member.role.trim();
  if (/^cofundador(?:a)?\b/i.test(role)) return 0;
  if (/^l[ií]der\b/i.test(role)) return 1;
  return 2;
}

function primaryArea(member: Member): string {
  const role = member.role.trim();
  if (!role || /^miembro$/i.test(role)) return "";
  return role.split("|")[0].trim().replace(/^BEWAY\s+/i, "").replace(/\s+/g, " ");
}

export function sortMembers(items: readonly Member[]): Member[] {
  return [...items].sort((left, right) => {
    const leftCategory = category(left);
    const categoryOrder = leftCategory - category(right);
    if (categoryOrder) return categoryOrder;

    if (leftCategory === 2) {
      const leftArea = primaryArea(left);
      const rightArea = primaryArea(right);
      if (!leftArea && rightArea) return 1;
      if (leftArea && !rightArea) return -1;
      const areaOrder = alphabetical.compare(leftArea, rightArea);
      if (areaOrder) return areaOrder;
    }

    return alphabetical.compare(left.name, right.name) || alphabetical.compare(left.id, right.id);
  });
}
