import { useState } from 'react';
import { LucideMusic, LucidePackage, LucideInfo , User2Icon} from "lucide-react";
import { NavLink } from 'react-router-dom';
const navLinks = [
    { label: 'Beats', href: "/beats" },
    { label: 'Sample Pack', href: "/sample-pack" },
    { label: 'About', href: "/about" },
    { label: 'Account', href: "/Userprofile" },
];

function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    const icons = {
        Beats: LucideMusic,
        "Sample Pack": LucidePackage,
        About: LucideInfo,
        Account: User2Icon
    };


    return (
        <div
            className={`hidden lg:block min-h-screen bg-gray-900 text-white pt-5 box-border transition-all duration-200 ${expanded ? 'w-52' : 'w-16'}`}
        >
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="ml-2 mb-5 bg-transparent border-none text-white cursor-pointer text-lg focus:outline-none"
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
                {expanded ? '⏴' : '⏵'}
            </button>
            <nav>
                {navLinks.map((link) => {
                    const Icon = icons[link.label];
                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:bg-gray-800 rounded transition-colors"
                        >
                            <Icon size={20} />
                            {expanded ? link.label : null}
                        </a>
                    );
                })}

            </nav>
        </div>
    );
}

export default Sidebar;
