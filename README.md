# Factory Calculator

> [!NOTE]
> This is very much a work in progress.

## Background

After years of playing games like Satisfactory, Factorio, Shapez, and other similar factory games, it became more and more annoying that there wasn't a simple and easy to use throughput planner/calculator.
On top of this, adding mods, keeping up with updates, and more is sorely lacking in most calculators.

I am setting out to create a base library that can be used to standardize throughput caculators for these factory games.
This initial library by design does not implement storage nor UI/UX to manage calculator apps (that will be achieved with other subsequent packages): instead, the aim here is to create a base set of interfaces and libraries that can be used as the core functionality for higher level factory calculators.

While my ideal goal is a mobile, tablet, and web friendly app that allows for customization and sharing of calculators for *ANY* game, you could easily instead choose to make a static list of POJOs implementing these interfaces and build a dedicated static factory calculator for your favorite game.

## Contributing

The initial requirements for this has been based on the major products and gameplay loops for Satisfactory, Factorio, and to a lesser extent Shapez (1/2).
This means that producing products requires:

1. Input Products
2. Power (with consideration of idle power if things back up for reference)
3. Byproducts

## Caveats

This calculator (at least currently) isn't built to support "enrichment" cycles such as Kovarex enrichment in Factorio, Plutonium Enrichment in Satisfactory, or oil byproduct recycling in satisfactory.