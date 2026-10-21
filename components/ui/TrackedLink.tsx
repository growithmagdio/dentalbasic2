"use client";

import { track } from "@/lib/contact";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; location: string };

/** A plain <a> that also records an analytics event (call, WhatsApp, directions, book). */
export function TrackedLink({ event, location, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, { location });
        onClick?.(e);
      }}
    />
  );
}
