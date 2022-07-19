import React from 'react'

function ProfilePhotos() {
    return (
        <div className="bg-white my-3 p-4 rounded-xl">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Photos
                <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200">
                    See all photos
                </div>
            </div>
            <div>
                photos
            </div>
        </div>
    )
}

export default ProfilePhotos;