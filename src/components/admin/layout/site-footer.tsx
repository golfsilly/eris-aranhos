import Link from "next/link";
import { Heart } from "lucide-react";

export function AdminSiteFooter() {
  return (
    <footer className="border-t bg-background/50">
      <div className="px-2 py-2 lg:px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by</span>
            <Link
              href="https://aranhos.moph.go.th/digital-health-mission/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-sidebar-primary transition-colors"
            >
              Digital Health Mission | Aranyaprathet Hospital
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
