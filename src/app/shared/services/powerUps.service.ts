import { Injectable } from "@angular/core";
import { PowerUpsItem } from "../app.interfaces";
import { HeroSelectionService } from "./hero-selecton.service";

@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {
  public powerUpsData: PowerUpsItem[] = [
    {
      title: "Captain America shield",
      benefit: "durability",
      value: "+10",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Captain_America%27s_shield.svg/800px-Captain_America%27s_shield.svg.png",
      usesLeft: 3
    },
    {
      title: "Mjolnir",
      benefit: "power",
      value: "+10",
      image: "https://crazy-hero.com/image/catalog/Replica/Mjolnir/Mjolnir2.jpg",
      usesLeft: 5
    },
    {
      title: "Ironman nano armor",
      benefit: "combat",
      value: "+10",
      image: "https://wallpapercave.com/wp/wp4298417.jpg",
      usesLeft: 4
    },
    {
      title: "Dr. Strange's cloak",
      benefit: "intelligence",
      value: "+10",
      image: "https://images-na.ssl-images-amazon.com/images/I/51IlwjiO%2BxL._AC_UX569_.jpg",
      usesLeft: 2
    },
    {
      title: "Green lantern's ring",
      benefit: "strength",
      value: "+10",
      image: "https://www.superherorings.com/image/catalog/green-lantern-ring-silver.jpg",
      usesLeft: 6
    },
    {
      title: "Flash boots",
      benefit: "speed",
      value: "+10",
      image: "https://www.cosplayinspire.com/pub/media/catalog/product/cache/dd9b268b29f92e71b2b8e02fe4de042c/d/c/dceu-justice-league-flash-barry-allen-cosplay-boots-buy.jpg",
      usesLeft: 3
    }
  ];
  public benefitsList: string[] = ['Captain America', 'Thor', 'Ironman', 'Strange', 'Green Lantern', 'Flash', 'Mjolnir'];
  public selectedHeroName!: string;
  public selectedHeroOccupation!: string;

  constructor(private _heroSelectionService: HeroSelectionService) { }

  public checkPowerUps(): void {
    this.powerUpsData.forEach( (item: PowerUpsItem) => item.hasPowerUps = false);
    this.selectedHeroName = this._heroSelectionService.selectedHero.name;
    this.selectedHeroOccupation = this._heroSelectionService.selectedHero.occupation;

    const selectedItem: string | undefined = this.benefitsList.find( (item: string) => this.selectedHeroName.includes(item) || this.selectedHeroOccupation.includes(this.benefitsList[4]) );
    const ownedPowerUps: string | boolean = selectedItem ? selectedItem : false;

    if (ownedPowerUps) {
      this.powerUpsData.forEach( (elem: PowerUpsItem) => {
        const isHasPowerUps: boolean = elem.title.includes(ownedPowerUps) || this.selectedHeroOccupation.includes(ownedPowerUps) || this.selectedHeroName.includes(this.benefitsList[1]) && elem.title === this.benefitsList[6];

        if (isHasPowerUps) {
          elem.hasPowerUps = true;
        }
      });

      this.powerUpsData.sort( (itemA: PowerUpsItem, itemB: PowerUpsItem) => itemA.hasPowerUps ? -1 : itemB.hasPowerUps ? 1 : 0);
    }
  }
}
