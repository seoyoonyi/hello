import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="flex justify-between lg:sticky lg:top-20">
        <nav
          className="relative flex flex-row items-start px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row pr-10 space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative flex px-2 py-1 m-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
        <ThemeToggle />
      </div>
    </aside>
  );
}
