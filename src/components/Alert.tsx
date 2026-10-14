import { AlertTriangle, ShieldAlert, Info, CheckCircle, XCircle } from 'lucide-react';

type Variant = 'warning' | 'danger' | 'info' | 'success' | 'error';

interface AlertProps {
  variant: Variant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<Variant, { bg: string; border: string; text: string; icon: typeof Info }> = {
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: AlertTriangle },
  danger: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', icon: ShieldAlert },
  info: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', icon: Info },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
  error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: XCircle },
};

export function Alert({ variant, title, children, className = '' }: AlertProps) {
  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    <div className={`rounded-xl border-2 ${cfg.bg} ${cfg.border} p-4 ${className}`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${cfg.text} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && <p className={`font-semibold ${cfg.text} text-sm mb-1`}>{title}</p>}
          <div className={`text-sm ${cfg.text} leading-relaxed`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
