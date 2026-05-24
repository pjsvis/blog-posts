---
layout: post
title: "Draft: The Cathedral: Building Artificial Gravity for a Mars Transit"
draft: true
---

# The Cathedral: Building Artificial Gravity for a Mars Transit

Posts 1 and 4 of this series established two things. First: the human body cannot survive a Mars transit in freefall and arrive functional. Second: SpaceX's incentive structure, built around a binary milestone (colony yes/no), has no mechanism for asking whether the colonists will arrive intact.

This post is different. This post describes the cathedral.

The Reduced Gravity Environmental Module — RGEM — is not a proposal. It is a description of what the physics requires. If you want to deliver functional humans to Mars, you must provide gravity during transit. If you want to provide gravity during transit, you must rotate the habitat. If you want to rotate the habitat, here — exactly — is what that entails.

I am not asking whether SpaceX *will* build this. I am describing what must be true for the Mars mission to succeed on biological terms. Whether SpaceX chooses to meet those terms is a question of incentives. What the terms *are* is a question of physics.

---

## The Physics of Artificial Gravity

Artificial gravity is produced by rotation. A rotating structure creates centripetal acceleration: anything in contact with the rotating surface experiences a force directed outward from the center of rotation. In a spacecraft, this outward force substitutes for gravity. Your feet are pointed outward. Your head is pointed inward. The floor curves up around you.

The equation is straightforward:

**a = ω²r**

Where:
- **a** is the acceleration experienced at the rim (in m/s²)
- **ω** is the angular velocity (in radians per second)
- **r** is the radius from the center of rotation (in meters)

Earth gravity is 9.81 m/s². Mars gravity is 3.73 m/s² — about 38% of Earth's. For a Mars transit vehicle, you want to provide at least Mars-equivalent gravity during sleep (when the body does most of its bone remodeling and tissue repair) and some fraction of that during waking hours.

The radius requirement emerges from physiology, not physics. The physics doesn't care about the radius — any combination of ω and r that produces the desired acceleration works. The physiology does care. Specifically, the human vestibular system cares.

---

## The 6.7 RPM Constraint

If you rotate a habitat too fast, the Coriolis effect becomes disorienting. Turn your head in a rotating environment and the fluid in your inner ear experiences a cross-coupled angular acceleration that your brain interprets as simultaneous rotation in two axes. The result is nausea, spatial disorientation, and — in a significant fraction of the population — incapacitating motion sickness.

Decades of ground-based research in slowly rotating rooms have established a comfortable range. At 2 RPM or below, essentially no one experiences symptoms. Between 2 and 7 RPM, most people adapt within hours to days. Above 7 RPM, adaptation becomes unreliable, and symptoms persist in a substantial fraction of subjects even after extended exposure.

The constraint, then, is: rotation rate must not exceed approximately 7 RPM, and should ideally be below 4 RPM for unselected populations.

At 6.7 RPM — the sweet spot chosen for RGEM — we get:

**ω = 6.7 × 2π / 60 = 0.702 radians per second**

To produce 1g of acceleration (full Earth gravity for sleep periods):

**r = a / ω² = 9.81 / (0.702)² = 19.9 meters**

A 40-meter diameter rotating shell. At this radius, the tangential velocity at the rim is 14 meters per second — about 50 kilometers per hour. Fast, but not mechanically exotic.

To produce Mars-equivalent gravity (0.38g) at the same rotation rate, you position crew stations partway up from the rim, where the effective radius is smaller. At approximately 7.6 meters radius — well within the 20-meter shell — you get 0.38g. This allows graduated gravity: full Earth gravity at the outer rim for sleep, Mars gravity at intermediate levels for daily activity, and microgravity at the central hub for research and docking.

---

## The Tensegrity Shell

You cannot launch a 40-meter diameter structure into orbit. Starship's payload bay is approximately 8 meters in diameter and 17 meters in length. The entire rotating habitat must fit within that envelope at launch and expand to its operational dimensions once in orbit.

