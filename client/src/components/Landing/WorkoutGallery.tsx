import { workOutGallery } from "../../data_landing";

const WorkoutGallery = () => {
  return (
    <div className=" wo_gallery_container">
      <span className="bg_text bg_sect_head">Workout Gallery</span>
      <div className="wo_gallery_imgs">
        {workOutGallery.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default WorkoutGallery;
