import { GalleryPhoto } from "../../../api/smart-church/smart-church-api-response";

export default function GalleryModal({
  galleryPhoto,
  hide,
}: {
  galleryPhoto: GalleryPhoto;
  hide: () => void;
}) {
  return (
    <div className="modal" onClick={hide}>
      <div
        style={{
          maxWidth: 900,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">sadf</div>
        <div className="modal__body">
          <div>
            <div>
              <img
                src={galleryPhoto.imageUrl}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <p>{galleryPhoto.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