Enter tensegrity.

Tensegrity — a portmanteau of "tension" and "integrity" coined by Buckminster Fuller — is a structural principle in which compression elements (struts) float within a network of tension elements (cables). In a pure tensegrity structure, no two compression members touch. The integrity of the structure exists in the relationship between the elements, not in the strength of any individual component.

This is ideal for deployable space structures for several reasons. First, tensegrity structures collapse to a fraction of their deployed volume. A 40-meter tensegrity sphere can fold into a cylinder no larger than its longest strut — approximately 8 meters for a properly designed icosahedral or octahedral geometry. Second, deployment is mechanically simple: tension the cables, and the structure self-assembles into its equilibrium shape. No complex joints, no motors, no astronaut EVA to bolt things together. Third, the structure is robust against local failure. If one cable breaks, the load redistributes through the network. A traditional rigid structure with a broken member is compromised. A tensegrity structure with a broken cable is slightly less stiff but remains intact.

The RGEM shell is an extensible tensegrity icosahedron — a geodesic sphere of 20 triangular faces, each subdivided for finer curvature. The struts are carbon-fiber composite tubes with threaded tensioners at each end. The cables are Vectran — a liquid crystal polymer fiber with strength comparable to Kevlar, low creep, and spaceflight heritage on the Mars Pathfinder airbags. The outer surface is a multi-layer inflatable shield: micrometeoroid protection, radiation attenuation, and thermal control, all integrated into a fabric envelope that deploys with the structure.

Total mass for the deployed shell, including all struts, cables, shield layers, and deployment mechanisms, is estimated at 12 to 15 metric tons. Starship is designed to deliver 100 metric tons to orbit. The RGEM shell represents approximately 12-15% of a single Starship payload.

---

## The Mag-Lev Sleep Trains

The sleep quarters are the critical component. If you're going to spend 8 hours of every 24-hour cycle at the rim, providing full Earth gravity during sleep, the crew quarters must rotate reliably, silently, and without mechanical wear for the entire 6-9 month transit.

Magnetic levitation solves all three requirements.

Two counter-rotating rings — one clockwise, one counterclockwise — ride on a mag-lev track around the inner circumference of the shell. Each ring carries crew sleep pods: individual compartments with environmental controls, radiation shielding, and restraints. The counter-rotation is essential: the angular momentum of the clockwise ring cancels the angular momentum of the counterclockwise ring, preventing the shell from accumulating angular momentum and torquing itself into an uncontrolled spin.

The mag-lev system operates without physical contact between the rotating rings and the stationary track. Electromagnetic coils in the track induce opposing fields in permanent magnets embedded in the rings. No bearings. No lubrication. No wear surfaces. The power requirement is modest: once the rings are spun up to 6.7 RPM, the only ongoing energy cost is overcoming the residual electromagnetic drag, which for a well-designed system is on the order of a few kilowatts — easily supplied by the spacecraft's solar arrays.

Why sleep at 1g rather than Mars gravity? Bone remodeling — the process by which osteoclasts break down old bone and osteoblasts build new bone — is primarily active during sleep. The mechanical loading signal that tells osteoblasts "keep building" is proportional to the gravitational load experienced during rest. A full 8 hours at 1g provides the remodeling signal. If you sleep at 0.38g, you get 38% of the signal. Over a 9-month transit, the cumulative deficit is comparable to the bone loss documented on the ISS, and you arrive on Mars with skeletal architecture that has been undermaintained for the better part of a year.

This is also why ISS astronauts lose bone despite two hours of daily exercise: the mechanical loading during the other 22 hours — sleep, meals, routine activity — is zero. You cannot exercise your way out of a 24-hour loading deficit with a 2-hour workout. You need gravity while you sleep.

---

## Weight, Mass, and the Danger You Don't Feel

A point that must be made clearly, because it is widely misunderstood: in a rotating habitat, your *weight* changes with the rotation rate and radius. Your *mass* does not.

