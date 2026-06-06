import { APP_CONFIG } from "@/config/app-config";
import { Hospital, ShieldCheck } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="col-span-2 row-start-3 border-t bg-background">
      <div className="flex h-12 items-center justify-between px-5 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>
            ERIS • Emergency Room Information System
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Hospital className="h-3.5 w-3.5" />
            <span>โรงพยาบาลอรัญประเทศ</span>
          </div>

          <span className="font-mono">
            v{APP_CONFIG.app.version}
          </span>

          <span>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}