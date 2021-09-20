interface ImageModule {
  default: string;
}

const importAll = (r: any) => r.keys().map(r);

const images: ImageModule[] = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

const findDogImage = (name: string) =>
  images.find((image: ImageModule) => {
    return image.default.includes(name);
  })!?.default;

export const dogs = [
  // max character limit = 13
  {
    image: findDogImage("dog-photo-1"),
    name: "garbanzo",
  },
  {
    image: findDogImage("dog-photo-2"),
    name: "bedbanzo",
  },
  {
    image: findDogImage("dog-photo-3"),
    name: "bookbanzo",
  },
  {
    image: findDogImage("dog-photo-4"),
    name: "bunbanzo",
  },
  {
    image: findDogImage("dog-photo-5"),
    name: "burritobanzo",
  },
  {
    image: findDogImage("dog-photo-6"),
    name: "coolbanzo",
  },
  {
    image: findDogImage("dog-photo-7"),
    name: "derpbanzo",
  },
  {
    image: findDogImage("dog-photo-8"),
    name: "drunkbanzo",
  },
  {
    image: findDogImage("dog-photo-9"),
    name: "farmbanzo",
  },
  {
    image: findDogImage("dog-photo-10"),
    name: "lakebanzo",
  },
  {
    image: findDogImage("dog-photo-11"),
    name: "mailbanzo",
  },
  {
    image: findDogImage("dog-photo-12"),
    name: "plopbanzo",
  },
  {
    image: findDogImage("dog-photo-13"),
    name: "rainbanzo",
  },
  {
    image: findDogImage("dog-photo-14"),
    name: "snowbanzo",
  },
  {
    image: findDogImage("dog-photo-15"),
    name: "sofabanzo",
  },
  {
    image: findDogImage("dog-photo-16"),
    name: "sportbanzo",
  },
  {
    image: findDogImage("dog-photo-17"),
    name: "yardbanzo",
  },
  {
    image: findDogImage("dog-photo-18"),
    name: "yuletidebanzo",
  },
  {
    image: findDogImage("dog-photo-19"),
    name: "gabe",
  },
  {
    image: findDogImage("dog-photo-20"),
    name: "barb",
  },
  {
    image: findDogImage("dog-photo-21"),
    name: "mannie",
  },
  {
    image: findDogImage("dog-photo-22"),
    name: "peachies",
  },
  {
    image: findDogImage("dog-photo-23"),
    name: "seymour",
  },
  {
    image: findDogImage("dog-photo-24"),
    name: "macklin",
  },
  {
    image: findDogImage("dog-photo-25"),
    name: "brown dog",
  },
  {
    image: findDogImage("dog-photo-26"),
    name: "max",
  },
  {
    image: findDogImage("dog-photo-27"),
    name: "sasha",
  },
  {
    image: findDogImage("dog-photo-28"),
    name: "pogikins",
  },
];

export default dogs;
