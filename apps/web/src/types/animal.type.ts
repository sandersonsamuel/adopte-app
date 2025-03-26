export interface AnimalType {
  id: string;
  name: string;
  photo: string;
  sex: Sex;
  castred: boolean;
  weight: string;
  age: AnimalAge;
  description: string;
  adopted: boolean;
  categoryId: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum AnimalAge {
  BABY = "BABY",
  YOUNG = "YOUNG",
  ADULT = "ADULT",
  OLD = "OLD",
}

export const SexTranslation = {
  MALE: "Macho",
  FEMALE: "Fêmea",
} as const;

export const AnimalAgeTranslation = {
  BABY: "Filhote",
  YOUNG: "Jovem",
  ADULT: "Adulto",
  OLD: "Idoso",
} as const;
