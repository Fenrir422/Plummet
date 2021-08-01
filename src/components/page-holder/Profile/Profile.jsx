import classes from './Profile.module.css'
import React, { useEffect, useState } from 'react'
import userImg from '../../../images/usergal.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import ProfileDataReduxForm from './ProfileForm'
import AccountSettings from './ProfileSettings/AccountSettings'
import ProfileData from './ProfileData'
import ProfileLibraryContainer from '../../../containerComponents/ProfileLibraryContainer'






const Profile =({userId, authId, setMainPhoto, profileData,...props})=>{

    const [SettingsToggle, setSettingsToggle] = useState(false);
    const [LibraryToggle, setLibraryToggle] = useState(false);
    const [selectedText, setSelectedText] = useState(false);

    
    const onMouseUp =()=>{
        setSelectedText(window.getSelection().toString())
    }

    useEffect (() => {
        document.addEventListener("selectionchange", onMouseUp)
        return () => {document.removeEventListener("selectionchange", onMouseUp)}
    }, [])


    const saveSelectedText = () => {
        alert(selectedText)
    }

    const activateSettings =()=> {
        setSettingsToggle(!SettingsToggle)
    }   


    let isOwner = null;

    if (authId === userId){
       isOwner = true;
    }

    const onMainPhotoSelect=(e)=>{
        if(e.target.files.length) {
            setMainPhoto(e.target.files[0])
        }
    }

    const libraryToggle =()=>{
        setLibraryToggle(!LibraryToggle);
    }

    const onSubmit = (FormData) =>{
        console.log(FormData, 'aboutMe')
        props.setProfileDataThunk(FormData)
        activateSettings()
    }


    return(
        <div className={classes.ProfileWrapper}>
            {/* side-platemenu */}
            {props.isAuth && isOwner ? <ProfileMenu libraryToggle={libraryToggle} activateSettings={activateSettings}/>: <div></div>}
            
            {props.isAuth && isOwner && SettingsToggle ? <AccountSettings activateSettings={activateSettings} profileData={profileData} onSubmit={onSubmit} onMainPhotoSelect={onMainPhotoSelect}/> : null}
            <div className={classes.ProfileDataWrapper}>
                <div className={classes.profilePhotoWrapper}>
                    <img src={profileData.photos.large ? profileData.photos.large : userImg} className={classes.profilePhoto}/>
                </div>
                <ProfileData profileData={profileData}/>
                
            </div>
            <div className={classes.profieContent}>
                
                {selectedText ? <button onClick={saveSelectedText}>kek</button> :null}

                <div className={classes.profileName}>{profileData.fullName}</div>
                <ProfileStatusWithHooks updateStatus={props.updateStatus} props={props} status={profileData.status}/>
                {props.isAuth && isOwner && LibraryToggle ? <ProfileLibraryContainer /> : null}
            </div>
              
        </div>
    )
}


export default Profile