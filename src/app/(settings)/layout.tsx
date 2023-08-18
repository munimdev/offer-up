"use client";

import Sidebar from "@/components/navbar/siderbar";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row px-20 py-10">
      <Sidebar />
      {children}
    </div>
  );
}
