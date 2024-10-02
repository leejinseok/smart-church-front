import { GalleryPhoto } from "@/api/smart-church/smart-church-api-response";

export default function Gallery({ gallery }: { gallery: GalleryPhoto[] }) {
  return (
    <>
      {gallery.map((gallery, galleryIndex) => {
        return (
          <div key={galleryIndex} className="col gallery-col">
            <div className="image-container">
              <img src={gallery.imageUrl} alt="" />
            </div>
          </div>
        );
      })}
    </>
  );
}
