"use client"

import MacOSDock from "@/components/ui/mac-os-dock"

const dockApps = [
  {
    id: "safari",
    name: "Safari",
    icon: "/dock-icons/Safari@4x 1.png"
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: "/dock-icons/Calendar@4x 1.png"
  },
  {
    id: "hush",
    name: "Hush",
    icon: "/hush-icon.png",
    iconScale: 1.08,
  },
  {
    id: "pages",
    name: "Pages",
    icon: "/dock-icons/Pages@4x 1.png"
  },
  {
    id: "news",
    name: "News",
    icon: "/dock-icons/News@4x 1.png"
  },
]

export function Dock() {
  return (
    <MacOSDock
      apps={dockApps}
      openApps={["hush"]}
      onAppClick={(appId) => {
        if (appId === "hush") {
          window.location.href = "/download"
        }
      }}
    />
  )
}
