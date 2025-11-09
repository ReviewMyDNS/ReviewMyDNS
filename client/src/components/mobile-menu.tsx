import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Globe, Code, FileText, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "DNS Checker", href: "/", icon: Globe },
    { name: "Tools", href: "/tools", icon: Code },
    { name: "API", href: "/api-docs", icon: Code },
    { name: "Terminology", href: "/documentation", icon: FileText },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <h2 className="text-lg font-semibold">ReviewMyDNS</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Authentication Buttons */}
          <div className="p-4 border-t space-y-3">
            <Link href="/signin">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signin?tab=signup">
              <Button
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}