import { Nationalities } from ".";

export const Countries = Nationalities.map(nationality => nationality.en_short_name);
export type Country = typeof Countries[number];

