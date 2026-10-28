import React from 'react';
import { RequestStatus, RequestTimelineEvent } from '../../types';
import {
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  Coffee,
  Ship,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface TimelineTrackerProps {
  currentStatus: RequestStatus;
  timelineEvents: RequestTimelineEvent[];
}

interface StageDefinition {
  status: RequestStatus;
  label: string;
  defaultMessage: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STAGES: StageDefinition[] = [
  {
    status: 'Submitted',
    label: '1. Submitted',
    defaultMessage: 'Your coffee request has been received.',
    icon: Send
  },
  {
    status: 'Under Review',
    label: '2. Under Review',
    defaultMessage: 'Our team is reviewing your requirements.',
    icon: Clock
  },
  {
    status: 'Quote Prepared',
    label: '3. Quote Prepared',
    defaultMessage: 'A quotation has been prepared for your request.',
    icon: FileCheck
  },
  {
    status: 'Buyer Confirmation',
    label: '4. Buyer Confirmation',
    defaultMessage: 'Awaiting your confirmation of the quote specifications.',
    icon: CheckCircle2
  },
  {
    status: 'Processing',
    label: '5. Processing',
    defaultMessage: 'Coffee preparation and processing at the station.',
    icon: Coffee
  },
  {
    status: 'Ready for Export',
    label: '6. Ready for Export',
    defaultMessage: 'Lot inspection, documentation, and staging.',
    icon: Ship
  },
  {
    status: 'Completed',
    label: '7. Completed',
    defaultMessage: 'Export delivery executed to international buyer.',
    icon: Sparkles
  }
];

export const TimelineTracker: React.FC<TimelineTrackerProps> = ({
  currentStatus,
  timelineEvents
}) => {
  const currentIndex = STAGES.findIndex((s) => s.status === currentStatus);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  // Build a lookup map of recorded timeline events
  const eventMap = new Map<RequestStatus, RequestTimelineEvent>();
  for (const ev of timelineEvents) {
    eventMap.set(ev.status, ev);
  }

  return (
    <div className="w-full space-y-8">
      {/* Horizontal Stepper Progress Indicator (Desktop & Tablet) */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-[#E2D6C2] -z-0" />
          {/* Active Highlight Track Line */}
          <div
            className="absolute top-5 left-8 h-1 bg-[#14281D] transition-all duration-500 -z-0"
            style={{
              width: `${(activeIndex / (STAGES.length - 1)) * 100}%`
            }}
          />

          {STAGES.map((stage, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isUpcoming = idx > activeIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.status} className="flex flex-col items-center text-center max-w-[120px] relative z-10">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-[#14281D] text-[#C8963E] border-2 border-[#C8963E] ring-4 ring-[#C8963E]/20 shadow-md scale-105'
                      : isCompleted
                      ? 'bg-[#1E3F2D] text-[#FAF5EE] border border-[#2D5E43]'
                      : 'bg-[#F2ECE1] text-[#A8987E] border border-[#DECFBB]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-2.5">
                  <span
                    className={`block text-xs font-serif font-bold ${
                      isCurrent
                        ? 'text-[#14281D]'
                        : isCompleted
                        ? 'text-[#1E3F2D]'
                        : 'text-[#8C7A68]'
                    }`}
                  >
                    {stage.label.split('. ')[1]}
                  </span>
                  <span className="block text-[10px] text-[#8C7A68] mt-0.5">
                    {isCurrent ? 'Active Stage' : isCompleted ? 'Passed' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Event Cards Timeline (Mobile, Tablet, and Detailed Log) */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A5B35]">
          Request Lifecycle History
        </h4>

        <div className="space-y-3">
          {STAGES.slice(0, activeIndex + 1).map((stage, idx) => {
            const event = eventMap.get(stage.status);
            const isCurrent = idx === activeIndex;
            const Icon = stage.icon;

            const formattedDate = event?.timestamp
              ? new Date(event.timestamp).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Logged';

            return (
              <div
                key={stage.status}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isCurrent
                    ? 'bg-[#FAF5EE] border-[#C8963E] shadow-sm'
                    : 'bg-white border-[#E2D6C2]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isCurrent
                      ? 'bg-[#14281D] text-[#C8963E]'
                      : 'bg-[#EBF6EE] text-[#1D5E34]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="grow space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-sm font-serif font-bold text-[#14281D]">
                      {stage.label}
                    </span>
                    <span className="text-[11px] text-[#8C7A68] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C4D3F]">
                    {event?.message || stage.defaultMessage}
                  </p>

                  {isCurrent && (
                    <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-[#1D5E34] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      <span>Current operational status</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Show Next Expected Step Indicator */}
          {activeIndex < STAGES.length - 1 && (
            <div className="p-3 rounded-xl bg-[#F2ECE1]/60 border border-dashed border-[#D5C9B6] flex items-center gap-3 text-xs text-[#7A5B35]">
              <Clock className="w-4 h-4 text-[#A8987E] shrink-0" />
              <span>
                <strong>Next Milestone:</strong> {STAGES[activeIndex + 1].label} (Our staff operations team updates status as coffee preparation proceeds)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
