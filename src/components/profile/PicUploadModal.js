import { t } from "i18next";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfilePic from "./UpdateProfilePic";

function PicUploadModal({ setChoosePic,choosePic }) {

  const [pic, setPic] = useState();
  const [update, setUpdate] = useState("");
  const [error, setError] = useState("");
  const [updatedImage, setUpdatedImage] = useState();
  const refInput = useRef(null);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setUpdatedImage(file)
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setPic(event.target.result);
    };
    setUpdate((prev) => !prev);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto">
      <div className="lg:w-3/5 w-4/5 mx-auto my-32 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100">
        <div className="relative mb-3">
          <div className="text-center text-xl">{t('Update Picture')}</div>
          <button className="absolute right-2 top-0 text-xl"  
              onClick={() => {
                    console.log('cc');
                    setChoosePic(!choosePic);
                    console.log(choosePic);
                  }}>
            <AiOutlineClose/>
          </button>
        </div>
        <hr></hr>
        <div className="mt-3">
          <input
            type="file"
            ref={refInput}
            accept="image/jpeg,image/png,image/webp,image/gif"
            name="profileImage"
            hidden
            onChange={handleImage}
          />
        </div>
        <div className="flex justify-center gap-3 my-3">
          <div className="bg-indigo-100 text-indigo-500 dark:bg-zinc-500 dark:text-slate-100 dark:hover:brightness-95 text-center w-2/4 rounded-lg p-3">
            <AiOutlinePlus className="inline w-5 h-5" />
            <span
              className="font-semibold ml-1 cursor-pointer"
              onClick={() => refInput.current.click()}
            >
              {t('Upload Photo')}
            </span>
          </div>
          {update && (
            <UpdateProfilePic setUpdate={setUpdate} setChoosePic={setChoosePic} pic={pic} newImage={updatedImage} setPic={setPic} />
          )}
        </div>
        <div>
          {error && <div className="text-center text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default PicUploadModal;
