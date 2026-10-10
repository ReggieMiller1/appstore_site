"use client";

import { useEffect } from "react";

/**
 * Adds `.reveal-visible` to any element with the `.reveal` class once it
 * enters the viewport.
 *
 * This is mounted once in the root layout (via ScrollRevealInit), which
 * persists across client-side navigations — Next.js does not remount
 * layouts when navigating between pages, only the page content inside
 * them changes.
 *
 * An earlier version of this hook re-scanned the DOM only when the route
 * `pathname` changed. That covered a plain navigation, but not a second,
 * more subtle case: routes with a `loading.tsx` render as a Suspense
 * boundary, so the URL/pathname updates *immediately* (showing the
 * loading skeleton, which has no `.reveal` elements), and the real page
 * content — the actual `.reveal` elements — streams in and swaps into the
 * DOM moments later, under that *same* pathname. A pathname-keyed effect
 * has already run and found nothing by the time that swap happens, and
 * has no reason to run again, so those elements are never observed and
 * stay invisible (opacity: 0) permanently.
 *
 * The fix: don't try to guess *when* new content can appear (on route
 * change, on Suspense resolution, or both) — react to content actually
 * appearing, via a MutationObserver watching the whole document. This
 * needs no knowledge of Next.js's routing/streaming internals and no
 * dependency array games: it observes every `.reveal` element exactly
 * once, whenever it shows up in the DOM, for any reason.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll(".reveal").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    };

    // Initial scan — covers the very first page load.
    observeWithin(document.body);

    // Covers every later case: client-side navigation swapping in a new
    // page, and a loading.tsx skeleton being replaced by streamed-in real
    // content under the same URL.
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".reveal") && !observed.has(node)) {
            observed.add(node);
            io.observe(node);
          }
          observeWithin(node);
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
