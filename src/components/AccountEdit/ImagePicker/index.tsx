import classNames from 'classnames';
import React from 'react'

interface Props {
    avatarPicker: boolean;
    setAvatarPicker: (avatarPicker: boolean) => void;
    changeAvatar: (avatar: string) => void;
    avatares: { src: string, name: string }[];
    styles: any;
}

export default function ImagePicker({ avatarPicker, setAvatarPicker, changeAvatar, styles, avatares }: Props) {
  return (
    <div className={classNames({
        [styles.avatar_picker]: true,
        [styles.avatar_picker__visible]: !avatarPicker
    })}>
        {avatares.map((avatar, index) => 
            <div className={styles.avatar_container}>
                <img 
                    key={index} 
                    src={`assets/images/avatar/${avatar.src}`} 
                    alt={avatar.name} 
                    onClick={() => changeAvatar(avatar.src)} 
                />
            </div>
        )}
    </div>
  )
}
