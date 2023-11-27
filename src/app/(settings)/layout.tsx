"use client";

import Sidebar from "@/components/navbar/siderbar";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row justify-between px-1 xs:px-6 lg:px-10 py-4 sm:py-10">
      <Sidebar />
      {children}
    </div>
  );
}
