export class Pokemon {
  /** Identifier */
  id: number | undefined;

  /** Health points */
  hp: number | undefined;

  /** Combat points */
  cp: number | undefined;

  /** Pokemon name */
  name: string | undefined;

  /** Picture URL */
  picture: string | undefined;

  /** Pokemon types */
  types: Array<string> = [];

  /** Creation date */
  created: Date | undefined;

  constructor(
    name: string = 'Entrer un nom',
    hp: number = 100,
    cp: number = 10,
    picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
    types: string[] = ['Normal'],
    created: Date = new Date()
  ) {
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }
}
