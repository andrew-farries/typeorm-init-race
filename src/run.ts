import { Photo } from "./entity/photo";
import { AppDataSource } from "./index";

export async function run() {
  const photo = new Photo();

  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-with-bears.jpg";
  photo.views = 1;
  photo.isPublished = true;

  const photoRepository = AppDataSource.getRepository(Photo);

  await photoRepository.save(photo);
  console.log("Photo has been saved");

  const savedPhotos = await photoRepository.find();
  console.log("All photos from the db: ", savedPhotos);
}
