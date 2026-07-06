import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MaintenanceControlProps {
  isMaintenance: boolean;
  onToggleClick: () => void;
}

export const MaintenanceControl: React.FC<MaintenanceControlProps> = ({
  isMaintenance,
  onToggleClick,
}) => {
  return (
    <Card className="border border-border/60 bg-card/30 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300">
      <CardContent className="p-4 space-y-5">
        {/* Header Title section */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <AlertTriangle
                className={`h-4 w-4 ${isMaintenance ? 'text-amber-500 animate-pulse' : 'text-muted-foreground'}`}
              />
              Maintenance Mode
            </h3>
            <p className="text-xs text-muted-foreground">
              Restrict public access to the client applications during updates.
            </p>
          </div>
        </div>

        {/* Status & Toggle switch row */}
        <div className="flex items-center justify-between py-2 border-t border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {isMaintenance ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </>
              ) : (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </>
              )}
            </span>
            <span className="text-xs font-medium text-foreground">
              {isMaintenance
                ? 'Restricted access active'
                : 'System fully operational'}
            </span>
          </div>

          {/* Premium iOS-style Toggle Switch */}
          <button
            type="button"
            onClick={onToggleClick}
            className={`w-11 h-6 rounded-full transition-all duration-300 relative focus:outline-none ${
              isMaintenance
                ? 'bg-amber-500'
                : 'bg-muted hover:bg-muted-foreground/20'
            }`}
            aria-label="Toggle maintenance mode"
          >
            <span
              className={`w-5 h-5 bg-background rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                isMaintenance ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Warning text */}
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Activating maintenance mode terminates active user websocket sessions
          and blocks new sign-ins instantly.
        </p>
      </CardContent>
    </Card>
  );
};