Weight is the force you exert on the surface beneath you. At Mars gravity, you weigh 38% of what you weigh on Earth. A 70-kilogram person exerts approximately 260 newtons of force on the floor instead of 686 newtons.

Mass — the quantity of matter in your body, which determines your inertia — is unchanged. A 70-kilogram person in Mars gravity is still 70 kilograms of mass. If they trip and fall, they hit the floor with 38% of the force they would experience on Earth, but their body's momentum is unchanged. The force required to *stop* that fall — the impact your knees and spine absorb — depends on your mass, not your weight.

This has practical implications for spacecraft design. In a low-gravity environment, people feel lighter. They jump higher. They move in ways that feel safe because the effort required to start moving is reduced. But the effort required to *stop* moving — to arrest momentum — is not reduced. You can jump higher, but you land with the same inertial consequence. You can carry heavier loads, but if you drop them, they strike with the same destructive energy.

The RGEM design accounts for this. The sleep trains and crew stations have padded surfaces and restraint systems designed for full-mass, reduced-weight biomechanics. The distinction between weight and mass is not academic. It is a structural requirement for crew safety.

---

## What This Costs

At this point, the practical objection is predictable. SpaceX is burning through more than $10 billion per quarter. Adding a rotating habitat to the mission architecture is expensive. Is it necessary?

Let me put it in context.

SpaceX spent $20.7 billion on capital expenditures in 2025. Of that, $12.7 billion — 61% — went to AI infrastructure: the COLOSSUS and COLOSSUS II data centers in Memphis, the GPU clusters, the compute buildout. The AI segment lost $6.4 billion on operations in 2025. The entire company ran a $2.6 billion operating loss.

The RGEM shell, as described above, is a 12-15 ton structure with a deployment mechanism, a mag-lev track, and two rotating crew rings. The engineering is mature: tensegrity deployment has been demonstrated on orbit (Japan's IKAROS solar sail, 2010). Mag-lev has been operational in terrestrial transit systems for decades. Rotating habitats have been studied since the 1960s and validated in ground-based slowly rotating rooms. The technology exists. The components have flight heritage or near-term readiness.

A conservative estimate for the development and flight qualification of a single RGEM unit is $2 to $4 billion. By comparison, SpaceX spent $12.7 billion on AI infrastructure in 2025 alone — capital that went to data centers, GPU clusters, and compute buildout with no connection to the Mars mission. The RGEM would require between 16% and 31% of that AI spend — for hardware that directly addresses the single largest constraint on the company's primary stated mission.

The question is not whether it's affordable. It is whether the company is incentivized to build it. And as Post 4 established, the answer to that question depends on whether the system has a Janeway.

---

## The Cathedral, Not the Hovel

I wrote in Post 1 that the SpaceX S-1 is a Perky Pat layout — a financial diorama designed to distract from the biological reality of the hovel. The hovel is the human body in freefall, degrading at 90 days, arriving on Mars unable to stand.

The cathedral is RGEM. A 40-meter rotating tensegrity shell, deploying from Starship's payload bay, providing full Earth gravity during sleep and graduated gravity during the day. A structure in which the 90-day biological threshold is irrelevant because there is no freefall decay to trigger. A habitat in which colonists arrive on Mars in the same physical condition in which they departed Earth orbit.

This is not science fiction. This is physics. The equations are known. The components exist. The cost is a fraction of what is already being spent on infrastructure that has nothing to do with Mars.

The only question is whether anyone with the authority to make it happen sees the hovel for what it is — and decides to build the cathedral instead.

---

*This is Post 2 of a series on the SpaceX S-1 filing and the architecture of human spaceflight. Post 3 will examine the human dimension: seiza workstations that eliminate Coriolis disorientation, zero-g bouldering walls with centrifugal pull-off resistance, and human-powered flight inside a 37,000-cubic-meter tension envelope.*
