# Triage

The continuous process of evaluating, categorizing, and prioritizing requirements based on their criticality, impact, and urgency — ensuring that limited development resources are allocated to the most vital features.

The methodology divides requirements into three categories that function as structural elements:

## Enable

The compression struts. If this does not work, there is nothing to do.

The feature is foundational: without it, no downstream feature matters. Not about quality; about existence. These receive resources first, without exception.

Assign this category when the feature's absence makes the system non-functional or unsafe.

## Strengthen

The tension cables. If this works, it must work deterministically.

The feature exists; quality determines whether the system is worth using. The determinism constraint is non-negotiable — a feature that works unreliably is not strengthening the system; it is weakening it by introducing unpredictable failure under load.

Assign this category when the feature exists and its reliability is the issue.

## Enhance

Decorative elements. If this could be enhanced, let's think about it.

The feature is functional; enhancement is optional. Not a rejection — a deferral. Addressed last, if capacity permits and the value justifies the cost.

## Structural Note

Enable and Strengthen must be in equilibrium. A system with Enable and no Strengthen is a standing structure that will fail under load. A system with Strengthen and no Enable has nothing to strengthen.

The risk is not that Enhance gets ignored. The risk is that Strengthen is perpetually deferred while Enable grows. The cables stretch. The structure will stand — until it doesn't.

Triage is not a one-time event. It is continuous. Monthly at minimum. Weekly under volatile conditions.

**See also:** tensegrity, brief-debrief