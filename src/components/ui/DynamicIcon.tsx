"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
    name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        // Fallback icon if the name doesn't exist
        return <LucideIcons.HelpCircle {...props} />;
    }

    return <IconComponent {...props} />;
};

export default DynamicIcon;
